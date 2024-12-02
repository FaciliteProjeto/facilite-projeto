import { CreditCard, Barcode, QrCode, DollarSign } from "lucide-react";
import React, { useState } from "react";
import { SearchBar } from "./searchBar";

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectPayment: (paymentMethod: string) => void;
  carDetails: {
    model: string;
    value: string;
    cliente: string | null;
    cpf: string | null;
  } | null;
};

const mockClients: Client[] = [
  { id: "1", name: "João Silva", cpf: "123.456.789-00" },
  { id: "2", name: "Maria Oliveira", cpf: "987.654.321-00" },
  { id: "3", name: "Carlos Souza", cpf: "111.222.333-44" },
];

const PaymentModal = ({
  isOpen,
  onClose,
  onSelectPayment,
  carDetails,
}: PaymentModalProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  if (!isOpen) return null;

  const paymentOptions = [
    { name: "Boleto", icon: <Barcode className="w-6 h-6 text-gray-700" /> },
    { name: "PIX", icon: <QrCode className="w-6 h-6 text-gray-700" /> },
    {
      name: "Consórcio",
      icon: <DollarSign className="w-6 h-6 text-gray-700" />,
    },
    {
      name: "Cartão de Crédito",
      icon: <CreditCard className="w-6 h-6 text-gray-700" />,
    },
  ];

  const handlePaymentSelection = (method: string) => {
    setSelectedPaymentMethod(method);
    onSelectPayment(method);
  };

  const handleFinalize = () => {
    console.log("Finalizando compra...");
    onClose();
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockClients.filter((client) =>
      client.name.toLowerCase().includes(term.toLowerCase())
    );
    if (filtered.length === 1) {
      setSelectedClient(filtered[0]);
      if (carDetails) {
        carDetails.cliente = filtered[0].name;
        carDetails.cpf = filtered[0].cpf;
      }
    } else {
      setSelectedClient(null);
      if (carDetails) {
        carDetails.cliente = null;
        carDetails.cpf = null;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-lg rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          ✕
        </button>
        <div className="w-full flex justify-between flex-col items-center mt-4">
          <div>
            <img src="icon-payment.png" alt="Fundo" className="w-40 h-30" />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-700">
            Escolha sua forma de pagamento
          </h2>
        </div>

        <div className="flex flex-wrap gap-4">
          {paymentOptions.map((option) => (
            <div
              key={option.name}
              onClick={() => handlePaymentSelection(option.name)}
              className={`p-4 bg-gray-100 hover:bg-gray-200 rounded cursor-pointer text-center font-medium text-gray-700 flex-1 transition duration-300 ease-in-out ${
                selectedPaymentMethod === option.name
                  ? "bg-green-500 text-white border-2 border-gray-900"
                  : ""
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                {option.icon}
                <span>{option.name}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <SearchBar
            placeholder="Pesquisar cliente"
            searchTerm={searchTerm}
            setSearchTerm={handleSearch}
          />
          <div className="mt-4">
            {selectedClient && (
              <div className="text-gray-600">
                <strong>Cliente Selecionado: </strong>
                {selectedClient.name} - {selectedClient.cpf}
              </div>
            )}
          </div>
        </div>

        {selectedPaymentMethod && carDetails && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800">
              Detalhes da Compra
            </h3>
            <div className="mt-4">
              <p className="text-gray-600">
                <strong>Carro: </strong>
                {carDetails.model}
              </p>
              <p className="text-gray-600">
                <strong>Preço: </strong>R$ {String(carDetails.value)}
              </p>
              <p className="text-gray-600">
                <strong>Forma de Pagamento: </strong>
                {selectedPaymentMethod}
              </p>
              <p className="text-gray-600">
                <strong>Cliente: </strong>
                {carDetails.cliente || "Não selecionado"}
              </p>
              <p className="text-gray-600">
                <strong>CPF: </strong>
                {carDetails.cpf || "Não informado"}
              </p>
            </div>
            <button
              onClick={handleFinalize}
              className="mt-6 w-full bg-gray-800 hover:bg-gray-400 text-white font-semibold py-2 px-4 rounded"
            >
              Finalizar Compra
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;

interface Client {
  id: string;
  name: string;
  cpf: string;
}
