"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ==================== کامپوننت‌های SVG ====================

const MagnetBrokenSVG = () => (
  <svg viewBox="0 0 520 200" style={{ maxWidth: '100%', height: 'auto' }}>
    <rect x="30" y="20" width="400" height="50" fill="#1565C0" stroke="#000" strokeWidth="1.5" />
    <rect x="260" y="20" width="200" height="50" fill="#DC3545" stroke="#000" strokeWidth="1.5" />
    <text x="120" y="54" fontSize="28" fontWeight="bold" fill="white" textAnchor="middle">S</text>
    <text x="400" y="54" fontSize="28" fontWeight="bold" fill="white" textAnchor="middle">N</text>
    <text x="260" y="100" fontSize="18" fill="#333" textAnchor="middle">⬇ برش ⬇</text>
    <rect x="30" y="120" width="90" height="55" fill="#1565C0" stroke="#000" strokeWidth="1.5" />
    <text x="75" y="154" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">S</text>
    <rect x="120" y="120" width="70" height="55" fill="#DC3545" stroke="#000" strokeWidth="1.5" />
    <text x="155" y="154" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">N</text>
    <rect x="190" y="120" width="70" height="55" fill="#4CAF50" stroke="#000" strokeWidth="1.5" />
    <text x="225" y="154" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">D</text>
    <rect x="260" y="120" width="60" height="55" fill="#9C27B0" stroke="#000" strokeWidth="1.5" />
    <text x="290" y="154" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">C</text>
    <rect x="320" y="120" width="60" height="55" fill="#00BCD4" stroke="#000" strokeWidth="1.5" />
    <text x="350" y="154" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">B</text>
    <rect x="380" y="120" width="60" height="55" fill="#FF9800" stroke="#000" strokeWidth="1.5" />
    <text x="410" y="154" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">A</text>
    <rect x="440" y="120" width="60" height="55" fill="#DC3545" stroke="#000" strokeWidth="1.5" />
    <text x="470" y="154" fontSize="22" fontWeight="bold" fill="white" textAnchor="middle">N</text>
    {[120, 190, 260, 320, 380, 440].map((x, i) => (
      <line key={i} x1={x} y1="115" x2={x} y2="180" stroke="#333" strokeWidth="1.5" strokeDasharray="4,3" />
    ))}
  </svg>
);

const MagnetCutSVG = () => (
  <svg viewBox="0 0 520 280" style={{ maxWidth: '100%', height: 'auto' }}>
    <rect x="60" y="20" width="400" height="60" fill="#1565C0" stroke="#000" strokeWidth="1.5" />
    <rect x="260" y="20" width="200" height="60" fill="#DC3545" stroke="#000" strokeWidth="1.5" />
    <text x="130" y="60" fontSize="30" fontWeight="bold" fill="white" textAnchor="middle">S</text>
    <text x="400" y="60" fontSize="30" fontWeight="bold" fill="white" textAnchor="middle">N</text>
    <line x1="160" y1="15" x2="160" y2="85" stroke="#333" strokeWidth="2.5" strokeDasharray="6,4" />
    <line x1="360" y1="15" x2="360" y2="85" stroke="#333" strokeWidth="2.5" strokeDasharray="6,4" />
    <text x="260" y="110" fontSize="16" fill="#333" textAnchor="middle">⬇ برش ⬇</text>
    <rect x="60" y="130" width="200" height="70" fill="#E8A87C" stroke="#000" strokeWidth="1.5" />
    <line x1="160" y1="130" x2="160" y2="200" stroke="#999" strokeWidth="1" strokeDasharray="3,3" />
    <path d="M 260 130 L 264 137 L 256 144 L 264 151 L 256 158 L 264 165 L 256 172 L 264 179 L 256 186 L 264 193 L 260 200"
      fill="none" stroke="#333" strokeWidth="1.5" />
    <rect x="310" y="130" width="150" height="70" fill="#E8A87C" stroke="#000" strokeWidth="1.5" />
    <path d="M 310 130 L 306 137 L 314 144 L 306 151 L 314 158 L 306 165 L 314 172 L 306 179 L 314 186 L 306 193 L 310 200"
      fill="none" stroke="#333" strokeWidth="1.5" />
    <line x1="410" y1="130" x2="410" y2="200" stroke="#999" strokeWidth="1" strokeDasharray="3,3" />
    <g transform="translate(260, 230)">
      <line x1="0" y1="0" x2="0" y2="30" stroke="#666" strokeWidth="4" />
      <circle cx="0" cy="0" r="5" fill="#999" />
      <text x="0" y="50" fontSize="16" fontWeight="bold" fill="#333" textAnchor="middle">a</text>
    </g>
  </svg>
);

