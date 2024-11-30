"use client";

import { CardCarTest } from "@/components/card-car-test";
import { fetchCar } from "@/http/fetch-cars";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: dataCars } = useQuery({
    queryKey: ["fetch-cars"],
    queryFn: () => fetchCar(),
  });

  return (
    <div className="flex flex-col px-2">
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {dataCars?.map((item) => {
          return <CardCarTest key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
