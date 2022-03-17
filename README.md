////////////////
実装した案について：
////////////////
server ディレクトリに node.js (express)と gql でチケットの作成、購入、譲渡 (+ ユーザー作成)の機能を持つ API を実装。特徴はチケットの譲渡ログが db 保存される機能とログエンティティがある事。チケット譲渡履歴を追跡可能にする必要があったため実装した。

server フロント (client ディレクトリ）も react や apollo client を使用して簡単な実装をしてる。API テストには mocha chai を使用。
想定ユースケース：

1. イベント開催者側のユーザーがチケットを発行する。(createTicket)
2. 別のユーザーが購入する。(buyTicket)
3. チケットを別ユーザーに譲渡する。(sendTicket)

1,2,3 の関数は TicketResolver ファイルで定義されている。2,3 は user.id と ticket.id が引数。なお、今回はユーザー認証システム・アクセス権限は実装していない。

////////////////
主要テーブル・カラム
////////////////

<img src="http://www.plantuml.com/plantuml/png/hLHDRzf04BtxLqnTgG89H3dq4ZbMQ4Cgr8z8hIlrqClY7PiLzgurkmwX8V-z-y67Gr32eUQ0TzwRD_DcLhxIXf5fwogAtd0iX4GmR5vX3oMhSG1yxlxxWD88iuOucQSUIKRpz8zC2YKDQF4NByVl8LULeikIs3hjRVEIaMEayK6zMUAwTz-7Xq9WnH_12YO-yUAQqVApgZZA7ugdoJjBJ9EHnrAuTmNt8iMnI51uE_7FiznzdWsqjJoLERrnFvjP8nTiI9Whubs9Q24uWZP8gCowGHq2DPg5ujj3BYYlC8gCQi0ec2jZL0rSM3KZb8mYlHIoOSHg8DLARcj89FZGYLUsJISFYgnm1z0BnjLAo18ALcdi80ic-Og4CIYtM0VCAwOrF4HWduyiNvQ-y2Vd2bOBOT0Z4oAr2a6Dh2H46JBi492EWCV8ElHt139YKXT8NrKv02Fo9HeDVM1wVt2L_Sf1SEXVmEnxrXkF-s33ssL0tXBPwtMxShCuJMa8xuHgzKiS8shyQLZTEFnwaaspsRUf8_ZBicrezgI99BdvagREqCwF9-siT9sSOyJTU0Tbqz_PVpGO-cyrqidkTmIyipLUP9Z3jbwPmzHf3O9ac49uFMURp62fQ7rg4CS3UiNPePzVbZBmnD2DVpkZ6STxMjHgnc6ZCMmsm-5c0zkpZgFOyKDSFUpYDkpDduZl4e-KdWc5_2YwGidTf_OV" alt="tyeporm uml"/>

User:
-id
-username
-events (one to many)
-tickets (one to many)

Event:
-id
-category
-name
-user (many to one)
-ticket (one to many)

Ticket:
-id
-name
-currentOwner
-previousOwner
-user (many to one)
-event (many to one)

TransferLog:
-id
-currentOwner
-previousOwner
-timeStamp
-ticket (many to one)

Ticket には基本アトリビュートと関係性以外に currentOwner と previousOwner を追加している。チケット購入時と譲渡時にこの二つのアトリビュートがアップデートされる。

TransferLog は譲渡がある度にログを残すためのテーブル。

なお Event テーブルは作成してあるものの Event 関連の機能は今回実装していない。

////////////////
メリット・デメリット
////////////////

メリット：

- graphql のメリット (引き出すデータを細かく選定できるので効率的にデータを引き出せる, エンドポイントが一つになる、など)

- TransferLog で全てのチケット譲渡取引が記録されているのでログを見返す事ができる。

デメリット：

- 二つ以上前の取引データの記録は現状 db のログを直接見て確認しなければならないため、数が増えると「〇〇個前の持ち主」など過去の情報をピンポイントでトレースするのが非効率的になる。

-linked list などのデータ構造の方が過去の情報をトレースしやすい？

////////////
テストケース：
////////////

1. チケット作成

2. チケット購入

3. チケット譲渡

4. ユーザーの所有チケット確認

正常系: 新規チケット・アップデートされたチケット・所有チケットを含むユーザー情報が出力される。
異常系：エラーオブジェクトを出力。

(npm run test でテスト実行)

/////////////

テストにかかった時間: バグ含め、15 時間程。テスティングに慣れていなかったため少し手こずりました。

至らない部分もたくさんあると思いますが、入社時期を調整してそれまでにキャッチアップさせて頂きたいと考えております。