const Physics2ElectricCharge = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    // ========== بخش اول: مفاهیم پایه بار الکتریکی ==========
    {
      id: 101,
      section: "بخش اول: مفاهیم پایه بار الکتریکی",
      text: "بار الکتریکی اتم اکسیژن دو بار یونیده (O²⁺) چند برابر بار الکتریکی هسته اتم اکسیژن (₈O) است؟",
      ImageComponent: null,
      options: ["۴", "۲", "۱/۲", "۱/۴"],
      correctIndex: 2,
      answer: "عدد اتمی اکسیژن ۸ است که بیانگر تعداد پروتون‌های اتم خنثی است، بنابراین بار هستهٔ اتم اکسیژن q = +۸e می‌باشد. همچنین اتم اکسیژن ۲ بار یونیده ۲ الکترون از دست داده است و به یون تبدیل شده است، بنابراین بار آن q' = +۲e می‌باشد.\nنسبت: q'/q = +۲e/+۸e = ۱/۴\nگزینه 3 صحیح است."
    },
    {
      id: 102,
      section: "بخش اول: مفاهیم پایه بار الکتریکی",
      text: "از الکتروسکوپ در تشخیص کدام مورد نمی‌توان استفاده کرد؟",
      ImageComponent: null,
      options: ["اندازه بار الکتریکی", "رسانایی اجسام", "نوع بار اجسام", "مقایسه اندازه بار اجسام"],
      correctIndex: 2,
      answer: "الکتروسکوپ وسیله‌ای برای تشخیص وجود بار، نوع بار (مثبت یا منفی) و مقایسه تقریبی اندازه بار اجسام است. اما نمی‌توان از آن برای اندازه‌گیری دقیق (کمّی) بار الکتریکی استفاده کرد. بنابراین گزینه 3 صحیح است."
    },
    {
      id: 103,
      section: "بخش اول: مفاهیم پایه بار الکتریکی",
      text: "دو کرهٔ رسانا به شعاع‌های ۱۰ cm و ۶ cm به ترتیب دارای بار ۸۰ µC و ۱۶ µC هستند. این دو کره را به هم متصل کرده و از هم جدا می‌کنیم. بعد از اتصال بار هر کره چقدر است؟",
      ImageComponent: null,
      options: ["۴۰ µC، ۲۴ µC", "۲۴ µC، ۴۰ µC", "۴۰ µC، ۴۰ µC", "۲۴ µC، ۲۴ µC"],
      correctIndex: 1,
      answer: "بار کره‌ها بعد از تماس به نسبت شعاع بین آن‌ها توزیع می‌شود:\nq'₁ = (q₁+q₂)/(r₁+r₂) × r₁ = ۹۶/۱۶ × ۶ = ۲۴ µC\nq'₂ = ۹۶/۱۶ × ۱۰ = ۴۰ µC\nگزینه 2 صحیح است."
    },

    // ========== بخش دوم: جریان الکتریکی ==========
    {
      id: 104,
      section: "بخش دوم: جریان الکتریکی",
      text: "در یک آذرخش 10⁹ J انرژی تحت اختلاف پتانسیل 5 × 10⁷ V در بازۀ زمانی 0/2 s آزاد می‌شود. جریان متوسط در یک یورش آذرخش چند آمپر است؟",
      ImageComponent: null,
      options: ["50", "100", "200", "400"],
      correctIndex: 1,
      answer: "انرژی آزادشده در آذرخش از رابطه W = qV به دست می‌آید. با جایگذاری مقادیر: 10⁹ = q × 5×10⁷ ⇒ q = 20 C. جریان متوسط: I = q/t = 20/0.2 = 100 A. گزینه ۲ صحیح است."
    },
    {
      id: 106,
      section: "بخش دوم: جریان الکتریکی",
      text: "از سیمی به سطح مقطع 0/5 cm² جریانی به شدت 6 A می‌گذرد. اگر در هر سانتی‌متر مکعب سیم، 3/75 × 10²² الکترون آزاد وجود داشته باشد، سرعت سوق الکترون‌ها چند متر بر ثانیه است؟ (e = 1/6 × 10⁻¹⁹ C)",
      ImageComponent: null,
      options: ["2 × 10⁻⁵", "4 × 10⁻⁵", "2 × 10⁻³", "4 × 10⁻³"],
      correctIndex: 3,
      answer: "چگالی الکترون‌های آزاد: n = 3/75 × 10²² /cm³ = 3/75 × 10²⁸ /m³. سطح مقطع: A = 0/5 cm² = 5 × 10⁻⁵ m². از رابطه I = neAv_d: v_d = I/(neA) = 6 / (3/75×10²⁸ × 1/6×10⁻¹⁹ × 5×10⁻⁵) = 6/(3×10⁵) = 2×10⁻⁵ m/s. گزینه 4 صحیح است."
    },
    {
      id: 303,
      section: "بخش سوم: مغناطیس و قطب‌های مغناطیسی",
      text: "کدام یک از گزینه‌های زیر نادرست است؟",
      ImageComponent: null,
      options: [
        "در آهنربا دو ناحیه وجود دارد که خاصیت مغناطیسی در آن‌ها بیشتر از قسمت‌های دیگر است.",
        "مادۀ کانی مگنتیت Fe₂O₃ است که ویژگی آهنربایی دارد.",
        "در طبیعت تک-قطبی مغناطیسی وجود ندارد.",
        "اگر یک آهنربا را توسط نخی آویزان کنیم، همیشه در راستای تقریبی شمال - جنوب جغرافیایی قرار می‌گیرد."
      ],
      correctIndex: 1,
      answer: "مادۀ کانی مگنتیت Fe₃O₄ است که ویژگی آهنربایی دارد (نه Fe₂O₃). بنابراین گزینه ۲ نادرست است. گزینه‌های ۱، ۳ و ۴ همگی درست هستند."
    },
    {
      id: 1,
      section: "بخش دوم: جریان الکتریکی",
      text: "یکای باتری الکتریکی را «آمپرساعت» تعریف می‌کنیم. اگر باتری یک خودرو ۴/۲ Ah باشد و این باتری به‌طور متوسط جریان ۷۰۰ mA را فراهم سازد، چند دقیقه طول می‌کشد تا این باتری خالی شود؟",
      ImageComponent: null,
      options: ["۳/۶", "۱۰", "۰/۱", "۳۶۰"],
      correctIndex: 1,
      answer: "q = It ⇒ ۴/۲ Ah = (۷۰۰ × ۱۰⁻³ A) × h ⇒ h = ۴/۲ / ۰/۷ = ۶ ساعت\nتبدیل به دقیقه: ۶ × ۶۰ = ۳۶۰ دقیقه\nگزینه 2 صحیح است."
    },
    {
      id: 10,
      section: "بخش دوم: جریان الکتریکی",
      text: "معادله بار گذرنده برحسب زمان در SI به صورت q = t² - ۴t + ۳ است. جریان متوسط در کدام بازۀ زمانی صفر است؟",
      ImageComponent: null,
      options: ["۱/۵ تا ۲/۵ s", "۱/۵ تا ۲ s", "۱/۷۵ تا ۴/۷۵ s", "۱/۲۵ تا ۳ s"],
      correctIndex: 3,
      answer: "جریان متوسط صفر ⇒ Δq = ۰ ⇒ q(t₁) = q(t₂)\nq(t) = t² - ۴t + ۳\nq(t₁) = q(t₂) ⇒ t₁² - ۴t₁ + ۳ = t₂² - ۴t₂ + ۳\n⇒ (t₁ - t₂)(t₁ + t₂ - ۴) = ۰\nچون t₁ ≠ t₂ ⇒ t₁ + t₂ = ۴\nبررسی گزینه‌ها:\n• ۱/۵ + ۲/۵ = ۴ ✓\n• ۱/۵ + ۲ = ۳/۵ ✗\n• ۱/۷۵ + ۴/۷۵ = ۶/۵ ✗\n• ۱/۲۵ + ۳ = ۴/۲۵ ✗\nگزینه 4 صحیح است."
    },
    {
      id: 21,
      section: "بخش دوم: جریان الکتریکی",
      text: "اگر بار هر الکترون ۱/۶ × ۱۰⁻¹⁹ کولن باشد، از سیمی که جریان آن ۲ آمپر است در هر ثانیه چند الکترون عبور می‌کند؟",
      ImageComponent: null,
      options: ["۱/۹۴ × ۱۰⁵", "۱/۹۳ × ۱۰²⁰", "۳/۲ × ۱۰¹⁹", "۱/۲۵ × ۱۰¹⁹"],
      correctIndex: 1,
      answer: "q = It = ۲ × ۱ = ۲ C\nq = ne ⇒ n = q/e = ۲ / (۱/۶ × ۱۰⁻¹⁹)\n⇒ n = ۱/۲۵ × ۱۰¹⁹ الکترون\nگزینه 2 صحیح است."
    },
    {
      id: 108,
      section: "بخش دوم: جریان الکتریکی",
      text: "در شکل زیر، با بستن کلید، در مدت 3 ms بار کره‌ها به تعادل می‌رسد. کره‌ها مشابه، رسانا و روی پایه‌های عایق هستند. با توجه به بارهای اولیه q_A = -15 µC و q_B = +3 µC، شدت جریان متوسط و جهت جریان کدام است؟",
      Image: "/img/q_108_f1t.png",
      ImageComponent: null,
      options: ["3 mA، از A به B", "3 mA، از B به A", "6 mA، از A به B", "6 mA، از B به A"],
      correctIndex: 0,
      answer: "بار کل: q_total = q_A + q_B = -15 + 3 = -12 µC. بعد از تعادل، هر کره بار q' = -12/2 = -6 µC می‌گیرد. کره A از -15 به -6 می‌رسد، یعنی ۹ µC بار مثبت دریافت می‌کند (یا ۹ µC بار منفی از دست می‌دهد). الکترون‌ها از A (بار منفی‌تر) به B حرکت می‌کنند، پس جهت جریان قراردادی از B به A است. بار منتقل شده: Δq = 9 µC. جریان: I = Δq/Δt = 9×10⁻⁶ / (3×10⁻³) = 3×10⁻³ A = 3 mA. گزینه ۱ صحیح است."
    },
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setIsScoreCalculated(true);
  }, [selectedAnswers, questions]);

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  const handleImageError = (qId: number) => {
    setImageErrors(prev => ({ ...prev, [qId]: true }));
  };

  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [isTimeUp, isScoreCalculated]);

  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => calculateScore(), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !isScoreCalculated && !isTimeUp;
  const answeredCount = Object.keys(selectedAnswers).length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#28a745';
    if (score >= 50) return '#ffc107';
    return '#dc3545';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{
      fontFamily: 'Tahoma, Arial, sans-serif',
      width: '100vw', minHeight: '100vh', padding: '15px 10px',
      backgroundColor: '#f8f9fa', direction: 'rtl', textAlign: 'right',
      boxSizing: 'border-box', overflowX: 'hidden'
    }}>
      <div style={{
        backgroundColor: '#1565C0', color: 'white', padding: '20px',
        borderRadius: '8px', marginBottom: '30px', textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون فیزیک (۲)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              بار الکتریکی و مغناطیس - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px', borderRadius: '50px', fontSize: '24px',
            fontWeight: 'bold', fontFamily: 'monospace',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => {
          const ImgComp = q.ImageComponent;
          return (
            <div key={q.id} style={{
              marginBottom: '25px', backgroundColor: '#ffffff',
              padding: '20px 25px', borderRadius: '8px',
              border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                display: 'inline-block', backgroundColor: '#e3f2fd',
                color: '#1565C0', padding: '4px 14px', borderRadius: '20px',
                fontSize: '12px', fontWeight: 'bold', marginBottom: '12px'
              }}>{q.section}</div>
              <div style={{
                fontSize: '17px', lineHeight: '1.9', marginBottom: '20px',
                fontWeight: '500', display: 'flex', alignItems: 'flex-start',
                whiteSpace: 'pre-wrap'
              }}>
                <span style={{
                  display: 'inline-block', backgroundColor: '#1565C0',
                  color: 'white', width: '30px', height: '30px',
                  textAlign: 'center', lineHeight: '30px', borderRadius: '50%',
                  fontSize: '14px', marginLeft: '15px', flexShrink: 0, marginTop: '2px'
                }}>{index + 1}</span>
                <span>{q.text}</span>
              </div>

              {/* SVG کامپوننت */}
              {ImgComp && (
                <div style={{
                  marginBottom: '20px', display: 'flex',
                  justifyContent: 'center', backgroundColor: '#f8f9fa',
                  padding: '15px', borderRadius: '10px',
                  border: '1px solid #e9ecef', overflowX: 'auto'
                }}>
                  <ImgComp />
                </div>
              )}

              {/* تصویر با مسیر فایل (فیلد Image) */}
              {q.Image && !ImgComp && (
                <div style={{
                  marginBottom: '20px', display: 'flex',
                  justifyContent: 'center', backgroundColor: '#f8f9fa',
                  padding: '15px', borderRadius: '10px',
                  border: '1px solid #e9ecef', minHeight: '180px',
                  alignItems: 'center'
                }}>
                  {imageErrors[q.id] ? (
                    <div style={{ textAlign: 'center', color: '#6c757d', fontSize: '14px', padding: '30px' }}>
                      <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                      <p style={{ margin: '5px 0 0 0', direction: 'ltr', fontFamily: 'monospace', fontSize: '12px', color: '#adb5bd' }}>
                        {q.Image}
                      </p>
                    </div>
                  ) : (
                    <img
                      src={q.Image}
                      alt={`شکل سوال ${index + 1}`}
                      onError={() => handleImageError(q.id)}
                      style={{
                        maxWidth: '100%', maxHeight: '350px',
                        height: 'auto', objectFit: 'contain',
                        borderRadius: '6px'
                      }}
                    />
                  )}
                </div>
              )}

              <div style={{
                display: 'grid', gridTemplateColumns: '1fr 1fr',
                gap: '12px 30px', marginRight: '20px'
              }}>
                {q.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[q.id] === idx;
                  const isDisabled = isTimeUp || isScoreCalculated;
                  return (
                    <button key={idx} onClick={() => handleOptionClick(q.id, idx)} disabled={isDisabled}
                      style={{
                        display: 'flex', alignItems: 'center', padding: '12px 18px',
                        border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
                        borderRadius: '10px', backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                        cursor: isDisabled ? 'not-allowed' : 'pointer', fontSize: '15px',
                        textAlign: 'right', transition: 'all 0.2s', width: '100%',
                        opacity: isDisabled && !isSelected ? 0.6 : 1
                      }}>
                      <span style={{
                        display: 'inline-block', width: '28px', height: '28px',
                        border: '1px solid #000', borderRadius: '50%',
                        textAlign: 'center', lineHeight: '28px', fontSize: '14px',
                        marginLeft: '15px', backgroundColor: isSelected ? '#1565C0' : '#fff',
                        color: isSelected ? '#fff' : '#000'
                      }}>{String.fromCharCode(65 + idx)}</span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{
          marginTop: '30px', marginBottom: '30px', padding: '20px',
          backgroundColor: '#ffffff', borderRadius: '12px',
          border: '1px solid #dee2e6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button onClick={() => { if (canCalculate) calculateScore(); }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px', fontSize: '18px',
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
                  color: '#fff', border: 'none', borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6
                }}>
                {!isAllAnswered && !isTimeUp
                  ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید`
                  : '📊 محاسبه درصد'}
              </button>
              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                  {questions.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>
                ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span>
                {isTimeUp && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
              </div>
              <div style={{
                width: '80%', maxWidth: '400px', height: '20px',
                backgroundColor: '#e9ecef', borderRadius: '10px',
                overflow: 'hidden', margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`, height: '100%',
                  backgroundColor: getScoreColor(score!),
                  transition: 'width 0.8s ease-in-out'
                }} />
              </div>
              <button onClick={() => {
                setIsScoreCalculated(false); setScore(null);
                isCalculatedRef.current = false; isTimeUpRef.current = false;
              }} style={{
                padding: '10px 25px', fontSize: '14px',
                backgroundColor: '#ff9800', color: '#fff',
                border: 'none', borderRadius: '50px', cursor: 'pointer',
                fontWeight: 'bold', marginTop: '10px'
              }}>🔄 تغییر پاسخ‌ها</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px', fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff', border: 'none', borderRadius: '50px',
              cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)', transition: 'all 0.2s'
            }}>
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px', borderTop: '4px solid #1565C0',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #1565C0',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#1565C0'
            }}>📝 پاسخنامه تشریحی</h2>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              const ImgComp = q.ImageComponent;
              return (
                <div key={q.id} style={{
                  marginBottom: '35px', borderBottom: '1px dashed #ced4da',
                  paddingBottom: '25px'
                }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{
                      fontWeight: 'bold', color: '#1565C0',
                      backgroundColor: '#e3f2fd', padding: '5px 15px',
                      borderRadius: '20px', display: 'inline-block', marginBottom: '10px'
                    }}>سوال {index + 1} - {q.section}</span>
                    <br />
                    {ImgComp && (
                      <div style={{
                        marginBottom: '15px', display: 'flex',
                        justifyContent: 'center', backgroundColor: '#f8f9fa',
                        padding: '10px', borderRadius: '8px', overflowX: 'auto'
                      }}>
                        <ImgComp />
                      </div>
                    )}
                    {q.Image && !ImgComp && !imageErrors[q.id] && (
                      <div style={{
                        marginBottom: '15px', display: 'flex',
                        justifyContent: 'center', backgroundColor: '#f8f9fa',
                        padding: '10px', borderRadius: '8px'
                      }}>
                        <img src={q.Image} alt={`سوال ${q.id}`}
                          style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '6px' }} />
                      </div>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span>
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                          {isCorrect ? '✔️ صحیح' : '❌ نادرست'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح:</span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333', whiteSpace: 'pre-wrap' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div style={{
            textAlign: 'center', padding: '30px', backgroundColor: '#fff3cd',
            borderRadius: '12px', border: '1px solid #ffc107'
          }}>
            <p style={{ fontSize: '18px', color: '#856404' }}>
              ⚠️ لطفاً ابتدا روی دکمه <strong>&quot;محاسبه درصد&quot;</strong> کلیک کنید تا پاسخنامه نمایش داده شود.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Physics2ElectricCharge;