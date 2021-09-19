import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "MainUserData" })
export class User {
  @ApiProperty({ example: 1, description: "Unique user ID" })
  @PrimaryGeneratedColumn({
    comment: "Unique user ID",
  })
  userID: number;

  //
  @ApiProperty({ example: "admin", description: "Unique user name" })
  @Column({ comment: "User name", length: 25, unique: true })
  userName: string;

  //
  @ApiProperty({ example: "123456Qwerty", description: "User password" })
  @Column({ comment: "User password" })
  userPassword: string;

  //
  @ApiProperty({ example: "email@email.com", description: "Unique user email" })
  @Column({ comment: "User email", length: 35, unique: true })
  userEmail: string;

  //
  @ApiProperty({ example: "true", description: "Is active user?" })
  @Column({
    type: "enum",
    enum: [true, false],
    default: true,
    comment: "Is active user?",
  })
  isActive: true | false;

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

  //
  @UpdateDateColumn({ type: "timestamp with time zone" })
  updated?: Date;
}
