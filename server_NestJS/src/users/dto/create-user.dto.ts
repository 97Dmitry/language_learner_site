import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "admin", description: "Username" })
  @IsString({ message: "Must be string" })
  readonly user_name: string;

  @ApiProperty({ example: "email@email.com", description: "User's email" })
  @IsEmail({}, { message: "Uncorrect email" })
  readonly user_email: string;

  @ApiProperty({ example: "qwerty123", description: "User's password" })
  @IsString({ message: "Must be string" })
  @Length(4, 12, { message: "Must be at lease 4 symbol and at most 12" })
  readonly user_password: string;
}
