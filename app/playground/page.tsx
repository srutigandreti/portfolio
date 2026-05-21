import type { Metadata } from "next";
import Playground from "@/components/Playground";

export const metadata: Metadata = {
  title: "Playground",
  description: "A draggable, hand-arranged collection of photographs.",
};

export default function PlaygroundPage() {
  return (
    <main>
      <Playground />
    </main>
  );
}
