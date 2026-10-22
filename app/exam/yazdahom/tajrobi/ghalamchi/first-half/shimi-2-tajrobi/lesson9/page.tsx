"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson9 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۹: ظرفیت گرمایی و گرمایی ویژه =================
  // بازه سوالات ۹ تا ۴۵ (از صفحه ۳ تا ۱۰) - ۱۰ سوال رندوم
  const questions = [
    {
      id: 9,
      text: "اگر به ۱۰۷ گرم آلومینیوم با دمای ۲۰°C و ظرفیت گرمایی ۰/۸۵ J.g⁻¹.°C⁻¹ ۲۵/۶ کالری گرما دهیم، دمای آن در مقیاس سلسیوس تقریباً چند درصد افزایش می‌یابد؟ (Al = ۲۷ g.mol⁻¹)",
      options: ["۵/۹", "۶/۷", "۴/۳", "۵"],
      correctIndex: 0,
      answer: "گزینه ۱ (۵/۹). ۲۵/۶ کالری معادل ۱۰۷ ژول است. Q = mcΔθ → ۱۰۷ = ۱۰۷ × ۰/۸۵ × Δθ → Δθ ≈ ۱/۱۸°C. درصد افزایش = (۱/۱۸ / ۲۰) × ۱۰۰ ≈ ۵/۹٪"
    },
    {
      id: 16,
      text: "ﮐﺪام ﮔﺰﯾﻨﻪ درﺳﺖ اﺳﺖ؟",
      options: ["ﻇﺮﻓﯿﺖ ﮔﺮﻣﺎﯾﯽ 11 ﮔﺮم اﺗﺎﻧﻮل ﺑﺎ ﭼدر دﻣﺎ و ﻓﺸﺎر ﯾﮑﺴﺎنری ﺑﯿﺸﺘﺮی ﺑﺮﺧﻮردار اﺳﺖ.", "گرمای 2m  ﮔﺮم آب 80 درﺟﮥ ﺳﺎﻧﺘﯽ ﮔﺮاد از آب 40 درﺟﮥ ﺳﺎﻧﺘﯽ ﮔﺮاد بیشتر اﺳﺖ.", "ﮔﺮﻣﺎی آزادﺷﺪه از ﯾﮏ واﮐﻨﺶ در دﻣﺎی ﺛﺎﺑﺖ، ﺑﻪ ﻃﻮر ﻋﻤﺪه واﺑﺴﺘﻪ ﺑﻪ ﺗﻔﺎوت اﻧﺮژی ﮔﺮﻣﺎﯾﯽ ﻣﻮاد واﮐﻨﺶ دﻫﻨﺪه و ﻓﺮآورده اﺳﺖ.", "ﻣﯿﺎﻧﮕﯿﻦ اﻧﺮژی ﺟﻨﺒﺸﯽ ذرات ﺳﺎزﻧﺪۀ ﯾﮏ ﻣﺎده راﺑﻄﮥ ﻣﺴﺘﻘﯿﻢ ﺑﺎ دﻣﺎی آن ﻣﺎده دارد."],
      correctIndex: 3,
      answer: "گزینه ۴ (۲۳°C). جرم اتانول = ۱۶ × ۰/۸ = ۱۲/۸g. Q = mcΔθ → ۳۶۹۰ = ۱۲/۸ × ۲/۴۶ × Δθ → Δθ = ۱۱۷/۲°C. دمای اولیه = ۵۳ - ۱۱۷/۲ = ۲۳°C"
    },
    {
      id: 17,
      text: "به‌تقریب چند گرم یخ ۰°C را به ۶۰g آب با دمای ۴۰°C اضافه کنیم تا درنهایت آب با دمای ۱۰°C داشته باشیم؟ (آنتالپی ذوب یخ تقریباً برابر ۳۳۳ J.g⁻¹ است، ظرفیت گرمایی ویژه آب هم ۴/۱۸ J.g⁻¹.°C⁻¹)",
      options: ["۳۲/۵", "۲۰", "۳۰", "۲۷"],
      correctIndex: 1,
      answer: "گزینه ۲ (۲۰). گرمای از دست رفته آب = ۶۰ × ۴/۱۸ × ۳۰ = ۷۵۲۴J. گرمای لازم برای ذوب یخ = m × ۳۳۳ + m × ۴/۱۸ × ۱۰ = ۳۷۴/۸m. m = ۷۵۲۴ / ۳۷۴/۸ ≈ ۲۰g"
    },
    {
      id: 20,
      text: "اگر به کربن دی‌اکسید حاصل از واکنش میان ۳۰ گرم کربن ۸۰ درصد خالص با مقدار کافی گاز اکسیژن، ۸۸۰ ژول گرما دهیم، دمای آن چند درجه افزایش می‌یابد؟ (ظرفیت گرمایی ویژه CO₂ = ۰/۸۴ J.g⁻¹.K⁻¹ و O = ۱۶ : g.mol⁻¹)",
      options: ["۱۲/۵", "۱۰", "۱۳/۵", "۱۵"],
      correctIndex: 1,
      answer: "گزینه ۲ (۱۰). کربن خالص = ۲۴g. C + O₂ → CO₂. ۲۴g C → ۸۸g CO₂. Q = mcΔθ → ۸۸۰ = ۸۸ × ۰/۸۴ × Δθ → Δθ = ۱۰°C"
    },
    {
      id: 24,
      text: "اگر ۱۰ گرم اتانول با جذب ۴۸/۶ ژول گرما از دمای ۲۴°C به دمای ۲۶°C برسد، ظرفیت گرمایی مولی آن چند ژول بر مول بر درجه سانتی‌گراد است؟ (C = ۱۲, O = ۱۶, H = ۱: g.mol⁻¹)",
      options: ["۲/۴۳", "۱۱/۷۸", "۱۱۵/۴", "۲/۶۵"],
      correctIndex: 0,
      answer: "گزینه 1 (۱۱/۷۸). Q = mcΔθ → ۴۸/۶ = ۱۰ × c × ۲ → c = ۲/۴۳ J.g⁻¹.°C⁻¹. ظرفیت گرمایی مولی = ۲/۴۳ × ۴۶ = ۱۱۱/۷۸ J.mol⁻¹.°C⁻¹"
    },
    {
      id: 32,
      text: "۱۰ گرم منگنز دی‌اکسید ۹۰ درصد خالص را در مقدار کافی محلول هیدروکلریک اسید حل می‌کنیم. گاز به‌دست‌آمده از این واکنش را مطابق معادله موازنه‌نشده زیر جمع‌آوری کرده و به آن ۵۰/۴ ژول گرما می‌دهیم تا دمای آن ۱۵°C افزایش یابد. اگر گرمای ویژه گاز کلر ۰/۴۸ J.g⁻¹.°C⁻¹ باشد، بازده درصدی واکنش کدام است؟ (O = ۱۶, Cl = ۳۵/۵, Mn = ۵۵ : g.mol⁻¹)",
      options: ["۹۵/۹", "۸۷/۶", "۹۵/۹", "۸۷/۶"],
      correctIndex: 0,
      answer: "گزینه 1 (۸۷/۶). Q = mcΔθ → ۵۰/۴ = m × ۰/۴۸ × ۱۵ → m = ۷g Cl₂ (عملی). مقدار نظری Cl₂ = ۱۰ × ۰/۹ × (۱mol MnO₂/۸۷g) × (۱mol Cl₂/۱mol MnO₂) × ۷۱g = ۷/۳۴g. بازده = ۷/۷/۳۴ × ۱۰۰ ≈ ۹۵/۹٪ (نکته: پاسخ صحیح ۹۵/۹ است اما در گزینه‌ها به صورت ۸۷/۶ آمده، احتمالاً اشتباه تایپی)"
    },
    {
      id: 33,
      text: "ﮐﺪام ﻣﻮرد از ﻣﻄﺎﻟﺐ زﯾﺮ ﻫﻤﻮاره ﺻﺤﯿﺢ اﺳﺖ؟ \n اﻟﻒ) ﻇﺮﻓﯿﺖ ﮔﺮﻣﺎﯾﯽ از ﻟﺤﺎظ ﻋﺪدی ﺑﺰرگ ﺗﺮ از ﻇﺮﻓﯿﺖ ﮔﺮﻣﺎﯾﯽ وﯾﮋه اﺳﺖ.\n ب) ﺑﻮﺗﺎن در دﻣﺎی ﮐﻤﺘﺮی ﻧﺴﺒﺖ ﺑﻪ ﻫﮕﺰان از ﻓﺎز ﮔﺎز ﺑﻪ ﻣﺎﯾﻊ ﺗﺒﺪﯾﻞ ﻣﯽ ﺷﻮد.\n پ) اﺧﺘﻼف ﺟﺮم ﻣﻮﻟﮑﻮﻟﯽ ﺳﯿﮑﻠﻮﻫﮕﺰان و ﺑﻨﺰن ﺑﺮاﺑﺮ ﺑﺎ ﺟﺮم 3 ﻣﻮﻟﮑﻮل ﻫﯿﺪروژن اﺳﺖ.\n ت) فرمول عمومی الکان ها cnH2n+2بوده و ترکیبی با فرمول C4H8 حتما یک الکان است",
      options: ["اﻟﻒ - ب - ت", "ب - پ", "پ - ت - ث", "ﻫﻤﮥ ﻣﻮارد"],
      correctIndex: 1,
      answer: "گزینه ۲ (۶۲). از نمودار: Δθ = ۳°C و Q = ۳۶J. c = Q/(mΔθ) = ۳۶/(۵×۳) = ۲/۴ J.g⁻¹.°C⁻¹. ظرفیت گرمایی ۴ مول = ۴ × ۳۷/۲ = ۱۴۸/۸ J.°C⁻¹. جرم مولی = ۱۴۸/۸ / ۲/۴ = ۶۲ g.mol⁻¹"
    },
    {
      id: 36,
      text: "هرگاه به ۲۰ گرم از بخار آب، اتانول، سدیم کلرید و اکسیژن که ظرفیت گرمایی ویژه هریک از آن‌ها به ترتیب ۲/۵، ۸/۵، ۰/۹۲ و ۰/۸۵ ژول بر گرم بر درجه سلسیوس است، ۱۰۰ ژول گرما داده شود، مقایسه تغییر دمای آن‌ها کدام است؟",
      options: [
        " اکسیژن> اتانول > بخار آب > سدیم کلرید",
        " اتانول> اکسیژن > بخار آب > سدیم کلرید",
        "اتانول  < اکسیژن < سدیم کلرید < بخار آب",
        "اتانول < بخار آب < اکسیژن < سدیم کلرید "
      ],
      correctIndex: 3,
      answer: "گزینه ۴. Δθ = Q/(mc). هرچه c بیشتر باشد، Δθ کمتر است. ترتیب c: اتانول (۸/۵) > بخار آب (۲/۵) > سدیم کلرید (۰/۹۲) > اکسیژن (۰/۸۵). پس ترتیب Δθ: اتانول < بخار آب < سدیم کلرید < اکسیژن. (گزینه ۱ درست است)"
    },
    {
      id: 40,
      text: "دمای ۴۰ گرم الکل با دریافت مقداری گرما از ۴۵°C به ۳۰°C می‌رسد. همین مقدار گرما دمای چند گرم گرافیت را به میزان ۸°C افزایش می‌دهد؟ (ظرفیت گرمایی یک مول گرافیت برابر ۸/۵ J.°C⁻¹ است؛ گرمای ویژه الکل ۲/۸ J.g⁻¹.°C⁻¹ و C = ۱۲ : g.mol⁻¹)",
      options: ["۲۴", "۲۹۶", "۱۴۸/۷۵", "۱۴۷/۵"],
      correctIndex: 1,
      answer: "گزینه ۲ (۲۹۶). گرمای از دست رفته الکل = ۴۰ × ۲/۸ × ۱۵ = ۱۶۸۰J. ظرفیت گرمایی گرافیت = ۸/۵ J.°C⁻¹ برای ۱ مول (۱۲g). Q = mcΔθ → ۱۶۸۰ = m × (۸/۵/۱۲) × ۸ → m = ۲۹۶g"
    },
    {
      id: 42,
      text: "اگر جرم ماده A دو برابر B و ظرفیت گرمایی ویژه ماده B، برابر نصف ظرفیت گرمایی ویژه ماده A باشد، مقدار گرمای لازم برای ماده A چند برابر ماده B خواهد بود، برای آنکه هر دو ماده تغییر دمایی یکسانی را داشته باشند؟",
      options: ["۴/۳", "۳/۴", "۳", "۱/۳"],
      correctIndex: 0,
      answer: "گزینه ۱ (۴). Q = mcΔθ. m_A = ۲m_B، c_B = ۱/۲ c_A → c_A = ۲c_B. Δθ_A = Δθ_B. Q_A/Q_B = (m_A × c_A)/(m_B × c_B) = (۲m_B × ۲c_B)/(m_B × c_B) = ۴"
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 دقیقه
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🌡️ درس ۹: ظرفیت گرمایی و گرمایی ویژه</h1>
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
              📝 پاسخنامه تشریحی - درس ۹: ظرفیت گرمایی و گرمایی ویژه
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

export default Shimi2Lesson9;