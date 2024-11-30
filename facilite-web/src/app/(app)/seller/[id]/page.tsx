"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useParams } from "next/navigation";
import { Edit2, Trash2 } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormComponent from "@/components/ui/formRegister";

export default function CustomerPayment() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="p-6 flex flex-col gap-6">
      <h2 className="text-2xl font-medium">Clientes</h2>

      <div className="flex justify-between items-start gap-6">
        <div className="flex-1">
          <FormComponent
            titleButton={"Novo cliente"}
            subtitle={"NOVO CLIENTE"}
            description={"Registre um novo cliente"}
            children={
              <div className="mt-4 p-4 justify-between">
                <Label>Nome</Label>
                <Input className="mb-3" placeholder="Nome" />
                <div className="w-full justify-between flex-row flex">
                  <div>
                    <Label>CPF</Label>
                    <Input
                      className="mb-3 mr-4 w-50"
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div>
                    <Label>SENHA</Label>
                    <Input className="mb-3 w-50" placeholder="********" />
                  </div>
                </div>
                <Label>E-MAIL</Label>
                <Input className="mb-3" placeholder="user@email.com" />
                <Label>TELEFONE</Label>
                <Input className="mb-3" placeholder="(00) 0000-0000" />
              </div>
            }
            typeActiveDialogForm={true}
            onConfirmAction={function (): void {
              throw new Error("Function not implemented.");
            }}
          />
          <div className="max-h-[70vh] flex overflow-y-auto mb-7 w-full bg-slate-100 p-2">
            <Table className="w-full border-separate border-spacing-0">
              <TableHeader>
                <TableRow className="bg-[#F5F5F5]">
                  <TableHead className="px-4 py-2 text-left border border-gray-300">
                    Nº
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left border border-gray-300">
                    NOME
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left border border-gray-300">
                    CPF
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left border border-gray-300">
                    EMAIL
                  </TableHead>
                  <TableHead className="px-4 py-2 text-left border border-gray-300">
                    SENHA
                  </TableHead>
                  {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                  <TableHead className="px-4 py-2 border border-gray-300">
                    AÇÕES
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {Array.from({ length: 20 }).map((_, index) => (
                  <TableRow key={index} className="bg-white hover:bg-[#EAEAEA]">
                    <TableCell className="px-4 py-2 border border-gray-300">{`${
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
                    <TableCell className="px-4 py-2 border border-gray-300">
                      A vencer
                    </TableCell>

                    <TableCell className="px-4 w-32 justify-center py-2 border border-gray-300 text-right">
                      <FormComponent
                        titleButton={"Atualizar dados do cliente"}
                        subtitle={"ATUALIZAR DADOS CLIENTE"}
                        description={""}
                        isIcon={true}
                        icon={Edit2}
                        children={
                          <div className="mt-4 p-4 justify-between">
                            <Label>Nome</Label>
                            <Input className="mb-3" placeholder="Nome" />
                            <div className="w-full justify-between flex-row flex">
                              <div>
                                <Label>CPF</Label>
                                <Input
                                  className="mb-3 mr-4 w-50"
                                  placeholder="000.000.000-00"
                                />
                              </div>
                              <div>
                                <Label>SENHA</Label>
                                <Input
                                  className="mb-3 w-50"
                                  placeholder="********"
                                />
                              </div>
                            </div>
                            <Label>E-MAIL</Label>
                            <Input
                              className="mb-3"
                              placeholder="user@email.com"
                            />
                            <Label>TELEFONE</Label>
                            <Input
                              className="mb-3"
                              placeholder="(00) 0000-0000"
                            />
                          </div>
                        }
                        typeActiveDialogForm={true}
                        onConfirmAction={function (): void {
                          throw new Error("Function not implemented.");
                        }}
                      />

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-2  w-10 border-red-600 text-red-600 hover:bg-red-400 hover:text-white transition"
                          >
                            <Trash2 size={25} />
                          </Button>
                        </DialogTrigger>
                        <DialogContent
                          className="flex items-center justify-center"
                          style={{
                            width: "300px",
                            height: "20vh",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <DialogHeader>
                            <DialogTitle className="flex flex-row w-42">
                              Deseja excluir o usuário?
                            </DialogTitle>
                          </DialogHeader>
                          <DialogFooter className="flex">
                            <Button
                              className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700"
                              onClick={() => alert("Ação confirmada!")}
                            >
                              Sim
                            </Button>
                            <DialogClose asChild>
                              <Button className="px-4 py-2 bg-red-300 hover:bg-red-400">
                                Não
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
