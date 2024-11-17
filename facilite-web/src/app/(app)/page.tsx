'use client'

import { CardCar } from '@/components/card-car'
import { fetchCar } from '@/http/fetch-cars'
import { useQuery } from '@tanstack/react-query'

export default function Home() {
  const { data: dataCars } = useQuery({
    queryKey: ['fetch-cars'],
    queryFn: () => fetchCar(),
  })

  return (
    <div className="flex flex-col px-2">
      <div className="flex gap-3 flex-wrap">
        {dataCars?.map(item => {
          return <CardCar key={item.id} item={item} />
        })}
      </div>
    </div>
  )
}
