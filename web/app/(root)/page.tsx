import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { GradientText } from "./(c)/gradient-text";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="flex flex-col min-h-screen relative">
      <NavBar />
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
          <p className="text-base sm:text-lg text-gray-400 mb-8 max-w-md mx-auto md:mx-0">
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
    <header className="fixed top-0 left-0 right-0 z-30 flex h-16 justify-between items-center border-b border-gray-800 bg-background/70 backdrop-blur-md px-4 sm:px-8">
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
    <footer className="fixed bottom-0 left-0 right-0 z-30 flex h-16 justify-center items-center border-t border-gray-800 bg-background/70 backdrop-blur-md px-4 sm:px-8">
      <p className="text-sm text-gray-400 text-center">
        &copy; {new Date().getFullYear()} Learnvia. All rights reserved.
      </p>
    </footer>
  );
};
