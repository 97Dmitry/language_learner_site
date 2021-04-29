import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

import { Permission } from "../permissions/permissions.model";
import { UserPermissions } from "../permissions/user-permissions.model";

interface UserCreationAttributes {
  user_name: string;
  user_email: string;
  user_password: string;
}

@Table({ tableName: "auth_user" })
export class User extends Model<User, UserCreationAttributes> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  user_id: number;

  @ApiProperty({ example: "admin", description: "Username" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  user_name: string;

  @ApiProperty({ example: "email@email.com", description: "User's email" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  user_email: string;

  @ApiProperty({ example: "qwerty123", description: "User's password" })
  @Column({ type: DataType.STRING, allowNull: false })
  user_password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;

  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;

  // @HasOne(() => UserStatus)
  // user_status: UserStatus;

  @BelongsToMany(() => Permission, () => UserPermissions)
  permissions: Permission[];
}
