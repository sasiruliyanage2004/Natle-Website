export default function Marquee({ items }: { items: string[] }) {
  const loop = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-16 py-2">
        {loop.map((name, i) => (
          <span
            key={`${name}-${i}`}
            className="font-display text-xl sm:text-2xl text-ink/25 whitespace-nowrap"
          >
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}
