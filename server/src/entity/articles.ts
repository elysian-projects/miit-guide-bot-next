import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("articles")
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("int4")
  tabId: number;

  @Column("varchar")
  label: string;

  @Column("varchar")
  value: string;

  @Column("text")
  content: string;

  @Column("varchar")
  type: string;

  @Column("varchar")
  picture: string;

  @Column({type: "varchar", array: true})
  links: string[];
}
