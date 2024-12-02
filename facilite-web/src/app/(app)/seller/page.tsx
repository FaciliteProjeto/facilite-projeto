'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { Edit2, Trash2, User2 } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { type CreateSellerRequest, createSeller } from '@/http/create-seller'
import { deleteSeller } from '@/http/delete-seller'
import { fetchSellers } from '@/http/fetch-sellers'
import { type UpdateSellerRequest, updateSeller } from '@/http/update-seller'

const createSellerSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  cpf: z.string().length(11, 'CPF deve conter 11 dígitos'),
  homePhone: z.string().min(8, 'Telefone inválido'),
  streetAddress: z.string().min(8, 'Endereço inválido'),
  state: z.string().min(2, 'Estado inválido'),
  mobilePhone: z.string().min(8, 'Telefone celular inválido'),
  income: z.string().min(1, 'Renda é obrigatória'),
})

type CreateSellerSchema = z.infer<typeof createSellerSchema>

type SellerWithId = CreateSellerSchema & { id: string }

export default function Customers() {
  const [selectedSeller, setSelectedSeller] = useState<SellerWithId | null>(null)
  const [isCreatedOpen, setIsCreateOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [deleteSellerId, setDeleteSellerId] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateSellerSchema>({
    resolver: zodResolver(createSellerSchema),
  })

  const { data: dataSeller, refetch } = useQuery({
    queryKey: ['sellers'],
    queryFn: fetchSellers,
  })

  const { mutate: createSellerFn, isPending: isCreating } = useMutation({
    mutationKey: ['create-seller'],
    mutationFn: (newSeller: CreateSellerRequest) => createSeller(newSeller),
    onSuccess: () => {
      reset()
      refetch()
      setIsCreateOpen(false)
    },
  })

  const { mutate: updateSellerFn, isPending: isUpdating } = useMutation({
    mutationKey: ['update-seller'],
    mutationFn: (updatedSeller: UpdateSellerRequest) => updateSeller(updatedSeller),
    onSuccess: () => {
      refetch()
      setIsEditDialogOpen(false)
      reset()
    },
  })

  const { mutate: deleteSellerFn, isPending: isDeleting } = useMutation({
    mutationKey: ['delete-seller'],
    mutationFn: (sellerId: string) => deleteSeller({ sellerId }),
    onSuccess: () => {
      refetch()
      setIsDeleteDialogOpen(false)
    },
  })

  async function handleCreateSeller(data: CreateSellerSchema) {
    try {
      const validatedData = createSellerSchema.parse(data)
      await createSellerFn({
        ...validatedData,
        city: 'Manaus',
        income: Number(data.income),
      })
    } catch (error) {
      console.error(error)
    }
  }

   async function handleUpdateSeller(data: CreateSellerSchema) {
    if (!selectedSeller?.id) return

    try {
      const validatedData = createSellerSchema.parse(data)

      await updateSellerFn({
        ...validatedData,
        id: selectedSeller.id,
        income: Number(data.income),
      })
    } catch (error) {
      console.error(error)
    }
  }

  function handleOpenEditDialog(seller: SellerWithId) {
    setSelectedSeller(seller)
    reset(seller)
    setIsEditDialogOpen(true)
  }

  function handleOpenDeleteDialog(sellerId: string) {
    setDeleteSellerId(sellerId)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-medium">Clientes</h2>
      <Button
      variant="outline"
      className={`${ "bg-gray-800 text-white mb-3"
      } p-2 items-center inline-flex justify-center max-w-fit`}
      onClick={() => setIsCreateOpen(true)}
    >
      Novo cliente
    </Button>
      {
        isCreatedOpen && (
        <Dialog onOpenChange={setIsCreateOpen} open={isCreatedOpen}>
          <DialogContent className='w-96'>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <User2 className="mr-2" />
                  NOVO CLIENTE
              </DialogTitle>
              <DialogDescription>Registre um novo cliente</DialogDescription>
            </DialogHeader>
            <div className="mt-4 w-full">

                    <div className="grid grid-cols-2 gap-4 mt-4 p-4">
              <div>
                <Label>Nome</Label>
                <Input className="mb-3" placeholder="Nome" {...register('name')} />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <Label>Email</Label>
                <Input className="mb-3" placeholder="E-mail" {...register('email')} />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <Label>CPF</Label>
                <Input className="mb-3" placeholder="CPF" maxLength={11} {...register('cpf')} />
                {errors.cpf && <p className="text-red-500">{errors.cpf.message}</p>}
              </div>
              <div>
                <Label>Telefone Residencial</Label>
                <Input className="mb-3" placeholder="Telefone Residencial" {...register('homePhone')} />
                {errors.homePhone && <p className="text-red-500">{errors.homePhone.message}</p>}
              </div>
              <div>
                <Label>Endereço</Label>
                <Input className="mb-3" placeholder="Endereço" {...register('streetAddress')} />
                {errors.streetAddress && <p className="text-red-500">{errors.streetAddress.message}</p>}
              </div>
              <div>
                <Label>Estado</Label>
                <Input className="mb-3" placeholder="Estado" {...register('state')} />
                {errors.state && <p className="text-red-500">{errors.state.message}</p>}
              </div>
              <div>
                <Label>Telefone Celular</Label>
                <Input className="mb-3" placeholder="Telefone Celular" {...register('mobilePhone')} />
                {errors.mobilePhone && <p className="text-red-500">{errors.mobilePhone.message}</p>}
              </div>
              <div className="col-span-2">
                <Label>Renda</Label>
                <Input className="mb-3" placeholder="Renda" {...register('income')} />
                {errors.income && <p className="text-red-500">{errors.income.message}</p>}
              </div>
            </div>

            </div>
            <DialogFooter className="flex justify-center space-x-4">
              <Button
                className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"
                onClick={handleSubmit(handleCreateSeller)}
              >
                Confirmar
              </Button>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="px-4 py-2 bg-red-300 hover:bg-red-400"
                >
                  Cancelar
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        )
      }


      <div className="max-h-[70vh] flex overflow-y-auto mb-7 w-full bg-slate-100 p-2">
        <Table className="w-full border-separate border-spacing-0">
          <TableHeader>
            <TableRow className="bg-[#F5F5F5]">
              <TableHead className="px-4 py-2 text-left border border-gray-300">Nº</TableHead>
              <TableHead className="px-4 py-2 text-left border border-gray-300">NOME</TableHead>
              <TableHead className="px-4 py-2 text-left border border-gray-300">CPF</TableHead>
              <TableHead className="px-4 py-2 text-left border border-gray-300">EMAIL</TableHead>
              <TableHead className="px-4 py-2 border border-gray-300">AÇÕES</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataSeller?.map((seller, index) => (
              <TableRow
                key={seller.id}
                className="bg-white hover:bg-[#EAEAEA]"
              >
                <TableCell className="px-4 py-2 border border-gray-300">{index + 1}</TableCell>
                <TableCell className="px-4 py-2 border border-gray-300">{seller.name}</TableCell>
                <TableCell className="px-4 py-2 border border-gray-300">{seller.cpf}</TableCell>
                <TableCell className="px-4 py-2 border border-gray-300">{seller.email}</TableCell>
                <TableCell className="px-4 py-2 flex gap-3 border border-gray-300 w-16">
                 <Button
                    variant="destructive"
                    onClick={() => handleOpenDeleteDialog(seller.id)}
                  >
                    <Trash2 size={20} />
                  </Button>

                  <Button
                    className="mr-2"
                    variant="outline"
                   onClick={() => handleOpenEditDialog({ ...seller, income: String(seller.income) })}
                  >
                    <Edit2 size={20} />
                  </Button>
               
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

        {isEditDialogOpen && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Cliente</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit(handleUpdateSeller)}>
              <div className="grid grid-cols-2 gap-4 mt-4 p-4">
                <div>
                  <Label>Nome</Label>
                  <Input
                    className="mb-3"
                    placeholder="Nome"
                    {...register('name')}
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    className="mb-3"
                    placeholder="E-mail"
                    {...register('email')}
                  />
                </div>
                <div>
                  <Label>CPF</Label>
                  <Input
                    className="mb-3"
                    placeholder="CPF"
                    maxLength={11}
                    {...register('cpf')}
                  />
                </div>
                <div>
                  <Label>Telefone Residencial</Label>
                  <Input
                    className="mb-3"
                    placeholder="Telefone Residencial"
                    {...register('homePhone')}
                  />
                </div>
                <div>
                  <Label>Endereço</Label>
                  <Input
                    className="mb-3"
                    placeholder="Endereço"
                    {...register('streetAddress')}
                  />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Input
                    className="mb-3"
                    placeholder="Estado"
                    {...register('state')}
                  />
                </div>
                <div>
                  <Label>Telefone Celular</Label>
                  <Input
                    className="mb-3"
                    placeholder="Telefone Celular"
                    {...register('mobilePhone')}
                  />
                </div>
                <div className="col-span-2">
                  <Label>Renda</Label>
                  <Input
                    className="mb-3"
                    placeholder="Renda"
                    {...register('income')}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        )}

      {isDeleteDialogOpen && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excluir Cliente</DialogTitle>
            </DialogHeader>
            <p>Tem certeza que deseja excluir este cliente?</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancelar</Button>
              <Button
                variant="destructive"
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
                onClick={() => deleteSellerFn(deleteSellerId!)}
                disabled={isDeleting}
              >
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
