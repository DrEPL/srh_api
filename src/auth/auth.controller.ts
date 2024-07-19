import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { SignUpDto } from './dto/signUp.dto';
import { User } from './schemas/user.schema';
import { LoginDto } from './dto/login.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async SignUp(@Body() data: SignUpDto):Promise<{ token: string, user: User }>{
    const { token, user } = await this.authService.signUp(data)
    return { token, user}
  }

  @Post('/login')
  async Login(@Body() data: LoginDto):Promise<{token: string, user: User}>{
    const {token, user} = await this.authService.login(data)
    return {token, user}
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
