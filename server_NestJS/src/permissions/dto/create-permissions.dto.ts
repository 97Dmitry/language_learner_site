import { IsNumber, IsString } from "class-validator";

export class CreatePermissionsDto {
  @IsString({ message: "Must be string" })
  readonly permission: string;
  @IsNumber({}, { message: "Must be number" })
  readonly description: string;
}
