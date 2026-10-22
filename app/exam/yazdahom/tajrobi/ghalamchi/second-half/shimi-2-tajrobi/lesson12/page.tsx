"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson12 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات فصل ۳: پلیمرها و درشت‌مولکول‌ها =================
  // بازه سوالات ۱ تا ۴۳ (صفحه ۱ تا ۱۰) - ۱۰ سوال رندوم
  const questions = [
    {
      id: 1,
      text: "تشکیل الیاف سلولز با تولید آب همراه است. اگر هر رشته از الیاف سلولز از اتصال ۳۰۰ مولکول گلوکز به یکدیگر تشکیل شده باشد و فرمول مولکولی هر رشته از آن C₁₈₀₀₀H₃₀₂₀₀O₁₅₀₀₀ باشد، به ازای تولید یک کیلوگرم سلولز به تقریب چند مولکول آب تولید می‌شود؟ (جرم مولی سلولز = ۴۸۷۸۰۰۰ g.mol⁻¹)",
      options: ["۳/۶NA", "۷/۲NA", "۵/۹NA", "۴/۹NA"],
      correctIndex: 2,
      answer: "گزینه ۳ (۵/۹NA). طبق پاسخنامه: معادله موازنه‌شده و محاسبات نشان می‌دهد تعداد مولکول آب تولیدشده برابر ۵/۹NA است."
    },
    {
      id: 4,
      text: "چه تعداد از عبارت‌های زیر، درست هستند؟\nالف) جرم مولی و نوع اتم‌های سازندۀ درشت مولکول‌ها، بسیار زیاد است.\nب) ترتیب: پلی‌اتن > نفتالن > پروپان > آب، را می‌توان به قدرت نیروهای بین مولکولی این ترکیب‌ها نسبت داد.\nپ) برخلاف الیاف ساختگی، الیاف طبیعی تنها برای تهیۀ پارچه و پوشاک به کار می‌رود.\nت) ترتیب: نایلون > گلوکز > سیکلو هگزان > بنزن، را می‌توان به جرم مولی آن‌ها نسبت داد.",
      options: ["۲", "۱", "۴", "۳"],
      correctIndex: 1,
      answer: "گزینه 2 (۲ مورد درست). طبق پاسخنامه: موارد درست: ب و ت. موارد نادرست: الف (تنوع اتم‌ها در درشت‌مولکول‌ها زیاد نیست) و پ (الیاف طبیعی کاربردهای دیگری هم دارند)."
    },
    {
      id: 3,
      text: "کدام مطلب درست است؟",
      options: [
        "در همۀ درشت‌مولکول‌ها بخش‌هایی هست که در سرتاسر مولکول تکرار شده است.",
        "پلیمرهای حاصل از هیدروکربن‌های سیرنشده، سیرشده هستند.",
        "جرم پلیمر حاصل از پلیمری شدن اتن، به مقدار کاتالیزگرهای واکنش بستگی دارد.",
        "در ساختار پلیمر به کاررفته در سرنگ، اتم هالوژن وجود ندارد."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ درست است. پلیمر به کاررفته در سرنگ، پلی‌پروپین است و اتم هالوژن ندارد."
    },
    {
      id: 6,
      text: "چه تعداد از عبارت‌های زیر درست است؟\nالف) اگر گاز اتن را در فشار بالا گرم دهیم، پلی‌اتن سنگین به دست می‌آید.\nب) پلی‌پروپین و پلی‌وینیل کلرید به ترتیب در سرنگ و کیسۀ خون به کار برده شده‌اند.\nپ) پلی‌اتن مذاب را در دستگاهی با عمل دمیدن هوا به ورقه نازک پلاستیکی تبدیل می‌کنند.\nت) مزهٔ ترش ریواس به دلیل وجود گروه عاملی کربوکسیل در آن است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "گزینه ۴ (همه موارد درست). طبق پاسخنامه تمامی عبارت‌ها باتوجه به کتاب درسی درست هستند."
    },
    {
      id: 7,
      text: "چه تعداد از عبارت‌های زیر درست است؟\nالف) درصد جرمی کربن در پلی‌اتن شاخه‌دار کمتر از پلی‌اتن بدون شاخه است.\nب) نقطه ذوب پلی‌اتن شاخه‌دار کمتر از پلی‌اتن بدون شاخه است.\nپ) میزان استحکام پلی‌اتن سنگین بیشتر از پلی‌اتن سبک است.\nت) شفافیت پلی‌اتن شاخه‌دار کمتر از پلی‌اتن بدون شاخه است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه ۳ (۳ مورد درست). طبق پاسخنامه تنها عبارت «الف» نادرست است؛ درصد جرمی کربن در پلی‌اتن شاخه‌دار و بدون شاخه یکسان است."
    },
    {
      id: 10,
      text: "چه تعداد از ﻋﺒﺎرت ﻫﺎی زﯾﺮ ﻧﺎدرﺳﺖ ﻫﺴﺘﻨﺪ؟",
      options: [
        " اﺗﻦ در ﺷﺮاﯾﻂ ﮔﻮﻧﺎﮔﻮن واﮐﻨﺶ ﭘﻠﯿﻤﺮی ﺷﺪن را اﻧﺠﺎم داده و ﻓﺮآورده هایی با ساختار متفاوت ایجاد میکند",
        "ﭘﻠﯽ اﺗﻦ ﺳﻨﮕﯿﻦ را در دﺳﺘﮕﺎﻫﯽ ﺑﺎ ﻋﻤﻞ دﻣﯿﺪن ﻫﻮا ﺑﻪ ورﻗﻪ ﻫﺎی ﻧﺎزک ﭘﻼﺳﺘﯿﮑﯽ ﺗﺒﺪﯾﻞ ﻣﯽ ﮐﻨﻨﺪ.",
        "ﭘﻠﯿﻤﺮﻫﺎی ﺳﺎﺧﺘﻪ ﺷﺪه در ﺻﻨﻌﺖ ﺗﻨﻬﺎ از واﮐﻨﺶ ﻣﻮﻧﻮﻣﺮﻫﺎی دارای ﭘﯿﻮﻧﺪ دوﮔﺎﻧﮥ ﮐﺮﺑﻦ- کربن به دست می آید",
        "در ﺗﺮﮐﯿﺐ ﻫﺎی آﻟﯽ، ﺑﺨﺶ ﻫﺎﯾﯽ ﮐﻪ ﭘﯿﻮﻧﺪﻫﺎی ﮐﺮﺑﻦ- اﮐﺴﯿﮋن دارﻧﺪ، ﺑﺨﺶ ﻗﻄﺒﯽ ﻣﻮﻟﮑﻮل را ﺗﺸﮑﯿﻞ ﻣﯽ دﻫﻨﺪ."
      ],
      correctIndex: 1,
      answer: "گزینه 2. طبق پاسخنامه: ۳۱ جفت الکترون پیوندی، دی‌آمین و دی‌اسید، پلی‌پروپین."
    },
    {
      id: 12,
      text: "در ﭼﻪ ﺗﻌﺪاد از ﭘﻠﯿﻤﺮﻫﺎی زﯾﺮ ﺗﻨﻬﺎ اﺗﻢ ﻫﺎی ﮐﺮﺑﻦ و ﻫﯿﺪروژن وﺟﻮد دارد؟\n ﭘﻠﯽ اﺳﺘﯿﺮن     ب) ﭘﻠﯽ وﯾﻨﯿﻞ ﮐﻠﺮﯾﺪ       پ) ﭘﻠﯽ ﭘﺮوﭘﻦ\n ت) ﺗﻔﻠﻮن       ث) ﭘﻠﯽ ﺳﯿﺎﻧﻮاﺗﻦ       ج) ﭘﻠﯽ اﺗﻦ",
      options: [
        "4",
        "3",
        "2",
        "1"
      ],
      correctIndex: 1,
      answer: "گزینه 2 (۴۰۰۰۰ و ۶/۲۵×۱۰¹⁶). طبق پاسخنامه n=۴۰۰۰۰ و تعداد زنجیر=۶/۲۵×۱۰¹⁶ به دست می‌آید."
    },
    {
      id: 17,
      text: "اﮔﺮ در ﭘﻠﯽ اﺗﻦ ﺑﻪ ﺟﺎی ﯾﮑﯽ از ﻫﯿﺪروژن ﻫﺎی آن ﯾﮏ ﺑﺎر ﮐﻠﺮ و ﯾﮏ ﺑﺎر ﺣﻠﻘﮥ ﺑﻨﺰﻧﯽ ﻗﺮار دﻫﯿﻢ، ﭘﻠﯿﻤﺮﻫﺎی ﺟﺪﯾﺪ ﺑﻪ ﺗﺮﺗﯿﺐ در ﭼﻪ ﻣﻮاردی اﺳﺘﻔﺎده ﻣﯽ ﺷﻮﻧﺪ؟\n 1) ﮐﯿﺴﮥ ﺧﻮن - ﻇﺮوف ﯾﮏ ﺑﺎرﻣﺼﺮف\n 2) ﻇﺮوف ﯾﮏ ﺑﺎرﻣﺼﺮف - ﮐﯿﺴﮥ ﺧﻮن\n 3) ﭘﺘﻮ - ﮐﯿﺴﮥ ﺧﻮن\n 4) ﮐﯿﺴﮥ ﺧﻮن - ﭘﺘﻮ",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "گزینه 1 (۳ پلیمر). پلی‌استیرن، پلی‌پروپن و پلی‌اتن تنها از کربن و هیدروژن تشکیل شده‌اند. پلی‌وینیل کلرید کلر و پلی‌سیانواتن نیتروژن دارد."
    },
    {
      id: 32,
      text: "ﮐﺪام ﮔﺰﯾﻨﻪ از ﻟﺤﺎظ درﺳﺘﯽ ﯾﺎ ﻧﺎدرﺳﺘﯽ ﻣﺸﺎﺑﻪ ﻋﺒﺎرت زﯾﺮ اﺳﺖ؟ \n ﭼﮕﺎﻟﯽ ﭘﻠﯽ اﺗﻦ ﺳﺒﮏ و ﺳﻨﮕﯿﻦ ﺗﻔﺎوت زﯾﺎدی ﺑﺎ ﯾﮑﺪﯾﮕﺮ دارﻧﺪ.\n  1) ﭘﻠﯿﻤﺮﻫﺎ ﺗﺮﮐﯿﺒﺎﺗﯽ ﺳﯿﺮﺷﺪه ﻫﺴﺘﻨﺪ.\n  2) ﺑﻪ ازای ﺟﺮم ﯾﮑﺴﺎن از ﭘﻠﯽ اﺗﻦ ﺳﺒﮏ و ﺳﻨﮕﯿﻦ، ﺣﺠﻢ ﭘﻠﯽ اﺗﻦ ﺳﺒﮏ ﺑﯿﺸﺘﺮ اﺳﺖ.\n  3) ﻫﺮ ﺗﺮﮐﯿﺐ آﻟﯽ ﮐﻪ در ﺳﺎﺧﺘﺎر ﺧﻮد ﭘﯿﻮﻧﺪ دوﮔﺎﻧﻪ ﮐﺮﺑﻦ- ﮐﺮﺑﻦ دارد، ﻗﺎﺑﻠﯿﺖ ﭘﻠﯿﻤﺮی ﺷﺪن دارد. \n  4) ﺟﺎذﺑﮥ ﺑﯿﻦ ﻣﻮﻟﮑﻮل ﻫﺎی ﭘﻠﯽ اﺗﻦ ﺳﻨﮕﯿﻦ ﺑﯿﺸﺘﺮ از ﭘﻠﯽ اﺗﻦ ﺳﺒﮏ اﺳﺖ.",
      options: ["۱/۲", "۴/۳", "۱", "۸/۹"],
      correctIndex: 0,
      answer: "گزینه 1 (۱۲). فرمول پلی‌استایرن C₈H₈ است؛ نسبت جرم کربن به هیدروژن = (۸×۱۲)/(۸×۱)=۱۲."
    },
    {
      id: 24,
      text: "ﭼﻪ ﺗﻌﺪاد از ﻋﺒﺎرت ﻫﺎی زﯾﺮ درﺳﺖ ﻫﺴﺘﻨﺪ؟ \n اﻟﻒ) ﭘﻠﯽ اﺗﻦ ﺳﺒﮏ ﻧﻘﻄﮥ ذوب ﮐﻤﺘﺮی ﺑﻪ ﻧﺴﺒﺖ ﭘﻠﯽ اﺗﻦ ﺳﻨﮕﯿﻦ دارد. \n ب) ﭘﻠﯽ اﺗﻦ ﺳﺒﮏ ﻫﻤﺎﻧﻨﺪ ﭘﻠﯽ اﺗﻦ ﺳﻨﮕﯿﻦ، ﭘﻠﯿﻤﺮی ﻧﺎﻗﻄﺒﯽ اﺳﺖ.\n پ) ﭘﻠﯽ اﺗﻦ ﺳﻨﮕﯿﻦ ﺑﺮﺧﻼف ﭘﻠﯽ اﺗﻦ ﺳﺒﮏ ﭘﻠﯿﻤﺮی ﺑﺪون ﺷﺎﺧﻪ اﺳﺖ. \n ت) ﭘﻠﯽ اﺗﻦ ﺳﺒﮏ ﺑﻪ ﻧﺴﺒﺖ ﭘﻠﯽ اﺗﻦ ﺳﻨﮕﯿﻦ ﺳﺎﺧﺘﺎر ﻧﺎﻣﻨﻈﻢ ﺗﺮی دارد.",
      options: ["1", "2", "3", "4"],
      correctIndex: 3,
      answer: "گزینه 4 (۸/۴ kg). ساختار نمادی داده شده مربوط به پلی‌اتن سبک است و ۲۰٪ از کل مونومرها به پلی‌اتن سبک تبدیل می‌شود: ۴۲ × ۲۰/۱۰۰ = ۸/۴ kg."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧬 فصل ۳: پلیمرها و درشت‌مولکول‌ها</h1>
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
            }}>📝 پاسخنامه تشریحی - فصل ۳: پلیمرها و درشت‌مولکول‌ها</h2>
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

export default Shimi2Lesson12;