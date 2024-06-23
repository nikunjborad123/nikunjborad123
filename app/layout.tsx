import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContextProvider from "@/context/theme-context";
import ActiveSectionContextProvider from "@/context/active-section-context";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Toaster } from "react-hot-toast";
import ThemeSwitch from "@/components/theme-switch";
import LoadingScreen from "@/components/loadingScreen";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nikunj Borad | Frontend Developer Portfolio",
  description:
    "Explore the portfolio of Nikunj Borad, a skilled frontend developer with over 5 years of experience in creating responsive and user-friendly web applications. Discover my projects, skills, and professional journey.",
  keywords:
    "Nikunj Borad, frontend developer, web developer, portfolio, JavaScript, React, Next.js, web applications, responsive design, user-friendly interfaces",
  authors: {
    name: "Nikunj Borad",
    url: "https://nikunjborad.tech",
  },
  openGraph: {
    title: "Nikunj Borad | Frontend Developer Portfolio",
    description:
      "Explore the portfolio of Nikunj Borad, a skilled frontend developer with over 5 years of experience in creating responsive and user-friendly web applications. Discover my projects, skills, and professional journey.",
    type: "website",
    url: "https://nikunjborad.tech",
    images: "https://nikunjborad.tech/opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikunj Borad | Frontend Developer Portfolio",
    description:
      "Explore the portfolio of Nikunj Borad, a skilled frontend developer with over 5 years of experience in creating responsive and user-friendly web applications. Discover my projects, skills, and professional journey.",
    images: "https://nikunjborad.tech/opengraph-image.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={`${inter.className} bg-gray-50 text-gray-950 relative pt-28 sm:pt-36 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90`}
      >
        <div className="bg-green-400 absolute top-[-6rem] -z-10 right-[11rem] h-[31.25rem] w-[31.25rem] rounded-full blur-[15rem] sm:w-[68.75rem] dark:bg-green-400"></div>
        <div className="bg-[#dbd7fb] absolute top-[-1rem] -z-10 left-[-35rem] h-[31.25rem] w-[50rem] rounded-full blur-[10rem] sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem] dark:bg-[#676394]"></div>
        <ThemeContextProvider>
          <ActiveSectionContextProvider>
            <Suspense fallback={<LoadingScreen />}>
              <Header />
              {children}
              <Footer />
            </Suspense>

            <Toaster position="top-right" />
            <ThemeSwitch />
          </ActiveSectionContextProvider>
        </ThemeContextProvider>
      </body>
    </html>
  );
}
