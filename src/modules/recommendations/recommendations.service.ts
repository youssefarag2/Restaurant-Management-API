import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { User } from '../users/schemas/user.schema';
import { Follow } from '../follows/schemas/follow.schema';

@Injectable()
export class RecommendationService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Follow.name) private followModel: Model<Follow>,
  ) {}

  async getRecommendations(
    userId: string,
  ): Promise<
    { message: string } | { similarUsers: Types.ObjectId[]; restaurants: any[] }
  > {
    if (!Types.ObjectId.isValid(userId)) {
      throw new BadRequestException('Invalid userId');
    }
    const userObjectId = new Types.ObjectId(userId);

    // Step 1: Find the user and their favorite cuisines
    const user = await this.userModel.findById(userObjectId);
    if (!user) return { message: 'User not found' };

    // Step 2: Aggregation pipeline
    const pipeline: PipelineStage[] = [
      { $match: { _id: { $ne: userObjectId } } },
    ];

    if (Array.isArray(user.favoriteCuisines) && user.favoriteCuisines.length) {
      pipeline.push({
        $match: { favoriteCuisines: { $in: user.favoriteCuisines } },
      });
    }

    pipeline.push(
      {
        $lookup: {
          from: 'follows',
          let: { userId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: [{ $toObjectId: '$userId' }, '$$userId'],
                },
              },
            },
          ],
          as: 'follows',
        },
      },
      { $unwind: '$follows' },
      {
        $lookup: {
          from: 'restaurants',
          let: { restaurantId: '$follows.restaurantId' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', { $toObjectId: '$$restaurantId' }] },
              },
            },
          ],
          as: 'restaurant',
        },
      },
      { $unwind: '$restaurant' },
      {
        $group: {
          _id: null,
          similarUsers: { $addToSet: '$_id' },
          restaurants: { $addToSet: '$restaurant' },
        },
      },
    );

    const result: { similarUsers: Types.ObjectId[]; restaurants: any[] }[] =
      await this.userModel.aggregate(pipeline);

    if (!result.length)
      return { message: 'No similar users or restaurants found' };

    return {
      similarUsers: result[0].similarUsers || [],
      restaurants: Array.isArray(result[0].restaurants)
        ? result[0].restaurants
        : [],
    };
  }
}
