import { z } from "zod";

const dateField = z
  .union([z.string(), z.date()])
  .transform((d) =>
    d instanceof Date ? d.toISOString().split("T")[0] : d
  )
  .refine((d) => /^\d{4}-\d{2}-\d{2}$/.test(d), {
    message: "Expected an ISO date in YYYY-MM-DD format",
  });

export const WritingFrontmatterSchema = z
  .object({
    title: z.string(),
    date: dateField,
    updated: dateField.optional(),
    tags: z.array(z.enum(["zk", "formal-methods", "evm", "audits"])).min(1),
    summary: z.string(),
    reading_time: z.number().optional(),
    draft: z.boolean().optional().default(false),
  })
  .strict();

export type WritingFrontmatter = z.infer<typeof WritingFrontmatterSchema>;

export const AuditFrontmatterSchema = z
  .object({
    title: z.string(),
    date: dateField,
    protocol: z.string(),
    platform: z.enum(["c4", "cantina", "immunefi", "bnb"]),
    severity: z.enum(["critical", "high", "medium", "low"]),
    payout: z.string().optional(),
    status: z.enum(["reported", "confirmed", "disputed", "duplicate"]),
    report_url: z.string().url().optional(),
    summary: z.string(),
    tags: z.array(z.string()).optional().default([]),
    draft: z.boolean().optional().default(false),
  })
  .strict();

export type AuditFrontmatter = z.infer<typeof AuditFrontmatterSchema>;

export const ProjectFrontmatterSchema = z
  .object({
    title: z.string(),
    tagline: z.string(),
    date: dateField,
    tags: z.array(z.string()).min(1),
    summary: z.string(),
    status: z.enum(["active", "completed", "archived"]).optional().default("active"),
  })
  .strict();

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;
