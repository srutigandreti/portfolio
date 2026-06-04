import type { Metadata } from "next";
import Header from "@/components/Header";
import Playground from "@/components/Playground";

export const metadata: Metadata = {
  title: "Photo Wall",
  description: "A draggable, hand-arranged collection of photographs.",
};

export default function PhotoWallPage() {
  return (
    <>
      <Header />
      <main className="pt-[56px] md:pt-[64px]">
        <Playground />
      </main>
    </>
  );
}
