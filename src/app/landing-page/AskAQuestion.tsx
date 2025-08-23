import { Subheading } from "@/app/templates/heading";
import QuestionDialog from "./QuestionDialog";
import { AlertProvider } from "@/app/contexts/AlertContext";

export default function AskAQuestion() {
  return (
    <div className="justify-center text-center">
      <Subheading level={2} className="text-2xl/8 font-medium sm:text-3xl/8">
        Looking for something else?{" "}
      </Subheading>
      <div className="pt-8">
        <AlertProvider>
          <QuestionDialog />
        </AlertProvider>
      </div>
    </div>
  );
}
