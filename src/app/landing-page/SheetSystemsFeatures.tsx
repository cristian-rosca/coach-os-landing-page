import { Subheading } from "@/app/templates/heading";
import {
  CircleStackIcon,
  CalculatorIcon,
  UserGroupIcon,
  TrophyIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CheckBadgeIcon,
} from "@heroicons/react/20/solid";

const features = [
  {
    name: "Build programs like a pro.",
    description:
      "Stop letting basic spreadsheets make you look amateur. Give clients sleek training logs with embedded video tutorials, your personalised coaching notes, and progress tracking that shows exactly what they achieved last week.",
    icon: DocumentTextIcon,
  },
  {
    name: "Coach with data, not guesswork.",
    description:
      "Stop flying blind with coaching decisions. Weekly summaries show you exactly where each client stands against their targets. Spot trends, dig into details, and give data-backed feedback that proves you know what you're doing.",
    icon: ChartBarIcon,
  },
  {
    name: "Nutrition targets you can trust.",
    description:
      "Get consistent, methodical nutrition recommendations based on individual client goals and desired rate of progress. Start every client relationship with professional, well-reasoned nutrition targets. Professional precision in seconds.",
    icon: CalculatorIcon,
  },
  {
    name: "Exercise library solved, forever.",
    description:
      "Start with 300+ exercises complete with tutorial videos out of the box. Then, make it yours with custom exercises, your own videos, and coaching notes. Update once, it applies to all client sheets automatically.",
    icon: CircleStackIcon,
  },
  {
    name: "Stop losing overwhelmed clients.",
    description:
      "Tracking burnout kills client retention and leaves everyone confused about progress. Create clear targets roadmaps that show clients exactly where they're headed and how they'll get there.",
    icon: UserGroupIcon,
  },
  {
    name: "Get results from day one.",
    description:
      "Stop learning through expensive trial and error with your paying clients. Use coaching systems tested and perfected through years of real transformations. Start delivering consistent results immediately with methods proven to work.",
    icon: CheckBadgeIcon,
  },
];

export default function SheetSystemsFeatures() {
  return (
    <div className="mx-auto ">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <Subheading level={2} className="text-2xl/8 font-medium sm:text-3xl/8">
          CoachPal Free Tier Features
        </Subheading>
      </div>
      <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
        {features.map((feature) => (
          <div key={feature.name} className="relative pl-9">
            <dt className="inline font-semibold ">
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
  );
}
