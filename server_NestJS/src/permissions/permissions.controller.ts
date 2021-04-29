import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { CreatePermissionsDto } from "./dto/create-permissions.dto";

@Controller("permissions")
export class PermissionsController {
  constructor(private permissionService: PermissionsService) {}
  @Post()
  create(@Body() dto: CreatePermissionsDto) {
    return this.permissionService.createPermission(dto);
  }

  @Get("/:permission")
  getByPermission(@Param("permission") permission: string) {
    return this.permissionService.getPermissionByName(permission);
  }
}
