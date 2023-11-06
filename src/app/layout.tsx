import { PageHeader } from "./components/PageHeader";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Timeclock",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <div className="container p-2 mx-auto">
          <PageHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
