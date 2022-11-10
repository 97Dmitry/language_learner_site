import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { PermissionEntity } from "../../permissions/entities/permission.entity";
import { UserMetaEntity } from "./userMeta.entity";

@Entity({ name: "users" })
export class UserEntity {
  @ApiProperty({ example: 1, description: "Unique user ID" })
  @PrimaryGeneratedColumn("uuid", {
    comment: "Unique user ID",
  })
  userID: string;

  //
  @ApiProperty({ example: "admin", description: "Unique user name" })
  @Column({ comment: "User name", length: 25, unique: true })
  userName: string;

  //
  @ApiProperty({ example: "123456Qwerty", description: "User password" })
  @Column({ comment: "User password" })
  @Exclude()
  userPassword: string;

  //
  @ApiProperty({ example: "email@email.com", description: "Unique user email" })
  @Column({ comment: "User email", length: 35, unique: true })
  userEmail: string;

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

  @OneToOne(() => UserMetaEntity)
  @JoinColumn()
  meta: UserMetaEntity;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions: PermissionEntity[];
}
