"use client";
import Me from "@/components/me";
import NavigationBar from "@/components/navigation-bar";
import Projects from "@/components/projects";
import { useState } from "react";

export default function Home() {
  const [index, setIndex] = useState(0);
  const cards = [1, 2, 3, 4];

  const whichCard = (index: number) => {
    switch (index) {
      case 0:
        return <Me />;
      case 1:
        return <Projects />;
      default:
        return null;
    }
  };

  return (
    <div className="relative isolate flex w-full min-h-screen flex-col items-center justify-center gap-4 overflow-auto px-4 py-6 md:flex-row md:gap-10 md:px-10 md:py-10">
      {/* Cards */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl p-1 h-[75vh] md:w-225 md:h-[85vh]">
        <div
          className="flex flex-col w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translateY(-${index * 100}%)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card}
              className="w-full h-full shrink-0 flex items-center justify-center p-1 md:p-4"
            >
              {whichCard(card - 1)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 flex-shrink-0 w-full flex justify-center md:w-auto md:block">
        <NavigationBar cards={cards} index={index} setIndex={setIndex} />
      </div>
    </div>
  );
}
