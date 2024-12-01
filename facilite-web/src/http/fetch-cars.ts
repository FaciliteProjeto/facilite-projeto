import { api } from "./api-client";

interface FetchCarResponse {
  car: {
    id: string;
    chassisNumber: string;
    licensePlate: string;
    brand: string;
    model: string;
    manufacturingYear: number;
    modelYear: number;
    color: string;
    value: number;
    posterUrl: string;
  }[];
}

export async function fetchCar() {
  const result = await api.get("cars").json<FetchCarResponse>();
  console.log(result.car);

  return result.car;
}
