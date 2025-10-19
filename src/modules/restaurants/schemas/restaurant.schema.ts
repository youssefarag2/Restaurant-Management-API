import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Restaurant extends Document {
  @Prop({
    required: true,
    type: {
      en: { type: String, required: true },
      ar: { type: String, required: true },
    },
  })
  name: { en: string; ar: string };

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({
    type: [String],
    required: true,
    validate: {
      validator: (arr: string[]) => arr.length >= 1 && arr.length <= 3,
      message: 'Cuisines must have between 1 and 3 items',
    },
  })
  cuisines: string[];

  @Prop({
    type: {
      type: { type: String, enum: ['Point'], required: true },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
      },
    },
    index: '2dsphere',
    required: true,
  })
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
