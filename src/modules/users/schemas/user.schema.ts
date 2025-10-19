import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({})
export class User extends Document {
  @Prop({ required: true })
  fullName: string;

  @Prop({ type: [String], default: [] })
  favoriteCuisines: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
