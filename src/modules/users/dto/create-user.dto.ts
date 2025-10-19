import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'Sarah Ahmed' })
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: ['Italian', 'Japanese'], isArray: true, type: String })
  @IsArray()
  @IsString({ each: true })
  favoriteCuisines: string[];
}


