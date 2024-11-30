"use client";
import { getOrderByCustomerId } from "@/auth/auth";

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

// export default async function CustomerPayment() {
// } from "@/components/ui/table";
import { useParams } from "next/navigation";

export default async function CustomerPayment() {
  const orders = await getOrderByCustomerId();
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-medium">Fluxo de Parcelas</h2>

      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <div className="flex gap-6 mb-4">
            {orders?.map((order) => (
              <span className="font-bold underline" key={order.id}>
                Contrato ${order.id}
              </span>
            ))}
            <span>Contrato 002233</span>
            <div className="flex w-full flex-col justify-between">
              <div className="flex gap-6 mb-4">
                <span className="font-bold underline">Contrato 001122</span>
                <span>Contrato 002233</span>
              </div>

              <span className="text-lg font-bold mb-4 inline-block">
                Parcelas Futuras
              </span>
              <Card className="w-full relative h-64 items-center flex-row justify-around flex bg-gradient-to-b from-gray-800 via-gray-800 to-gray-800 text-white mb-10 rounded-lg shadow-lg overflow-hidden">
                <div className="absolute inset-0">
                  <img
                    src="../../../—Pngtree—online payment cashback credit card_5593051.jpg"
                    alt="Fundo"
                    className="w-full h-64 object-cover opacity-20" /* Use opacity para criar o efeito de transparência */
                  />
                </div>

                <div className="relative z-10 p-6 flex w-full flex-row justify-between items-center">
                  <div className="h-full flex items-center justify-center w-96 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 shadow-slate-900">
                    <img
                      src="../../../verified-payment.png"
                      alt="Pagamento"
                      width={250}
                      className="mb-4 "
                    />
                  </div>
                  <div className="h-full w-1/3 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 shadow-slate-900">
                    <CardHeader className="text-center">
                      <CardTitle className="text-[#F9D270] text-xl font-bold">
                        Próximo pagamento
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <p className="text-3xl font-bold">R$ 569.701,00</p>
                      <p className="text-sm mt-2">vencimento 25/12/2024</p>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button className="w-96 bg-green-500 text-black font-bold hover:bg-green-600">
                        PAGAR
                      </Button>
                    </CardFooter>
                  </div>
                </div>
              </Card>
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
                  {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                  <TableHead className="px-4 py-2 border border-gray-300">
                    Ação
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 8 }).map((_, index) => (
                  <TableRow key={index} className=" hover:bg-[#EAEAEA]">
                    <TableCell className="px-4 py-2 border border-gray-300">{`0${
                      index + 1
                    }`}</TableCell>
                    <TableCell className="px-4 py-2 border border-gray-300">
                      25/12/2024
                    </TableCell>
                    <TableCell className="px-4 py-2 border border-gray-300">
                      569.701,00
                    </TableCell>
                    <TableCell className="px-4 py-2 border border-gray-300">
                      A vencer
                    </TableCell>
                    <TableCell className="px-4 w-32 justify-center py-2 border border-gray-300 text-right">
                      <Button
                        variant="outline"
                        className="px-6 py-1 border-2 border-green-400 bg-green-500 text-white hover:bg-white hover:text-green-500 transition"
                      >
                        Pagar
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
  );
}
