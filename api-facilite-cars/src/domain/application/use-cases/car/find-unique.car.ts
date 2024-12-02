import { type Either, left, right } from '@/core/either'
import { Cars } from '@/domain/enterprise/entities/cars'
import { Injectable } from '@nestjs/common'
import { CarsRepository } from '../../repositories/cars-repository'
import { WrongHandleError } from '../errors/wrong-handle-error'

interface FindUniqueCarUseCaseRequest {
  id: string
}

type FindUniqueCarUseCaseResponse = Either<
  WrongHandleError,
  {
    cars: Cars
  }
>

@Injectable()
export class FindUniqueCarUseCase {
  constructor(private carsRepository: CarsRepository) {}

  async execute({
    id,
  }: FindUniqueCarUseCaseRequest): Promise<FindUniqueCarUseCaseResponse> {
    const cars = await this.carsRepository.findUnique(id)

    if (!cars) {
      return left(new WrongHandleError('Item não encontrado!'))
    }

    return right({
      cars,
    })
  }
}
