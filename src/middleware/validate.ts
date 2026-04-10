import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodIssue } from "zod";

export function validate(schema: ZodSchema, source: "body" | "query" = "body") {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(source === "body" ? req.body : req.query);

    if (!result.success) {
      const errors = result.error.issues.map((e: ZodIssue) => ({
        field: e.path.join("."),
        message: e.message,
      }));

      res.status(400).json({ success: false, errors });
      return;
    }

    if (source === "body") req.body = result.data;
    next();
  };
}