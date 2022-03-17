import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entities/User";
import { Ticket, TicketAndLog } from "../entities/Ticket";
import { TransferLog } from "../entities/TransferLog";

@Resolver()
export class TicketResolver {
  //チケットの作成 (チケット情報は一旦チケット名のみ)
  @Mutation(() => Ticket)
  async createTicket(@Arg("ticket") ticket: string) {
    try {
      const newTicket = new Ticket();
      newTicket.name = ticket;
      await Ticket.save(newTicket).then((response) => {
        newTicket.id = response.id;
      });

      return newTicket;
    } catch (err) {
      console.log("error creating ticket: " + err);
      return err;
    }
  }

  //チケット購入。(ticketのownerを購入者のユーザーidに変更)
  @Mutation(() => Ticket)
  async buyTicket(@Arg("userId") userId: number, @Arg("ticketId") ticketId: number) {
    try {
      const ticket = await Ticket.findOne(ticketId);

      if (ticket != null) {
        ticket.currentOwner = userId;

        const updatedTicket = await Ticket.save(ticket);

        return updatedTicket;
      }
    } catch (err) {
      console.log("error buying ticket: " + err);
      return err;
    }
  }

  //チケット譲渡機能
  //(ticketのownerを譲渡する相手のuserIdに変更。また、currentOwnerに譲渡した相手のuserIdを付与し、previousOwnerに送る側のidを付与。)
  @Mutation(() => TicketAndLog, { nullable: true })
  async sendTicket(@Arg("to") to: number, @Arg("ticketId") ticketId: number) {
    const user = await User.findOne(to);
    const ticket = await Ticket.findOne(ticketId);

    if (user != null && ticket != null) {
      try {
        const newOwner = user.id;
        const oldOwner = ticket.currentOwner;
        const currentDate = new Date();

        ticket.currentOwner = newOwner;
        ticket.previousOwner = oldOwner;
        Ticket.save(ticket);

        const transferLog = new TransferLog();
        transferLog.currentOwner = newOwner;
        transferLog.previousOwner = oldOwner;
        transferLog.timeStamp = currentDate;
        await TransferLog.save(transferLog).then((response) => {
          transferLog.id = response.id;
        });

        console.log("ticket " + ticketId + " sent to user " + to);

        return { ticket, transferLog };
      } catch (err) {
        console.log("error sending ticket: " + err);
        return err;
      }
    }
  }

  //チケット情報取得メソッド
  //全てのチケット
  @Query(() => [Ticket], { nullable: true })
  getTickets() {
    return Ticket.find();
  }

  //単一チケットをidで取得
  @Query(() => Ticket)
  getTicket(@Arg("id") id: number) {
    const ticket = Ticket.findOne(id.toString());

    if (!Ticket) {
      return "ticket does not exist";
    } else {
      return ticket;
    }
  }
}
