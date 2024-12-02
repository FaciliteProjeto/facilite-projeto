import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.installment.deleteMany();
  await prisma.order.deleteMany();
  await prisma.car.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      cpf: '33453345678',
      email: 'john@email.com',
      name: 'John Doe',
      password: await hash('123456', 6),
      phone: '92992384733',
    },
  });

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
      posterUrl:
        'https://pensecarros.com.br/cms/uploads/ferrari-sf90-3-9-v8-turbo-phev-stradale-f1-dct-618491de0e3f2.png',
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
      posterUrl:
        'https://i.pinimg.com/originals/96/4d/ed/964dedc9edbc5a48daa2b9e20f3f4f2e.png',
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
      posterUrl:
        'https://file.aiquickdraw.com/imgcompressed/img/compressed_16a75d24f420b93e42d98beeaa1a8fcd.webp',
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
      posterUrl:
        'https://cdn.wheel-size.com/automobile/body/mclaren-senna-2018-2020-1589969517.1607914.png',
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
      posterUrl:
        'https://platform.cstatic-images.com/in/v2/stock_photos/44c8e8dc-f5c1-4164-b7a1-b6b2faeff2dc/12446f50-d00b-4941-a014-1e4131f2fcb2.png',
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
      posterUrl:
        'https://cdn.grange.co.uk/assets/new-cars/aston-martin/valkyrie/coupe/pbpvi5c5xfp.webp',
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
      posterUrl:
        'https://images.squarespace-cdn.com/content/v1/644fe8688e0cf82461cd2802/8e48f333-cd3c-4e1e-9d8c-643e52b7cf78/phantom3.png?format=1000w',
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
      posterUrl:
        'https://i.seadn.io/gae/1h7r74qVrf57kYPim66cEBS9hpf0Kxe0-cHjaz_2tWzZBnbxKOXubGjvXlSeNWzp3NdGPNNAmQ-y0ehzNZ4Y247It-R3t4UgsdS3?auto=format&dpr=1&w=1920',
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
      posterUrl:
        'https://ik.imagekit.io/2ero5nzbxo2/tr:di-placeholder.png,q-70,w-375,q-70/FILES/generations/zo866pcmjYCE471rRKv0GGTbV6SzaUTWEN9gBHeb.png?ik-sdk-version=php-2.0.0',
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
      posterUrl:
        'https://www.pngplay.com/wp-content/uploads/13/Koenigsegg-Agera-R-Transparent-Images.png',
    },
  ];

  const replicatedCars = Array.from({ length: 20 }, (_, index) => {
    const baseCar = superCars[index % superCars.length];
    return {
      ...baseCar,
      chassisNumber: `${baseCar.chassisNumber}-${index + 1}`,
      licensePlate: `LUX-${(index + 1000).toString().padStart(4, '0')}`,
    };
  });

  for (const car of replicatedCars) {
    await prisma.car.create({
      data: car,
    });
  }

  console.log('Seed completed successfully with super cars data!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
