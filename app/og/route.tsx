import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "Binston Cardoza";
  const tag = searchParams.get("tag") || "Protocol Engineer";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f1115",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Tag chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#d4924a",
              border: "1px solid rgba(212,146,74,0.3)",
              borderRadius: "4px",
              padding: "4px 10px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {tag}
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 50 ? "40px" : "52px",
            fontWeight: "700",
            color: "#e6edf3",
            lineHeight: "1.2",
            maxWidth: "900px",
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "16px",
              color: "#8b949e",
            }}
          >
            binston.in
          </span>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "14px",
              color: "#8b949e",
            }}
          >
            Binston Cardoza — Protocol Engineer
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
