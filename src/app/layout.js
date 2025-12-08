import { LanguageProvider } from "../../LanguageContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TopBar from "./components/TopBar";
import { Open_Sans } from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "Miljøassistanse",
  description:
    "Professional painting, gypsum installation, carpentry, and prefab gypsum systems.",
  icons: {
    icon: "/favicon.ico",
  },
};

const opensans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-opensans",
});

// Client wrapper to use LanguageProvider
function ClientLayout({ children }) {
  return <LanguageProvider defaultLanguage="no">{children}</LanguageProvider>;
}

export default function RootLayout({ children }) {
  return (
    <html lang="no" className={opensans.variable}>
      <body className="font-sans scroll-smooth">
        <ClientLayout>
          <TopBar />
          <Navbar />
          {children}
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
