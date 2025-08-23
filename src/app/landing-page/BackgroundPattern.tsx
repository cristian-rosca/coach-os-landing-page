import { GridPattern } from './GridPattern';

export default function BackgroundPattern() {
  return (
    <>
      <GridPattern
        className="absolute inset-x-0 -top-14 z-0 h-[1000px] w-full fill-gray-50 stroke-gray-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)] dark:fill-white/6 dark:stroke-white/7 pointer-events-auto"
        yOffset={-96}
        interactive
      />
      <div
        aria-hidden="true"
        className="absolute top-10 left-[calc(50%-4rem)] -z-10 
                   transform-gpu blur-3xl 
                   sm:left-[calc(50%-18rem)] 
                   lg:top-[calc(50%-30rem)] 
                   lg:left-48 
                   xl:left-[calc(50%-24rem)]"
      >
       
      </div>
    </>
  );
}