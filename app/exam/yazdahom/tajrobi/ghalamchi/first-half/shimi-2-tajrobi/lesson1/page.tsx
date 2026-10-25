"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson1 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۲-۲: الگوها و روندها در رفتار مواد و عناصر =================
  const questions = [
    {
      id: 12,
      text: "اگر 25/25 گرم پتاسیم نیترات با خلوص 80 درصد، بر اثر گرما در دمای بالای 500 درجه سانتی‌گراد به میزان 50 درصد، مطابق واکنش موازنه نشده زیر تجزیه شود، جرم مواد جامد بر جای مانده در ظرف چند گرم است؟ (K=39, N=14, O=16)\nKNO₃(s) → K₂O(s) + N₂(g) + O₂(g)",
      options: ["4/75", "14/85", "19/85", "20/20"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. ۱۹/۸۵ گرم ماده جامد باقی می‌ماند. محاسبه: جرم خالص KNO₃ = ۲۵/۲۵ × ۰/۸ = ۲۰/۲ گرم. جرم تجزیه‌شده = ۲۰/۲ × ۰/۵ = ۱۰/۱ گرم. مجموع جرم گازهای تولیدشده (N₂ و O₂) = ۵/۴ گرم. جرم باقی‌مانده = ۲۵/۲۵ − ۵/۴ = ۱۹/۸۵ گرم."
    },
    {
      id: 18,
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) زمین انباری از ذخایر ارزشمند است که این منابع به‌طور یکسان توزیع شده‌اند.\nب) شیمی‌دان‌ها برای یافتن پاسخ پرسش‌های خود دربارهٔ منابع موجود در زمین در پی کشف الگوها و روندهای موجود در رفتار مواد و عنصرها هستند.\nپ) در ساختار کودهای شیمیایی عناصر فسفر، نیتروژن و پتاسیم یافت می‌شود.\nت) تمامی مواد دریافت شده از کرهٔ زمین برای تولید یک وسیله، به صورت خام می‌توانند مورد استفاده قرار بگیرد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۲ عبارت (ب و پ) درست هستند. الف نادرست است زیرا منابع به‌طور یکسان توزیع نشده‌اند. ت نادرست است زیرا مواد اولیه نیاز به فرآوری دارند."
    },
    {
      id: 23,
      text: "کدام گزینه پیرامون سه عنصر Na، Mg و Al نادرست است؟",
      options: [
        "هر سه جزو عناصر دستهٔ s جدول تناوبی هستند.",
        "خصلت فلزی Mg کمتر و از Al بیشتر است.",
        "Na همانند Mg در اثر ضربه تغییر شکل می‌دهد، ولی خرد نمی‌شود.",
        "هر سه سطح درخشانی دارند."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. Na و Mg در دستهٔ s و Al در دستهٔ p جدول تناوبی قرار دارد."
    },
    {
      id: 27,
      text: "چه تعداد از ویژگی‌های زیر پیرامون شکل داده‌شده (سیلیسیم)، که متعلق به یکی از عناصر گروه ۱۴ جدول تناوبی می‌باشد، نادرست است؟\nالف) هم دوره با عنصر Na است.\nب) همانند گوگرد در اثر ضربه خرد می‌شود.\nپ) برخلاف سرب، در واکنش با دیگر اتم‌ها الکترون به اشتراک می‌گذارد.\nت) همانند Al رسانایی الکتریکی بالایی دارد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. فقط مورد (ت) نادرست است. سیلیسیم رسانایی الکتریکی کمی دارد، نه بالا. موارد الف، ب و پ درست هستند."
    },
    {
      id: 31,
      text: "ﭼﻨﺪ ﻣﻮرد از ﻣﻄﺎﻟﺐ نادرست است؟\n همه خواص فیزیکی شبه فلزات، مشابه فلزات است \n نافلزات همانند شبه فلزات، به اشتراک‌گذاری الکترون و برقراری پیوند کووالانسی تمایل دارند \n در گروه ۱۴ همانند دورهٔ سوم، عناصری از هر سه دستهٔ فلز، نافلز و شبه فلز دیده می‌شود \n همه فلزات، سختی و استحکام بسیار بالایی دارند",
      options: [
        "2",
        "4",
        "1",
        "3"
      ],
      correctIndex: 0,
      answer: "گزینه 1 نادرست است. همه فلزات سختی و استحکام بالایی ندارند. مثلاً فلز سدیم بسیار نرم است و با چاقو بریده می‌شود."
    },
    {
      id: 38,
      text: "چه تعداد از عناصر زیر هم در واکنش با دیگر عناصر الکترون به اشتراک می‌گذارند و هم در اثر ضربه خرد می‌شوند؟\nCl, Pb, Ge, S, Al, C, Mg, Sn",
      options: ["۱", "۲", "۴", "۶"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. ۴ عنصر (Cl, Ge, S, C) هم الکترون به اشتراک می‌گذارند و هم شکننده هستند."
    },
    {
      id: 40,
      text: "چند مورد از عبارت‌های زیر درست هستند؟\nالف) ژرمانیم یک شبه فلز عضو گروه ۱۴ است که در اثر ضربه خرد می‌شود.\nب) عنصری با عدد اتمی ۵۰ در این گروه وجود دارد که رسانایی گرمایی و الکتریکی بالایی دارد.\nپ) دو عنصر اول این گروه در برابر ضربه و واکنش با اتم‌های دیگر رفتار مشابهی نشان می‌دهند.\nت) آخرین عنصر این گروه جامدی شکل‌پذیر است که رسانای خوب گرما و الکتریسیته می‌باشد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. ۳ عبارت (الف، ب، پ) درست هستند. ت نادرست است زیرا آخرین عنصر گروه ۱۴، فلزیم (Fl) است نه سرب."
    },
    {
      id: 53,
      text: "عنصر X چهارمین عنصر از چهاردهمین گروه از جدول تناوبی است. چه تعداد از ویژگی‌های زیر بین عنصر X (ژرمانیم) و Mg مشترک می‌باشد؟\nالف) رسانایی گرمایی بالا\nب) از دست دادن الکترون در واکنش با دیگر اتم‌ها\nپ) سطح درخشان\nت) تغییر شکل در اثر ضربه",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "گزینه 4 درست است. فقط ۱ ویژگی (سطح درخشان) مشترک است. Ge شبه‌فلز و Mg فلز است."
    },
    {
      id: 61,
      text: "چند عبارت از عبارت‌های زیر درباره جدول تناوبی درست هستند؟\n(الف) 75 درصد از عنصرهای دوره سوم در واکنش با دیگر اتم‌ها توانایی مبادله الکترون دارند.\n(ب) در دوره سوم جدول دو عنصر گازی‌شکل و دو عنصر شبه‌فلزی وجود دارد.\n(پ) فسفر همانند سدیم، با چاقو بریده می‌شود، سطح آن درخشان بوده و در مجاورت هوا کدر می‌شود و جریان برق و گرما را عبور می‌دهد.\n(ت) گوگرد یک نافلز است که در طبیعت یافت می‌شود و بر اثر ضربه خرد می‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۲ عبارت (الف و ت) درست هستند. ب نادرست است (فقط ۱ شبه‌فلز در دوره سوم وجود دارد). پ نادرست است (فسفر با چاقو بریده نمی‌شود و رسانا نیست)."
    },
    {
      id: 67,
      text: "در مورد عنصرهای گروه ۱۴ جدول، کدام مطلب نادرست است؟",
      options: [
        "همهٔ این عنصرها رسانایی الکتریکی دارند.",
        "سیلیسیم و ژرمانیم شبه فلز بوده و در اثر ضربه خرد می‌شوند.",
        "در این گروه هر سه عنصر فلز، نافلز و شبه فلز وجود دارند.",
        "ژرمانیم همانند قلع در واکنش با دیگر اتم‌ها الکترون از دست می‌دهد."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است. ژرمانیم (شبه‌فلز) الکترون به اشتراک می‌گذارد، در حالی که قلع (فلز) الکترون از دست می‌دهد."
    }
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
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/second-half/shimi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 درس ۱: الگوها و روندها در رفتار مواد و عناصر</h1>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 درس ۲-۲: الگوها و روندها در رفتار مواد و عناصر</h1>
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
                backgroundColor: '#2196F3',
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
                      border: isSelected ? '3px solid #2196F3' : '1px solid #dee2e6',
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
                      backgroundColor: isSelected ? '#2196F3' : '#fff',
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
                  backgroundColor: canCalculate ? '#2196F3' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2196F3' }}>
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
            borderTop: '4px solid #2196F3',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #2196F3', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#2196F3'
            }}>
              📝 پاسخنامه تشریحی - درس ۲-۲: الگوها و روندها در رفتار مواد و عناصر
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
                      color: '#2196F3',
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
                    <span style={{ fontWeight: 'bold', color: '#2196F3' }}>📖 توضیح:</span> 
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

export default Shimi2lesson1;
