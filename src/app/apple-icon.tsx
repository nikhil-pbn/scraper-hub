import { ImageResponse } from "next/og";

import { OgMark } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#101116",
        }}
      >
        <OgMark size={150} />
      </div>
    ),
    size,
  );
}
