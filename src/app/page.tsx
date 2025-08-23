import AskAQuestion from "./landing-page/AskAQuestion";
import CoachPalFeatures from "./landing-page/CoachPalFeatures";
import { Container } from "./landing-page/Container";
import FAQs from "./landing-page/FAQs";
import Hero from "./landing-page/Hero";

export default function Home() {
  return (
    <>
      <Container className="mt-24 max-w-screen-lg text-center sm:mt-32">
        <Hero />
      </Container>
      <Container className="mt-24">
        <div className="relative aspect-video w-full">
          <iframe
            className="absolute inset-0 h-full w-full border-0"
            src="https://www.tella.tv/video/coach-os-91ak/embed?b=0&title=0&a=1&loop=0&t=0&muted=0&wt=0"
            title="CoachPal Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </Container>
      <Container className="mt-28 md:mt-44">
        <CoachPalFeatures />
      </Container>
      <Container className="mt-28 md:mt-36">
        <FAQs />
      </Container>
      <Container className="md:mb-12 mt-24">
        <AskAQuestion />
      </Container>
    </>
  );
}
