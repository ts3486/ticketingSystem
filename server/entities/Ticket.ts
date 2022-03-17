import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { User } from "./User";
import { Event } from "./Event";
import { TransferLog } from "./TransferLog";

@ObjectType()
@Entity("ticket")
export class Ticket extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  @Field(() => Int)
  id: number;

  @Column("text")
  @Field(() => String)
  name: string;

  @Column({ type: "int", nullable: true })
  @Field(() => Number, { nullable: true })
  currentOwner: number;

  @Column({ type: "int", nullable: true })
  @Field(() => Number, { nullable: true })
  previousOwner: number;

  @ManyToOne(() => User, (user) => user.tickets)
  @JoinColumn({ name: "currentOwner" })
  user: User;

  @ManyToOne(() => Event, (event) => event.tickets)
  @JoinColumn()
  event: Event;

  @OneToMany(() => TransferLog, (transferLog) => transferLog.ticket)
  @JoinColumn()
  transferLog: TransferLog;
}

//リゾルバのsendTicket()の出力タイプ。
@ObjectType()
export class TicketAndLog {
  @Column()
  @Field(() => Ticket)
  ticket: Ticket;

  @Column()
  @Field(() => TransferLog)
  transferLog: TransferLog;
}
