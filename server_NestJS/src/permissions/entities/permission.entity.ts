import { ApiProperty } from "@nestjs/swagger";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("permissions")
export class PermissionEntity {
  @ApiProperty({ example: 1, description: "Unique permission ID" })
  @PrimaryGeneratedColumn("uuid", { comment: "Unique permission ID" })
  permissionID: string;

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
