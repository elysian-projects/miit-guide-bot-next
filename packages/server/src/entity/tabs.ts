import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tabs")
export class Tab {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  label: string;

  @Column("varchar")
  value: string;

  @Column("varchar")
  type: string;
}
