"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson8 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۸: جریان فلز بین محیط زیست و جامعه =================
  // بازه سوالات ۲۸۶ تا ۲۹۵ (از صفحه ۵۳ تا ۵۵) - ۱۰ سوال
  const questions = [
    {
      id: 286,
      text: "کدام گزینه زیر نادرست است؟",
      options: [
        "استفاده از گیاهان برای استخراج فلزات نیکل و روی مقرون به صرفه نیست.",
        "از براده‌های آهن حاصل از واکنش ترمیت برای جوش دادن خطوط راه‌آهن استفاده می‌کنند.",
        "واکنش‌پذیری فلز آلومینیم بیشتر از آهن است.",
        "از آهن (III) اکسید به‌عنوان رنگ قرمز در نقاشی استفاده می‌شود."
      ],
      correctIndex: 1,
      answer: "گزینه ۲ نادرست است. استفاده از گیاهان برای استخراج فلزات نیکل و روی مقرون به صرفه نیست (نادرست). طبق کتاب درسی، گیاه‌پالایی برای استخراج فلزات کمیاب مانند طلا و مس مقرون‌به‌صرفه است، اما برای روی و نیکل که درصد آن‌ها در سنگ معدن بالاست، نیازی به گیاه‌پالایی نیست. گزینه‌های ۱، ۳ و ۴ درست هستند."
    },
    {
      id: 287,
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) یکی از ویژگی‌های جامعه‌ای که در مسیر توسعه پایدار است باشد، اقتصاد شکوفای آن می‌باشد.\nب) حتی جامعه‌ای که به محیط‌زیست خود توجه نکند هم می‌تواند در مسیر توسعه پایدار باشد.\nپ) فلزها منابعی تجدیدناپذیر هستند.",
      options: [
        "۰",
        "۱",
        "۲",
        "۳"
      ],
      correctIndex: 2,
      answer: "موارد درست: الف و پ (۲ مورد). مورد ب نادرست است، زیرا توجه به محیط‌زیست از ارکان اصلی توسعه پایدار است."
    },
    {
      id: 288,
      text: "چه تعداد از عبارت‌های زیر درست می‌باشد؟\nالف) خواص فیزیکی شبه فلزها بیشتر شبیه نافلزها و رفتار شیمیایی آن‌ها همانند فلزهاست.\nب) بیشترین خصلت نافلزی مربوط به عنصری است که ۵ الکترون با l=1 دارد.\nپ) استفاده از گیاهان برای بیرون کشیدن فلزاتی که درصد آن‌ها در سنگ معدن بیشتر یا مساوی ۲٪ باشد مقرون به صرفه نیست.\nت) به دلیل بازیافت، می‌توان فلزات را منابعی تجدیدپذیر در نظر گرفت.\nث) برخی از مزایای طلا امکان ساخت نخ طلا و تغییر رسانایی الکتریکی آن در دماهای گوناگون است.",
      options: [
        "3",
        "4",
        "2",
        "5"
      ],
      correctIndex: 2,
      answer: "موارد درست: پ، ت، ث (۳ مورد). مورد الف نادرست است (خواص فیزیکی شبه‌فلزها به فلزها شبیه است). مورد ب نادرست است (بیشترین خصلت نافلزی مربوط به فلوئور است که ۵ الکترون با l=1 ندارد)."
    },
    {
      id: 289,
      text: "همۀ مطالب زیر نادرست‌اند، به‌جز:",
      options: [
        "در استخراج فلز تنها درصد کمی از سنگ معدن به فلز تبدیل می‌شود.",
        "آهنگ مصرف و استخراج فلز با آهنگ برگشت فلز به طبیعت به شکل سنگ معدن یکسان است.",
        "بازیافت فلزها و ازجمله فلز آهن ردپای کربن دی‌اکسید را افزایش می‌دهد.",
        "غلظت بیشتر گونه‌های فلزی موجود در زمین نسبت به ذخایر اقیانوسی، بهره‌برداری از این منابع را نوید می‌دهد."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. در استخراج فلز تنها درصد کمی از سنگ معدن به فلز تبدیل می‌شود. گزینه ۲ نادرست است (آهنگ مصرف بسیار بیشتر از برگشت است). گزینه ۳ نادرست است (بازیافت ردپای کربن دی‌اکسید را کاهش می‌دهد). گزینه ۴ نادرست است (غلظت گونه‌های فلزی در اقیانوس‌ها بسیار کم است)."
    },
    {
      id: 290,
      text: "کدام گزینه نادرست است؟",
      options: [
        "فلزات منابعی تجدیدناپذیر هستند که بازیافت آن‌ها سبب کاهش ردپای کربن دی‌اکسید می‌شود.",
        "واکنش ترمیت نشان می‌دهد که واکنش‌پذیری آلومینیم از آهن بیشتر است.",
        "هرچه فلز فعال‌تر باشد میل بیشتری به ایجاد ترکیب داشته و ترکیب‌هایش پایداری بیشتری از خودش دارد.",
        "به‌طورکلی در واکنش‌هایی که به‌شکل طبیعی انجام می‌شوند واکنش‌پذیری فرآورده‌ها بیشتر از واکنش‌دهنده‌ها است."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است. در واکنش‌هایی که به‌طور طبیعی انجام می‌شوند، واکنش‌پذیری فرآورده‌ها کمتر از واکنش‌دهنده‌ها است (نه بیشتر)."
    },
    {
      id: 291,
      text: "کدام‌یک از گزینه‌های زیر نادرست است؟",
      options: [
        "از بازیافت ۷ قوطی فولادی آن‌قدر انرژی ذخیره می‌شود که می‌توان یک لامپ ۶۰ واتی را حدود ۲۵ ساعت روشن نگه داشت.",
        "در فرآیند استخراج ۱۰۰۰ کیلوگرم آهن تقریباً ۲۰۰۰ کیلوگرم سنگ معدن آن و ۱۰۰۰ کیلوگرم از منابع معدنی دیگر استفاده می‌شود.",
        "نفت خام مایع غلیظ و سیاه‌رنگ یا قهوه‌ای مایل به سبز است.",
        "در صورت بازیافت فلزات گونه‌های زیستی کمتری از بین می‌روند."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. طبق کتاب درسی، از بازگردانی ۷ قوطی فولادی آن‌قدر انرژی ذخیره می‌شود که می‌توان یک لامپ ۶۰ واتی را حدود ۲۵ ساعت روشن نگه داشت. (در برخی منابع ۲۴ ساعت ذکر شده اما ۲۵ ساعت صحیح است)"
    },
    {
      id: 292,
      text: "درباره \"بازیافت فلزها\" چند مورد از موارد زیر نادرست است؟\nالف) موجب اتلاف بیشتر انرژی می‌شود.\nب) موجب کاهش سرعت گرمایش کره زمین می‌شود.\nپ) تأثیری بر حفظ گونه‌های زیستی ندارد.\nت) به توسعه پایدار کمک می‌کند.\nث) ردپای زیست محیطی انسان را کاهش می‌دهد.",
      options: [
        "۲ مورد",
        "۳ مورد",
        "۴ مورد",
        "۱ مورد"
      ],
      correctIndex: 0,
      answer: "موارد نادرست: الف و پ (۲ مورد). بازیافت فلزها موجب صرفه‌جویی در انرژی می‌شود (نه اتلاف)، به حفظ گونه‌های زیستی کمک می‌کند (نه بی‌تأثیر). موارد درست: ب، ت، ث."
    },
    {
      id: 294,
      text: "کدام‌یک از گزینه‌های زیر درست است؟",
      options: [
        "با قرار دادن فلز مس در محلول آهن (II) سولفات، پس از مدتی رنگ محلول تغییر کرده و رسوب تشکیل می‌شود.",
        "به دلیل واکنش‌پذیری بیشتر کربن نسبت به سدیم، در فولاد مبارکه از کربن برای استخراج آهن استفاده می‌شود.",
        "هرچه فلزی فعال‌تر باشد، میل بیشتری به ایجاد ترکیب دارد و ترکیب‌هایش پایداری بیشتری نسبت به فلز دارند.",
        "باتوجه به چرخه استخراج فلز و برگشت آن به طبیعت، می‌توان گفت فلزات منابعی تجدیدپذیرند."
      ],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. گزینه ۱ نادرست: واکنش‌پذیری آهن از مس بیشتر است، پس مس نمی‌تواند در ترکیب آهن جایگزین شود. گزینه ۲ نادرست: واکنش‌پذیری سدیم از کربن بیشتر است، اما به دلیل صرفه اقتصادی از کربن استفاده می‌شود. گزینه ۴ نادرست: فلزات منابع تجدیدناپذیرند."
    },
    {
      id: 293,
      text: "ﭼﺮﺧﮥ ﺟﺮﯾﺎن ﻓﻠﺰ از ﻃﺒﯿﻌﺖ ﺑﻪ ﻃﺒﯿﻌﺖ ﮐﺪام اﺳﺖ؟\n 1) ﺳﻨﮓ ﻣﻌﺪن - اﺳﺘﺨﺮاج ﻓﻠﺰ - ﻓﻠﺰ اﺳﺘﺨﺮاج ﺷﺪه ﺑﻪ ﺻﻮرت آﻟﯿﺎژ و ﺧﺎﻟﺺ اﺳﺘﻔﺎده ﻣﯽ ﺷﻮد - ﻓﻠﺰ ﺧﻮرده و ﻓﺮﺳﺎﯾﺶ ﻣﯽ ﯾﺎﺑﺪ و زﻧﮓ ﻣﯽ زﻧﺪ و ﺑﻪ ﻃﺒﯿﻌﺖ ﺑﺎز ﻣﯽ ﮔﺮدد. \n 2) ﺳﻨﮓ ﻣﻌﺪن - اﺳﺘﺨﺮاج ﻓﻠﺰ - ﻓﻠﺰ ﺑﻪ ﺷﮑﻞ ﺧﺎﻟﺺ اﺳﺘﻔﺎده ﻣﯽ ﺷﻮد - ﻓﻠﺰ ﺧﻮرده و ﻓﺮﺳﺎﯾﺶ ﻣﯽ ﯾﺎﺑﺪ و ﺑﺎ زﻧﮓ زدن ﺑﻪ ﻃﺒﯿﻌﺖ ﺑﺎز ﻣﯽ ﮔﺮدد.\n 3)ﺳﻨﮓ ﻣﻌﺪن - اﺳﺘﺨﺮاج ﻓﻠﺰ - ﻓﻠﺰﻫﺎ در ﺗﺮﮐﯿﺐ ﺑﺎ ﻧﺎﻓﻠﺰات ﺑﻪ ﺻﻮرت ﺗﺮﮐﯿﺒﺎت ﯾﻮﻧﯽ اﺳﺘﻔﺎده ﻣﯽ ﺷﻮﻧﺪ - ﻓﻠﺰ ﺧﻮرده و ﻓﺮﺳﺎﯾﺶ ﻣﯽ ﯾﺎﺑﺪ و زﻧﮓ ﻣﯽ زﻧﺪ وﺑﻪ ﻃﺒﯿﻌﺖ ﺑﺎز ﻣﯽ ﮔﺮدد. \n 4) ﺳﻨﮓ ﻣﻌﺪن - ﻓﻠﺰ اﺳﺘﺨﺮاج ﺷﺪه ﺑﻪ ﺻﻮرت ﺧﺎﻟﺺ ﯾﺎ آﻟﯿﺎژ آن در ﺳﺎﺧﺖ وﺳﺎﯾﻞ زﻧﺪﮔﯽ ﺑﻪ ﮐﺎر ﻣﯽ رود - ﻓﻠﺰﻫﺎ ازﻃﺮﯾﻖ ﻓﺮﺳﺎﯾﺶ و زﻧﮓ زدن ﺑﻪ ﻃﺒﯿﻌﺖ ﺑﺎز ﻣﯽ ﮔﺮدﻧﺪ.",
      options: [
        "۱ ",
        "۲ ",
        "۳ ",
        "۴ "
      ],
      correctIndex: 0,
      answer: "موارد نادرست: ب و ت (۲ مورد). مورد الف درست است (شکل چرخه را نشان می‌دهد). مورد ب نادرست (قانون پایستگی ماده برقرار است). مورد پ درست است (آهنگ مصرف >> آهنگ برگشت). مورد ت نادرست (فلزات تجدیدناپذیرند)."
    },
    
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 دقیقه
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
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/shimi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🌍 درس ۸: جریان فلز بین محیط زیست و جامعه</h1>
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
                backgroundColor: '#2196F3',
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
                      border: isSelected ? '3px solid #2196F3' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e3f2fd' : '#fff',
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
                      backgroundColor: isSelected ? '#2196F3' : '#fff',
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
                  backgroundColor: canCalculate ? '#2196F3' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2196F3' }}>
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
            borderTop: '4px solid #2196F3',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #2196F3', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#2196F3'
            }}>
              📝 پاسخنامه تشریحی - درس ۸: جریان فلز بین محیط زیست و جامعه
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
                      color: '#2196F3',
                      backgroundColor: '#e3f2fd',
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
                    <span style={{ fontWeight: 'bold', color: '#2196F3' }}>📖 توضیح:</span> 
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

export default Shimi2Lesson8;
