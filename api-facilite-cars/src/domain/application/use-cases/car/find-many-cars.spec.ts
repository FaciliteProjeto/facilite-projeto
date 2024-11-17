import { makerCar } from 'test/factories/maker-cars'
import { InMemoryCarsRepository } from 'test/repositories/in-memory-cars-repository'
import { FindManyCarUseCase } from './find-many-car'

let inMemoryCar: InMemoryCarsRepository
let sut: FindManyCarUseCase

describe('Find many car use case', () => {
  beforeEach(() => {
    inMemoryCar = new InMemoryCarsRepository()
    sut = new FindManyCarUseCase(inMemoryCar)
  })

  it('should be able to findmany a new car', async () => {
    for (let i = 0; i < 20; i++) {
      const generateCar = makerCar()

      inMemoryCar.items.push(generateCar)
    }

    const result = await sut.execute()

    expect(result.isRight()).toBeTruthy()

    expect(result.value?.cars).toHaveLength(20)
  })
})
