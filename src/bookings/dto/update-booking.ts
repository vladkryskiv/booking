import { PartialType } from '@nestjs/mapped-types';
import { CreateBookingInput } from './create-booking';

export class UpdateBookingInput extends PartialType(CreateBookingInput) {}
