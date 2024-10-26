import { InMemoryCarsRepository } from 'test/repositories/in-memory-cars-repository'
import { CreateCarUseCase } from './create-car'

let inMemoryCar: InMemoryCarsRepository
let sut: CreateCarUseCase

describe('Create car use case', () => {
  beforeEach(() => {
    inMemoryCar = new InMemoryCarsRepository()
    sut = new CreateCarUseCase(inMemoryCar)
  })

  it('should be able to create a new car', async () => {
    const result = await sut.execute({
      chassisNumber: '1234567890',
      licensePlate: 'ABC-1234',
      brand: 'Volkswagen',
      model: 'Fusca',
      manufacturingYear: 1970,
      modelYear: 1970,
      color: 'Amarelo',
      value: 30000,
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemoryCar.items[0]).toEqual(
      expect.objectContaining({
        chassisNumber: '1234567890',
        licensePlate: 'ABC-1234',
        brand: 'Volkswagen',
        model: 'Fusca',
        manufacturingYear: 1970,
        modelYear: 1970,
        color: 'Amarelo',
        value: 30000,
      })
    )
  })
})
