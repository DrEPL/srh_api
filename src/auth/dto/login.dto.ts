import { IsNotEmpty, IsPhoneNumber } from "class-validator"


export class LoginDto {
    @IsNotEmpty({message: "Le numéro de téléphone est obligatoire"})
    @IsPhoneNumber()
    readonly telephone: string

    @IsNotEmpty({message: "Le mot de passe est obligatoire"})
    // @MinLength(8, {message: "Le mot de passe doit avoir au moins 8 caractères"})
    readonly password: string
}