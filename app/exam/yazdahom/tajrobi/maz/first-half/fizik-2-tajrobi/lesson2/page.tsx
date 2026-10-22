"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const ChargeQuantizationQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات: ایستگی و کوانتیده بودن بار الکتریکی =================
  const questions = [
    // سوال ۱ - صفحه ۲
    {
      id: 1,
      text: "بار الکتریکی اتم اکسیژن دو بار یونیزه (O²⁺) چند برابر بار الکتریکی هسته اتم اکسیژن (۸O) است؟",
      options: ["۴", "۲", "۱/۲", "۱/۴"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: عدد اتمی اکسیژن ۸ است (۸ پروتون). بار هسته = +۸e. اتم اکسیژن ۲ بار یونیزه (O²⁺) یعنی ۲ الکترون از دست داده، پس بار آن = +۲e. نسبت = ۲e/۸e = ۱/۴. گزینه 4 صحیح است."
    },
    // سوال ۱۳ - صفحه ۴
    {
      id: 13,
      text: "کدام‌یک از گزینه‌های زیر، بار الکتریکی یک جسم نمی‌تواند باشد؟ (e = ۱/۶ × ۱۰⁻¹⁹ C)",
      options: ["۸ × ۱۰⁻⁸ nC", "۸ × ۱۰⁻⁷ pC", "۰/۰۰۰۸ × ۱۰⁻¹⁰ mC", "۰/۰۰۰۸ × ۱۰⁻¹¹ µC"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: بار باید مضرب صحیحی از e باشد. گزینه ۳: q/e = (۰/۰۰۰۸×۱۰⁻¹⁰×۱۰⁻³)/(۱/۶×۱۰⁻¹⁹) = ۰/۵ که عدد صحیح نیست. گزینه ۳ صحیح است."
    },
    // سوال ۱۴ - صفحه ۴
    {
      id: 14,
      text: "جسمی نارسانا در اثر مالش به جسم نارسانای دیگری ۱۰⁵ الکترون از دست می‌دهد. نوع و مقدار بار الکتریکی جسم به ترتیب کدام است؟ (e = ۱/۶ × ۱۰⁻¹⁹ C)",
      options: ["مثبت - ۱/۶ × ۱۰⁻⁸ µC", "منفی - ۱/۶ × ۱۰⁻⁸ µC", "مثبت - ۱/۶ × ۱۰⁻¹⁴ µC", "منفی - ۱/۶ × ۱۰⁻¹⁴ µC"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: جسم الکترون از دست داده، پس بار مثبت پیدا می‌کند. q = ne = ۱۰⁵ × ۱/۶×۱۰⁻¹⁹ = ۱/۶×۱۰⁻¹⁴ C = ۱/۶×۱۰⁻⁸ µC. گزینه ۱ صحیح است."
    },
    // سوال ۲۳ - صفحه ۶
    {
      id: 24,
      text: "در یک یون دو بار مثبت (X²⁺) اندازه بار الکتریکی الکترون‌های آن برابر با ۴/۸ × ۱۰⁻¹⁸ C است. تعداد پروتون‌های این اتم کدام است؟",
      options: ["۳۰", "۲۸", "۳۲", "۳۶"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: تعداد الکترون‌های یون = ۴/۸×۱۰⁻¹⁸ / ۱/۶×۱۰⁻¹⁹ = ۳۰. چون یون ۲ بار مثبت است، اتم خنثی ۲ الکترون بیشتر داشته: ۳۰ + ۲ = ۳۲ پروتون. گزینه ۳ صحیح است."
    },
    // سوال ۲۴ - صفحه ۶
    {
      id: 25,
      text: "یک جسم از طریق تماس دارای بار الکتریکی شده است. چند کولن الکتریسیته ممکن است به جسم منتقل شده باشد؟ (e = ۱/۶ × ۱۰⁻¹⁹ C)",
      options: ["۴ × ۱۰⁻¹⁹", "۸ × ۱۰⁻¹⁹", "۸/۶ × ۱۰⁻¹⁹", "۱۷/۲ × ۱۰⁻¹⁹"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: بار باید مضرب صحیحی از e باشد. ۸×۱۰⁻¹⁹ / ۱/۶×۱۰⁻¹⁹ = ۵ (عدد صحیح). گزینه ۲ صحیح است."
    },
    // سوال ۲۵ - صفحه ۸
    {
      id: 35,
      text: "دو کرة فلزی مشابه A و B به ترتیب دارای بارهای +۲۵ و +۱۵ میکروکولن هستند. اگر این دو کره را باهم تماس داده و سپس از هم جدا سازیم، تعداد الکترون‌های کدام کره نسبت به قبل افزایش می‌یابد؟",
      options: ["فقط کرة A", "فقط کرة B", "هر دو کرة A و B", "هیچ‌کدام از دو کره"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: پس از تماس، بار هر کره = (۲۵+۱۵)/۲ = ۲۰ µC. کرة A بارش کاهش یافته (۲۵→۲۰) پس الکترون گرفته. کرة B بارش افزایش یافته (۱۵→۲۰) پس الکترون داده. بنابراین تعداد الکترون‌های کرة B کاهش می‌یابد و کرة A افزایش. گزینه 1 صحیح است."
    },
    // سوال ۳۲ - صفحه ۸
    {
      id: 36,
      text: "بار الکتریکی هستهٔ یون X⁵⁺ برابر ۹/۶ × ۱۰⁻¹⁸ C است. مجموع بار الکتریکی الکترون‌های این یون چند میکروکولن است؟ (e = ۱/۶ × ۱۰⁻¹⁹ C)",
      options: ["۸/۸ × ۱۰⁻¹²", "۸/۸ × ۱۰⁻¹²", "-۸/۸ × ۱۰⁻¹²", "-۱/۰۴ × ۱۰⁻¹¹"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: تعداد پروتون‌ها = ۹/۶×۱۰⁻¹⁸ / ۱/۶×۱۰⁻¹⁹ = ۶۰. یون X⁵⁺ یعنی ۵ الکترون از دست داده، پس تعداد الکترون‌ها = ۶۰ - ۵ = ۵۵. بار الکترون‌ها = -۵۵ × ۱/۶×۱۰⁻¹⁹ = -۸/۸×۱۰⁻¹⁸ C = -۸/۸×۱۰⁻¹² µC. گزینه ۳ صحیح است."
    },
    // سوال ۳۴ - صفحه ۷
    {
      id: 34,
      text: "اگر از یک جسم باردار با بار -q تعداد ۲۵ میلیارد الکترون خارج کنیم، بار آن برابر با +۳q می‌شود. بار اولیه جسم کدام است؟ (e = ۱/۶ × ۱۰⁻¹⁹ C)",
      options: ["۱µC", "۱۰۰nC", "۱µC", "۱۰۰nC"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: q = ne = ۲۵×۱۰⁹ × ۱/۶×۱۰⁻¹⁹ = ۴×۱۰⁻⁹ C. بار اولیه = -q = -۴×۱۰⁻⁹ C. گزینه 2 صحیح است."
    },
    // سوال ۴۰ - صفحه ۷
    {
      id: 40,
      text: "کدام‌یک از گزینه‌های زیر نمی‌تواند بار الکتریکی یک جسم باشد؟ (e = ۱/۶ × ۱۰⁻¹⁹ C)",
      options: ["۳۲ × ۱۰⁻¹⁷ mC", "۴ × ۱۰⁻¹¹ µC", "۸ × ۱۰⁻۱۱ nC", "۵ × ۱۰⁻³ pC"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: بار باید مضرب صحیحی از e باشد. ۵×۱۰⁻¹³ pC = ۵×۱۰⁻²⁵ C. q/e = ۵×۱۰⁻²⁵/۱/۶×۱۰⁻¹⁹ = ۳/۱۲۵×۱۰⁻⁶ که عدد صحیح نیست. گزینه ۳ صحیح است."
    },
    // سوال ۴۵ - صفحه ۱۰
    {
      id: 45,
      text: "با دادن ۲۰۰۰ الکترون به جسمی اندازهٔ بار الکتریکی آن ۴۰ درصد کاهش یافته و علامت آن نیز تغییر می‌کند، بار الکتریکی اولیه کدام‌یک از گزینه‌های زیر است؟ (e = ۱/۶ × ۱۰⁻¹⁹ C)",
      options: ["۲۰ × ۱۰⁻¹⁹ nC", "۲۰× ۱۰⁻⁶ nC", "۲۰ × ۱۰⁻⁴ pC", "۲ × ۱۰⁻⁴ pC"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: q - 2000e = -0.6q → 1.6q = 2000e → q = 1250e = 1250×1.6×10⁻¹⁹ = 2×10⁻¹⁶ C = 20×10⁻⁴ pC. گزینه ۳ صحیح است."
    },
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
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
  }, [selectedAnswers, questions]);

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
        backgroundColor: '#1a237e',
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون ایستگی و کوانتیده بودن بار الکتریکی</h1>
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
                backgroundColor: '#1a237e',
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
                      border: isSelected ? '3px solid #1a237e' : '1px solid #dee2e6',
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
                      backgroundColor: isSelected ? '#1a237e' : '#fff',
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
                  backgroundColor: canCalculate ? '#1a237e' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a237e' }}>
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
            borderTop: '4px solid #1a237e',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #1a237e', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1a237e'
            }}>
              📝 پاسخنامه تشریحی - ایستگی و کوانتیده بودن بار الکتریکی
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
                      color: '#1a237e',
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
                    <span style={{ fontWeight: 'bold', color: '#1a237e' }}>📖 توضیح:</span> 
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

export default ChargeQuantizationQuiz;