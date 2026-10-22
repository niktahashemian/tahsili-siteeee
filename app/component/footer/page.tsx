// import React from 'react';
// import '../../assets/css/style.css';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="footer-main" dir="rtl">
//       <div className="footer-main-container">
//         {/* ردیف اصلی - لینک‌های فوتر */}
//         <div className="footer-row">
//           {/* ستون معرفی */}
//           <div className="footer-col">
//             <h4 className="footer-title">معرفی</h4>
//             <ul className="footer-list">
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   درباره راست چین
//                 </a>
//               </li>
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   فرصت‌های شغلی
//                 </a>
//               </li>
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   اطلاعات تماس
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* ستون خدمات */}
//           <div className="footer-col">
//             <h4 className="footer-title">خدمات</h4>
//             <ul className="footer-list">
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   ضمانت بازگشت وجه
//                 </a>
//               </li>
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   پشتیبانی سریع
//                 </a>
//               </li>
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   فروشنده شوید
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* ستون دسترسی سریع */}
//           <div className="footer-col">
//             <h4 className="footer-title">دسترسی سریع</h4>
//             <ul className="footer-list">
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   وبلاگ راست چین
//                 </a>
//               </li>
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   افزونه مدیریت الیسنس
//                 </a>
//               </li>
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   قوانین سایت
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* ستون سرویس‌های میزبانی */}
//           <div className="footer-col">
//             <h4 className="footer-title">سرویس‌های میزبانی</h4>
//             <ul className="footer-list">
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   هاست وردپرس
//                 </a>
//               </li>
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   هاست لینوکس
//                 </a>
//               </li>
//               <li className="footer-list-item">
//                 <a href="#" className="footer-link">
//                   سرور مجازی
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* بخش تیکت و شبکه‌های اجتماعی - کنار هم */}
//         <div className="footer-ticket-social-wrapper">
//           {/* بخش ارسال تیکت */}
//           <div className="footer-ticket-section">
//             <h5 className="footer-ticket-title">ارسال تیکت</h5>
//             <p className="footer-ticket-description">
//               ۷ روز هفته و ۲۴ ساعته پاسخگوی شماییم!
//             </p>
//             <a href="#" className="footer-ticket-link">
//               <span>🎧</span>
//               پشتیبانی و تیکت
//               <span>←</span>
//             </a>
//           </div>

//           {/* بخش شبکه‌های اجتماعی */}
//           <div className="footer-social-section">
//             <h5 className="footer-social-title">با ما همراه باشید</h5>
//             <ul className="footer-social-list">
//               {/* اینستاگرام با متن */}
//               <li className="footer-social-item">
//                 <a 
//                   href="https://instagram.com/rtltheme" 
//                   target="_blank" 
//                   rel="nofollow noopener"
//                   className="footer-social-link-text instagram"
//                 >
//                   <span className="footer-social-icon">📷</span>
//                   <span>اینستاگرام</span>
//                 </a>
//               </li>
              
//               {/* تلگرام با متن */}
//               <li className="footer-social-item">
//                 <a 
//                   href="https://t.me/rtltheme" 
//                   target="_blank" 
//                   rel="nofollow noopener"
//                   className="footer-social-link-text telegram"
//                 >
//                   <span className="footer-social-icon">✈️</span>
//                   <span>تلگرام</span>
//                 </a>
//               </li>
              
//               {/* فیسبوک فقط آیکون */}
//               <li className="footer-social-item">
//                 <a 
//                   href="https://fb.com/rtltheme" 
//                   target="_blank" 
//                   rel="nofollow noopener"
//                   className="footer-social-link-icon facebook"
//                 >
//                   <span className="footer-social-icon">📘</span>
//                 </a>
//               </li>
              
//               {/* توییتر فقط آیکون */}
//               <li className="footer-social-item">
//                 <a 
//                   href="https://twitter.com/rtltheme" 
//                   target="_blank" 
//                   rel="nofollow noopener"
//                   className="footer-social-link-icon twitter"
//                 >
//                   <span className="footer-social-icon">🐦</span>
//                 </a>
//               </li>
              
