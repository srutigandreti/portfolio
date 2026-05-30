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

      <section className="min-h-screen flex items-center justify-center px-[5%] py-12 lg:py-0 overflow-x-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[80px]">
          {/* Left — text, mirrors homepage name block */}
          <div className="shrink-0 text-center lg:text-left">
            <p className="font-script text-brown italic leading-none mb-2 text-[1.75rem] lg:text-[2rem]">
              Explore my
            </p>
            <h1 className="font-display font-normal text-brown text-[3rem] lg:text-[64px] leading-[0.92] mb-5">
              Corner
            </h1>
            <p className="font-sans font-normal text-[13px] tracking-[0.04em] text-ink leading-relaxed">
              Hidden experiences await. <span className="lg:hidden">Click</span>
              <span className="hidden lg:inline">
                Hover
                <br />
              </span>{" "}
              around the room to uncover them.
            </p>
          </div>

          {/* Right — interactive illustration, fixed width mirrors hero-envelope */}
          <div className="shrink-0 w-[min(85vw,360px)] lg:w-[506px]">
            <CornerRoom />
          </div>
        </div>
      </section>

      <Footer bg="bg-[#EEEBE3]" />
    </div>
  );
}
