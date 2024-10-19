import { randomUUID } from 'node:crypto'

interface UserProps {
  name: string
}

export class User {
  public id: string
  public name: string

  constructor(props: UserProps, id?: string) {
    this.name = props.name
    this.id = id ?? randomUUID()
  }
}
