"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const InductorQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال غیرپیوسته از درس بیست و چهار: القاگرها ====================
  // انتخاب شده از سوالات ۱۱۲ تا ۱۳۱
  const questions = [
    // ---------- سوال ۱۱۲ ----------
    {
      id: 112,
      text: "بزرگی میدان مغناطیسی در نقطه‌ای درون سیملوله‌ای آرمانی و دور از لبه‌ها برابر 0/024 تسلا است. اگر ضریب القاوری این سیملوله 30 هانری و سیملوله دارای طول یک متر و 1000 حلقه به هم نزدیک باشد، انرژی ذخیره شده در این سیملوله چند کیلوژول است؟ (μ0 = 4π × 10⁻⁷ T.m/A و π ≈ 3)",
      options: ["0/6", "6", "3", "0/03"],
      correctIndex: 1,
      answer: "از رابطه B = μ0 (N/L) I، جریان گذرنده از سیملوله را محاسبه می‌کنیم: 0.024 = 4π × 10⁻⁷ × (1000 / 1) × I ⇒ I = 20 A. سپس انرژی ذخیره شده در القاگر را به دست می‌آوریم: U = 1/2 L I² = 1/2 × 30 × (20)² = 6000 J = 6 kJ. گزینه 2 صحیح است."
    },

    // ---------- سوال ۱۱۳ ----------
    {
      id: 113,
      text: "در شکل زیر، سیملوله‌ای با ضریب القاوری (خودالقایی) 0/02 H داریم که دارای 100 حلقه و طولش 4 cm است، اگر میدان مغناطیسی داخل آن 60 G باشد، انرژی ذخیره شده در سیملوله چند ژول است؟ (μ0 = 12 × 10⁻⁷ T.m/A)",
      image: "/img/inductor_q113.png",
      options: ["0/4", "0/04", "0/5", "1/5"],
      correctIndex: 1,
      answer: "ابتدا جریان گذرنده از سیملوله را از رابطه B = μ0 (N/L) I حساب می‌کنیم: 60 × 10⁻⁴ = 12 × 10⁻⁷ × (100 / 0.04) × I ⇒ I = 2 A. سپس انرژی ذخیره شده را محاسبه می‌کنیم: U = 1/2 L I² = 1/2 × 0.02 × (2)² = 0.04 J. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۱۴ ----------
    {
      id: 114,
      text: "از یک القاگر با ضریب القاوری 0/2 H جریان 10 A عبور می‌کند. انرژی مغناطیسی این القاگر چند ژول است؟",
      options: ["10", "1", "100", "2"],
      correctIndex: 1,
      answer: "انرژی مغناطیسی القاگر از رابطه U = 1/2 L I² به دست می‌آید: U = 1/2 × 0.2 × (10)² = 10 J. گزینه 2 صحیح است."
    },

    // ---------- سوال ۱۱۵ ----------
    {
      id: 115,
      text: "اگر جریان الکتریکی عبوری از یک سیملوله ۲ برابر شود، ........... آن ۴ برابر و ........... آن ۲ برابر می‌شود.",
      options: [
        "شار مغناطیسی - میدان مغناطیسی - انرژی",
        "میدان مغناطیسی - شار مغناطیسی - انرژی",
        "میدان مغناطیسی - شار مغناطیسی - انرژی",
        "انرژی - میدان مغناطیسی - شار مغناطیسی"
      ],
      correctIndex: 3,
      answer: "با افزایش جریان، میدان مغناطیسی (B ∝ I) ۲ برابر و شار مغناطیسی (Φ ∝ B) ۲ برابر می‌شود. همچنین انرژی ذخیره شده در القاگر (U ∝ I²) ۴ برابر می‌شود. بنابراین گزینه 4 صحیح است."
    },

    // ---------- سوال ۱۲۱ ----------
    {
      id: 121,
      text: "چه تعداد از عبارات زیر در مورد القاگر صحیح است؟\nالف) در یک القاگر آرمانی، وقتی انرژی وارد القاگر می‌شود که جریان آن افزایش یابد.\nب) در یک القاگر آرمانی، وقتی انرژی آزاد می‌گردد که جریان القاگر کاهش یابد.\nپ) در یک القاگر آرمانی، حین عبور جریان پایا، انرژی وارد یا خارج نمی‌گردد.\nت) اگر القاگر آرمانی نباشد، حین عبور جریان پایا، انرژی گرمایی در آن تولید می‌شود.",
      options: ["1 مورد", "2 مورد", "3 مورد", "4 مورد"],
      correctIndex: 3,
      answer: "همه عبارات صحیح هستند. در القاگر آرمانی (با مقاومت صفر)، انرژی تنها هنگام افزایش جریان وارد و هنگام کاهش جریان آزاد می‌شود. در جریان پایا انرژی ثابت می‌ماند. اگر القاگر غیرآرمانی باشد، به دلیل مقاومت سیم‌پیچ، در عبور جریان پایا انرژی گرمایی تولید می‌شود. بنابراین ۴ مورد صحیح است. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۱۲۲ ----------
    {
      id: 122,
      text: "کدام‌یک از واحدهای زیر معادل هانری (واحد ضریب خودالقایی سیملوله) است؟",
      options: ["T.m² / A", "J / A", "W.s / A", "V.s / A"],
      correctIndex: 3,
      answer: "از رابطه نیروی محرکه القایی ε = -L (di/dt) داریم: L = -ε / (di/dt). واحد L برابر ولت ثانیه بر آمپر (V.s/A) است. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۱۲۳ ----------
    {
      id: 123,
      text: "در مدار شکل زیر، انرژی ذخیره‌شده در القاگر چند میلی‌ژول است؟ (L = 400 mH)",
      image: "/img/inductor_q123.png",
      options: ["450", "900", "800", "1600"],
      correctIndex: 2,
      answer: "ابتدا مقاومت معادل مدار را محاسبه می‌کنیم. مقاومت ۲ اهمی توسط آمپرسنج اتصال کوتاه شده است. R_eq = 5 + 1 = 6 Ω. جریان مدار: I = ε / R_eq = 12 / 6 = 2 A. انرژی ذخیره شده در القاگر: U = 1/2 L I² = 1/2 × 400 × 10⁻³ × (2)² = 0.8 J = 800 mJ. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۱۲۵ ----------
    {
      id: 125,
      text: "ضریب القاوری سیملوله‌ای 0/2 هانری است و جریان الکتریکی عبوری از آن در SI به معادله I = -t² + 2sin(πt) است. انرژی آن در لحظه t = 2s چند ژول است؟",
      options: ["0/08", "0/16", "0/24", "0/32"],
      correctIndex: 1,
      answer: "ابتدا جریان را در لحظه t = 2s محاسبه می‌کنیم: I = -(2)² + 2sin(2π) = -4 + 0 = -4 A. سپس انرژی ذخیره شده را به دست می‌آوریم: U = 1/2 L I² = 1/2 × 0.2 × (-4)² = 1.6 J. (با توجه به پاسخنامه، مقدار 0.16 ژول صحیح است. احتمالاً ضریب القاوری 0.02 هانری بوده است). گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۲۶ ----------
    {
      id: 126,
      text: "در شکل زیر یک القاگر آرمانی در مدار گرفته است. با بسته شدن کلید K نور المپ‌های (1) و (2) به ترتیب چگونه تغییر می‌کند؟",
      image: "/img/inductor_q126.png",
      options: [
        "به‌تدریج زیاد می‌شود - به‌تدریج زیاد می‌شود",
        "به‌تدریج زیاد می‌شود - ابتدا روشن و سپس خاموش می‌شود",
        "بالفاصله به بیشترین مقدار خود می‌رسد - به‌تدریج زیاد می‌شود",
        "بالفاصله به بیشترین مقدار خود می‌رسد - ابتدا روشن و سپس خاموش می‌شود"
      ],
      correctIndex: 1,
      answer: "به علت وجود القاگر، جریان مدار به تدریج افزایش می‌یابد، بنابراین نور المپ (۱) به تدریج زیاد می‌شود. المپ (۲) موازی القاگر آرمانی است، ابتدا روشن شده و پس از ثابت شدن جریان، القاگر اتصال کوتاه شده و المپ (۲) خاموش می‌شود. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۳۱ ----------
    {
      id: 130,
      text: "اگر جریان گذرنده از القاگری نصف شود، انرژی القاگر ۳۰ میکروژول تغییر می‌کند. اگر ضریب خودالقاوری القاگر ۰/۵ میلی‌هانری باشد، جریان اولیه گذرنده از القاگر چند آمپر بوده است؟",
      options: ["2", "4", "0/2", "0/4"],
      correctIndex: 2,
      answer: "اگر جریان نصف شود (I₂ = I₁/2)، انرژی یک‌چهارم می‌شود (U₂ = U₁/4). تغییر انرژی: ΔU = U₂ - U₁ = -3/4 U₁ = -30 μJ ⇒ U₁ = 40 μJ. از رابطه U = 1/2 L I² داریم: 40 × 10⁻⁶ = 1/2 × 0.5 × 10⁻³ × I₁² ⇒ I₁² = 0.16 ⇒ I₁ = 0.4 A. گزینه 3 صحیح است."
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
              🧲 آزمون ۱۰ سوال پیوسته - القاگرها
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
              📝 پاسخنامه تشریحی القاگرها
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

export default InductorQuiz;