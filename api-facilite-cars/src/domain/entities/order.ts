import { randomUUID } from 'node:crypto'

interface OrderProps {
  userId: string
  customerId
}

export class Order {
  public id: string
  public userId: string
  public customerId: string

  constructor(props: OrderProps, id?: string) {
    this.userId = props.userId
    this.customerId = props.customerId
    this.id = id ?? randomUUID()
  }
}
