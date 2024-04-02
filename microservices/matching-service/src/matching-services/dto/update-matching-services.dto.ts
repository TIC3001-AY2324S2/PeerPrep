import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsDateString,
} from "class-validator";

export class UpdateMatchingServicesDto {
  @IsNotEmpty()
  readonly matching_service_id: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsIn(["easy", "medium", "hard"])
  readonly difficulty: string;

  @IsOptional()
  readonly category: string;

  @IsOptional()
  @IsDateString()
  expired_at: Date;

  @IsOptional()
  @IsIn(["active", "cancelled", "matched", "timed_out"])
  status: string;

  @IsOptional()
  @IsDateString()
  readonly created_at: Date;

  @IsOptional()
  @IsDateString()
  modified_at: Date;
}
