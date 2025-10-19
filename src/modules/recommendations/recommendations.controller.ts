import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { RecommendationService } from './recommendations.service';

@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Get(':userId')
  @ApiParam({ name: 'userId', required: true })
  getRecommendations(@Param('userId') userId: string) {
    return this.recommendationService.getRecommendations(userId);
  }
}
