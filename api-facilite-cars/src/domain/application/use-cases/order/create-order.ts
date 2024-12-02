import { type Either, right } from '@/core/either'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Installment } from '@/domain/enterprise/entities/Installment'
import { Order } from '@/domain/enterprise/entities/order'
import { Injectable } from '@nestjs/common'
import { InstallmentRepository } from '../../repositories/installment-repository'
import { OrderRepository } from '../../repositories/order-repository'

interface CreateOrderUseCaseRequest {
  userId: string
  customerId: string
  price: number
  carId: string
  orderType: 'PURCHASE' | 'SALE'
  installmentsCount: number
  paymentMethod?: string | null
}

type CreateOrderUseCaseResponse = Either<null, null>

@Injectable()
export class CreateOrderUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private installmentRepository: InstallmentRepository
  ) {}

  async execute({
    customerId,
    userId,
    carId,
    price,
    orderType,
    paymentMethod,
    installmentsCount,
  }: CreateOrderUseCaseRequest): Promise<CreateOrderUseCaseResponse> {
    const order = Order.create({
      customerId: new UniqueEntityID(customerId),
      userId: new UniqueEntityID(userId),
      carId: new UniqueEntityID(carId),
      price,
      orderType,
      paymentMethod,
    })

    await this.orderRepository.create(order)

    const installments = this.generateInstallments(
      order.id,
      price,
      installmentsCount
    )

    await this.installmentRepository.createMany(installments)

    return right(null)
  }

  private generateInstallments(
    orderId: UniqueEntityID,
    totalAmount: number,
    numberOfInstallments: number
  ): Installment[] {
    const installmentAmount = totalAmount / numberOfInstallments
    const installments: Installment[] = []

    for (let i = 0; i < numberOfInstallments; i++) {
      const dueDate = new Date()
      dueDate.setMonth(dueDate.getMonth() + i)

      installments.push(
        Installment.create({
          orderId,
          dueDate,
          amount: installmentAmount,
          isPaid: false,
        })
      )
    }

    return installments
  }
}
