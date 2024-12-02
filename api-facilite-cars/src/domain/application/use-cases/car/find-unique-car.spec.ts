import { makerCar } from 'test/factories/maker-cars'
import { InMemoryCarsRepository } from 'test/repositories/in-memory-cars-repository'
import { FindUniqueCarUseCase } from './find-unique.car'

let inMemoryCar: InMemoryCarsRepository
let sut: FindUniqueCarUseCase

describe('Find many car use case', () => {
  beforeEach(() => {
    inMemoryCar = new InMemoryCarsRepository()
    sut = new FindUniqueCarUseCase(inMemoryCar)
  })

  it('should be able to findunique a new car', async () => {
    const generateCar = makerCar()

    inMemoryCar.items.push(generateCar)

    const result = await sut.execute({
      id: generateCar.id.toString(),
    })

    expect(result.isRight()).toBeTruthy()

    if (result.isRight()) {
      expect(result.value.cars).toEqual(generateCar)
    }
  })
})
