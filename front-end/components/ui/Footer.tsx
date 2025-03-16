import Container from "./Container"
import Image from 'next/image'
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
const Footer = () => {
  return (
    <>
      <div className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-lg mb-2">عيادة اودينتال لطب الأسنان</h3>
              <h1 className="font-semibold text-4xl md:text-5xl mb-4">عيادة اودينتال</h1>
              <p>سوريا - دمشق - المالكي</p>
              <p>Phone: +963-996171681</p>
              <p>Email: odental@gamil.com</p>
              <div className="mt-4 flex space-x-4 justify-center sm:justify-start">
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter />
                </Link>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook />
                </Link>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram />
                </Link>
              </div>

              <h3 className="font-semibold text-lg mt-6 mb-2">جداولنا</h3>
              <p>الأحد - الخميس ___ 21:00 - 08:30</p>
              <p>الجمعة ___ 20:00 - 14:30</p>
              <p>السبت ___ 21:00 - 08:30</p>
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="font-semibold text-2xl mb-4">روابط مفيدة</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">دعم فني</a></li>
                <li><a href="#" className="hover:underline">خصوصية</a></li>
                <li><a href="#" className="hover:underline">شروط الخدمة</a></li>
                <li><a href="#" className="hover:underline">مركز المساعدة</a></li>
                <li><a href="#" className="hover:underline">من نحن</a></li>
                <li><a href="#" className="hover:underline">رسالتنا ورؤيتنا</a></li>
                <li><a href="#" className="hover:underline">مراكز الدعم</a></li>
                <li><a href="#" className="hover:underline">عمليات التجميل</a></li>
              </ul>
            </div>

            {/* Latest News */}
            <div>
              <h3 className="font-semibold text-2xl mb-4">رعاية طبية</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">رعاية طبية</a></li>
                <li><a href="#" className="hover:underline">زرع الأسنان</a></li>
                <li><a href="#" className="hover:underline">إزالة التصبغ بالليزر</a></li>
                <li><a href="#" className="hover:underline">إدارة كيس كبير</a></li>
                <li><a href="#" className="hover:underline">جراحة الزرع</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 py-5 text-white flex justify-center items-center">
        <p>© 2025 ODental</p>
      </footer>
    </>
  )
}

export default Footer

