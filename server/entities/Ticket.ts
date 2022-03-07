import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, InputType, Field, Int } from "type-graphql";

@ObjectType()
@Entity("tickets")
export class Ticket extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;
  @Column("text")
  @Field()
  name: string;

  @Column("text")
  @Field()
  cid: string;

  @Column()
  @Field()
  tokenId: number;

  // @Column({ type: "longblob" })
  // @Field()
  // file: string;

  @Column({ type: "int" })
  @Field(() => Int)
  price: number;

  @Column(() => Date)
  @Field()
  date: Date;

  @Column({ type: "int" })
  @Field(() => Int)
  userId: number;
}

@InputType()
export class TicketInput implements Partial<Ticket> {
  @Field()
  name: string;

  @Field()
  cid: string;

  @Field()
  tokenId: number;

  @Field(() => Int)
  price: number;

  @Field()
  date: Date;
}
