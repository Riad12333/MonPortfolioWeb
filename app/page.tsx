import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Features from "@/components/features";
import Pricing from "@/components/pricing";
import CTASection from "@/components/cta-section";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30">
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <CTASection />

      {/* Footer Placeholder for now */}
      <footer className="py-12 border-t border-slate-900 bg-slate-950 text-center text-slate-500 text-sm">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="mb-4 text-2xl font-bold text-white">
            Mon<span className="text-blue-500">Portfolio</span>Web
          </div>
          <p>© 2025 OULDGOUGAM Madjid Riad. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
