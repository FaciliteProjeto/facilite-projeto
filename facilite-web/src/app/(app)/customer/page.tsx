import { getOrderByCustomerId } from '@/auth/auth'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export default async function CustomerPayment() {
  const orders = await getOrderByCustomerId()

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-medium">Fluxo de Parcelas</h2>

      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <div className="flex gap-6 mb-4">
            {orders?.map(order => (
              <span className="font-bold underline" key={order.id}>
                Contrato ${order.id}
              </span>
            ))}
            <span>Contrato 002233</span>
          </div>

          <span className="text-lg font-bold mb-4 inline-block">
            Parcelas Futuras
          </span>

          <Table className="w-full max-w-[800px] border-separate border-spacing-0">
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
                <TableHead className="px-4 py-2 border border-gray-300"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {Array.from({ length: 8 }).map((_, index) => (
                <TableRow
                  key={index}
                  className="bg-[#D9D9D9] hover:bg-[#EAEAEA]"
                >
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
                  <TableCell className="px-4 py-2 border border-gray-300 text-right">
                    <Button
                      variant="outline"
                      className="px-6 py-1 border-2 border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-white transition"
                    >
                      Pagar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Card className="w-80 bg-black text-white rounded-lg shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-yellow-400 text-xl font-bold">
              Próximo pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <p className="text-3xl font-bold">R$ 569.701,00</p>
            <p className="text-sm mt-2">vencimento 25/12/2024</p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button className="w-full bg-green-500 text-black font-bold hover:bg-green-600">
              PAGAR
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
