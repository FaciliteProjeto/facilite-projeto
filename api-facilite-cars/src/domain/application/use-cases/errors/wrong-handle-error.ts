import type { UseCaseError } from '@/core/use-case-error'

export class WrongHandleError extends Error implements UseCaseError {}
