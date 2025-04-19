import Link from 'next/link';
import { Facebook, Instagram, LinkIcon, Mail, MapPin, Phone, Twitter } from 'lucide-react';
const Footer = () => {
  return (
    <>
      <div className="bg-blue-900 text-white py-8 text-end">
        <div className=" container mx-auto px-2 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Contact Information */}
            <div>
              <h1 className="font-semibold text-xl md:text-2xl mb-8">معلومات للتواصل</h1>
              <div className="space-y-4 text-right" dir="rtl">
                {/* العنوان */}
                <div className="flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-blue-900 p-1 rounded-sm bg-white" />
                  <p>جادة الشيخ محمد بن راشد - دبي</p>
                </div>

                {/* الهاتف */}
                <div className="flex items-center gap-2">
                  <Phone className="w-6 h-6 text-blue-900 p-1 rounded-sm bg-white" />
                  <p>هاتف: +963-996171681</p>
                </div>

                {/* البريد الإلكتروني */}
                <div className="flex items-center gap-2">
                  <Mail className="w-6 h-6 text-blue-900 p-1 rounded-sm bg-white" />
                  <p>سوريا - دمشق - المالكي</p>
                </div>

                {/* إنستغرام */}
                <div className="flex items-center gap-2">
                  <Instagram className="w-6 h-6 text-blue-900 p-1 rounded-sm bg-white" />
                  <p>odental@gamil.com</p>
                </div>
              </div>

              <div className="mt-4 flex space-x-4 md:justify-end justify-start">
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
            </div>

            {/* Useful Links */}
            <div>
              <h3 className="font-semibold text-2xl mb-4">روابط مفيدة</h3>
              <ul className="space-y-2">
                <li className='flex items-center justify-end'>
                  <a href="#" className="hover:underline pe-2">دعم فني</a>
                  <LinkIcon size={18} className='text-blue-300' />
                </li>
                <li className='flex items-center justify-end'>
                  <a href="#" className="hover:underline pe-2">مركز المساعدة</a>
                  <LinkIcon size={18} className='text-blue-300' />
                </li>
                <li className='flex items-center justify-end'>
                  <a href="#" className="hover:underline pe-2">رسالتنا ورؤيتنا</a>
                  <LinkIcon size={18} className='text-blue-300' />
                </li>
                <li className='flex items-center justify-end'>
                  <a href="#" className="hover:underline pe-2">مراكز الدعم</a>
                  <LinkIcon size={18} className='text-blue-300' />
                </li>
                <li className='flex items-center justify-end'>
                  <a href="#" className="hover:underline pe-2">عمليات التجميل</a>
                  <LinkIcon size={18} className='text-blue-300' />
                </li>
                <li className='flex items-center justify-end'>
                  <a href="#" className="hover:underline pe-2">خصوصية</a>
                  <LinkIcon size={18} className='text-blue-300' />
                </li>
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

            {/*  */}
            <div>
              <h3 className="font-semibold text-lg mb-2">عيادة اودينتال لطب الأسنان</h3>
              <h1 className="font-semibold text-2xl md:text-3xl mb-4">عيادة اودينتال</h1>
              <h3 className="font-semibold text-lg mt-6 mb-2">جداولنا</h3>
              <p>الأحد - الخميس ___ 21:00 - 08:30</p>
              <p>الجمعة ___ 20:00 - 14:30</p>
              <p>السبت ___ 21:00 - 08:30</p>
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

export default Footer;