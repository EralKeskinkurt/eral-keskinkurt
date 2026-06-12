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
    <div className="flex md:flex-col items-center md:items-start justify-center md:justify-start gap-6 md:gap-3 px-2 py-3 md:p-5 md:w-auto">
      {cards.map((_, i) => {
          const name = sectionIndexName(i);
          if (!name) return null;
          return (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`text-lg md:text-xl font-bold transition-all duration-300 cursor-pointer px-3 py-2 md:px-0 md:py-0 ${
            index === i ? "text-foreground" : "text-foreground/60"
          }`}
        >
          {name}
        </button>
          );
        })}
    </div>
  );
}
