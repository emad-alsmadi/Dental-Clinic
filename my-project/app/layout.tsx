
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import AuthChecker from "@/components/CheckAuth";
import CheckRegister from "@/components/CheckRegister";
const metadata: Metadata = {
  title: "BeBo Ecommerce website app for shoppers",
  description: "An Ecommerce app for eduction purposes",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html lang="en">
      <body>
        <div>
          
          <AuthChecker />   {/* استخدام مكون تحقق من تسجيل الدخول */}
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
};

export default RootLayout;



