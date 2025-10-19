import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';

class RestaurantNameDto {
  @IsString()
  @IsNotEmpty()
  en: string;

  @IsString()
  @IsNotEmpty()
  ar: string;
}

class LocationDto {
  @IsString()
  @IsNotEmpty()
  type: 'Point';

  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: [number, number];
}

export class CreateRestaurantDto {
  @ValidateNested()
  @Type(() => RestaurantNameDto)
  name: RestaurantNameDto;

  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsString({ each: true })
  cuisines: string[];

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
