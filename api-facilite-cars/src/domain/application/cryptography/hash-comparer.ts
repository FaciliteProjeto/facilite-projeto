export abstract class HashComparer {
  abstract compare(plain: string, hashe: string): Promise<boolean>
}
