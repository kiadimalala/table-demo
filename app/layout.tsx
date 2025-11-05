import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { Toaster } from "@/app/components/ui/toaster";
import { getMessages, getLocale, getTranslations } from "next-intl/server";

import { NextIntlClientProvider } from "next-intl";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata() {
  const t = await getTranslations("Public.Home");

  return {
    title: t("pageTitle"),
    description: t("pageDescription"),
    openGraph: {
      type: "website",
      title: t("pageTitle"),
      description: t("pageDescription"),
      siteName: t("pageTitle"),
    },
  } as Metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
