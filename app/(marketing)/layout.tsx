import { SiteNav } from "@/components/site-nav";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteNav />
      {children}
      <footer className="border-t border-border/70 py-10">
        <div className="container flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} LinguaPrep. All practice content is original.</p>
          <p>IELTS, TOEFL, PTE and Duolingo English Test are trademarks of their respective owners.</p>
        </div>
      </footer>
    </>
  );
}
