import { IsNotEmpty, Matches } from 'class-validator';

export class CreateBookingInput {
  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in the format YYYY-MM-DD',
  })
  date: string;

  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'Start time must be in the format HH:mm',
  })
  startTime: string;

  @IsNotEmpty()
  @Matches(/^\d{2}:\d{2}$/, {
    message: 'End time must be in the format HH:mm',
  })
  endTime: string;
}
