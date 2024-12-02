"use client";

import { useState } from "react";
import { SearchBar } from "@/components/ui/searchBar";
import MessageEffect from "@/components/ui/titleAnimated";
import { fetchCar } from "@/http/fetch-cars";
import { useQuery } from "@tanstack/react-query";
import { CardCar } from "@/components/card-car";
import PaymentModal from "@/components/ui/modalPaymentType";

type ModalProps = {
  isOpen: boolean;
  model?: string;
  value?: number;
  onClose: () => void;
  onOpenPaymentModal: () => void;
};

const CarModal = ({
  isOpen,
  model,
  value,
  onClose,
  onOpenPaymentModal,
}: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">
          Detalhes do Carro
        </h2>
        <p className="text-lg text-gray-600">Nome do Carro: {model}</p>
        <p className="text-lg text-gray-600">Preço: R$ {value}</p>
        <button
          onClick={onOpenPaymentModal}
          className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600"
        >
          Escolher Forma de Pagamento
        </button>
      </div>
    </div>
  );
};
export default function Home() {
  const { data: dataCars } = useQuery({
    queryKey: ["fetch-cars"],
    queryFn: () => fetchCar(),
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null); // Alterado para armazenar o objeto completo
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>(
    undefined
  );

  const handleOpenModal = (car: any) => {
    setSelectedCar(car);
    setSelectedPrice(car.value);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedCar(null);
  };

  const handleOpenPaymentModal = () => {
    setModalOpen(false);
    setPaymentModalOpen(true);
  };

  const handleClosePaymentModal = () => {
    setPaymentModalOpen(false);
  };

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
      <div className="flex items-center justify-center gap-6 flex-wrap">
        {filteredCars?.map((item) => {
          return (
            <CardCar
              key={item.id}
              item={item}
              onClick={() => handleOpenModal(item)}
            />
          );
        })}
      </div>

      <CarModal
        isOpen={isModalOpen}
        model={selectedCar?.model}
        onClose={handleCloseModal}
        onOpenPaymentModal={handleOpenPaymentModal}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={handleClosePaymentModal}
        onSelectPayment={(method: any) => method}
        carDetails={selectedCar}
      />
    </div>
  );
}
