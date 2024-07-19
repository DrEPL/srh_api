import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from "bcryptjs";
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModele: Model<UserDocument>,
    private jwtService: JwtService
  ) { }

  async signUp(signUpDto: SignUpDto): Promise<{ token: string, user: UserDocument }> {
    const { nom, prenom, telephone, email, password, img_url } = signUpDto
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await this.userModele.create({ nom, prenom, telephone, email, password: hashedPassword, img_url })
    const token = this.jwtService.sign({ id: (await user)._id })
    return { token, user }
  }

  async login(loginDto: LoginDto): Promise<{ token: string, user: UserDocument }> {
    const { telephone, password } = loginDto
    const user = await this.userModele.findOne({ telephone });
    if (!user) {
      throw new UnauthorizedException(" L'utilisateur n'existe pas")
    }

    const isPasswordMatched = await bcrypt.compare(password, (await user).password)

    if (!isPasswordMatched) {
      throw new UnauthorizedException(" Mot de passe incorrect")
    }

    const token = this.jwtService.sign({ id: (await user)._id })

    return { token, user };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
