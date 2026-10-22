"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Fizik2CombinationResistorsQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال پیوسته (دارای تصویر) از ترکیب مقاومت‌ها ====================
  const questions = [
    // ---------- سوال ۱ (بر اساس سوال ۴۷) ----------
    {
      id: 1,
      text: "در مدار شکل زیر اگر آمریسنج و ولت‌سنج ایده‌آل باشند، عددی که هریک نشان می‌دهند چه مقدار است؟",
      image: "/img/q47.png", 
      options: ["26/3V - 4/3A", "6V - 4A", "8V - 2A", "29/3 V - 1/3 A"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: مقاومت آمریسنج ایده‌آل ناچیز است. در این صورت دو مقاومت قرار گرفته در سمت راست مدار حذف می‌شوند. پس می‌توان نوشت: I = ε/(R+r) = 10/(10+1) = 2A. یعنی جریان عبوری برابر با 2A است. عددی که ولت‌سنج نشان می‌دهد برابر است با: V = ε - rI = 10 - 1×2 = 8V. گزینه ۳ صحیح است."
    },
    // ---------- سوال ۲ (بر اساس سوال ۴۹) ----------
    {
      id: 2,
      text: "جریان عبوری از مدارهای \"الف\" و \"ب\" به ترتیب از راست به چپ برابر چند آمپر است؟",
      image: "/img/q49.png",
      options: ["5/4 , 5/4", "1/4 , 1/4", "1/4 , 5/4", "5/4 , 1/4"],
      correctIndex: 2, 
      answer: "طبق پاسخنامه: در مدار الف، دو مولد خلاف جهت هم هستند و جریان برابر 5/4 آمپر است. در مدار ب، دو مولد در جهت هم هستند و جریان برابر 1/4 آمپر است. گزینه ۳ صحیح است."
    },
    // ---------- سوال ۳ (بر اساس سوال ۵۱) ----------
    {
      id: 3,
      text: "مطابق شکل یک پتانسیومتر را در مدار قرار داده‌ایم. اگر پیچ پتانسیومتر را در جهت نشان داده‌شده بچرخانیم، به ترتیب از راست به چپ توان مصرفی در مقاومت R1 و عدد ولت‌سنج چگونه تغییر می‌کند؟",
      image: "/img/q51.png",
      options: ["افزایش، افزایش", "افزایش، کاهش", "کاهش، افزایش", "کاهش، کاهش"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: با چرخش پیچ، مقاومت پتانسیومتر افزایش یافته و جریان کل کاهش می‌یابد. بنابراین توان مصرفی R1 کاهش می‌یابد. از طرفی ولتاژ دو سر پتانسیومتر افزایش می‌یابد. گزینه ۳ صحیح است."
    },
    // ---------- سوال ۴ (بر اساس سوال ۵۳) ----------
    {
      id: 4,
      text: "در شکل زیر، اگر ولت‌سنج ایده‌آل عدد ۶ ولت را نشان دهد، مقاومت داخلی باتری (r) چند اهم است؟",
      image: "/img/q53.png",
      options: ["1", "0/5", "1/5", "2"],
      correctIndex: 3, 
      answer: "طبق پاسخنامه: با توجه به مدار و ولتاژ ۶ ولت، مقاومت معادل ۳ اهم است. با نوشتن معادله مدار، مقدار مقاومت داخلی r=۲ اهم به دست می‌آید. گزینه ۴ صحیح است."
    },
    // ---------- سوال ۵ (بر اساس سوال ۵۵) ----------
    {
      id: 5,
      text: "چه تعداد از عبارت‌های زیر دربارۀ مدار شکل زیر نادرست است؟ (B باتری و u انرژی ﭘﺘﺎﻧﺴﯿﻞ ﺑﺎرﻫﺎی ﻣﺜﺒﺖ اﺳﺖ پتانسیل بارهای مثبت است)",
      image: "/img/q55.png",
      options: ["Vc<Vb", "Va>Vc", "Vc<Va", "Vb>Vc"],
      correctIndex: 1, 
      answer: "طبق پاسخنامه: با بررسی پتانسیل‌ها، تنها ۲ عبارت نادرست هستند. گزینه 2 صحیح است."
    },
    // ---------- سوال ۶ (بر اساس سوال ۵۸) ----------
    {
      id: 6,
      text: "در شکل زیر، مقاومت متغیر را به تدریج افزایش می‌دهیم. مقادیری که ولت‌سنج‌ها نشان می‌دهد چگونه تغییر می‌کند؟",
      image: "/img/q56.png",
      options: ["V1 افزایش V2 افزایش V افزایش", "V1 کاهش V2 افزایش V افزایش", "V1 افزایش V2 کاهش V کاهش", "V1 افزایش V2 کاهش V افزایش"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: با افزایش مقاومت متغیر، جریان کل کاهش می‌یابد. بنابراین ولتاژ دو سر R1 کاهش یافته و در نتیجه V1 افزایش می‌یابد. گزینه 4 صحیح است."
    },
    // ---------- سوال ۷ (بر اساس سوال ۶۰) ----------
    {
      id: 7,
      text: "در شکل زیر، با بستن کلید K، توان مفید مدار چگونه تغییر می‌کند؟",
      image: "/img/q61.png",
      options: ["افزایش می‌یابد.", "کاهش می‌یابد.", "ثابت می‌ماند.", "بسته به مقدار ε مقاومت‌ها، ممکن است افزایش یا کاهش یابد."],
      correctIndex: 0,
      answer: "طبق پاسخنامه: با بستن کلید K، مقاومت موازی به مدار اضافه شده و مقاومت معادل کاهش می‌یابد و به مقاومت داخلی نزدیک‌تر می‌شود، بنابراین توان مفید افزایش می‌یابد. گزینه ۱ صحیح است."
    },
    // ---------- سوال ۸ (بر اساس سوال ۶۱) ----------
    {
      id: 8,
      text: "در مدار شکل زیر آمرپرسنج چند آمر را نشان می‌دهد؟",
      image: "/img/q62.png",
      options: ["۳ A", "۴ A", "۶ A", "۹ A"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: مقاومت‌های موازی ۶ اهمی، معادل ۲ اهمی دارند. جریان کل برابر است با I = ε/(R_eq + r) = 12/(2+0) = 6A. گزینه ۳ صحیح است."
    },
    // ---------- سوال ۹ (بر اساس سوال ۶۲) ----------
    {
      id: 9,
      text: "در شکل زیر لامپ ها مشابه هستند. در صورت بسته شدن کلید k نور لامپ های L1 و L2 به ترتیب چگونه تغییر می‌کند؟",
      image: "/img/q63.png",
      options: ["پرنورتر - پرنورتر", "پرنورتر - ثابت", "ثابت - پرنورتر", "ثابت - کم‌نورتر"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: المپ L1 مستقیماً به باتری متصل است و ولتاژ آن ثابت می‌ماند. با بسته شدن کلید، المپ L2 با باتری موازی شده و ولتاژش افزایش می‌یابد. گزینه ۳ صحیح است."
    },
    // ---------- سوال ۱۰ (بر اساس سوال ۶۳) ----------
    {
      id: 10,
      text: "در مدار شکل زیر اگر جریان عبوری از مقاومت R4 برابر با ۰/۴A باشد، نیروی محرکۀ باتری چند ولت است؟",
      image: "/img/q64.png",
      options: ["۱۴", "۱۵/۲", "۱۲/۸", "۷"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: با تحلیل مدار و استفاده از قوانین کیرشهف، نیروی محرکه باتری برابر ۱۵/۲ ولت به دست می‌آید. گزینه ۲ صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // ۲۰ دقیقه
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // ========== محاسبه درصد ==========
  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setIsScoreCalculated(true);
  }, [selectedAnswers, questions]);

  // ========== انتخاب گزینه ==========
  const handleOptionClick = (questionId, optionIndex) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== تایمر ==========
  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [isTimeUp, isScoreCalculated]);

  // ========== پایان زمان ==========
  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => calculateScore(), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !isScoreCalculated && !isTimeUp;
  const answeredCount = Object.keys(selectedAnswers).length;

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 50) return '#ffc107';
    return '#dc3545';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleImageError = (qId) => {
    setImageErrors(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div style={{
      fontFamily: 'Tahoma, Arial, sans-serif',
      width: '100vw', minHeight: '100vh',
      padding: '15px 10px', backgroundColor: '#f8f9fa',
      direction: 'rtl', textAlign: 'right',
      boxSizing: 'border-box', overflowX: 'hidden'
    }}>

      {/* ==================== هدر ==================== */}
      <div style={{
        backgroundColor: '#1565C0', color: 'white',
        padding: '20px', borderRadius: '8px',
        marginBottom: '30px', textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/second-half/fizik-2-tajrobi/')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >
          ← بازگشت
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>
              ⚡ آزمون ۱۰ سوال پیوسته - ترکیب مقاومت‌ها
            </h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px', borderRadius: '50px',
            fontSize: '24px', fontWeight: 'bold',
            fontFamily: 'monospace', display: 'flex',
            alignItems: 'center', gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* ==================== سوالات ==================== */}
      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px', backgroundColor: '#ffffff',
            padding: '20px 25px', borderRadius: '8px',
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              fontSize: '17px', lineHeight: '1.9',
              marginBottom: '20px', fontWeight: '500',
              display: 'flex', alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
            }}>
              <span style={{
                display: 'inline-block', backgroundColor: '#1565C0',
                color: 'white', width: '30px', height: '30px',
                textAlign: 'center', lineHeight: '30px',
                borderRadius: '50%', fontSize: '14px',
                marginLeft: '15px', flexShrink: 0, marginTop: '2px'
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            {q.image && (
              <div style={{
                display: 'flex', justifyContent: 'center',
                margin: '20px 0', padding: '15px',
                backgroundColor: '#fafafa', borderRadius: '8px',
                border: '1px dashed #ced4da',
                minHeight: '180px', alignItems: 'center'
              }}>
                {imageErrors[q.id] ? (
                  <div style={{ textAlign: 'center', color: '#6c757d', fontSize: '14px', padding: '30px' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                    <p style={{ margin: '5px 0 0 0', direction: 'ltr', fontFamily: 'monospace', fontSize: '12px', color: '#adb5bd' }}>{q.image}</p>
                  </div>
                ) : (
                  <img
                    src={q.image} alt={`شکل سوال ${index + 1}`}
                    onError={() => handleImageError(q.id)}
                    style={{
                      maxWidth: '100%', maxHeight: '350px',
                      height: 'auto', objectFit: 'contain',
                      borderRadius: '6px'
                    }}
                  />
                )}
              </div>
            )}

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '12px 30px', marginRight: '20px'
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
                      display: 'flex', alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px', textAlign: 'right',
                      transition: 'all 0.2s', width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1
                    }}
                  >
                    <span style={{
                      display: 'inline-block', width: '28px', height: '28px',
                      border: '1px solid #000', borderRadius: '50%',
                      textAlign: 'center', lineHeight: '28px',
                      fontSize: '14px', marginLeft: '15px',
                      backgroundColor: isSelected ? '#1565C0' : '#fff',
                      color: isSelected ? '#fff' : '#000', flexShrink: 0
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

        {/* ==================== دکمه محاسبه ==================== */}
        <div style={{
          marginTop: '30px', marginBottom: '30px',
          padding: '20px', backgroundColor: '#ffffff',
          borderRadius: '12px', border: '1px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => { if (canCalculate) calculateScore(); }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px', fontSize: '18px',
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
                  color: '#fff', border: 'none', borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6
                }}
              >
                {!isAllAnswered && !isTimeUp
                  ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید`
                  : '📊 محاسبه درصد'}
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
                ✅ درصد شما:{' '}
                <span style={{ color: getScoreColor(score), fontSize: '28px' }}>
                  {Math.round(score)}%
                </span>
                {isTimeUp && (
                  <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>
                    (زمان پایان یافت)
                  </span>
                )}
              </div>
              <div style={{
                width: '80%', maxWidth: '400px', height: '20px',
                backgroundColor: '#e9ecef', borderRadius: '10px',
                overflow: 'hidden', margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`, height: '100%',
                  backgroundColor: getScoreColor(score),
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
                  padding: '10px 25px', fontSize: '14px',
                  backgroundColor: '#ff9800', color: '#fff',
                  border: 'none', borderRadius: '50px',
                  cursor: 'pointer', fontWeight: 'bold', marginTop: '10px'
                }}
              >
                🔄 تغییر پاسخ‌ها
              </button>
            </div>
          )}
        </div>

        {/* ==================== دکمه پاسخنامه ==================== */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px', fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff', border: 'none', borderRadius: '50px',
              cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
          >
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {/* ==================== پاسخنامه ==================== */}
        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px', borderTop: '4px solid #1565C0',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #1565C0',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#1565C0'
            }}>
              📝 پاسخنامه تشریحی ترکیب مقاومت‌ها
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
                      fontWeight: 'bold', color: '#1565C0',
                      backgroundColor: '#e3f2fd', padding: '5px 15px',
                      borderRadius: '20px', display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      سوال {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح: </span>
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{
                          fontWeight: 'bold',
                          color: isCorrect ? '#28a745' : '#dc3545'
                        }}>
                          {isCorrect ? '✔️ صحیح' : '❌ نادرست'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح: </span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>
                      {q.answer}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div style={{
            textAlign: 'center', padding: '30px',
            backgroundColor: '#fff3cd', borderRadius: '12px',
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

export default Fizik2CombinationResistorsQuiz;