import { Resolver, Query, Mutation, Arg, Ctx, UseMiddleware } from "type-graphql";
import { getConnection } from "typeorm";
import { Ticket } from "../entities/Ticket";

@Resolver()
export class TicketResolver {
  @Query(() => [Ticket])
  allTickets() {
    return Ticket.find();
  }

  @Query(() => Ticket)
  getTicket(@Arg("id") id: number) {
    const ticket = Ticket.findOne(id.toString());

    if (!Ticket) {
      return "ticket does not exist";
    } else {
      return ticket;
    }
  }

  //   @Mutation(() => Boolean)
  //   async sendTicket(@Ctx() { payload }: MyContext, @Arg("id") id: number) {
  //     console.log(payload);

  //     await getConnection()
  //       .createQueryBuilder()
  //       .update(Ticket)
  //       .set({
  //         userId: parseInt(payload!.userId),
  //       })
  //       .where("id = :id", { id: id })
  //       .execute();

  //     return true;
  //   }
}
