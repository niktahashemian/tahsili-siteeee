"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Farsi2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات فارسی (۲) - جامع =================
  const questions = [
    // ==================== فصل اول: ادبیات تعلیمی ====================
    {
      id: 1,
      text: "کتاب گلستان سعدی در چه قرنی نوشته شده است؟",
      options: ["قرن ششم", "قرن هفتم", "قرن هشتم", "قرن نهم"],
      correctIndex: 1,
      answer: "گزینه ۲: گلستان سعدی در قرن هفتم هجری (سال ۶۵۶ هجری) نوشته شده است."
    },
    {
      id: 2,
      text: "کلیله و دمنه به چه زبانی نوشته شده است؟",
      options: ["فارسی", "عربی", "پهلوی", "سنسکریت"],
      correctIndex: 3,
      answer: "گزینه ۴: کلیله و دمنه در اصل به زبان سنسکریت (هندی) نوشته شده و بعد به فارسی و عربی ترجمه شده است."
    },
    {
      id: 3,
      text: "مهم‌ترین ویژگی بوستان سعدی چیست؟",
      options: ["نثر فنی", "نظم تعلیمی", "داستان‌های عاشقانه", "حماسه سرایی"],
      correctIndex: 1,
      answer: "گزینه ۲: بوستان سعدی یک منظومه تعلیمی است و شامل پندهای اخلاقی و اجتماعی می‌باشد."
    },
    {
      id: 4,
      text: "در گلستان سعدی، راوی چه جایگاهی دارد؟",
      options: ["راوی اول شخص", "راوی سوم شخص", "راوی دانای کل", "راوی عینی"],
      correctIndex: 0,
      answer: "گزینه ۱: در گلستان، سعدی به عنوان راوی اول شخص و نویسنده مستقیم حکایت‌ها حضور دارد."
    },
    {
      id: 5,
      text: "کلیله و دمنه شامل چه نوع داستان‌هایی است؟",
      options: ["تمثیلی و حیوانات", "تاریخی", "عاشقانه", "حماسی"],
      correctIndex: 0,
      answer: "گزینه ۱: کلیله و دمنه شامل داستان‌های تمثیلی با شخصیت‌های حیوانی است که نتیجه‌گیری اخلاقی دارند."
    },
    {
      id: 6,
      text: "سعدی در گلستان از چه نوع نثری استفاده کرده است؟",
      options: ["نثر ساده", "نثر فنی", "نثر مسجع", "نثر علمی"],
      correctIndex: 2,
      answer: "گزینه ۳: سعدی در گلستان از نثر مسجع استفاده کرده است که با نظم و موسیقی همراه است."
    },

    // ==================== فصل دوم: ادبیات غنایی ====================
    {
      id: 7,
      text: "غزلیات حافظ در چه قرنی سروده شده است؟",
      options: ["قرن هفتم", "قرن هشتم", "قرن نهم", "قرن دهم"],
      correctIndex: 1,
      answer: "گزینه ۲: حافظ در قرن هشتم هجری می‌زیسته و غزلیات خود را در این قرن سروده است."
    },
    {
      id: 8,
      text: "مثنوی معنوی مولوی شامل چند دفتر است؟",
      options: ["۳ دفتر", "۴ دفتر", "۵ دفتر", "۶ دفتر"],
      correctIndex: 3,
      answer: "گزینه ۴: مثنوی معنوی شامل ۶ دفتر است که بیش از ۲۵ هزار بیت دارد."
    },
    {
      id: 9,
      text: "شعر غنایی به چه نوع شعری گفته می‌شود؟",
      options: ["شعر حماسی", "شعر عاشقانه", "شعر تعلیمی", "شعر فلسفی"],
      correctIndex: 1,
      answer: "گزینه ۲: شعر غنایی به شعر عاشقانه و احساسی گفته می‌شود که عواطف شاعر را بیان می‌کند."
    },
    {
      id: 10,
      text: "حافظ در اشعار خود از چه نوع عشقی سخن می‌گوید؟",
      options: ["عشق زمینی", "عشق عارفانه", "عشق وطنی", "گزینه ۱ و ۲"],
      correctIndex: 3,
      answer: "گزینه ۴: حافظ هم از عشق زمینی و هم از عشق عارفانه سخن گفته و میان این دو پیوند برقرار کرده است."
    },
    {
      id: 11,
      text: "مولوی در مثنوی از چه زبانی استفاده کرده است؟",
      options: ["زبان عربی", "زبان ترکی", "زبان فارسی ساده", "زبان فارسی با آرایه‌های ادبی"],
      correctIndex: 3,
      answer: "گزینه ۴: مولوی در مثنوی از زبان فارسی با آرایه‌های ادبی فراوان استفاده کرده است."
    },
    {
      id: 12,
      text: "شمس تبریزی چه نقشی در زندگی مولوی داشت؟",
      options: ["معلم", "مرشد", "پیر و مراد", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: شمس تبریزی معلم، مرشد و پیر مولوی بود و تأثیر عمیقی بر او گذاشت."
    },

    // ==================== فصل سوم: ادبیات حماسی ====================
    {
      id: 13,
      text: "شاهنامه فردوسی شامل چند بخش است؟",
      options: ["۲ بخش", "۳ بخش", "۴ بخش", "۵ بخش"],
      correctIndex: 1,
      answer: "گزینه ۲: شاهنامه شامل سه بخش اساطیری، پهلوانی و تاریخی است."
    },
    {
      id: 14,
      text: "داستان رستم و سهراب در کدام بخش شاهنامه قرار دارد؟",
      options: ["بخش اساطیری", "بخش پهلوانی", "بخش تاریخی", "همه موارد"],
      correctIndex: 1,
      answer: "گزینه ۲: داستان رستم و سهراب در بخش پهلوانی شاهنامه قرار دارد."
    },
    {
      id: 15,
      text: "پیام اصلی داستان رستم و سهراب چیست؟",
      options: ["عشق و دوستی", "تراژدی و غرور انسانی", "جنگ و حماسه", "آموزش اخلاق"],
      correctIndex: 1,
      answer: "گزینه ۲: پیام اصلی داستان رستم و سهراب، تراژدی و غرور انسانی است که به فاجعه منجر می‌شود."
    },
    {
      id: 16,
      text: "فردوسی شاهنامه را به چه کسی تقدیم کرده است؟",
      options: ["سلطان محمود غزنوی", "پادشاهان سامانی", "امیران آل بویه", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: فردوسی شاهنامه را به سلطان محمود غزنوی تقدیم کرده است."
    },
    {
      id: 17,
      text: "سبک شاهنامه فردوسی چیست؟",
      options: ["سبک خراسانی", "سبک عراقی", "سبک هندی", "سبک بازگشت"],
      correctIndex: 0,
      answer: "گزینه ۱: شاهنامه به سبک خراسانی (سبک قدیم فارسی) سروده شده است."
    },
    {
      id: 18,
      text: "داستان سیاوش در شاهنامه چه ویژگی‌هایی دارد؟",
      options: ["بی‌گناهی و تراژدی", "قدرت و سلطه", "عشق و عرفان", "طنز"],
      correctIndex: 0,
      answer: "گزینه ۱: داستان سیاوش، داستان بی‌گناهی و تراژدی است که سیاوش به ناحق کشته می‌شود."
    },

    // ==================== فصل چهارم: ادبیات داستانی ====================
    {
      id: 19,
      text: "عناصر اصلی داستان کدامند؟",
      options: ["شخصیت", "طرح", "درون‌مایه", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: شخصیت، طرح و درون‌مایه از عناصر اصلی داستان هستند."
    },
    {
      id: 20,
      text: "جلال آل‌احمد بیشتر به کدام سبک نوشته است؟",
      options: ["داستان تاریخی", "داستان اجتماعی", "داستان عاشقانه", "داستان علمی"],
      correctIndex: 1,
      answer: "گزینه ۲: جلال آل‌احمد بیشتر به داستان‌های اجتماعی با رویکرد انتقادی پرداخته است."
    },
    {
      id: 21,
      text: "معروف‌ترین اثر صادق هدایت کدام است؟",
      options: ["بوف کور", "سگ ولگرد", "زنده به گور", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: بوف کور معروف‌ترین و مهم‌ترین اثر صادق هدایت است."
    },
    {
      id: 22,
      text: "ادبیات داستانی معاصر ایران چه ویژگی‌هایی دارد؟",
      options: ["واقع‌گرایی", "نقد اجتماعی", "توجه به روانشناسی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: ادبیات داستانی معاصر ایران با واقع‌گرایی، نقد اجتماعی و توجه به روانشناسی مشخص می‌شود."
    },
    {
      id: 23,
      text: "داستان کوتاه چه ویژگی‌هایی دارد؟",
      options: ["مختصر است", "یک یا چند شخصیت دارد", "طرح ساده دارد", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: داستان کوتاه مختصر، با چند شخصیت و طرح ساده است."
    },
    {
      id: 24,
      text: "جلال آل‌احمد در چه سالی درگذشت؟",
      options: ["۱۳۴۸", "۱۳۵۰", "۱۳۴۵", "۱۳۵۵"],
      correctIndex: 0,
      answer: "گزینه ۱: جلال آل‌احمد در سال ۱۳۴۸ شمسی درگذشت."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "هدف اصلی ادبیات تعلیمی چیست؟",
      options: ["سرگرمی", "آموزش اخلاق", "ثبت تاریخ", "عشق‌ورزی"],
      correctIndex: 1,
      answer: "گزینه ۲: هدف اصلی ادبیات تعلیمی آموزش مفاهیم اخلاقی و تربیتی به مخاطب است."
    },
    {
      id: 26,
      text: "کدام یک از آثار زیر از سعدی نیست؟",
      options: ["گلستان", "بوستان", "کلیات سعدی", "شاهنامه"],
      correctIndex: 3,
      answer: "گزینه ۴: شاهنامه اثر فردوسی است و به سعدی تعلق ندارد."
    },
    {
      id: 27,
      text: "مضمون اصلی بوستان سعدی چیست؟",
      options: ["عشق عارفانه", "پند و اندرز", "جنگ و حماسه", "طبیعت‌گرایی"],
      correctIndex: 1,
      answer: "گزینه ۲: مضمون اصلی بوستان سعدی پند و اندرز و آموزش اخلاقیات است."
    },
    {
      id: 28,
      text: "رباعیات خیام شامل چه تعداد رباعی است؟",
      options: ["۱۰۰ رباعی", "۲۰۰ رباعی", "۴۰۰ رباعی", "حدود ۵۰۰ رباعی"],
      correctIndex: 3,
      answer: "گزینه ۴: رباعیات خیام شامل حدود ۵۰۰ رباعی (در برخی نسخ ۴۰۰ تا ۵۰۰) می‌باشد."
    },
    {
      id: 29,
      text: "مضمون اصلی اشعار خیام چیست؟",
      options: ["عشق", "جنگ", "فلسفه و نگرش به زندگی", "مذهب"],
      correctIndex: 2,
      answer: "گزینه ۳: اشعار خیام عمدتاً درباره فلسفه، شکوه از دنیا و نگرش او به زندگی است."
    },
    {
      id: 30,
      text: "یکی از شخصیت‌های اصلی شاهنامه در بخش پهلوانی چه کسی است؟",
      options: ["رستم", "کیومرث", "جمشید", "فریدون"],
      correctIndex: 0,
      answer: "گزینه ۱: رستم اصلی‌ترین شخصیت بخش پهلوانی شاهنامه است."
    },
    {
      id: 31,
      text: "ادبیات حماسی چه ویژگی‌هایی دارد؟",
      options: ["قهرمان‌محوری", "جنگ‌های بزرگ", "میهن‌پرستی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: ادبیات حماسی با قهرمان‌محوری، جنگ‌های بزرگ و میهن‌پرستی مشخص می‌شود."
    },
    {
      id: 32,
      text: "زبان شاهنامه چگونه است؟",
      options: ["زبان ساده", "زبان فاخر", "زبان عامیانه", "زبان علمی"],
      correctIndex: 1,
      answer: "گزینه ۲: زبان شاهنامه، زبان فاخر و حماسی است که با واژگان کهن فارسی آمیخته شده است."
    },
    {
      id: 33,
      text: "صادق هدایت چگونه نویسنده‌ای بود؟",
      options: ["واقع‌گرا", "روان‌شناختی", "طبیعت‌گرا", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: صادق هدایت نویسنده‌ای واقع‌گرا، روان‌شناختی و طبیعت‌گرا بود."
    },
    {
      id: 34,
      text: "درون‌مایه (تم) داستان چیست؟",
      options: ["پیام اصلی داستان", "مکان داستان", "زمان داستان", "روایت داستان"],
      correctIndex: 0,
      answer: "گزینه ۱: درون‌مایه یا تم، پیام اصلی و مفهوم کلی داستان است."
    },
    {
      id: 35,
      text: "حماسه در ادبیات به چه معناست؟",
      options: ["داستان عاشقانه", "داستان جنگی", "داستان قهرمانی", "داستان آموزشی"],
      correctIndex: 2,
      answer: "گزینه ۳: حماسه در ادبیات به داستان‌های قهرمانی و پهلوانی گفته می‌شود."
    },
    {
      id: 36,
      text: "چرا فردوسی شاهنامه را سرود؟",
      options: ["برای حفظ زبان فارسی", "برای ثبت تاریخ", "برای تفریح", "گزینه ۱ و ۲"],
      correctIndex: 3,
      answer: "گزینه ۴: فردوسی شاهنامه را برای حفظ زبان فارسی و ثبت تاریخ و فرهنگ ایران سرود."
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
        backgroundColor: '#C62828',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/farsi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📖 آزمون جامع فارسی (۲)</h1>
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
                backgroundColor: '#C62828',
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
                      border: isSelected ? '3px solid #C62828' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#ffebee' : '#fff',
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
                      backgroundColor: isSelected ? '#C62828' : '#fff',
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
                  backgroundColor: canCalculate ? '#C62828' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#C62828' }}>
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
            borderTop: '4px solid #C62828',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #C62828', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#C62828'
            }}>
              📝 پاسخنامه تشریحی فارسی (۲)
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
                      color: '#C62828',
                      backgroundColor: '#ffebee',
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
                    <span style={{ fontWeight: 'bold', color: '#C62828' }}>📖 توضیح:</span> 
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

export default Farsi2FinalExam;