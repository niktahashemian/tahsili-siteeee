"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const ElectricForceAndCircuitsQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال تصادفی از درس چهاردهم ====================
  const questions = [
    // ---------- سوال ۹۸ ----------
    {
      id: 98,
      text: "در مدار شکل زیر، آمپرسنج عدد ۶ A را نشان می‌دهد و اختلاف پتانسیل دو سر مولد ۰/۶ برابر نیروی محرکه مولد است. این در حالی است که اگر مولد مدار را تعویض کرده و از یک مولد با ۴۰ درصد نیروی محرکه و ۱۰ درصد مقاومت درونی بیشتر استفاده کنیم، باز هم آمپرسنج عدد قبلی را نشان می‌دهد. کدام گزینه نیروی محرکه مولد در SI را به درستی نشان می‌دهد؟",
      image: "/img/q98_ch14.png",
      imageAlt: "مدار با آمپرسنج و مولد",
      options: ["۱", "۱/۵", "۱۰", "۱۵"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: ابتدا با استفاده از رابطه V = ε - rI و شرایط داده شده، مقاومت درونی ۲Ω به دست می‌آید. سپس با جایگذاری در معادله جدید، ε = ۱۵V محاسبه می‌شود. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۱۰۰ ----------
    {
      id: 101,
      text: "در مدار شکل زیر، اگر لغزنده رئوستا به سمت راست جابه‌جا شود، عددی که ولت‌سنج ایده‌آل و آمپرسنج ایده‌آل نشان می‌دهند، چه تغییری خواهند کرد؟",
      image: "/img/q100_ch14.png",
      imageAlt: "مدار با رئوستا و ولت‌سنج/آمپرسنج",
      options: ["افزایش، افزایش", "افزایش، کاهش", "کاهش، کاهش", "کاهش، افزایش"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: با حرکت لغزنده به سمت راست، طول مقاومت رئوستا افزایش می‌یابد، بنابراین مقاومت کل مدار افزایش یافته و جریان (آمپرسنج) کاهش می‌یابد. از طرفی چون جریان کاهش یافته، افت پتانسیل درونی (Ir) کمتر شده و ولت‌سنج که ولتاژ دو سر مولد (ε - Ir) را نشان می‌دهد، افزایش می‌یابد. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۰۴ ----------
    {
      id: 105,
      text: "در مدار شکل زیر، ولت‌سنج در حالتی که کلید قطع است، ۲۴ V و بعد از وصل آن ۲۰ V را نشان می‌دهد. مقاومت درونی مولد چند اهم است؟",
      image: "/img/q104_ch14.png",
      imageAlt: "مدار با کلید و ولت‌سنج",
      options: ["۲", "۱", "۱/۵", "۰/۵"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: وقتی کلید قطع است، ولت‌سنج نیروی محرکه مولد را نشان می‌دهد، پس ε = ۲۴V. با وصل کلید، جریان مدار I = ۲۰/۵ = ۴A می‌شود. با استفاده از رابطه V = ε - rI داریم: ۲۰ = ۲۴ - r(۴) → r = ۱Ω. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۰۷ ----------
    {
      id: 108,
      text: "در مدار شکل زیر مقاومت درونی باتری ۲Ω و نسبت عددی که ولت‌سنج آرمانی نشان داده (V) به نیرومحرکه باتری ۰/۸ است. اگر ۰/۸ A آمپرسنج آرمانی را نشان دهد با قطع کلید عددی که ولت‌سنج نشان می‌دهد چند ولت می‌شود؟",
      image: "/img/q107_ch14.png",
      imageAlt: "مدار با باتری و کلید",
      options: ["۴۰", "۳۲", "۴۸", "۳۶"],
      correctIndex:0,
      answer: "طبق پاسخنامه: وقتی کلید قطع باشد، جریان مدار صفر شده و ولت‌سنج نیروی محرکه باتری را نشان می‌دهد. با استفاده از رابطه V = ε - rI داریم: ۰/۸ε = ε - ۲(۰/۸) → ε = ۸V. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۱۰۸ ----------
    {
      id: 109,
      text: "در شکل زیر، اگر جای آمپرسنج و ولت‌سنج عوض شود، کدام موارد درست است؟ (آمپرسنج و ولت‌سنج آرمانی فرض شوند)\nالف: عددی که آمپرسنج نشان می‌دهد، ۲ A کاهش می‌یابد.\nب: عددی که ولت‌سنج نشان می‌دهد، ۲ V افزایش می‌یابد.\nپ: اختلاف پتانسیل دو سر مقاومت ۵ اهمی، ۲ V کاهش می‌یابد.",
      image: "/img/q108_ch14.png",
      imageAlt: "مدار با آمپرسنج و ولت‌سنج",
      options: ["الف و ب", "الف و پ", "ب و پ", "الف، ب و پ"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: با تعویض جای آمپرسنج (آرمانی با مقاومت صفر) و ولت‌سنج (آرمانی با مقاومت بی‌نهایت)، حالت اول جریان ۲A و ولتاژ ۱۰V است. در حالت دوم جریان صفر (۲A کاهش) و ولتاژ به ۱۲V (۲V افزایش) می‌رسد و اختلاف پتانسیل مقاومت ۵Ω از ۱۰V به ۸V (۲V کاهش) می‌رسد. بنابراین هر سه مورد صحیح است. گزینه 1 صحیح است."
    },

    // ---------- سوال ۱۰۹ ----------
    {
      id: 110,
      text: "نمودار ولتاژ - جریان یک مولد مطابق شکل است. این مولد را به مقاومت چند اهمی متصل کنیم تا جریان خروجی از آن ۳ آمپر شود؟",
      image: "/img/q109_ch14.png",
      imageAlt: "نمودار V-I مولد",
      options: ["۴", "۸", "۶", "۱۲"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: از نمودار، عرض از مبدأ ε = ۲۴V و شیب r = ۲Ω است. با استفاده از رابطه I = ε/(R+r) داریم: ۳ = ۲۴/(R+۲) → R = ۶Ω. گزینه 1 صحیح است."
    },

    // ---------- سوال ۱۱۳ ----------
    {
      id: 114,
      text: "ولت‌سنجی آرمانی، اختلاف پتانسیل دو سر یک باتری را که به مداری وصل نیست، ۱۲ ولت نشان می‌دهد. حال اگر یک مقاومت ۸ اهمی را به دو سر آن ببندیم، ولت‌سنج اختلاف پتانسیل دو سر باتری را ۹/۶ ولت نشان می‌دهد. مقاومت درونی باتری چند اهم است؟",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: ε = ۱۲V و V = ۹/۶V. جریان مدار I = V/R = ۹/۶/۸ = ۱/۲A. مقاومت درونی r = (ε-V)/I = (۱۲-۹/۶)/۱/۲ = ۲Ω. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۲۰ ----------
    {
      id: 121,
      text: "برای محاسبه مقاومت داخلی یک باتری، مدار زیر طراحی شده است. اگر قبل و بعد از اتصال کلید k، اعدادی که ولت‌سنج نشان می‌دهد، به ترتیب ۱۸ V و ۱۲ V باشد، مقاومت داخلی باتری چند اهم است؟",
      image: "/img/q121_ch14.png",
      imageAlt: "مدار با باتری و کلید",
      options: ["۱", "۱/۵", "۳", "۶"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: ε = ۱۸V. با بستن کلید، V = ۱۲V و R = ۴Ω است. جریان I = ۱۲/۴ = ۳A. مقاومت داخلی r = (ε-V)/I = (۱۸-۱۲)/۳ = ۲Ω. (با توجه به گزینه‌ها، گزینه ۲ صحیح است)."
    },
    // ---------- سوال ۱۲۳ ----------
    {
      id: 123,
      text: "در مدار شکل زیر، اگر مقاومت R متغیر را از ۲r تا r کاهش دهیم، افت پتانسیل در باتری چند برابر می‌شود؟",
      image: "/img/q123_ch14.png",
      imageAlt: "مدار با مقاومت متغیر",
      options: ["۲", "۲/۵", "۳/۵", "۴"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: در حالت اول R=۲r، جریان I₁ = ε/۳r و افت پتانسیل V₁ = ε/۳. در حالت دوم R=r، جریان I₂ = ε/۲r و افت پتانسیل V₂ = ε/۲. نسبت V₂/V₁ = ۳/۲. گزینه 2 صحیح است."
    },

    // ---------- سوال ۱۲۸ ----------
    {
      id: 128,
      text: "یک باتری را یک بار به مقاومت خارجی ۳ Ω متصل می‌کنیم، اختلاف پتانسیل دو سر آن ۱۲ V می‌شود و بار دیگر آن را به مقاومت خارجی ۸ Ω متصل کرده و اختلاف پتانسیل دو سر آن ۱۶ V می‌شود. نیرومحرکه باتری چند ولت است؟",
      options: ["۲۵", "۲۴", "۲۰", "۲۷"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: در حالت اول I₁ = ۱۲/۳ = ۴A. در حالت دوم I₂ = ۱۶/۸ = ۲A. با استفاده از رابطه ε = V + rI داریم: ε = ۱۲ + ۴r و ε = ۱۶ + ۲r. از حل این دستگاه، r = ۲Ω و ε = ۲۰V به دست می‌آید. گزینه 3 صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
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
        backgroundColor: '#1A237E', color: 'white',
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
              ⚡ آزمون ۱۰ سوال تصادفی - نیروی محرکه و مدارها
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
                display: 'inline-block', backgroundColor: '#1A237E',
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
                    src={q.image} alt={q.imageAlt}
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
                      border: isSelected ? '3px solid #1A237E' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
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
                      backgroundColor: isSelected ? '#1A237E' : '#fff',
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
                  backgroundColor: canCalculate ? '#1A237E' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1A237E' }}>
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
            marginTop: '30px', borderTop: '4px solid #1A237E',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #1A237E',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#1A237E'
            }}>
              📝 پاسخنامه تشریحی نیروی محرکه و مدارها
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
                      fontWeight: 'bold', color: '#1A237E',
                      backgroundColor: '#e8eaf6', padding: '5px 15px',
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
                    <span style={{ fontWeight: 'bold', color: '#1A237E' }}>📖 توضیح: </span>
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

export default ElectricForceAndCircuitsQuiz;