import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking, BookingDocument } from '../schemas/booking.schema';
import { CreateBookingInput } from './dto/create-booking';
import { UpdateBookingInput } from './dto/update-booking';
@Injectable()
export class BookingsService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<BookingDocument>,
  ) {}

  async findAll(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async findById(id: string): Promise<Booking> {
    return this.bookingModel.findById(id).exec();
  }

  async create(createBookingInput: CreateBookingInput): Promise<Booking> {
    const { date, startTime, endTime } = createBookingInput;

    const conflict = await this.bookingModel.findOne({
      date,
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
      ],
    });

    if (conflict) {
      throw new BadRequestException('Time slot is already booked.');
    }

    const newBooking = new this.bookingModel(createBookingInput);
    return newBooking.save();
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.bookingModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }
  async update(
    id: string,
    updateBookingInput: UpdateBookingInput,
  ): Promise<Booking> {
    const { date, startTime, endTime } = updateBookingInput;

    if (date || startTime || endTime) {
      const conflict = await this.bookingModel.findOne({
        _id: { $ne: id },
        date: date || (await this.findById(id)).date,
        $or: [
          { startTime: { $lt: endTime, $gte: startTime } },
          { endTime: { $gt: startTime, $lte: endTime } },
        ],
      });

      if (conflict) {
        throw new BadRequestException('Time slot is already booked.');
      }
    }

    const updatedBooking = await this.bookingModel.findByIdAndUpdate(
      id,
      updateBookingInput,
      { new: true, runValidators: true },
    );

    if (!updatedBooking) {
      throw new NotFoundException('Booking not found');
    }

    return updatedBooking;
  }
}
