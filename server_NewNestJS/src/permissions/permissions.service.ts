import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Permission } from "./permissions.model";
import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(Permission) private permissionsRepository) {}

  async createNewPermission(
    permissionsDto: CreatePermissionDto,
  ): Promise<Permission> {
    return await this.permissionsRepository.create({ ...permissionsDto });
  }

  async getAllPermissions(): Promise<Permission[]> {
    return await this.permissionsRepository.find();
  }

  async updatePermission(
    permissionsDto: UpdatePermissionDto,
  ): Promise<Permission> {
    const permission = await this.permissionsRepository.findOneOrFail(
      permissionsDto.permissionID,
    );

    if (permission) {
      return await this.permissionsRepository.update(
        permissionsDto.permissionID,
        {
          permissionName: permissionsDto.permissionName,
          permissionDescription: permissionsDto.permissionDescription,
        },
      );
    }
  }
}
