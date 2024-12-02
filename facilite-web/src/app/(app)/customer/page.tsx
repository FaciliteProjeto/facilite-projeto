"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchInstallment } from "@/http/fetch-installment";
import { findManyOrderByCustomerId } from "@/http/find-many-order-by-customer-id";
import { paymentInstallMent } from "@/http/payment-installment";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface OrderProps {
  id: string;
  userId: string;
  customerId: string;
  carId: string;
  price: number;
  createdAt: Date;
}

interface InstallmentProps {
  id: string;
  orderId: string;
  dueDate: Date;
  amount: number;
  isPaid: boolean;
}

export default function CustomerPayment() {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [installments, setInstallments] = useState<InstallmentProps[]>([]);
  const [loadingPayment, setLoadingPayment] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersData = await findManyOrderByCustomerId();
      setOrders(ordersData);
    };
    fetchOrders();
  }, []);

  const fetchInstallments = async (orderId: string) => {
    const installmentsData = await fetchInstallment({ orderId });
    setInstallments(installmentsData);
  };

  const handlePayment = async (installmentId: string) => {
    try {
      setLoadingPayment(installmentId);
      await paymentInstallMent({ installmentId });
      setInstallments((prevInstallments) =>
        prevInstallments.map((installment) =>
          installment.id === installmentId
            ? { ...installment, isPaid: true }
            : installment
        )
      );
      toast.success("Pagamento realizado com sucesso!");
    } catch (error) {
      console.error("Erro ao realizar pagamento:", error);
      toast.error("Erro ao realizar pagamento. Tente novamente.");
    } finally {
      setLoadingPayment(null);
    }
  };

  return (
    <div className="p-6 flex flex-col h-full gap-6">
      <h2 className="text-2xl font-medium">Fluxo de Parcelas</h2>

      <div className="flex flex-col gap-6">
        <div className="flex gap-6 mb-4">
          {orders?.map((order: OrderProps) => (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
<span
              key={order.id}
              className="font-bold underline cursor-pointer"
              onClick={() => fetchInstallments(order.id)}
            >
              Contrato {order.id.substring(2, 18)}
            </span>
          ))}
        </div>

        {/* Card de Pagamento */}
        <Card className="w-full relative h-64 items-center flex-row justify-around flex bg-gradient-to-b from-gray-800 via-gray-800 to-gray-800 text-white mb-10 rounded-lg shadow-lg overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="../../../—Pngtree—online payment cashback credit card_5593051.jpg"
              alt="Fundo"
              className="w-full h-64 object-cover opacity-20"
            />
          </div>

          <div className="relative z-10 p-6 flex w-full flex-row justify-between items-center">
            <div className="h-full flex items-center justify-center w-96 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 shadow-slate-900">
              <img
                src="../../../verified-payment.png"
                alt="Pagamento"
                width={250}
                className="mb-4"
              />
            </div>
            <div className="h-full w-1/3 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 shadow-slate-900">
              <CardHeader className="text-center">
                <CardTitle className="text-[#F9D270] text-xl font-bold">
                  Próximo pagamento
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <p className="text-3xl font-bold">
                  {installments[0]?.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }) || "N/A"}
                </p>
                <p className="text-sm mt-2">
                  vencimento{" "}
                  {installments[0]?.dueDate
                    ? new Date(installments[0].dueDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  className="w-96 bg-green-500 text-black font-bold hover:bg-green-600"
                  onClick={() =>
                    installments[0] &&
                    !installments[0]?.isPaid &&
                    handlePayment(installments[0]?.id)
                  }
                  disabled={loadingPayment === installments[0]?.id}
                >
                  {loadingPayment === installments[0]?.id
                    ? "Processando..."
                    : "Pagar"}
                </Button>
              </CardFooter>
            </div>
          </div>
        </Card>

        {/* Tabela de Parcelas */}
        <Table className="w-full max-w-full border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="bg-[#F5F5F5]">
              <TableHead className="px-4 py-2 text-left border border-gray-300">
                Nº
              </TableHead>
              <TableHead className="px-4 py-2 text-left border border-gray-300">
                Data Venc
              </TableHead>
              <TableHead className="px-4 py-2 text-left border border-gray-300">
                Valor
              </TableHead>
              <TableHead className="px-4 py-2 text-left border border-gray-300">
                Status
              </TableHead>
              <TableHead className="px-4 py-2 border border-gray-300">
                Ação
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {installments?.map((installment, index) => (
              <TableRow key={installment.id} className="hover:bg-[#EAEAEA]">
                <TableCell className="px-4 py-2 border border-gray-300">
                  {index + 1}
                </TableCell>
                <TableCell className="px-4 py-2 border border-gray-300">
                  {new Date(installment.dueDate).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-4 py-2 border border-gray-300">
                  {installment.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell className="px-4 py-2 border border-gray-300">
                  {installment.isPaid ? "Pago" : "A vencer"}
                </TableCell>
                <TableCell className="px-4 w-32 justify-center py-2 border border-gray-300 text-right">
                  <Button
                    variant="outline"
                    className={`px-6 py-1 border-2 ${
                      installment.isPaid
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-white hover:text-green-500 transition"
                    }`}
                    onClick={() =>
                      !installment.isPaid && handlePayment(installment.id)
                    }
                    disabled={installment.isPaid || loadingPayment === installment.id}
                  >
                    {loadingPayment === installment.id
                      ? "Processando..."
                      : "Pagar"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
