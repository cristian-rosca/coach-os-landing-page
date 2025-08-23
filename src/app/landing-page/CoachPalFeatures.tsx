import { Heading } from "@/app/templates/heading";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  CalendarDaysIcon,
  ChartBarSquareIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  TableCellsIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import screenshot from "../img/coach-os-screenshot.png";
import { forwardRef } from "react";

const features = [
  {
    name: "End the tracking chase forever.",
    description:
      "Stop begging clients to update their sheets and wondering if the data is even accurate. Pull real tracking data directly from MyFitnessPal and Fitbit automatically. Get honest numbers without the constant follow-ups.",
    icon: ArrowDownTrayIcon,
  },
  {
    name: "Set it once, data flows forever.",
    description:
      "Stop manually checking if clients updated their tracking or falling behind on their progress. Set up automatic daily export once and fresh data flows into your sheets every single day without you touching anything.",
    icon: ArrowPathIcon,
  },
  {
    name: "Get the data you need, when you need it.",
  description:
    "Access client data for any time period instantly - yesterday, last quarter, or custom date ranges. Pull exactly what you need for deeper analysis.",
  icon: MagnifyingGlassIcon,
  },
  {
    name: "Elevate every client interaction.",
    description:
      "Use the CoachPal app with your branding to analyse data and present insights in a way that reflects your professional caliber.",
    icon: SparklesIcon,
  },
];

const CoachPalFeatures = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} data-section="premium-features" className="mx-auto overflow-hidden">
      <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2">
        <div className="lg:pr-4 lg:pt-4">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
            <p className="text-base/7 font-semibold text-indigo-600">
              Your coaching systems. On steroids.
            </p>
            <Heading className="text-pretty mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              CoachPal Premium Tier Features
            </Heading>

            <dl className="text-base/ mt-10 max-w-xl space-y-8 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="relative pl-9">
                  <dt className="inline font-semibold">
                    <feature.icon
                      aria-hidden="true"
                      className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                    />
                    {feature.name}
                  </dt>{" "}
                  <dd className="inline">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
          <div className="relative hidden md:block isolate overflow-hidden rounded-3xl bg-indigo-500 pt-8 sm:mx-auto sm:max-w-2xl sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-y-px -left-3 -z-10 w-full origin-bottom-left skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white"
            />
            <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
              <Image
                alt="Product screenshot"
                src={screenshot}
                width={1150}
                height={600}
                className="w-228 -mb-12 max-w-none rounded-tl-xl bg-gray-800 ring-1 ring-white/10"
              />
            </div>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 sm:rounded-3xl"
            />
          </div>
      </div>
    </div>
  );
});

CoachPalFeatures.displayName = 'CoachPalFeatures';

export default CoachPalFeatures;
