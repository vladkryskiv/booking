import { Test, TestingModule } from '@nestjs/testing';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';

describe('BookingsController', () => {
  let controller: BookingsController;
  let service: BookingsService;

  const mockService = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookingsController],
      providers: [{ provide: BookingsService, useValue: mockService }],
    }).compile();

    controller = module.get<BookingsController>(BookingsController);
    service = module.get<BookingsService>(BookingsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all bookings', async () => {
    const bookings = [
      {
        user: 'John Doe',
        date: '2024-12-22',
        startTime: '14:00',
        endTime: '15:00',
      },
    ];
    mockService.findAll.mockResolvedValue(bookings);

    const result = await controller.getAllBookings();
    expect(result).toEqual(bookings);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('should get a booking by ID', async () => {
    const booking = {
      user: 'John Doe',
      date: '2024-12-22',
      startTime: '14:00',
      endTime: '15:00',
    };
    mockService.findById.mockResolvedValue(booking);

    const result = await controller.getBooking('someId');
    expect(result).toEqual(booking);
    expect(service.findById).toHaveBeenCalledWith('someId');
  });

  it('should create a booking', async () => {
    const bookingData = {
      user: 'John Doe',
      date: '2024-12-22',
      startTime: '14:00',
      endTime: '15:00',
    };
    mockService.create.mockResolvedValue(bookingData);

    const result = await controller.createBooking(bookingData);
    expect(result).toEqual(bookingData);
    expect(service.create).toHaveBeenCalledWith(bookingData);
  });

  it('should delete a booking by ID', async () => {
    mockService.remove.mockResolvedValue(true);

    const result = await controller.deleteBooking('someId');
    expect(result).toEqual({ message: 'Booking deleted successfully' });
    expect(service.remove).toHaveBeenCalledWith('someId');
  });

  it('should throw NotFoundException if booking not found for deletion', async () => {
    mockService.remove.mockResolvedValue(false);

    try {
      await controller.deleteBooking('someId');
    } catch (error) {
      expect(error.status).toBe(404);
      expect(error.message).toBe('Booking not found');
    }
  });
});
