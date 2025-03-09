import Container from "./Container"
import Image from 'next/image'
import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import srcImage from "@/public/images/logo_D.png"
{/* <Image width={30} height={30} src={srcImage} alt="logo" /> */ }
const Footer = () => {
  return (
    <div className="bg-blue-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div>
          <h3 className="font-semibold text-lg mb-4">عيادة اودينتال لطب الأسنان</h3>
          <h1 className="font-semibold text-5xl mb-4">عيادة اودينتال لطب الأسنان</h1>
          <p>سوريا - دمشق - المالكي</p>
          <p></p>
          <p>Phone: +963-996171681</p>
          <p>Email: odental@gamil.com</p>
          <div className="mt-4 flex space-x-4">
            <Link href="https://twitter.com/thetheme" target="_blank" rel="noopener noreferrer"><Twitter /></Link>
            <Link href="https://facebook.com/thetheme" target="_blank" rel="noopener noreferrer"><Facebook /></Link>
            <Link href="https://instagram.com/thetheme" target="_blank" rel="noopener noreferrer"><Instagram /></Link>
          </div>

          <h3 className="font-semibold text-lg mb-4 mt-6">جداولنا</h3>
          <p>الاحد الخميس     _______    21:00 - 08:30</p>
          <p>الجمعة     _______    20:00 - 14:30</p>
          <p>السبت     _______    21:00 - 08:30</p>
        </div>

        {/* Useful Links */}
        <div>

          <h3 className="font-semibold text-2xl mb-4">روابط مفيدة</h3>
          <ul className="space-y-2">
            <li><a href="#">دعم فني</a></li>
            <li><a href="#">خصوصية</a></li>
            <li><a href="#">شروط الخدمة</a></li>
            <li><a href="#">مركز المساعدة</a></li>
            <li><a href="#">من نحن</a></li>
            <li><a href="#">رسالتنا ورؤيتنا</a></li>
            <li><a href="#">مراكز الدعم</a></li>
            <li><a href="#">عمليات التجميل</a></li>
          </ul>
        </div>

        {/* Latest News */}
        <div>
          <h3 className="font-semibold text-2xl mb-8 text-end">رعاية طبية</h3>
          <ul className="space-y-2 text-end">
            <li><a href="#">رعاية طبية</a></li>
            <li><a href="#">زرع الأسنان</a></li>
            <li><a href="#">إزالة التصبغ بالليزر</a></li>
            <li><a href="#">إدارة كيس كبير</a></li>
            <li><a href="#">جراحة الزراع</a></li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
