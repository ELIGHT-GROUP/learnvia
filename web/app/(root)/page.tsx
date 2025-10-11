import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import React from "react";
import { GraduationCap } from "lucide-react";
import { GradientText } from "./(c)/gradient-text";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="flex flex-col min-h-screen relative">
      <NavBar />
      <Background />
      <Hero />
      <Footer />
    </main>
  );
};

export default HomePage;

const Hero = () => {
  return (
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-20 md:py-28 bg-background">
      <div className="mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 max-w-6xl w-full">
        {/* Text section */}
        <div className="flex-1 text-center md:text-left">
          <GradientText
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight"
            text="Learnvia"
          />
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-md mx-auto md:mx-0">
            Empower your learning journey with expert-led courses, real-time
            progress tracking, and interactive lessons all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Explore Courses <GraduationCap className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Image section */}
        <div className="flex-1 flex justify-center md:justify-end">
          {/* <Image
            src="/images/hero-learning.svg"
            alt="Learning illustration"
            width={480}
            height={480}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            priority
          /> */}
        </div>
      </div>
    </section>
  );
};

const NavBar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex h-16 justify-between items-center border-b border-muted-background bg-background/70 backdrop-blur-md px-4 sm:px-8">
      <Logo size="sm" />
      <Link href="/auth/login">
        <Button variant="outline" size="sm">
          Join Now
        </Button>
      </Link>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-30 flex h-16 justify-center items-center border-t border-muted-background bg-background/70 backdrop-blur-md px-4 sm:px-8">
      <p className="text-sm text-muted-foreground text-center">
        &copy; {new Date().getFullYear()} Learnvia. All rights reserved.
      </p>
    </footer>
  );
};

const Background = () => {
  return (
    <>
      <svg
        className="absolute inset-0 z-1 h-full w-full  stroke-white/5 [mask-image:radial-gradient(100%_100%_at_top_left  ,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      ></div>
    </>
  );
};
