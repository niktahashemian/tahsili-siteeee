"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2IronIdentification = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات شناسایی کاتیون‌های آهن (صفحات ۵۱ تا ۵۳) =================
  const questions = [
    {
      id: 268,
      text: "در دو لولهٔ آزمایش زیر که شامل محلول حاوی یون‌های Fe²⁺ و Fe³⁺ هستند، قطره‌قطره محلول سدیم هیدروکسید می‌افزاییم. در لولهٔ ۱ و ۲ به ترتیب رسوب‌های ...... و ...... رنگی تشکیل می‌شود.",
      options: ["سبز ژلاتینی - قرمز قهوه‌ای", "قرمز قهوه‌ای - سبز ژلاتینی", "سفید - سبز ژلاتینی", "سفید - قرمز قهوه‌ای"],
      correctIndex: 0,
      answer: "گزینه ۱ صحیح است. واکنش یون Fe²⁺ با NaOH رسوب سبز ژلاتینی Fe(OH)₂ و واکنش یون Fe³⁺ با NaOH رسوب قرمز قهوه‌ای Fe(OH)₃ تولید می‌کند."
    },
    {
      id: 271,
      text: "کدام گزینه زیر نادرست است؟\n۱) برای شناسایی کاتیون یک فلز موجود در محلول، باید آنیونی به محلول اضافه شود تا با کاتیون موردنظر رسوب دهد.\n۲) از محلول پتاسیم هیدروکسید می‌توان برای شناسایی یون آهن استفاده کرد.\n۳) طی واکنش آهن (II) کلرید با سدیم هیدروکسید، رسوبی قرمز متمایل به قهوه‌ای رنگ حاصل می‌شود.\n۴) برای شناسایی کاتیون موجود در زنگ آهن، باید زنگ آهن را در هیدروکلریک اسید حل کرد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. واکنش آهن (II) کلرید با سدیم هیدروکسید، رسوب سبز ژلاتینی Fe(OH)₂ می‌دهد، نه رسوب قرمز قهوه‌ای. رسوب قرمز قهوه‌ای مربوط به آهن (III) هیدروکسید است."
    },
    {
      id: 273,
      text: "دو واکنش زیر مربوط به شناسایی کاتیون موجود در اکسیدی از آهن است. کدام مطلب درست است؟ (Fe = ۵۶، O = ۱۶: g.mol⁻¹)\nI)اﮐﺴﯿﺪ آﻫﻦ + HCl(aq) → A(aq) + H₂O(l)\nII) A(aq) + NaOH(aq) → Fe(OH)₂(x) + NaCl(y)",
      options: ["نسبت استوکیومتری کاتیون به آنیون در هر دو ترکیب A و اکسید آهن یکسان و برابر با ۳ است.", "حالت فیزیکی x و y به ترتیب aq و s است.", "نسبت مجموع ضرایب مواد در معادلهٔ موازنه‌شدهٔ (I) به واکنش (II) برابر با ۱/۲ است.", "در هر گرم از این اکسید آهن، ۰/۷ گرم آهن وجود دارد."],
      correctIndex: 3,
      answer: "گزینه ۴ درست است. اکسید آهن Fe₂O₃ است و درصد آهن آن: (۲×۵۶)/(۲×۵۶+۳×۱۶) = ۱۱۲/۱۶۰ = ۰/۷ یعنی ۷۰٪ آهن. بررسی سایر گزینه‌ها: گزینه ۱ نادرست (A همان FeCl₃ با نسبت ۱/۳)، گزینه ۲ نادرست (x جامد و y محلول است)، گزینه ۳ نادرست."
    },
    {
      id: 275,
      text: "برای تشخیص کاتیون موجود در زنگ آهن، واکنش‌های زیر را انجام می‌دهیم. کدام‌یک نادرست است؟ (عدد اتمی Fe = ۲۶)\nI) آب + X → ﻫﯿﺪروﮐﻠﺮﯾﮏ اﺳﯿﺪ + زﻧﮓ آﻫﻦ\nII) ﺳﺪﯾﻢ ﮐﻠﺮﯾﺪ + Y → ﺳﺪﯾﻢ ﻫﯿﺪروﮐﺴﯿﺪ + x",
      options: ["سبزرنگ بوده و برخلاف X نامحلول در آب است.", "کاتیون موجود در زنگ آهن دارای ۵ الکترون d است.", "کاتیون موجود در هر دو ترکیب X و Y دارای الکترون‌های مساوی هستند.", "X همان FeCl₂ است و مجموع ضرایب واکنش اول ۱۲ است."],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. زنگ آهن Fe₂O₃ است که در واکنش با HCl تولید FeCl₃ می‌کند. ترکیب X همان FeCl₃ است که در آب محلول است و رنگ آن زرد است، نه سبز."
    },
    {
      id: 276,
      text: "اگر میخ آهنی را به محلول مس (II) سولفات وارد کنیم، اتم‌های ...... جایگزین یون‌های ...... شده و نشان می‌دهد آهن از مس ...... است.",
      options: ["Fe - Cu - فعال‌تر", "Cu - Fe - فعال‌تر", "Fe - Cu - کم‌فعال‌تر", "Cu - Fe - کم‌فعال‌تر"],
      correctIndex: 1,
      answer: "گزینه 2 صحیح است. آهن واکنش‌پذیری بیشتری از مس دارد، بنابراین اتم‌های آهن جایگزین یون‌های مس در محلول می‌شوند. واکنش: Fe(s) + CuSO₄(aq) → FeSO₄(aq) + Cu(s)"
    },
    {
      id: 278,
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) برای شناسایی یون Fe²⁺ همانند یون Fe³⁺ می‌توان از محلول حاوی یون هیدروکسید استفاده کرد.\nب) آهن (II) هیدروکسید محلولی سبز رنگ است.\nپ) زنگ آهن حاوی یون Fe³⁺ است.\nت) زنگ آهن در هیدروکلریک اسید حل می‌شود.",
      options: ["۱ مورد", "۲ مورد", "۳ مورد", "۴ مورد"],
      correctIndex: 2,
      answer: "۳ مورد (الف، پ، ت). بررسی: الف) درست (هر دو یون با NaOH رسوب می‌دهند)، ب) نادرست (آهن II هیدروکسید رسوب سبز است نه محلول)، پ) درست، ت) درست."
    },
    {
      id: 280,
      text: "با اضافه کردن محلول سدیم هیدروکسید به آهن (II) کلرید، رسوبی ...... رنگ تولید می‌گردد. ازطرفی اگر به مقداری زنگ آهن، محلول هیدروکلریک اسید افزوده شود، محلولی با فرمول شیمیایی ...... حاصل می‌گردد.",
      options: ["سبز - FeCl₃", "قرمز قهوه‌ای - FeCl₃", "سبز - FeCl₂", "قرمز قهوه‌ای - FeCl₂"],
      correctIndex: 0,
      answer: "گزینه ۱ صحیح است. FeCl₂ + ۲NaOH → Fe(OH)₂↓ (رسوب سبز) + ۲NaCl. زنگ آهن Fe₂O₃ + ۶HCl → ۲FeCl₃ + ۳H₂O."
    },
    {
      id: 282,
      text: "چند مورد از موارد زیر درست نیست؟\n- یکی از ویژگی‌های خاص طلا، واکنش ندادن آن با گازهای موجود در هواکره و حفظ رسانایی الکتریکی بالای خود در شرایط دمایی گوناگون است.\n- رسوب قرمزنگ آهن (III) هیدروکسید از واکنش سدیم هیدروکسید با محلول یکی از کلریدهای آهن که زردرنگ است به دست می‌آید.\n- کاتیونی از آهن که به‌عنوان رنگ قرمز در نقاشی استفاده می‌شود، دارای سه الکترون در آخرین زیرلایه خود است.\n- در یک دوره از جدول تناوبی، با افزایش عدد اتمی، تعداد لایه‌های الکترونی افزایش می‌یابد.",
      options: ["۱ مورد", "۲ مورد", "۳ مورد", "۴ مورد"],
      correctIndex: 0,
      answer: "فقط ۱ مورد نادرست است (مورد سوم). بررسی: مورد اول درست، مورد دوم درست (FeCl₃ زرد + NaOH → رسوب قرمز Fe(OH)₃)، مورد سوم نادرست (کاتیون Fe³⁺ دارای ۵ الکترون در زیرلایه 3d است نه ۳)، مورد چهارم درست."
    },
    {
      id: 283,
      text: "در واکنش آهن (III) کلرید با سدیم هیدروکسید، ضریب استوکیومتری و رنگ رسوب حاصل کدام است؟",
      options: ["۱، سبز", "۱، قرمز قهوه‌ای", "۲، سبز", "۲، قرمز قهوه‌ای"],
      correctIndex: 1,
      answer: "گزینه ۲ صحیح است. FeCl₃ + ۳NaOH → Fe(OH)₃↓ + ۳NaCl. ضریب استوکیومتری FeCl₃ در معادلهٔ موازنه‌شده برابر ۱ و رسوب Fe(OH)₃ قرمز قهوه‌ای است."
    },
    {
      id: 284,
      text: "کدام‌یک از گزینه‌های زیر درست است؟\n۱) مجموع ضرایب مواد در معادلهٔ واکنش زنگ آهن با هیدروکلریک اسید برابر ۶ است.\n۲) در فرآوردهٔ محلول واکنش آهن با محلول مس (II) سولفات، نسبت شمار اتم‌ها به نوع عنصرها برابر ۳ است.\n۳) آهن (III) هیدروکسید در آب نامحلول بوده و به رنگ سبز دیده می‌شود.\n۴) در واکنش فلز آهن با محلول مس (II) سولفات، قبل از افزودن آهن محلول آبی‌رنگ است.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 2,
      answer: "گزینه 3 درست است. محلول CuSO₄ قبل از افزودن آهن آبی‌رنگ است. بررسی: گزینه ۱ نادرست (مجموع ضرایب = ۱۲)، گزینه ۲ نادرست، گزینه ۳ نادرست (آهن III هیدروکسید قرمز قهوه‌ای است نه سبز)."
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
        backgroundColor: '#d32f2f',
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 شناسایی کاتیون‌های آهن در ترکیبات</h1>
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
                backgroundColor: '#d32f2f',
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
                      border: isSelected ? '3px solid #d32f2f' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#ffebee' : '#fff',
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
                      backgroundColor: isSelected ? '#d32f2f' : '#fff',
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
                  backgroundColor: canCalculate ? '#d32f2f' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#d32f2f' }}>
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
            borderTop: '4px solid #d32f2f',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #d32f2f', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#d32f2f'
            }}>
              📝 پاسخنامه تشریحی - شناسایی کاتیون‌های آهن
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
                      color: '#d32f2f',
                      backgroundColor: '#ffebee',
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
                    <span style={{ fontWeight: 'bold', color: '#d32f2f' }}>📖 توضیح:</span> 
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

export default Shimi2IronIdentification;