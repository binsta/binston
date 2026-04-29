import type { MDXComponents } from "mdx/types";
import {
  Paper,
  Severity,
  Finding,
  PoC,
  Callout,
  Benchmark,
  Proof,
  Figure,
  Footnote,
  FootnoteRef,
} from "@/components/mdx";

export const mdxComponents: MDXComponents = {
  Paper,
  Severity,
  Finding,
  PoC,
  Callout,
  Benchmark,
  Proof,
  Figure,
  Footnote,
  FootnoteRef,
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...mdxComponents, ...components };
}
