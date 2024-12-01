import { FindManyCarUseCase } from '@/domain/application/use-cases/car/find-many-car';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CarPresenter } from '../presenters/car-presenter';

@Controller('cars')
@UseGuards(JwtAuthGuard)
export class FindManyCarController {
  constructor(private findManyCar: FindManyCarUseCase) {}

  @Get()
  @HttpCode(200)
  async handler() {
    const response = await this.findManyCar.execute();

    if (response.isLeft()) {
      throw new BadRequestException(response.value);
    }

    const car = response.value.cars.map(CarPresenter.toHTTP);
    console.log(car);

    return {
      car,
    };
  }
}
