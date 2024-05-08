import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expenses";

const app = new Hono();

// middleware de registro
app.use("*", logger());

app.get("/test", (c) => {
  return c.json({ message: "test" });
});

app.route("/api/expenses", expensesRoutes);

export default app;
