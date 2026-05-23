import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CornerRoom from "@/components/CornerRoom";

export const metadata: Metadata = {
  title: "Playground",
  description: "Hidden experiences await.",
};

export default function PlaygroundPage() {
  return (
    <div style={{ backgroundColor: "#EEEBE3" }}>
      <Header bg="bg-[#EEEBE3]/90" />

      <section className="min-h-screen flex items-center justify-center px-[5%] overflow-x-hidden">
        <div className="flex flex-row items-center justify-center gap-[60px] lg:gap-[80px]">
          {/* Left — text, mirrors homepage name block */}
          <div className="shrink-0 text-left">
            <p className="font-script text-brown italic leading-none mb-2 text-[1.5rem] lg:text-[2rem]">
              Explore my
            </p>
            <h1 className="font-display font-normal text-brown text-[48px] lg:text-[64px] leading-[0.92] mb-5">
              Corner
            </h1>
            <p className="font-sans font-normal text-[13px] tracking-[0.04em] text-ink leading-relaxed">
              Hidden experiences await. Hover
              <br />
              around the room to uncover them.
            </p>
          </div>

          {/* Right — interactive illustration, fixed width mirrors hero-envelope */}
          <div className="shrink-0 w-[378px] lg:w-[506px]">
            <CornerRoom />
          </div>
        </div>
      </section>

      <Footer bg="bg-[#EEEBE3]" />
    </div>
  );
}
