import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsDateString,
} from "class-validator";

export class CreateMatchingServicesDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsIn(["easy", "medium", "hard"])
  readonly difficulty: string;

  @IsNotEmpty()
  readonly category: string;

  @IsOptional()
  @IsDateString()
  expired_at: Date;
}
