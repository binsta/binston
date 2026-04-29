import { Nav } from "@/components/ui/Nav";
import { Footer } from "@/components/ui/Footer";
import { SearchPalette } from "@/components/ui/SearchPalette";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Nav />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
      <SearchPalette />
    </div>
  );
}
