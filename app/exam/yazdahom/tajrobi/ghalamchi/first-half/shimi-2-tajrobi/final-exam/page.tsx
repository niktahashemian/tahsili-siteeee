"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات شیمی (۲) - جامع =================
  const questions = [
    // ==================== فصل اول: ساختار اتم ====================
    {
      id: 1,
      text: "کدام یک از دانشمندان زیر مدل سیاره‌ای اتم را ارائه داد؟",
      options: ["رادرفورد", "تامسون", "بور", "دالتون"],
      correctIndex: 0,
      answer: "رادرفورد با آزمایش ورقه‌های طلا، مدل سیاره‌ای اتم را ارائه داد."
    },
    {
      id: 2,
      text: "عدد اتمی یک عنصر نشان‌دهنده چیست؟",
      options: ["تعداد پروتون‌ها", "تعداد نوترون‌ها", "تعداد الکترون‌ها", "جرم اتمی"],
      correctIndex: 0,
      answer: "عدد اتمی برابر با تعداد پروتون‌های موجود در هسته اتم است."
    },
    {
      id: 3,
      text: "ایزوتوپ‌های یک عنصر چه تفاوتی با هم دارند؟",
      options: ["تعداد نوترون‌ها", "تعداد پروتون‌ها", "تعداد الکترون‌ها", "عدد اتمی"],
      correctIndex: 0,
      answer: "ایزوتوپ‌های یک عنصر، تعداد نوترون‌های متفاوتی دارند."
    },
    {
      id: 4,
      text: "اصل طرد پائولی چه می‌گوید؟",
      options: ["هر اوربیتال حداکثر دو الکترون با اسپین مخالف دارد", "الکترون‌ها ابتدا اوربیتال‌های کم انرژی را پر می‌کنند", "الکترون‌ها در اوربیتال‌های هم‌انرژی به صورت جفت نشده قرار می‌گیرند", "هیچکدام"],
      correctIndex: 0,
      answer: "اصل طرد پائولی می‌گوید هر اوربیتال حداکثر دو الکترون با اسپین مخالف می‌تواند داشته باشد."
    },
    {
      id: 5,
      text: "کدام یک از موارد زیر از خواص تناوبی است؟",
      options: ["انرژی یونش", "الکترون‌خواهی", "الکترونگاتیوی", "همه موارد"],
      correctIndex: 3,
      answer: "انرژی یونش، الکترون‌خواهی و الکترونگاتیوی هر سه از خواص تناوبی هستند."
    },
    {
      id: 6,
      text: "در یک دوره از جدول تناوبی، با افزایش عدد اتمی، الکترونگاتیوی چگونه تغییر می‌کند؟",
      options: ["افزایش", "کاهش", "ثابت", "ابتدا افزایش سپس کاهش"],
      correctIndex: 0,
      answer: "در یک دوره، با افزایش عدد اتمی، الکترونگاتیوی افزایش می‌یابد."
    },

    // ==================== فصل دوم: پیوند شیمیایی ====================
    {
      id: 7,
      text: "پیوند یونی بین چه نوع اتم‌هایی تشکیل می‌شود؟",
      options: ["فلز و نافلز", "دو نافلز", "دو فلز", "همه موارد"],
      correctIndex: 0,
      answer: "پیوند یونی بین فلزها و نافلزها تشکیل می‌شود."
    },
    {
      id: 8,
      text: "در پیوند کووالانسی، الکترون‌ها چگونه به اشتراک گذاشته می‌شوند؟",
      options: ["به اشتراک گذاشتن الکترون‌ها", "انتقال الکترون", "دریافت الکترون", "هیچکدام"],
      correctIndex: 0,
      answer: "در پیوند کووالانسی، اتم‌ها الکترون‌های خود را به اشتراک می‌گذارند."
    },
    {
      id: 9,
      text: "پیوند فلزی با کدام یک از نظریه‌های زیر توضیح داده می‌شود؟",
      options: ["دریای الکترون", "لوئیس", "VSEPR", "هیبریداسیون"],
      correctIndex: 0,
      answer: "پیوند فلزی با نظریه دریای الکترون توضیح داده می‌شود."
    },
    {
      id: 10,
      text: "مولکول H₂O چه شکلی دارد؟",
      options: ["خطی", "زاویه‌ای (V شکل)", "سه وجهی", "چهار وجهی"],
      correctIndex: 1,
      answer: "مولکول H₂O به دلیل وجود دو جفت الکترون ناپیوندی، به شکل زاویه‌ای (V شکل) است."
    },
    {
      id: 11,
      text: "کدام یک از مولکول‌های زیر قطبی است؟",
      options: ["H₂O", "CO₂", "CH₄", "CCl₄"],
      correctIndex: 0,
      answer: "H₂O به دلیل داشتن ساختار نامتقارن و وجود جفت الکترون ناپیوندی، قطبی است."
    },

    // ==================== فصل سوم: اسیدها و بازها ====================
    {
      id: 12,
      text: "بر اساس نظریه آرنیوس، اسید ماده‌ای است که در آب تولید چه یونی می‌کند؟",
      options: ["H⁺", "OH⁻", "H₃O⁺", "Na⁺"],
      correctIndex: 0,
      answer: "بر اساس نظریه آرنیوس، اسید ماده‌ای است که در آب یون H⁺ تولید می‌کند."
    },
    {
      id: 13,
      text: "در نظریه برونستد-لوری، باز چه نقشی دارد؟",
      options: ["پذیرنده پروتون", "دهنده پروتون", "دهنده الکترون", "پذیرنده الکترون"],
      correctIndex: 0,
      answer: "در نظریه برونستد-لوری، باز پذیرنده پروتون است."
    },
    {
      id: 14,
      text: "pH یک محلول اسیدی با غلظت 0.01 مولار HCl چقدر است؟",
      options: ["2", "1", "3", "4"],
      correctIndex: 0,
      answer: "pH = -log[H⁺] = -log(0.01) = 2"
    },
    {
      id: 15,
      text: "در واکنش خنثی‌سازی، چه موادی تولید می‌شود؟",
      options: ["نمک و آب", "اسید و باز", "نمک و اسید", "باز و آب"],
      correctIndex: 0,
      answer: "در واکنش خنثی‌سازی، اسید و باز با هم واکنش داده و نمک و آب تولید می‌کنند."
    },
    {
      id: 16,
      text: "نقطه هم‌ارزی در تیتراسیون چه زمانی رخ می‌دهد؟",
      options: ["زمانی که مول‌های اسید برابر با مول‌های باز شود", "زمانی که pH برابر 7 شود", "زمانی که حجم اسید برابر با حجم باز شود", "همه موارد"],
      correctIndex: 0,
      answer: "نقطه هم‌ارزی زمانی رخ می‌دهد که مول‌های اسید و باز با هم برابر شوند."
    },

    // ==================== فصل چهارم: تعادل شیمیایی ====================
    {
      id: 17,
      text: "ثابت تعادل Kc برای واکنش aA + bB ⇌ cC + dD چگونه نوشته می‌شود؟",
      options: ["[C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ", "[A]ᵃ[B]ᵇ/[C]ᶜ[D]ᵈ", "[C][D]/[A][B]", "هیچکدام"],
      correctIndex: 0,
      answer: "ثابت تعادل به صورت [C]ᶜ[D]ᵈ/[A]ᵃ[B]ᵇ نوشته می‌شود."
    },
    {
      id: 18,
      text: "بر اساس اصل لوشاتلیه، افزایش دما در یک واکنش گرماده چه تأثیری دارد؟",
      options: ["تعادل به سمت واکنش معکوس می‌رود", "تعادل به سمت واکنش مستقیم می‌رود", "تعادل تغییری نمی‌کند", "مقدار ثابت تعادل تغییر نمی‌کند"],
      correctIndex: 0,
      answer: "در واکنش گرماده، افزایش دما باعث می‌شود تعادل به سمت واکنش معکوس (گرماگیر) برود."
    },
    {
      id: 19,
      text: "در یک محلول بافر، pH محلول با افزودن اسید یا باز چگونه تغییر می‌کند؟",
      options: ["تغییر جزئی", "تغییر شدید", "تغییر نمی‌کند", "وابسته به نوع بافر است"],
      correctIndex: 0,
      answer: "محلول بافر در برابر تغییرات pH مقاوم است و pH آن با افزودن اسید یا باز تغییر جزئی دارد."
    },
    {
      id: 20,
      text: "حاصل‌حل (Ksp) نشان‌دهنده چیست؟",
      options: ["حداکثر غلظت یون‌ها در محلول اشباع", "حداقل غلظت یون‌ها در محلول اشباع", "غلظت نمک در محلول", "هیچکدام"],
      correctIndex: 0,
      answer: "حاصل‌حل، حداکثر غلظت یون‌ها را در محلول اشباع نشان می‌دهد."
    },

    // ==================== فصل پنجم: شیمی آلی ====================
    {
      id: 21,
      text: "ساده‌ترین هیدروکربن کدام است؟",
      options: ["متان", "اتان", "پروپان", "بوتان"],
      correctIndex: 0,
      answer: "ساده‌ترین هیدروکربن، متان (CH₄) است."
    },
    {
      id: 22,
      text: "آلکن‌ها چه نوع هیدروکربنی هستند؟",
      options: ["دارای پیوند دوگانه کربن-کربن", "دارای پیوند سه‌گانه کربن-کربن", "دارای حلقه بنزنی", "فقط پیوند یگانه"],
      correctIndex: 0,
      answer: "آلکن‌ها هیدروکربن‌هایی هستند که دارای حداقل یک پیوند دوگانه کربن-کربن هستند."
    },
    {
      id: 23,
      text: "الکل‌ها چه گروه عاملی دارند؟",
      options: ["OH-", "CHO-", "COOH-", "CO-"],
      correctIndex: 0,
      answer: "الکل‌ها دارای گروه عاملی هیدروکسیل (-OH) هستند."
    },
    {
      id: 24,
      text: "استرها از واکنش چه موادی با هم تولید می‌شوند؟",
      options: ["الکل و اسید کربوکسیلیک", "آلدئید و کتون", "الکل و آلکن", "اسید و باز"],
      correctIndex: 0,
      answer: "استرها از واکنش تراکمی الکل و اسید کربوکسیلیک تولید می‌شوند."
    },
    {
      id: 25,
      text: "بنزن چه نوع ترکیبی است؟",
      options: ["آروماتیک", "آلیفاتیک", "آلکن", "آلکین"],
      correctIndex: 0,
      answer: "بنزن یک ترکیب آروماتیک با حلقه ۶ کربنی است."

    // ==================== سوالات ترکیبی ====================
    },
    {
      id: 26,
      text: "کدام یک از موارد زیر آرایش الکترونی صحیح برای عنصر سدیم (Na) با عدد اتمی ۱۱ است؟",
      options: ["1s²2s²2p⁶3s¹", "1s²2s²2p⁵3s²", "1s²2s²2p⁶3s²", "1s²2s²2p⁶3p¹"],
      correctIndex: 0,
      answer: "آرایش الکترونی سدیم: 1s²2s²2p⁶3s¹ است."
    },
    {
      id: 27,
      text: "در یک واکنش تعادلی، اگر غلظت مواد واکنش‌دهنده افزایش یابد، تعادل به کدام جهت حرکت می‌کند؟",
      options: ["به سمت محصولات", "به سمت واکنش‌دهنده‌ها", "تغییری نمی‌کند", "وابسته به دما است"],
      correctIndex: 0,
      answer: "بر اساس اصل لوشاتلیه، افزایش غلظت واکنش‌دهنده‌ها، تعادل را به سمت محصولات می‌برد."
    },
    {
      id: 28,
      text: "کدام یک از ترکیبات زیر اسید قوی است؟",
      options: ["HCl", "CH₃COOH", "H₂CO₃", "H₂S"],
      correctIndex: 0,
      answer: "HCl یک اسید قوی است و به طور کامل در آب تفکیک می‌شود."
    },
    {
      id: 29,
      text: "چه نوع پیوندی در مولکول NaCl وجود دارد؟",
      options: ["پیوند یونی", "پیوند کووالانسی", "پیوند فلزی", "پیوند هیدروژنی"],
      correctIndex: 0,
      answer: "NaCl یک ترکیب یونی است و پیوند یونی دارد."
    },
    {
      id: 30,
      text: "کدام یک از موارد زیر از گروه‌های عاملی کتون است؟",
      options: ["CO-", "CHO-", "COOH-", "OH-"],
      correctIndex: 0,
      answer: "گروه عاملی کتون، گروه کربونیل (CO-) است."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون جامع شیمی (۲)</h1>
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
              📝 پاسخنامه تشریحی شیمی (۲)
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

export default Shimi2FinalExam;