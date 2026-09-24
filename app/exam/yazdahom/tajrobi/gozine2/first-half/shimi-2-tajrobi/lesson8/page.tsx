"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson8 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۲-۱: مفهوم دما، گرما، انرژی =================
  const questions = [
    // ==================== سوالات ۱ تا ۷ (صفحه ۲) ====================
    {
      id: 1,
      text: "در سه ظرف جداگانه در دمای 30°C، 30 گرم گاز نئون (ظرف A)، 30 گرم گاز هلیم (ظرف B) و 15 گرم گاز هلیم (ظرف C) داریم، چه تعداد از عبارت‌های زیر در مورد آن‌ها نادرست است؟ (Ne = 20, He = 4 : g.mol⁻¹)\nالف) مجموع انرژی جنبشی هر ۳ ظرف برابر است.\nب) انرژی گرمایی ظروف A و B برابر و بیشتر از ظرف C است.\nپ) میانگین تندی ذرات در هر ۳ ظرف برابر است.\nت) مقایسۀ میانگین انرژی جنبشی ذرات به صورت A < C < B است.",
      options: ["۱", "۲", "۴", "۳"],
      correctIndex: 3,
      answer: "۳ مورد نادرست است (الف، ب و ت نادرست هستند)."
    },
    {
      id: 2,
      text: "کدام موارد از مطالب زیر درست‌اند؟\nالف) انرژی گرمایی برخلاف دما به مقدار ماده بستگی ندارد.\nب) هرچه دمای یک ماده بیشتر باشد، مجموع انرژی جنبشی ذرات آن نیز بیشتر خواهد بود.\nپ) هرگاه مقدار برابری گرما به دو مادۀ مختلف داده شود، همواره ماده‌ای که ظرفیت گرمایی بیشتری دارد، تغییرات دمایی کمتری خواهد داشت.\nت) همواره ماده‌ای که دمای بیشتری دارد، انرژی گرمایی بیشتری نیز خواهد داشت.",
      options: ["الف - ب", "پ - ت", "الف - ب - پ", "ب - پ"],
      correctIndex: 0,
      answer: "عبارت‌های الف و ب درست هستند."
    },
    {
      id: 3,
      text: "در سه ظرف جداگانه در دمای 30°C، 30 گرم گاز نئون (ظرف A)، 30 گرم گاز هلیم (ظرف B) و 15 گرم گاز هلیم (ظرف C) داریم. چه تعداد از عبارت‌های زیر در مورد آن‌ها نادرست است؟ (Ne = 20, He = 4 : g.mol⁻¹)\nالف) مجموع انرژی جنبشی هر سه ظرف برابر است.\nب) انرژی گرمایی ظرف B و A برابر و بیشتر از ظرف C است.\nپ) میانگین تندی ذرات در هر سه ظرف برابر است.\nت) مقایسۀ میانگین انرژی جنبشی ذرات به صورت A < C < B است.",
      options: ["۱", "۲", "۴", "۳"],
      correctIndex: 3,
      answer: "۳ مورد نادرست است (الف، ب و ت نادرست هستند)."
    },
    {
      id: 4,
      text: "چند مورد از موارد زیر درست هستند؟\nالف) اگر دمای جسمی بیشتر از جسم دیگر باشد، مجموع انرژی جنبشی ذرات آن هم بیشتر از جسم دیگر است.\nب) در مورد یک ماده، دمای بیشتر به معنی میانگین سرعت بیشتر حرکت ذرات آن است.\nپ) در مورد یک ماده، انرژی گرمایی فقط تابع دمای آن ماده است.\nت) انرژی گرمایی یک لیوان چای داغ بیشتر از یک استخر پر از آب است.",
      options: ["۱", "۲", "۴", "۳"],
      correctIndex: 2,
      answer: "۱ مورد درست است (ب)."
    },
    {
      id: 5,
      text: "چند مورد از مطالب زیر نادرست هستند؟\nالف) میزان جنبش مولکول‌ها در آب گرم، شدیدتر از آب سرد است.\nب) اگر دمای ماده A بیشتر از B باشد، انرژی گرمایی A هم بیشتر از B خواهد بود.\nپ) اگر انرژی گرمایی ماده A بیشتر از B باشد، دمای A هم بیشتر از B خواهد بود.\nت) انرژی گرمایی یک ماده برخلاف دما، به مقدار آن بستگی ندارد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "۳ مورد نادرست است (ب، پ و ت)."
    },
    {
      id: 6,
      text: "کدام‌یک از گزینه‌های زیر نادرست است؟\n۱) تغذیه درست شامل وعده‌های غذایی است که مخلوط مناسبی از انواع ذره‌ها را دربر گیرد.\n۲) حجم عظیمی از آب دریاها و اقیانوس‌ها در بخش کشاورزی صنایع غذایی استفاده می‌شود.\n۳) یکی از راه‌های آزاد شدن انرژی مواد، سوزاندن آن‌ها است.\n۴) با خوردن سیب می‌توان پایین بودن قند خون و با خوردن اسفناج و عدسی می‌توان کمبود آهن خون را جبران کرد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 1,
      answer: "گزینه ۲ نادرست است. آب دریاها و اقیانوس‌ها به دلیل شوری زیاد در کشاورزی استفاده نمی‌شوند."
    },
    {
      id: 7,
      text: "کدام‌یک از گزینه‌های زیر عبارت درستی را بیان می‌کند؟\n۱) در سه حالت فیزیکی میزان جنبش ذرات متفاوت از یکدیگر است همان طور که ذرات سازندۀ آن‌ها متفاوت است.\n۲) میانگین تندی مولکول‌های ظرفی که 4 kg آب با دمای 80°C دارد بیشتر از ظرفی است که 4 kg از همان مایع با دمای 34°C دارد.\n۳) در صورت افزایش دمای یکسان باید به آب بیشتر از روغن زیتون گرما دهیم تا افزایش دما رخ دهد.\n۴) از یکای cal (کالری) می‌توان برای بیان میزان دما استفاده کرد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. آب ظرفیت گرمایی ویژه بیشتری دارد، بنابراین برای افزایش دمای یکسان به گرمای بیشتری نیاز دارد."
    },
    {
      id: 8,
      text: "اگر برای تجزیه حرارتی ۱/۱ لیتر گاز متان در شرایط STP و تبدیل آن به اتم‌های گازی کربن و هیدروژن ۸۳۰ کیلوژول گرما نیاز باشد، میانگین آنتالپی پیوند C – H برحسب kJ.mol⁻¹ برابر است با ............",
      options: ["416", "415", "900", "950"],
      correctIndex: 0,
      answer: "416 kJ.mol⁻¹"
    },
    {
      id: 9,
      text: "کدام‌یک از گزینه‌های زیر نادرست است؟\n۱) تغذیه درست شامل وعده‌های غذایی است که مخلوط مناسبی از انواع ذره‌ها را دربر گیرد.\n۲) حجم عظیمی از آب دریاها و اقیانوس‌ها در بخش کشاورزی صنایع غذایی استفاده می‌شود.\n۳) یکی از راه‌های آزاد شدن انرژی مواد، سوزاندن آن‌ها است.\n۴) با خوردن سیب و عمل می‌توان پایین بودن قند خون و با خوردن اسفناج و عدسی می‌توان کمبود آهن خون را جبران کرد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 1,
      answer: "گزینه ۲ نادرست است. آب دریاها و اقیانوس‌ها به دلیل شوری زیاد در کشاورزی استفاده نمی‌شوند."
    },
    {
      id: 10,
      text: "کدام‌یک از گزینه‌های زیر عبارت درستی را بیان می‌کند؟\n۱) در سه حالت فیزیکی میزان جنبش ذرات متفاوت از یکدیگر است همان طور که ذرات سازندۀ آن‌ها متفاوت است.\n۲) میانگین تندی مولکول‌های ظرفی که 4 kg آب با دمای 80°C دارد بیشتر از ظرفی است که 4 kg از همان مایع با دمای 34°C دارد.\n۳) در صورت افزایش دمای یکسان باید به آب بیشتر از روغن زیتون گرما دهیم تا افزایش دما رخ دهد.\n۴) از یکای cal (کالری) می‌توان برای بیان میزان دما استفاده کرد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. آب ظرفیت گرمایی ویژه بیشتری دارد، بنابراین برای افزایش دمای یکسان به گرمای بیشتری نیاز دارد."
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
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/gozine2/first-half/shimi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ درس ۲-۱: مفهوم دما، گرما، انرژی</h1>
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
              📝 پاسخنامه تشریحی - درس ۲-۱: مفهوم دما، گرما، انرژی
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

export default Shimi2lesson8;