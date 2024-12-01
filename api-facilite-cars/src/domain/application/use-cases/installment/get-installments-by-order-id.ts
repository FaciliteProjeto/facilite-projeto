import { type Either, left, right } from '@/core/either';
import { InstallmentRepository } from '@/domain/application/repositories/installment-repository';
import { OrderRepository } from '@/domain/application/repositories/order-repository';
import type { Installment } from '@/domain/enterprise/entities/Installment';
import { Injectable } from '@nestjs/common';
import { WrongHandleError } from '../errors/wrong-handle-error';

interface GetInstallmentsByOrderIdRequest {
  orderId: string;
}

type GetInstallmentsByOrderIdResponse = Either<
  WrongHandleError,
  {
    installments: Installment[];
  }
>;

@Injectable()
export class GetInstallmentsByOrderIdUseCase {
  constructor(
    private orderRepository: OrderRepository,
    private installmentRepository: InstallmentRepository,
  ) {}

  async execute({
    orderId,
  }: GetInstallmentsByOrderIdRequest): Promise<GetInstallmentsByOrderIdResponse> {
    const order = await this.orderRepository.findUnique(orderId);

    if (!order) {
      return left(new WrongHandleError('Cliente não encontrado!'));
    }

    const installments = await this.installmentRepository.findManyByOrderId(
      orderId,
    );

    return right({
      installments,
    });
  }
}
