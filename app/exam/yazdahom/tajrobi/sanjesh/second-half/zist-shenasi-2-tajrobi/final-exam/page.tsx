"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Zist2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات زیست شناسی (۲) - جامع =================
  const questions = [
    // ==================== فصل اول: دستگاه عصبی ====================
    {
      id: 1,
      text: "کدام بخش از نورون پیام را به سلول بعدی منتقل می‌کند؟",
      options: ["آکسون", "دندریت", "جسم سلولی", "غلاف میلین"],
      correctIndex: 0,
      answer: "آکسون، پیام عصبی را از جسم سلولی به سلول بعدی منتقل می‌کند."
    },
    {
      id: 2,
      text: "پتانسیل استراحت در نورون حدوداً چند میلی‌ولت است؟",
      options: ["+70 mV", "-70 mV", "+55 mV", "-90 mV"],
      correctIndex: 1,
      answer: "پتانسیل استراحت نورون حدوداً -70 میلی‌ولت است."
    },
    {
      id: 3,
      text: "کدام بخش از مغز مسئول تعادل بدن است؟",
      options: ["مخچه", "مخ", "ساقه مغز", "تالاموس"],
      correctIndex: 0,
      answer: "مخچه مسئول تعادل و هماهنگی حرکات بدن است."
    },
    {
      id: 4,
      text: "سیستم عصبی خودمختار به چند بخش تقسیم می‌شود؟",
      options: ["سمپاتیک و پاراسمپاتیک", "مرکزی و محیطی", "حسی و حرکتی", "مغزی و نخاعی"],
      correctIndex: 0,
      answer: "سیستم عصبی خودمختار به دو بخش سمپاتیک و پاراسمپاتیک تقسیم می‌شود."
    },
    {
      id: 5,
      text: "گیرنده‌های بینایی در کدام بخش چشم قرار دارند؟",
      options: ["شبکیه", "قرنیه", "عدسی", "عنبیه"],
      correctIndex: 0,
      answer: "گیرنده‌های بینایی (سلول‌های مخروطی و استوانه‌ای) در شبکیه چشم قرار دارند."
    },
    {
      id: 6,
      text: "سلول‌های گیرنده شنوایی در کدام بخش گوش قرار دارند؟",
      options: ["حلزون", "مجاری نیم‌دایره", "پرده صماخ", "استخوانچه‌های گوش"],
      correctIndex: 0,
      answer: "سلول‌های گیرنده شنوایی در حلزون گوش قرار دارند."
    },

    // ==================== فصل دوم: دستگاه غدد درون‌ریز ====================
    {
      id: 7,
      text: "هورمون‌های پروتئینی از چه مکانیسمی برای اثرگذاری استفاده می‌کنند؟",
      options: ["پیام‌رسان دوم", "ورود به سلول", "اتصال به DNA", "فعال کردن آنزیم‌ها"],
      correctIndex: 0,
      answer: "هورمون‌های پروتئینی از طریق پیام‌رسان دوم (مانند cAMP) اثر می‌گذارند."
    },
    {
      id: 8,
      text: "غده هیپوفیز در کجای بدن قرار دارد؟",
      options: ["زیر مغز", "روی کلیه", "در گردن", "در لوزالمعده"],
      correctIndex: 0,
      answer: "غده هیپوفیز در زیر مغز و در استخوان پروانه‌ای قرار دارد."
    },
    {
      id: 9,
      text: "هورمون تیروکسین توسط کدام غده ترشح می‌شود؟",
      options: ["تیروئید", "پاراتیروئید", "هیپوفیز", "فوق کلیوی"],
      correctIndex: 0,
      answer: "هورمون تیروکسین (T4) توسط غده تیروئید ترشح می‌شود."
    },
    {
      id: 10,
      text: "انسولین و گلوکاگون توسط کدام غده ترشح می‌شوند؟",
      options: ["لوزالمعده", "کبد", "تیروئید", "فوق کلیوی"],
      correctIndex: 0,
      answer: "انسولین و گلوکاگون توسط سلول‌های جزایر لوزالمعده ترشح می‌شوند."
    },
    {
      id: 11,
      text: "هورمون کورتیزول توسط کدام بخش غده فوق کلیوی ترشح می‌شود؟",
      options: ["قشر فوق کلیوی", "مغز فوق کلیوی", "هیپوفیز", "تیروئید"],
      correctIndex: 0,
      answer: "کورتیزول توسط قشر غده فوق کلیوی ترشح می‌شود."
    },
    {
      id: 12,
      text: "هورمون رشد توسط کدام غده ترشح می‌شود؟",
      options: ["هیپوفیز قدامی", "هیپوفیز خلفی", "هیپوتالاموس", "تیروئید"],
      correctIndex: 0,
      answer: "هورمون رشد توسط بخش قدامی غده هیپوفیز ترشح می‌شود."
    },

    // ==================== فصل سوم: دستگاه تولیدمثل ====================
    {
      id: 13,
      text: "اسپرماتوژنز در کدام بخش بیضه اتفاق می‌افتد؟",
      options: ["لوله‌های اسپرم‌ساز", "اپیدیدیم", "بیضه", "واز دفران"],
      correctIndex: 0,
      answer: "اسپرماتوژنز در لوله‌های اسپرم‌ساز (سمینیفر) بیضه اتفاق می‌افتد."
    },
    {
      id: 14,
      text: "هورمون تستوسترون توسط کدام سلول‌های بیضه ترشح می‌شود؟",
      options: ["سلول‌های لیدیگ", "سلول‌های سرتولی", "سلول‌های اسپرماتوگونی", "اسپرماتید"],
      correctIndex: 0,
      answer: "تستوسترون توسط سلول‌های لیدیگ (میان‌بافتی) بیضه ترشح می‌شود."
    },
    {
      id: 15,
      text: "اووژنز در کدام بخش تخمدان اتفاق می‌افتد؟",
      options: ["فولیکول‌های تخمدان", "استروما", "قشر تخمدان", "مغز تخمدان"],
      correctIndex: 0,
      answer: "اووژنز در فولیکول‌های تخمدان اتفاق می‌افتد."
    },
    {
      id: 16,
      text: "کدام هورمون باعث تخمک‌گذاری می‌شود؟",
      options: ["LH", "FSH", "استروژن", "پروژسترون"],
      correctIndex: 0,
      answer: "هورمون LH (لوتئینه‌کننده) باعث تخمک‌گذاری می‌شود."
    },
    {
      id: 17,
      text: "لقاح در کدام بخش دستگاه تناسلی زنانه اتفاق می‌افتد؟",
      options: ["لوله رحم", "رحم", "واژن", "تخمدان"],
      correctIndex: 0,
      answer: "لقاح معمولاً در بخش ابتدایی لوله رحم (توبال) اتفاق می‌افتد."
    },
    {
      id: 18,
      text: "جفت در دوران بارداری چه نقشی دارد؟",
      options: ["انتقال مواد مغذی", "دفع مواد زائد", "ترشح هورمون‌ها", "همه موارد"],
      correctIndex: 3,
      answer: "جفت نقش‌های متعددی از جمله انتقال مواد مغذی، دفع مواد زائد و ترشح هورمون‌ها دارد."
    },

    // ==================== فصل چهارم: ایمنی و بیماری‌ها ====================
    {
      id: 19,
      text: "کدام یک از موارد زیر بخشی از ایمنی ذاتی است؟",
      options: ["پوست و مخاط", "سلول‌های T", "آنتی‌بادی‌ها", "حافظه ایمنی"],
      correctIndex: 0,
      answer: "پوست و مخاط خط اول دفاعی و بخشی از ایمنی ذاتی هستند."
    },
    {
      id: 20,
      text: "کدام سلول‌ها مسئول ایمنی سلولی هستند؟",
      options: ["لنفوسیت‌های T", "لنفوسیت‌های B", "ماکروفاژها", "نوتروفیل‌ها"],
      correctIndex: 0,
      answer: "لنفوسیت‌های T مسئول ایمنی سلولی هستند."
    },
    {
      id: 21,
      text: "آنتی‌بادی‌ها توسط کدام سلول‌ها تولید می‌شوند؟",
      options: ["لنفوسیت‌های B", "لنفوسیت‌های T", "ماکروفاژها", "سلول‌های کشنده"],
      correctIndex: 0,
      answer: "آنتی‌بادی‌ها توسط لنفوسیت‌های B (پلاسماسل‌ها) تولید می‌شوند."
    },
    {
      id: 22,
      text: "واکسن چگونه باعث ایمنی می‌شود؟",
      options: ["ایجاد حافظه ایمنی", "از بین بردن پاتوژن", "افزایش سلول‌های T", "افزایش آنتی‌بادی‌ها"],
      correctIndex: 0,
      answer: "واکسن با تحریک سیستم ایمنی برای ایجاد حافظه ایمنی، از بدن محافظت می‌کند."
    },
    {
      id: 23,
      text: "آلرژی چه نوع واکنشی است؟",
      options: ["پاسخ ایمنی بیش‌ازحد", "ضعف سیستم ایمنی", "حمله به خود", "واکنش به آنتی‌ژن"],
      correctIndex: 0,
      answer: "آلرژی یک پاسخ ایمنی بیش‌ازحد به مواد بی‌خطر است."
    },
    {
      id: 24,
      text: "بیماری‌های خودایمنی چه ویژگی دارند؟",
      options: ["سیستم ایمنی به سلول‌های خود حمله می‌کند", "سیستم ایمنی ضعیف است", "فقط اندام‌های خاص را درگیر می‌کنند", "همه موارد"],
      correctIndex: 0,
      answer: "در بیماری‌های خودایمنی، سیستم ایمنی سلول‌های خود را تشخیص نمی‌دهد و به آنها حمله می‌کند."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "کدام یک از موارد زیر در هر دو سیستم عصبی و غدد درون‌ریز نقش دارد؟",
      options: ["هیپوتالاموس", "مخچه", "تالاموس", "مدولا"],
      correctIndex: 0,
      answer: "هیپوتالاموس هم در سیستم عصبی و هم در سیستم غدد درون‌ریز نقش کلیدی دارد."
    },
    {
      id: 26,
      text: "کدام هورمون در تنظیم قند خون نقش دارد؟",
      options: ["انسولین", "گلوکاگون", "اپینفرین", "همه موارد"],
      correctIndex: 3,
      answer: "انسولین، گلوکاگون و اپینفرین (آدرنالین) هر سه در تنظیم قند خون نقش دارند."
    },
    {
      id: 27,
      text: "کدام گزینه در مورد سیناپس صحیح است؟",
      options: ["محل ارتباط دو نورون", "انتقال پیام با واسطه عصبی", "محل اتصال عصب به ماهیچه", "همه موارد"],
      correctIndex: 3,
      answer: "سیناپس محل ارتباط دو نورون یا عصب و ماهیچه است که انتقال پیام توسط واسطه‌های عصبی انجام می‌شود."
    },
    {
      id: 28,
      text: "کدام یک از موارد زیر از غدد درون‌ریز است؟",
      options: ["هیپوفیز", "غده اشکی", "غده عرق", "غده بزاقی"],
      correctIndex: 0,
      answer: "هیپوفیز یک غده درون‌ریز است که هورمون ترشح می‌کند."
    },
    {
      id: 29,
      text: "در چرخه قاعدگی، تخمک‌گذاری چه زمانی اتفاق می‌افتد؟",
      options: ["روز ۱۴", "روز ۱", "روز ۷", "روز ۲۸"],
      correctIndex: 0,
      answer: "تخمک‌گذاری معمولاً در روز ۱۴ چرخه قاعدگی (در یک چرخه ۲۸ روزه) اتفاق می‌افتد."
    },
    {
      id: 30,
      text: "کدام یک از سلول‌های زیر در ایمنی اکتسابی نقش دارند؟",
      options: ["لنفوسیت‌ها", "ماکروفاژها", "نوتروفیل‌ها", "سلول‌های کشنده"],
      correctIndex: 0,
      answer: "لنفوسیت‌ها (B و T) سلول‌های اصلی ایمنی اکتسابی هستند."
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
        backgroundColor: '#6A1B9A',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/sanjesh/second-half/zist-shenasi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧬 آزمون جامع زیست شناسی (۲)</h1>
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
                backgroundColor: '#6A1B9A',
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
                      border: isSelected ? '3px solid #6A1B9A' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#f3e5f5' : '#fff',
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
                      backgroundColor: isSelected ? '#6A1B9A' : '#fff',
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
                  backgroundColor: canCalculate ? '#6A1B9A' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#6A1B9A' }}>
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
            borderTop: '4px solid #6A1B9A',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #6A1B9A', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#6A1B9A'
            }}>
              📝 پاسخنامه تشریحی زیست شناسی (۲)
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
                      color: '#6A1B9A',
                      backgroundColor: '#f3e5f5',
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
                    <span style={{ fontWeight: 'bold', color: '#6A1B9A' }}>📖 توضیح:</span> 
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

export default Zist2FinalExam;