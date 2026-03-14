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
    <div className="flex flex-col md:flex-row w-full min-h-screen items-center justify-center gap-6 md:gap-10 p-4 md:p-10 overflow-auto">
      {/* Cards */}
      <div className="relative w-full max-w-4xl md:w-225 h-[80vh] md:h-[85vh] overflow-hidden p-1 rounded-2xl">
        <div
          className="flex flex-col w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{
            transform: `translateY(-${index * 100}%)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card}
              className="w-full h-full shrink-0 flex items-center justify-center p-2 md:p-4"
            >
              {whichCard(card - 1)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <NavigationBar cards={cards} index={index} setIndex={setIndex} />
    </div>
  );
}
