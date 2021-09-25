import { Body, Controller, Get, Post, Put } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Permission } from "./permissions.model";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { CreatePermissionDto } from "./dto/create-permission.dto";

@ApiTags("Permissions")
@Controller("permissions")
export class PermissionsController {
  constructor(private permissionsService: PermissionsService) {}

  @ApiOperation({ summary: "Create permissions" })
  @ApiResponse({ status: 201, type: [Permission] })
  @Post()
  createPermission(@Body() permissionsDto: CreatePermissionDto) {
    return this.permissionsService.createNewPermission(permissionsDto);
  }

  @ApiOperation({ summary: "Get all permissions" })
  @ApiResponse({ status: 200, type: [Permission] })
  @Get()
  getAllPermissions() {
    return this.permissionsService.getAllPermissions();
  }

  @ApiOperation({ summary: "Update permission by id" })
  @ApiResponse({ status: 201, type: [Permission] })
  @Put()
  updatePermissionByID(@Body() permissionsDto: UpdatePermissionDto) {
    return this.permissionsService.updatePermission(permissionsDto);
  }
}
