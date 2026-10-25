"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson2 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۲-۳: رفتار عناصرها و شعاع اتم =================
  const questions = [
    {
      id: 77,
      text: "روند تغییر ...... عنصرهای Li, Na, K به صورت ...... است.",
      options: [
        "شعاع اتمی - Li < Na < K",
        "نسبت شمار زیرلایه‌های اشغال‌شده به لایه‌های اشغال‌شده از الکترون - Li > Na > K",
        "مجموع دو عدد کوانتومی اصلی و فرعی الکترون بیرونی‌ترین زیرلایه - Li < Na < K",
        "خصلت فلزی - K < Na < Li"
      ],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. مجموع n+l برای الکترون بیرونی‌ترین زیرلایه در Li برابر 2، در Na برابر 3 و در K برابر 4 است، پس Li < Na < K."
    },
    {
      id: 78,
      text: "کدام گزینه دربارۀ عنصر 14X درست است؟",
      options: [
        "شعاع اتمی آن از یون پایداری که تشکیل می‌دهد، بیشتر است.",
        "خصلت نافلزی آن از عنصر بعد از آن بیشتر است.",
        "عنصر اصلی سازندۀ سلول‌های خورشیدی است.",
        "مانند دیگر عناصر هم‌گروه خود، در واکنش با دیگر اتم‌ها، الکترون به اشتراک می‌گذارد."
      ],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. سیلیسیم عنصر اصلی سازندۀ سلول‌های خورشیدی است."
    },
    {
      id: 88,
      text: "عناصری که در سمت چپ ...... جدول تناوبی قرار دارند، بیشترین خصلت فلزی و عناصری که در سمت راست و ...... جدول تناوبی جای دارند (به‌جز گازهای نجیب) بیشترین خصلت نافلزی را دارند.",
      options: [
        "ﺑﺎﻻ - ﺑﺎﻻ",
        "پایین - پایین",
        "بالا - پایین",
        "بالا - پایین"
      ],
      correctIndex: 3,
      answer: "گزینه 4 درست است. فلزات در سمت چپ و پایین جدول (بیشترین خصلت فلزی) و نافلزات در سمت راست و بالای جدول (بیشترین خصلت نافلزی) قرار دارند."
    },
    {
      id: 96,
      text: "شدت انجام کدام‌یک از واکنش‌های زیر، کمتر از سه واکنش دیگر است؟",
      options: [
        "Na(s) + Cl₂(g) →",
        "Na(s) + Br₂(l) →",
        "Li(s) + Cl₂(g) →",
        "Li(s) + Br₂(l) →"
      ],
      correctIndex: 0,
      answer: "گزینه 1 درست است. واکنش‌پذیری Li از Na و Br₂ از Cl₂ کمتر است، پس Li + Br₂ کمترین شدت واکنش را دارد."
    },
    {
      id: 105,
      text: "کدام موارد درست هستند؟\nالف) به طور کلی در تمام گروه‌های اصلی جدول تناوبی، با کاهش شمارهٔ دوره، شعاع اتمی و واکنش‌پذیری عناصر کاهش پیدا می‌کند.\nب) فلوئور در دمای صفر درجهٔ سلسیوس به سرعت با گاز هیدروژن واکنش می‌دهد.\nپ) تمام فلزات دورهٔ سوم جدول تناوبی متعلق به دستهٔ s جدول هستند.\nت) ترکیب پتاسیم اکسید به مراتب پایدارتر از فلز پتاسیم است.",
      options: [
        "الف - ب - ت",
        "ب - پ - ت",
        "ب - ت",
        "الف - ت"
      ],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. موارد (ب) و (ت) درست هستند. الف نادرست (در گروه‌های نافلزی برعکس است) و پ نادرست (آلومینیم در دستهٔ p است)."
    },
    {
      id: 109,
      text: "چه تعداد از مقایسه‌های داده‌شده به‌درستی انجام شده است؟\nالف) نقطة جوش: برم > ید\nب) فعالیت شیمیایی: Na > منیزیم\nپ) تمایل به تشکیل آنیون: Cl > برم\nت) اختلاف شعاع اتمی: Al و Si > از هر دو عنصر متوالی دورهٔ سوم\nث) تعداد الکترون‌های لایهٔ آخر: کلر > سیلیسیم",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "گزینه 4 درست است. ۲ مورد (الف و ت) درست هستند."
    },
    {
      id: 135,
      text: "ﭼﻪ ﺗﻌﺪاد از ﻣﻮارد زﯾﺮ درﺳﺖ ﻫﺴﺘﻨﺪ؟ \n اﻟﻒ) ﻫﺮﭼﻪ ﺷﻌﺎع اﺗﻤﯽ ﯾﮏ ﻋﻨﺼﺮ ﺑﺰرگ ﺗﺮ ﺑﺎﺷﺪ، راﺣﺖ ﺗﺮ اﻟﮑﺘﺮون از دﺳﺖ ﻣﯽ دﻫﺪ.\nب) ﻫﺎﻟﯿﺪﻫﺎی ﻫﺮ دوره ﺑﺎ ﮔﺮﻓﺘﻦ ﯾﮏ اﻟﮑﺘﺮون ﺑﻪ آراﯾﺶ ﮔﺎز ﻧﺠﯿﺐ ﺑﻌﺪ از ﺧﻮد ﻣﯽ رﺳﻨﺪ.\nپ) واﮐﻨﺶ ﭘﺬﯾﺮی ﺑﺮم ﺑﺎ ﮔﺎز ﻫﯿﺪروژن در دﻣﺎی اﺗﺎق آرام ﺗﺮ از واﮐﻨﺶ ﭘﺬﯾﺮی ﮐﻠﺮ در ﻫﻤﯿﻦ ﺷﺮاﯾﻂ اﺳﺖ.\n ت( ﮐﺎﻫﺶ ﺷﻌﺎع اﺗﻤﯽ در ﯾﮏ دوره ﺑﻪ دﻟﯿﻞ اﻓﺰاﯾﺶ ﭘﺮوﺗﻮن ﻫﺎ اﺳﺖ.",
      options: [
        "1",
        "2",
        "3",
        "4"
      ],
      correctIndex: 1,
      answer: "گزینه 2 درست است. بیشترین اختلاف بین Na و Mg و کمترین اختلاف بین S و Cl است."
    },
    {
      id: 136,
      text: "عناصر A, B, C, D, E به ترتیب از راست به چپ در دورهٔ سوم جدول تناوبی قرار دارند. اگر ترکیب شیمیایی عنصر روی و B به صورت Zn₃B₂ باشد، کدام گزینه زیر نادرست است؟",
      options: [
        "عنصر A شبه‌فلز و عنصر B نافلز است.",
        "عنصر D در دمای اتاق به‌آرامی با گاز هیدروژن واکنش می‌دهد.",
        "تمایل گرفتن الکترون همانند شعاع اتمی در عنصر D بیشتر از عنصر C است.",
        "آرایش الکترونی آخرین لایهٔ عنصر A به صورت ۳s²3p² است."
      ],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. در دورهٔ سوم، از چپ به راست تمایل گرفتن الکترون افزایش و شعاع اتمی کاهش می‌یابد."
    },
    {
      id: 137,
      text: "با کاهش عدد اتمی در گروه هالوژن‌ها، چه تعداد از ویژگی‌های زیر کاهش می‌یابند؟\n(الف) خصلت نافلزی\n(ب) شعاع اتمی\n(ت) تمایل به از دست دادن الکترون\n(پ) دمای لازم برای واکنش با گاز هیدروژن\n(ث) شمار لایه‌های الکترونی",
      options: ["۴", "۵", "۲", "۳"],
      correctIndex: 1,
      answer: "گزینه 2 درست است. ۴ ویژگی (شعاع اتمی، تمایل به از دست دادن الکترون، دمای لازم برای واکنش، شمار لایه‌های الکترونی) با کاهش عدد اتمی کاهش می‌یابند."
    },
    {
      id: 141,
      text: "چند مورد از ویژگی‌های زیر برای عنصر ۱۲Mg بیشتر از ۱۱Na است؟\n- شعاع اتمی\n- تعداد الکترون‌های ظرفیتی\n- تعداد لایه‌های الکترونی\n- فعالیت شیمیایی",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۲ مورد (تعداد الکترون‌های ظرفیتی) برای Mg بیشتر است. شعاع اتمی و فعالیت شیمیایی Na بیشتر است و تعداد لایه‌های الکترونی برابر است."
    }
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 درس ۲-۳: رفتار عناصرها و شعاع اتم</h1>
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
              📝 پاسخنامه تشریحی - درس ۲-۳: رفتار عناصرها و شعاع اتم
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

export default Shimi2lesson2;
