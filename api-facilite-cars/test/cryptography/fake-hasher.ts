import { HashComparer } from '@/domain/application/cryptography/hash-comparer'
import { HashGenerator } from '@/domain/application/cryptography/hash-generator'

export class FakeHash implements HashGenerator, HashComparer {
  async hash(plain: string) {
    return plain.concat('-hashed')
  }

  async compare(plain: string, hashe: string) {
    return plain.concat('-hashed') === hashe
  }
}
