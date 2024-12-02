'use client'

import { type FetchUserResponse } from "@/auth/auth";
import { api } from "@/http/api-client";
import { createOrder } from "@/http/create-order";
import { getCustomerByCpf } from "@/http/get-customer-by-cpf";
import { useMutation } from "@tanstack/react-query";
import { Barcode, CreditCard, DollarSign, QrCode } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./button";
interface Client {
  id: string;
  name: string;
  cpf: string;
}

export interface CarsProps {
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
}

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayment: (paymentMethod: string) => void;
  carDetails: CarsProps | null;
};

export function PaymentModal ({
  isOpen,
  onClose,
  onSelectPayment,
  carDetails,
}: PaymentModalProps) {
  if (!isOpen) return null;


  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [installments, setInstallments] = useState<string>("")


  const paymentOptions = [
    { name: "Boleto", icon: <Barcode className="w-6 h-6 text-gray-700" /> },
    { name: "PIX", icon: <QrCode className="w-6 h-6 text-gray-700" /> },
    { name: "Consórcio", icon: <DollarSign className="w-6 h-6 text-gray-700" /> },
    { name: "Cartão de Crédito", icon: <CreditCard className="w-6 h-6 text-gray-700" /> },
  ];

  const handlePaymentSelection = (method: string) => {
    setSelectedPaymentMethod(method);
    onSelectPayment(method);
  };

  const handleSearch = async () => {
    try {
      const customer = await getCustomerByCpf(searchTerm);

      setSelectedClient(customer);
      setSearchError(null);
    } catch (error) {
      setSearchError("Cliente não encontrado. Verifique o CPF.");
      setSelectedClient(null);
    }
  };

const { mutate: createOrderMutation, isPending } = useMutation({
  mutationKey: ['create-order'],
  mutationFn: async (orderData: Parameters<typeof createOrder>[0]) => {
    return await createOrder(orderData);
  },
  onSuccess: () => {
    toast.success("Compra finalizada com sucesso!", { className: 'bg-green-800 text-green-300'});
    onClose();
  },
  onError: (error) => {
    toast.error(`Erro ao finalizar compra: ${error.message || "Tente novamente"}`);
  },
});

const handleFinalize = async () => {
 const { user } = await api.get('me').json<FetchUserResponse>()


  if (carDetails && selectedPaymentMethod && selectedClient && installments) {
    try {
      const orderData = {
        userId: user?.id ? user.id : '',
        customerId: selectedClient.id,
        price: carDetails.value,
        carId: carDetails.id,
        installmentsCount: Number(installments),
        paymentMethod: selectedPaymentMethod,
      };

      createOrderMutation(orderData);
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  } else {
    alert("Por favor, preencha todas as informações necessárias.");
  }
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative">
        <Button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </Button>
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Escolha sua forma de pagamento</h2>

        <div className="flex flex-wrap gap-4">
          {paymentOptions.map((option) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              key={option.name}
              onClick={() => handlePaymentSelection(option.name)}
              className={`p-4 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center font-medium text-gray-700 flex-1 transition duration-300 ease-in-out ${
                selectedPaymentMethod === option.name ? "border-2 border-green-300" : ""
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {option.icon}
                <span>{option.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Pesquisar CPF"
          />
          <Button
            onClick={handleSearch}
            className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
          >
            Pesquisar
          </Button>
        </div>

        {searchError && <p className="text-red-600 mt-2">{searchError}</p>}

        {selectedClient && (
          <div className="mt-4 text-gray-600">
            <strong>Cliente Selecionado: </strong>
            {selectedClient.name} - {selectedClient.cpf}
          </div>
        )}

        <div className="mt-5">
          <label htmlFor="installments" className="block text-gray-700 font-semibold mb-2">
            Number of Installments
          </label>
          <input
            type="number"
            id="installments"
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            className="border rounded-md px-4 py-2 w-full"
            placeholder="Número de Parcelas"
            min="1"
          />
        </div>

        {selectedPaymentMethod && carDetails && selectedClient && installments && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">Detalhes da Compra</h3>
            <div className="mt-4">
              <p><strong>Carro: </strong>{carDetails.model}</p>
              <p><strong>Preço: </strong>R$ {String(carDetails.value)}</p>
              <p><strong>Forma de Pagamento: </strong>{selectedPaymentMethod}</p>
              <p><strong>Cliente: </strong>{selectedClient.name}</p>
              <p><strong>CPF: </strong>{selectedClient.cpf}</p>
              <p><strong>Número de Parcelas: </strong>{installments}</p>
            </div>
              <Button
            onClick={handleFinalize}
            disabled={isPending}
            className={`mt-6 w-full font-semibold py-2 px-4 rounded ${
              isPending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gray-800 hover:bg-gray-400 text-white"
            }`}
          >
            {isPending ? "Finalizando..." : "Finalizar Compra"}
              </Button>
          </div>
        )}
      </div>
    </div>
  );
};

