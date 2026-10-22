"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ===================================================================
// توجه: تصاویر شکل‌ها را در پوشه public/images قرار دهید
// ===================================================================

const ElectricFieldLinesQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== سوالات خطوط میدان الکتریکی ====================
  const questions = [
    // ---------- سوال ۲۳۷ ----------
    {
      id: 237,
      text: "باتوجه به شکل زیر کدام گزینه در مورد بارهای q₁ و q₂ صحیح است؟",
      image: "/img/q237.png",
      imageAlt: "خطوط میدان الکتریکی بین دو بار q1 و q2",
      options: [
        "q₁ > 0 , q₂ < 0 , |q₁| > |q₂|",
        "q₁ < 0 , q₂ > 0 , |q₁| > |q₂|",
        "q₁ > 0 , q₂ < 0 , |q₁| < |q₂|",
        "q₁ < 0 , q₂ > 0 , |q₁| < |q₂|"
      ],
      correctIndex: 2,
      answer: "طبق شکل، خطوط میدان از بار q₁ خارج شده (پس q₁ مثبت است) و به بار q₂ وارد می‌شوند (پس q₂ منفی است). چون تعداد خطوطی که به q₂ وارد می‌شود بیشتر از خطوط خارج‌شده از q₁ است، اندازه بار q₂ بزرگ‌تر از q₁ است. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۲۳۸ ----------
    {
      id: 238,
      text: "در شکل زیر، میدان الکتریکی حاصل از چهار بار نقطه‌ای نشان داده شده است. نوع بار الکتریکی A و B و C و D به ترتیب از راست به چپ کدام است؟",
      image: "/img/q238.png",
      imageAlt: "چهار بار نقطه‌ای A، B، C، D با خطوط میدان",
      options: [
        "منفی - مثبت - مثبت - منفی",
        "منفی - مثبت - منفی - مثبت",
        "مثبت - منفی - منفی - مثبت",
        "مثبت - منفی - مثبت - منفی"
      ],
      correctIndex: 0,
      answer: "در بار A خطوط میدان وارد می‌شوند ← منفی. در بار B خطوط خارج می‌شوند ← مثبت. در بار C خطوط وارد می‌شوند ← منفی. در بار D خطوط خارج می‌شوند ← مثبت. پس ترتیب: منفی - مثبت - منفی - مثبت. گزینه 1 صحیح است."
    },

    // ---------- سوال ۲۳۹ ----------
    {
      id: 239,
      text: "در شکل زیر، خطوط میدان اطراف دو کرة مشابه باردار را نشان می‌دهد. اگر این دو کره را به هم متصل کنیم، خطوط میدان آنها به کدام شکل درخواهد آمد؟",
      image: "/img/q239.png",
      imageAlt: "خطوط میدان اطراف دو کره مشابه باردار",
      options: [
        "شکل (۱): خطوط میدان همچنان از یک کره خارج و به کره دیگر وارد می‌شوند",
        "شکل (۲): خطوط میدان کاملاً یکنواخت و موازی بین دو کره",
        "شکل (۳): خطوط میدان از هر دو کره به سمت بیرون",
        "شکل (۴): خطوط میدان به سمت هر دو کره از بیرون"
      ],
      correctIndex: 1,
      answer: "وقتی دو کرة رسانا را به هم متصل می‌کنیم، بارها بین آنها تقسیم شده و به تعادل می‌رسند. اگر بارها ناهمنام باشند، پس از اتصال بار کل تقسیم می‌شود. با توجه به اینکه در شکل اولیه خطوط میدان از یک کره خارج و به کره دیگر وارد می‌شوند (بارها ناهمنام)، پس از اتصال بخشی از بارها خنثی شده و شکل خطوط میدان به شکل (۱) تغییر می‌کند. گزینه 2 صحیح است."
    },

    // ---------- سوال ۲۴۰ ----------
    {
      id: 240,
      text: "باتوجه به شکل زیر، کدام گزینه درست است؟",
      image: "/img/q240.png",
      imageAlt: "خطوط میدان الکتریکی بین دو بار q1 و q2",
      options: [
        "q₁ > 0 , q₂ < 0 , |q₁| > |q₂|",
        "q₁ < 0 , q₂ > 0 , |q₁| > |q₂|",
        "q₁ > 0 , q₂ < 0 , |q₁| < |q₂|",
        "q₁ < 0 , q₂ > 0 , |q₁| < |q₂|"
      ],
      correctIndex: 0,
      answer: "در شکل، خطوط میدان از بار q₁ خارج شده (q₁ مثبت) و به بار q₂ وارد می‌شوند (q₂ منفی). از آنجا که تعداد خطوط نزدیک q₂ بیشتر از q₁ است، |q₂| > |q₁|. گزینه 1 صحیح است."
    },

    // ---------- سوال ۲۴۱ ----------
    {
      id: 241,
      text: "در دوقطبی الکتریکی مقابل با حرکت از بار q₁ به q₂ اندازهٔ میدان چگونه تغییر می‌کند؟",
      image: "/img/q241.png",
      imageAlt: "دوقطبی الکتریکی با بارهای q1 و q2",
      options: [
        "پیوسته افزایش می‌یابد.",
        "ابتدا کاهش و سپس افزایش می‌یابد.",
        "پیوسته کاهش می‌یابد.",
        "ابتدا افزایش و سپس کاهش می‌یابد."
      ],
      correctIndex: 1,
      answer: "در دوقطبی الکتریکی، میدان در نزدیکی هر بار قوی و در وسط دو بار ضعیف‌تر است. با حرکت از q₁ به سمت q₂، ابتدا از بار q₁ دور می‌شویم (کاهش میدان) و به وسط می‌رسیم (کمینه میدان) و سپس به q₂ نزدیک می‌شویم (افزایش میدان). پس ابتدا کاهش و سپس افزایش می‌یابد. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۲۴۲ ----------
    {
      id: 242,
      text: "کدام شکل نمایش خطوط میدان در اطراف یک دوقطبی الکتریکی را به درستی نشان می‌دهد؟",
      image: "/img/q242.png",
      imageAlt: "چهار گزینه از خطوط میدان دوقطبی الکتریکی",
      options: [
        "شکل (۱): خطوط از بار مثبت خارج و به بار منفی وارد می‌شوند",
        "شکل (۲): خطوط میدان کاملاً موازی و یکنواخت",
        "شکل (۳): خطوط میدان از هر دو بار خارج می‌شوند",
        "شکل (۴): خطوط میدان به هر دو بار وارد می‌شوند"
      ],
      correctIndex: 0,
      answer: "در یک دوقطبی الکتریکی، خطوط میدان از بار مثبت خارج و به بار منفی وارد می‌شوند و در فضای بین دو بار منحنی‌های بسته‌ای ایجاد می‌کنند. شکل (۱) این رفتار را به درستی نشان می‌دهد. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۲۴۳ ----------
    {
      id: 243,
      text: "دو بار q₁ و q₂ در فاصلهٔ معینی از هم ثابت شده‌اند. اگر خطوط میدان الکتریکی اطراف بار q₂ به صورت شکل زیر باشد، میدان الکتریکی خالص در کدام نقطه می‌تواند صفر باشد؟",
      image: "/img/q243.png",
      imageAlt: "خطوط میدان اطراف بار q2 و نقاط A، B، C، D",
      options: ["A", "B", "C", "D"],
      correctIndex: 1,
      answer: "خطوط میدان به q₂ وارد می‌شوند، پس q₂ منفی است. میدان خالص صفر باید در نقطه‌ای خارج از فاصله دو بار و نزدیک به بار با اندازه کوچک‌تر باشد. چون q₁ در سمت چپ و q₂ در سمت راست است و خطوط به q₂ وارد می‌شوند، نقطه صفر باید در سمت چپ q₁ (نقطه A) باشد، مشروط بر آنکه |q₁| < |q₂|. گزینه 2 صحیح است."
    },

    // ---------- سوال ۲۴۴ ----------
    {
      id: 244,
      text: "خطوط میدان الکتریکی حاصل از یک الکترون و یک پروتون کدام است؟",
      image: "/img/q244.png",
      imageAlt: "چهار گزینه از خطوط میدان الکترون و پروتون",
      options: [
        "شکل (۱): خطوط از پروتون خارج و به الکترون وارد می‌شوند",
        "شکل (۲): خطوط میدان کاملاً موازی و جدا از هم",
        "شکل (۳): خطوط از الکترون خارج و به پروتون وارد می‌شوند",
        "شکل (۴): خطوط میدان از هر دو ذره خارج می‌شوند"
      ],
      correctIndex: 1,
      answer: "الکترون بار منفی و پروتون بار مثبت دارد. خطوط میدان همیشه از بار مثبت (پروتون) خارج و به بار منفی (الکترون) وارد می‌شوند. شکل (۱) این رفتار را نشان می‌دهد. گزینه 2 صحیح است."
    },

    // ---------- سوال ۲۴۵ ----------
    {
      id: 245,
      text: "دو بار نقطه‌ای q₁ و q₂ که اندازه‌های بار آنها به ترتیب ۴ µC و +4 µC است را در نظر بگیرید. چه تعداد از عبارات زیر دربارهٔ این دو بار نادرست است؟\nالف) در نواحی بسیار دور، نقش میدان، مشابه میدان حاصل از بار ۱۲ µC است.\nب) تعداد خطوط میدانی که به بار q₁ وارد می‌شوند، نصف تعداد خطوط میدانی است که از بار q₂ خارج می‌شوند.\nپ) خطوط میدان نسبت به خط واصل بین دو بار دارای تقارن هستند.",
      options: ["صفر", "یک", "دو", "سه"],
      correctIndex: 2,
      answer: "الف) نادرست است چون مجموع بارها ۴ + (−۸) = −۴ µC است (نه ۱۲ µC). ب) نادرست است چون تعداد خطوط متناسب با اندازه بار است و نسبت آنها ۱ به ۱ می‌باشد (هر دو ۴ µC). پ) درست است چون خطوط میدان نسبت به خط واصل دو بار متقارن هستند. پس دو عبارت نادرست است. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۲۴۶ ----------
    {
      id: 246,
      text: "در شکل زیر تعدادی از خط‌های میدان الکتریکی در ناحیه‌ای از فضا رسم شده است. کدام گزینه دربارهٔ اندازهٔ میدان الکتریکی در نقاط A, B و C درست است؟",
      image: "/img/q246.png",
      imageAlt: "خطوط میدان الکتریکی با نقاط A، B، C",
      options: [
        "E_B > E_A = E_C",
        "E_C > E_B = E_A",
        "E_A > E_B > E_C",
        "E_B > E_A > E_C"
      ],
      correctIndex: 3,
      answer: "در هر ناحیه، هرچه خطوط میدان به هم نزدیک‌تر باشند (تراکم بیشتر)، میدان قوی‌تر است. در شکل، تراکم خطوط در نقطه B بیشتر از A و در A بیشتر از C است. پس E_B > E_A > E_C. گزینه ۴ صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

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
  }, [selectedAnswers, questions]);

  // ========== تابع انتخاب گزینه ==========
  const handleOptionClick = (questionId, optionIndex) => {
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

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 50) return '#ffc107';
    return '#dc3545';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleImageError = (qId) => {
    setImageErrors(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div >

      {/* ==================== هدر ==================== */}
      <div style={{
        backgroundColor: '#1565C0',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>
              ⚡ آزمون فیزیک (۲) - خطوط میدان الکتریکی
            </h1>
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

      {/* ==================== سوالات ==================== */}
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
            {/* متن سوال */}
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
                backgroundColor: '#1565C0',
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

            {/* ===== تصویر شکل ===== */}
            <div >
              {imageErrors[q.id] ? (
                <div style={{
                  textAlign: 'center',
                  color: '#6c757d',
                  fontSize: '14px',
                  padding: '30px'
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                  <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                  <p style={{ margin: '5px 0 0 0', direction: 'ltr', fontFamily: 'monospace', fontSize: '12px', color: '#adb5bd' }}>
                    {q.image}
                  </p>
                  <p style={{ margin: '10px 0 0 0', fontSize: '12px' }}>
                    (این تصویر را در پوشه public/images قرار دهید)
                  </p>
                </div>
              ) : (
                <img
                  src={q.image}
                  alt={q.imageAlt}
                  onError={() => handleImageError(q.id)}
                  style={{
                    maxWidth: '100%',
                    maxHeight: '350px',
                    height: 'auto',
                    objectFit: 'contain',
                    borderRadius: '6px'
                  }}
                />
              )}
            </div>

            {/* ===== گزینه‌ها ===== */}
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
                      border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
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
                      backgroundColor: isSelected ? '#1565C0' : '#fff',
                      color: isSelected ? '#fff' : '#000',
                      flexShrink: 0
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

        {/* ==================== دکمه محاسبه ==================== */}
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
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6
                }}
              >
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
                ✅ درصد شما:{' '}
                <span style={{ color: getScoreColor(score), fontSize: '28px' }}>
                  {Math.round(score)}%
                </span>
                {isTimeUp && (
                  <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>
                    (زمان پایان یافت)
                  </span>
                )}
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
                  backgroundColor: getScoreColor(score),
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

        {/* ==================== دکمه پاسخنامه ==================== */}
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

        {/* ==================== پاسخنامه ==================== */}
        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px',
            borderTop: '4px solid #1565C0',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center',
              borderBottom: '3px solid #1565C0',
              paddingBottom: '20px',
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1565C0'
            }}>
              📝 پاسخنامه تشریحی خطوط میدان الکتریکی
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
                      color: '#1565C0',
                      backgroundColor: '#e3f2fd',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      سوال {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح: </span>
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{
                          fontWeight: 'bold',
                          color: isCorrect ? '#28a745' : '#dc3545'
                        }}>
                          {isCorrect ? '✔️ صحیح' : '❌ نادرست'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح: </span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>
                      {q.answer}
                    </span>
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

export default ElectricFieldLinesQuiz;