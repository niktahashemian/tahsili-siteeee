"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// ==================== کامپوننت نمودار SVG سوال ۱۵۹ ====================
const Q159Diagram = () => (
  <svg
    viewBox="0 0 420 320"
    style={{
      width: '100%',
      maxWidth: '420px',
      height: 'auto',
      backgroundColor: '#fff',
      borderRadius: '8px',
      direction: 'ltr',
    }}
  >
    <rect width="420" height="320" fill="#ffffff" />

    {/* محور y */}
    <line x1="70" y1="280" x2="70" y2="30" stroke="#000" strokeWidth="2" />
    <polygon points="70,22 64,38 76,38" fill="#000" />
    <text x="50" y="35" fontSize="16" fontFamily="Tahoma" fill="#000" fontWeight="bold">y</text>
    <text x="82" y="50" fontSize="16" fontFamily="Tahoma" fill="#000">j</text>

    {/* محور x */}
    <line x1="70" y1="280" x2="390" y2="280" stroke="#000" strokeWidth="2" />
    <polygon points="398,280 382,274 382,286" fill="#000" />
    <text x="375" y="305" fontSize="16" fontFamily="Tahoma" fill="#000" fontWeight="bold">x</text>
    <text x="355" y="270" fontSize="16" fontFamily="Tahoma" fill="#000">i</text>

    {/* مبدأ مختصات */}
    <text x="48" y="300" fontSize="14" fontFamily="Tahoma" fill="#000" fontWeight="bold">O</text>
    <circle cx="70" cy="280" r="3" fill="#000" />
  </svg>
);

// ==================== کامپوننت نمودار SVG سوال ۱۶۲ ====================
const Q162Diagram = () => (
  <svg
    viewBox="0 0 520 380"
    style={{
      width: '100%',
      maxWidth: '520px',
      height: 'auto',
      backgroundColor: '#fff',
      borderRadius: '8px',
      direction: 'ltr',
    }}
  >
    <rect width="520" height="380" fill="#ffffff" />

    {/* محور y */}
    <line x1="70" y1="30" x2="70" y2="300" stroke="#000" strokeWidth="2" />
    <polygon points="70,22 64,38 76,38" fill="#000" />

    {/* محور x */}
    <line x1="70" y1="300" x2="480" y2="300" stroke="#000" strokeWidth="2" />
    <polygon points="488,300 472,294 472,306" fill="#000" />

    {/* برچسب محورها */}
    <text x="30" y="25" fontSize="15" fontFamily="Tahoma" fill="#000" fontWeight="bold">
      E(N/C)
    </text>
    <text x="455" y="330" fontSize="15" fontFamily="Tahoma" fill="#000" fontWeight="bold">
      r(cm)
    </text>

    {/* منحنی E ∝ 1/r² */}
    <path
      d="M 130 55 Q 155 100, 190 155 Q 230 215, 290 250 Q 350 272, 440 285"
      fill="none"
      stroke="#1E88E5"
      strokeWidth="2.5"
    />

    {/* خط‌چین افقی برای مقدار 16 */}
    <line
      x1="70"
      y1="105"
      x2="160"
      y2="105"
      stroke="#dc3545"
      strokeWidth="1.5"
      strokeDasharray="6,4"
    />
    <text x="20" y="110" fontSize="14" fontFamily="Tahoma" fill="#dc3545" fontWeight="bold">
      16
    </text>

    {/* نقطه روی منحنی در r = d */}
    <circle cx="160" cy="105" r="5" fill="#dc3545" stroke="#fff" strokeWidth="2" />

    {/* خط‌چین عمودی از r = d */}
    <line
      x1="160"
      y1="105"
      x2="160"
      y2="300"
      stroke="#dc3545"
      strokeWidth="1.5"
      strokeDasharray="6,4"
    />
    <text x="148" y="325" fontSize="14" fontFamily="Tahoma" fill="#dc3545" fontWeight="bold">
      d
    </text>

    {/* خط‌چین افقی برای مقدار 1 */}
    <line
      x1="70"
      y1="280"
      x2="380"
      y2="280"
      stroke="#1E88E5"
      strokeWidth="1.5"
      strokeDasharray="6,4"
    />
    <text x="45" y="285" fontSize="14" fontFamily="Tahoma" fill="#1E88E5" fontWeight="bold">
      1
    </text>

    {/* نقطه روی منحنی در r = d+30 */}
    <circle cx="380" cy="278" r="5" fill="#1E88E5" stroke="#fff" strokeWidth="2" />

    {/* خط‌چین عمودی از r = d+30 */}
    <line
      x1="380"
      y1="278"
      x2="380"
      y2="300"
      stroke="#1E88E5"
      strokeWidth="1.5"
      strokeDasharray="6,4"
    />
    <text x="355" y="325" fontSize="14" fontFamily="Tahoma" fill="#1E88E5" fontWeight="bold">
      d+30
    </text>

    {/* مبدأ مختصات */}
    <text x="52" y="318" fontSize="14" fontFamily="Tahoma" fill="#000" fontWeight="bold">
      O
    </text>

    {/* نمایش فاصله ۳۰ سانتی‌متری بین دو نقطه */}
    <line x1="160" y1="350" x2="380" y2="350" stroke="#28a745" strokeWidth="1.5" />
    <line x1="160" y1="344" x2="160" y2="356" stroke="#28a745" strokeWidth="1.5" />
    <line x1="380" y1="344" x2="380" y2="356" stroke="#28a745" strokeWidth="1.5" />
    <text
      x="270"
      y="370"
      fontSize="13"
      fontFamily="Tahoma"
      fill="#28a745"
      fontWeight="bold"
      textAnchor="middle"
    >
      30 cm
    </text>
  </svg>
);

const ElectricFieldQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات میدان الکتریکی حاصل از یک ذره باردار =================
  const questions = [
    // سوال ۱۵۰
    {
      id: 150,
      text: "بار آزمون q0 = +5nC را نزدیک بار الکتریکی Q قرار می‌دهیم. در این نقطه نیروی F = 5×10⁻⁶ N i − 12×10⁻⁶ N j بر بار آزمون وارد می‌شود. بزرگی میدان الکتریکی در محلی که بار آزمون قرار گرفته، چند نیوتون بر کولن است؟",
      options: ["3/4 × 10³", "1/4 × 10³", "2/6 × 10³", "4/2 × 10³"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: گزینه ۳ صحیح است. با استفاده از E = F/q و محاسبه اندازه بردار نیرو، E = √(5²+12²)×10⁻⁶ / 5×10⁻⁹ = 2/6×10³ N/C."
    },
    // سوال ۱۵۲
    {
      id: 152,
      text: "میدان الکتریکی در فاصله 24 سانتی‌متری از بار q برابر با 18 N/C است. چند سانتی‌متر باید به بار q نزدیک شویم تا میدان الکتریکی حاصل از آن برابر با 32 N/C شود؟",
      options: ["18", "24", "6", "8"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: گزینه ۳ صحیح است. با استفاده از E1/E2 = (r2/r1)² و حل معادله، r2 = 18cm و Δr = 24−18 = 6cm."
    },
    // سوال ۱۵۳
    {
      id: 153,
      text: "به ذره باردار q در میدان الکتریکی یکنواخت به بزرگی 2×10⁵ N/C نیروی F = (−0/5 N)i + (1/2 N)j در خلاف جهت میدان الکتریکی وارد شده است. q برحسب میکروکولن کدام است؟",
      options: ["−2", "2", "6/5", "−6/5"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: گزینه ۴ صحیح است. چون نیرو خلاف جهت میدان است، بار منفی است. E = F/|q| → 2×10⁵ = √(0/5²+0/5²)/|q| → |q| = 2μC و q = −2μC."
    },
    // سوال ۱۵۴
    {
      id: 154,
      text: "دو بار الکتریکی q1 = +20μC و q2 = −40μC در نقاط A و B قرار دارند. اگر q1 بر q2 نیرویی به اندازه 0/4 نیوتون در جهت مثبت محور x‌ها وارد کند و میدان الکتریکی حاصل از بار q2 در نقطه A را با E2 و میدان الکتریکی حاصل از بار q1 در نقطه B را با E1 بنامیم، E1 و E2 برحسب واحد SI کدام هستند؟",
      options: [
        "E1 = +10⁻⁵ i , E2 = −2×10⁻⁵ i",
        "E1 = −10⁻⁵ i , E2 = −2×10⁻⁵ i",
        "E1 = +10⁻⁵ i , E2 = +2×10⁻⁵ i",
        "E1 = −10⁻⁵ i , E2 = +2×10⁻⁵ i"
      ],
      correctIndex: 1,
      answer: "طبق پاسخنامه: گزینه ۲ صحیح است. E1 = F/q1 = 0/4/20×10⁻⁶ = 2×10⁴ (خلاف محور x) و E2 = F/q2 = 0/4/−40×10⁻⁶ = −10⁴ (هم‌جهت با محور x)."
    },
    // سوال ۱۵۵
    {
      id: 155,
      text: "کره رسانایی به شعاع 10cm بار الکتریکی 20μC دارد. در فاصله 30cm از مرکز کره میدان الکتریکی آن چند نیوتون بر کولن است؟ (k = 9×10⁹ N.m²/C)",
      options: ["6 × 10²", "2 × 10⁶", "2 × 10²", "6 × 10⁵"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: گزینه ۴ صحیح است. E = kQ/r² = 9×10⁹ × 20×10⁻⁶ / (0/3)² = 2×10⁶ N/C."
    },
    // سوال ۱۵۷
    {
      id: 157,
      text: "اگر اندازه میدان الکتریکی حاصل از بار الکتریکی نقطه‌ای q در فاصله 20cm از آن، 24 mN/C بیشتر از اندازه میدان الکتریکی در 1 متری از آن باشد، اندازه میدان الکتریکی در 25 سانتی‌متری این ذره چند N/C است؟",
      options: ["0/008", "0/032", "0/064", "0/016"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: گزینه ۴ صحیح است. با محاسبه kq از اختلاف میدان‌ها و سپس E = kq/(0/25)² = 0/008 N/C."
    },
    // سوال ۱۵۹ - دارای نمودار SVG
    {
      id: 159,
      text: "بار الکتریکی q = −2μC در نقطه‌ای در صفحه مختصات قرار دارد به‌طوری که میدان الکتریکی آن در مبدأ مختصات E0 = 2×10⁵ j (SI) است. بردار میدان الکتریکی بار q در نقطه A(0/1m)(0/3m) کدام است؟ (k = 9×10⁹ N.m²/C²)",
      diagramType: 'q159',
      options: ["−8 × 10⁵ j", "−1/8 × 10⁶ j", "−1/8 × 10⁶ j", "−8 × 10⁵ j"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: گزینه ۳ صحیح است. بار در فاصله ۰/۳m از مبدأ روی محور y است. در نقطه A(0/1m) فاصله ۰/۲m و E = 9×10⁹×2×10⁻⁶/(0/2)² = 4/5×10⁵ به سمت بار (منفی) → −1/8×10⁵ j."
    },
    // سوال ۱۶۰
    {
      id: 160,
      text: "نمودار بزرگی میدان الکتریکی حاصل از بار الکتریکی نقطه‌ای q برحسب فاصله از بار، به صورت شکل زیر است. به ترتیب از راست به چپ بزرگی بار چند نانوکولن است و E1 چند kN/C می‌باشد؟",
      options: ["9/6 و 98", "9/8 و 96", "9/6 و 9/6", "9/8 و 98"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: گزینه ۴ صحیح است. با استفاده از داده‌های نمودار (r=2cm و r=8cm)، q = 9/8 nC و E1 = 9/8 kN/C محاسبه می‌شود."
    },
    // سوال ۱۶۲ - دارای نمودار SVG
    {
      id: 162,
      text: "نمودار تغییر میدان الکتریکی بار نقطه‌ای q برحسب فاصله تا بار به شکل زیر است. اندازه بار الکتریکی در SI کدام است؟ (k = 9×10⁹ N.m²/C²، در r=d مقدار 16 و در r=d+30 مقدار 1)",
      diagramType: 'q162',
      options: ["10⁻¹²", "16 × 10⁻¹²", "10⁻¹⁰", "16 × 10⁻¹⁰"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: گزینه ۲ صحیح است. با حل دستگاه دو معادله: 16 = kq/d² و 1 = kq/(d+30)². از تقسیم: 16 = ((d+30)/d)² → 4 = (d+30)/d → 3d = 30 → d = 10cm. سپس q = 16 × (0/1)² / (9×10⁹) = 16×10⁻¹² C."
    },
    // سوال ۱۶۴
    {
      id: 164,
      text: "میدان الکتریکی در فاصله 20 سانتی‌متری از بار q برابر 18 N/C است. چند سانتی‌متر دیگر از بار فوق دور شویم تا میدان الکتریکی 15 واحد SI کاهش یابد؟",
      options: ["10", "20", "30", "40"],
      correctIndex: 0,
      answer: "طبق پاسخنامه: گزینه 1 صحیح است. E2 = 18−15 = 3 N/C. با استفاده از E1/E2 = (r2/r1)²، r2 = 50cm و Δr = 30cm."
    },
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
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
        backgroundColor: '#1565C0',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون فیزیک (۲) - میدان الکتریکی حاصل از یک ذره باردار</h1>
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
                backgroundColor: '#1565C0',
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

            {/* نمایش نمودار SVG برای سوال ۱۵۹ */}
            {q.diagramType === 'q159' && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0',
                padding: '15px',
                backgroundColor: '#fafafa',
                borderRadius: '8px',
                border: '1px dashed #ced4da'
              }}>
                <Q159Diagram />
              </div>
            )}

            {/* نمایش نمودار SVG برای سوال ۱۶۲ */}
            {q.diagramType === 'q162' && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '20px 0',
                padding: '15px',
                backgroundColor: '#fafafa',
                borderRadius: '8px',
                border: '1px dashed #ced4da'
              }}>
                <Q162Diagram />
              </div>
            )}

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
              📝 پاسخنامه تشریحی میدان الکتریکی حاصل از یک ذره باردار
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

export default ElectricFieldQuiz;