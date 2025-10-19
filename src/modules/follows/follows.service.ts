import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Follow } from './schemas/follow.schema';

@Injectable()
export class FollowsService {
  constructor(@InjectModel(Follow.name) private followModel: Model<Follow>) {}

  async followRestaurant(
    userId: string,
    restaurantId: string,
  ): Promise<Follow> {
    const userObjectId = new Types.ObjectId(userId);
    const restaurantObjectId = new Types.ObjectId(restaurantId);
    return this.followModel.create({
      userId: userObjectId,
      restaurantId: restaurantObjectId,
    });
  }

  async getUserFollows(userId: string): Promise<Follow[]> {
    const userObjectId = new Types.ObjectId(userId);
    return this.followModel
      .find({ userId: userObjectId })
      .populate('restaurantId');
  }

  async getFollowers(restaurantId: string): Promise<Follow[]> {
    const restaurantObjectId = new Types.ObjectId(restaurantId);
    return this.followModel
      .find({ restaurantId: restaurantObjectId })
      .populate('userId');
  }
}
