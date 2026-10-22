"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Reactivity = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات واکنش‌پذیری عناصر (صفحات ۳۹ تا ۵۰) =================
  const questions = [
    {
      id: 209,
      text: "کدام گزینه درست است؟\n۱) تمایل تبدیل به کاتیون در آهن بیشتر از سدیم است.\n۲) سرعت واکنش در هوای مرطوب در روی بیشتر از نقره است.\n۳) در واکنش FeO(s) + C(s) → واکنش‌پذیری واکنش‌دهنده‌ها از فرآورده‌ها کمتر است.\n۴) واکنش Na₂O(s) + C(s) → به‌طور طبیعی انجام می‌شود.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. سرعت واکنش در هوای مرطوب در روی بیشتر از نقره است، زیرا روی واکنش‌پذیری بیشتری نسبت به نقره دارد. بررسی سایر گزینه‌ها: گزینه ۱ نادرست (واکنش‌پذیری سدیم از آهن بیشتر است)، گزینه ۳ نادرست (واکنش‌پذیری فرآورده‌ها کمتر از واکنش‌دهنده‌هاست)، گزینه 2 درست (واکنش‌پذیری سدیم از کربن بیشتر است و این واکنش انجام نمی‌شود)."
    },
    {
      id: 218,
      text: "در گروه هالوژن‌ها با کاهش عدد اتمی چه تعداد از ویژگی‌های زیر افزایش می‌یابند؟\nالف) شعاع اتمی\nب) شمار الیه‌های الکترونی\nپ) دمای لازم برای واکنش با گاز هیدروژن\nت) واکنش‌پذیری\nث) خصلت نافلزی",
      options: ["۱ مورد", "۲ مورد", "۳ مورد", "۴ مورد"],
      correctIndex: 0,
      answer: "1 مورد (ت و ث). با کاهش عدد اتمی در گروه هالوژن‌ها، واکنش‌پذیری و خصلت نافلزی افزایش می‌یابند. شعاع اتمی، شمار الیه‌های الکترونی و دمای لازم برای واکنش با هیدروژن با کاهش عدد اتمی کاهش می‌یابند."
    },
    {
      id: 225,
      text: "کدام واکنش انجام‌پذیر نیست؟\n۱) KI + Br₂ →\n۲) KBr + I₂ →\n۳) KBr + Cl₂ →\n۴) KI + Cl₂ →",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 1,
      answer: "گزینه ۲ (KBr + I₂). فعالیت شیمیایی هالوژن‌ها در یک گروه از بالا به پایین کاهش می‌یابد (F > Cl > Br > I). بنابراین ید نمی‌تواند جانشین برم در KBr شود. اما کلر و برم می‌توانند جانشین ید و برم شوند."
    },
    {
      id: 229,
      text: "کدام فلز در شرایط یکسان در هوای مرطوب سریع‌تر واکنش می‌دهد؟\n۱) K\n۲) Fe\n۳) Cu\n۴) Na",
      options: ["K", "Fe", "Cu", "Na"],
      correctIndex: 0,
      answer: "پتاسیم (K). ترتیب واکنش‌پذیری فلزات: K > Na > Fe > Cu. پتاسیم واکنش‌پذیرترین فلز در بین گزینه‌ها است."
    },
    {
      id: 238,
      text: "اگر واکنش‌های (۱) و (۲) انجام‌پذیر ولی واکنش‌های (۳) و (۴) انجام‌ناپذیر باشند، کدام مقایسه در ارتباط با واکنش‌پذیری عناصر درست است؟\n۱) SnCl₂ + Fe → FeCl₂ + Sn\n۲) CuCO₃ + Fe → FeCO₃ + Cu\n۳) Cu + SnO → CuO + Sn\n۴) ZnO + Fe → FeO + Zn",
      options: ["Cu < Zn < Fe < Sn", "Sn < Cu < Zn < Fe", "Cu < Sn < Fe < Zn", "Sn < Cu < Fe < Zn"],
      correctIndex: 2,
      answer: "گزینه 3 (Cu < Sn < Fe < Zn). از واکنش ۱: Fe > Sn، از واکنش ۲: Fe > Cu، از واکنش ۳ (انجام‌ناپذیر): Cu < Sn، از واکنش ۴ (انجام‌ناپذیر): Zn > Fe. ترتیب نهایی: Cu < Sn < Fe < Zn."
    },
    {
      id: 240,
      text: "تحت شرایط مناسب، استخراج چه تعداد از فلزات زیر با استفاده از فلز کربن امکان‌پذیر است؟\n- سدیم - کلسیم - آهن - نقره",
      options: ["۱ فلز", "۲ فلز", "۳ فلز", "۴ فلز"],
      correctIndex: 1,
      answer: "۲ فلز (آهن و نقره). واکنش‌پذیری سدیم و کلسیم بیشتر از کربن است و کربن نمی‌تواند آن‌ها را از اکسیدشان جدا کند. اما آهن و نقره واکنش‌پذیری کمتری از کربن دارند و استخراج آن‌ها با کربن امکان‌پذیر است."
    },
    {
      id: 244,
      text: "کدام‌یک از واکنش‌های زیر به‌طور طبیعی انجام می‌شوند؟\nالف) ۲Na(s) + FeO(s) → Na₂O(s) + Fe(s)\nب) ۲Al(s) + Fe₂O₃(s) → ۲Fe(l) + Al₂O₃(s)\nپ) Cu(s) + FeSO₄(aq) → Fe(s) + CuSO₄(aq)\nت) Zn(s) + ۲AgNO₃(aq) → Zn(NO₃)₂(aq) + ۲Ag(s)",
      options: ["الف - ب", "الف - ب - پ", "ب - پ - ت", "الف - ب - ت"],
      correctIndex: 3,
      answer: "گزینه ۴ (الف - ب - ت). واکنش‌های الف (Na > Fe)، ب (Al > Fe) و ت (Zn > Ag) به‌طور طبیعی انجام می‌شوند. اما واکنش پ (Cu < Fe) انجام‌پذیر نیست."
    },
    {
      id: 246,
      text: "چه تعداد از عبارت‌های زیر درست است؟\nالف) هرچه پایداری فلزی بیشتر باشد، استخراج آن آسان‌تر است.\nب) در واکنش‌های شیمیایی که به‌طور طبیعی انجام می‌شوند، واکنش‌پذیری فرآورده‌ها از واکنش‌دهنده‌ها بیشتر است.\nپ) هرچه فلزی فعال‌تر باشد، میل بیشتری به ایجاد ترکیب دارد و ترکیب‌هایش ناپایدارتر از خودش است.\nت) واکنش‌پذیری هر فلز به معنای تمایل آن برای به دست آوردن الکترون است، ازاین‌رو واکنش‌پذیری پتاسیم از سدیم بیشتر است.",
      options: ["۱ مورد", "۲ مورد", "۳ مورد", "۴ مورد"],
      correctIndex: 0,
      answer: "فقط مورد الف درست است. بررسی: الف) درست (پایداری بیشتر = استخراج آسان‌تر). ب) نادرست (واکنش‌پذیری فرآورده‌ها کمتر است). پ) نادرست (ترکیب‌هایش پایدارتر از خودش است). ت) نادرست (واکنش‌پذیری فلز به تمایل به از دست دادن الکترون است نه گرفتن)."
    },
    {
      id: 264,
      text: "در ﻣﻮرد واﮐﻨﺶ ﻓﻠﺰ ﭘﺘﺎﺳﯿﻢ ﺑﺎ ﮔﺎز ﮐﻠﺮ ﮐﺪام ﮔﺰﯾﻨﻪ درﺳﺖ اﺳﺖ؟\n1) ﺷﺪت اﯾﻦ واﮐﻨﺶ ﮐﻤﺘﺮ از ﺷﺪت واﮐﻨﺶ ﺳﺪﯾﻢ ﺑﺎ ﮔﺎز ﮐﻠﺮ اﺳﺖ.\n۲)ﭘﺘﺎﺳﯿﻢ و ﮐﻠﺮ در اﺛﺮ واﮐﻨﺶ و دادوﺳﺘﺪ اﻟﮑﺘﺮون ﯾﻮن ﻫﺎﯾﯽ ﺑﺎ ﺷﻌﺎع ﺑﺮاﺑﺮ اﯾﺠﺎد ﻣﯽ ﮐﻨﻨﺪ.\n۳) ﻣﺠﻤﻮع ﺿﺮاﯾﺐ واﮐﻨﺶ ﻣﻮازﻧﻪ ﺷﺪۀ آن ﺑﺮاﺑﺮ اﺳﺖ ﺑﺎ ﺗﻌﺪاد اﻟﮑﺘﺮون ﻫﺎی ﻇﺮﻓﯿتAs33\n۴)  اﮔﺮ در اﯾﻦ واﮐﻨﺶ ﺑﻪ ﺟﺎی ﮔﺎز ﮐﻠﺮ از ﮔﺎز ﻓﻠﻮﺋﻮر اﺳﺘﻔﺎده ﮐﻨﯿﻢ، ﺷﺪت واﮐﻨﺶ ﮐﻤﺘﺮ ﺧﻮاﻫﺪ ﺷﺪ.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 0,
      answer: "گزینه 1 (FeO + ۲Na → Na₂O + Fe). سدیم واکنش‌پذیری بیشتری از آهن دارد و می‌تواند آن را از اکسیدش جدا کند. در گزینه‌های دیگر، واکنش‌پذیری عنصر اول از عنصر دوم کمتر است."
    },
    {
      id: 266,
      text: "ﭼﻪ ﺗﻌﺪاد از ﻋﺒﺎرت ﻫﺎی زﯾﺮ درﺳﺖ اﺳﺖ؟\nاﻟﻒ) اﻏﻠﺐ ﻋﻨﺼﺮﻫﺎ ﺑﻪ ﺷﮑﻞ ﺗﺮﮐﯿﺐ ﯾﺎﻓﺖ ﻣﯽ ﺷﻮﻧﺪ.\n ب) اﺳﺘﺨﺮاج ﻓﻠﺰ آﻫﻦ از ﻣﺲ دﺷﻮارﺗﺮ اﺳﺖ.\n پ) زﻣﺎﻧﯽ ﮐﻪ ﭘﺎﯾﺪاری ﻓﺮآورده ﻫﺎ از واﮐﻨﺶ دﻫﻨﺪه ﻫﺎ ﺑﯿﺸﺘﺮ ﺑﺎﺷﺪ، واﮐﻨﺶ ﺑﻪ ﺻﻮرت ﻃﺒﯿﻌﯽ اﻧﺠﺎم ﻣﯽ ﺷﻮد.\n ت) ﻓﻠﺰات اﻏﻠﺐ در ﻃﺒﯿﻌﺖ ﺑﻪ ﺷﮑﻞ ﺳﻨﮓ ﻣﻌﺪن ﯾﺎﻓﺖ ﻣﯽ ﺷﻮﻧﺪ.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 3,
      answer: "گزینه 4 نادرست است. سدیم واکنش‌پذیرتر از آلومینیم است، بنابراین شرایط نگهداری آن دشوارتر است نه آسان‌تر. بررسی سایر گزینه‌ها: گزینه ۲ نادرست است (پتاسیم واکنش‌پذیرتر از سدیم است)، گزینه 4 نادرست است (واکنش‌پذیری فلزات قلیایی از قلیایی خاکی بیشتر است)، گزینه ۴ درست است (روی از مس واکنش‌پذیرتر است)."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>⚗️ واکنش‌پذیری عناصر</h1>
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
              📝 پاسخنامه تشریحی - واکنش‌پذیری عناصر
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

export default Shimi2Reactivity;