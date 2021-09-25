import { ApiProperty } from "@nestjs/swagger";

export class DeleteUserDto {
  @ApiProperty({ example: "1", description: "User ID" })
  readonly userID: number;
}
