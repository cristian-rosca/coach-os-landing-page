import { Heading } from "@/app/templates/heading";
import GetSheetsDialog from "./GetSheetsDialog";
import { AlertProvider } from "../contexts/AlertContext";

export default function Hero() {
  return (
    <>
      <Heading
        level={1}
        className="font-display text-4xl font-medium tracking-tight [text-wrap:balance] sm:text-6xl bg-gradient-to-br from-white to-muted-foreground bg-clip-text text-transparent"
      >
        AI-First Fitness Coaching
      </Heading>

      <p className="mt-6 text-lg text-muted-foreground">
        Save hours of manual labour with AI-powered program generation, and
        natural voice interactions. Allow your client to track in whatever way
        suits them best, while Coach OS automatically consolidates all their
        data and show you the insights that matter.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <AlertProvider>
          <GetSheetsDialog
            isPremium={false}
            variant="hero"
            buttonColor="zinc"
          />
        </AlertProvider>
      </div>
    </>
  );
}
