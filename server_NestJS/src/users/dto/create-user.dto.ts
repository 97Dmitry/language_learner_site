import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "admin", description: "Username" })
  readonly user_name: string;
  @ApiProperty({ example: "email@email.com", description: "User's email" })
  readonly user_email: string;
  @ApiProperty({ example: "qwerty123", description: "User's password" })
  readonly user_password: string;
}
