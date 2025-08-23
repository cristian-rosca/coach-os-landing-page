export default function BackgroundPattern() {
  return (
    <>
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 h-full w-full stroke-black/10 dark:stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          {/* The repeating pattern definition */}
          <pattern
            id="blob-pattern"
            x="50%"
            y={-1}
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>

        {/* The additional squares in the corners */}
        <svg x="50%" y={-1} className="overflow-visible fill-gray-200/40 dark:fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z 
               M600 0h201v201h-201Z 
               M-400 600h201v201h-201Z 
               M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>

        {/* The rectangle that covers the entire background using the pattern */}
        <rect
          fill="url(#blob-pattern)"
          width="100%"
          height="100%"
          strokeWidth={0}
        />
      </svg>
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