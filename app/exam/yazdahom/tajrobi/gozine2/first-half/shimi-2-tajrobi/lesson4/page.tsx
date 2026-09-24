"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson4 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات شیمی (۲) - کامل =================
  const questions = [
    // ==================== سوالات ۱ تا ۷ (صفحه ۲-۳) ====================
{
  id: 194,
  text: "چه تعداد از گزاره‌های زیر درست هستند؟\nالف) همۀ فلزات در طبیعت به صورت ترکیبات یونی همچون اکسیدها، کربنات‌ها و ... یافت می‌شوند.\nب) سرخی یاقوت و سبزی زمرد مربوط به وجود فلزات اصلی در ترکیبات آن‌ها است.\nپ) سدیم فلزی نرم است که با چاقو بریده می‌شود و در هوا به آرامی رنگش تیره می‌شود.\nت) رسانایی الکتریسیته و گرما از ویژگی‌های مشترک میان تمام فلزات است.\n۱) صفر\n۲) ۲\n۳) ۳\n۴) ۴",
  options: ["صفر", "۲", "۳", "۴"],
  correctIndex: 1,
  answer: "۲ مورد درست است (پ و ت)."
},
{
  id: 195,
  text: "چند مورد از عبارت‌های پیشنهادی برای تکمیل جملهٔ زیر مناسب است؟\n'آهن فلزی است که ......'\nالف) در سطح جهان دارای بیشترین مصرف سالانه در بین صنایع گوناگون است.\nب) در طبیعت فقط به شکل هماتیت یافت می‌شود.\nپ) دارای دو نوع یون با بارهای الکتریکی +۲ و +۳ است.\nت) ترکیب‌های دارای آن در آب نامحلول ولی در اسیدها محلول هستند.\n۱) ۱\n۲) ۲\n۳) ۳\n۴) ۴",
  options: ["۱", "۲", "۳", "۴"],
  correctIndex: 2,
  answer: "۳ مورد درست است (الف، پ و ت)."
},

// ==================== سوالات ۱۹۶ تا ۲۰۰ (صفحه ۳۹-۴۰) ====================
{
  id: 196,
  text: "آرایش الکترونی عنصر A به 4s¹ و عنصر B به 3s¹ ختم می‌شود، چه تعداد از عبارت‌های زیر می‌تواند پیرامون دو عنصر A و B درست باشد؟\nالف) طول موج رنگ شعلهٔ حاصل از ترکیب یونی عنصر A از طول موج رنگ شعلهٔ حاصل از ترکیب یونی عنصر B کمتر است.\nب) واکنش‌پذیری عنصر A از عنصر B کمتر است.\nپ) هر دو در دورهٔ سوم جدول تناوبی جای دارند.\nت) وجود فلز A در طبیعت دیده شده است.\n۱) ۱\n۲) ۲\n۳) ۳\n۴) ۴",
  options: ["۱", "۲", "۳", "۴"],
  correctIndex: 1,
  answer: "۲ عبارت می‌تواند درست باشد."
},
{
  id: 197,
  text: "کدام گزینه درست است؟\n۱) تمایل تبدیل به کاتیون در آهن بیشتر از سدیم است.\n۲) سرعت واکنش در هوای مرطوب در روی بیشتر از نقره است.\n۳) در واکنش FeO(s) + C(s) واکنش‌پذیری واکنش‌دهنده‌ها از فرآورده‌ها کمتر است.\n۴) واکنش Na₂O(s) + C(s) به‌طور طبیعی انجام می‌شود.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 1,
  answer: "گزینه ۲ درست است."
},
{
  id: 198,
  text: "برای استخراج کدام عنصر نمی‌توان از حرارت دادن اکسید آن عنصر با گرافیت استفاده کرد؟\n۱) آهن\n۲) سیلیسیم\n۳) پتاسیم\n۴) نقره",
  options: ["آهن", "سیلیسیم", "پتاسیم", "نقره"],
  correctIndex: 2,
  answer: "پتاسیم واکنش‌پذیری بالایی دارد و با کربن احیا نمی‌شود."
},
{
  id: 199,
  text: "کدام گزینه زیر نادرست است؟\n۱) واکنش FeO(s) + C(s) به طور طبیعی انجام می‌شود.\n۲) تمایل به تبدیل شدن به کاتیون در عنصر آهن بیشتر از مس است.\n۳) تأمین شرایط نگهداری فلز نقره دشوارتر از روی است.\n۴) در واکنش FeO(s) + ۲Na(s) واکنش‌پذیری فرآورده‌ها از واکنش‌دهنده‌ها کمتر است.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 2,
  answer: "گزینه ۳ نادرست است."
},
{
  id: 200,
  text: "کدام واکنش درست است؟\n۱) Mg(OH)₂(aq) + HNO₃(aq) → Mg(NO₃)₂(aq) + 2H₂O(l)\n۲) ۲H₂(g) + O₂(g) → ۲H₂O(l)\n۳) Cu(s) + ۲HCl(aq) → CuCl₂(s) + H₂(g)\n۴) ۲SO₂(g) + O₂(g) → ۲SO₃(g)",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 0,
  answer: "گزینه ۱ درست است."
},

// ==================== سوالات ۲۰۱ تا ۲۰۵ (صفحه ۴۱) ====================
{
  id: 201,
  text: "در گروه هالوژن‌ها با کاهش عدد اتمی چه تعداد از ویژگی‌های زیر افزایش می‌یابند؟\nالف) شعاع اتمی\nب) شمار لایه‌های الکترونی\nپ) دمای لازم برای واکنش با گاز هیدروژن\nت) واکنش‌پذیری\nث) خصلت نافلزی\n۱) ۲\n۲) ۳\n۳) ۴\n۴) ۵",
  options: ["۲", "۳", "۴", "۵"],
  correctIndex: 1,
  answer: "۳ ویژگی افزایش می‌یابد (واکنش‌پذیری، خصلت نافلزی و دمای لازم برای واکنش)."
},
{
  id: 202,
  text: "در شرایط یکسان، فلز A در هوای مرطوب در مقایسه با فلز B، سریع‌تر اکسید می‌شود. چند مورد از نتیجه‌گیری‌های زیر درست است؟\nالف) فلزهای A و B به ترتیب می‌توانند پلاتین و مس باشند.\nب) شمار الکترون‌های لایه ظرفیت A بیشتر از B است.\nپ) واکنش A(s) + B²⁺(aq) → A²⁺(aq) + B(s) به طور طبیعی انجام می‌شود.\nت) استخراج فلز A از سنگ معدن از استخراج فلز B از سنگ معدن سخت‌تر است.\n۱) ۱\n۲) ۲\n۳) ۳\n۴) ۴",
  options: ["۱", "۲", "۳", "۴"],
  correctIndex: 1,
  answer: "۲ مورد درست است (پ و ت)."
},
{
  id: 203,
  text: "کدام واکنش به طور طبیعی انجام می‌شود؟\n۱) CO₂(g) + Fe(s) →\n۲) FeO(s) + ۲Na(s) →\n۳) Au(s) + FeO(s) →\n۴) Zn(s) + K₂O(s) →",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 1,
  answer: "FeO(s) + ۲Na(s) → Na₂O(s) + Fe(s) به طور طبیعی انجام می‌شود."
},
{
  id: 204,
  text: "کدام مورد از مطالب زیر، درست‌اند؟\nالف) معمولاً هرچه واکنش‌پذیری فلزی بیشتر باشد، استخراج آن دشوارتر است.\nب) در واکنش Na₂O(s) با C(s) یک واکنش انجام‌پذیر است.\nپ) فلز آهن در مقایسه با آلومینیم دیر به دامان طبیعت برمی‌گردد.\nت) در استخراج فلز تنها درصد کمی از سنگ معدن به فلز تبدیل می‌شود.\n۱) الف - پ\n۲) ب - ت\n۳) الف - ت\n۴) ب - پ",
  options: ["الف - پ", "ب - ت", "الف - ت", "ب - پ"],
  correctIndex: 2,
  answer: "عبارت‌های الف و ت درست هستند."
},
{
  id: 204,
  text: "کدام مورد از مطالب زیر، درست‌اند؟\nالف) معمولاً هرچه واکنش‌پذیری فلزی بیشتر باشد، استخراج آن دشوارتر است.\nب) در واکنش Na₂O(s) با C(s) یک واکنش انجام‌پذیر است.\nپ) فلز آهن در مقایسه با آلومینیم دیر به دامان طبیعت برمی‌گردد.\nت) در استخراج فلز تنها درصد کمی از سنگ معدن به فلز تبدیل می‌شود.\n۱) الف - پ\n۲) ب - ت\n۳) الف - ت\n۴) ب - پ",
  options: ["الف - پ", "ب - ت", "الف - ت", "ب - پ"],
  correctIndex: 2,
  answer: "عبارت‌های الف و ت درست هستند."
},
{
  id: 205,
  text: "چه تعداد از عبارت‌های زیر در ارتباط با فلز آهن درست است؟\nالف) در فرآیند صنعتی استخراج آهن در کوره بلند، فلز Fe₂O₃ را از Fe استخراج می‌کنند.\nب) در فولاد مبارکه مانند همۀ شرکت‌های فولاد جهان، برای استخراج آهن از سدیم یا کربن استفاده می‌شود.\nپ) به ازای استخراج هر ۱ کیلوگرم آهن، تقریباً ۲ کیلوگرم سنگ معدن آهن و ۱ کیلوگرم از منابع معدنی دیگر استفاده می‌شود.\nت) بازیافت فلزها از جمله فلز آهن سبب می‌شود گونه‌های زیستی کمتری از بین بروند.\nث) از آهن مذاب تولیدشده در واکنش ترمیت (واکنشی که در آن فلز آهن واکنش‌دهنده فعال‌تر است) برای جوش دادن خطوط راه آهن استفاده می‌شود.\n۱) ۱\n۲) ۲\n۳) ۳\n۴) ۴",
  options: ["۱", "۲", "۳", "۴"],
  correctIndex: 1,
  answer: "۲ مورد درست است (پ و ت)."
},

// ==================== سوالات ۲۰۶ تا ۲۱۰ (صفحه ۴۲) ====================
{
  id: 206,
  text: "چند مورد از عبارت‌های زیر درست‌اند؟\n- عناصری که در آرایش الکترون نقطه‌ای آن‌ها تک‌الکترون بیشتری دیده شود، واکنش‌پذیری بیشتری دارند.\n- ترکیبات K₂O و Na₂O واکنش‌پذیری کمتری از خود فلزات دارند.\n- در واکنش‌های گرماده، همواره پایداری ترکیب یونی حاوی فلز با واکنش‌پذیری کمتر، از پایداری ترکیب یونی حاوی فلز با واکنش‌پذیری بیشتر، کمتر است.\n- لیتیم کمترین واکنش‌پذیری را در میان فلزات دسته s دارد.\n۱) ۱\n۲) ۲\n۳) ۳\n۴) ۴",
  options: ["۱", "۲", "۳", "۴"],
  correctIndex: 1,
  answer: "۲ مورد درست است (مورد اول و چهارم)."
},
{
  id: 207,
  text: "کدام واکنش انجام‌پذیر نیست؟\n۱) KBr + I₂ →\n۲) KI + Br₂ →\n۳) KI + Cl₂ →\n۴) KBr + Cl₂ →",
  options: ["KBr + I₂ →", "KI + Br₂ →", "KI + Cl₂ →", "KBr + Cl₂ →"],
  correctIndex: 0,
  answer: "واکنش KBr + I₂ انجام‌پذیر نیست زیرا ید از برم ضعیف‌تر است."
},
  ]; // <-- اینجا آرایه بسته میشه!

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
          onClick={() => router.push('/exam/yazdahom/tajrobi/gozine2/first-half/shimi-2-tajrobi')}
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

export default Shimi2lesson4;