import Image from 'next/image'
import { Card, CardContent } from './ui/card'

interface CarsProos {
  item: {
    id: string
    chassisNumber: string
    licensePlate: string
    brand: string
    model: string
    manufacturingYear: number
    modelYear: number
    color: string
    value: number
  }
}

export function CardCar({ item }: CarsProos) {
  return (
    <Card className="w-60 h-40 bg-[#D9D9D9]">
      <CardContent>
        <Image
          src="https://e7.pngegg.com/pngimages/787/991/png-clipart-red-lamborghini-aventador-coupe-aventador-lamborghini-transport-cars.png"
          width={0}
          height={0}
          className="w-full h-28"
          sizes="100vh"
          objectFit="container"
          alt=""
        />
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-900">
            {item.model}
          </span>
          <span className="text-xs font-medium text-gray-900">
            R${' '}
            {item.value.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
