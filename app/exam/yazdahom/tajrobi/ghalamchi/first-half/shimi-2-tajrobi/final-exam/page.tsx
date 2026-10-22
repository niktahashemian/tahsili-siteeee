"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات شیمی (۲) - جامع =================
  const questions = [
    // ==================== فصل اول: عناصر و ترکیبات ====================
    {
      id: 1,
      text: "عناصر جدول تناوبی بر اساس چه ویژگی‌هایی مرتب شده‌اند؟",
      options: ["عدد اتمی", "جرم اتمی", "خواص شیمیایی", "همه موارد"],
      correctIndex: 0,
      answer: "عناصر بر اساس عدد اتمی (تعداد پروتون‌ها) مرتب شده‌اند."
    },
    {
      id: 2,
      text: "گروه‌های اصلی جدول تناوبی شامل چه عناصری هستند؟",
      options: ["گروه‌های ۱، ۲ و ۱۳ تا ۱۸", "گروه‌های ۳ تا ۱۲", "همه گروه‌ها", "گروه‌های ۱ تا ۸"],
      correctIndex: 0,
      answer: "گروه‌های اصلی شامل گروه‌های ۱، ۲ و ۱۳ تا ۱۸ هستند."
    },
    {
      id: 3,
      text: "عناصر واسطه (فلزات انتقالی) در کدام گروه‌ها قرار دارند؟",
      options: ["گروه‌های ۳ تا ۱۲", "گروه‌های ۱ و ۲", "گروه‌های ۱۳ تا ۱۸", "گروه‌های ۱ تا ۸"],
      correctIndex: 0,
      answer: "عناصر واسطه در گروه‌های ۳ تا ۱۲ قرار دارند."
    },
    {
      id: 4,
      text: "روند شعاع اتمی در یک دوره از چپ به راست چگونه است؟",
      options: ["کاهش می‌یابد", "افزایش می‌یابد", "ثابت می‌ماند", "ابتدا کاهش سپس افزایش"],
      correctIndex: 0,
      answer: "شعاع اتمی در یک دوره از چپ به راست کاهش می‌یابد."
    },
    {
      id: 5,
      text: "الکترون‌گاتیوی عناصر در یک گروه از بالا به پایین چگونه تغییر می‌کند؟",
      options: ["کاهش می‌یابد", "افزایش می‌یابد", "ثابت می‌ماند", "ابتدا کاهش سپس افزایش"],
      correctIndex: 0,
      answer: "الکترون‌گاتیوی در یک گروه از بالا به پایین کاهش می‌یابد."
    },
    {
      id: 6,
      text: "عناصر قلیایی (گروه ۱) چه ویژگی‌هایی دارند؟",
      options: ["واکنش‌پذیری بالا", "یک الکترون ظرفیتی", "فلزات نرم", "همه موارد"],
      correctIndex: 3,
      answer: "عناصر قلیایی واکنش‌پذیری بالا، یک الکترون ظرفیتی و فلزات نرم هستند."
    },

    // ==================== فصل دوم: پیوندهای شیمیایی ====================
    {
      id: 7,
      text: "پیوند یونی بین چه نوع اتم‌هایی تشکیل می‌شود؟",
      options: ["فلز و نافلز", "دو نافلز", "دو فلز", "فلز و فلز"],
      correctIndex: 0,
      answer: "پیوند یونی بین فلز و نافلز تشکیل می‌شود."
    },
    {
      id: 8,
      text: "پیوند کووالانسی بین چه نوع اتم‌هایی تشکیل می‌شود؟",
      options: ["دو نافلز", "فلز و نافلز", "دو فلز", "فلز و فلز"],
      correctIndex: 0,
      answer: "پیوند کووالانسی بین دو نافلز تشکیل می‌شود."
    },
    {
      id: 9,
      text: "الکترون‌های ظرفیتی در پیوند فلزی چگونه رفتار می‌کنند؟",
      options: ["آزادانه حرکت می‌کنند", "در جای خود ثابت هستند", "به یک اتم خاص متصل هستند", "هیچکدام"],
      correctIndex: 0,
      answer: "در پیوند فلزی، الکترون‌ها آزادانه در شبکه فلزی حرکت می‌کنند."
    },
    {
      id: 10,
      text: "شکل هندسی مولکول CH₄ (متان) چیست؟",
      options: ["چهاروجهی", "مسطح", "خطی", "هرمی"],
      correctIndex: 0,
      answer: "مولکول متان به شکل چهاروجهی است."
    },
    {
      id: 11,
      text: "قطبیت مولکول به چه عواملی بستگی دارد؟",
      options: ["اختلاف الکترون‌گاتیوی", "شکل هندسی مولکول", "هر دو", "هیچکدام"],
      correctIndex: 2,
      answer: "قطبیت مولکول هم به اختلاف الکترون‌گاتیوی و هم به شکل هندسی بستگی دارد."
    },
    {
      id: 12,
      text: "نیروهای واندروالس در کدام مواد بیشتر دیده می‌شوند؟",
      options: ["مواد کووالانسی", "مواد یونی", "مواد فلزی", "همه موارد"],
      correctIndex: 0,
      answer: "نیروهای واندروالس در مواد کووالانسی و مولکولی دیده می‌شوند."
    },

    // ==================== فصل سوم: ترکیبات آلی ====================
    {
      id: 13,
      text: "عنصر اصلی در ترکیبات آلی چیست؟",
      options: ["کربن", "هیدروژن", "اکسیژن", "نیتروژن"],
      correctIndex: 0,
      answer: "عنصر اصلی در ترکیبات آلی، کربن است."
    },
    {
      id: 14,
      text: "آلکان‌ها چه نوع هیدروکربن‌هایی هستند؟",
      options: ["زنجیره باز با پیوند ساده", "زنجیره باز با پیوند دوگانه", "زنجیره باز با پیوند سه‌گانه", "حلقه‌ای"],
      correctIndex: 0,
      answer: "آلکان‌ها هیدروکربن‌های زنجیره باز با پیوند ساده هستند."
    },
    {
      id: 15,
      text: "فرمول عمومی آلکان‌ها چیست؟",
      options: ["CnH2n+2", "CnH2n", "CnH2n-2", "CnH2n+1"],
      correctIndex: 0,
      answer: "فرمول عمومی آلکان‌ها CnH2n+2 است."
    },
    {
      id: 16,
      text: "آلکن‌ها چه نوع هیدروکربن‌هایی هستند؟",
      options: ["دارای پیوند دوگانه", "دارای پیوند ساده", "دارای پیوند سه‌گانه", "حلقه‌ای"],
      correctIndex: 0,
      answer: "آلکن‌ها هیدروکربن‌های دارای پیوند دوگانه هستند."
    },
    {
      id: 17,
      text: "نام IUPAC ترکیب CH₃-CH₂-OH چیست؟",
      options: ["اتانول", "متانول", "پروپانول", "بوتانول"],
      correctIndex: 0,
      answer: "ترکیب CH₃-CH₂-OH اتانول (الکل اتیلیک) نام دارد."
    },
    {
      id: 18,
      text: "کدام یک از موارد زیر یک ترکیب آروماتیک است؟",
      options: ["بنزن", "اتان", "اتن", "متان"],
      correctIndex: 0,
      answer: "بنزن یک ترکیب آروماتیک با حلقه شش کربنی است."
    },

    // ==================== فصل چهارم: ترمودینامیک شیمیایی ====================
    {
      id: 19,
      text: "قانون اول ترمودینامیک چه رابطه‌ای را بیان می‌کند؟",
      options: ["ΔU = Q - W", "ΔU = Q + W", "ΔH = ΔU + PΔV", "همه موارد"],
      correctIndex: 0,
      answer: "قانون اول ترمودینامیک ΔU = Q - W را بیان می‌کند."
    },
    {
      id: 20,
      text: "انرژی درونی (U) یک سامانه به چه عواملی بستگی دارد؟",
      options: ["دما", "فشار", "حجم", "همه موارد"],
      correctIndex: 0,
      answer: "انرژی درونی یک سامانه عمدتاً به دما بستگی دارد."
    },
    {
      id: 21,
      text: "آنتالپی (H) از چه رابطه‌ای محاسبه می‌شود؟",
      options: ["H = U + PV", "H = U - PV", "H = U + Q", "H = Q - W"],
      correctIndex: 0,
      answer: "آنتالپی از رابطه H = U + PV محاسبه می‌شود."
    },
    {
      id: 22,
      text: "در واکنش‌های گرماده، ΔH چه علامتی دارد؟",
      options: ["منفی", "مثبت", "صفر", "متغیر"],
      correctIndex: 0,
      answer: "در واکنش‌های گرماده، ΔH منفی است."
    },
    {
      id: 23,
      text: "آنتروپی (S) به چه معناست؟",
      options: ["نظم و بی‌نظمی سامانه", "انرژی آزاد سامانه", "گرمای سامانه", "کار سامانه"],
      correctIndex: 0,
      answer: "آنتروپی معیاری از بی‌نظمی یا تصادفی بودن سامانه است."
    },
    {
      id: 24,
      text: "انرژی آزاد گیبس (G) از چه رابطه‌ای محاسبه می‌شود؟",
      options: ["ΔG = ΔH - TΔS", "ΔG = ΔH + TΔS", "ΔG = ΔU - TΔS", "ΔG = ΔU + TΔS"],
      correctIndex: 0,
      answer: "انرژی آزاد گیبس از ΔG = ΔH - TΔS محاسبه می‌شود."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "آرایش الکترونی عنصر سدیم (Na) با عدد اتمی ۱۱ چگونه است؟",
      options: ["1s² 2s² 2p⁶ 3s¹", "1s² 2s² 2p⁵ 3s²", "1s² 2s² 2p⁶ 3s²", "1s² 2s² 2p⁶ 3p¹"],
      correctIndex: 0,
      answer: "آرایش الکترونی سدیم: 1s² 2s² 2p⁶ 3s¹ است."
    },
    {
      id: 26,
      text: "کدام یک از موارد زیر یک پیوند هیدروژنی است؟",
      options: ["H-F", "H-O", "H-N", "همه موارد"],
      correctIndex: 3,
      answer: "پیوند هیدروژنی در ترکیبات دارای H-F، H-O و H-N تشکیل می‌شود."
    },
    {
      id: 27,
      text: "PH محلول با افزایش غلظت یون H⁺ چگونه تغییر می‌کند؟",
      options: ["کاهش می‌یابد", "افزایش می‌یابد", "ثابت می‌ماند", "ابتدا کاهش سپس افزایش"],
      correctIndex: 0,
      answer: "با افزایش غلظت یون H⁺، PH کاهش می‌یابد (اسیدی‌تر می‌شود)."
    },
    {
      id: 28,
      text: "در یک واکنش تعادلی، اگر دما افزایش یابد، تعادل به کدام سمت میل می‌کند؟",
      options: ["سمت گرماده", "سمت گرماگیر", "ثابت می‌ماند", "بستگی به واکنش دارد"],
      correctIndex: 1,
      answer: "با افزایش دما، تعادل به سمت واکنش گرماگیر (جاذب گرما) میل می‌کند."
    },
    {
      id: 29,
      text: "کدام یک از موارد زیر یک کاتالیزور است؟",
      options: ["ماده‌ای که سرعت واکنش را افزایش می‌دهد", "ماده‌ای که سرعت واکنش را کاهش می‌دهد", "ماده‌ای که در واکنش مصرف می‌شود", "ماده‌ای که محصول واکنش است"],
      correctIndex: 0,
      answer: "کاتالیزور ماده‌ای است که سرعت واکنش را افزایش می‌دهد بدون اینکه خود مصرف شود."
    },
    {
      id: 30,
      text: "نظریه برخورد در مورد سینتیک شیمیایی چه می‌گوید؟",
      options: ["واکنش‌ها در اثر برخورد مولکول‌ها رخ می‌دهند", "واکنش‌ها خودبه‌خود رخ می‌دهند", "واکنش‌ها نیاز به کاتالیزور دارند", "هیچکدام"],
      correctIndex: 0,
      answer: "نظریه برخورد می‌گوید واکنش‌های شیمیایی در اثر برخورد مولکول‌ها با یکدیگر رخ می‌دهند."
    },
    {
      id: 31,
      text: "معادله آرنیوس چه رابطه‌ای را بیان می‌کند؟",
      options: ["k = A e^(-Ea/RT)", "k = A e^(Ea/RT)", "ln k = ln A - Ea/RT", "هر دو گزینه اول و سوم"],
      correctIndex: 3,
      answer: "معادله آرنیوس k = A e^(-Ea/RT) و شکل لگاریتمی آن ln k = ln A - Ea/RT است."
    },
    {
      id: 32,
      text: "کدام یک از موارد زیر از راه‌های افزایش سرعت واکنش است؟",
      options: ["افزایش دما", "افزایش غلظت", "استفاده از کاتالیزور", "همه موارد"],
      correctIndex: 3,
      answer: "افزایش دما، افزایش غلظت و استفاده از کاتالیزور همگی سرعت واکنش را افزایش می‌دهند."
    },
    {
      id: 33,
      text: "ثابت تعادل (Kc) به چه عواملی بستگی دارد؟",
      options: ["دما", "غلظت", "فشار", "همه موارد"],
      correctIndex: 0,
      answer: "ثابت تعادل فقط به دما بستگی دارد و به غلظت و فشار وابسته نیست."
    },
    {
      id: 34,
      text: "در یک سلول الکتروشیمیایی، آند چه نقشی دارد؟",
      options: ["محل اکسایش", "محل کاهش", "محل تولید الکترون", "گزینه ۱ و ۳"],
      correctIndex: 3,
      answer: "آند محل اکسایش و تولید الکترون است."
    },
    {
      id: 35,
      text: "کدام یک از موارد زیر یک پلیمر طبیعی است؟",
      options: ["سلولز", "نایلون", "پلی‌اتیلن", "PVC"],
      correctIndex: 0,
      answer: "سلولز یک پلیمر طبیعی است که در گیاهان یافت می‌شود."
    },
    {
      id: 36,
      text: "واکنش‌های پلیمریزاسیون به چند نوع اصلی تقسیم می‌شوند؟",
      options: ["دو نوع (افزایشی و تراکمی)", "سه نوع", "چهار نوع", "یک نوع"],
      correctIndex: 0,
      answer: "واکنش‌های پلیمریزاسیون به دو نوع افزایشی و تراکمی تقسیم می‌شوند."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون جامع شیمی (۲)</h1>
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
                backgroundColor: '#E65100',
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
              📝 پاسخنامه تشریحی شیمی (۲)
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

export default Shimi2FinalExam;