
import Container from "@/components/ui/Container";
import { Facebook, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';
import srcImage from "@/public/images/logo_D.png";

const ContactPage = () => {
  return (
    <div className="bg-gray-100 py-12">
      <Container>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center mb-8">
            <Image
              src={srcImage}
              alt="Logo"
              width={100}
              height={100}
              className="mx-auto"
            />
            <h1 className="text-4xl font-bold text-blue-900 mt-4">تواصل معنا</h1>
            <p className="text-gray-600 mt-2">نحن هنا لمساعدتك في أي استفسار أو حجز موعد.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* معلومات الاتصال */}
            <div>
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">معلومات الاتصال</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">عيادة أودينتال لطب الأسنان</h3>
                  <p className="text-gray-600">سوريا - دمشق - المالكي</p>
                </div>
                <div>
                  <p className="text-gray-600">الهاتف: +963-996171681</p>
                  <p className="text-gray-600">البريد الإلكتروني: odental@gmail.com</p>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com/thetheme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Twitter />
                  </a>
                  <a
                    href="https://facebook.com/thetheme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Facebook />
                  </a>
                  <a
                    href="https://instagram.com/thetheme"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <Instagram />
                  </a>
                </div>
              </div>
            </div>

            {/* نموذج الاتصال */}
            <div>
              <h2 className="text-2xl font-semibold text-blue-900 mb-4">أرسل لنا رسالة</h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-700">الاسم</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-gray-700">البريد الإلكتروني</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-gray-700">الرسالة</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
                  ></textarea>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                  >
                    إرسال الرسالة
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* جداول العمل */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-blue-900 mb-4">جداول العمل</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">الأحد - الخميس</p>
                <p className="text-gray-600">08:30 صباحًا - 09:00 مساءً</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">الجمعة</p>
                <p className="text-gray-600">02:30 مساءً - 08:00 مساءً</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">السبت</p>
                <p className="text-gray-600">08:30 صباحًا - 09:00 مساءً</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ContactPage;