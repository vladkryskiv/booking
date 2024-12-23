import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingInput } from './dto/create-booking';
import { UpdateBookingInput } from './dto/update-booking';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('bookings')
@ApiBearerAuth()
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all bookings' })
  @ApiResponse({
    status: 200,
    description: 'Returns a list of all bookings.',
  })
  async getAllBookings() {
    return await this.bookingsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a booking by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Booking ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns the booking with the specified ID.',
  })
  @ApiResponse({ status: 404, description: 'Booking not found.' })
  async getBooking(@Param('id') id: string) {
    const booking = await this.bookingsService.findById(id);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  @Post()
  @ApiOperation({ summary: 'Create a new booking' })
  @ApiBody({
    type: CreateBookingInput,
    description: 'The data required to create a booking',
    examples: {
      valid: {
        summary: 'Valid example',
        value: {
          user: 'John Doe',
          date: '2024-12-22',
          startTime: '14:00',
          endTime: '15:00',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The booking has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or overlapping booking.',
  })
  async createBooking(@Body() createBookingInput: CreateBookingInput) {
    try {
      return await this.bookingsService.create(createBookingInput);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a booking by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Booking ID',
  })
  @ApiResponse({
    status: 200,
    description: 'Booking deleted successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Booking not found.',
  })
  async deleteBooking(@Param('id') id: string) {
    const success = await this.bookingsService.remove(id);
    if (!success) {
      throw new NotFoundException('Booking not found');
    }
    return { message: 'Booking deleted successfully' };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a booking by ID' })
  @ApiParam({
    name: 'id',
    type: 'string',
    description: 'Booking ID',
  })
  @ApiBody({
    type: UpdateBookingInput,
    description: 'The data to update the booking',
  })
  @ApiResponse({
    status: 200,
    description: 'The booking has been successfully updated.',
  })
  @ApiResponse({
    status: 404,
    description: 'Booking not found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or conflicting booking.',
  })
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingInput: UpdateBookingInput,
  ) {
    try {
      const updatedBooking = await this.bookingsService.update(
        id,
        updateBookingInput,
      );
      if (!updatedBooking) {
        throw new NotFoundException('Booking not found');
      }
      return updatedBooking;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
