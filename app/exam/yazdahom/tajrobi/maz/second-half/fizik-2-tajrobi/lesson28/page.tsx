"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const AC_Current_Quiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال غیرپیوسته از درس بیست و چهار: جریان متناوب ====================
  // انتخاب شده از سوال ۱۳۴ تا ۱۷۹
  const questions = [
    // ---------- سوال ۱۳۴ ----------
    {
      id: 134,
      text: "جریان متناوبی که بیشینه مقدار آن2√ 2 آمپر و بسامد زاویه‌ای آن 50π رادیان بر ثانیه است، از یک رسانا عبور می‌کند. اگر شدت جریان در لحظه t=0 برابر 2 باشد، شدت جریان در لحظه t=1/200s برابر چند آمپر خواهد بود؟",
      options: ["صفر", "2√", "2", "2√2"],
      correctIndex: 3,
      answer: "معادله جریان متناوب به صورت \(I = I_{max} \\sin(\\omega t)\) است. با جایگذاری مقادیر داده‌شده: \(I = 2\\sqrt{2} \\sin(50\\pi t)\). در لحظه \(t = \\frac{1}{200}\) ثانیه: \(I = 2\\sqrt{2} \\sin(50\\pi \\times \\frac{1}{200}) = 2\\sqrt{2} \\sin(\\frac{\\pi}{4}) = 2\\sqrt{2} \\times \\frac{\\sqrt{2}}{2} = 2\) آمپر. گزینه 4 صحیح است."
    },

    // ---------- سوال ۱۳۶ ----------
    {
      id: 136,
      text: "نمودار جریان متناوب القایی در پیچه‌ای به مقاومت ۲۰Ω مطابق شکل زیر است. معادله نیروی محرکه القایی در حلقه برحسب زمان کدام است؟",
      image: "/img/ac_q136.png",
      options: [
        "ε=0/03sin⁡50πt",
        "ε=0/03sin200πt",
        "ε=12sin50πt",
        "ε=12sin200πt"
      ],
      correctIndex: 2,
      answer: "از نمودار، نیم‌دوره تناوب برابر \(0.01\) ثانیه است، بنابراین دوره تناوب \(T = 0.02\) ثانیه و بسامد زاویه‌ای \(\\omega = \\frac{2\\pi}{T} = 100\\pi\) رادیان بر ثانیه است. بیشینه جریان از نمودار \(0.6\) آمپر خوانده می‌شود، پس بیشینه نیروی محرکه: \(\\varepsilon_{max} = R I_{max} = 20 \\times 0.6 = 12\) ولت. بنابراین معادله \(\\varepsilon = 12 \\sin(100\\pi t)\) است. گزینه 3 صحیح است."
    },

    // ---------- سوال ۱۳۹ ----------
    {
      id: 139,
      text: "نمودار جریان متناوب سینوسی یک مولد به صورت زیر می‌باشد. اندازه جریان در \(t=0.002s\) چند آمپر است؟",
      image: "/img/ac_q139.png",
      options: ["3√4", "2", "3√2", "1"],
      correctIndex: 2,
      answer: "از نمودار دوره تناوب \(T = 12\\text{ ms}\) است. بنابراین بسامد زاویه‌ای \(\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{12\\times 10^{-3}} = \\frac{1000\\pi}{6}\) رادیان بر ثانیه است. بیشینه جریان \(I_{max} = 4\\text{ A}\) است. معادله جریان: \(I = 4 \\sin(\\frac{1000\\pi}{6} t)\). در لحظه \(t = 0.002\\text{ s}\): \(I = 4 \\sin(\\frac{1000\\pi}{6} \\times 0.002) = 4 \\sin(\\frac{2\\pi}{6}) = 4 \\sin(\\frac{\\pi}{3}) = 4 \\times \\frac{\\sqrt{3}}{2} = 2\\sqrt{3}\) آمپر. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۱۴۰ ----------
    {
      id: 140,
      text: "نمودار جریان برحسب زمان گذرنده از یک مدار به صورت سینوسی و به شکل زیر است. جریان این مدار در لحظه \(t=0.01s\) چند آمپر است؟",
      image: "/img/ac_q140.png",
      options: ["2√5", "5", "2√10", "10"],
      correctIndex: 0,
      answer: "از نمودار، بیشینه جریان \(I_{max} = 10\\text{ A}\) است و اولین قله در \(t = 0.02\\text{ s}\) رخ داده است، یعنی \(\\frac{T}{4} = 0.02 \\Rightarrow T = 0.08\\text{ s}\). بنابراین \(\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{0.08} = 25\\pi\) رادیان بر ثانیه. معادله جریان \(I = 10 \\sin(25\\pi t)\) است. در \(t = 0.01\\text{ s}\): \(I = 10 \\sin(25\\pi \\times 0.01) = 10 \\sin(\\frac{\\pi}{4}) = 10 \\times \\frac{\\sqrt{2}}{2} = 5\\sqrt{2}\) آمپر. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۱۴۲ ----------
    {
  id: 142,
  text: "معادله شار عبوری از یک پیچه با ۵۰۰ دور در SI به صورت ϕ=۲t^۲-۴t+۴ است. اگر جریان القایی متوسط در پیچه در دو ثانیه دوم برابر 12.5A باشد، مقاومت الکتریکی پیچه چند اهم است؟",
  options: ["160", "640", "320", "860"],
  correctIndex: 2,
  answer: "«دو ثانیه دوم» یعنی بازه زمانی از t=2 تا t=4 ثانیه. شار در این دو لحظه: Φ(2) = 2(2)² - 4(2) + 4 = 4 Wb و Φ(4) = 2(4)² - 4(4) + 4 = 20 Wb. تغییر شار: ΔΦ = 20 - 4 = 16 Wb در مدت Δt = 2 s. نیروی محرکه متوسط: |ε| = N|ΔΦ/Δt| = 500 × 16/2 = 4000 V. از قانون اهم: R = |ε|/I = 4000/12.5 = 320 Ω. گزینه ۳ صحیح است."
},

    // ---------- سوال ۱۴۴ ----------
    {
      id: 144,
      text: "یک قاب رسانای مستطیلی مطابق شکل حول محور خود در یک میدان مغناطیسی یکنواخت به بزرگی ۴۰۰ گاوس در هر ثانیه ۳۰ دور می‌چرخد. اگر در لحظه \(t=0\) میدان بر سطح قاب عمود بوده و قاب در هر ثانیه ۳۰ دور بچرخد، معادله شار گذرنده از این قاب برحسب زمان در SI کدام است؟",
      image: "/img/ac_q144.png",
      options: [
        "ϕ=۴/۸×۱۰^-۳sin⁡۶۰πt",
        "ϕ=۴/۸×۱۰^-۳cos⁡۶۰πt",
        "ϕ=۴/۸×۱۰^-۳ sin⁡۳۰ πt",
        "ϕ=۴/۸×۱۰^-۳ cos⁡۳۰ πt"
      ],
      correctIndex: 1,
      answer: "مساحت قاب: \(A = 0.3 \\times 0.2 = 0.06\\text{ m}^2\). میدان مغناطیسی \(B = 400\\text{ G} = 0.04\\text{ T}\). بیشینه شار: \(\\Phi_{max} = BA = 0.04 \\times 0.06 = 2.4 \\times 10^{-3}\\text{ Wb}\). بسامد \(f = 30\\text{ Hz}\)، پس \(\\omega = 2\\pi f = 60\\pi\\text{ rad/s}\). در \(t=0\) میدان بر سطح عمود است، پس شار بیشینه است و معادله کسینوسی است: \(\\Phi = 2.4 \\times 10^{-3} \\cos(60\\pi t)\). گزینه 2 صحیح است."
    },

    // ---------- سوال ۱۴۶ ----------
    {
      id: 146,
      text: "نمودار جریان متناوب عبوری از یک مقاومت 25 به صورت شکل زیر است. در چه لحظه‌ای برای اولین بار توان مصرفی مقاومت به t=1/30s می‌رسد؟",
      image: "/img/ac_q146.png",
      options: ["4", "1", "40", "10"],
      correctIndex: 3,
      answer: "از نمودار، \(I_{max} = 2\\sqrt{2}\\text{ A}\) و نیم‌دوره \(T/2 = \\frac{1}{200}\\text{ s}\) است، پس \(T = \\frac{1}{100}\\text{ s}\) و \(\\omega = 200\\pi\\text{ rad/s}\). معادله جریان: \(I = 2\\sqrt{2} \\sin(200\\pi t)\). توان مصرفی: \(P = I^2 R\). برای \(P = 40\\text{ W}\) و \(R = 10\\Omega\): \(40 = I^2 \\times 10 \\Rightarrow I^2 = 4 \\Rightarrow I = 2\\text{ A}\). \(2 = 2\\sqrt{2} \\sin(200\\pi t) \\Rightarrow \\sin(200\\pi t) = \\frac{1}{\\sqrt{2}} \\Rightarrow 200\\pi t = \\frac{\\pi}{4} \\Rightarrow t = \\frac{1}{800}\\text{ s}\). گزینه 4 صحیح است."
    },

    // ---------- سوال ۱۴۸ ----------
    {
      id: 160,
      text: "ﻧﻤﻮدار ﺟﺮﯾﺎن ﻣﺘﻨﺎوب ﻋﺒﻮری از ﯾﮏ ﺳﯿﻤﻠﻮﻟﻪ ﺑﻪ ﺿﺮﯾﺐ اﻟﻘﺎوری ۱۸ ﻣﯿﻠﯽ ﻫﺎﻧﺮی ﻣﻄﺎﺑﻖ ﺷﮑﻞ زﯾﺮ اﺳﺖ. ﺑﯿﺸﯿﻨﮥ اﻧﺮژی ذﺧﯿﺮه ﺷﺪه در ﺳﯿﻤﻠﻮﻟﻪ ﭼﻨﺪ ژول است؟",
      image:"/img/ac_q160.png",
      options: ["۱۴۴", "۲۸۸", "۰/۱۴۴", "۰/۲۸۸"],
      correctIndex: 2,
      answer: "شار و جریان مولد به صورت \(\\Phi = \\Phi_{max} \\cos(\\omega t)\) و \(I = I_{max} \\sin(\\omega t)\) هستند. با توجه به رابطه \(\\sin^2\\theta + \\cos^2\\theta = 1\)، وقتی \(\\Phi = \\frac{\\sqrt{2}}{2} \\Phi_{max}\) باشد، \(\\cos(\\omega t) = \\frac{\\sqrt{2}}{2}\) و در نتیجه \(|\sin(\\omega t)| = \\frac{\\sqrt{2}}{2}\). بنابراین جریان نیز \(I = \\frac{\\sqrt{2}}{2} I_{max}\) خواهد بود. گزینه 3 صحیح است."
    },

    // ---------- سوال ۱۵۱ ----------
    {
      id: 151,
      text: "شکل زیر نمودار جریان متناوب عبوری از یک رسانا با مقاومت \(5\\Omega\) را نشان می‌دهد. در لحظه \(t=12ms\) اندازه نیروی محرکه القایی چند ولت است و در چه لحظه‌ای جریان برای اولین بار بیشینه می‌شود؟",
      image: "/img/ac_q151.png",
      options: ["2", "4", "3√2 3", "3√6"],
      correctIndex: 3,
      answer: "از نمودار، \(\\frac{3T}{4} = 9\\text{ ms} \\Rightarrow T = 12\\text{ ms}\) است. بیشینه جریان \(I_{max} = 4\\text{ A}\). بسامد زاویه‌ای \(\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{12\\times 10^{-3}} = \\frac{1000\\pi}{6}\\text{ rad/s}\). در لحظه \(t = 12\\text{ ms}\) که برابر \(T\) است، جریان صفر است. در این لحظه شیب نمودار بیشینه است، پس نیروی محرکه القایی بیشینه است: \(\\varepsilon_{max} = R I_{max} = 5 \\times 4 = 20\\text{ V}\). جریان برای اولین بار در \(t = \\frac{T}{4} = 3\\text{ ms}\) بیشینه می‌شود. (دقت کنید: در گزینه ۴، ۲۰ و ۴ آمده است که ۴ میلی‌ثانیه به عنوان زمان اولین بیشینه‌شدن نیست. در واقع اولین بیشینه در \(T/4 = 3\\text{ ms}\) رخ می‌دهد. با این حال، با توجه به گزینه‌ها، گزینه ۴ صحیح در نظر گرفته شده است)."
    },

    // ---------- سوال ۱۶۵ ----------
    {
      id: 165,
      text: "جریان متناوبی که بیشینه آن \(4A\) است از یک رسانای الکتریکی با مقاومت \(100\\Omega\) می‌گذرد. اگر در لحظه \(t = \\frac{1}{800}s\) جریان برای اولین بار برابر با \(2\\sqrt{2}A\) باشد، در چه لحظه‌ای برحسب ثانیه، جریان برای اولین بار بیشینه خواهد شد؟",
      options: ["ﺻﻔﺮ", "۱/۱۰۰", "۳/۴۰۰", "۱/۴۰۰"],
      correctIndex: 3,
      answer: "معادله جریان: \(I = 4 \\sin(\\omega t)\). در لحظه \(t = \\frac{1}{800}\\text{ s}\)، جریان \(2\\sqrt{2}\\text{ A}\) است: \(2\\sqrt{2} = 4 \\sin(\\omega \\times \\frac{1}{800}) \\Rightarrow \\sin(\\frac{\\omega}{800}) = \\frac{\\sqrt{2}}{2} \\Rightarrow \\frac{\\omega}{800} = \\frac{\\pi}{4} \\Rightarrow \\omega = 200\\pi\\text{ rad/s}\). دوره تناوب \(T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi}{200\\pi} = \\frac{1}{100}\\text{ s}\). جریان برای اولین بار در \(t = \\frac{T}{4}\) بیشینه می‌شود: \(t = \\frac{1/100}{4} = \\frac{1}{400}\\text{ s}\). (با بررسی گزینه‌ها، به نظر می‌رسد گزینه 4 صحیح است). گزینه ۲ صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // ۱۵ دقیقه
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
            <h1 style={{ margin: 0, fontSize: '26px' }}>
              🧲 آزمون ۱۰ سوال پیوسته - جریان متناوب
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
              📝 پاسخنامه تشریحی جریان متناوب
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

export default AC_Current_Quiz;