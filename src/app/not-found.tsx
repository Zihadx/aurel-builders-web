import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="wrap grid min-h-[60vh] content-center py-24">
        <p className="t-label text-patina">Error 404</p>
        <h1 className="t-h2 mt-3 max-w-[18ch]">That page isn’t on our roof plan.</h1>
        <p className="t-body mt-4 text-lead">The link may be old, or the address mistyped. These will get you back on track.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/" size="lg">Back to home</Button>
          <Button href="/book" variant="outline" size="lg">Book an inspection</Button>
        </div>
        <p className="t-meta mt-8 text-lead">
          Or <Link href="/#contact" className="text-patina underline underline-offset-4">contact us</Link> and we’ll point you the right way.
        </p>
      </main>
      <Footer />
    </>
  );
}
