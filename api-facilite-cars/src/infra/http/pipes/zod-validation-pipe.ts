import { BadRequestException, type PipeTransform } from '@nestjs/common'
import { ZodError, type ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new BadRequestException({
          message: 'Validate failed',
          statusCode: 400,
          errors: error.formErrors.fieldErrors,
        })
      }
      throw new BadRequestException('Validation failed')
    }

    return value
  }
}
