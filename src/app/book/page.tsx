import type { Metadata } from "next";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { BookingFlow } from "@/components/booking/booking-flow";

export const metadata: Metadata = {
  title: "Book a free roof inspection — AUREL Roofing Co.",
  description: "Choose a day and time window for a free, photographed 45-point roof inspection. Takes about two minutes.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <Navbar />
      <main id="main" className="wrap pb-24 pt-12 lg:pt-16">
        <BookingFlow />
      </main>
      <Footer />
    </>
  );
}
