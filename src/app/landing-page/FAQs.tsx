import { Subheading } from "@/app/templates/heading";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/24/outline";

const faqs: Array<{ question: string; answer: string }> = [
  {
    question: `Why are you giving away the coaching system sheets for free? `,
    answer: `We provide these powerful systems for free because we believe every coach deserves access to great tools. Our model is straightforward: we hope that as coaches find significant value in these free templates, some will choose to enhance their workflow further with a Premium tier subscription for advanced automation and features. This approach allows us to keep the lights on, but the free systems are yours to use forever, no strings attached.`
  },
  {
    question: `Where can I learn how to use these coaching systems?`,
    answer: `You will receive a detailed walkthrough video with the email you receive when you sign up. If you have further questions, we can support you via email at info@coachpal.io.`
  },
  {
    question: `Will the Free tier coaching system always be free?`,
    answer: `Yes, it will be free forever. You can use it without any cost, and you can also choose to upgrade to CoachPal Premium for additional features.`,
  },
  {
    question: `Will the coaching systems and resources receive updates?`,
    answer: `Yes, the coaching systems will continue to receive updates and we'll be adding even more resources. You'll automatically get access to all future updates.`,
  },
  {
    question: `How does CoachPal Premium tier auto-export work?`,
    answer: `CoachPal fetches your clients' tracked data from their third-party apps and automatically exports it directly to their Google Sheets, keeping your sheets updated and organised without any manual effort.`,
  },
  {
    question: "Can I control how often data gets transferred to Google Sheets?",
    answer: `Absolutely. CoachPal provides the flexibility to automatically populate your clients' sheets with recently tracked data or you can manually export whatever data you want, whenever you want.`,
  },
  {
    question: `Do I need advanced tech skills to use CoachPal?`,
    answer: `Not at all. CoachPal was designed to ensure ease-of-use for coaches, with intuitive features and a simple interface so you can get started right away. We will also provide step-by-step guides on how to set up and use the system effectively.`,
  },
  {
    question: `What support is available if I have questions?`,
    answer: `If you have any questions or need assistance, simply email info@coachpal.io or click "Ask a question" below, and we'll be happy to help you out.`,
  },
];

export default function FAQs() {
  return (
    <div className="mx-auto divide-white/10">
      <Subheading level={2} className="text-2xl/8 sm:text-3xl/8 font-medium">
        Frequently asked questions
      </Subheading>
      <dl className="mt-10 sm:grid grid-cols-1 sm:grid-cols-2 gap-x-12">
        {/* <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:space-y-0 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10"> */}
        {faqs.map((faq) => (
          <Disclosure key={faq.question} as="div" className="py-6">
            <dt>
              <DisclosureButton className="group flex w-full items-start justify-between text-left">
                <span className="text-base/7 font-semibold">
                  {faq.question}
                </span>
                <span className="ml-6 flex h-7 items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className="size-5 group-data-[open]:hidden"
                  />
                  <MinusIcon
                    aria-hidden="true"
                    className="size-5 hidden group-data-[open]:block"
                  />
                </span>
              </DisclosureButton>
            </dt>
            <DisclosurePanel as="dd" className="mt-2 pr-12">
              <p className="text-base/7">{faq.answer}</p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </dl>
    </div>
  );
}
