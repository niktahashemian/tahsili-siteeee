
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson1 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات انتخابی: ۲، ۳، ۶، ۷، ۹، ۱۳، ۱۷، ۱۸، ۲۲، ۲۳، ۲۸ =================
  const questions = [
    // سوال ۲
    {
      id: 2,
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) گسترش فناوری به میزان دسترسی به مواد مناسب وابسته است.\nب) رشد تمدن بشری در گروی شناخت مواد جدید است.\nپ) انسان‌ها به مرور زمان موفق به استخراج فلزات شدند.\nت) گرما دادن به مواد و افزودن آنها به یکدیگر گاهی موجب بهبود خواص می‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "طبق پاسخنامه صفحه ۱: گزینه ۴ صحیح است."
    },
    // سوال ۳
    {
      id: 3,
      text: "کدام‌یک از عبارت‌های زیر نادرست است؟\nالف) زندگی روزانهٔ ما به منابع شیمیایی وابسته است.\nب) منابع مهم به‌طور یکنواخت در سراسر جهان توزیع شده است.\nپ) پراکندگی منابع در جهان باعث پیدایش تجارت جهانی است.\nت) هرچه سرزمینی وسیع‌تر باشد، منابع بیشتری را در خود جای داده است.",
      options: ["الف - ب", "الف - پ", "ب - پ", "ب - ت"],
      correctIndex: 3,
      answer: "طبق پاسخنامه صفحه ۱: گزینه ۴ صحیح است."
    },
    // سوال ۶
    {
      id: 6,
      text: "چه تعداد از عبارت‌های زیر نادرست است؟\nالف) میزان استخراج فلزات از سوخت‌های فسیلی هر ساله کمتر است.\nب) همۀ مواد طبیعی و ساختگی از کرة زمین به دست می‌آید.\nپ) تقریباً جرم مواد در کرة زمین ثابت است.\nت) فولاد فلزی است که به‌طور مستقیم در زمین یافت می‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "طبق پاسخنامه صفحه ۲: گزینه ۲ صحیح است."
    },
    // سوال ۷
    {
      id: 7,
      text: "چه تعداد از عناصر زیر هم در واکنش با دیگر عنصرها الکترون از دست می‌دهند و هم در اثر ضربه خرد نمی‌شوند؟\nCl, Ge, S, Al, C, Mg, Sn",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "طبق پاسخنامه صفحه ۲: گزینه 3 صحیح است."
    },
    // سوال ۹
    {
      id: 9,
      text: "در بین عناصر دورهٔ چهاردهم جدول تناوبی عناصر ............ و ............ در اثر ضربه شکل‌پذیرند و عناصر ............ و ............ رسانایی الکتریکی کمی دارند. (گزینه‌ها از راست به چپ خوانده شوند)",
      options: ["Si, Ge, Sn, Pb", "Si, Pb, Ge, Sn", "Ge, C, Si, Pb", "Sn, C, Ge, Pb"],
      correctIndex: 1,
      answer: "طبق پاسخنامه صفحه ۲: گزینه 2 صحیح است."
    },
    // سوال ۱۳
    {
      id: 13,
      text: "دو عنصر A و B در چه تعداد از موارد زیر شباهت دارند؟\n- توانایی اشتراک‌گذاری الکترون در واکنش با دیگر اتم‌ها\n- دارا بودن سطح درخشان و براق\n- خرد شدن در برابر ضربه\n- هم‌دوره بودن در جدول تناوبی",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "طبق پاسخنامه گزینه ۳: عناصر A و B به ترتیب سیلیسیم و گوگرد هستند. آن‌ها در تمامی ویژگی‌ها به‌جز براق بودن سطح، شباهت دارند. سیلیسیم براق و گوگرد کدر است. پس تنها در یک مورد شباهت دارند."
    },
    // سوال ۱۷
    {
      id: 17,
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) زمین انباری از ذخایر ارزشمند است که این منابع به‌طور یکسان توزیع شده‌اند.\nب) شیمی‌دان‌ها برای یافتن پاسخ پرسش‌های خود دربارهٔ منابع موجود در زمین در پی کشف الگوها و روندهای موجود در رفتار مواد و عنصرها هستند.\nپ) در ساختار کودهای شیمیایی عناصر فسفر، نیتروژن و پتاسیم یافت می‌شود.\nت) تمامی مواد دریافت شده از گرهٔ زمین برای تولید یک وسیله، به صورت خام می‌توانند مورد استفاده قرار بگیرد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "طبق پاسخنامه 2 : عبارت‌های ب و پ درست هستند. (الف نادرست: توزیع یکسان نیست. ت نادرست: نیاز به فرآوری دارند)."
    },
    // سوال ۱۸
    {
      id: 18,
      text: "چند مورد از عبارت‌های زیر درست است؟\nالف) تعدادی از عنصرهای اصلی دستهٔ p، شبه‌فلز و بقیه نافلز محسوب می‌شوند.\nب) عنصرهای دستهٔ اصلی ۵ همگی فلز هستند و رسانای جریان برق می‌باشند.\nپ) در تناوب سوم شمار نافلزهای جامد و شمار عنصرهای گازی یکسان است.\nت) عنصرهای چکش‌خوار نظیر سرب و ژرمانیوم سخت بوده و بر اثر ضربه خرد نمی‌شوند.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "طبق پاسخنامه صفحه 1: تنها عبارت الف درست است. (ب نادرست: هیدروژن و هلیم گاز هستند. پ نادرست: نافلزهای جامد ۲ (P,S) و گازی ۲ (Cl, Ar) اما آرگون نافلز نیست. ت نادرست: ژرمانیوم چکش‌خوار نیست)."
    },
    // سوال ۲۲
    {
      id: 22,
      text: "از بین عنصرهای داده‌شده در زیر، چه تعداد عنصر، هر چهار خاصیت رسانایی الکتریکی، رسانایی گرمایی، سطح صیقلی و چکش‌خواری را دارند و چه تعداد عنصر، هر چهار خاصیت نامبرده‌شده را ندارند؟\n16 S , 82 P b , 15 P , 17 Cl , 55 Sn , 13 Al , 11 Na , 14 Si , 6 C",
      options: ["۲.۳", "۳.۴", "۴.۴", "۴.۵"],
      correctIndex: 0,
      answer: "طبق پاسخنامه صفحه ۵: گزینه 1 (۴ عنصر دارند و ۵ عنصر ندارند)."
    },
    // سوال ۲۳
    {
      id: 23,
      text: "کدام گزینه پیرامون سه عنصر 12 Mg و 13 Al و 11 Na نادرست است؟",
      options: [
        "هر سه جزو عناصر دستۀ 8 جدول تناوبی هستند.",
        "خصلت فلزی 12 Mg کمتر و از 13 Al بیشتر است.",
        "11 Na همانند 12 Mg در اثر ضربه تغییر شکل می‌دهد، ولی خرد نمی‌شود.",
        "هر سه سطح درخشانی دارند."
      ],
      correctIndex: 0,
      answer: "طبق پاسخنامه صفحه ۵: گزینه 1 (هر سه در دستۀ s و p هستند)."
    },
    // سوال ۲۸
    {
      id: 28,
      text: "در بین عناصر گروه چهاردهم جدول تناوبی عناصر، دو عنصر ...... و ...... رسانایی الکتریکی کمی دارند و عنصر ...... جامدی شکل‌پذیر است.",
      options: ["Ge – Si – Pb", "Pb – Si – Sn", "Pb – Ge – Si", "Pb – Sn – Si"],
      correctIndex: 2,
      answer: "طبق پاسخنامه صفحه ۵: گزینه 3 (Ge و Si رسانایی کمی دارند و Pb شکل‌پذیر است)."
    },
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

export default Shimi2lesson1;