import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "words" })
export class WordEntity {
  @ApiProperty({ example: 1, description: "Unique entity ID" })
  @PrimaryGeneratedColumn("uuid", {
    comment: "Unique user ID",
  })
  ID: string;

  @ApiProperty({ example: "Учиться", description: "Verb of your learning word" })
  @Column({})
  translationVerb: string;

  @ApiProperty({ example: "Исследование", description: "Noun of your learning word" })
  @Column({})
  translationNoun: string;

  @ApiProperty({
    example: "Исследование",
    description: "General translation of your learning word",
  })
  @Column({})
  generalTranslation: string;
}
