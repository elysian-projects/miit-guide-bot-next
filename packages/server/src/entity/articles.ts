import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("articles")
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  tabValue: string;

  @Column("varchar")
  label: string;

  @Column("varchar")
  value: string;

  @Column({type: "text", array: true})
  content: string;

  @Column("varchar")
  type: string;

  @Column("varchar")
  picture: string;

  @Column({type: "varchar", array: true, default: []})
  links?: string;
}
