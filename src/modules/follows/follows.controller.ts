import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { FollowDto } from './dto/follow.dto';
import { FollowsService } from './follows.service';

@ApiTags('follows')
@Controller('follows')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post()
  @ApiBody({ type: FollowDto })
  follow(@Body() body: FollowDto) {
    return this.followsService.followRestaurant(body.userId, body.restaurantId);
  }

  @Get('user/:userId')
  @ApiParam({ name: 'userId', required: true })
  getUserFollows(@Param('userId') userId: string) {
    return this.followsService.getUserFollows(userId);
  }

  @Get('restaurant/:restaurantId')
  @ApiParam({ name: 'restaurantId', required: true })
  getFollowers(@Param('restaurantId') restaurantId: string) {
    return this.followsService.getFollowers(restaurantId);
  }
}
