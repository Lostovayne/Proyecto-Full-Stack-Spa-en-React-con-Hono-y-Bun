import { Hono } from "hono";
import { expenseSchema, createPostSchema } from "../../schema";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

type Expense = z.infer<typeof expenseSchema>;

const fakeExpenses: Expense[] = [
  { id: 1, title: "Comida", amount: 30 },
  { id: 2, title: "Transporte", amount: 20 },
  { id: 3, title: "Alquiler", amount: 1000 },
  { id: 4, title: "Entretenimiento", amount: 50 },
];

export const expensesRoutes = new Hono()
  .get("/", (c) => c.json({ expenses: fakeExpenses }))

  // zod-validator para validar el body que viene en la request como un middleware
  .post("/", zValidator("json", createPostSchema), async (c) => {
    const expense = c.req.valid("json");
    fakeExpenses.push({ ...expense, id: fakeExpenses.length + 1 });
    c.status(201);
    return c.json(expense);
  })

  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) return c.notFound();
    return c.json({ expense });
  })

  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"));
    const expense = fakeExpenses.find((expense) => expense.id === id);
    if (!expense) return c.notFound();
    fakeExpenses.splice(fakeExpenses.indexOf(expense), 1);
    return c.json({ expense });
  });
