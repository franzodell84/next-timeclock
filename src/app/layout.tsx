import { PageHeader } from "./components/PageHeader";
import { PageMenu } from "./components/PageMenu";
import { LoginStatus } from "./components/LoginStatus";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Timeclock",
  description: "Basic Timeclock app for learning NextJS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={inter.className}>
        <div className="container p-2 mx-auto">
          <AuthProvider>
            <PageHeader />
            <LoginStatus />
            <PageMenu />
            {children}
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
