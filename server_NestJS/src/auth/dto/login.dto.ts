import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {
  @ApiProperty({ example: "admin", description: "Username" })
  @IsString({ message: "Must be string" })
  readonly userName: string;

  @ApiProperty({ example: "qwerty123", description: "User's password" })
  @IsString({ message: "Must be string" })
  readonly userPassword: string;
}
