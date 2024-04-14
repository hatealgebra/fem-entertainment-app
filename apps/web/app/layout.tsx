import Navigation from "@repo/ui/components/navigation/Navigation.tsx";
import "@repo/ui/globalStyle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="bg-black h-[100vh] overflow-x-hidden xl:flex xl:pt-8">
        <Navigation />
        <main className="mx-4 flex flex-col gap-6 mt-6 pb-14 md:mx-6">
          {children}
        </main>
      </body>
    </html>
  );
}
