import "reflect-metadata";
import { Connection, createConnection } from "typeorm";
const url = `http://localhost:5000`;
const chai = require("chai");
chai.expect();
chai.should();
chai.use(require("chai-things"));
const have = chai.have;
const request = require("supertest")(url);

describe("ticket system tests", () => {
  let connection: Connection;

  before(async () => {
    connection = await createConnection();
  });

  //チケット作成テスト
  it("creates ticket", (done) => {
    request
      .post("/graphql")
      .send({ query: `mutation { createTicket(ticket: "test"){id name currentOwner previousOwner}}` })
      .expect(200)
      .end((err: any, res: any) => {
        if (err) return done(err);
        res.body.data.createTicket.should.have.property(`id`).that.is.a("number");
        res.body.data.createTicket.should.have.property("name").that.is.equal("test");
        res.body.data.createTicket.should.have.property("currentOwner");
        res.body.data.createTicket.should.have.property("previousOwner");
        done();
      });
  });

  //チケット購入テスト
  it("buys ticket", (done) => {
    request
      .post("/graphql")
      .send({
        query: `mutation { buyTicket(userId: 1, ticketId: 15){
        id
        name
        currentOwner
        previousOwner
      }}`,
      })
      .expect(200)
      .end((err: any, res: any) => {
        if (err) return done(err);

        res.body.data.buyTicket.should.have.property(`id`).that.is.a("number");
        res.body.data.buyTicket.should.have.property("name").that.is.a("string");
        res.body.data.buyTicket.should.have.property("currentOwner").that.is.equal(1);
        res.body.data.buyTicket.should.have.property("previousOwner");
        done();
      });
  });

  //チケット譲渡テスト
  it("sends ticket", (done) => {
    request
      .post("/graphql")
      .send({
        query: `mutation { sendTicket(to: 1, ticketId: 14){
        ticket{id name currentOwner previousOwner}
        transferLog{id currentOwner previousOwner timeStamp}
      }}`,
      })
      .expect(200)
      .end((err: any, res: any) => {
        if (err) return done(err);

        res.body.data.sendTicket.ticket.should.have.property(`id`).that.is.a("number");
        res.body.data.sendTicket.ticket.should.have.property("name").that.is.a("string");
        res.body.data.sendTicket.ticket.should.have.property("currentOwner").that.is.equal(1);
        res.body.data.sendTicket.ticket.should.have.property("previousOwner").that.is.a("number");

        res.body.data.sendTicket.transferLog.should.have.property(`id`).that.is.a("number");
        res.body.data.sendTicket.transferLog.should.have.property("currentOwner").that.is.equal(1);
        res.body.data.sendTicket.transferLog.should.have.property("previousOwner").that.is.a("number");
        done();
      });
  });

  // //ユーザーの所有チケット確認テスト
  it("gets user ticket", (done) => {
    request
      .post("/graphql")
      .send({
        query: `query {getUtickets(userId: 1){
          id
          username
          tickets{
            id
            name
            currentOwner
            previousOwner
          }
        }}`,
      })
      .expect(200)
      .end((err: any, res: any) => {
        if (err) return done(err);
        res.body.data.getUtickets.should.have.property(`id`).that.is.equal(1);
        res.body.data.getUtickets.should.have.property("username").that.is.a("string");
        res.body.data.getUtickets.should.have.property("tickets").that.is.a("array");
        res.body.data.getUtickets.tickets.should.all.have.property("id");
        res.body.data.getUtickets.tickets.should.all.have.property("name");
        res.body.data.getUtickets.tickets.should.all.have.property("currentOwner");
        res.body.data.getUtickets.tickets.should.all.have.property("previousOwner");
        done();
      });
  });

  after(async () => {
    await connection.close();
  });
});
