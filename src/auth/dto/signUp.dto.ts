import { IsEmail, IsNotEmpty, IsNumberString, IsOptional, IsPhoneNumber, IsString, MinLength } from "class-validator"


export class SignUpDto {
    @IsNotEmpty({message: "Le nom est obligatoire"})
    @IsString({message: "Le nom doit être une chaîne de caractère"})
    readonly nom: string

    @IsOptional()
    @IsString({message: "Le nom doit être une chaîne de caractère"})
    readonly prenom: string

    @IsNotEmpty({message: "L'adresse email est obligatoire"})
    @IsEmail({}, {message: "L'adresse email est invalide"})
    readonly email: string

    @IsNotEmpty({message: "Le numéro de téléphone est obligatoire"})
    @IsPhoneNumber()
    readonly telephone: string

    @IsNotEmpty({message: "Le mot de passe est obligatoire"})
    @MinLength(8, {message: "Le mot de passe doit avoir au moins 8 caractères"})
    readonly password: string

    @IsOptional()
    readonly img_url: string

    @IsNumberString({}, { message: "Le champ solde_dispo doit être un nombre valide" })
    @IsNotEmpty({ message: "Le champ solde_dispo est obligatoire" })
    readonly solde_dispo: string

    @IsNumberString({}, { message: "Le champ solde_encours doit être un nombre valide" })
    @IsNotEmpty({ message: "Le champ solde_encours est obligatoire" })
    readonly solde_encours: string

    @IsOptional()
    readonly orange_money: string[]
}