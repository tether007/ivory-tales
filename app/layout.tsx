import type { Metadata } from "next";
import { Geist, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Footer from "@/components/sections/Footer";
import localFont from "next/font/local";

const gtSuper = localFont({
  src: [
    {
      path: "./fonts/GT-Super-Display-Light-Trial.woff2", // relative to layout.tsx
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-gt-super",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ivory Tales",
    template: "%s | Ivory tales",
  },
  description:
    "Full-service event management in Bengaluru: corporate events, exhibitions and conferences, branding and activations, virtual events and corporate gifting.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    
    <html
      lang="en"
      className={`${geistSans.variable} ${cormorant.variable} ${gtSuper.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Footer/>
      </body>
    </html>
  );
}
