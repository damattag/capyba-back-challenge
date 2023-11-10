"use strict";

// src/database/client.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "error"] : []
});
var client_default = prisma;

// src/database/index.ts
client_default.$connect().then(() => {
  console.log("\u{1F4E6} Successfully connected with database");
}).catch((error) => {
  console.log("\u274C Error connecting to database", error);
});
