import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class UpdateUserDto {
  @ApiProperty({ example: "1", description: "User ID" })
  readonly userID: string;

  @ApiProperty({ example: "admin", description: "Username" })
  @IsString({ message: "Must be string" })
  @Length(3, 20, { message: "Must be at lease 4 symbol and at most 20" })
  readonly userName?: string;

  @ApiProperty({ example: "email@email.com", description: "User's email" })
  @IsEmail({}, { message: "Uncorrect email" })
  readonly userEmail?: string;

  @ApiProperty({ example: "qwerty123", description: "User's password" })
  @IsString({ message: "Must be string" })
  @Length(4, 20, { message: "Must be at lease 4 symbol and at most 20" })
  readonly userPassword?: string;
}
