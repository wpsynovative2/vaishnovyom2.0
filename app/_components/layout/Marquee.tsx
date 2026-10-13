import { marqueeWords } from "../../_content/site";

/** Slow band of project keywords. Purely decorative, so hidden from screen readers. */
export function Marquee() {
  const row = (
    <ul className="flex shrink-0 items-center">
      {marqueeWords.map((word) => (
        <li key={word} className="flex items-center font-serif text-2xl text-brown/80 md:text-4xl">
          <span className="px-6 md:px-10">{word}</span>
          <span className="size-2 rotate-45 bg-gold" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="overflow-hidden py-8 md:py-12" aria-hidden>
      <div className="animate-marquee flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
