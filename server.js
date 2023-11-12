"use strict";

import { APP_PORT } from "./app/config/index.js";
import { app } from "./app/app.js";

async function startServer() {
  app.listen(APP_PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(`Server listening on ${APP_PORT}`);
  });
}

// Start server.
startServer();