import { Test, TestingModule } from '@nestjs/testing';
import { BookingsService } from './bookings.service';
import { getModelToken } from '@nestjs/mongoose';
import { Booking } from '../schemas/booking.schema';

describe('BookingsService', () => {
  let service: BookingsService;
  let mockBookingModel: {
    find: jest.Mock;
    findById: jest.Mock;
    findOne: jest.Mock;
    create: jest.Mock;
    deleteOne: jest.Mock;
  };

  beforeEach(async () => {
    mockBookingModel = {
      find: jest.fn(),
      findById: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      deleteOne: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookingsService,
        {
          provide: getModelToken(Booking.name),
          useValue: mockBookingModel,
        },
      ],
    }).compile();

    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all bookings', async () => {
    const mockBookings = [
      {
        user: 'John Doe',
        date: '2024-12-22',
        startTime: '14:00',
        endTime: '15:00',
      },
    ];

    mockBookingModel.find.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockBookings),
    });

    const result = await service.findAll();

    expect(result).toEqual(mockBookings);
    expect(mockBookingModel.find).toHaveBeenCalled();
  });

  it('should return a booking by ID', async () => {
    const bookingId = '123';
    const mockBooking = {
      user: 'John Doe',
      date: '2024-12-22',
      startTime: '14:00',
      endTime: '15:00',
    };

    mockBookingModel.findById.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue(mockBooking),
    });

    const result = await service.findById(bookingId);

    expect(result).toEqual(mockBooking);
    expect(mockBookingModel.findById).toHaveBeenCalledWith(bookingId);
  });

  it('should delete a booking by ID', async () => {
    const bookingId = '123';

    mockBookingModel.deleteOne.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    });

    const result = await service.remove(bookingId);

    expect(result).toBe(true);
    expect(mockBookingModel.deleteOne).toHaveBeenCalledWith({ _id: bookingId });
  });

  it('should return false if booking not found for deletion', async () => {
    const bookingId = '123';

    mockBookingModel.deleteOne.mockReturnValueOnce({
      exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
    });

    const result = await service.remove(bookingId);

    expect(result).toBe(false);
    expect(mockBookingModel.deleteOne).toHaveBeenCalledWith({ _id: bookingId });
  });
});
