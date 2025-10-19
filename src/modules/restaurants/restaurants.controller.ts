import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FilterRestaurantDto } from './dto/filter-restaurant.dto';
import { ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  create(@Body() createRestaurantDto: CreateRestaurantDto) {
    return this.restaurantsService.create(createRestaurantDto);
  }

  @Get()
  @ApiQuery({ name: 'cuisine', required: false })
  findAll(@Query() filter: FilterRestaurantDto) {
    return this.restaurantsService.findAll(filter);
  }

  @Get(':identifier')
  @ApiParam({ name: 'identifier', description: 'restaurant slug or id' })
  findOne(@Param('identifier') identifier: string) {
    return this.restaurantsService.findOne(identifier);
  }

  @Get('/nearby/search')
  findNearby(@Query('long') long: number, @Query('lat') lat: number) {
    return this.restaurantsService.findNearby(Number(long), Number(lat));
  }
}
