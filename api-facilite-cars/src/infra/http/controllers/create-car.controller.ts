import { CreateCarUseCase } from '@/domain/application/use-cases/car/create-car'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common'
import { z } from 'zod'

const createCarBodySchema = z.object({
  chassisNumber: z.string(),
  licensePlate: z.string(),
  brand: z.string(),
  model: z.string(),
  manufacturingYear: z.number().int().min(1886),
  modelYear: z.number().int().min(1886),
  color: z.string(),
  value: z.number(),
})

type CreateCarBodySchema = z.infer<typeof createCarBodySchema>

@Controller('cars')
@UseGuards(JwtAuthGuard)
export class CreateCarController {
  constructor(private createCar: CreateCarUseCase) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCarBodySchema))
  async handler(@Body() body: CreateCarBodySchema) {
    const {
      chassisNumber,
      licensePlate,
      brand,
      model,
      manufacturingYear,
      modelYear,
      color,
      value,
    } = body

    const response = await this.createCar.execute({
      chassisNumber,
      licensePlate,
      brand,
      model,
      manufacturingYear,
      modelYear,
      color,
      value,
    })

    if (response.isLeft()) {
      throw new BadRequestException(response.value)
    }
  }
}
