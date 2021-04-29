import { IsNumber, IsString } from "class-validator";

export class CreatePermissionsDto {
  @IsString()
  readonly permission: string;
  @IsNumber()
  readonly description: string;
}
