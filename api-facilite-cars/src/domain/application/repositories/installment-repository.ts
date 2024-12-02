import { Installment } from '@/domain/enterprise/entities/Installment'

export abstract class InstallmentRepository {
  abstract createMany(installments: Installment[]): Promise<void>
  abstract findManyByOrderId(orderId: string): Promise<Installment[]>
  abstract findManyByCustomerId(customerId: string): Promise<Installment[]>
  abstract payment(installment: Installment): Promise<void>
  abstract deleteByOrderId(orderId: string): Promise<void>
  abstract findUnique(installmentId: string): Promise<Installment | null>
}
