import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../entities/User";
import { getRepository } from "typeorm";

@Resolver()
export class UserResolver {
  //ユーザー登録
  @Mutation(() => User)
  async register(@Arg("username") username: string) {
    try {
      const newUser = new User();
      newUser.username = username;
      await User.save(newUser);

      console.log(newUser);

      return newUser;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  //ユーザー情報取得メソット

  //全てのユーザー
  @Query(() => [User])
  getUsers() {
    try {
      return User.find();
    } catch (err) {
      return err;
    }
  }

  //単一ユーザーをユーザー名で取得
  @Query(() => User)
  async getUser(@Arg("username") username: string) {
    try {
      return User.findOne({ where: { username } });
    } catch (err) {
      console.log(err);
      console.log("user not found");
      return err;
    }
  }

  //ユーザーの所持チケット確認クエリー
  @Query(() => User)
  async getUtickets(@Arg("userId") userId: number) {
    try {
      const userWithTickets = await getRepository("user")
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.tickets", "ticket", "ticket.currentOwner = :currentOwner", { currentOwner: userId })
        .where("user.id = :id", { id: userId })
        .getOne();

      console.log(userWithTickets);

      return userWithTickets;
    } catch (err) {
      console.log(err);
      console.log("user tickets not found");
      return err;
    }
  }
}
