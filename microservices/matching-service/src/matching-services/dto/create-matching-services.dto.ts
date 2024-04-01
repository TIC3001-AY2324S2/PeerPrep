import { IsEmail, IsNotEmpty, IsOptional, IsIn, IsDateString } from 'class-validator';


export class CreateMatchingServicesDto {

  @IsNotEmpty()
  readonly matching_service_id: number;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(['easy', 'medium', 'hard'])
  readonly difficulty: string;

  @IsNotEmpty()
  readonly category: string;

  @IsNotEmpty()
  @IsDateString()
  expired_at: Date;

  @IsNotEmpty()
  @IsIn(['active', 'cancelled', 'matched', 'timed_out'])
  status: string;

  @IsNotEmpty()
  @IsDateString()
  readonly created_at: Date;

  @IsOptional()
  @IsDateString()
  modified_at: Date;
}
