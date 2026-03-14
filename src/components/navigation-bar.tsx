export default function NavigationBar({
  cards,
  index,
  setIndex,
}: Readonly<{
  cards: number[];
  index: number;
  setIndex: (index: number) => void;
}>) {
  const sectionIndexName = (index: number) => {
    switch (index) {
      case 0:
        return "Me";
      case 1:
        return "Projects";
      default:
        return "";
    }
  };

  return (
    <div className="flex md:flex-col items-center md:items-start justify-center md:justify-start gap-6 md:gap-3 p-3 md:p-5 w-full md:w-auto">
      {cards.map((_, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`text-base md:text-xl font-bold transition-all duration-300 cursor-pointer ${
            index === i ? "text-foreground" : "text-foreground/60"
          }`}
        >
          {sectionIndexName(i)}
        </button>
      ))}
    </div>
  );
}
