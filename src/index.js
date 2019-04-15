import "dotenv/config";

import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import models, { sequelize } from "../models";
import routes from "../routes";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models,
    me: await models.User.findByLogin("mkowalewski")
  };
  next();
});

app.use("/session", routes.session);
app.use("/users", routes.user);
app.use("/messages", routes.message);

// const eraseDatabaseOnSync = true;

sequelize.sync().then(() => {
  // sequelize.sync({ force: eraseDatabaseOnSync }).then(() => {
  // if (eraseDatabaseOnSync) {
  //   createUsersWithMessages();
  // }

  app.listen(process.env.PORT, () =>
    console.log(`Server on port ${process.env.PORT}!`)
  );
});

// const createUsersWithMessages = async () => {
//   await models.User.create(
//     {
//       username: "mkowalewski",
//       messages: [
//         {
//           text: "Playing with posgresql."
//         }
//       ]
//     },
//     {
//       include: [models.Message]
//     }
//   );

//   await models.User.create(
//     {
//       username: "kmarshall",
//       messages: [
//         {
//           text: "Happy to see it!"
//         },
//         {
//           text: "Show me something!"
//         }
//       ]
//     },
//     {
//       include: [models.Message]
//     }
//   );
// };
