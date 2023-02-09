import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tokens")
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar")
  value: string;

  @Column("varchar")
  userId: number;

  @Column("timestamp")
  expires: Date;
}
