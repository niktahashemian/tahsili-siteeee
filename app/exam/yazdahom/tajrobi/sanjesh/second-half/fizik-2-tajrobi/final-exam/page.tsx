"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Fizik2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات فیزیک (۲) - جامع =================
  const questions = [
    // ==================== فصل اول: الکتریسیته ساکن ====================
    {
      id: 1,
      text: "بار الکتریکی یک الکترون چند کولن است؟",
      options: ["1.6 × 10⁻¹⁹ C", "1.6 × 10¹⁹ C", "9.1 × 10⁻³¹ C", "1.6 × 10⁻¹⁸ C"],
      correctIndex: 0,
      answer: "بار الکتریکی یک الکترون برابر با 1.6 × 10⁻¹⁹ کولن است."
    },
    {
      id: 2,
      text: "قانون کولن چه نوع نیرویی را توصیف می‌کند؟",
      options: ["نیروی گرانشی", "نیروی الکتریکی بین بارها", "نیروی مغناطیسی", "نیروی هسته‌ای"],
      correctIndex: 1,
      answer: "قانون کولن نیروی الکتریکی بین دو بار نقطه‌ای را توصیف می‌کند."
    },
    {
      id: 3,
      text: "واحد میدان الکتریکی در SI چیست؟",
      options: ["نیوتن بر کولن", "ولت بر متر", "ژول بر کولن", "هر دو گزینه اول و دوم"],
      correctIndex: 3,
      answer: "واحد میدان الکتریکی هم نیوتن بر کولن و هم ولت بر متر است."
    },
    {
      id: 4,
      text: "خطوط میدان الکتریکی از کجا شروع و به کجا ختم می‌شوند؟",
      options: ["از بار مثبت به بار منفی", "از بار منفی به بار مثبت", "از بی‌نهایت به بی‌نهایت", "هیچکدام"],
      correctIndex: 0,
      answer: "خطوط میدان الکتریکی از بار مثبت شروع و به بار منفی ختم می‌شوند."
    },
    {
      id: 5,
      text: "پتانسیل الکتریکی در نقطه‌ای به فاصله r از بار نقطه‌ای Q چگونه محاسبه می‌شود؟",
      options: ["V = kQ/r", "V = kQ/r²", "V = kQ²/r", "V = kQ/r³"],
      correctIndex: 0,
      answer: "پتانسیل الکتریکی V = kQ/r است."
    },
    {
      id: 6,
      text: "ظرفیت خازن تخت به چه عواملی بستگی دارد؟",
      options: ["مساحت صفحات", "فاصله صفحات", "نوع ماده دی‌الکتریک", "همه موارد"],
      correctIndex: 3,
      answer: "ظرفیت خازن تخت به مساحت صفحات، فاصله صفحات و نوع ماده دی‌الکتریک بستگی دارد."
    },

    // ==================== فصل دوم: جریان الکتریکی و مدارهای DC ====================
    {
      id: 7,
      text: "قانون اهم چه رابطه‌ای را بیان می‌کند؟",
      options: ["V = IR", "P = VI", "I = V/R", "هر دو گزینه اول و سوم"],
      correctIndex: 3,
      answer: "قانون اهم رابطه V = IR یا I = V/R را بیان می‌کند."
    },
    {
      id: 8,
      text: "واحد مقاومت الکتریکی چیست؟",
      options: ["اهم", "ولت", "آمپر", "وات"],
      correctIndex: 0,
      answer: "واحد مقاومت الکتریکی، اهم (Ω) است."
    },
    {
      id: 9,
      text: "در اتصال سری مقاومت‌ها، کدام یک از موارد زیر صادق است؟",
      options: ["جریان یکسان است", "ولتاژ یکسان است", "مقاومت معادل کمتر از هر مقاومت است", "هیچکدام"],
      correctIndex: 0,
      answer: "در اتصال سری، جریان از همه مقاومت‌ها یکسان عبور می‌کند."
    },
    {
      id: 10,
      text: "توان مصرفی یک مقاومت R با عبور جریان I چگونه محاسبه می‌شود؟",
      options: ["P = I²R", "P = V²/R", "P = VI", "همه موارد"],
      correctIndex: 3,
      answer: "توان مصرفی مقاومت به همه روش‌های P = I²R، P = V²/R و P = VI قابل محاسبه است."
    },
    {
      id: 11,
      text: "در اتصال موازی مقاومت‌ها، کدام یک از موارد زیر صادق است؟",
      options: ["ولتاژ یکسان است", "جریان یکسان است", "مقاومت معادل بزرگتر از هر مقاومت است", "هیچکدام"],
      correctIndex: 0,
      answer: "در اتصال موازی، ولتاژ دو سر همه مقاومت‌ها یکسان است."
    },
    {
      id: 12,
      text: "ثابت زمانی در مدار RC چه کاربردی دارد؟",
      options: ["زمان شارژ خازن", "زمان دشارژ خازن", "هر دو", "هیچکدام"],
      correctIndex: 2,
      answer: "ثابت زمانی τ = RC برای شارژ و دشارژ خازن کاربرد دارد."
    },

    // ==================== فصل سوم: مغناطیس ====================
    {
      id: 13,
      text: "قطب‌های مغناطیسی همنام چه رفتاری دارند؟",
      options: ["یکدیگر را دفع می‌کنند", "یکدیگر را جذب می‌کنند", "تأثیری ندارند", "بستگی به نوع ماده دارد"],
      correctIndex: 0,
      answer: "قطب‌های همنام یکدیگر را دفع و قطب‌های غیرهمنام یکدیگر را جذب می‌کنند."
    },
    {
      id: 14,
      text: "خطوط میدان مغناطیسی در خارج از آهنربا از کدام قطب شروع می‌شوند؟",
      options: ["از قطب شمال", "از قطب جنوب", "از هر دو قطب", "از مرکز آهنربا"],
      correctIndex: 0,
      answer: "خطوط میدان مغناطیسی در خارج از آهنربا از قطب N شروع و به قطب S ختم می‌شوند."
    },
    {
      id: 15,
      text: "نیروی وارد بر بار متحرک در میدان مغناطیسی با چه رابطه‌ای محاسبه می‌شود؟",
      options: ["F = qvB", "F = qvB sinθ", "F = qE", "F = mg"],
      correctIndex: 1,
      answer: "نیروی وارد بر بار متحرک در میدان مغناطیسی F = qvB sinθ است."
    },
    {
      id: 16,
      text: "واحد شار مغناطیسی در SI چیست؟",
      options: ["وبر", "تسلا", "نیوتن", "ژول"],
      correctIndex: 0,
      answer: "واحد شار مغناطیسی، وبر (Wb) است."
    },
    {
      id: 17,
      text: "قانون لنز در مورد القای الکترومغناطیسی چه می‌گوید؟",
      options: ["جریان القایی در جهت مخالف تغییر شار است", "جریان القایی در جهت تغییر شار است", "جریان القایی صفر است", "هیچکدام"],
      correctIndex: 0,
      answer: "قانون لنز می‌گوید جریان القایی در جهتی است که با تغییر شار مخالفت می‌کند."
    },
    {
      id: 18,
      text: "نیروی وارد بر سیم حامل جریان در میدان مغناطیسی با چه رابطه‌ای محاسبه می‌شود؟",
      options: ["F = BIL sinθ", "F = BIL", "F = qvB", "F = qE"],
      correctIndex: 0,
      answer: "نیروی وارد بر سیم حامل جریان F = BIL sinθ است."
    },

    // ==================== فصل چهارم: جریان متناوب ====================
    {
      id: 19,
      text: "فرکانس برق شهر در ایران چند هرتز است؟",
      options: ["50 Hz", "60 Hz", "100 Hz", "220 Hz"],
      correctIndex: 0,
      answer: "فرکانس برق شهر در ایران 50 هرتز است."
    },
    {
      id: 20,
      text: "رابطه بین ولتاژ مؤثر و ولتاژ بیشینه در جریان متناوب چیست؟",
      options: ["Vrms = Vmax/√2", "Vrms = Vmax×√2", "Vrms = Vmax/2", "Vrms = Vmax"],
      correctIndex: 0,
      answer: "ولتاژ مؤثر برابر با Vrms = Vmax/√2 است."
    },
    {
      id: 21,
      text: "در یک مدار RLC سری در رزونانس، کدام یک از موارد زیر صادق است؟",
      options: ["XL = XC", "Z = R", "جریان بیشینه است", "همه موارد"],
      correctIndex: 3,
      answer: "در رزونانس، XL = XC، امپدانس برابر با R و جریان بیشینه است."
    },
    {
      id: 22,
      text: "ضریب توان در مدارهای AC نشان‌دهنده چیست؟",
      options: ["نسبت توان مفید به توان ظاهری", "نسبت توان ظاهری به توان مفید", "نسبت ولتاژ به جریان", "نسبت فرکانس به ولتاژ"],
      correctIndex: 0,
      answer: "ضریب توان، نسبت توان مفید (واقعی) به توان ظاهری است."
    },
    {
      id: 23,
      text: "فرکانس زاویه‌ای (ω) با فرکانس (f) چه رابطه‌ای دارد؟",
      options: ["ω = 2πf", "ω = f/2π", "ω = 1/f", "ω = 2π/f"],
      correctIndex: 0,
      answer: "فرکانس زاویه‌ای ω = 2πf است."
    },
    {
      id: 24,
      text: "در ترانسفورماتور، نسبت ولتاژ ثانویه به اولیه برابر چیست؟",
      options: ["نسبت تعداد دورها", "نسبت عکس تعداد دورها", "نسبت جریان‌ها", "هیچکدام"],
      correctIndex: 0,
      answer: "در ترانسفورماتور Vs/Vp = Ns/Np است."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "اگر دو بار q1 و q2 در فاصله r از هم قرار گیرند، نیروی بین آنها با افزایش فاصله به ۲r چگونه تغییر می‌کند؟",
      options: ["به ۱/۴ کاهش می‌یابد", "به ۱/۲ کاهش می‌یابد", "۲ برابر می‌شود", "۴ برابر می‌شود"],
      correctIndex: 0,
      answer: "نیروی کولن با مجذور فاصله نسبت عکس دارد، پس در فاصله ۲r به ۱/۴ کاهش می‌یابد."
    },
    {
      id: 26,
      text: "کار انجام شده برای انتقال بار q بین دو نقطه با اختلاف پتانسیل V چقدر است؟",
      options: ["W = qV", "W = q/V", "W = V/q", "W = qV²"],
      correctIndex: 0,
      answer: "کار انجام شده برای انتقال بار برابر با W = qV است."
    },
    {
      id: 27,
      text: "در یک مدار سری با مقاومت‌های R1 و R2، ولتاژ کل چگونه تقسیم می‌شود؟",
      options: ["نسبت مستقیم با مقاومت", "نسبت عکس با مقاومت", "به طور مساوی", "بستگی به جریان دارد"],
      correctIndex: 0,
      answer: "در مدار سری، ولتاژ به نسبت مستقیم با مقاومت تقسیم می‌شود."
    },
    {
      id: 28,
      text: "القاگر (سلف) در مدار DC چه رفتاری دارد؟",
      options: ["مثل اتصال کوتاه است", "مثل مدار باز است", "مثل مقاومت عمل می‌کند", "هیچکدام"],
      correctIndex: 0,
      answer: "در مدار DC، سلف مانند اتصال کوتاه عمل می‌کند."
    },
    {
      id: 29,
      text: "خازن در مدار DC چه رفتاری دارد؟",
      options: ["مثل مدار باز است", "مثل اتصال کوتاه است", "مثل مقاومت عمل می‌کند", "هیچکدام"],
      correctIndex: 0,
      answer: "در مدار DC، خازن مانند مدار باز عمل می‌کند."
    },
    {
      id: 30,
      text: "موتور الکتریکی بر اساس چه پدیده‌ای کار می‌کند؟",
      options: ["نیروی مغناطیسی بر جریان", "القای الکترومغناطیسی", "نیروی الکتریکی", "نیروی گرانشی"],
      correctIndex: 0,
      answer: "موتور الکتریکی بر اساس نیروی مغناطیسی وارد بر جریان الکتریکی کار می‌کند."
    },
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
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
        backgroundColor: '#1565C0',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/sanjesh/second-half/fizik-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون جامع فیزیک (۲)</h1>
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
                backgroundColor: '#1565C0',
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
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>
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
              📝 پاسخنامه تشریحی فیزیک (۲)
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
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح:</span> 
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

export default Fizik2FinalExam;