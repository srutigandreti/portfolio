import type { Metadata } from "next";
import { Unbounded, Poppins, Grape_Nuts } from "next/font/google";
import localFont from "next/font/local";
import "@/styles/globals.css";

const unbounded = Unbounded({
  subsets: ["latin"],
  variable: "--font-unbounded",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
  display: "swap",
});

const grapeNuts = Grape_Nuts({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-grape-nuts",
  display: "swap",
});

const retrogression = localFont({
  src: "./fonts/Retrogression/Retrogression/Retrogression-Regular.otf",
  variable: "--font-retrogression",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sruti Gandreti",
    template: "%s | Sruti Gandreti",
  },
  description: "Product design portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${retrogression.variable} ${poppins.variable} ${grapeNuts.variable}`}
    >
      <head>
        <style>{`
          @font-face {
            font-family: "PPNeueMontreal";
            src: url("/fonts/PPNeueMontreal-Regular.otf") format("opentype");
            font-weight: 400;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "PPNeueMontreal";
            src: url("/fonts/NeueMontreal-Italic.otf") format("opentype");
            font-weight: 400;
            font-style: italic;
            font-display: swap;
          }
          @font-face {
            font-family: "PPNeueMontreal";
            src: url("/fonts/NeueMontreal-Medium.otf") format("opentype");
            font-weight: 500;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: "PPNeueMontreal";
            src: url("/fonts/NeueMontreal-MediumItalic.otf") format("opentype");
            font-weight: 500;
            font-style: italic;
            font-display: swap;
          }
          @font-face {
            font-family: "GT Super Display";
            src: url("/fonts/GT-Super-Display-Light-Italic.ttf") format("truetype");
            font-weight: 300;
            font-style: italic;
            font-display: swap;
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
