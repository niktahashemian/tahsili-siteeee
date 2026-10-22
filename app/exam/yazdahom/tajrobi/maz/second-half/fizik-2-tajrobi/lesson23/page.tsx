"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const MagneticPropertiesQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال غیرپیوسته از درس بیست و دو: ویژگی مغناطیسی مواد ====================
  const questions = [
    // ---------- سوال ۱ ----------
    {
      id: 1,
      text: "مواد ............ مانند ............ در حضور یک میدان مغناطیسی قوی خاصیت مغناطیسی موقت پیدا می‌کنند.",
      options: [
        "پارامغناطیس، اورانیوم",
        "دیامغناطیس، اورانیوم",
        "پارامغناطیس، آهن",
        "دیامغناطیس، آهن"
      ],
      correctIndex: 0,
      answer: "مواد پارامغناطیس مانند اورانیوم، پلاتین، آلومینیوم، سدیم، اکسیژن و اکسید نیتروژن در حضور میدان مغناطیسی قوی خاصیت مغناطیسی ضعیف و موقت پیدا می‌کنند. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۳ ----------
    {
      id: 3,
      text: "کدام گزینه در مورد تصاویر زیر صحیح است؟",
      image: "/img/magnetism_qe3.png",
      options: [
        "الف مربوط به مواد مغناطیس و ب و پ مربوط به مواد پارامغناطیس است.",
        "الف مواد پارامغناطیس در حضور میدان مغناطیسی خارجی قوی و ب همان مواد در حضور میدان مغناطیسی ضعیف و ت نیز همان مواد در غیاب میدان مغناطیسی خارجی است.",
        "الف مواد فرومغناطیس در حضور میدان مغناطیسی قوی و ب همان مواد در حضور میدان مغناطیسی ضعیف و پ نیز همان مواد در غیاب میدان مغناطیسی خارجی است.",
        "الف مواد فرومغناطیسی در غیاب میدان مغناطیسی و ب همان موارد در حضور میدان مغناطیسی ضعیف و پ نیز همان مواد در حضور میدان مغناطیسی قوی است."
      ],
      correctIndex: 3,
      answer: "تصویر (الف) ماده فرومغناطیسی در نبود میدان مغناطیسی خارجی (حوزه‌ها کاتوره‌ای)، تصویر (ب) ماده فرومغناطیسی در حضور میدان مغناطیسی خارجی ضعیف (حوزه‌ها تا حدی هم‌راستا) و تصویر (پ) ماده فرومغناطیس در حضور میدان مغناطیسی خارجی قوی (حوزه‌ها کاملاً هم‌راستا) است. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۴ ----------
    {
      id: 4,
      text: "کدام‌یک از موارد زیر به‌عنوان هستۀ آهنربای الکتریکی به کار نمی‌رود؟",
      options: [
        "آهن",
        "کبالت",
        "نیکل",
        "فولاد"
      ],
      correctIndex: 3,
      answer: "هسته آهنربای الکتریکی نمی‌تواند فرومغناطیس سخت باشد؛ زیرا مواد فرومغناطیس سخت (مانند فولاد) با قطع جریان خاصیت آهنربایی خود را از دست نمی‌دهند. بنابراین فولاد برای هسته آهنربای الکتریکی مناسب نیست. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۶ ----------
    {
      id: 6,
      text: "کدام یک از گزینه های زیر دربارۀ مواد پارامغناطیس درست نیست؟",
      options: [
        "اورانیم، پالتین، نیکل از جمله مواد پارامغناطیس هستند.",
        "اتم‌های مواد پارامغناطیس به‌طور ذاتی دارای خاصیت مغناطیسی هستند، اما دوقطبی‌های مغناطیسی هر یک از اتم‌های آن‌ها، به‌صورت کاتوره‌ای سمت‌گیری می‌کنند.",
        "دوقطبی‌های مغناطیسی این مواد، میدان مغناطیسی خالص ایجاد نمی‌کنند.",
        "با قرار گرفتن این مواد در یک میدان مغناطیسی خارجی، خاصیت مغناطیسی در آن‌ها ایجاد می‌شود و با حذف این میدان مغناطیسی خاصیت مغناطیسی هم از بین می‌رود."
      ],
      correctIndex: 0,
      answer: "نیکل از جمله مواد فرومغناطیس است، نه پارامغناطیس. بنابراین گزینه ۱ نادرست است."
    },

    // ---------- سوال ۸ ----------
    {
      id: 8,
      text: "شکل \"الف\" یک ماده را درون میدان خارجی B نشان می‌دهد. شکل \"ب\" همان ماده را پس از خارج کردن از میدان B نشان می‌دهد. کدام گزینه نوع ماده را به‌درستی بیان می‌کند؟",
      image: "/img/magnetism_qe8.png",
      options: [
        "پارامغناطیس",
        "فرومغناطیس نرم",
        "فرومغناطیس سخت",
        "دیامغناطیس"
      ],
      correctIndex: 1,
      answer: "پس از خارج کردن از میدان B، حجم حوزه‌ها تغییر کرده و این تغییر حجم حوزه‌ها در ماده فرومغناطیس نرم به‌راحتی تغییر می‌کند (حوزه‌ها به حالت اولیه بازمی‌گردند). گزینه ۲ صحیح است."
    },

    // ---------- سوال ۹ ----------
    {
      id: 9,
      text: "شکل‌های (الف) و (ب) مربوط به ماده‌ای است که درون میدان مغناطیسی خارجی با اندازه‌های متفاوت قرارگرفته است. نوع این ماده کدام است و میدان مغناطیسی در کدام شکل قوی‌تر است؟",
      image: "/img/magnetism_qe9.png",
      options: [
        "پارامغناطیس - الف",
        "فرومغناطیس - الف",
        "پارامغناطیس - ب",
        "فرومغناطیس - ب"
      ],
      correctIndex: 1,
      answer: "این ماده دارای حوزه‌های مغناطیسی است؛ بنابراین فرومغناطیس است. از طرفی حجم حوزه‌ها در شکل (الف) بیشتر است (حوزه‌ها نسبت به شکل (ب) رشد کرده‌اند)؛ بنابراین میدان مغناطیسی خارجی در شکل (الف) قوی‌تر است. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۰ ----------
    {
      id: 10,
      text: "ﮐﺪام ﮔﺰﯾﻨﻪ در ﻣﻮرد ﻣﻮاد ﭘﺎراﻣﻐﻨﺎﻃﯿﺲ ﻧﺎدرﺳﺖ اﺳﺖ؟",
      options: [
        "دوقطبی‌های مغناطیسی به‌صورت کاتوره‌ای قرار می‌گیرند.",
        "در میدان‌های قوی مغناطیسی، خاصیت مغناطیسی پیدا می‌کنند.",
        "مرز بین حوزه‌های مغناطیسی به راحتی جابه‌جا می‌شود.",
        "در صورت خروج از میدان مغناطیسی، دوقطبی‌های آن به سرعت به وضعیت کاتوره‌ای اولیه خود برمی‌گردند."
      ],
      correctIndex: 2,
      answer: "در مواد فرومغناطیس نرم، مرز بین حوزه‌های مغناطیسی به راحتی جابه‌جا می‌شود و در نتیجه با اعمال میدان خارجی به سرعت مغناطیده شده و با حذف میدان نیز به سرعت خاصیت مغناطیسی خود را از دست می‌دهند. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۱۱ ----------
    {
      id: 11,
      text: "چه تعداد از موارد زیر غلط است؟\nالف) مواد پارامغناطیسی، دارای حوزه‌های مغناطیسی هستند.\nب) همۀ فلزات، فرومغناطیسی هستند.\nپ) از آلومینیوم می‌توان به‌عنوان هستۀ سیملوله استفاده کرد.\nت) فولاد، نیکل و کبالت جزء مواد فرومغناطیسی نرم هستند.\nث) کوچک‌ترین ذرات سازندۀ مواد مغناطیسی، اتم‌ها یا مولکول‌ها، مانند دوقطبی‌های مغناطیسی رفتار می‌کنند.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "همه عبارت‌ها به‌جز (ث) نادرست هستند:\nالف) نادرست: مواد پارامغناطیس حوزه مغناطیسی ندارند.\nب) نادرست: همه فلزات فرومغناطیس نیستند (مثل مس و آلومینیوم).\nپ) نادرست: آلومینیوم پارامغناطیس است و برای هسته سیملوله مناسب نیست.\nت) نادرست: فولاد و کبالت فرومغناطیس سخت هستند.\nث) درست: اتم‌ها مانند دوقطبی‌های مغناطیسی رفتار می‌کنند.\nبنابراین ۴ مورد غلط است. گزینه 1 صحیح است."
    },

    // ---------- سوال ۱۳ ----------
    {
      id: 13,
      text: "کدام‌یک از گزینه‌های زیر درست است؟",
      options: [
        "مواد پارامغناطیسی هرگز خاصیت مغناطیسی از خود نشان نمی‌دهند.",
        "در مواد فرومغناطیسی، حوزه‌های مغناطیسی در حالت عادی با یکدیگر هم‌جهت‌اند.",
        "مواد فرومغناطیسی نرم به‌سختی خاصیت آهنربایی خود را از دست می‌دهند.",
        "خاصیت مغناطیسی مواد مغناطیسی از کوچک‌ترین اجزای سازندۀ آن‌ها نشأت می‌گیرد."
      ],
      correctIndex: 2,
      answer: "خاصیت مغناطیسی مواد از کوچک‌ترین اجزای سازندۀ آن‌ها (اتم‌ها و الکترون‌ها) نشأت می‌گیرد. گزینه 3 صحیح است."
    },

    // ---------- سوال ۱۴ ----------
    {
      id: 14,
      text: "چند مورد از عبارت‌های زیر نادرست است؟\nآ) بخشی از یک ماده که دوقطبی‌های مغناطیسی درون آن به‌طور کامل هم‌خط هستند، حوزۀ مغناطیسی نام دارد.\nب) مواد پارامغناطیسی دوقطبی مغناطیسی دارند، اما حوزۀ مغناطیسی ندارند.\nپ) با قرار گرفتن مادۀ پارامغناطیسی در میدان مغناطیسی خارجی قوی، درصد بالایی از دوقطبی‌های مغناطیسی آن‌ها در راستای خط‌های میدان منظم می‌شوند.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "عبارت (آ) درست است (تعریف حوزه مغناطیسی). عبارت (ب) درست است (پارامغناطیس‌ها دوقطبی دارند اما حوزه ندارند). عبارت (پ) نادرست است؛ زیرا در مواد پارامغناطیس تنها درصد کمی (مختصری) از دوقطبی‌ها در راستای میدان منظم می‌شوند. بنابراین تنها ۱ مورد نادرست است. گزینه ۱ صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // ۱۵ دقیقه
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // ========== محاسبه درصد ==========
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

  // ========== انتخاب گزینه ==========
  const handleOptionClick = (questionId, optionIndex) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== تایمر ==========
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

  // ========== پایان زمان ==========
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
    <div style={{
      fontFamily: 'Tahoma, Arial, sans-serif',
      width: '100vw', minHeight: '100vh',
      padding: '15px 10px', backgroundColor: '#f8f9fa',
      direction: 'rtl', textAlign: 'right',
      boxSizing: 'border-box', overflowX: 'hidden'
    }}>

      {/* ==================== هدر ==================== */}
      <div style={{
        backgroundColor: '#1565C0', color: 'white',
        padding: '20px', borderRadius: '8px',
        marginBottom: '30px', textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/second-half/fizik-2-tajrobi/')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >
          ← بازگشت
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '26px' }}>
              🧲 آزمون ۱۰ سوال پیوسته - ویژگی مغناطیسی مواد
            </h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px', borderRadius: '50px',
            fontSize: '24px', fontWeight: 'bold',
            fontFamily: 'monospace', display: 'flex',
            alignItems: 'center', gap: '10px'
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
            marginBottom: '25px', backgroundColor: '#ffffff',
            padding: '20px 25px', borderRadius: '8px',
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              fontSize: '17px', lineHeight: '1.9',
              marginBottom: '20px', fontWeight: '500',
              display: 'flex', alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
            }}>
              <span style={{
                display: 'inline-block', backgroundColor: '#1565C0',
                color: 'white', width: '30px', height: '30px',
                textAlign: 'center', lineHeight: '30px',
                borderRadius: '50%', fontSize: '14px',
                marginLeft: '15px', flexShrink: 0, marginTop: '2px'
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            {q.image && (
              <div style={{
                display: 'flex', justifyContent: 'center',
                margin: '20px 0', padding: '15px',
                backgroundColor: '#fafafa', borderRadius: '8px',
                border: '1px dashed #ced4da',
                minHeight: '180px', alignItems: 'center'
              }}>
                {imageErrors[q.id] ? (
                  <div style={{ textAlign: 'center', color: '#6c757d', fontSize: '14px', padding: '30px' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                    <p style={{ margin: '5px 0 0 0', direction: 'ltr', fontFamily: 'monospace', fontSize: '12px', color: '#adb5bd' }}>{q.image}</p>
                  </div>
                ) : (
                  <img
                    src={q.image} alt={`شکل سوال ${index + 1}`}
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
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={isDisabled}
                    style={{
                      display: 'flex', alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px', textAlign: 'right',
                      transition: 'all 0.2s', width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1
                    }}
                  >
                    <span style={{
                      display: 'inline-block', width: '28px', height: '28px',
                      border: '1px solid #000', borderRadius: '50%',
                      textAlign: 'center', lineHeight: '28px',
                      fontSize: '14px', marginLeft: '15px',
                      backgroundColor: isSelected ? '#1565C0' : '#fff',
                      color: isSelected ? '#fff' : '#000', flexShrink: 0
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
          marginTop: '30px', marginBottom: '30px',
          padding: '20px', backgroundColor: '#ffffff',
          borderRadius: '12px', border: '1px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => { if (canCalculate) calculateScore(); }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px', fontSize: '18px',
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
                  color: '#fff', border: 'none', borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6
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
                width: '80%', maxWidth: '400px', height: '20px',
                backgroundColor: '#e9ecef', borderRadius: '10px',
                overflow: 'hidden', margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`, height: '100%',
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
                  padding: '10px 25px', fontSize: '14px',
                  backgroundColor: '#ff9800', color: '#fff',
                  border: 'none', borderRadius: '50px',
                  cursor: 'pointer', fontWeight: 'bold', marginTop: '10px'
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
              padding: '15px 40px', fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff', border: 'none', borderRadius: '50px',
              cursor: 'pointer', fontWeight: 'bold',
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
            marginTop: '30px', borderTop: '4px solid #1565C0',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #1565C0',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#1565C0'
            }}>
              📝 پاسخنامه تشریحی ویژگی مغناطیسی مواد
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
                      fontWeight: 'bold', color: '#1565C0',
                      backgroundColor: '#e3f2fd', padding: '5px 15px',
                      borderRadius: '20px', display: 'inline-block',
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
            textAlign: 'center', padding: '30px',
            backgroundColor: '#fff3cd', borderRadius: '12px',
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

export default MagneticPropertiesQuiz;