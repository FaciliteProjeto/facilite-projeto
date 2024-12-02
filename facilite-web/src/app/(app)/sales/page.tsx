'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { findManyOrder } from '@/http/find-many-order';
import { useQuery } from '@tanstack/react-query';

import dayjs from 'dayjs';

export default function SalerPage() {
  const { data: sellersData} = useQuery({
    queryKey: ['salers-orders'],
    queryFn: () => findManyOrder()
  })

  return (
    <div className="max-h-[70vh] flex overflow-y-auto mb-7 w-full bg-slate-100 p-2">
      <Table className="w-full border-separate border-spacing-0">
        <TableHeader>
          <TableRow className="bg-[#F5F5F5]">
            <TableHead className="px-4 py-2 text-left border border-gray-300">Nº</TableHead>
            <TableHead className="px-4 py-2 text-left border border-gray-300">NOME DO CLIENTE</TableHead>
            <TableHead className="px-4 py-2 text-left border border-gray-300">PROTOCOLO DE VENDA</TableHead>
            <TableHead className="px-4 py-2 text-left border border-gray-300">FORMA DE PAGAMENTO</TableHead>
            <TableHead className="px-4 py-2 text-left border border-gray-300">DATA</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sellersData?.map((sale, index) => (
            <TableRow
              key={sale.id}
              className="bg-white hover:bg-[#EAEAEA]"
            >
              <TableCell className="px-4 py-2 border border-gray-300">{index + 1}</TableCell>
              <TableCell className="px-4 py-2 border border-gray-300">{sale.customer.name}</TableCell>
              <TableCell className="px-4 py-2 border border-gray-300">{sale.id.substring(1, 8)}</TableCell>
              <TableCell className="px-4 py-2 border border-gray-300">{sale.paymentMethod}</TableCell>
              <TableCell className="px-4 py-2 border border-gray-300">{dayjs(sale.createdAt).format('DD-MM-YYYY')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
