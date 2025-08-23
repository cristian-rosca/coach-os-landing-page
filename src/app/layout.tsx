import { Metadata } from "next";
import "./globals.css";
import BackgroundPattern from "./landing-page/BackgroundPattern";
import { Container } from "./landing-page/Container";
import LandingPageNavigation from "./landing-page/LandingPageNavigation";
import Footer from "./landing-page/Footer";
import clsx from "clsx";

export const metadata: Metadata = {
  metadataBase: new URL("https://coachpal.io"),
  title: "CoachPal | Made for coaches, by coaches.",
  description:
    "Grab your FREE best-in-class online coaching systems. Supercharge your coaching systems with CoachPal.",
  keywords: [
    "free coaching sheets",
    "online coaching systems",
    "online coaching Google Sheets",
    "coaching tools",
    "coaching systems",
  ],
  alternates: {
    canonical: "https://coachpal.io",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx("flex min-h-screen flex-col")}>
        <div className="relative isolate overflow-hidden">
          <BackgroundPattern />
          <Container className="pt-8">
            <LandingPageNavigation />
          </Container>
          <div className="flex-grow">{children}</div>
          <Container>
            <Footer />
          </Container>
        </div>
      </body>
    </html>
  );
}
