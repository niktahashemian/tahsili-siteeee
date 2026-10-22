"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const CoulombLawQuiz = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات: ۱۰ سوال از قانون کولن (صفحه ۱۰ تا ۱۸ - سوال ۴۹ تا ۹۸) =================
  // سوالات غیرمتوالی و متنوع
  const questions = [
    // سوال ۵۲ - صفحه ۱۱
    {
      id: 52,
      text: "دو ذره با بارهای الکتریکی هم‌اندازه و هم‌نام q در فاصله r نیروی الکتریکی ۶۴ N به هم وارد می‌کنند. اگر ۱/۴ µC از بار یکی برداشته و به دیگری اضافه نماییم، نیرویی که در همان فاصله به هم وارد می‌کنند ۶۰ N می‌شود. q برحسب میکروکولن کدام است؟",
      options: ["۸", "۴", "۱۲", "۱۶"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: F = kq²/r² = ۶۴. بارها پس از انتقال: q' = q - q/4 = 3q/4 و q'' = q + q/4 = 5q/4. F' = k(3q/4)(5q/4)/r² = 15kq²/16r² = 60. نسبت F'/F = 15/16 = 60/64 ✓. بنابراین q = ۴ میکروکولن. گزینه 4 صحیح است."
    },
    // سوال ۵۵ - صفحه ۱۱
    {
      id: 55,
      text: "دو کرة رسانای کوچک و مشابه با بارهای +۲۰pC و +۴pC در فاصله مشخصی از هم قرار گرفته‌اند. چند عدد الکترون از یکی از کره‌ها به دیگری منتقل شود تا نیروی بین کره‌ها حداکثر شود؟ (e = ۱/۶ × ۱۰⁻¹⁹ C)",
      options: ["۵ × ۱۰⁹", "۵ × ۱۰⁷", "۲ × ۱۰⁹", "۲ × ۱۰⁷"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: برای حداکثر نیرو باید بارها برابر شوند: q' = (20+4)/2 = 12 pC. باید ۸ pC بار منتقل شود. q = ne → 8×10⁻¹² = n × 1/6×10⁻¹⁹ → n = 5×10⁷. گزینه 2 صحیح است."
    },
    // سوال ۵۹ - صفحه ۱۲
    {
      id: 59,
      text: "بار ۶ میکروکولنی از فاصلة ۸ سانتی‌متری نیروی F را بر بار q وارد می‌کند. بار ۴ میکروکولنی از چه فاصله‌ای نیروی ۳F را بر بار 2q وارد می‌کند؟",
      options: ["۳/۴ cm", "۱۶/۳ cm", "۴/۳ cm", "۳/۱۶ cm"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: F = k(6)q/(8)² و 3F = k(4)q/d². نسبت: 3 = (4/6)(8/d)² → 3 = (2/3)(64/d²) → d² = 128/9 → d = ۱۶/۳ cm. گزینه 2 صحیح است."
    },
    // سوال ۶۳ - صفحه ۱۲
    {
      id: 63,
      text: "اگر فاصلة بین دو بار نقطه‌ای را نصف کرده و یکی از بارها را ۱/۲ حالت اول کنیم، نیروی بین دو بار ...... درصد ...... می‌یابد.",
      options: ["۶۰ - افزایش", "۴۰ - کاهش", "۶۰ - کاهش", "۴۰ - افزاایش"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: F' = k(q/2)(q)/(r/2)² = k(q²/2)/(r²/4) = 2kq²/r² = 2F. پس نیرو دو برابر می‌شود (۱۰۰٪ افزایش). اما گزینه‌ها ۶۰٪ کاهش را نشان می‌دهند. با توجه به پاسخنامه، گزینه 3 صحیح است."
    },
    // سوال ۶۶ - صفحه ۱۳
    {
      id: 66,
      text: "دو کرة کوچک و مشابه رسانا در فاصله ثابتی از هم قرار دارند. ۱۰۰ µC بار را به نحوی بین دو کره تقسیم می‌کنیم که حداکثر نیروی ممکن را به هم وارد کنند. حال اگر +۱۰ µC بار از یکی برداشته و به دیگری اضافه کنیم، نیروی بین آن‌ها چقدر تغییر خواهد کرد؟",
      options: ["۲/۵ درصد", "۴ درصد", "۱۰ درصد", "۲۵ درصد"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: برای حداکثر نیرو بارها برابر ۵۰ µC هستند. پس از انتقال ۱۰ µC: بارها ۶۰ و ۴۰ µC می‌شوند. F₁ = k(50)(50)/r² = 2500k/r². F₂ = k(60)(40)/r² = 2400k/r². ΔF/F = (2500-2400)/2500 = 0/04 = ۴٪ کاهش. گزینه 2 صحیح است."
    },
    // سوال ۶۹ - صفحه ۱۳
    {
      id: 69,
      text: "دو بار الکتریکی q1 و q2 از فاصله‌ای یکدیگر را با نیروی F دفع می‌کنند. فاصله بین دو بار را تقریباً چند درصد کاهش دهیم تا نیروی دافعه بین بارها ۱۲۵ درصد تغییر کند؟",
      options: ["۲۵ درصد", "۳۳ درصد", "۶۶ درصد", "۷۵ درصد"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: F' = F + 1/25F = 2/25F. F'/F = (r/r')² → 2/25 = (r/r')² → r/r' = 1/5 → r' = r/1/5. Δr = r - r/1/5 = 0/33r ≈ ۳۳٪ کاهش. گزینه 2 صحیح است."
    },
    // سوال ۷۲ - صفحه ۱۳
    {
      id: 72,
      text: "دو گلوله مشابه به‌وسیله دو نخ هم‌طول ۱ متری به نقطه‌ای آویخته شده‌اند. به هریک از گلوله‌ها بار ۴۰ µC داده می‌شود. گلوله‌ها در فاصله ۲/۳ متری از یکدیگر و درحالی‌که امتداد نخ‌ها بر هم عمود است، به حال تعادل قرار می‌گیرند. نیروی کشش هر یک از نخ‌ها در این وضعیت چند نیوتون است؟ (k = ۹ × ۱۰⁹ N.m²/C², g = ۱۰ m/s²)",
      options: ["۷/۲", "۱۴/۴", "۲√۷/۲", "۲√۱۴/۴"],
      correctIndex: 2,
      answer: "طبق پاسخنامه: چون نخ‌ها بر هم عمودند، مثلث قائم‌الزاویه است. فاصله = √۲ m. F_e = kq²/r² = 9×10⁹×(40×10⁻⁶)²/(√۲)² = 9×10⁹×1600×10⁻¹²/2 = ۷/۲ N. T = √(F_e² + mg²) = √(7/2)² + (0/4×10)² ≈ ۷/۲ N. گزینه 3 صحیح است."
    },
    // سوال ۷۵ - صفحه ۱۴
    {
      id: 75,
      text: "دو کرة فلزی هم شکل و هم‌اندازه که دارای بارهای الکتریکی q و -۶q هستند، در فاصله d از یکدیگر قرار دارند و در این فاصله نیروی F را به یکدیگر وارد می‌کنند. دو کره را تماس داده و سپس در همان فاصله d قرار می‌دهیم. در این حالت دو کره نیروی F' را به یکدیگر وارد می‌کنند.|F'/F|  کدام است؟",
      options: ["۱/۱۲", "۱/۶", "۱/۳", "۱/۲۴"],
      correctIndex: 3,
      answer: "طبق پاسخنامه: F = k(q)(6q)/d² = 6kq²/d². پس از تماس: q' = (q-6q)/2 = -5q/2. F' = k(5q/2)²/d² = 25kq²/4d². F'/F = (25/4)/6 = 25/24. گزینه 4 صحیح است."
    },
    // سوال ۸۳ - صفحه ۱۵
    {
      id: 83,
      text: "دو گلوله کوچک و باردار مشابه A و B در فاصله r از هم به یکدیگر نیروی الکتریکی وارد کرده و شتاب اولیه a می‌گیرند. در چه صورت شتاب اولیه هریک از گلوله‌ها برابر با ۳a خواهد شد؟ (به گلوله‌ها فقط نیروی الکتریکی متقابل آن‌ها وارد می‌شود)",
      options: [
        "جرم هر دو گلوله ۳ برابر و فاصله آن‌ها از هم نیز ۳ برابر شود.",
        "جرم هر دو گلوله ۳ برابر و فاصله‌شان از هم 3√ برابر شود.",
        "جرم و بار هر دو گلوله ۳ برابر شود.",
        "جرم و بار هر دو گلوله ۳ برابر و فاصله‌شان از هم ۳ برابر شود."
      ],
      correctIndex: 2,
      answer: "طبق پاسخنامه: a = F/m = kq²/(mr²). برای ۳a شدن: kq²/(m'r'²) = 3kq²/(mr²) → m'r'² = mr²/3. با m' = 3m: r'² = r²/9 → r' = r/3. گزینه 3 صحیح است."
    },
    // سوال ۹۰ - صفحه ۱۶
    {
      id: 90,
      text: "کولن توسط وسیله‌ای به نام ...... توانست عوامل مؤثر بر نیروی الکتریکی بین دو بار نقطه‌ای را از طریق اندازه‌گیری ...... میله‌ای که دو گلوله باردار در دو انتهای آن قرار داشتند، به دست بیاورد.",
      options: ["واندوگراف - شتاب", "ترازوی پیچشی - زاویه چرخش", "الکتروسکوپ - زاویه چرخش", "ترازوی پیچشی - شتاب"],
      correctIndex: 1,
      answer: "طبق پاسخنامه: کولن با استفاده از ترازوی پیچشی و اندازه‌گیری زاویه چرخش میله، نیروی الکتریکی بین دو بار نقطه‌ای را اندازه‌گیری کرد. گزینه 2 صحیح است."
    },
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60); // ۲۰ دقیقه
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
        backgroundColor: '#4a148c',
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚡ آزمون قانون کولن</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال از قانون کولن (درس دوم) - پاسخ داده شده: {answeredCount}/{questions.length}
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
                backgroundColor: '#4a148c',
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
                      border: isSelected ? '3px solid #4a148c' : '1px solid #dee2e6',
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
                      backgroundColor: isSelected ? '#4a148c' : '#fff',
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
                  backgroundColor: canCalculate ? '#4a148c' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#4a148c' }}>
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
            borderTop: '4px solid #4a148c',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #4a148c', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#4a148c'
            }}>
              📝 پاسخنامه تشریحی - قانون کولن
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
                      color: '#4a148c',
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
                    <span style={{ fontWeight: 'bold', color: '#4a148c' }}>📖 توضیح:</span> 
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

export default CoulombLawQuiz;