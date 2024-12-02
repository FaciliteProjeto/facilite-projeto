import type { InstallmentRepository } from '@/domain/application/repositories/installment-repository'
import { Installment } from '@/domain/enterprise/entities/installment'

export class InMemoryInstallmentRepository implements InstallmentRepository {
  public items: Installment[] = []

  async createMany(installments: Installment[]): Promise<void> {
    this.items.push(...installments)
  }

  async findManyByOrderId(orderId: string): Promise<Installment[]> {
    const filtered = await this.items.filter(
      item => item.orderId.toString() === orderId
    )

    return filtered
  }

  async deleteByOrderId(orderId: string): Promise<void> {
    const index = await this.items.findIndex(
      item => item.orderId.toString() === orderId
    )

    if (index >= 0) {
      this.items.slice(index, 1)
    }
  }
}
