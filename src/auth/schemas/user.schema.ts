import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({timestamps: true})
export class User extends Document{
    @Prop()
    nom: string

    @Prop()
    prenom: string
    
    @Prop({ unique: true, index: true })
    email: string
    
    @Prop({unique: true, index: true})
    telephone: string
    
    @Prop()
    password: string
    
    @Prop()
    img_url: string

    @Prop()
    solde_dispo: string
    
    @Prop()
    solde_encours: string

    @Prop({ type: [String]})
    orange_money: string[]
}

export const UserSchema = SchemaFactory.createForClass(User);