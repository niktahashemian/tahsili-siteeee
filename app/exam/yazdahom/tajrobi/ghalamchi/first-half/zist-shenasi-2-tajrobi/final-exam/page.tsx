"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Zist2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات زیست‌شناسی (۲) - جامع =================
  const questions = [
    // ==================== فصل اول: دستگاه عصبی ====================
    {
      id: 1,
      text: "واحد اصلی سیستم عصبی چیست؟",
      options: ["نورون", "گلیال", "دندریت", "آکسون"],
      correctIndex: 0,
      answer: "نورون واحد اصلی سیستم عصبی است که وظیفه انتقال پیام را بر عهده دارد."
    },
    {
      id: 2,
      text: "کدام بخش نورون پیام را به سلول بعدی منتقل می‌کند؟",
      options: ["آکسون", "دندریت", "سوما", "سیناپس"],
      correctIndex: 0,
      answer: "آکسون پیام را از جسم سلولی به سلول بعدی یا اندام هدف منتقل می‌کند."
    },
    {
      id: 3,
      text: "ناقل‌های عصبی در کدام بخش نورون ذخیره می‌شوند؟",
      options: ["وزیکول‌های سیناپسی", "دندریت", "سوما", "غلاف میلین"],
      correctIndex: 0,
      answer: "ناقل‌های عصبی در وزیکول‌های سیناپسی انتهای آکسون ذخیره می‌شوند."
    },
    {
      id: 4,
      text: "پتانسیل استراحت غشای نورون حدود چند میلی‌ولت است؟",
      options: ["-۷۰ میلی‌ولت", "+۳۰ میلی‌ولت", "۰ میلی‌ولت", "-۹۰ میلی‌ولت"],
      correctIndex: 0,
      answer: "پتانسیل استراحت غشای نورون حدود -۷۰ میلی‌ولت است."
    },
    {
      id: 5,
      text: "کدام یون در ایجاد پتانسیل عمل نقش اصلی دارد؟",
      options: ["سدیم (Na⁺)", "پتاسیم (K⁺)", "کلسیم (Ca²⁺)", "کلر (Cl⁻)"],
      correctIndex: 0,
      answer: "یون سدیم (Na⁺) در ایجاد پتانسیل عمل با ورود به سلول نقش اصلی دارد."
    },
    {
      id: 6,
      text: "غلاف میلین چه نقشی در هدایت عصبی دارد؟",
      options: ["سرعت هدایت را افزایش می‌دهد", "سرعت هدایت را کاهش می‌دهد", "تأثیری ندارد", "پیام را قطع می‌کند"],
      correctIndex: 0,
      answer: "غلاف میلین سرعت هدایت عصبی را افزایش می‌دهد."
    },

    // ==================== فصل دوم: دستگاه ایمنی ====================
    {
      id: 7,
      text: "کدام نوع ایمنی، اختصاصی است و با آنتی‌بادی‌ها انجام می‌شود؟",
      options: ["ایمنی سلولی", "ایمنی هومورال", "ایمنی غیراختصاصی", "ایمنی مادرزادی"],
      correctIndex: 1,
      answer: "ایمنی هومورال با آنتی‌بادی‌ها انجام می‌شود و اختصاصی است."
    },
    {
      id: 8,
      text: "سلول‌های T در کدام اندام بالغ می‌شوند؟",
      options: ["تیموس", "مغز استخوان", "طحال", "گره لنفی"],
      correctIndex: 0,
      answer: "سلول‌های T در تیموس (آویشن‌ک) بالغ می‌شوند."
    },
    {
      id: 9,
      text: "آنتی‌بادی توسط کدام سلول تولید می‌شود؟",
      options: ["سلول B", "سلول T", "ماکروفاژ", "سلول کشنده"],
      correctIndex: 0,
      answer: "آنتی‌بادی توسط سلول‌های B تولید می‌شود."
    },
    {
      id: 10,
      text: "ایمنی غیراختصاصی شامل کدام موارد است؟",
      options: ["پوست", "اسید معده", "آنزیم‌های اشک", "همه موارد"],
      correctIndex: 3,
      answer: "پوست، اسید معده و آنزیم‌های اشک همگی از موانع غیراختصاصی هستند."
    },
    {
      id: 11,
      text: "واکسن بر اساس کدام مکانیسم ایمنی عمل می‌کند؟",
      options: ["ایمنی فعال", "ایمنی غیرفعال", "ایمنی مادرزادی", "ایمنی سلولی"],
      correctIndex: 0,
      answer: "واکسن بر اساس ایمنی فعال عمل می‌کند و سیستم ایمنی را تحریک می‌نماید."
    },
    {
      id: 12,
      text: "سلول‌های کشنده طبیعی (NK) به کدام دسته از ایمنی تعلق دارند؟",
      options: ["ایمنی غیراختصاصی", "ایمنی اختصاصی", "ایمنی هومورال", "ایمنی سلولی"],
      correctIndex: 0,
      answer: "سلول‌های NK به ایمنی غیراختصاصی تعلق دارند و سلول‌های سرطانی را نابود می‌کنند."
    },

    // ==================== فصل سوم: دستگاه تنفس ====================
    {
      id: 13,
      text: "تبادل گازها در کدام بخش ریه انجام می‌شود؟",
      options: ["آلوئول‌ها", "نایژک‌ها", "نای", "حنجره"],
      correctIndex: 0,
      answer: "تبادل گازها در آلوئول‌ها (کیسه‌های هوایی) انجام می‌شود."
    },
    {
      id: 14,
      text: "عضله اصلی تنفس کدام است؟",
      options: ["دیافراگم", "ماهیچه‌های بین‌دنده‌ای", "ماهیچه‌های شکمی", "ماهیچه‌های گردنی"],
      correctIndex: 0,
      answer: "دیافراگم عضله اصلی تنفس است که با انقباض و انبساط خود باعث تنفس می‌شود."
    },
    {
      id: 15,
      text: "هموگلوبین در گلبول‌های قرمز با کدام گاز ترکیب می‌شود؟",
      options: ["اکسیژن", "دی‌اکسید کربن", "نیتروژن", "هیدروژن"],
      correctIndex: 0,
      answer: "هموگلوبین با اکسیژن ترکیب شده و اکسی‌هموگلوبین را تشکیل می‌دهد."
    },
    {
      id: 16,
      text: "بیشتر دی‌اکسید کربن در خون به چه شکلی حمل می‌شود؟",
      options: ["یون بی‌کربنات", "محلول در پلاسما", "ترکیب با هموگلوبین", "به صورت گاز"],
      correctIndex: 0,
      answer: "بیشتر دی‌اکسید کربن (حدود ۷۰٪) به شکل یون بی‌کربنات در خون حمل می‌شود."
    },
    {
      id: 17,
      text: "مرکز تنفس در کدام بخش مغز قرار دارد؟",
      options: ["بصل النخاع", "مخچه", "مخ", "داینسفالون"],
      correctIndex: 0,
      answer: "مرکز تنفس در بصل النخاع (مغز عقبی) قرار دارد."
    },
    {
      id: 18,
      text: "جریان خون در ریه‌ها چگونه است؟",
      options: ["فشار پایین و مقاومت کم", "فشار بالا و مقاومت زیاد", "فشار متوسط", "همانند گردش خون عمومی"],
      correctIndex: 0,
      answer: "جریان خون در ریه‌ها دارای فشار پایین و مقاومت کم است."
    },

    // ==================== فصل چهارم: دستگاه گردش خون ====================
    {
      id: 19,
      text: "قلب انسان از چند حفره تشکیل شده است؟",
      options: ["۴ حفره", "۲ حفره", "۳ حفره", "۵ حفره"],
      correctIndex: 0,
      answer: "قلب انسان از ۴ حفره (۲ دهلیز و ۲ بطن) تشکیل شده است."
    },
    {
      id: 20,
      text: "کدام دریچه بین دهلیز چپ و بطن چپ قرار دارد؟",
      options: ["دریچه میترال", "دریچه سه‌لتی", "دریچه آئورت", "دریچه ریوی"],
      correctIndex: 0,
      answer: "دریچه میترال (دو لتی) بین دهلیز چپ و بطن چپ قرار دارد."
    },
    {
      id: 21,
      text: "خون بدون اکسیژن از کدام قسمت قلب خارج می‌شود؟",
      options: ["بطن راست", "بطن چپ", "دهلیز راست", "دهلیز چپ"],
      correctIndex: 0,
      answer: "خون بدون اکسیژن از بطن راست به سمت ریه‌ها خارج می‌شود."
    },
    {
      id: 22,
      text: "گلبول‌های قرمز در کدام اندام تولید می‌شوند؟",
      options: ["مغز استخوان", "کبد", "طحال", "گره لنفی"],
      correctIndex: 0,
      answer: "گلبول‌های قرمز در مغز استخوان قرمز تولید می‌شوند."
    },
    {
      id: 23,
      text: "کدام نوع رگ خونی دارای دریچه است؟",
      options: ["ورید", "سرخرگ", "مویرگ", "همه موارد"],
      correctIndex: 0,
      answer: "وریدها دارای دریچه هستند تا از بازگشت خون به عقب جلوگیری کنند."
    },
    {
      id: 24,
      text: "فشار خون در کدام نوع رگ بیشتر است؟",
      options: ["سرخرگ", "ورید", "مویرگ", "همه یکسان"],
      correctIndex: 0,
      answer: "فشار خون در سرخرگ‌ها بیشتر است."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "کدام بخش مغز مسئول تعادل و هماهنگی حرکات است؟",
      options: ["مخچه", "مخ", "بصل النخاع", "داینسفالون"],
      correctIndex: 0,
      answer: "مخچه مسئول تعادل و هماهنگی حرکات بدن است."
    },
    {
      id: 26,
      text: "هورمون رشد از کدام غده ترشح می‌شود؟",
      options: ["هیپوفیز", "تیروئید", "آدرنال", "پانکراس"],
      correctIndex: 0,
      answer: "هورمون رشد از غده هیپوفیز (زیرمغزی) ترشح می‌شود."
    },
    {
      id: 27,
      text: "کدام یک از موارد زیر جزء سیستم ایمنی اختصاصی است؟",
      options: ["آنتی‌بادی", "اسید معده", "پوست", "آنزیم‌های اشک"],
      correctIndex: 0,
      answer: "آنتی‌بادی جزء سیستم ایمنی اختصاصی (هومورال) است."
    },
    {
      id: 28,
      text: "در فرایند تنفس سلولی، کدام ماده به عنوان سوخت استفاده می‌شود؟",
      options: ["گلوکز", "اکسیژن", "آب", "دی‌اکسید کربن"],
      correctIndex: 0,
      answer: "در تنفس سلولی، گلوکز به عنوان سوخت اصلی استفاده می‌شود."
    },
    {
      id: 29,
      text: "کدام گاز در تنفس سلولی تولید می‌شود؟",
      options: ["دی‌اکسید کربن", "اکسیژن", "نیتروژن", "هیدروژن"],
      correctIndex: 0,
      answer: "در تنفس سلولی، دی‌اکسید کربن به عنوان محصول جانبی تولید می‌شود."
    },
    {
      id: 30,
      text: "آنزیم‌ها چه نقشی در بدن دارند؟",
      options: ["سرعت واکنش‌ها را افزایش می‌دهند", "ماده مغذی تولید می‌کنند", "هورمون ترشح می‌کنند", "سلول می‌سازند"],
      correctIndex: 0,
      answer: "آنزیم‌ها سرعت واکنش‌های شیمیایی را در بدن افزایش می‌دهند."
    },
    {
      id: 31,
      text: "هورمون انسولین از کجا ترشح می‌شود؟",
      options: ["پانکراس", "کبد", "تیروئید", "آدرنال"],
      correctIndex: 0,
      answer: "انسولین از سلول‌های بتا در جزایر لانگرهانس پانکراس ترشح می‌شود."
    },
    {
      id: 32,
      text: "گلوکاگون چه تأثیری بر قند خون دارد؟",
      options: ["افزایش قند خون", "کاهش قند خون", "بی‌تأثیر است", "تبدیل قند به چربی"],
      correctIndex: 0,
      answer: "گلوکاگون با شکستن گلیکوژن در کبد، قند خون را افزایش می‌دهد."
    },
    {
      id: 33,
      text: "کدام نوع ایمنی به صورت مادرزادی وجود دارد؟",
      options: ["ایمنی غیراختصاصی", "ایمنی اختصاصی", "ایمنی هومورال", "ایمنی سلولی"],
      correctIndex: 0,
      answer: "ایمنی غیراختصاصی به صورت مادرزادی وجود دارد و از بدو تولد فعال است."
    },
    {
      id: 34,
      text: "در فرایند فتوسنتز، کدام ماده جذب و کدام ماده تولید می‌شود؟",
      options: ["CO₂ جذب و O₂ تولید می‌شود", "O₂ جذب و CO₂ تولید می‌شود", "N₂ جذب و O₂ تولید می‌شود", "H₂O جذب و CO₂ تولید می‌شود"],
      correctIndex: 0,
      answer: "در فتوسنتز، CO₂ جذب و O₂ تولید می‌شود."
    },
    {
      id: 35,
      text: "کدام بخش دستگاه عصبی خودمختار مسئول حالت استراحت و هضم است؟",
      options: ["پاراسمپاتیک", "سمپاتیک", "سوماتیک", "مرکزی"],
      correctIndex: 0,
      answer: "سیستم پاراسمپاتیک مسئول حالت استراحت و هضم (تغذیه) است."
    },
    {
      id: 36,
      text: "کدام بخش دستگاه عصبی خودمختار مسئول واکنش جنگ و گریز است؟",
      options: ["سمپاتیک", "پاراسمپاتیک", "سوماتیک", "مرکزی"],
      correctIndex: 0,
      answer: "سیستم سمپاتیک مسئول واکنش جنگ و گریز است."
    },
    {
      id: 37,
      text: "در کلیه، کدام بخش وظیفه تصفیه خون را دارد؟",
      options: ["گلومرول", "لوله پیچیده", "کپسول بومن", "کالیس"],
      correctIndex: 0,
      answer: "گلومرول (شبکه مویرگی) وظیفه تصفیه خون در کلیه را دارد."
    },
    {
      id: 38,
      text: "کدام هورمون باعث بازجذب آب در کلیه می‌شود؟",
      options: ["ADH (هورمون ضدادراری)", "آلدوسترون", "انسولین", "گلوکاگون"],
      correctIndex: 0,
      answer: "هورمون ADH باعث بازجذب آب در لوله‌های کلیوی می‌شود."
    },
    {
      id: 39,
      text: "نورون‌های حسی پیام را به کدام جهت منتقل می‌کنند؟",
      options: ["از گیرنده به مغز", "از مغز به گیرنده", "از مغز به عضله", "بین دو نورون"],
      correctIndex: 0,
      answer: "نورون‌های حسی پیام را از گیرنده‌های حسی به مغز منتقل می‌کنند."
    },
    {
      id: 40,
      text: "نورون‌های حرکتی پیام را به کدام جهت منتقل می‌کنند؟",
      options: ["از مغز به عضله", "از گیرنده به مغز", "بین دو نورون", "از عضله به مغز"],
      correctIndex: 0,
      answer: "نورون‌های حرکتی پیام را از مغز و نخاع به ماهیچه‌ها منتقل می‌کنند."
    },
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
        backgroundColor: '#2E7D32',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/zist-shenasi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧬 آزمون جامع زیست‌شناسی (۲)</h1>
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
              alignItems: 'flex-start'
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#2E7D32',
                color: 'white',
                width: '30px',
                height: '30px',
                textAlign: 'center',
                lineHeight: '30px',
                borderRadius: '50%',
                fontSize: '14px',
                marginLeft: '15px',
                flexShrink: 0
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
                      border: isSelected ? '3px solid #2E7D32' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8f5e9' : '#fff',
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
                      backgroundColor: isSelected ? '#2E7D32' : '#fff',
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
                  backgroundColor: canCalculate ? '#2E7D32' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2E7D32' }}>
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
            borderTop: '4px solid #2E7D32',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #2E7D32', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#2E7D32'
            }}>
              📝 پاسخنامه تشریحی زیست‌شناسی (۲)
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
                      color: '#2E7D32',
                      backgroundColor: '#e8f5e9',
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
                    <span style={{ fontWeight: 'bold', color: '#2E7D32' }}>📖 توضیح:</span> 
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>{q.answer}</span>
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

export default Zist2FinalExam;