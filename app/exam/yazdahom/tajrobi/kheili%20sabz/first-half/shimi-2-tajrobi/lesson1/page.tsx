"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Chapter1Exam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

const questions = [
  {
    id: 4,
    text: "چه تعداد از عبارت‌های زیر درست است؟\nالف) گسترش فناوری به میزان دسترسی به مواد مناسب وابسته است.\nب) گرما دادن به مواد و افزودن آنها به یکدیگر سبب تغییر و گاهی بهبود خواص می‌شود.\nپ) همۀ مواد مصنوعی و طبیعی از کرة زمین به دست می‌آیند.\nت) میزان تولید و مصرف نسبی مواد معدنی بیشتر از فلزات است.",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 3,
    answer: "طبق پاسخنامه: گزینه ۴ صحیح است. همۀ موارد درست هستند."
  },
  {
    id: 8,
    text: "کدام گزینه درباره عنصری که در شب‌هنگام آزادراه‌ها و بزرگراه‌ها را روشن می‌سازد، نادرست است؟",
    options: [
      "رسانایی گرمایی بالا، اما رسانایی الکتریکی پایینی دارد.",
      "جلای نقره‌ای رنگ دارد که در مجاورت هوا سریع کدر می‌شود.",
      "در واکنش با دیگر عناصر الکترون از دست می‌دهد.",
      "همه موارد درست هستند."
    ],
    correctIndex: 1,
    answer: "طبق پاسخنامه: گزینه 2 صحیح است. عنصر موردنظر سدیم است که رسانایی الکتریکی بالایی دارد."
  },
  {
    id: 11,
    text: "کدام یک از گزینه‌های زیر نادرست است؟",
    options: [
      "جامد عنصر ۱۵P همانند گوگرد جامدی زردرنگ است.",
      "کلر گازی زردرنگ است که جریان برق را از خود عبور نمی‌دهد.",
      "سطح گوگرد همانند کربن، کدر است.",
      "فلزات قابلیت مفتول شدن دارند و می‌توان از آن‌ها سیم تهیه کرد."
    ],
    correctIndex: 0,
    answer: "طبق پاسخنامه: گزینه ۱ صحیح است. فسفر جامدی زردرنگ نیست."
  },
  {
    id: 14,
    text: "چه تعداد از عبارت‌های زیر درست است؟\nالف) فلزها به‌طور عمده در سمت چپ و مرکز جدول تناوبی جای دارند.\nب) نافلزها عمدتاً سمت راست و بالای جدول تناوبی جای دارند.\nپ) در هر یک از شبه فلزها زیرلایه p در حال پر شدن است.\nت) آرایش الکترونی لایه ظرفیت 3s²3p³ است.",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer: "طبق پاسخنامه: گزینه 3 صحیح است. دو مورد «الف» و «ب» درست هستند."
  },
  {
    id: 20,
    text: "کدام گزینه درباره جدول تناوبی درست است؟\n۱) شمار عنصرها در هریک از دوره‌های چهارم، پنجم و ششم جدول یکسان و برابر با ۱۸ است.\n۲) شامل هفت دوره و هجده گروه است که در مجموع، ۱۱۸ عنصر را در بر می‌گیرد.\n۳) اختلاف شمار فلزهای قلیایی و هالوژن‌ها برابر با ۱ است.\n۴) شمار عنصرهای شبه‌فلز گروه چهاردهم با شمار فلزهای دورۀ سوم برابر است.",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer: "طبق پاسخنامه: گزینه 3 صحیح است."
  },
  {
    id: 25,
    text: "کدام مقایسۀ زیر به درستی صورت گرفته است؟",
    options: [
      "شمار الکترون لایۀ ظرفیت: Ca > Al",
      "میزان شکل‌پذیری: C > Pb",
      "درخشان بودن سطح: P < Ge",
      "مقاومت در برابر ضربه: Sn < Cl"
    ],
    correctIndex: 3,
    answer: "طبق پاسخنامه: گزینه 4 صحیح است. فسفر نافلز و ژرمانیم شبه‌فلز است و ژرمانیم درخشان‌تر است."
  },
  {
    id: 31,
    text: "در چند گروه از جدول تناوبی، هر سه گونه از عنصرها (فلز، نافلز و شبه‌فلز)، یافت می‌شود؟",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 1,
    answer: "طبق پاسخنامه: گزینه 2 صحیح است. ۳ گروه دارای هر سه گونه هستند."
  },
  {
    id: 37,
    text: "کدام موارد از مطالب زیر، درست‌اند؟\n- در میان برخی فلزات و نافلزات، خواص فیزیکی مشترکی دیده می‌شود.\n- بخش عمدة جدول تناوبی را عناصری تشکیل می‌دهند که سطح صیقلی و براق دارند.\n- همة عناصری که چکش‌خوار نیستند، در سمت راست و بالای جدول قرار دارند.\n- سیلیسیم همانند کربن، رسانای جریان الکتریکی است و قابلیت چکش‌خواری دارد.",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer: "طبق پاسخنامه: گزینه 3 صحیح است. تنها مورد اول درست است."
  },
  {
    id: 42,
    text: "عنصر X چهارمین عنصر از چهاردهمین گروه از جدول تناوبی است. چه تعداد از ویژگی‌های زیر بین عنصر X و Mg مشترک می‌باشد؟\nالف) رسانایی گرمایی بالا\nب) از دست دادن الکترون در واکنش با دیگر اتم‌ها\nپ) سطح درخشان\nت) تغییر شکل در اثر ضربه",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer: "طبق پاسخنامه: گزینه 3 صحیح است. دو مورد مشترک هستند."
  },
  {
    id: 48,
    text: "چه تعداد از عناصر زیر در اثر ضربه تغییر شکل می‌دهند و رسانایی الکتریکی و گرمایی بالایی دارند؟\nMg – Cl – P – Pb – Ge – Sn – Na",
    options: ["۳", "۴", "۵", "۶"],
    correctIndex: 3,
    answer: "طبق پاسخنامه: گزینه 4 صحیح است. ۴ عنصر این ویژگی را دارند."
  }
];
  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
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
        backgroundColor: '#E65100',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/kheili%20sabz/first-half/shimi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون شیمی (۲) - فصل اول</h1>
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
                backgroundColor: '#E65100',
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
                      border: isSelected ? '3px solid #E65100' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#fff3e0' : '#fff',
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
                      backgroundColor: isSelected ? '#E65100' : '#fff',
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
                  backgroundColor: canCalculate ? '#E65100' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#E65100' }}>
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
            borderTop: '4px solid #E65100',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #E65100', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#E65100'
            }}>
              📝 پاسخنامه تشریحی شیمی (۲) - فصل اول
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
                      color: '#E65100',
                      backgroundColor: '#fff3e0',
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
                    <span style={{ fontWeight: 'bold', color: '#E65100' }}>📖 توضیح:</span> 
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

export default Shimi2Chapter1Exam;