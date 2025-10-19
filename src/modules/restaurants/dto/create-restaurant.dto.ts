import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';

class RestaurantNameDto {
  @ApiProperty({ example: 'Pizza Planet' })
  @IsString()
  @IsNotEmpty()
  en: string;

  @ApiProperty({ example: 'مطعم بيتزا' })
  @IsString()
  @IsNotEmpty()
  ar: string;
}

class LocationDto {
  @ApiProperty({ example: 'Point', enum: ['Point'] })
  @IsString()
  @IsNotEmpty()
  type: 'Point';

  @ApiProperty({ example: [31.2001, 29.9187], minItems: 2, maxItems: 2 })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  coordinates: [number, number];
}

export class CreateRestaurantDto {
  @ApiProperty({ type: RestaurantNameDto })
  @ValidateNested()
  @Type(() => RestaurantNameDto)
  name: RestaurantNameDto;

  @ApiProperty({ example: 'pizza-planet' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ example: ['Italian', 'Fast Food'], isArray: true, type: String })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @IsString({ each: true })
  cuisines: string[];

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
