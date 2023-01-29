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

  // TODO: think about this props, we should probably remove it
  // as the type is tracked in the tabs table
  @Column("varchar")
  type: string;

  @Column("varchar")
  picture: string;

  @Column({type: "varchar", array: true, default: []})
  links?: string;
}
