import { type Either, right } from '@/core/either';
import { Cars } from '@/domain/enterprise/entities/cars';
import { Injectable } from '@nestjs/common';
import { CarsRepository } from '../../repositories/cars-repository';

type FindManyCarUseCaseResponse = Either<
  null,
  {
    cars: Cars[];
  }
>;

@Injectable()
export class FindManyCarUseCase {
  constructor(private carsRepository: CarsRepository) {}

  async execute(): Promise<FindManyCarUseCaseResponse> {
    const cars = await this.carsRepository.findMany();

    return right({
      cars,
    });
  }
}
