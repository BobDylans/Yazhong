"use client";

const carBrands = [
  "Toyota","BMW","Mercedes","Volkswagen","Audi","Honda","Ford","Lexus",
  "Volvo","Porsche","Hyundai","Kia","Mazda","Nissan","Subaru","Mitsubishi",
  "Jeep","Chevrolet","Tesla","Ferrari","Lamborghini","Jaguar","Land Rover",
  "Mini","Fiat","Peugeot","Renault","Skoda","Seat","Suzuki","MG","Opel",
  "Citroen","Alfa Romeo","Maserati","Bentley","Rolls-Royce","Aston Martin",
  "McLaren","Rivian","Lucid","Polestar","Genesis",
];

function BrandLogoItem({ name }: { name: string }) {
  const hue = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 360;
  return (
    <div className="inline-flex items-center justify-center mx-3 h-20 md:h-24">
      <div className="flex items-center justify-center rounded-xl px-6 h-full ring-1 ring-black/5 transition-all duration-500 hover:ring-[#3178c6]/20 hover:shadow-premium"
        style={{ backgroundColor: `hsl(${hue}, 12%, 96%)` }}>
        <span className="font-semibold text-sm md:text-base whitespace-nowrap tracking-wide"
          style={{ color: `hsl(${hue}, 30%, 25%)` }}>
          {name}
        </span>
      </div>
    </div>
  );
}

export function BrandMarquee() {
  const doubledBrands = [...carBrands, ...carBrands];

  return (
    <section className="w-full py-10 md:py-14 overflow-hidden">
      <div className="text-center mb-8 md:mb-10 px-4">
        <span className="eyebrow mb-3">Brands</span>
        <h2 className="text-xl md:text-2xl font-bold text-[#1a1f24] tracking-tight">
          Custom Fit Car Seat Covers
        </h2>
      </div>

      <div className="relative w-full overflow-x-hidden">
        <style>{`
          @keyframes marquee-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: inline-flex;
            animation: marquee-scroll 40s linear infinite;
            will-change: transform;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="marquee-track">
          {doubledBrands.map((brand, index) => (
            <BrandLogoItem key={`${brand}-${index}`} name={brand} />
          ))}
        </div>
      </div>
    </section>
  );
}
