import Navigation from "@repo/ui/components/navigation/Navigation.tsx";
import "@repo/ui/globalStyle";
import ContextProvider from "../../state/ContextProvider";
import SearchForm from "../../components/SearchForm";
import ToastComponent from "../../components/ToastComponent";
import PageContent from "../../components/PageContent";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <ContextProvider>
        <body className="relative bg-black overflow-x-hidden xl:flex xl:pt-8 [&:has(dialog[open])]:overflow-hidden">
          <Navigation />
          <main className="mx-4 min-w-0 max-w-full flex flex-col gap-6 mt-6 pb-14 md:mx-6">
            <SearchForm />
            <PageContent>{children}</PageContent>
          </main>
          <ToastComponent />
        </body>
      </ContextProvider>
    </html>
  );
}
