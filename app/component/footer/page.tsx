import React from 'react';
import Link from 'next/link';
import '../../assets/css/style.css';

// ==================== آیکون‌های SVG ====================
const MapPinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon-blue">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon-blue">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="footer-icon-blue">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TelegramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21.5 2L2 10.5l5 2 2 6 3-4 5 4 4.5-16.5z"></path>
    <path d="M9 12.5l10-7"></path>
  </svg>
);

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const HeadphoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
  </svg>
);

// ==================== کامپوننت اصلی ====================
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-main" dir="rtl">
      <div className="footer-main-container">
        {/* ============ ردیف دوم: آزمون‌ها (۶ آزمون) ============ */}
        <div className="footer-row footer-row-exams">
          <div className="footer-col">
            <h4 className="footer-title">گزینه دو</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="exam/dahom/tajrobi/gozine2" className="footer-link">دهم گزینه دو تجربی</Link></li>
              <li className="footer-list-item"><Link href="exam/yazdahom/riyazi/gozine2" className="footer-link">یازدهم گزینه دو ریاضی</Link></li>
              <li className="footer-list-item"><Link href="exam/davazdahom/ensani/gozine2" className="footer-link">دوازدهم گزینه دو انسانی</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">قلم‌چی</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="exam/dahom/tajrobi/ghalamchi/first-half" className="footer-link">دهم قلم‌چی تجربی </Link></li>
              <li className="footer-list-item"><Link href="exam/yazdahom/riyazi/ghalamchi/first-half" className="footer-link">یازدهم قلم‌چی ریاضی</Link></li>
              <li className="footer-list-item"><Link href="exam/davazdahom/ensani/ghalamchi/first-half" className="footer-link">دوازدهم قلم‌چی انسانی</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">ماز</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="exam/dahom/tajrobi/maz/first-half" className="footer-link">دهم ماز انسانی</Link></li>
              <li className="footer-list-item"><Link href="exam/yazdahom/riyazi/maz/first-half" className="footer-link">یازدهم ماز اانسانی</Link></li>
              <li className="footer-list-item"><Link href="exam/davazdahom/ensani/maz/first-half" className="footer-link">دوازدهم ماز انسانی</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">خیلی سبز</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="exam/dahom/tajrobi/kheili%20sabz/first-half" className="footer-link">دهم خیلی سبز تجربی</Link></li>
              <li className="footer-list-item"><Link href="exam/yazdahom/riyazi/kheili%20sabz/first-half" className="footer-link">یازدهم خیلی سبز تجربی</Link></li>
              <li className="footer-list-item"><Link href="exam/davazdahom/ensani/kheili%20sabz/first-half" className="footer-link">دوازدهم خیلی سبز تجربی</Link></li>
            </ul>
          </div>
        </div>

        {/* ============ ردیف سوم: سنجش و لینک‌های مفید ============ */}
        <div className="footer-row footer-row-exams">
          <div className="footer-col">
            <h4 className="footer-title">سنجش</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="exam/sanjesh/dahom/tajrobi" className="footer-link">دهم سنجش تجربی</Link></li>
              <li className="footer-list-item"><Link href="exam/sanjesh/yazdahom/riyazi" className="footer-link">یازدهم سنجش ریاضی</Link></li>
              <li className="footer-list-item"><Link href="exam/sanjesh/davazdahom/ensani" className="footer-link">دوازدهم سنجش انسانی</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">درباره ما</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="/about" className="footer-link">درباره مرکز مشاوره</Link></li>
              <li className="footer-list-item"><Link href="/contact" className="footer-link">تماس با ما</Link></li>
              <li className="footer-list-item"><Link href="/faq" className="footer-link">سوالات متداول</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">قوانین و مقررات</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="/rules" className="footer-link">قوانین سایت</Link></li>
              <li className="footer-list-item"><Link href="/privacy" className="footer-link">حریم خصوصی</Link></li>
              <li className="footer-list-item"><Link href="/terms" className="footer-link">شرایط استفاده</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">لینک‌های مفید</h4>
            <ul className="footer-list">
              <li className="footer-list-item"><Link href="/answers" className="footer-link">پاسخنامه‌ها</Link></li>
              <li className="footer-list-item"><Link href="/blog" className="footer-link">وبلاگ</Link></li>
              <li className="footer-list-item"><Link href="/sitemap" className="footer-link">نقشه سایت</Link></li>
            </ul>
          </div>
        </div>

        {/* ============ خط جداکننده ============ */}
        <div className="footer-divider"></div>

        {/* ============ بخش پایینی: پشتیبانی + شبکه‌های اجتماعی ============ */}
        <div className="footer-bottom-grid">

          {/* باکس پشتیبانی */}
          <div className="footer-ticket-section">
            <h5 className="footer-ticket-title">پشتیبانی آنلاین</h5>
            <p className="footer-ticket-description">
              در صورت بروز هرگونه مشکل در آزمون‌ها یا دریافت کارنامه، با ما در تماس باشید.
            </p>
            <Link href="/ticket" className="footer-ticket-link">
              <HeadphoneIcon />
              <span>ارسال تیکت</span>
              <span>←</span>
            </Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-title">ارتباط با ما</h4>
            <ul className="footer-list">
              <li className="footer-contact-item">
                <MapPinIcon />
                <span>تهران، خیابان آزادی، پلاک ۱۲۳</span>
              </li>
              <li className="footer-contact-item">
                <PhoneIcon />
                <span>۰۲۱-۱۲۳۴۵۶۷۸</span>
              </li>
              <li className="footer-contact-item">
                <MailIcon />
                <span>info@parto-omid.ir</span>
              </li>
            </ul>
          </div>
          {/* باکس شبکه‌های اجتماعی */}
          <div className="footer-social-section">
            <h5 className="footer-social-title">با ما همراه باشید</h5>
            <div className="footer-social-list">
              <a href="https://instagram.com" target="_blank" rel="nofollow noopener" className="footer-social-link-text instagram">
                <InstagramIcon />
                <span>اینستاگرام</span>
              </a>
              <a href="https://t.me" target="_blank" rel="nofollow noopener" className="footer-social-link-text telegram">
                <TelegramIcon />
                <span>تلگرام</span>
              </a>
              <a href="https://wa.me" target="_blank" rel="nofollow noopener" aria-label="واتساپ" className="footer-social-link-icon whatsapp">
                <WhatsappIcon />
              </a>
              <a href="mailto:info@parto-omid.ir" aria-label="ایمیل" className="footer-social-link-icon email">
                <MailIcon />
              </a>
              <a href="tel:+982112345678" aria-label="تماس" className="footer-social-link-icon phone">
                <PhoneIcon />
              </a>
            </div>
            
          </div>
          
        </div>
        
        {/* ============ کپی‌رایت ============ */}
        <div className="footer-copyright">
          <p>© {currentYear} مرکز مشاوره پرتو امید. تمامی حقوق محفوظ است.</p>
          <p>طراحی و توسعه اختصاصی برای دانش‌آموزان متوسطه</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;