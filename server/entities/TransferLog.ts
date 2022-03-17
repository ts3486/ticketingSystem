import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, JoinColumn, ManyToOne } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Ticket } from "./Ticket";

@ObjectType()
@Entity("transferLog")
export class TransferLog extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  @Field(() => Int)
  currentOwner: number;

  @Column({ type: "int" })
  @Field(() => Int)
  previousOwner: number;

  @Column()
  @Field()
  timeStamp: Date;

  @ManyToOne(() => Ticket, (ticket) => ticket.transferLog)
  @JoinColumn()
  ticket: Ticket;
}
