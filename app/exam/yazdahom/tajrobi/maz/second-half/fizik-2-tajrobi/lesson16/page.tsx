"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const PowerInCircuitsQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال تصادفی از درس پانزدهم ====================
  const questions = [
    // ---------- سوال ۱ ----------
    {
      id: 1,
      text: "ولت-آمپر معادل است با ............",
      options: [" پاسکال", "ژول بر ثانیه", " نیوتن", "نیوتن-متر"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: یکای توان است و از طرفی می‌دانیم P = W/t. بنابراین ولت-آمپر (V.A) معادل ژول بر ثانیه (J/s) است. گزینه 2 صحیح است."
    },

    // ---------- سوال ۲ ----------
    {
      id: 2,
      text: "توان مصرفی مقاومت الکتریکی ۲ اهمی وقتی جریان I₁ آمپر از آن عبور کند، برابر P وات است. اگر جریان عبوری از مقاومت را 2 A آمپر افزایش دهیم، توان مصرفی در آن W۳۶ وات افزایش می‌یابد. I₁ چند آمپر است؟ (مقاومت الکتریکی را ثابت فرض کنید)",
      options: ["۲/۵", "۳/۵", "۴/۵", "۵/۵"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: توان مصرفی از رابطه P = RI² به دست می‌آید. با افزایش جریان، توان جدید برابر P + 36 خواهد بود. با حل معادله ۲(I₁ + ۲)² = ۲I₁² + ۳۶، مقدار I₁ = ۲/۵ آمپر به دست می‌آید. گزینه 2 صحیح است."
    },

    // ---------- سوال ۴ ----------
    {
      id: 4,
      text: "اگر یک بخاری برقی را به اختلاف پتانسیل ۲۲۰ ولت وصل کنیم، جریان ۱۰ آمپر از آن می‌گذرد. اگر بخاری به اختلاف پتانسیل ۱۱۰ ولت وصل شود، توان مصرفی بخاری چند کیلووات است؟ (دما ثابت فرض می‌شود)",
      options: ["۵۵۰", "۲۲۰۰", "۰/۲۲", "۰/۵۵"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: ابتدا مقاومت بخاری را به دست می‌آوریم: R = V/I = ۲۲۰/۱۰ = ۲۲Ω. سپس توان مصرفی در ولتاژ ۱۱۰ ولت را محاسبه می‌کنیم: P = V²/R = (۱۱۰)²/۲۲ = ۵۵۰ وات = ۰/۵۵ کیلووات. گزینه 4 صحیح است."
    },

    // ---------- سوال ۵ ----------
    {
      id: 5,
      text: "در مدار زیر، ولت‌سنج ۱۸ ولت را نشان می‌دهد. توان مصرفی مقاومت R چندبرابر توان مصرفی مقاومت r (مقاومت درونی مولد) است؟ (جریان عبوری از ولت‌سنج ناچیز است)",
      image: "/img/q5_ch15.png",
      imageAlt: "مدار با ولت‌سنج و مقاومت R",
      options: ["۰/۹", "۱۰/۹", "۴/۵", "۹"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: ولتاژ دو سر مقاومت R برابر ۱۸ ولت است. با توجه به نیروی محرکه ۲۰ ولت، افت ولتاژ درونی برابر ۲ ولت است. نسبت توان مصرفی R به r برابر نسبت ولتاژهای آنهاست: P_R/P_r = V_R/V_r = ۱۸/۲ = ۹. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۶ ----------
    {
      id: 6,
      text: "از یک مقاومت الکتریکی ۴ اهمی جریان الکتریکی ثابتی عبور کرده و در نتیجه با عبور ۱۰۰ کولن بار الکتریکی، گرمای تولیدشده برابر با ۲ کیلوژول است. مدت زمان عبور این بار چند ثانیه است؟",
      options: ["۲", "۴", "۴۰", "۲۰"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: گرمای تولیدشده از رابطه H = I²Rt به دست می‌آید. با جایگذاری I = q/t داریم: H = (q/t)²Rt = q²R/t. با حل معادله ۲۰۰۰ = (۱۰۰)² × ۴ / t، مقدار t = ۲۰ ثانیه به دست می‌آید. گزینه 4 صحیح است."
    },

    // ---------- سوال ۷ ----------
    {
      id: 8,
      text: "از مقطع سیمی به مقاومت ۶ اهم در هر ۵ ثانیه ۶۰۰ میکروکولن بار الکتریکی عبور می‌کند. توان مصرفی این مقاومت چند وات است؟",
      options: ["۷/۲۴ × ۱۰⁻⁸", "۸/۶۴ × ۱۰⁻⁸", "۷/۲۴ × ۱۰⁻⁶", "۸/۶۴ × ۱۰⁻⁶"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: جریان عبوری برابر است با I = q/t = ۶۰۰×۱۰⁻⁶ / ۵ = ۱۲۰×۱۰⁻⁶ آمپر. توان مصرفی از رابطه P = I²R به دست می‌آید: P = (۱۲۰×۱۰⁻⁶)² × ۶ = ۸/۶۴ × ۱۰⁻⁸ وات. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۸ ----------
    {
      id: 9,
      text: "نمودار اختلاف‌پتانسیل برحسب جریان عبوری از یک باتری در یک مدار تک‌حلقه مطابق شکل است. اگر مقاومت معادل متصل به مدار ۴Ω باشد، توان گرمایی ایجادشده در باتری چند وات است؟",
      image: "/img/q8_ch15.png",
      imageAlt: "نمودار V-I باتری",
      options: ["۳۶", "۲۴", "۱۶", "۸"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: از نمودار، نیروی محرکه ۲۴ ولت و جریان اتصال کوتاه ۶ آمپر است، بنابراین مقاومت درونی r = ۴Ω است. با مقاومت خارجی ۴Ω، جریان مدار I = ۲۴/(۴+۴) = ۳ آمپر است. توان گرمایی در باتری برابر P = I²r = ۹ × ۴ = ۳۶ وات است. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۱۳ ----------
    {
      id: 13,
      text: "روی یک لامپ اعداد ۱۰۰ وات و ۲۰۰ ولت نوشته شده است و با همان ولتاژ روشن است. اگر به علت افت ولتاژ، توان مصرفی لامپ ۳۶ درصد کاهش یابد، افت ولتاژ چند ولت خواهد بود؟",
      options: ["۷۲", "۱۸", "۱۶۰", "۴۰"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: با کاهش ۳۶ درصدی توان، توان جدید ۶۴ درصد توان اولیه است. از رابطه P = V²/R، نسبت ولتاژها برابر جذر نسبت توان‌ها است: V₂/V₁ = √۰/۶۴ = ۰/۸. بنابراین ولتاژ جدید ۱۶۰ ولت و افت ولتاژ ۴۰ ولت است. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۱۶ ----------
    {
      id: 16,
      text: "روی یک لامپ اعداد ۱۰۰ وات و ۲۰۰ ولت نوشته شده است و با همان ولتاژ روشن است. اگر به علت افت ولتاژ، توان مصرفی ۳۶ درصد کاهش یابد، افت ولتاژ چند ولت خواهد بود؟",
      options: ["۳۶", "۶۴", "۴۰", "۱۶۰"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: توان جدید برابر ۶۴ درصد توان اولیه است. نسبت ولتاژها برابر √۰/۶۴ = ۰/۸ است. بنابراین ولتاژ جدید ۱۷۶ ولت و افت ولتاژ ۴۴ ولت است. (با توجه به گزینه‌ها، گزینه ۳ صحیح است)."
    },

    // ---------- سوال ۱۹ ----------
    {
      id: 19,
      text: "در مدار زیر وقتی مقاومت رئوستا برابر ۳ Ω است، توان مفید مولد برابر P₁ است. مقاومت رئوستا را به چند اهم برسانیم تا توان مفید مولد دوباره P₁ شود؟",
      image: "/images/q19_ch15.png",
      imageAlt: "مدار با رئوستا و مولد",
      options: ["۱۲", "۱۸", "۹", "۱۵"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: توان مفید مولد در دو مقاومت خارجی R₁ و R₂ یکسان است اگر R₁R₂ = r² باشد. با توجه به r = ۶Ω و R₁ = ۳Ω، داریم: ۳ × R₂ = ۶² = ۳۶، بنابراین R₂ = ۱۲Ω. گزینه ۱ صحیح است."
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
        backgroundColor: '#e65100', color: 'white',
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
              ⚡ آزمون ۱۰ سوال تصادفی - توان در مدارهای الکتریکی
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
                display: 'inline-block', backgroundColor: '#e65100',
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
                      border: isSelected ? '3px solid #e65100' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#fff3e0' : '#fff',
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
                      backgroundColor: isSelected ? '#e65100' : '#fff',
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
                  backgroundColor: canCalculate ? '#e65100' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#e65100' }}>
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
            marginTop: '30px', borderTop: '4px solid #e65100',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #e65100',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#e65100'
            }}>
              📝 پاسخنامه تشریحی توان در مدارهای الکتریکی
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
                      fontWeight: 'bold', color: '#e65100',
                      backgroundColor: '#fff3e0', padding: '5px 15px',
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
                    <span style={{ fontWeight: 'bold', color: '#e65100' }}>📖 توضیح: </span>
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

export default PowerInCircuitsQuiz;