import { ArticleType, TabNode } from "@/../../common/dist";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tabs")
export class Tab implements TabNode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  label: string;

  @Column("varchar")
  value: string;

  @Column("varchar")
  type: ArticleType;
}
