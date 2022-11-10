import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { CreatePermissionDto } from "./dto/create-permission.dto";
import { UpdatePermissionDto } from "./dto/update-permission.dto";
import { PermissionEntity } from "./entities/permission.entity";

@Injectable()
export class PermissionsService {
  constructor(@InjectRepository(PermissionEntity) private permissionsRepository) {}

  async createNewPermission(permissionsDto: CreatePermissionDto): Promise<PermissionEntity> {
    // const permission = new PermissionEntity();
    // permission.permissionName = permissionsDto.permissionName;
    // permission.permissionDescription = permissionsDto.permissionDescription;
    const permission = this.permissionsRepository.create(permissionsDto);
    return await this.permissionsRepository.save(permission);
  }

  async getPermissionsByName(permissionName: string): Promise<PermissionEntity> {
    return await this.permissionsRepository.findOne({
      where: { permissionName: permissionName },
    });
  }

  async getAllPermissions(): Promise<PermissionEntity[]> {
    return await this.permissionsRepository.find();
  }

  async updatePermission(permissionsDto: UpdatePermissionDto): Promise<PermissionEntity> {
    const permission = await this.permissionsRepository.findOneOrFail(permissionsDto.permissionID);

    if (permission) {
      return await this.permissionsRepository.update(permissionsDto.permissionID, {
        permissionName: permissionsDto.permissionName,
        permissionDescription: permissionsDto.permissionDescription,
      });
    }
  }
}
