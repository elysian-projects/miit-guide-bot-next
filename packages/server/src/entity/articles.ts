import { ContentNode } from "@/../../common/dist";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("articles")
export class Article implements ContentNode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int")
  tabId: number;

  @Column("varchar")
  label: string;

  @Column("varchar")
  value: string;

  @Column({type: "text", array: true})
  content: string[];

  @Column({type: "timestamp", default: new Date()})
  addedOn: Date;

  @Column("varchar")
  picture: string;

  @Column({type: "integer"})
  order: number;

  @Column({type: "varchar", array: true, default: []})
  links?: string[];
}
