import type { APIRoute } from "astro";
import { Resvg } from "@resvg/resvg-js";
import satori from "satori";
import { SITE } from "@config";

export const get: APIRoute = async () => {
  const fontData = await fetch(
    "https://api.fontsource.org/v1/fonts/inter/latin-400-normal.woff"
  ).then(res => res.arrayBuffer());

  const fontBoldData = await fetch(
    "https://api.fontsource.org/v1/fonts/inter/latin-700-normal.woff"
  ).then(res => res.arrayBuffer());

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#f4f4f5",
          padding: "80px",
          fontFamily: "Inter",
        },
        children: [
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              },
              children: [
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 72,
                      fontWeight: 700,
                      color: "#1a1a1a",
                      lineHeight: 1.1,
                    },
                    children: SITE.author,
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      fontSize: 32,
                      fontWeight: 400,
                      color: "#52525b",
                      marginTop: 8,
                    },
                    children: "Software Engineer · 11+ years",
                  },
                },
                {
                  type: "div",
                  props: {
                    style: {
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginTop: 32,
                    },
                    children: [
                      {
                        type: "div",
                        props: {
                          style: {
                            width: 48,
                            height: 4,
                            background: "#3b82f6",
                            borderRadius: 2,
                          },
                          children: "",
                        },
                      },
                      {
                        type: "div",
                        props: {
                          style: {
                            fontSize: 24,
                            color: "#71717a",
                          },
                          children: SITE.website.replace("http://", ""),
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          weight: 400,
          style: "normal",
        },
        {
          name: "Inter",
          data: fontBoldData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );

  const resvg = new Resvg(svg);
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: { "Content-Type": "image/png" },
  });
};
