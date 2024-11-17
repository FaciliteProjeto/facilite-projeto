import { FindUniqueCarUseCase } from '@/domain/application/use-cases/car/find-unique.car'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  Param,
  UseGuards,
} from '@nestjs/common'
import { CarPresenter } from '../presenters/car-presenter'

@Controller('cars/:carId')
@UseGuards(JwtAuthGuard)
export class FindUniqueCarController {
  constructor(private findUniqueCar: FindUniqueCarUseCase) {}

  @Get()
  @HttpCode(200)
  async handler(@Param('carId') carId: string) {
    const response = await this.findUniqueCar.execute({
      id: carId,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value.message)
    }

    const car = CarPresenter.toHTTP(response.value.cars)

    return {
      car,
    }
  }
}
