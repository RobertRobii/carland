import { Inter } from "next/font/google";
import "./globals.css";
import { SearchContextProvider } from "./context/search";
import { AuthProvider } from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <SearchContextProvider>
      <html lang="en">
        <link rel="icon" href="/icons/tab-icon.png" />
        <body className={inter.className}>
          <AuthProvider>{children}</AuthProvider>
        </body>
      </html>
    </SearchContextProvider>
  );
}
