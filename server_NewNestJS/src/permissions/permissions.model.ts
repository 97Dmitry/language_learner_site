import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

import { ApiProperty } from "@nestjs/swagger";

@Entity("Permissions")
export class Permission {
  @ApiProperty({ example: 1, description: "Unique permission ID" })
  @PrimaryGeneratedColumn({ comment: "Unique permission ID" })
  permissionID: number;

  //
  @ApiProperty({ example: "Admin", description: "Unique permission name" })
  @Column({ comment: "Unique permission name", unique: true })
  permissionName: string;

  //
  @ApiProperty({
    example: "Admin has all permission",
    description: "Permission description",
  })
  @Column({ comment: "Unique permission name", unique: true })
  permissionDescription: string;

  //
  @ApiProperty({
    example: "2021-09-18 08:42:51.835330 +00:00",
    description: "Date of create",
  })
  @CreateDateColumn({ type: "timestamp with time zone" })
  created?: Date;

  //
  @ApiProperty({
    example: "2021-09-18 08:42:51.835330 +00:00",
    description: "Date of update",
  })
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated?: Date;
}

@Entity("PermissionsList")
export class PermissionList {}
