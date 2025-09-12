import express, { type Request, type Response } from "express";
import session from "express-session";
import cors from "cors";
import { redisStore } from "./config/redis";
import userrouter from "./routes/userRoutes";
import taskRouter from "./routes/taskRoutes";
import pokemonRouter from "./routes/pokemonRoutes";

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}

// Initialize client.
if (process.env["REDIS_PORT"] === undefined || process.env["REDIS_PORT"] === "") {
  console.log(process.env);
  console.error("Redis port not provided in .env file");
  process.exit(1);
}

let allowed_origins;
if (process.env["ALLOWED_ORIGINS"] === undefined || process.env["ALLOWED_ORIGINS"] === "") {
  console.log("Warning: ALLOWED_ORIGINS not specified. Using wildcard *.");
  allowed_origins = ["*"];
} else {
  allowed_origins = process.env["ALLOWED_ORIGINS"]?.split(",");
}

const app = express();
const SERVER_PORT = 5180;
const _SALT_ROUNDS = 10;

app.use(
  cors({
    origin: allowed_origins,
    credentials: true,
  }),
);
app.use(express.json({ limit: "20mb" }));

if (process.env["SESSION_SECRET"] === undefined) {
  console.error("Session secret not provided in .env file");
  process.exit(1);
}

if (process.env["DATABASE_URL"] === undefined || process.env["DIRECT_URL"] === undefined) {
  console.error("Database URL or Direct URL not provided in .env file.");
  process.exit(1);
}

// Initialize session storage.
app.use(
  session({
    store: redisStore,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false, // recommended: only save session when data exists
    secret: process.env["SESSION_SECRET"],
  }),
);

app.get("/", (_req: Request, res: Response) => {
  console.log("Hello, TypeScript with Express :)))!");
  res.send("Hello, TypeScript with Express :)))!");
});

app.use("/user", userrouter);
app.use("/task", taskRouter);
app.use("/pokemon", pokemonRouter);
if (process.env["NODE_ENV"] !== "test") {
  app.listen(SERVER_PORT, () => {
    console.log(`Server running on port http://localhost:${SERVER_PORT}`);
  });
}

export default app;
