import { Installment } from '@/domain/enterprise/entities/Installment'

export class InstalmentPresenter {
  static toHTTP(installment: Installment) {
    return {
      id: installment.id.toString(),
      orderId: installment.orderId.toString(),
      dueDate: installment.dueDate,
      amount: installment.amount,
      isPaid: installment.isPaid,
      createdAt: installment.createdAt,
      updatedAt: installment.updatedAt,
    }
  }
}
