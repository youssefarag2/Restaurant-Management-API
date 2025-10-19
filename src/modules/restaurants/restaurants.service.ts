import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant } from './schemas/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { FilterRestaurantDto } from './dto/filter-restaurant.dto';
interface RestaurantQuery {
  cuisines?: string;
}
@Injectable()
export class RestaurantsService {
  constructor(
    @InjectModel(Restaurant.name)
    private restaurantModel: Model<Restaurant>,
  ) {}

  async create(createDto: CreateRestaurantDto): Promise<Restaurant> {
    const created = new this.restaurantModel(createDto);
    return created.save();
  }

  async findAll(filter: FilterRestaurantDto): Promise<Restaurant[]> {
    const query: RestaurantQuery = {};
    if (filter.cuisine) {
      query.cuisines = filter.cuisine;
    }
    return this.restaurantModel.find(query).exec();
  }

  async findOne(identifier: string): Promise<Restaurant> {
    const isObjectId = identifier.match(/^[0-9a-fA-F]{24}$/);
    const restaurant = isObjectId
      ? await this.restaurantModel.findById(identifier)
      : await this.restaurantModel.findOne({ slug: identifier });

    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }

  async findNearby(long: number, lat: number): Promise<Restaurant[]> {
    return this.restaurantModel.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [long, lat] },
          $maxDistance: 1000, // 1 KM
        },
      },
    });
  }
}
