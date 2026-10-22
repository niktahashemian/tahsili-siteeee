"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson13 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۱۳: پلی استرها =================
  // بازه سوالات ۴۴ تا ۹۱ (صفحه ۱۰ تا ۲۰) - ۱۰ سوال رندوم
  const questions = [
    {
      id: 45,
      text: "ﭼﻨﺪ ﻣﻮرد از ﻣﻘﺎﯾﺴﻪ ﻫﺎی اﻧﺠﺎم ﺷﺪه ﻣﯿﺎن اﺗﺎﻧﻮﺋﯿﮏ اﺳﯿﺪ و ﻣﺘﯿﻞ ﻣﺘﺎﻧﻮات درﺳﺖ اﺳﺖ؟ \n - ﻧﻘﻄﻪ ﺟﻮش: ﻣﺘﯿﻞ ﻣﺘﺎﻧﻮات > اﺗﺎﻧﻮﺋﯿﮏ اﺳﯿﺪ \n - ﺟﺮم ﻣﻮﻟﯽ: ﻣﺘﯿﻞ ﻣﺘﺎﻧﻮات > اﺗﺎﻧﻮﺋﯿﮏ اﺳﯿﺪ \n - ﺷﻤﺎر ﺟﻔﺖ اﻟﮑﺘﺮون ﻫﺎی ﭘﯿﻮﻧﺪی: اﺗﺎﻧﻮﺋﯿﮏ اﺳﯿﺪ > ﻣﺘﯿﻞ ﻣﺘﺎﻧﻮات \n - ﻣﺠﻤﻮع ﻣﻮل ﻫﺎی ﮔﺎزی ﺣﺎﺻﻞ از ﺳﻮﺧﺘﻦ ﮐﺎﻣﻞ: اﺗﺎﻧﻮﺋﯿﮏ اﺳﯿﺪ > ﻣﺘﯿﻞ ﻣﺘﺎﻧﻮات",
      options: [
        "ﺻﻔﺮ",
        "1",
        "2",
        "3"
      ],
      correctIndex: 1,
      answer: "گزینه 2 نادرست است. طبق پاسخنامه: نام درست CH₃CH₂CH₂CH₂CH₃، پنتان است که درست نامگذاری شده. اما در گزینه‌های اصلی سوال، گزینه‌ای که درست نامگذاری نشده، باید مشخص شود. با توجه به پاسخنامه، گزینه‌ای که نام‌گذاری اشتباه دارد، گزینه ۴ است که در پاسخنامه به آن اشاره شده."
    },
    {
      id: 46,
      text: "استر سازندۀ طعم و بوی خوش آناناس از واکنش کدام اسید با کدام الکل و در مجاورت چه ماده‌ای حاصل شده است؟",
      options: [
        "اتانوئیک اسید - بوتانول - H₂SO₄",
        "بوتانوئیک اسید - اتانول - H₂SO₄",
        "بوتانوئیک اسید - متانول - H₂O",
        "اتانوئیک اسید - اتانول - H₂O"
      ],
      correctIndex: 0,
      answer: "گزینه ۲. استر موجود در آناناس، اتیل بوتانوات است که از واکنش بوتانوئیک اسید با اتانول در مجاورت H₂SO₄ (کاتالیزگر) به دست می‌آید."
    },
    {
      id: 48,
      text: "در ﭼﻪ ﺗﻌﺪاد از ﺗﺮﮐﯿﺒﺎت زﯾﺮ اﻣﮑﺎن ﺗﺸﮑﯿﻞ ﭘﯿﻮﻧﺪ ﻫﯿﺪروژﻧﯽ وﺟﻮد دارد؟\n اﻟﻒ) وﯾﺘﺎﻣﯿﻦc ب) ﺑﻮﺗﺎﻧﻮل پ) اﺗﯿﻞ ﺑﻮﺗﺎﻧﻮات \n ت) ﻣﺘﯿﻞ آﻣﯿﻦ ث) ﺑﻨﺰآﻟﺪﻫﯿﺪ ج) دی ﻣﺘﯿﻞ اﺗﺮ",
      options: ["6", "5", "3", "2"],
      correctIndex: 2,
      answer: "گزینه 3 (۵۴). طبق پاسخنامه، با محاسبات استوکیومتری، به ۵۴ کیلوگرم آب نیاز است."
    },
    {
      id: 54,
      text: "نام استر حاصل از واکنش اسید سازندۀ استر A و الکل سازندۀ استر B کدام است؟\nA: CH₃COOCH₂CH₃\nB: CH₃OOCCH₂CH₃",
      options: ["اتیل استات", "متیل پروپانوات", "اتیل پروپانوات", "پروپیل استات"],
      correctIndex: 2,
      answer: "گزینه ۳ (اتیل پروپانوات). اسید سازندۀ استر A، استیک اسید (اتانوئیک اسید) و الکل سازندۀ استر B، متانول است. واکنش بین پروپانوئیک اسید و اتانول، اتیل پروپانوات تولید می‌کند."
    },
    {
      id: 57,
      text: "شمار جفت‌الکترون‌های پیوندی در یک کربوکسیلیک اسید با شاخۀ آلکیل برابر با ۱۴ است. چند مورد از ویژگی‌های بیان‌شده در مورد آن درست است؟ (H=1, C=12, O=16: g.mol⁻¹)\nالف) نوعی اسید چرب به حساب می‌آید.\nب) برای آن می‌توان دو ساختار متفاوت رسم کرد.\nپ) جرم مولی آن دو برابر جرم مولی اتانول است.\nت) برای ساخت استری که بوی آناناس مربوط به آن است، کاربرد دارد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه 2 (۳ مورد درست). طبق پاسخنامه: موارد ب، پ و ت درست هستند. الف نادرست است (اسیدهای چرب زنجیر بلند دارند)."
    },
    {
      id: 61,
      text: "در یک کربوکسیلیک اسید دو عاملی که زنجیر هیدروکربنی آن سیرشده است، درصد جرمی کربن برابر ۴۹/۳ می‌باشد. هر مول از این اسید برای سوختن کامل به چند مول اکسیژن نیاز دارد؟ (C=12, H=1, O=16: g.mol⁻¹)",
      options: ["6/5", "6", "5", "5/5"],
      correctIndex: 0,
      answer: "گزینه 1 (۶). طبق پاسخنامه: با محاسبه n=۴، فرمول اسید C₄H₆O₄ (سوکسینیک اسید) است. معادلۀ سوختن: C₄H₆O₄ + ۳/۵O₂ → ۴CO₂ + ۳H₂O. پس ۳/۵ مول O₂ نیاز است. اما در گزینه‌ها ۳/۵ وجود ندارد. با توجه به پاسخنامه، گزینه صحیح ۶ است."
    },
    {
      id: 62,
      text: "اگر الکل موردنیاز برای تهیۀ اتیل متانوات را از آبکافت اتیل پروپانوات به دست آوریم، برای تولید ۹۲/۵ گرم اتیل متانوات، چند گرم اتیل پروپانوات باید تجزیه شود؟ (H=1, C=12, O=16: g.mol⁻¹)",
      options: ["۶۷/۱", "۱۲۷/۵", "۱۲۱/۹", "۷۶/۵"],
      correctIndex: 1,
      answer: "گزینه 2 (۱۲۷/۵). طبق پاسخنامه: ۹۲/۵ گرم اتیل متانوات = ۱/۲۵ مول. برای تولید این مقدار به ۱/۲۵ مول اتانول نیاز است که از آبکافت ۱/۲۵ مول اتیل پروپانوات (جرم مولی ۱۰۲) به دست می‌آید: ۱/۲۵ × ۱۰۲ = ۱۲۷/۵ گرم."
    },
    {
      id: 69,
      text: "ﮐﺪام ﻣﻮارد زﯾﺮ درﺳﺖ ﻫﺴﺘﻨﺪ؟\nاﻟﻒ) در اﻟﮑﻞ ﻫﺎ و ﮐﺮﺑﻮﮐﺴﯿﻠﯿﮏ اﺳﯿﺪﻫﺎ ﻫﻤﺎﻧﻨﺪ اﺳﺘﺮﻫﺎ دو ﻧﻮع ﻧﯿﺮوی ﺑﯿﻦ ﻣﻮﻟﮑﻮﻟﯽ ﻫﯿﺪروژﻧﯽ و واﻧﺪرواﻟﺴﯽ ﺣﻀﻮر دارد.\nب) واﮐﻨﺶ ﻫﺎی ﺗﻮﻟﯿﺪ و ﺗﺠﺰﯾﻪ اﺳﺘﺮﻫﺎ ﺑﻪ ﯾﮏ ﻧﻮع ﮐﺎﺗﺎﻟﯿﺰﮔﺮ اﺣﺘﯿﺎج دارد.\n پ) اﺳﺘﺮ ﻣﻮﺟﻮد در آﻧﺎﻧﺎس دارای 6 اﺗﻢ ﮐﺮﺑﻦ اﺳﺖ.\n ت) ﺗﻌﺪاد ﮐﺮﺑﻦ در اﻟﮑﻞ ﺳﺎزﻧﺪۀ اﻧﮕﻮر ﻫﻤﺎﻧﻨﺪ اﯾﻦ ﺗﻌﺪاد در اﺳﯿﺪ ﺳﺎزﻧﺪۀ ﻣﻮز اﺳﺖ.",
      options: ["اﻟﻒ - ب", "پ - ت", "ب - ت - پ", "ب - پ"],
      correctIndex: 2,
      answer: "گزینه 3 (۳ مورد درست). طبق پاسخنامه: موارد درست: ۱، ۲ و ۵. موارد نادرست: ۳ (نیروی غالب واندروالسی است) و ۴ (به الکل سیرشده تبدیل می‌شود نه هیدروکربن)."
    },
    {
      id: 78,
      text: "ﭼﻨﺪ ﻣﻮرد از ﻣﻮارد زﯾﺮ ﻧﺎدرﺳﺖ ﻫﺴﺘﻨﺪ؟\n - ﻧﻘﻄﮥ ذوب و ﺟﻮش اﻟﮑﻞ ﻫﺎ ﺑﺎ اﻧﺤﻼل ﭘﺬﯾﺮی آن ﻫﺎ در ﭼﺮﺑﯽ راﺑﻄﮥ ﻣﻌﮑﻮس دارد.\n - اﻟﮑﻞ ﻫﺎی ﭼﻨﺪ ﻋﺎﻣﻠﯽ ﻧﺴﺒﺖ ﺑﻪ اﻟﮑﻞ ﻫﺎی ﺗﮏ ﻋﺎﻣﻠﯽ ﻫﻢ ﮐﺮﺑﻦ، اﻧﺤﻼل ﭘﺬﯾﺮی در ﭼﺮﺑﯽ ﮐﻤﺘﺮی دارﻧﺪ.\n - ﻓﻮرﻣﯿﮏ اﺳﯿﺪ و اﺳﺘﯿﮏ اﺳﯿﺪ دو ﻋﻀﻮ اول ﮔﺮوﻫﯽ از ﻣﻮاد ﻫﺴﺘﻨﺪ ﮐﻪ ﻣﯽ ﺗﻮاﻧﺪ اﯾﺰوﻣﺮ اﺳﺘﺮﻫﺎ ﺑﺎﺷﻨﺪ.\n - اﻟﮑﻞ ﺗﮏ ﻋﺎﻣﻠﯽ ﮐﻪ ﺗﻌﺪاد ﮐﺮﺑﻦ ﻫﺎی آن ﺑﺎ ﺗﻌﺪاد ﻫﯿﺪروژن ﻫﺎی اﺗﺎﻧﻮل ﺑﺮاﺑﺮ اﺳﺖ در آب ﮐﻢ ﻣﺤﻠﻮل اﺳﺖ.",
      options: ["3", "2", "1", "صفر"],
      correctIndex: 2,
      answer: "گزینه 3 (الف - پ). طبق پاسخنامه: الف درست (می‌توانند یکسان باشند). ب نادرست (R می‌تواند H باشد). پ درست (در متیل فرمات، R=H و R'=CH₃، تفاوت ۱۴ گرم). ت نادرست (فقط برای استرهای سیرشده)."
    },
    {
      id: 86,
      text: "در یک الکل یک‌عاملی، درصد جرمی کربن، ۲/۲۵ برابر درصد جرمی اکسیژن و ۴/۵ برابر درصد جرمی هیدروژن است. کدام‌یک از مطالب زیر در مورد این الکل درست است؟ (H=1, C=12, O=16: g.mol⁻¹)",
      options: [
        "ساده‌ترین الکل شناخته‌شده است.",
        "۶۰ درصد جرم این الکل را کربن تشکیل می‌دهد.",
        "به‌عنوان حلال در تهیۀ مواد دارویی، آرایشی و بهداشتی به کار می‌رود.",
        "برای این الکل می‌توان سه ساختار با گروه هیدروکسیل در نظر گرفت."
      ],
      correctIndex: 1,
      answer: "گزینه 2. طبق پاسخنامه: فرمول الکل C₃H₈O (پروپانول) است. درصد کربن = ۶۰٪. پروپانول به‌عنوان حلال در صنایع دارویی و آرایشی کاربرد دارد."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(45 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    setScore((correctCount / questions.length) * 100);
    setIsScoreCalculated(true);
  }, [selectedAnswers]);

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimeUp, isScoreCalculated]);

  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      setTimeout(calculateScore, 300);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

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
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/second-half/shimi-2-tajrobi')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 درس ۱۳: پلی استرها</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px', borderRadius: '50px',
            fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px', backgroundColor: '#ffffff',
            padding: '20px 25px', borderRadius: '8px',
            border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{ 
              fontSize: '17px', lineHeight: '1.9', marginBottom: '20px',
              fontWeight: '500', display: 'flex', alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
            }}>
              <span style={{
                display: 'inline-block', backgroundColor: '#2196F3',
                color: 'white', width: '30px', height: '30px',
                textAlign: 'center', lineHeight: '30px', borderRadius: '50%',
                fontSize: '14px', marginLeft: '15px', flexShrink: 0, marginTop: '2px'
              }}>{index + 1}</span>
              <span>{q.text}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 30px', marginRight: '20px' }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                const isDisabled = isTimeUp || isScoreCalculated;
                return (
                  <button key={idx} onClick={() => handleOptionClick(q.id, idx)} disabled={isDisabled}
                    style={{
                      display: 'flex', alignItems: 'center', padding: '12px 18px',
                      border: isSelected ? '3px solid #2196F3' : '1px solid #dee2e6',
                      borderRadius: '10px', backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer', fontSize: '15px',
                      textAlign: 'right', transition: 'all 0.2s', width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1
                    }}>
                    <span style={{
                      display: 'inline-block', width: '28px', height: '28px',
                      border: '1px solid #000', borderRadius: '50%',
                      textAlign: 'center', lineHeight: '28px', fontSize: '14px',
                      marginLeft: '15px',
                      backgroundColor: isSelected ? '#2196F3' : '#fff',
                      color: isSelected ? '#fff' : '#000'
                    }}>{String.fromCharCode(65 + idx)}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{
          marginTop: '30px', marginBottom: '30px', padding: '20px',
          backgroundColor: '#ffffff', borderRadius: '12px',
          border: '1px solid #dee2e6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button onClick={() => { if (canCalculate) calculateScore(); }} disabled={!canCalculate}
                style={{
                  padding: '15px 40px', fontSize: '18px',
                  backgroundColor: canCalculate ? '#2196F3' : '#6c757d',
                  color: '#fff', border: 'none', borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6
                }}>
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
                width: '80%', maxWidth: '400px', height: '20px',
                backgroundColor: '#e9ecef', borderRadius: '10px',
                overflow: 'hidden', margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`, height: '100%',
                  backgroundColor: getScoreColor(score!),
                  transition: 'width 0.8s ease-in-out'
                }} />
              </div>
              <button onClick={() => { setIsScoreCalculated(false); setScore(null); isCalculatedRef.current = false; isTimeUpRef.current = false; }}
                style={{
                  padding: '10px 25px', fontSize: '14px', backgroundColor: '#ff9800',
                  color: '#fff', border: 'none', borderRadius: '50px',
                  cursor: 'pointer', fontWeight: 'bold', marginTop: '10px'
                }}>🔄 تغییر پاسخ‌ها</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px', fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff', border: 'none', borderRadius: '50px',
              cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)', transition: 'all 0.2s'
            }}>
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px', borderTop: '4px solid #2196F3',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #2196F3',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#2196F3'
            }}>📝 پاسخنامه تشریحی - درس ۱۳: پلی استرها</h2>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} style={{
                  marginBottom: '35px', borderBottom: '1px dashed #ced4da',
                  paddingBottom: '25px'
                }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{
                      fontWeight: 'bold', color: '#2196F3',
                      backgroundColor: '#e3f2fd', padding: '5px 15px',
                      borderRadius: '20px', display: 'inline-block',
                      marginBottom: '10px'
                    }}>سوال {index + 1}</span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span>
                    <span style={{ fontSize: '15px' }}> {q.options[q.correctIndex]}</span>
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

export default Shimi2Lesson13;