import { Injectable } from "@nestjs/common";
import { CreatePermissionsDto } from "./dto/create-permissions.dto";
import { InjectModel } from "@nestjs/sequelize";
import { Permission } from "./permissions.model";

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission) private permissionRepository: typeof Permission) {}

  async createPermission(dto: CreatePermissionsDto) {
    const permission = await this.permissionRepository.create(dto);
    return permission;
  }
  async getPermissionByName(permission: string) {
    const receivedPermission = await this.permissionRepository.findOne({ where: { permission } });
    return receivedPermission;
  }
}
