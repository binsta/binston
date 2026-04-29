"use client";

import NextImage from "next/image";
import { useTheme } from "next-themes";

interface FigureProps {
  src: string;
  alt: string;
  caption?: string;
  darkSrc?: string;
  width?: number;
  height?: number;
}

export function Figure({
  src,
  alt,
  caption,
  darkSrc,
  width = 720,
  height = 400,
}: FigureProps) {
  const { resolvedTheme } = useTheme();
  const imgSrc = darkSrc && resolvedTheme === "dark" ? darkSrc : src;

  return (
    <figure className="not-prose my-8">
      <NextImage
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className="mx-auto rounded-md border border-border"
      />
      {caption && (
        <figcaption className="mt-3 text-center text-sm text-text-muted">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
