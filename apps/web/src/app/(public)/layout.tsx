import "@repo/ui/globalStyle";
import ContextProvider from "../../state/ContextProvider";
import LogoIcon from "@icons/assets/icons/logo.svg";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <ContextProvider>
        <body className="relative bg-black overflow-x-hidden px-6 pt-[48px]">
          <header className="w-full ">
            <Image
              className="mx-auto"
              src={LogoIcon}
              alt="Movie image icon"
              width={32}
              height={25.6}
            />
          </header>
          <main className="mt-[58px]">
            <div className="bg-darkBlue p-6 flex flex-col gap-y-6 rounded-[10px] max-w-[400px] mx-auto">
              {children}
            </div>
          </main>
        </body>
      </ContextProvider>
    </html>
  );
}
