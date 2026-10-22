"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Math2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات ریاضی (۲) - جامع =================
  const questions = [
    // ==================== فصل اول: تابع ====================
    {
      id: 1,
      text: "دامنه تابع f(x) = √(x-2) کدام است؟",
      options: ["x ≥ 2", "x > 2", "x ≤ 2", "x < 2"],
      correctIndex: 0,
      answer: "گزینه ۱: برای ریشه دوم، عبارت زیر ریشه باید نامنفی باشد: x-2 ≥ 0 → x ≥ 2"
    },
    {
      id: 2,
      text: "نوع تابع f(x) = 2x + 3 چیست؟",
      options: ["خطی", "درجه دوم", "نمایی", "لگاریتمی"],
      correctIndex: 0,
      answer: "گزینه ۱: تابع f(x) = 2x + 3 یک تابع خطی است (درجه ۱)."
    },
    {
      id: 3,
      text: "نقطه تلاقی تابع f(x) = 2x - 4 با محور xها کدام است؟",
      options: ["(2,0)", "(0,-4)", "(4,0)", "(-2,0)"],
      correctIndex: 0,
      answer: "گزینه ۱: برای یافتن نقطه تلاقی با محور x، f(x) = 0 → 2x - 4 = 0 → x = 2 → (2,0)"
    },
    {
      id: 4,
      text: "دامنه تابع f(x) = 1/(x-3) کدام است؟",
      options: ["R - {3}", "R", "x > 3", "x < 3"],
      correctIndex: 0,
      answer: "گزینه ۱: مخرج کسر نباید صفر شود، پس x ≠ 3 → دامنه R - {3}"
    },
    {
      id: 5,
      text: "ترکیب توابع (f∘g)(x) برای f(x) = 2x و g(x) = x + 1 چیست؟",
      options: ["2x + 2", "2x + 1", "2x - 1", "x + 2"],
      correctIndex: 0,
      answer: "گزینه ۱: (f∘g)(x) = f(g(x)) = 2(x+1) = 2x + 2"
    },
    {
      id: 6,
      text: "تابع f(x) = x² - 4 چه نوع تابعی است؟",
      options: ["زوج", "فرد", "نه زوج نه فرد", "هم زوج هم فرد"],
      correctIndex: 0,
      answer: "گزینه ۱: f(-x) = (-x)² - 4 = x² - 4 = f(x) → تابع زوج است."
    },

    // ==================== فصل دوم: مثلثات ====================
    {
      id: 7,
      text: "sin(30°) چند است؟",
      options: ["۰", "۱/۲", "√۳/۲", "۱"],
      correctIndex: 1,
      answer: "گزینه ۲: sin(30°) = 1/2"
    },
    {
      id: 8,
      text: "cos(60°) چند است؟",
      options: ["۰", "۱/۲", "√۳/۲", "۱"],
      correctIndex: 1,
      answer: "گزینه ۲: cos(60°) = 1/2"
    },
    {
      id: 9,
      text: "tan(45°) چند است؟",
      options: ["۰", "۱", "√۳", "۲"],
      correctIndex: 1,
      answer: "گزینه ۲: tan(45°) = 1"
    },
    {
      id: 10,
      text: "sin²(x) + cos²(x) = ?",
      options: ["۰", "۱", "۲", "sin²(x)"],
      correctIndex: 1,
      answer: "گزینه ۲: اتحاد مثلثاتی sin²(x) + cos²(x) = 1"
    },
    {
      id: 11,
      text: "cot(x) برابر با کدام است؟",
      options: ["sin(x)/cos(x)", "cos(x)/sin(x)", "1/tan(x)", "هر دو گزینه ۲ و ۳"],
      correctIndex: 3,
      answer: "گزینه ۴: cot(x) = cos(x)/sin(x) = 1/tan(x)"
    },
    {
      id: 12,
      text: "sin(90°) چند است؟",
      options: ["۰", "۱/۲", "۱", "√۳/۲"],
      correctIndex: 2,
      answer: "گزینه ۳: sin(90°) = 1"
    },

    // ==================== فصل سوم: حد و پیوستگی ====================
    {
      id: 13,
      text: "حد تابع f(x) = 3x + 2 در x→1 کدام است؟",
      options: ["۳", "۵", "۴", "۲"],
      correctIndex: 1,
      answer: "گزینه ۲: lim(x→1) (3x+2) = 3(1)+2 = 5"
    },
    {
      id: 14,
      text: "حد تابع f(x) = (x²-1)/(x-1) در x→1 کدام است؟",
      options: ["۰", "۱", "۲", "۳"],
      correctIndex: 2,
      answer: "گزینه ۳: (x²-1)/(x-1) = (x-1)(x+1)/(x-1) = x+1 → lim = 1+1 = 2"
    },
    {
      id: 15,
      text: "شرط پیوستگی تابع f در نقطه a چیست؟",
      options: ["حد چپ = حد راست", "حد تابع = f(a)", "حد چپ = f(a)", "حد راست = f(a)"],
      correctIndex: 1,
      answer: "گزینه ۲: تابع f در نقطه a پیوسته است اگر lim(x→a) f(x) = f(a)"
    },
    {
      id: 16,
      text: "حد تابع f(x) = 1/x در x→0+ کدام است؟",
      options: ["۰", "۱", "+∞", "-∞"],
      correctIndex: 2,
      answer: "گزینه ۳: وقتی x از سمت راست به ۰ نزدیک می‌شود، 1/x به +∞ میل می‌کند."
    },
    {
      id: 17,
      text: "حد تابع f(x) = sin(x)/x در x→0 کدام است؟",
      options: ["۰", "۱", "∞", "ناموجود"],
      correctIndex: 1,
      answer: "گزینه ۲: حد معروف lim(x→0) sin(x)/x = 1"
    },
    {
      id: 18,
      text: "تابع f(x) = |x| در x=0 چه ویژگی‌هایی دارد؟",
      options: ["پیوسته است و مشتق‌پذیر نیست", "پیوسته است و مشتق‌پذیر است", "ناپیوسته است", "حد ندارد"],
      correctIndex: 0,
      answer: "گزینه ۱: تابع قدر مطلق در x=0 پیوسته است ولی مشتق چپ و راست برابر نیستند."
    },

    // ==================== فصل چهارم: مشتق ====================
    {
      id: 19,
      text: "مشتق تابع f(x) = 3x² + 2x - 1 چیست؟",
      options: ["6x + 2", "6x - 2", "3x² + 2", "6x + 1"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 6x + 2"
    },
    {
      id: 20,
      text: "مشتق تابع f(x) = sin(x) چیست؟",
      options: ["cos(x)", "-cos(x)", "sin(x)", "tan(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق sin(x) برابر cos(x) است."
    },
    {
      id: 21,
      text: "مشتق تابع f(x) = e^x چیست؟",
      options: ["e^x", "xe^(x-1)", "e", "ln(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق e^x برابر خودش یعنی e^x است."
    },
    {
      id: 22,
      text: "مشتق تابع f(x) = ln(x) چیست؟",
      options: ["1/x", "x", "1", "ln(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق ln(x) برابر 1/x است."
    },
    {
      id: 23,
      text: "مشتق تابع f(x) = x⁵ - 2x³ + x چیست؟",
      options: ["5x⁴ - 6x² + 1", "5x⁴ - 6x³ + 1", "5x⁴ - 2x² + 1", "5x⁴ - 2x² + x"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 5x⁴ - 6x² + 1"
    },
    {
      id: 24,
      text: "نقطه بحرانی تابع f(x) = x² - 4x + 3 کدام است؟",
      options: ["x = 2", "x = 1", "x = 3", "x = -2"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 2x - 4 = 0 → x = 2"
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "معادله خطی که از دو نقطه (1,2) و (3,6) عبور می‌کند، کدام است؟",
      options: ["y = 2x", "y = 2x + 1", "y = 2x - 1", "y = x + 1"],
      correctIndex: 0,
      answer: "گزینه ۱: شیب = (6-2)/(3-1) = 4/2 = 2، سپس y-2 = 2(x-1) → y = 2x"
    },
    {
      id: 26,
      text: "تعداد ریشه‌های معادله x² - 5x + 6 = 0 چند است؟",
      options: ["۰", "۱", "۲", "۳"],
      correctIndex: 2,
      answer: "گزینه ۳: Δ = 25 - 24 = 1 > 0 → دو ریشه متمایز"
    },
    {
      id: 27,
      text: "مجموع ریشه‌های معادله x² - 4x + 3 = 0 کدام است؟",
      options: ["۴", "۳", "-۴", "-۳"],
      correctIndex: 0,
      answer: "گزینه ۱: در معادله درجه دوم ax² + bx + c = 0، مجموع ریشه‌ها = -b/a = 4"
    },
    {
      id: 28,
      text: "حد تابع f(x) = (x²-4)/(x-2) در x→2 کدام است؟",
      options: ["۴", "۲", "۰", "∞"],
      correctIndex: 0,
      answer: "گزینه ۱: (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2 → lim = 2+2 = 4"
    },
    {
      id: 29,
      text: "معکوس تابع f(x) = 2x + 1 کدام است؟",
      options: ["f⁻¹(x) = (x-1)/2", "f⁻¹(x) = 2x - 1", "f⁻¹(x) = (x+1)/2", "f⁻¹(x) = 2(x-1)"],
      correctIndex: 0,
      answer: "گزینه ۱: y = 2x + 1 → x = (y-1)/2 → f⁻¹(x) = (x-1)/2"
    },
    {
      id: 30,
      text: "مشتق تابع f(x) = cos(x) چیست؟",
      options: ["-sin(x)", "sin(x)", "cos(x)", "-cos(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق cos(x) برابر -sin(x) است."
    },
    {
      id: 31,
      text: "مشتق تابع f(x) = tan(x) چیست؟",
      options: ["sec²(x)", "csc²(x)", "sin(x)/cos²(x)", "1/cos²(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق tan(x) برابر sec²(x) است."
    },
    {
      id: 32,
      text: "مشتق تابع f(x) = 2ˣ چیست؟",
      options: ["2ˣ·ln(2)", "2ˣ", "x·2^(x-1)", "ln(2)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق aˣ برابر aˣ·ln(a) است، پس 2ˣ·ln(2)"
    },
    {
      id: 33,
      text: "مشتق تابع f(x) = √x چیست؟",
      options: ["1/(2√x)", "2√x", "1/√x", "x^(-1/2)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق √x = x^(1/2) برابر 1/(2√x) است."
    },
    {
      id: 34,
      text: "مشتق تابع f(x) = x²·sin(x) با استفاده از قاعده ضرب چیست؟",
      options: ["2x·sin(x) + x²·cos(x)", "2x·cos(x)", "x²·cos(x)", "2x·sin(x) - x²·cos(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 2x·sin(x) + x²·cos(x)"
    },
    {
      id: 35,
      text: "شیب خط مماس بر منحنی f(x) = x² در نقطه x = 1 کدام است؟",
      options: ["۲", "۱", "۰", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 2x → f'(1) = 2"
    },
    {
      id: 36,
      text: "نقطه مینیمم تابع f(x) = x² - 4x + 3 کدام است؟",
      options: ["(2,-1)", "(2,0)", "(1,-2)", "(3,0)"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 2x-4 = 0 → x=2، f(2) = 4-8+3 = -1 → (2,-1)"
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
        backgroundColor: '#1A237E',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/riyazi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📐 آزمون جامع ریاضی (۲)</h1>
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
                backgroundColor: '#1A237E',
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
                      border: isSelected ? '3px solid #1A237E' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
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
                      backgroundColor: isSelected ? '#1A237E' : '#fff',
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
                  backgroundColor: canCalculate ? '#1A237E' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1A237E' }}>
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
            borderTop: '4px solid #1A237E',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #1A237E', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1A237E'
            }}>
              📝 پاسخنامه تشریحی ریاضی (۲)
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
                      color: '#1A237E',
                      backgroundColor: '#e8eaf6',
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
                    <span style={{ fontWeight: 'bold', color: '#1A237E' }}>📖 توضیح:</span> 
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

export default Math2FinalExam;