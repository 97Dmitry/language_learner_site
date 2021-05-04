import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";

import { User } from "../users/users.model";

interface PostCreationAttributes {
  title: string;
  text: string;
  user_id: number;
  image: string;
}

@Table({ tableName: "posts" })
export class Post extends Model<Post, PostCreationAttributes> {
  @ApiProperty({ example: 1, description: "Unique ID" })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  post_id: number;

  @ApiProperty({ example: "Wild animals", description: "Title for post" })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @ApiProperty({ example: "Animals are wild", description: "Post's text" })
  @Column({ type: DataType.STRING, allowNull: false })
  text: string;

  @ApiProperty({ example: "", description: "Images" })
  @Column({ type: DataType.STRING })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  user_id: number;

  @BelongsTo(() => User)
  author: User;
}
