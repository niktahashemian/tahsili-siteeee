"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const MagnetismAndPolesQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال پیوسته از مغناطیس و قطب‌های مغناطیسی ====================
  const questions = [
    // ---------- سوال ۱۳ ----------
    {
      id: 13,
      text: "مطابق شکل زیر یک میله باردار را در نزدیکی یک عقربه مغناطیسی قرار می‌دهیم. عقربه چند درجه و در چه جهتی می‌چرخد تا به تعادل برسد؟",
      image: "/img/magnetism_q13.png",
      options: [
        "۹۰ در جهت (۱)",
        "۹۰ در جهت (۲)",
        "۱۸۰ در جهت (۲)",
        "عقربه مغناطیسی در این حالت نمی‌چرخد"
      ],
      correctIndex: 3,
      answer: "میدان مغناطیسی در اطراف میله باردار ساکن ایجاد نمی‌شود. بنابراین عقربه مغناطیسی اصلاً نمی‌چرخد. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۱۵ ----------
    {
      id: 15,
      text: "چه تعداد از جملات زیر درست است؟\nالف) قطب‌های مغناطیسی زمین کاملاً منطبق بر قطب‌های جغرافیایی زمین هستند.\nب) خطوط میدان مغناطیسی اطراف زمین از نزدیکی قطب جنوب جغرافیایی شروع و به نزدیکی قطب شمال جغرافیایی ختم می‌شوند.\nج) جهت میدان مغناطیسی زمین در طول هزاران تا میلیون‌ها سال همیشه ثابت بوده است.\nد) «شیب مغناطیسی» زاویه‌ای است که عقربه مغناطیسی با راستای شمال و جنوب می‌سازد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "الف نادرست است؛ قطب‌های مغناطیسی و جغرافیایی بر هم منطبق نیستند. ب درست است؛ خطوط میدان زمین از نزدیکی قطب جنوب جغرافیایی (قطب N مغناطیسی) شروع و به نزدیکی قطب شمال جغرافیایی (قطب S مغناطیسی) ختم می‌شوند. ج نادرست است؛ میدان زمین در طول زمان تغییر کرده و حتی بازآرایی داشته است. د نادرست است؛ شیب مغناطیسی زاویه میدان با سطح افق است. بنابراین تنها یک عبارت درست است."
    },

    // ---------- سوال ۱۷ ----------
    {
      id: 17,
      text: "خطوط میدان مغناطیسی بین دو آهنربا در شکل زیر نشان داده‌شده است. در مورد قطب‌های X و Y کدام گزینه درست است؟",
      image: "/img/magnetism_q17.png",
      options: [
        "xوy قطب s و قطب y از ﻗﻄﺐ  X قوی‌تر است.",
        "xوy قطب N و قطب y از ﻗﻄﺐ  X قوی‌تر است.",
        "xوy قطب s و قطب x از ﻗﻄﺐ  y قوی‌تر است.",
        "xوy قطب N و قطب x از ﻗﻄﺐ  y قوی‌تر است.",
        
      ],
      correctIndex: 2,
      answer: "خطوط میدان به هر دو قطب X و Y وارد شده‌اند؛ بنابراین هر دو قطب S هستند. تراکم خطوط میدان در اطراف X بیشتر است و این نشان می‌دهد قطب X قوی‌تر از Y است. گزینه 3 صحیح است."
    },

    // ---------- سوال ۱۹ ----------
    {
      id: 19,
      text: "در شکل زیر، اگر نقطه P در مرکز داخل زمین و نقطه Z روی خط استوا و بالای سطح زمین قرار داشته باشد، جهت میدان مغناطیسی به ترتیب از راست به چپ در نقاط P و Z برابر کدام گزینه است؟",
      image: "/img/magnetism_q19.png",
      options: ["پایین، بالا", "پایین، پایین", "بالا، بالا", "بالا، پایین"],
      correctIndex: 0,
      answer: "قطب‌های مغناطیسی زمین خلاف قطب‌های جغرافیایی آن هستند. در داخل زمین میدان از قطب S به N است، بنابراین در نقطه P جهت میدان به سمت پایین است. در بیرون زمین میدان از N به S است و در نقطه Z روی استوا جهت میدان به سمت بالا است. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۲۱ ----------
    {
      id: 21,
      text: "مطابق شکل، قطب‌نمایی را روی مسیر میز دایره‌ای حول آهنربا از نقطه (۱) به نقطه (۲) منتقل می‌کنیم. در نتیجه قطب‌نما ......... خواهد چرخید و اگر قبل از حرکت قطب‌نما، آهنربا حول نقطه O (وسط آهنربا) در همان صفحه ۹۰° پادساعتگرد بچرخد، قطب‌نما ......... خواهد چرخید.",
      image: "/img/magnetism_q21.png",
      options: [
        "۱۸۰ پادساعتگرد، ۹۰ ساعتگرد",
        "۳۶۰ پادساعتگرد، ۹۰ ساعتگرد",
        "۳۶۰ پادساعتگرد، ۹۰ پادساعتگرد",
        "۱۸۰ ساعتگرد، ۹۰ پادساعتگرد"
      ],
      correctIndex: 1,
      answer: "با جابه‌جایی قطب‌نما از نقطه (۱) به نقطه (۲) روی مسیر دایره‌ای، عقربه ۱۸۰ درجه و در جهت پادساعتگرد می‌چرخد. اگر آهنربا ۹۰ درجه پادساعتگرد بچرخد، عقربه مغناطیسی ۹۰ درجه ساعتگرد می‌چرخد. گزینه 2 صحیح است."
    },

    // ---------- سوال ۲۳ ----------
    {
      id: 23,
      text: "کدام عبارت صحیح است؟\nالف) از آنجا که میدان الکتریکی و مغناطیسی کمیتی برداری هستند، می‌توان آن‌ها را با توجه به قوانین برداری جمع کرد.\nب) قطب‌های مغناطیسی و جغرافیایی زمین فاصله کمی دارند.\nپ) دو قطعه که در اثر نیروی مغناطیسی یکدیگر را جذب یا دفع می‌کنند حتماً آهنربا هستند.\nت) حرکت الکترون به دور هسته در ایجاد خاصیت مغناطیسی اتم نقش دارد.",
      options: ["الف", "ب", "پ", "ت"],
      correctIndex: 3,
      answer: "الف نادرست است؛ میدان الکتریکی و مغناطیسی دو کمیت فیزیکی متفاوت هستند و جمع مستقیم آن‌ها معنا ندارد. ب نادرست است؛ فاصله قطب‌های مغناطیسی و جغرافیایی زمین کم نیست. پ نادرست است؛ جاذبه می‌تواند ناشی از القای مغناطیسی هم باشد. ت درست است؛ حرکت الکترون‌ها به دور هسته در ایجاد خاصیت مغناطیسی اتم نقش دارد. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۲۵ ----------
    {
      id: 25,
      text: "کدام گزینه درباره قطب‌نما درست است؟",
      options: [
        "قطب‌های جغرافیایی را در نیم‌کره شمالی و جنوبی برعکس هم نشان می‌دهد.",
        "قطب‌های جغرافیایی زمین را دقیق نشان می‌دهد.",
        "قطب‌های مغناطیسی زمین را با اندکی انحراف نشان می‌دهد.",
        "قطب‌های جغرافیایی زمین را با اندکی انحراف نشان می‌دهد."
      ],
      correctIndex: 3,
      answer: "قطب‌های مغناطیسی زمین بر قطب‌های جغرافیایی منطبق نیستند و فاصله زیادی با آن‌ها دارند. بنابراین عقربه مغناطیسی قطب‌نما در جهت شمال واقعی جغرافیایی قرار نمی‌گیرد و تا حدودی از شمال جغرافیایی انحراف دارد. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۲۷ ----------
    {
      id: 27,
      text: "در شکل زیر P1 و P2 دو قطب دو آهنربای میله‌ای هستند. با توجه به جهت عقربه مغناطیسی در نقطه O روی عمودمنصف پاره‌خط P1P2 که به حالت تعادل درآمده است، می‌توان دریافت P1، قطب ...... آهنربای (۱) بوده و آهنربای ...... قوی‌تر است.",
      image: "/img/magnetism_q27.png",
      options: [
        "P1 قطب N است و آهنربای (۱) قوی‌تر است.",
        "P1 قطب N است و آهنربای (۲) قوی‌تر است.",
        "P1 قطب S است و آهنربای (۱) قوی‌تر است.",
        "P1 قطب S است و آهنربای (۲) قوی‌تر است."
      ],
      correctIndex: 0,
      answer: "در نقطه O عقربه مغناطیسی در جهت برآیند میدان مغناطیسی آهنرباها قرار می‌گیرد. با توجه به جهت عقربه، قطب P1 قطب N خواهد بود. همچنین چون زاویه برآیند میدان با میدان آهنربای (۱) کوچک‌تر است، آهنربای (۱) قوی‌تر است. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۲۹ ----------
    {
      id: 29,
      text: "دو آهنربای میله‌ای را مطابق شکل، زیر یک صفحه کاغذ افقی قرار داده و روی صفحه براده‌های آهن می‌پاشیم. خطوط میدان مغناطیسی به‌صورت کدام‌یک از شکل‌های زیر درمی‌آید؟",
      image: "/img/magnetism_q29.png",
      options: ["شکل ۱", "شکل ۲", "شکل ۳", "شکل ۴"],
      correctIndex: 2,
      answer: "هنگامی که قطب‌های هم‌نام در مجاورت هم قرار می‌گیرند، خطوط میدان مطابق شکل گزینه ۳ بوده و رانش مغناطیسی دو قطب هم‌نام را نشان می‌دهد. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۳۱ ----------
    {
      id: 31,
      text: "چه تعداد از عبارات زیر صحیح است؟\nالف) بزرگی میدان مغناطیسی در وسط آهنربا بیشتر از دو قطب آن است.\nب) میدان مغناطیسی زمین در قطب‌های آن بزرگی بیشتری دارد.\nپ) خطوط میدان مغناطیسی، خطوط بسته هستند.\nت) خط‌های میدان مغناطیسی یکدیگر را قطع نمی‌کنند.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "الف نادرست است؛ میدان مغناطیسی آهنربا در قطب‌های آن شدت بیشتری دارد. ب درست است؛ میدان مغناطیسی زمین در نزدیکی قطب‌ها بزرگ‌تر است. پ درست است؛ خطوط میدان مغناطیسی خطوطی بسته هستند. ت درست است؛ خطوط میدان مغناطیسی یکدیگر را قطع نمی‌کنند. بنابراین ۳ عبارت صحیح است. گزینه ۳ صحیح است."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>
              🧲 آزمون ۱۰ سوال پیوسته - مغناطیس و قطب‌ها
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
              📝 پاسخنامه تشریحی مغناطیس و قطب‌ها
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

export default MagnetismAndPolesQuiz;