//               {/* لینکدین فقط آیکون */}
//               <li className="footer-social-item">
//                 <a 
//                   href="https://www.linkedin.com/company/rtltheme/" 
//                   target="_blank" 
//                   rel="nofollow noopener"
//                   className="footer-social-link-icon linkedin"
//                 >
//                   <span className="footer-social-icon">🔗</span>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* کپی‌رایت */}
//         <div className="footer-copyright">
//           © {currentYear} راست چین. تمامی حقوق محفوظ است.
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import Link from 'next/link';
import '../../assets/css/style.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main" dir="rtl">
      <div className="footer-main-container">
        {/* ردیف اصلی - لینک‌های فوتر */}
        <div className="footer-row">

          {/* ستون ۱: درباره ما */}
          <div className="footer-col">
            <h4 className="footer-title">درباره ما</h4>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link href="/about" className="footer-link">درباره مرکز مشاوره</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/contact" className="footer-link">تماس با ما</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/faq" className="footer-link">سوالات متداول</Link>
              </li>
            </ul>
          </div>

          {/* ستون ۲: دسترسی سریع */}
          <div className="footer-col">
            <h4 className="footer-title">دسترسی سریع</h4>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link href="/" className="footer-link">صفحه اصلی</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/exam/dahom/ensani/ghalamchi" className="footer-link">آزمون پایه دهم انسانی قلمچی</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/exam/yazdahom/tajrobi/ghamchi/first-half" className="footer-link">آزمون پایه یازدهم تجربی قلمچی نیم سال اول</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/exam/12" className="footer-link">آزمون پایه دوازدهم</Link>
              </li>
            </ul>
          </div>

          {/* ستون ۳: لینک‌های مفید */}
          <div className="footer-col">
            <h4 className="footer-title">لینک‌های مفید</h4>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link href="/ghalamchi" className="footer-link">آزمون‌های قلم‌چی</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/gozine2" className="footer-link">آزمون‌های گزینه‌دو</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/kheilisabz" className="footer-link">آزمون‌های خیلی سبز</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/answers" className="footer-link">پاسخنامه‌ها</Link>
              </li>
            </ul>
          </div>

          {/* ستون ۴: قوانین */}
          <div className="footer-col">
            <h4 className="footer-title">قوانین و مقررات</h4>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link href="/rules" className="footer-link">قوانین سایت</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/privacy" className="footer-link">حریم خصوصی</Link>
              </li>
              <li className="footer-list-item">
                <Link href="/terms" className="footer-link">شرایط استفاده</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* بخش تیکت و شبکه‌های اجتماعی - کنار هم */}
        <div className="footer-ticket-social-wrapper">

          {/* بخش ارسال تیکت */}
          <div className="footer-ticket-section">
            <h5 className="footer-ticket-title">پشتیبانی آنلاین</h5>
            <p className="footer-ticket-description">
              در صورت بروز هرگونه مشکل در آزمون‌ها یا دریافت کارنامه، با ما در تماس باشید.
            </p>
            <Link href="/ticket" className="footer-ticket-link">
              <span>🎧</span>
              ارسال تیکت
              <span>←</span>
            </Link>
          </div>

          {/* بخش شبکه‌های اجتماعی */}
          <div className="footer-social-section">
            <h5 className="footer-social-title">با ما همراه باشید</h5>
            <ul className="footer-social-list">

              {/* اینستاگرام با متن */}
              <li className="footer-social-item">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="nofollow noopener"
                  className="footer-social-link-text instagram"
                >
                  <span className="footer-social-icon">📷</span>
                  <span>اینستاگرام</span>
                </a>
              </li>

              {/* تلگرام با متن */}
              <li className="footer-social-item">
                <a
                  href="https://t.me"
                  target="_blank"
                  rel="nofollow noopener"
                  className="footer-social-link-text telegram"
                >
                  <span className="footer-social-icon">✈️</span>
                  <span>تلگرام</span>
                </a>
              </li>

              {/* واتساپ فقط آیکون */}
              <li className="footer-social-item">
                <a
                  href="https://wa.me"
                  target="_blank"
                  rel="nofollow noopener"
                  className="footer-social-link-icon whatsapp"
                >
                  <span className="footer-social-icon">💬</span>
                </a>
              </li>

              {/* ایمیل فقط آیکون */}
              <li className="footer-social-item">
                <a
                  href="mailto:info@parto-omid.ir"
                  className="footer-social-link-icon email"
                >
                  <span className="footer-social-icon">✉️</span>
                </a>
              </li>

              {/* تماس تلفنی فقط آیکون */}
              <li className="footer-social-item">
                <a
                  href="tel:+982112345678"
                  className="footer-social-link-icon phone"
                >
                  <span className="footer-social-icon">📞</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* کپی‌رایت */}
        <div className="footer-copyright">
          © {currentYear} مرکز مشاوره پرتو امید. تمامی حقوق محفوظ است.
        </div>
      </div>
    </footer>
  );
};

export default Footer;