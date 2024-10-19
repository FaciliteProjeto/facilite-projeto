import { randomUUID } from 'node:crypto'

interface CustomersProps {
  name: string
  cpf: string
}

export class Customers {
  public id: string
  public name: string
  public cpf: string

  constructor(props: CustomersProps, id?: string) {
    this.id = id ?? randomUUID()
    this.name = props.name
    this.cpf = props.cpf
  }
}
