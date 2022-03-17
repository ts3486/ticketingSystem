import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn } from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { Event } from "./Event";
import { Ticket } from "./Ticket";

@ObjectType()
@Entity("user")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({ type: "int" })
  @Field(() => Int)
  id: number;

  @Column({ type: "text" })
  @Field(() => String)
  username: string;

  @OneToMany(() => Event, (event) => event.user, { eager: true, cascade: true })
  @JoinColumn()
  @Field(() => [Event])
  events: Event[];

  @OneToMany(() => Ticket, (ticket) => ticket.user, { eager: true, cascade: true })
  @JoinColumn()
  @Field(() => [Ticket])
  tickets: Ticket[];
}
