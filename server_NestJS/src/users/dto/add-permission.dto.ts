import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class AddPermissionDto {
  @ApiProperty({ example: "1", description: "User ID" })
  readonly userID: string;

  @ApiProperty({ example: "Admin", description: "Permission name" })
  @IsString({ message: "Must be string" })
  readonly permissionName: string;
}
