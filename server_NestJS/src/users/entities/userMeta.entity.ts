import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "user_meta" })
export class UserMetaEntity {
  @ApiProperty({ example: 1, description: "Unique entity ID" })
  @PrimaryGeneratedColumn("uuid", {
    comment: "Unique user ID",
  })
  ID: string;

  @ApiProperty({ example: "true", description: "Is active user?" })
  @Column({
    type: "boolean",
    default: true,
    comment: "Is active user?",
  })
  isActive: boolean;

  @ApiProperty({ example: "true", description: "User is SuperUser?" })
  @Column({
    type: "boolean",
    default: false,
    comment: "User is SuperUser?",
  })
  isSuperUser: boolean;
}
