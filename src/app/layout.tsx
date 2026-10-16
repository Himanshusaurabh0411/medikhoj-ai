import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { CabinetProvider } from "@/context/CabinetContext";
import { Navbar } from "@/components/layout/Navbar";
import { BottomNav } from "@/components/layout/BottomNav";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "MediKhoj AI | India's Advanced Medicine Intelligence & Substitute Platform",
  description: "Identify Indian medicines, find affordable bio-equivalent substitutes, scan barcodes, check expiry, and compare price per tablet/unit.",
  keywords: ["medicine", "medicine substitutes", "NPPA", "DPCO", "generic medicine", "medicine price comparison", "Dolo 650", "Augmentin", "GS1 DataMatrix", "India healthcare"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
        <LanguageProvider>
          <CabinetProvider>
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <BottomNav />
            <Footer />
          </CabinetProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
