import type { Address } from '@/domain/enterprise/entities/address'

export abstract class AddressRepository {
  abstract create(address: Address): Promise<void>
}
