import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/layout/Footer";
import AuthChecker from "@/components/auth/CheckAuth";

export const metadata: Metadata = {
  title: "Dental Clinic | أفضل عيادة أسنان",
  description: "احجز موعدك الآن في أفضل عيادة أسنان مع أطباء محترفين وبأحدث التقنيات.",
  keywords: "طب الأسنان, حجز موعد, عيادة أسنان, تبييض الأسنان, تقويم الأسنان , رعاية طبية , زرع الأسنان , إزالة التصبغ بالليزر , جراحة الزرع",
  openGraph: {
    title: "Dental Clinic | أفضل عيادة أسنان",
    description: "احجز موعدك الآن في أفضل عيادة أسنان مع أطباء محترفين وبأح  التقنيات.",
    url: "https://odental.com",
    type: "website",
    images: [
      {
        url: "https://odental.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dental Clinic",
      },
    ],
  },
  robots: "index, follow",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ar">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <AuthChecker />
        <Header />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
};
export default RootLayout;