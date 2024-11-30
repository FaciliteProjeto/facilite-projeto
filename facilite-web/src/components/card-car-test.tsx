import Image from "next/image";
import { Card, CardContent } from "./ui/card";

interface CarsProos {
  item: {
    id: string;
    chassisNumber: string;
    licensePlate: string;
    brand: string;
    model: string;
    manufacturingYear: number;
    modelYear: number;
    color: string;
    value: number;
  };
}

export function CardCarTest({ item }: CarsProos) {
  return (
    <Card className="w-[500px] h-[300px] mt-6 flex flex-col gap-4 shadow-xl bg-[#f2f3f5] hover:scale-90 hover:translate-x-4 hover:translate-y-4 cursor-pointer transition-transform duration-300">
      <CardContent className="flex flex-col items-center justify-between flex-1 p-4">
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://www.pngall.com/wp-content/uploads/5/Lamborghini-Aventador-PNG-File.png"
            alt="Car Image"
            width={240}
            height={160}
            className="object-cover"
          />
        </div>

        <i className="text-xl font-semibold text-center mb-4">{item.model}</i>
      </CardContent>
      <div>
        <div className="w-full flex items-center justify-around p-1 rounded-br-sm bg-[#dde1e7] ">
          <span className="text-md font-medium text-gray-600">KM 0</span>
          <span className="text-md font-medium text-gray-600">Automático</span>
          <span className="text-md font-medium text-gray-600">2024</span>
        </div>
        <div className="flex h-[60px] w-full bg-slate-500 p-2 rounded-b-sm">
          <div className="w-1/2 flex items-center justify-center p-4 bg-slate-600 rounded">
            <span className="text-md font-medium text-yellow-100">
              {item.value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </div>
          <div className="w-1/2 flex items-center justify-center rounded-br-sm">
            <span className="text-md font-medium text-white">{item.model}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
