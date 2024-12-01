"use client";

import { useState } from "react"; // Para gerenciar o estado da pesquisa
import { CardCarTest } from "@/components/card-car-test";
import { SearchBar } from "@/components/ui/searchBar";
import MessageEffect from "@/components/ui/titleAnimated";
import { fetchCar } from "@/http/fetch-cars";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: dataCars } = useQuery({
    queryKey: ["fetch-cars"],
    queryFn: () => fetchCar(),
  });

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCars = dataCars?.filter((car) =>
    car.model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col px-2">
      <div className="flex h-20 flex-row mt-5 justify-between items-center px-4 space-x-4">
        <MessageEffect
          message={
            "Confira nossos carros incríveis! Encontre o carro dos seus sonhos com os melhores preços e condições."
          }
        />
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      {filteredCars?.length === 0 && (
        <div className="flex p-20 w-full h-full flex-col items-center justify-center">
          <img
            src="../../searchNotFound.png"
            alt="Fundo"
            className="w-60 h-60 opacity-10"
          />
          <h1 className="text-xl font-abel font-bold text-gray-400 mt-5">
            Nenhum resultado encontrado
          </h1>
        </div>
      )}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        {filteredCars?.map((item) => {
          return <CardCarTest key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
