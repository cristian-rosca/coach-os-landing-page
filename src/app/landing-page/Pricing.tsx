import clsx from "clsx";
import { Subheading } from "@/app/templates/heading";
import { AlertProvider } from "@/app/contexts/AlertContext";
import { CheckIcon, SparklesIcon } from "@heroicons/react/20/solid";
import GetSheetsDialog from "./GetSheetsDialog";

const FEATURES = [
  {
    name: "Professional training programs with video tutorials",
    isPremium: false
  },
  {
    name: "Data-driven coaching insights and weekly summaries", 
    isPremium: false
  },
  {
    name: "Clear client target roadmaps that boost retention",
    isPremium: false
  },
  {
    name: "Methodical training block planning",
    isPremium: false
  },
  {
    name: "300+ exercise library with tutorial videos",
    isPremium: false
  },
  {
    name: "Science-based nutrition target calculator",
    isPremium: false
  },
  {
    name: "Automatic data sync from Fitbit & MyFitnessPal",
    isPremium: true
  },
  {
    name: "Branded CoachPal app for premium client feedback and analysis", 
    isPremium: true
  }
]

const tiers = [
  {
    name: "Free",
    id: "tier-free",
    price: "€0",
    description: "The essentials to provide exceptional coaching to your clients.",
    features: FEATURES.filter(feature => !feature.isPremium)
  },
  {
    name: "Premium",
    id: "tier-premium",
    price: "€17.99",
    description: "Powerful integrations for a seamless client experience.",
    features: FEATURES
  },
];

export default function Pricing() {
  return (
    <>
      <Subheading level={2} className="text-2xl/8 font-medium sm:text-3xl/8">
        CoachPal Pricing
      </Subheading>
      <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:mx-0 md:max-w-none md:grid-cols-2">
        <AlertProvider>
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={clsx(
                tier.id === "tier-premium"
                  ? "bg-white ring-2 ring-indigo-500"
                  : "ring-1 ring-white/10",
                "rounded-3xl border-2 border-gray-100 bg-white p-8 xl:p-10"
              )}
            >
              <div className="flex items-center justify-between gap-x-4">
                <h2 className="text-lg/8 font-semibold">{tier.name}</h2>
              </div>
              <p className="mt-4 text-sm/6 text-gray-600">{tier.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {tier.price}
                </span>
                {tier.price !== "€0" && (
                  <span className="text-sm/6 font-semibold text-neutral-800">
                    /month
                  </span>
                )}
              </p>
              <ul
                role="list"
                className="mt-8 space-y-3 text-sm/6 text-gray-600"
              >
                {tier.features.map((feature) => (
                  <li key={feature.name} className="flex gap-x-3">
                    {feature.isPremium ? (
                      <SparklesIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                    ) : (
                      <CheckIcon
                        className="h-6 w-5 flex-none text-indigo-600"
                        aria-hidden="true"
                      />
                    )}
                    {feature.name}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex w-full">
                <GetSheetsDialog variant="pricing" buttonColor={tier.name === "Premium" ? 'indigo' : 'dark/zinc'} />
              </div>
            </div>
          ))}
        </AlertProvider>
      </div>
    </>
  );
}
