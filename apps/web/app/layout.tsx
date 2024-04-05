import "@repo/ui/globalStyle";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body className="bg-black h-[100vh] overflow-x-hidden">
        <main>{children}</main>
      </body>
    </html>
  );
}
