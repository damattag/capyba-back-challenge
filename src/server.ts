import "dotenv/config";

import "./env";
import app from "./app";
import "./database";

app.listen(
  {
    port: process.env.SERVER_PORT,
  },
  () => {
    console.log(
      `🚀 Server ready at http://localhost:${process.env.SERVER_PORT}`,
    );
  },
);
