import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

import { User } from "../users/users.model";
import { UserPermissions } from "./user-permissions.model";

interface PermissionCreationAttributes {
  permission: string;
  description: string;
}

@Table({ tableName: "permissions" })
export class Permission extends Model<Permission, PermissionCreationAttributes> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  permission_id: number;

  @ApiProperty({ example: "Admin", description: "User's permission" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  permission: string;

  @ApiProperty({ example: "Has all rights", description: "Description for permission" })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => UserPermissions)
  users: User[];
}
