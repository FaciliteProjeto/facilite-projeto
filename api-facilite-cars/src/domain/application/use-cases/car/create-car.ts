import { type Either, right } from '@/core/either';
import { Cars } from '@/domain/enterprise/entities/cars';
import { Injectable } from '@nestjs/common';
import { CarsRepository } from '../../repositories/cars-repository';

interface CreateCarUseCaseRequest {
  chassisNumber: string;
  licensePlate: string;
  brand: string;
  model: string;
  manufacturingYear: number;
  modelYear: number;
  color: string;
  value: number;
  posterUrl: string | any;
}

type CreateCarUseCaseResponse = Either<null, null>;

@Injectable()
export class CreateCarUseCase {
  constructor(private carRepository: CarsRepository) {}

  async execute({
    chassisNumber,
    licensePlate,
    brand,
    model,
    manufacturingYear,
    modelYear,
    color,
    value,
    posterUrl,
  }: CreateCarUseCaseRequest): Promise<CreateCarUseCaseResponse> {
    const car = Cars.create({
      chassisNumber,
      licensePlate,
      brand,
      model,
      manufacturingYear,
      modelYear,
      color,
      value,
      posterUrl,
    });

    await this.carRepository.create(car);

    return right(null);
  }
}
