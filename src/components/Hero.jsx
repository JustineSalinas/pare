import { ChevronDown } from "lucide-react";
import { FALLBACK_TEXTURE } from "./Img";

const FRESHA_URL =
  "https://www.fresha.com/a/pare-mens-grooming-lifestyle-iloilo-city-the-alcove-general-luna-street-g943g1tc";

const BG = "/venue/shop-02.jpg";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden"
    >
      {/* Background */}
      {/* Second layer is a texture fallback in case the photo ever fails to load */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-heroBgZoom"
        style={{ backgroundImage: `url('${BG}'), url('${FALLBACK_TEXTURE}')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#080808]/85 via-[#080808]/50 to-[#080808]/75" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 animate-fadeUp">
        <p className="font-grotesk text-[0.75rem] font-bold tracking-[0.45em] uppercase text-[#C47840] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Iloilo City's Premier Barbershop
        </p>
        <h1 className="font-grotesk font-bold text-[clamp(5rem,16vw,14rem)] leading-[0.9] tracking-[0.2em] text-[#f5f2ed] mb-5">
          PARE
        </h1>
        <p className="font-fraunces italic font-normal text-[clamp(1.2rem,3vw,1.85rem)] text-[#C9C5BC] mb-12 tracking-[0.05em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Men's Grooming &amp; Lifestyle
        </p>

        <div className="flex gap-5 justify-center flex-wrap">
          <a
            href="#booking"
            className="font-general-sans text-[0.72rem] font-semibold tracking-[0.25em] uppercase text-[#080808] bg-[#C47840] px-10 py-4 hover:bg-[#D9906A] transition-all hover:-translate-y-0.5 no-underline"
          >
            Book an Appointment
          </a>
          <a
            href="#services"
            className="font-general-sans text-[0.72rem] font-medium tracking-[0.25em] uppercase text-white px-10 py-4 border border-white/25 hover:border-[#C47840] hover:bg-[#C47840]/8 transition-all no-underline"
          >
            View Services
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-fadeIn">
        <div className="w-px h-10 bg-gradient-to-b from-[#C47840] to-transparent animate-scrollPulse" />
        <ChevronDown size={14} className="text-[#555550]" />
      </div>
    </section>
  );
}
