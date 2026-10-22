"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson14 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۱۴: پلی آمیدها =================
  // بازه سوالات ۹۲ تا ۱۱۱ (صفحه ۲۰ تا ۲۴) - ۱۰ سوال رندوم
  const questions = [
    {
      id: 92,
      text: "چند مورد از مطلب‌های زیر در مورد آمید حاصل از واکنش ساده‌ترین آمین با ساده‌ترین اسید آلی درست است؟ (H=1, C=12, N=14, O=16: g.mol⁻¹)\nالف) جرم مولی آن برابر با ۷۳ گرم است.\nب) توانایی تشکیل پیوند هیدروژنی بین مولکول‌های آب را دارد.\nپ) نسبت شمار جفت‌الکترون‌های پیوندی به ناپیوندی در آن برابر با ۲ است.\nت) مجموع آنتالپی‌های پیوند در آن از مجموع آنتالپی‌های پیوندی در آمین و اسید آلی سازندۀ آن کمتر است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ (۲ مورد درست). طبق پاسخنامه: موارد ب و ت درست هستند. الف نادرست (جرم مولی ۵۹ گرم است). پ نادرست (نسبت برابر با ۳ است)."
    },
    {
      id: 93,
      text: "کدام موارد از مطالب زیر درست است؟\nالف) برای تهیۀ پلی‌الکتیک اسید، نشاستۀ موجود در فرآورده‌های کشاورزی را به الکتیک اسید تبدیل می‌کنند.\nب) به‌طورکلی واکنش آبکافت پلی‌استرها و پلی‌آمیدها بسیار کند است.\nپ) پلی‌اتیلن ترفتالات همانند دیگر پلیمرهای طبیعی، ماندگاری زیادی دارد و در طبیعت به‌کندی تجزیه می‌شود.\nت) از گاز اتن می‌توان در شرایط مناسب، اتیل استات (حلال چسب) ساخت.",
      options: ["الف - ت", "الف - ب - ت", "پ - ب", "پ - ت"],
      correctIndex: 1,
      answer: "گزینه 2 (الف - ت). طبق پاسخنامه: الف درست. ب نادرست (واکنش آبکافت پلی‌استرها و پلی‌آمیدها بسیار کند است، نه سریع). پ نادرست (پلی‌اتیلن ترفتالات مصنوعی است). ت درست."
    },
    {
      id: 95,
      text: "چند مورد از مولکول‌های زیر توانایی تشکیل پیوند هیدروژنی را دارند؟\n- اتیل بوتانوات\n- تری متیل آمین\n- متانوئیک اسید\n- پروپانول",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه 3 (۲ مولکول). طبق پاسخنامه: متانوئیک اسید و پروپانول توانایی تشکیل پیوند هیدروژنی دارند. اتیل بوتانوات و تری متیل آمین فاقد این توانایی هستند."
    },
    {
      id: 96,
      text: "کدام گزینه در مورد پلیمرها درست است؟",
      options: [
        "پلیمرهای سازندۀ شاخ حیوانات، پنبه و پشم گوسفند دارای اتم‌های N و O, H, C هستند.",
        "پلی‌استرها پلیمرهای زیست‌تخریب‌پذیر و پلی‌آمیدها زیست‌تخریب ناپذیرند.",
        "پلیمرهای حاصل از هیدروکربن‌های سیرنشده به‌راحتی در واکنش‌های شیمیایی شرکت کرده و تجزیه می‌شوند.",
        "برای تهیۀ پلیمر سبز، از نشاستۀ موجود در فرآورده‌های کشاورزی مانند سیب‌زمینی، ذرت و نیشکر استفاده می‌شود."
      ],
      correctIndex: 3,
      answer: "گزینه ۴. طبق پاسخنامه: پلیمر سبز از نشاستۀ موجود در فرآورده‌های کشاورزی تهیه می‌شود. گزینه ۱ نادرست (پنبه سلولز است و N ندارد). گزینه ۲ نادرست (هر دو زیست‌تخریب‌پذیرند). گزینه ۳ نادرست (این پلیمرها تجزیه نمی‌شوند)."
    },
    {
      id: 97,
      text: "کدام آمین در واکنش تولید آمید، نمی‌تواند شرکت کند؟",
      options: ["متیل آمین", "دی‌متیل آمین", "اتیل متیل آمین", "دی‌اتیل متیل آمین"],
      correctIndex: 3,
      answer: "گزینه ۴ (دی‌اتیل متیل آمین). طبق پاسخنامه: آمین‌هایی که در ساختار خود دست‌کم یک اتم هیدروژن متصل به N دارند می‌توانند در واکنش آمیدی شرکت کنند. دی‌اتیل متیل آمین فاقد این ویژگی است."
    },
    {
      id: 106,
      text: "ﭘﻮﺳﯿﺪه ﺷﺪن ﻟﺒﺎس ﻫﺎی ﭘﻠﯽ اﺳﺘﺮی در ﻃﻮل زﻣﺎن ﺑﻪ ﻣﻌﻨﯽ ﺷﮑﺴﺘﻦ ﭘﯿﻮﻧﺪﻫﺎی ............ و ﺳﺴﺖ ﺷﺪن ﺗﺎر و ﭘﻮد ﻟﺒﺎس اﺳﺖ ﮐﻪ در ﻣﺤﯿﻂ ............ و............ ﺑﺮ ﺳﺮﻋﺖ آن اﻓﺰوده ﻣﯽ ﺷﻮد.",
      options: [
        "ﮔﺮم، ﺧﺸﮏ.",
        " ﮔﺮم، ﻣﺮﻃﻮب",
        "ﺳﺮد، ﺧﺸﮏ",
        "ﺳﺮد، ﻣﺮﻃﻮب"
      ],
      correctIndex: 1,
      answer: "گزینه 2. طبق پاسخنامه: کولار یک پلی‌آمید است که از واکنش ترفتالیک اسید (دی‌اسید) با پارا-فنیلن دی‌آمین (دی‌آمین) به دست می‌آید. گزینه ۱ نادرست (پلی‌آمید است). گزینه ۲ نادرست (اختلاف جرم ۴۴ است). گزینه ۴ نادرست (از واکنش دی‌آمین با دی‌اسید حاصل شده)."
    },
    {
      id: 110,
      text: "ﭼﻨﺪ ﻣﻮرد از ﻣﻄﺎﻟﺐ زﯾﺮ درﺳﺖ اﻧﺪ؟\nاﻟﻒ) ﺑﺮای ﺗﻬﯿﮥ ﭘﻠﯿﻤﺮ ﺳﺒﺰ ﻧﺨﺴﺖ ﺑﺎﯾﺪ ﻧﺸﺎﺳﺘﻪ ﻣﻮﺟﻮد در ﺑﺮﺧﯽ از ﻓﺮآورده ﻫﺎی ﮐﺸﺎورزی را ﺑﻪ ﻻﮐﺘﯿﮏ اﺳﯿﺪ ﺗﺒﺪﯾﻞ ﮐﺮد. \n ب) اﺳﯿﺪ ﻣﻮﺟﻮد در ﺷﯿﺮ ﺗﺮش ﺷﺪه، ﻻﮐﺘﯿﮏ اﺳﯿﺪ اﺳﺖ ﮐﻪ ﮔﺮوه ﻋﺎﻣﻠﯽ آن در ﺗﺮﮐﯿﺐ آﻟﯽ ﻣﻮﺟﻮد در ﺗﻤﺸﮏ و ﺗﻮت ﻓﺮﻧﮕﯽ ﻫﻢ وﺟﻮد دارد. \n پ) از ﭘﻠﯽ ﻻﮐﺘﯿﮏ اﺳﯿﺪ اﻧﻮاع ﻇﺮوف ﭘﻼﺳﺘﯿﮑﯽ ﯾﮏ ﺑﺎرﻣﺼﺮف، ﺳﻄﻞ زﺑﺎﻟﻪ و ﮐﺴﯿﮥ ﭘﻼﺳﺘﯿﮑﯽ ﻣﯽ ﺗﻮان ﺗﻬﯿﻪ ﮐﺮد. \n ت) اﻣﺮوزه ﺷﯿﻤﯽ دان ﻫﺎ در ﺟﺴﺖ وﺟﻮی ﭘﻠﯿﻤﺮﻫﺎی ﺟﺪﯾﺪی ﻣﺎﻧﻨﺪ ﭘﻼﺳﺘﯿﮏ ﻫﺎی رﺳﺎﻧﺎ، ﻣﻮاد ﭘﺮﮐﻨﻨﺪه دﻧﺪان و ﻧﺦ ﺑﺨﯿﻪ ﻫﻮﺷﻤﻨﺪ ﻫﺴﺘﻨﺪ.",
      options: [
        "1",
        "2",
        "3",
        "4"
      ],
      correctIndex: 3,
      answer: "گزینه 4. طبق پاسخنامه: ساختار داده شده پلی‌آمید است که از واکنش HOOC-CH₂-COOH (مالونیک اسید) با H₂N(CH₂)₂NH₂ (اتیلن دی‌آمین) حاصل می‌شود."
    },
    {
      id: 100,
      text: "پاسخ درست کدام است؟\nالف) در ساختار مولکول زیر چند الکترون پیوندی وجود دارد؟\nب) پلی‌آمید از واکنش بین کدام ۲ دسته تشکیل می‌شود؟\nپ) در ساخت سرنگ از کدام پلیمر استفاده می‌شود؟",
      options: [
        "۶۲، دی‌آمین و دی‌اسید، تفلون",
        "۳۱، دی‌آمین و دی‌اسید، پلی‌پروپین",
        "۳۱، دی‌آمین و دی‌اسید، تفلون",
        "۶۲، الکل و دی‌اسید، پلی‌پروپین"
      ],
      correctIndex: 1,
      answer: "گزینه ۲. طبق پاسخنامه: ۳۱ جفت الکترون پیوندی، دی‌آمین و دی‌اسید، پلی‌پروپین."
    },
    {
      id: 104,
      text: "مقداری آمونیاک طی واکنش زیر، ۱۲ مول فرآورده ایجاد می‌کند. اگر آنتالپی این واکنش، صد برابر گرمای لازم برای افزایش دمای این مقدار آمونیاک از ۲۵°C به ۱۲۰°C باشد، میانگین آنتالپی پیوند N-H بر حسب کیلوژول بر مول کدام است؟ (گرمای ویژۀ آمونیاک را ۱/۱۵ J.g⁻¹.°C⁻¹ در نظر بگیرید) (N=14, H=1: g.mol⁻¹)\nNH₃(g) → NH(g) + ۲H(g)",
      options: ["۳۹۵", "۳۹۱", "۳۷۷", "۳۸۶"],
      correctIndex: 1,
      answer: "گزینه ۲ (۳۹۱). طبق پاسخنامه: ۱۲ مول فرآورده = ۴ مول NH₃. Q = ۴ × ۱۷ × ۱/۱۵ × ۹۵ = ۷۴۲۹ J. ΔH = ۱۰۰ × ۷/۴۳ = ۷۴۳ kJ. برای ۱ مول: ۱۸۵/۷۵ kJ. هر NH₃ دو پیوند N-H می‌شکند: ΔH(N-H) = ۱۸۵/۷۵/۲ × ۴ = ۳۹۱ kJ."
    },
    {
      id: 111,
      text: "چندمورد از مطالب زیر درمورد شیمی سبز نادرست است؟\n- عناصر موجود در ساختار سوخت‌های سبز مشابه عناصر هیدروکربن‌ها است.\n- کربن دی‌اکسید تولیدی در صنعت را می‌توان به کربنات تبدیل و در مصارف دیگر مورد استفاده قرار داد.\n- نشاسته هنگام گوارش (که از دهان آغاز می‌شود) به گلوکز تبدیل می‌شود.\n- واکنشی از دیدگاه اتمی به صرفه است که اتم‌های بیشتری به فرآوردۀ بیشتر تبدیل شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ (۲ مورد نادرست). طبق پاسخنامه: موارد ۱ و ۴ نادرست هستند. مورد ۱ نادرست است (سوخت‌های سبز عناصر متفاوتی دارند). مورد ۴ نادرست است (واکنش اتمی به صرفه، اتم‌های بیشتری را به فرآورده تبدیل می‌کند، نه کمتر)."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧬 درس ۱۴: پلی آمیدها</h1>
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
            }}>📝 پاسخنامه تشریحی - درس ۱۴: پلی آمیدها</h2>
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

export default Shimi2Lesson14;