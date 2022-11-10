import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { PermissionEntity } from "./entities/permission.entity";
import { PermissionsService } from "./permissions.service";

@ApiTags("Permissions")
@Controller("permissions")
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @ApiOperation({ summary: "Create permissions" })
  @ApiResponse({ status: 201, type: [PermissionEntity] })
  @Post()
  createPermission(@Body() permissionsDto: CreatePermissionDto) {
    return this.permissionsService.createNewPermission(permissionsDto);
  }

  @ApiOperation({ summary: "Get all permissions" })
  @ApiResponse({ status: 200, type: [PermissionEntity] })
  @Get()
  getAllPermissions() {
    return this.permissionsService.getAllPermissions();
  }

  @ApiOperation({ summary: "Update permission by id" })
  @ApiResponse({ status: 201, type: [PermissionEntity] })
  @Put()
  updatePermissionByID(@Body() permissionsDto: UpdatePermissionDto) {
    return this.permissionsService.updatePermission(permissionsDto);
  }
}
