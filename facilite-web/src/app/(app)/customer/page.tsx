'use client'

import { Button } from "@/components/ui/button";
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

import { toast } from 'sonner';

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

    console.log(installmentsData)
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

      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 flex-col">
          <div className="flex gap-6 mb-4 flex-col">
            <div className="flex w-full flex-col justify-between">
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
        </div>
      </div>
    </div>
  );
}
