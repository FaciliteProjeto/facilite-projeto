import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const superCars = [
    {
      chassisNumber: 'SF90FERRAR123456',
      licensePlate: 'LUX-1234',
      brand: 'Ferrari',
      model: 'SF90 Stradale',
      manufacturingYear: 2023,
      modelYear: 2024,
      color: 'Red',
      value: 5200000,
    },
    {
      chassisNumber: 'LAMBOAVENT123457',
      licensePlate: 'LUX-5678',
      brand: 'Lamborghini',
      model: 'Aventador SVJ',
      manufacturingYear: 2022,
      modelYear: 2023,
      color: 'Yellow',
      value: 4500000,
    },
    {
      chassisNumber: 'BUGATTICHIR123458',
      licensePlate: 'LUX-9012',
      brand: 'Bugatti',
      model: 'Chiron',
      manufacturingYear: 2021,
      modelYear: 2022,
      color: 'Blue',
      value: 12000000,
    },
    {
      chassisNumber: 'MCLARENSENN123459',
      licensePlate: 'LUX-3456',
      brand: 'McLaren',
      model: 'Senna',
      manufacturingYear: 2020,
      modelYear: 2021,
      color: 'Orange',
      value: 8000000,
    },
    {
      chassisNumber: 'PORSCHE918SPY123450',
      licensePlate: 'LUX-7890',
      brand: 'Porsche',
      model: '918 Spyder',
      manufacturingYear: 2019,
      modelYear: 2020,
      color: 'Silver',
      value: 7000000,
    },
    {
      chassisNumber: 'ASTONVALKY123451',
      licensePlate: 'LUX-1111',
      brand: 'Aston Martin',
      model: 'Valkyrie',
      manufacturingYear: 2023,
      modelYear: 2024,
      color: 'Green',
      value: 12000000,
    },
    {
      chassisNumber: 'ROLLSPHANTOM123452',
      licensePlate: 'LUX-2222',
      brand: 'Rolls-Royce',
      model: 'Phantom',
      manufacturingYear: 2023,
      modelYear: 2024,
      color: 'Black',
      value: 6200000,
    },
    {
      chassisNumber: 'MERCAMGONE123453',
      licensePlate: 'LUX-3333',
      brand: 'Mercedes',
      model: 'AMG One',
      manufacturingYear: 2022,
      modelYear: 2023,
      color: 'Silver',
      value: 10200000,
    },
    {
      chassisNumber: 'PAGANIHUAYR123454',
      licensePlate: 'LUX-4444',
      brand: 'Pagani',
      model: 'Huayra',
      manufacturingYear: 2021,
      modelYear: 2022,
      color: 'Purple',
      value: 14000000,
    },
    {
      chassisNumber: 'KOENIGAGER123455',
      licensePlate: 'LUX-5555',
      brand: 'Koenigsegg',
      model: 'Agera RS',
      manufacturingYear: 2020,
      modelYear: 2021,
      color: 'White',
      value: 13000000,
    },
  ]

  // Geração de 20 registros com chassisNumber únicos
  const replicatedCars = Array.from({ length: 20 }, (_, index) => {
    const baseCar = superCars[index % superCars.length] // Reutiliza os carros do array base
    return {
      ...baseCar,
      chassisNumber: `${baseCar.chassisNumber}-${index + 1}`, // Adiciona um sufixo único
      licensePlate: `LUX-${(index + 1000).toString().padStart(4, '0')}`, // Gera placas únicas
    }
  })

  for (const car of replicatedCars) {
    await prisma.car.create({
      data: car,
    })
  }

  console.log('Seed completed successfully with super cars data!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
