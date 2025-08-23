import { Subheading } from "@/app/templates/heading";
import { StarIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import imperium from "../../img/imperium-logo.webp";
import justLift from "../../img/just-lift-project.webp";
import pdi from "../../img/pdi-personal-training.webp";

type TestimonialProps = {
  quote: string;
  name: string;
  imageUrl?: string;
};

const testimonial1 = {
  name: "Jason Leong",
  company: "Just Lift Project",
  quote: `I use CoachPal every week for every single client check-in. CoachPal is the only thing keeping me from moving to a coaching app.`,
  imageUrl: justLift.src,
};

const testimonial2 = {
  name: "Cristian Rosca",
  company: "Imperium Coaching",
  quote: `CoachPal has become the foundation of my coaching business. It made monitoring progress and check-ins infinitely easier, while saving both me and my clients countless hours of work.`,
  imageUrl: imperium.src,
};

const testimonial3 = {
  name: "Peter Elliot",
  company: "PDI Personal Training",
  quote: `Using CoachPal for me has been a game changer for keeping my clients accountable and it is so easy to use. I was pleasantly surprised, as I usually avoid techy things! 
Cristian is a great help at every turn should you have questions, updating the app often to make it even better for both coaches and clients alike! 10/10`,
  imageUrl: pdi.src,
};

function Testimonial({
  quote,
  name,
  imageUrl,
  company,
}: TestimonialProps & { company?: string }) {
  const getInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className={"flex flex-col lg:pb-0"}>
      <figure className="flex flex-auto flex-col justify-between">
        <div className="gap-4">
          <p className="sr-only">5 out of 5 stars</p>
          <div className="my-4 flex gap-x-1 text-indigo-600">
            <StarIcon aria-hidden="true" className="size-5" />
            <StarIcon aria-hidden="true" className="size-5" />
            <StarIcon aria-hidden="true" className="size-5" />
            <StarIcon aria-hidden="true" className="size-5" />
            <StarIcon aria-hidden="true" className="size-5" />
          </div>
          <blockquote className="text-lg/8">
            <p>
              <span className="whitespace-nowrap">&ldquo;</span>
              {quote}
              <span className="whitespace-nowrap">&rdquo;</span>
            </p>
          </blockquote>
        </div>
        <figcaption className="mt-4 flex items-center gap-x-6">
          {imageUrl ? (
            <Image
              alt="testimonial profile picture"
              src={imageUrl}
              className="h-14 w-14 rounded-full bg-gray-800 object-cover"
              width={100}
              height={100}
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-400 text-xl text-white">
              {getInitial(name)}
            </div>
          )}

          <div className="text-base">
            <div className="font-semibold">{name}</div>
            {company && <div className="text-sm text-gray-500">{company}</div>}
          </div>
        </figcaption>
      </figure>
    </div>
  );
}

export default function Testimonials() {
  return (
    <section>
      <Subheading
        level={2}
        className="py-8 text-2xl/8 font-medium sm:text-3xl/8"
      >
        What do coaches think?
      </Subheading>

      <div className="grid grid-cols-1 gap-12 ">
        <Testimonial
          name={testimonial1.name}
          quote={testimonial1.quote}
          company={testimonial1.company}
          imageUrl={testimonial1.imageUrl}
        />
        <Testimonial
          name={testimonial3.name}
          quote={testimonial3.quote}
          company={testimonial3.company}
          imageUrl={testimonial3.imageUrl}
        />
        <Testimonial
          name={testimonial2.name}
          quote={testimonial2.quote}
          company={testimonial2.company}
          imageUrl={testimonial2.imageUrl}
        />
      </div>
    </section>
  );
}
