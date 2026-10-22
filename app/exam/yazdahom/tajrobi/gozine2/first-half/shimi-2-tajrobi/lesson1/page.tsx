"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson1Exam2 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 11,
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) زمین انباری از ذخایر ارزشمند است که این منابع به‌طور یکسان توزیع شده‌اند.\nب) شیمی‌دان‌ها برای یافتن پاسخ پرسش‌های خود دربارهٔ منابع موجود در زمین در پی کشف الگوها و روندهای موجود در رفتار مواد و عنصرها هستند.\nپ) در ساختار کودهای شیمیایی عناصر فسفر، نیتروژن و پتاسیم یافت می‌شود.\nت) تمامی مواد دریافت شده از گرهٔ زمین برای تولید یک وسیله، به صورت خام می‌توانند مورد استفاده قرار بگیرد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "عبارت‌های ب و پ درست هستند."
    },
    {
      id: 14,
      text: "کدام گزینه در مورد عناصر جدول تناوبی درست است؟\nالف) بیشتر عنصرهای جدول دوره‌ای را فلزها تشکیل می‌دهند که به‌طور عمده در سمت چپ و مرکز جدول قرار دارند.\nب) خواص فیزیکی شبه فلزها بیشتر به نافلزها شبیه بوده درحالی‌که رفتار شیمیایی آن‌ها همانند فلزها است.\nپ) خواص فیزیکی و شیمیایی عنصرها به صورت دوره‌ای تکرار می‌شود که به قانون دوره‌ای عنصرها معروف است.\nت) فلزها تمایل به از دست دادن الکترون دارند و بیشترین خصلت فلزی در عنصرهای سمت چپ و پایین جدول دوره‌ای دیده می‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "هر چهار عبارت درست هستند."
    },
    {
      id: 18,
      text: "چند مورد از عبارت‌های زیر درست است؟\nالف) تعدادی از عنصرهای اصلی دستهٔ p، شبه‌فلز و بقیه نافلز محسوب می‌شوند.\nب) عنصرهای دستهٔ اصلی ۵ همگی فلز هستند و رسانای جریان برق می‌باشند.\nپ) در تناوب سوم شمار نافلزهای جامد و شمار عنصرهای گازی یکسان است.\nت) عنصرهای چکش‌خوار نظیر سرب و ژرمانیوم سخت بوده و بر اثر ضربه خرد نمی‌شوند.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "تنها عبارت الف درست است."
    },
    {
      id: 23,
      text: "کدام مقایسۀ زیر به‌درستی صورت گرفته است؟",
      options: [
        "میزان شکل‌پذیری: C > Pb",
        "شمار الکترون لایۀ ظرفیت: Ca > Al",
        "درخشان بودن سطح: P < Ge",
        "مقاومت در برابر ضربه: Sn < Cl"
      ],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. ژرمانیم سطح براق و فسفر سطح کدر دارد."
    },
    {
      id: 27,
      text: "عنصر X از دورهٔ سوم جدول تناوبی عنصرها در واکنش با گاز کلر ترکیبی به فرمول XCl4 تولید می‌کند که در ساختار آن تمام اتم‌ها از قاعدهٔ هشت‌تایی پیروی می‌کنند. کدام مطلب در مورد عنصر X درست است؟\nالف) عنصر X در بیرونی‌ترین زیرلایهٔ خود دارای ۲ الکترون با اعداد کوانتومی ۳ و ۱ = ۱ است.\nب) همانند عنصری با عدد اتمی ۶، توانایی تشکیل یون تک‌اتمی را ندارد.\nپ) فاقد رسانایی الکتریکی است.\nت) اختلاف عدد اتمی آن با آخرین عنصر دستهٔ p در دورهٔ چهارم جدول تناوبی برابر با ۲۴ است.",
      options: ["الف و ب", "پ و ت", "الف و ت", "ب و پ"],
      correctIndex: 0,
      answer: "موارد الف و ب درست هستند. عنصر X سیلیسیم است."
    },
    {
      id: 32,
      text: "عناصر \"ژرمانیم\" و \"قلع\" در چه تعداد از ویژگی‌های زیر مشترک هستند؟\nالف) به اشتراک گذاشتن الکترون هنگام واکنش\nب) دورۀ یکسان در جدول تناوبی عناصر\nپ) نسبت شمار الکترون‌های ظرفیتی به شمار الکترون‌های لایۀ سوم\nت) رسانایی الکتریکی بالا",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "۲ ویژگی مشترک است (اشتراک الکترون و نسبت الکترون‌های ظرفیتی به لایه سوم)."
    },
    {
      id: 36,
      text: "کدام گزینه پیرامون سه عنصر Na, Mg, Al نادرست است؟",
      options: [
        "هر سه جزو عناصر دستۀ s جدول تناوبی هستند.",
        "خصلت فلزی Mg کمتر و از Al بیشتر است.",
        "Na همانند Mg در اثر ضربه تغییر شکل می‌دهد، ولی خرد نمی‌شود.",
        "هر سه سطح درخشانی دارند."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. Al در دسته p قرار دارد."
    },
    {
      id: 41,
      text: "شکل‌های زیر به ترتیب از راست به چپ متعلق به کدام عنصر است؟ (اشکال مربوط به ساختار بلوری)",
      options: [
        "قلع - کربن - ژرمانیم - سرب",
        "قلع - کربن - سرب - ژرمانیم",
        "سرب - قلع - ژرمانیم - کربن",
        "سرب - کربن - ژرمانیم - قلع"
      ],
      correctIndex: 0,
      answer: "ترتیب از راست به چپ: قلع، کربن، ژرمانیم، سرب است."
    },
    {
      id: 45,
      text: "از بین مطالب زیر چند مورد درست است؟\n- در همۀ گروه‌های اصلی جدول تناوبی آرایش الکترونی لایۀ ظرفیت عناصر هم‌گروه مشابه است.\n- سیلیسیم (14Si) عنصری شبه فلزی است که رسانایی الکتریکی کمی دارد.\n- ژرمانیم شبه فلزی است که در واکنش با دیگر اتم‌ها الکترون به اشتراک می‌گذارد.\n- سرب جامدی شکل‌پذیر و شکننده است که بر اثر واکنش با دیگر اتم‌ها می‌تواند الکترون از دست بدهد.\n- کربن نافلزی از گروه 14 است که رسانایی الکتریکی ندارد، اما رسانایی گرمایی دارد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "۲ مورد درست است (مورد اول و سوم)."
    },
    {
      id: 50,
      text: "در بین عناصر گروه چهاردهم جدول تناوبی عناصر، دو عنصر ...... و ...... رسانایی الکتریکی کمی دارند و عنصر ...... جامدی شکل‌پذیر است.",
      options: ["Ge – Si – Pb", "Pb – Si – Sn", "Pb – Sn – Si", "Pb – Ge – Si"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. Ge و Si رسانایی کمی دارند و Pb شکل‌پذیر است."
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
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
  }, [selectedAnswers, questions]);

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
      setTimeLeft((prev) => {
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
      setTimeout(() => calculateScore(), 300);
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
    <div style={{ fontFamily: 'Tahoma, Arial, sans-serif', width: '100vw', minHeight: '100vh', padding: '15px 10px', backgroundColor: '#f8f9fa', direction: 'rtl', textAlign: 'right', boxSizing: 'border-box', overflowX: 'hidden' }}>
      <div style={{ backgroundColor: '#E65100', color: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px', textAlign: 'center', position: 'relative' }}>
        <button onClick={() => router.push('/exam/yazdahom/tajrobi/gozine2/first-half/shimi-2-tajrobi')} style={{ position: 'absolute', left: '20px', top: '20px', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون ۲ شیمی (۲) - الگوها و روندها</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>{questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}</p>
          </div>
          <div style={{ backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)', padding: '10px 25px', borderRadius: '50px', fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>⏱️</span><span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{ marginBottom: '25px', backgroundColor: '#ffffff', padding: '20px 25px', borderRadius: '8px', border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '17px', lineHeight: '1.9', marginBottom: '20px', fontWeight: '500', display: 'flex', alignItems: 'flex-start', whiteSpace: 'pre-wrap' }}>
              <span style={{ display: 'inline-block', backgroundColor: '#E65100', color: 'white', width: '30px', height: '30px', textAlign: 'center', lineHeight: '30px', borderRadius: '50%', fontSize: '14px', marginLeft: '15px', flexShrink: 0, marginTop: '2px' }}>{index + 1}</span>
              <span>{q.text}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 30px', marginRight: '20px' }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                const isDisabled = isTimeUp || isScoreCalculated;
                return (
                  <button key={idx} onClick={() => handleOptionClick(q.id, idx)} disabled={isDisabled} style={{ display: 'flex', alignItems: 'center', padding: '12px 18px', border: isSelected ? '3px solid #E65100' : '1px solid #dee2e6', borderRadius: '10px', backgroundColor: isSelected ? '#fff3e0' : '#fff', cursor: isDisabled ? 'not-allowed' : 'pointer', fontSize: '15px', textAlign: 'right', transition: 'all 0.2s', width: '100%', opacity: isDisabled && !isSelected ? 0.6 : 1 }}>
                    <span style={{ display: 'inline-block', width: '28px', height: '28px', border: '1px solid #000', borderRadius: '50%', textAlign: 'center', lineHeight: '28px', fontSize: '14px', marginLeft: '15px', backgroundColor: isSelected ? '#E65100' : '#fff', color: isSelected ? '#fff' : '#000' }}>{String.fromCharCode(65 + idx)}</span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div style={{ marginTop: '30px', marginBottom: '30px', padding: '20px', backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #dee2e6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
          {!isScoreCalculated ? (
            <div>
              <button onClick={() => { if (canCalculate) calculateScore(); }} disabled={!canCalculate} style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: canCalculate ? '#E65100' : '#6c757d', color: '#fff', border: 'none', borderRadius: '50px', cursor: canCalculate ? 'pointer' : 'not-allowed', fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6 }}>
                {!isAllAnswered && !isTimeUp ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید` : '📊 محاسبه درصد'}
              </button>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#E65100' }}>✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span></div>
              <div style={{ width: '80%', maxWidth: '400px', height: '20px', backgroundColor: '#e9ecef', borderRadius: '10px', overflow: 'hidden', margin: '15px auto' }}>
                <div style={{ width: `${score}%`, height: '100%', backgroundColor: getScoreColor(score!), transition: 'width 0.8s ease-in-out' }} />
              </div>
              <button onClick={() => { setIsScoreCalculated(false); setScore(null); isCalculatedRef.current = false; isTimeUpRef.current = false; }} style={{ padding: '10px 25px', fontSize: '14px', backgroundColor: '#ff9800', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', marginTop: '10px' }}>🔄 تغییر پاسخ‌ها</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button onClick={() => setShowAnswers(!showAnswers)} style={{ padding: '15px 40px', fontSize: '18px', backgroundColor: showAnswers ? '#dc3545' : '#28a745', color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.15)' }}>
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {showAnswers && isScoreCalculated && (
          <div style={{ marginTop: '30px', borderTop: '4px solid #E65100', paddingTop: '40px', backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%' }}>
            <h2 style={{ textAlign: 'center', borderBottom: '3px solid #E65100', paddingBottom: '20px', marginBottom: '40px', fontSize: '26px', color: '#E65100' }}>📝 پاسخنامه تشریحی آزمون ۲</h2>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} style={{ marginBottom: '35px', borderBottom: '1px dashed #ced4da', paddingBottom: '25px' }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{ fontWeight: 'bold', color: '#E65100', backgroundColor: '#fff3e0', padding: '5px 15px', borderRadius: '20px', display: 'inline-block', marginBottom: '10px' }}>سوال {index + 1}</span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span> <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>{isCorrect ? '✔️ صحیح' : '❌ نادرست'}</span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>(انتخاب شما: {String.fromCharCode(65 + userAnswer)})</span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#E65100' }}>📖 توضیح:</span> <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Shimi2Lesson1Exam2;