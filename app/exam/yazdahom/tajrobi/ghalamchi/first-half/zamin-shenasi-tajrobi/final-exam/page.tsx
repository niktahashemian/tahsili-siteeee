"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const GeologyFinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات زمین‌شناسی - جامع =================
  const questions = [
    // ==================== فصل اول: زمین و تحولات آن ====================
    {
      id: 1,
      text: "سن زمین تقریباً چند میلیارد سال است؟",
      options: ["۴.۶ میلیارد سال", "۵ میلیارد سال", "۳ میلیارد سال", "۱۰ میلیارد سال"],
      correctIndex: 0,
      answer: "گزینه ۱: سن زمین تقریباً ۴.۶ میلیارد سال تخمین زده شده است."
    },
    {
      id: 2,
      text: "ضخیم‌ترین لایه زمین کدام است؟",
      options: ["پوسته", "گوشته", "هسته بیرونی", "هسته درونی"],
      correctIndex: 1,
      answer: "گزینه ۲: گوشته با ضخامت حدود ۲۹۰۰ کیلومتر، ضخیم‌ترین لایه زمین است."
    },
    {
      id: 3,
      text: "کدام یک از موارد زیر از عوامل فرسایش است؟",
      options: ["باد", "آب", "یخچال‌ها", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: باد، آب و یخچال‌ها همگی از عوامل فرسایش هستند."
    },
    {
      id: 4,
      text: "جریان‌های همرفتی در کدام بخش زمین رخ می‌دهند؟",
      options: ["پوسته", "گوشته", "هسته درونی", "اتمسفر"],
      correctIndex: 1,
      answer: "گزینه ۲: جریان‌های همرفتی در گوشته زمین رخ می‌دهند و عامل حرکت صفحات تکتونیکی هستند."
    },
    {
      id: 5,
      text: "نظریه‌ای که حرکت صفحات تکتونیکی را توضیح می‌دهد، چه نام دارد؟",
      options: ["نظریه زایش قاره‌ها", "نظریه رانش قاره‌ها", "نظریه زمین‌شناسی", "نظریه فرسایش"],
      correctIndex: 1,
      answer: "گزینه ۲: نظریه رانش قاره‌ها توسط آلفرد وگنر مطرح شد و حرکت صفحات را توضیح می‌دهد."
    },
    {
      id: 6,
      text: "هسته درونی زمین در چه حالتی است؟",
      options: ["مایع", "جامد", "گاز", "پلاسما"],
      correctIndex: 1,
      answer: "گزینه ۲: هسته درونی زمین به دلیل فشار بسیار زیاد، در حالت جامد است."
    },

    // ==================== فصل دوم: سنگ‌ها و کانی‌ها ====================
    {
      id: 7,
      text: "تعریف کانی چیست؟",
      options: ["ماده معدنی طبیعی", "ساختار کریستالی", "جامد طبیعی با ترکیب شیمیایی مشخص", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: کانی ماده‌ای جامد، طبیعی، با ترکیب شیمیایی مشخص و ساختار کریستالی است."
    },
    {
      id: 8,
      text: "سختی کانی با کدام مقیاس اندازه‌گیری می‌شود؟",
      options: ["مقیاس ریشتر", "مقیاس موهس", "مقیاس سلسیوس", "مقیاس بوفرت"],
      correctIndex: 1,
      answer: "گزینه ۲: مقیاس موهس برای اندازه‌گیری سختی کانی‌ها استفاده می‌شود."
    },
    {
      id: 9,
      text: "سخت‌ترین کانی چیست؟",
      options: ["الماس", "کوارتز", "فلدسپات", "کلسیت"],
      correctIndex: 0,
      answer: "گزینه ۱: الماس با سختی ۱۰ در مقیاس موهس، سخت‌ترین کانی است."
    },
    {
      id: 10,
      text: "سنگ‌های آذرین چگونه تشکیل می‌شوند؟",
      options: ["از سرد شدن ماگما", "از رسوب‌گذاری", "از دگرگونی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: سنگ‌های آذرین از سرد شدن و انجماد ماگما یا گدازه تشکیل می‌شوند."
    },
    {
      id: 11,
      text: "سنگ‌های رسوبی چگونه تشکیل می‌شوند؟",
      options: ["از رسوب‌گذاری و فشردگی", "از سرد شدن ماگما", "از دگرگونی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: سنگ‌های رسوبی از رسوب‌گذاری، فشردگی و سیمان‌شدن رسوبات تشکیل می‌شوند."
    },
    {
      id: 12,
      text: "سنگ‌های دگرگونی چگونه تشکیل می‌شوند؟",
      options: ["از تغییر سنگ‌های دیگر در اثر حرارت و فشار", "از سرد شدن ماگما", "از رسوب‌گذاری", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: سنگ‌های دگرگونی در اثر حرارت و فشار بالا بر روی سنگ‌های دیگر تشکیل می‌شوند."
    },

    // ==================== فصل سوم: فسیل‌ها و تاریخ زمین ====================
    {
      id: 13,
      text: "فسیل به چه معناست؟",
      options: ["بقایای جانداران قدیمی", "سنگ‌های رسوبی", "کانسارهای معدنی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: فسیل‌ها بقایای جانداران قدیمی هستند که در لایه‌های زمین حفظ شده‌اند."
    },
    {
      id: 14,
      text: "کدام یک از موارد زیر به عنوان فسیل راهنما استفاده می‌شود؟",
      options: ["بقایای جاندارانی که در دوره خاصی زندگی می‌کرده‌اند", "بقایای بزرگ‌ترین جانداران", "بقایای کوچک‌ترین جانداران", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: فسیل‌های راهنما بقایای جاندارانی هستند که در دوره خاصی زندگی می‌کرده‌اند."
    },
    {
      id: 15,
      text: "قدیمی‌ترین دوره زمین‌شناسی کدام است؟",
      options: ["پرکامبرین", "پالئوزوئیک", "مزوزوئیک", "سنوزوئیک"],
      correctIndex: 0,
      answer: "گزینه ۱: دوره پرکامبرین قدیمی‌ترین دوره زمین‌شناسی است."
    },
    {
      id: 16,
      text: "دوره مزوزوئیک با چه رویدادی همراه بود؟",
      options: ["ظهور دایناسورها", "ظهور پستانداران", "ظهور پرندگان", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: دوره مزوزوئیک با ظهور و گسترش دایناسورها همراه بود."
    },
    {
      id: 17,
      text: "عصر یخبندان مربوط به کدام دوره است؟",
      options: ["پرکامبرین", "پالئوزوئیک", "مزوزوئیک", "سنوزوئیک"],
      correctIndex: 3,
      answer: "گزینه ۴: عصرهای یخبندان در دوره سنوزوئیک رخ داده‌اند."
    },
    {
      id: 18,
      text: "فرآیند فسیل‌شدن شامل چه مراحلی است؟",
      options: ["دفن شدن", "حفظ شدن", "کانی‌شدن", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: فرآیند فسیل‌شدن شامل دفن شدن، حفظ شدن و کانی‌شدن است."
    },

    // ==================== فصل چهارم: منابع و انرژی زمین ====================
    {
      id: 19,
      text: "نفت از دگرگونی چه موادی به وجود می‌آید؟",
      options: ["بقایای جانداران دریایی", "بقایای گیاهان", "بقایای جانوران خشکی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: نفت از دگرگونی بقایای جانداران دریایی در اثر حرارت و فشار به وجود می‌آید."
    },
    {
      id: 20,
      text: "کدام یک از موارد زیر از سوخت‌های فسیلی است؟",
      options: ["نفت", "گاز طبیعی", "زغال‌سنگ", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: نفت، گاز طبیعی و زغال‌سنگ همگی از سوخت‌های فسیلی هستند."
    },
    {
      id: 21,
      text: "انرژی‌های تجدیدپذیر شامل کدام موارد هستند؟",
      options: ["انرژی خورشیدی", "انرژی بادی", "انرژی آبی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: انرژی خورشیدی، بادی و آبی همگی از انرژی‌های تجدیدپذیر هستند."
    },
    {
      id: 22,
      text: "سفره‌های آب زیرزمینی در کدام لایه‌ها قرار دارند؟",
      options: ["سنگ‌های نفوذپذیر", "سنگ‌های نفوذناپذیر", "سطح زمین", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: سفره‌های آب زیرزمینی در سنگ‌های نفوذپذیر مانند ماسه‌سنگ و سنگ‌آهک قرار دارند."
    },
    {
      id: 23,
      text: "آلاینده‌های اصلی آب‌های زیرزمینی کدامند؟",
      options: ["مواد شیمیایی کشاورزی", "فاضلاب", "مواد نفتی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: مواد شیمیایی کشاورزی، فاضلاب و مواد نفتی از آلاینده‌های اصلی آب‌های زیرزمینی هستند."
    },
    {
      id: 24,
      text: "استخراج معادن چه تأثیری بر محیط زیست دارد؟",
      options: ["تخریب زمین", "آلودگی آب", "تولید زباله‌های معدنی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: استخراج معادن باعث تخریب زمین، آلودگی آب و تولید زباله‌های معدنی می‌شود."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "پوسته زمین از چه موادی تشکیل شده است؟",
      options: ["سنگ و کانی", "فلزات مذاب", "آب و یخ", "گازها"],
      correctIndex: 0,
      answer: "گزینه ۱: پوسته زمین از سنگ‌ها و کانی‌های مختلف تشکیل شده است."
    },
    {
      id: 26,
      text: "کدام لایه زمین بیشترین دما را دارد؟",
      options: ["پوسته", "گوشته", "هسته درونی", "هسته بیرونی"],
      correctIndex: 2,
      answer: "گزینه ۳: هسته درونی با دمای حدود ۵۵۰۰ درجه سانتی‌گراد، داغ‌ترین لایه زمین است."
    },
    {
      id: 27,
      text: "کوارتز با چه سختی در مقیاس موهس اندازه‌گیری می‌شود؟",
      options: ["۵", "۷", "۸", "۹"],
      correctIndex: 1,
      answer: "گزینه ۲: کوارتز با سختی ۷ در مقیاس موهس اندازه‌گیری می‌شود."
    },
    {
      id: 28,
      text: "سنگ مرمر از دگرگونی کدام سنگ به وجود می‌آید؟",
      options: ["سنگ آهک", "ماسه‌سنگ", "گرانیت", "بازالت"],
      correctIndex: 0,
      answer: "گزینه ۱: سنگ مرمر از دگرگونی سنگ آهک تشکیل می‌شود."
    },
    {
      id: 29,
      text: "کدام یک از موارد زیر از فسیل‌های شاخص دوره پالئوزوئیک است؟",
      options: ["تری‌لوبیت", "دایناسور", "ماموت", "انسان اولیه"],
      correctIndex: 0,
      answer: "گزینه ۱: تری‌لوبیت‌ها از فسیل‌های شاخص دوره پالئوزوئیک هستند."
    },
    {
      id: 30,
      text: "انقراض دسته‌جمعی دایناسورها در پایان کدام دوره رخ داد؟",
      options: ["پرکامبرین", "پالئوزوئیک", "مزوزوئیک", "سنوزوئیک"],
      correctIndex: 2,
      answer: "گزینه ۳: انقراض دایناسورها در پایان دوره مزوزوئیک (حدود ۶۵ میلیون سال پیش) رخ داد."
    },
    {
      id: 31,
      text: "کدام یک از موارد زیر از منابع معدنی فلزی است؟",
      options: ["آهن", "مس", "طلا", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: آهن، مس و طلا همگی از منابع معدنی فلزی هستند."
    },
    {
      id: 32,
      text: "کدام یک از موارد زیر از منابع معدنی غیرفلزی است؟",
      options: ["سنگ آهک", "نمک", "گچ", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: سنگ آهک، نمک و گچ همگی از منابع معدنی غیرفلزی هستند."
    },
    {
      id: 33,
      text: "چرخه آب شامل کدام مراحل است؟",
      options: ["تبخیر", "میعان", "بارش", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: چرخه آب شامل تبخیر، میعان و بارش است."
    },
    {
      id: 34,
      text: "کدام یک از موارد زیر برای حفاظت از منابع زمین مؤثر است؟",
      options: ["بازیافت", "مدیریت مصرف", "استفاده از انرژی‌های تجدیدپذیر", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: بازیافت، مدیریت مصرف و استفاده از انرژی‌های تجدیدپذیر همگی برای حفاظت از منابع زمین مؤثرند."
    },
    {
      id: 35,
      text: "آلاینده‌های نفتی چه تأثیری بر محیط زیست دارند؟",
      options: ["آلودگی آب", "آلودگی خاک", "آلودگی هوا", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: آلاینده‌های نفتی آب، خاک و هوا را آلوده می‌کنند."
    },
    {
      id: 36,
      text: "مدیریت پایدار منابع زمین به چه معناست؟",
      options: ["استفاده بهینه از منابع", "حفاظت از منابع", "توسعه پایدار", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: استفاده بهینه از منابع، حفاظت از منابع و توسعه پایدار همگی از اهداف مدیریت پایدار منابع زمین هستند."
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
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/zamin-shenasi-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🌍 آزمون جامع زمین‌شناسی</h1>
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
                backgroundColor: '#4CAF50',
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
                      border: isSelected ? '3px solid #4CAF50' : '1px solid #dee2e6',
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
                      backgroundColor: isSelected ? '#4CAF50' : '#fff',
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
                  backgroundColor: canCalculate ? '#4CAF50' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#4CAF50' }}>
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
            borderTop: '4px solid #4CAF50',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #4CAF50', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#4CAF50'
            }}>
              📝 پاسخنامه تشریحی زمین‌شناسی
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
                      color: '#4CAF50',
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
                    <span style={{ fontWeight: 'bold', color: '#4CAF50' }}>📖 توضیح:</span> 
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

export default GeologyFinalExam;