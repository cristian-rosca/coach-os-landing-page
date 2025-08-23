import { Heading } from "@/app/templates/heading";
import {
  MicrophoneIcon,
  CpuChipIcon,
  EyeIcon,
  UserGroupIcon,
  LinkIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import screenshot from "../img/coach-os-screenshot.png";
import { forwardRef } from "react";

const features = [
  {
    name: "Voice-First Design",
    description:
      "Natural conversation instead of form filling. Clients share updates through natural voice interactions, making data collection effortless and more honest.",
    icon: MicrophoneIcon,
  },
  {
    name: "AI Programme Builder",
    description:
      "Describe adjustments and watch AI implement them. Generate and modify training programmes through natural language, saving hours of manual programming.",
    icon: CpuChipIcon,
  },
  {
    name: "Smart Insights",
    description:
      "Pattern detection across multiple data sources. AI automatically identifies trends, correlations, and intervention points you might miss.",
    icon: EyeIcon,
  },
  {
    name: "Client Engagement",
    description:
      "Simple interfaces that clients actually use. Focus on user experience that encourages consistent engagement and data sharing.",
    icon: UserGroupIcon,
  },
  {
    name: "Data Integration",
    description:
      "Connect existing tools and wearables seamlessly. Pull data from MyFitnessPal, Oura, and other platforms into one comprehensive view.",
    icon: LinkIcon,
  },
];

const CoachPalFeatures = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} data-section="premium-features" className="mx-auto overflow-hidden">
      <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2">
        <div className="lg:pr-4 lg:pt-4">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
            <p className="text-base/7 font-semibold text-primary">
              AI-First Fitness Coaching
            </p>
            <Heading className="text-pretty mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Transform Your Coaching with Coach OS
            </Heading>

            <dl className="text-base/ mt-10 max-w-xl space-y-8 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute left-1 top-1 h-5 w-5 text-primary"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
          <div className="relative hidden md:block isolate overflow-hidden rounded-3xl bg-accent pt-8 sm:mx-auto sm:max-w-2xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-muted opacity-20 ring-1 ring-inset ring-border"
            />
            <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
              <Image
                alt="Coach OS Dashboard Screenshot"
                src={screenshot}
                width={1150}
                height={600}
                className="w-228 -mb-12 max-w-none rounded-tl-xl bg-background ring-1 ring-border"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-border sm:rounded-3xl"
            />
          </div>
      </div>
    </div>
  );
});

CoachPalFeatures.displayName = 'CoachPalFeatures';

export default CoachPalFeatures;
