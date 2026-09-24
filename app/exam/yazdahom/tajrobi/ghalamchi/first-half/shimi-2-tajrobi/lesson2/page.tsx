"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson2 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات ۷۵ تا ۱۴۳ =================
  const questions = [
  {
    id: 76,
    text: "مقایسه شعاع اتمی عناصر زیر باتوجه به آرایش الکترونی لایه ظرفیت آن‌ها به چه صورت است؟\nالف) 2s²2p⁴\nب) 2s²2p⁵\nپ) 3s²3p⁴\nت) 3s²3p⁵",
    options: ["ب < الف < ت < پ", "ت < پ < ب < الف", "ت < پ < الف < ب", "پ < ت < الف < ب"],
    correctIndex: 0,
    answer: "طبق پاسخنامه: گزینه ۱ صحیح است."
  },
  {
    id: 79,
    text: "اگر شعاع اتمی نیتروژن ۶۵ pm و شعاع یونی Li⁺ ۷۶ pm باشد، شعاع کدام مورد می‌تواند درست باشد؟\na) O²⁻ → ۶۰ pm\nb) Li → ۷۰ pm\nc) Ne → ۳۸ pm\nd) N³⁻ → ۴۰ pm",
    options: ["a, b, c", "a, b", "c, d", "a, c"],
    correctIndex: 3,
    answer: "طبق پاسخنامه: گزینه ۴ صحیح است."
  },
  {
    id: 83,
    text: "ﭼﻨﺪ ﻣﻮرد از ﻋﺒﺎرت ﻫﺎی زﯾﺮ درﺳﺖ ﻫﺴﺘﻨﺪ؟\nالف) در بین فلزها، هرچه خاصیت فلزی بیشتر باشد، تمایل به از دست دادن الکترون بیشتر شده و فعالیت و واکنش‌پذیری افزایش می‌یابد.\nب) واکنش عنصری که ۵ الکترون با ویژگی ۱ = l دارد با اکسید دومین فلز قلیایی خاکی به‌طور خودبه‌خود انجام می‌شود.\nپ) هرچه شدت نور یا آهنگ خروج گاز آزادشده در یک واکنش بیشتر باشد، واکنش شیمیایی شدیدتر بوده و فرآورده‌ها فعالیت شیمیایی بیشتری دارند.\nت) هرچه شعاع اتمی یک فلز بزرگ‌تر باشد، آسان‌تر الکترون از دست می‌دهد.",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer: "طبق پاسخنامه: گزینه 3 صحیح است."
  },
  {
    id: 87,
    text: "کدام مقایسه در مورد شعاع گونه‌ها درست است؟",
    options: [
      "K < ۲۰Ca < ۲۱Sc",
      "Ba²⁺ < Cs⁺ < Xe",
      "F⁻ > Ne > Na⁺",
      "Cl⁻ > Ar > K⁺"
    ],
    correctIndex: 3,
    answer: "طبق پاسخنامه: گزینه 4 صحیح است."
  },
  {
    id: 90,
    text: "سه عنصر سدیم و منیزیم و آلومینیم عناصر فلزی موجود در دورۀ سوم جدول تناوبی هستند. کدام گزینه درست است؟",
    options: [
      "شعاع اتمی سدیم از منیزیم و آلومینیم بزرگ‌تر است.",
      "خصلت فلزی آلومینیم از منیزیم بیشتر است.",
      "هر سه در یک گروه قرار دارند.",
      "هر سه در اثر ضربه خرد می‌شوند."
    ],
    correctIndex: 0,
    answer: "طبق پاسخنامه: گزینه ۱ صحیح است."
  },
  {
    id: 95,
    text: "در گروه هالوژن‌ها از بالا به پایین، شعاع اتمی و به‌تبع شعاع یونی افزایش می‌یابد به همین دلیل گرفتن الکترون برای پایداری دشوارتر می‌شود؛ بنابراین با افزایش عدد اتمی واکنش‌پذیری کاهش می‌یابد و به‌تبع برای واکنش با هیدروژن به دمای بالاتری نیاز دارند. چه تعداد از ویژگی‌های زیر با افزایش عدد اتمی در گروه هالوژن‌ها، افزایش می‌یابد؟\nالف) شعاع یونی\nب) شعاع اتمی\nپ) واکنش‌پذیری\nت) دمای لازم برای واکنش با هیدروژن",
    options: ["۲", "۳", "۴", "۱"],
    correctIndex: 2,
    answer: "طبق پاسخنامه: گزینه 3 صحیح است."
  },
  {
    id: 101,
    text: "کدام‌یک از مقایسه‌های زیر به‌درستی صورت گرفته است؟",
    options: [
      "شعاع اتمی: ۱۷Cl < ۱۹K",
      "تبدیل آسان‌تر به کاتیون: ۱۲Mg < ۲۰Ca",
      "خصلت نافلزی: ۳۰Zn < ۳۲Ge",
      "واکنش‌پذیری: ۱۹K < ۲۰Ca"
    ],
    correctIndex: 3,
    answer: "طبق پاسخنامه: گزینه 4 صحیح است."
  },
  {
    id: 108,
    text: "چه تعداد از مقایسه‌های داده‌شده به‌درستی انجام شده است؟\nالف) نقطۀ جوش: برم > ید\nب) فعالیت شیمیایی: Na < منیزیم\nپ) تمایل به تشکیل آنیون: Cl > برم\nت) اختلاف شعاع اتمی: Si و Al < هر دو عنصر متوالی دورۀ سوم\nث) تعداد الکترون‌های لایۀ آخر: کلر > سیلیسیم",
    options: ["۱", "۲", "۳", "۴"],
    correctIndex: 2,
    answer: "طبق پاسخنامه: گزینه 3 صحیح است."
  },
  {
    id: 114,
    text: "در تبدیل اتم نیکل (۲۸Ni) به کاتیون (۲۸Ni²⁺):",
    options: [
      "شعاع آن افزایش می‌یابد.",
      "شمار الکترون‌هایی با عدد کوانتومی ۱ = l، در آن ثابت می‌ماند.",
      "آرایش الکترونی آن مشابه آرایش الکترونی یون پایدار گالیم می‌شود.",
      "جرم ذره به‌اندازۀ ۰/۰۵۱ amu کاهش می‌یابد."
    ],
    correctIndex: 1,
    answer: "طبق پاسخنامه: گزینه 2 صحیح است."
  },
  {
    id: 120,
    text: "کدام مورد نادرست است؟",
    options: [
      "عنصرهای با عدد اتمی ۱۲۰ و ۱۲۱ در آزمایشگاه‌های تحقیقاتی ساخته و شناسایی شده‌اند.",
      "در جدول پیشنهادی شارل ژانت، زیرلایه g به عنوان زیرلایه پنجم پس از زیرلایه‌های f، d، p، s پر می‌شود.",
      "واکنش گاز کلر با فلز پتاسیم شدیدتر از لیتیم است.",
      "در یک دوره از چپ به راست با افزایش عدد اتمی و تعداد الکترون، شعاع اتمی افزایش می‌یابد."
    ],
    correctIndex: 1,
    answer: "طبق پاسخنامه: گزینه 2 صحیح است."
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

export default Shimi2lesson2;