import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaTelegram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-10 pb-6 mt-20" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* بخش ۱: درباره مرکز مشاوره */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-gray-800 mb-4">مرکز مشاوره پرتو امید</h3>
            <p className="text-gray-600 text-sm leading-6 text-justify">
              مرکز مشاوره پرتو امید با هدف ارتقاء سطح علمی و روانی دانش‌آموزان مقاطع متوسطه اول و دوم فعالیت می‌کند. 
              در این پلتفرم، دانش‌آموزان پایه‌های دهم، یازدهم و دوازدهم می‌توانند با انتخاب رشته تحصیلی خود، 
              به آزمون‌های جامع و هدفمند (شامل آزمون‌های آزمایشی قلم‌چی، گزینه‌دو و خیلی سبز) دسترسی داشته باشند.
            </p>
            <p className="text-gray-600 text-sm leading-6 mt-2">
              هدف ما ارائه آزمون‌های استاندارد، دریافت کارنامه دقیق (درصد و پاسخنامه تشریحی) و کمک به دانش‌آموزان برای رسیدن به بهترین نتیجه در کنکور سراسری است.
            </p>
          </div>

          {/* بخش ۲: دسترسی سریع (لینک‌ها) */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">دسترسی سریع</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">صفحه اصلی</Link>
              </li>
              <li>
                <Link href="/exam/10" className="hover:text-blue-600 transition-colors">آزمون‌های پایه دهم</Link>
              </li>
              <li>
                <Link href="/exam/11" className="hover:text-blue-600 transition-colors">آزمون‌های پایه یازدهم</Link>
              </li>
              <li>
                <Link href="/exam/12" className="hover:text-blue-600 transition-colors">آزمون‌های پایه دوازدهم</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors">درباره ما</Link>
              </li>
            </ul>
          </div>

          {/* بخش ۳: اطلاعات تماس */}
          <div>
            <h4 className="text-lg font-semibold text-gray-800 mb-4">ارتباط با ما</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>تهران، خیابان آزادی، پلاک ۱۲۳</span>
              </li>
              <li className="flex items-center gap-2">
                <FaPhone className="text-blue-500" />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                <span>info@parto-omid.ir</span>
              </li>
            </ul>
            
            <div className="mt-4 flex space-x-4 space-x-reverse">
              <a href="#" className="text-gray-500 hover:text-pink-600 transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                <FaTelegram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* خط پایین فوتر - کپی رایت */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            © ۱۴۰۳ مرکز مشاوره پرتو امید. تمامی حقوق محفوظ است.
          </p>
          <p className="text-xs text-gray-500">
            طراحی و توسعه اختصاصی برای دانش‌آموزان متوسطه
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;