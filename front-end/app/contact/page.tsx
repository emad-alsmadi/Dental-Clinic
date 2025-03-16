"use client";
import { useState } from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("تم إرسال الرسالة بنجاح!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 md:px-8">
      <div className="max-w-3xl mx-auto bg-white p-6 md:p-10 rounded-xl shadow-lg">
        {/* عنوان الصفحة */}
        <h2 className="text-3xl font-semibold text-blue-900 text-center mb-6">
          أرسل لنا رسالة
        </h2>

        {/* نموذج الاتصال */}
        <motion.form
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              الاسم
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium">
              الرسالة
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300"
            >
              إرسال الرسالة
            </button>
          </div>
        </motion.form>

        {/* جداول العمل */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-blue-900 text-center mb-4">
            جداول العمل
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { day: "الأحد - الخميس", time: "08:30 صباحًا - 09:00 مساءً" },
              { day: "الجمعة", time: "02:30 مساءً - 08:00 مساءً" },
              { day: "السبت", time: "08:30 صباحًا - 09:00 مساءً" },
            ].map((schedule, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
                whileHover={{ scale: 1.05 }}
              >
                <p className="text-gray-700 font-medium">{schedule.day}</p>
                <p className="text-gray-600">{schedule.time}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;