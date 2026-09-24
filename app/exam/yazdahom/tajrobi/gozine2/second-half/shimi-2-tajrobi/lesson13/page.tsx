"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson13 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات فصل سوم شیمی یازدهم تجربی (کامل) =================
  const questions = [
    // ==================== سوال ۱ (صفحه ۲) ====================
        {
      id: 21,
      text: "تقریباً چند درصد از جرم مونومرهای سازندۀ پلیمر زیر را، اتم‌های کلر تشکیل داده‌اند؟\n(Cl = ۳۵/۵, C = ۱۲, H = ۱ : g.mol⁻¹)",
      options: ["۶۶/۶", "۸۶/۶", "۸۰/۴", "۷۳/۲"],
      correctIndex: 3,
      answer: "مونومر: Cl-CH=CH-CHCl₂\nجرم مولی = (۳۵/۵×۳) + (۱۲×۳) + (۱×۳) = ۱۴۵/۵\nدرصد جرمی کلر = (۱۰۶/۵ ÷ ۱۴۵/۵) × ۱۰۰ = ۷۳/۲%"
    },
    // ==================== سوال ۲۲ (صفحه ۶) ====================
    {
      id: 22,
      text: "چند مورد از موارد زیر، درست هستند؟\nالف) ظروف یک‌بارمصرف از پلیمری تشکیل می‌شوند که جرم مولی مونومر آن، ۴ برابر جرم مولی ساده‌ترین هیدروکربن آروماتیک است.\nب) نسبت شمار جفت‌الکترون‌های ناپیوندی به پیوندی مونومر تفلون، برابر ۲ است.\nپ) مونومر تفلون در دمای اتاق به حالت مایع است.\nت) پلی‌استیرن همانند پلی‌سیانواتن دارای پیوند چندگانه است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "عبارت‌های درست: الف، ب و ت (۳ مورد)\nعبارت نادرست: پ - تترافلوئورواتن در دمای اتاق گاز است"
    },
    // ==================== سوال ۲۳ (صفحه ۶) ====================
    {
      id: 23,
      text: "جرم مولی مونومر تشکیل‌دهندۀ پلیمر زیر را محاسبه کنید.\n(C = ۱۲, H = ۱ : g.mol⁻¹)",
      options: ["۵۶", "۷۰", "۸۴", "۹۸"],
      correctIndex: 3,
      answer: "مونومر C₇H₁₄ است:\nجرم مولی = ۷×۱۲ + ۱۴×۱ = ۹۸ g/mol"
    },
    // ==================== سوال ۲۴ (صفحه ۶) ====================
    {
      id: 24,
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) پلی‌اتن سبک نقطۀ ذوب کمتری به نسبت پلی‌اتن سنگین دارد.\nب) پلی‌اتن سبک همانند پلی‌اتن سنگین، پلیمری ناقطبی است.\nپ) پلی‌اتن سنگین برخلاف پلی‌اتن سبک پلیمری بدون شاخه است.\nت) پلی‌اتن سبک به نسبت پلی‌اتن سنگین ساختار نامنظم‌تری دارد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "تمامی عبارت‌ها درست هستند"
    },
    // ==================== سوال ۲۵ (صفحه ۷) ====================
    {
      id: 25,
      text: "عبارت مربوط به کدام گزینه درست است؟",
      options: [
        "در مونومرهای مربوط به پلیمرهایی که در ساخت پتو و سرنگ به کار می‌روند، شمار پیوندهای اشتراکی یکسان است",
        "پلی‌اتن سنگین نسبت به پلی‌اتن سبک، چگالی بیشتری داشته و شفاف است",
        "بو و طعم خوش آناناس به دلیل وجود استری با فرمول C₆H₁₂O₂ است",
        "در ویتامین 'ث' بخش ناقطبی بر قطبی غلبه دارد و مصرف بیش‌ازاندازۀ آن برای بدن مشکلی ایجاد نمی‌کند"
      ],
      correctIndex: 2,
      answer: "استر آناناس: اتیل بوتانوات با فرمول C₆H₁₂O₂"
    },
    // ==================== سوال ۲۶ (صفحه ۷) ====================
    {
      id: 26,
      text: "اگر قطعه‌ای از پلی‌اتن بدون شاخه به حجم ۰/۱ cm³ در اختیار داشته باشیم، در کل به‌تقریب چه تعداد واحد تکرارشونده در آن وجود دارد؟\n(چگالی پلی‌اتن سنگین = ۰/۹۸ g/cm³)\n(C = ۱۲, H = ۱ : g.mol⁻¹)",
      options: ["۱/۰۵×۱۰²¹", "۱/۸۹×۱۰²¹", "۲/۱×۱۰²¹", "۲/۲×۱۰²¹"],
      correctIndex: 2,
      answer: "جرم قطعه = ۰/۱ × ۰/۹۸ = ۰/۰۹۸ g\nجرم مولی واحد تکرارشونده (C₂H₄) = ۲۸ g/mol\nتعداد واحدها = (۰/۰۹۸ ÷ ۲۸) × ۶/۰۲×۱۰²³ = ۲/۱×۱۰²¹"
    },
    // ==================== سوال ۲۷ (صفحه ۷) ====================
    {
      id: 27,
      text: "از واکنش ۵ گرم کربوکسیلیک اسید با مقدار کافی متانول مطابق واکنش زیر ۴/۹۳ گرم استر با بازدۀ درصدی ۸۰ تولید می‌شود. فرمول R کدام است؟\nR-COOH + CH₃OH → RCOOCH₃ + H₂O\n(C = ۱۲, H = ۱, O = ۱۶ : g.mol⁻¹)",
      options: ["H", "CH₃", "C₂H₅", "C₃H₇"],
      correctIndex: 2,
      answer: "جرم مولی RCOOH = m\nجرم مولی RCOOCH₃ = m + ۱۴\n(m+۱۴)/m = ۴/۹۳/۵ × ۱۰۰/۸۰\nm = ۶۰\nR = C₂H₅"
    },
    // ==================== سوال ۲۸ (صفحه ۷) ====================
    {
      id: 28,
      text: "تعداد پیوندهای دوگانه در یک مولکول پلی‌استیرن ۹۶۰۰ است. جرم مولی این ترکیب چند گرم بر مول است؟\n(C = ۱۲, H = ۱ : g.mol⁻¹)",
      options: ["۴۹۹۲۰۰", "۳۳۲۸۰۰", "۱۶۶۴۰۰", "۸۳۲۰۰"],
      correctIndex: 1,
      answer: "هر واحد تکرارشونده استیرن: C₈H₈\nجرم مولی استیرن = ۱۰۴ g/mol\nهر واحد ۳ پیوند دوگانه دارد\nتعداد واحدها = ۹۶۰۰ ÷ ۳ = ۳۲۰۰\nجرم مولی = ۳۲۰۰ × ۱۰۴ = ۳۳۲۸۰۰ g/mol"
    },
    // ==================== سوال ۲۹ (صفحه ۷) ====================
    {
      id: 29,
      text: "درصد جرمی کربن در پلی‌استیرن کدام است؟\n(C = ۱۲, H = ۱ : g.mol⁻¹)",
      options: ["۹۰/۱", "۹۲/۳", "۹۳/۴", "۹۶/۲"],
      correctIndex: 1,
      answer: "درصد جرمی کربن = (۸×۱۲) ÷ (۸×۱۲ + ۸×۱) × ۱۰۰ = ۹۶ ÷ ۱۰۴ × ۱۰۰ = ۹۲/۳%"
    },
    // ==================== سوال ۳۰ (صفحه ۷) ====================
    {
      id: 30,
      text: "چند لیتر تترافلئورواتن را در شرایطی که حجم مولی گازها ۲۵ L و بازدۀ واکنش پلیمری شدن ۸۰% است، وارد واکنش کنیم تا ۲۴۰ g تفلون به دست آید؟\n(H = ۱, F = ۱۹, C = ۱۲ : g.mol⁻¹)",
      options: ["۶۰", "۷۵", "۵۰", "۱۰۰"],
      correctIndex: 1,
      answer: "جرم مولی تفلون = ۱۰۰ g/mol\nمول تفلون = ۲۴۰ ÷ ۱۰۰ = ۲/۴ mol\nحجم = ۲/۴ × ۲۵ = ۶۰ L (با بازده ۸۰% = ۷۵ L)"
    },
    // ==================== سوال ۳۱ (صفحه ۷) ====================
    {
      id: 31,
      text: "شمار جفت‌الکترون‌های ناپیوندی موجود در هر مولکول وینیل کلرید چندبرابر شمار جفت‌الکترون‌های ناپیوندی موجود در هر مولکول از مونومرهای سنگین‌تر (تفلون) است؟",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "در وینیل کلرید: ۳ جفت ناپیوندی\nدر تفلون (C₂F₄): ۸ جفت ناپیوندی\n۳ ÷ ۸ = ۳/۸"
    },
    // ==================== سوال ۳۲ (صفحه ۸) ====================
    {
      id: 32,
      text: "کدام گزینه از لحاظ درستی یا نادرستی مشابه عبارت زیر است؟\n'چگالی پلی‌اتن سبک و سنگین تفاوت زیادی با یکدیگر دارند.'",
      options: [
        "پلیمرها ترکیباتی سیرشده هستند",
        "به ازای جرم یکسان از پلی‌اتن سبک و سنگین، حجم پلی‌اتن سبک بیشتر است",
        "هر ترکیب آلی که در ساختار خود پیوند دوگانه کربن-کربن دارد، قابلیت پلیمری شدن دارد",
        "جاذبۀ بین مولکول‌های پلی‌اتن سنگین بیشتر از پلی‌اتن سبک است"
      ],
      correctIndex: 3,
      answer: "عبارت اصلی درست است. گزینه ۴ نیز درست است.\nگزینه ۱: نادرست\nگزینه ۲: درست\nگزینه ۳: درست"
    },
    // ==================== سوال ۳۳ (صفحه ۸) ====================
    {
      id: 33,
      text: "نمونه‌ای از کاتالیزگر واکنش تولید پلی‌اتن دارای ۵۱% Al(C₂H₅)₃ و ۲۸% TiCl₄ است. جرم مولی میانگین پلیمر تولیدشده کدام است؟\n(Al(C₂H₅)₃ = ۱۱۴, TiCl₄ = ۱۹۰ : g.mol⁻¹)",
      options: ["۲۷۰۰۰", "۲۹۲۰۰۰", "۲۸۴۰۰۰", "۲۸۴۰۰۰"],
      correctIndex: 0,
      answer: "با توجه به جدول، در نسبت ۱:۱ جرم مولی میانگین ۲۷۰۰۰ g/mol است."
    },
    // ==================== سوال ۳۴ (صفحه ۸) ====================
    {
      id: 34,
      text: "باتوجه به ساختار واحد تکرارشونده پلیمر نشان داده شده، کدام مطلب درست است؟",
      options: [
        "نام مونومر سازنده آن، ۲-بوتن است",
        "در تهیه تجهیزات پزشکی و سرنگ کاربرد دارد",
        "از سوختن کامل هر مول از این پلیمر، چهار مول گاز کربن دی‌اکسید تولید می‌شود",
        "نسبت شمار پیوندهای اشتراکی به شمار اتم‌ها در مونومر آن برابر با یک است"
      ],
      correctIndex: 3,
      answer: "نسبت شمار پیوندهای اشتراکی به شمار اتم‌ها در مونومر برابر با یک است."
    },
    // ==================== سوال ۳۵ (صفحه ۹) ====================
    {
      id: 35,
      text: "اگر ΔH واکنش پلیمر شدن ۱ مول تترافلوئورواتن برابر با -۷۵۰ کیلوژول باشد، با آزاد شدن چند کیلوژول انرژی در فرآیند پلیمر شدن مواجه خواهیم بود؟",
      options: ["۷۵۰+", "۷۵۰-", "۲۵۰+", "۲۵۰-"],
      correctIndex: 1,
      answer: "واکنش پلیمر شدن گرماده است، بنابراین ΔH = -۷۵۰ kJ/mol"
    },
    // ==================== سوال ۳۶ (صفحه ۱۰) ====================
    {
      id: 36,
      text: "نام دیگر وینیل کلرید ...... است که اگر اتم کلر با گروه ...... جایگزین شود، مونومری به دست می‌آید که واحد سازندۀ پلیمر مورداستفاده در ...... است.",
      options: [
        "کلرواتن، CN، سرنگ",
        "کلرواتن، CH₃، سرنگ",
        "کلرید اتن، CN، پتو",
        "کلرید اتن، CH₃، پتو"
      ],
      correctIndex: 3,
      answer: "نام دیگر وینیل کلرید: کلرید اتن\nبا جایگزینی CN → پلی‌سیانواتن (سرنگ)\nبا جایگزینی CH₃ → پلی‌پروپین (پتو)"
    },
    // ==================== سوال ۳۷ (صفحه ۱۰) ====================
    {
      id: 37,
      text: "کدام گزینه از لحاظ درستی یا نادرستی مشابه عبارت زیر است؟\n'پلی‌سیانواتن: سرنگ - تفلون: نخ دندان - پلی‌استیرن: ظروف یک‌بارمصرف - پلی‌وینیل کلرید: پتو - پلی‌پروپین: کیسه خون'",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "کاربردهای صحیح:\nپلی‌سیانواتن: پتو\nتفلون: نخ دندان\nپلی‌استیرن: ظروف یک‌بارمصرف\nپلی‌وینیل کلرید: کیسه خون\nپلی‌پروپین: سرنگ"
    },
    // ==================== سوال ۳۸ (صفحه ۱۰) ====================
    {
      id: 38,
      text: "اگر تعداد پیوندهای C-F در یک زنجیر از تفلون برابر با ۱۶۰۰ باشد، جرم مولی پلیمر به‌دست‌آمده چند کیلوگرم است؟\n(C = ۱۲, F = ۱۹ : g.mol⁻¹)",
      options: ["۲۵", "۴۰", "۵۰", "۲۰"],
      correctIndex: 1,
      answer: "در هر واحد تفلون: ۴ پیوند C-F\nتعداد واحدها = ۱۶۰۰ ÷ ۴ = ۴۰۰\nجرم مولی = (۲×۱۲ + ۴×۱۹) × ۴۰۰ = ۴۰۰۰۰ g = ۴۰ kg"
    },
    // ==================== سوال ۳۹ (صفحه ۱۰) ====================
    {
      id: 39,
      text: "اگر در فرآیند ساخت پلی‌اتن، ۸۰% فرآورده‌ها پلی‌اتن سنگین و مابقی پلی‌اتن سبک باشند، از واکنش ۴۲ کیلوگرم گاز اتن، چند کیلوگرم پلی‌اتن سبک حاصل خواهد آمد؟",
      options: ["۸/۴", "۴/۲", "۵/۴", "۳۳/۶"],
      correctIndex: 0,
      answer: "۲۰% از ۴۲ kg = ۸/۴ kg پلی‌اتن سبک"
    },
    // ==================== سوال ۴۰ (صفحه ۱۰) ====================
    {
      id: 40,
      text: "کدام ترکیب درست نام‌گذاری نشده است؟",
      options: ["بوتانول-۱", "بوتانول-۲", "۲-متیل پروپانول-۱", "۲-متیل پروپانول-۲"],
      correctIndex: 3,
      answer: "گزینه ۴ نام‌گذاری نادرست دارد."
    },
    // ==================== سوال ۴۱ (صفحه ۱۰) ====================
    
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // ========== تابع محاسبه درصد ==========
  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;

    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setIsScoreCalculated(true);
  }, [selectedAnswers]);

  // ========== تابع انتخاب گزینه ==========
  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;

    setSelectedAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: optionIndex };
      return newAnswers;
    });

    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== تایمر ==========
  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimeUp, isScoreCalculated]);

  // ========== زمان تمام شد ==========
  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => {
        calculateScore();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  // ========== بررسی پاسخ‌دهی ==========
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
      width: '100vw',
      minHeight: '100vh',
      padding: '15px 10px',
      backgroundColor: '#f8f9fa',
      direction: 'rtl',
      textAlign: 'right',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      
      {/* هدر */}
      <div style={{
        backgroundColor: '#E65100',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/gozine2/second-half/shimi-2-tajrobi')}
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← بازگشت
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 فصل سوم شیمی یازدهم تجربی</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px',
            borderRadius: '50px',
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* سوالات */}
      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px',
            backgroundColor: '#ffffff',
            padding: '20px 25px',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{ 
              fontSize: '17px', 
              lineHeight: '1.9', 
              marginBottom: '20px', 
              fontWeight: '500',
              display: 'flex',
              alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#E65100',
                color: 'white',
                width: '30px',
                height: '30px',
                textAlign: 'center',
                lineHeight: '30px',
                borderRadius: '50%',
                fontSize: '14px',
                marginLeft: '15px',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px 30px',
              marginRight: '20px'
            }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                const isDisabled = isTimeUp || isScoreCalculated;
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={isDisabled}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #E65100' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#fff3e0' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                      border: '1px solid #000',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '28px',
                      fontSize: '14px',
                      marginLeft: '15px',
                      backgroundColor: isSelected ? '#E65100' : '#fff',
                      color: isSelected ? '#fff' : '#000'
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* دکمه محاسبه */}
        <div style={{
          marginTop: '30px', 
          marginBottom: '30px', 
          padding: '20px', 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          border: '1px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => {
                  if (canCalculate) {
                    calculateScore();
                  }
                }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: canCalculate ? '#E65100' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6
                }}
              >
                {!isAllAnswered && !isTimeUp ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید` : '📊 محاسبه درصد'}
              </button>
              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                  {questions.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#E65100' }}>
                ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span>
                {isTimeUp && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
              </div>
              
              <div style={{
                width: '80%',
                maxWidth: '400px',
                height: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
                overflow: 'hidden',
                margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`,
                  height: '100%',
                  backgroundColor: getScoreColor(score!),
                  transition: 'width 0.8s ease-in-out'
                }} />
              </div>

              <button
                onClick={() => {
                  setIsScoreCalculated(false);
                  setScore(null);
                  isCalculatedRef.current = false;
                  isTimeUpRef.current = false;
                }}
                style={{
                  padding: '10px 25px',
                  fontSize: '14px',
                  backgroundColor: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '10px'
                }}
              >
                🔄 تغییر پاسخ‌ها
              </button>
            </div>
          )}
        </div>

        {/* دکمه پاسخنامه */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
          >
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {/* پاسخنامه */}
        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px',
            borderTop: '4px solid #E65100',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #E65100', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#E65100'
            }}>
              📝 پاسخنامه تشریحی - فصل سوم شیمی یازدهم تجربی
            </h2>
            
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} style={{
                  marginBottom: '35px',
                  borderBottom: '1px dashed #ced4da',
                  paddingBottom: '25px'
                }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{ 
                      fontWeight: 'bold', 
                      color: '#E65100',
                      backgroundColor: '#fff3e0',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      سوال {index + 1}
                    </span>
                    <br />
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
                    <span style={{ fontWeight: 'bold', color: '#E65100' }}>📖 توضیح:</span> 
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
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#fff3cd',
            borderRadius: '12px',
            border: '1px solid #ffc107'
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

export default Shimi2lesson13;