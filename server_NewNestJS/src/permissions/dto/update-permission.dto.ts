import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";

export class UpdatePermissionDto {
  @ApiProperty({ example: "1", description: "User" })
  readonly permissionID: number;

  @ApiProperty({ example: "user", description: "Permission name" })
  @IsString({ message: "Must be string" })
  @Length(3, 20, { message: "Must be at lease 4 symbol and at most 20" })
  readonly permissionName: string;

  @ApiProperty({
    example: "Simple user",
    description: "Description for permission",
  })
  readonly permissionDescription: string;
}
