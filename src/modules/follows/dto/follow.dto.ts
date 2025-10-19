import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';

export class FollowDto {
  @ApiProperty({ example: '64b1234567890abcdef12345' })
  @IsMongoId()
  userId: string;

  @ApiProperty({ example: '64b1234567890abcdef67890' })
  @IsMongoId()
  restaurantId: string;
}


