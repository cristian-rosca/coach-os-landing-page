import { Heading } from "@/app/templates/heading";
import GetSheetsDialog from "./GetSheetsDialog";
import ScrollToPremiumButton from "./ScrollToPremiumButton";
import { AlertProvider } from "../contexts/AlertContext";

export default function Hero() {
  return (
    <>
      <Heading
        level={1}
        className="font-display text-4xl font-medium tracking-tight [text-wrap:balance] sm:text-6xl"
      >
        Built by coaches,
        <br />
        for coaches.
      </Heading>

      <p className="mt-6 text-lg">
        You got into this industry to transform people, not to wrestle with
        technology or build systems from scratch. Get proven coaching systems
        that deliver premium client experiences and accelerate results -
        completely{" "}
        <span className="whitespace-nowrap font-bold text-indigo-600">
          free forever
        </span>
        . Focus on what you do best: changing lives, not chasing data.
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <AlertProvider>
          <GetSheetsDialog
            isPremium={false}
            variant="hero"
            buttonColor="indigo"
          />
        </AlertProvider>
        <ScrollToPremiumButton />
      </div>
    </>
  );
}
