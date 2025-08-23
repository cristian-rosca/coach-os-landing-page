import { Heading } from "@/app/templates/heading";
import GetSheetsDialog from "./GetSheetsDialog";
import { AlertProvider } from "../contexts/AlertContext";

export default function Hero() {
  return (
    <div className="text-center max-w-4xl mx-auto px-6">
      <Heading
        level={1}
        className="tracking-tight [text-wrap:balance] bg-gradient-to-br from-white to-muted-foreground bg-clip-text text-transparent leading-tight"
      >
        AI-First Fitness Coaching
      </Heading>

      <p className="mt-8 font-sans text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
        Save hours of manual labour with AI-powered program generation, and
        natural voice interactions. Allow your client to track in whatever way
        suits them best, while Coach OS automatically consolidates all their
        data and show you the insights that matter.
      </p>

      <div className="mt-10 flex items-center justify-center gap-4">
        <AlertProvider>
          <GetSheetsDialog
            variant="hero"
            buttonColor="zinc"
          />
        </AlertProvider>
      </div>
    </div>
  );
}
