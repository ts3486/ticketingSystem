import { ObjectType, Field, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Ticket } from "./Ticket";
import { User } from "./User";

@ObjectType()
@Entity("event")
export class Event extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field({ nullable: true })
  @Column("text")
  category: string;

  @Field()
  @Column("text")
  name: string;

  @Column(() => Date)
  @Field({ nullable: true })
  date: Date;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn()
  user: User;

  @OneToMany(() => Ticket, (ticket) => ticket.event)
  @JoinColumn()
  @Field(() => Ticket)
  tickets: Ticket[];
}
