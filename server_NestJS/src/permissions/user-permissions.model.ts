import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";

import { User } from "../users/users.model";
import { Permission } from "./permissions.model";

@Table({ tableName: "user_permissions", createdAt: false, updatedAt: false })
export class UserPermissions extends Model<UserPermissions> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  user_permissions_id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  user_id: number;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER, allowNull: false })
  permissions_id: number;
}
