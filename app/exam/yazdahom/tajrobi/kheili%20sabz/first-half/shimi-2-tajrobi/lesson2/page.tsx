"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson3Exam4 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 31,
      text: "در یک دوره از جدول تناوبی از چپ به راست، شعاع اتمی کاهش و خصلت نافلزی افزایش می‌یابد.",
      options: [
        "گروه 14 جدول دوره‌ای شامل یک نافلز، 2 شبه فلز و 3 فلز است.",
        "درخشندگی از ویژگی‌های مشترک عناصر گروه 14 جدول دوره‌ای است.",
        "فلزات برخلاف نافلزات عموماً شکل‌پذیرند."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ درست است. فلزات شکل‌پذیرند و نافلزات شکننده هستند."
    },
    {
      id: 32,
      text: "چه تعداد از مقایسه‌های داده‌شده به‌درستی انجام شده است؟\nالف) نقطة جوش: برم < ید\nب) فعالیت شیمیایی: Na < منیزیم\nپ) تمایل به تشکیل آنیون: Cl < برم\nت) اختلاف شعاع اتمی: Si و Al < هر دو عنصر متوالی دورۀ سوم",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. ۳ مورد درست (الف، پ و ت)."
    },
    {
      id: 33,
      text: "باتوجه به جدول زیر، کدام مطلب نادرست است؟",
      options: [
        "عنصر A بیشترین خصلت فلزی را بین عناصر هم‌دورۀ خود دارد.",
        "عنصر E بیشترین خصلت نافلزی را بین عناصر هم‌گروه خود دارد.",
        "عنصر E یک نافلز است و رسانایی الکتریکی کمتری نسبت به عنصر G دارد.",
        "عنصر B نسبت به عناصر G و H خصلت نافلزی بیشتری دارد."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است."
    },
    {
      id: 34,
      text: "نسبت عدد اتمی یون دو بار مثبتی که در لایۀ سوم خود ۱۲ الکترون دارد، به شمار الکترون‌های آن با ۱ = l کدام است؟",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. نسبت ۲۴ به ۲۴ برابر ۱ است."
    },
    {
      id: 35,
      text: "کدام گزینه در ارتباط با هالوژن‌ها درست است؟",
      options: [
        "حالت فیزیکی بیش از نیمی از آن‌ها در دمای اتاق، گاز است.",
        "تمام هالوژن‌ها دارای ۷ الکترون در آخرین لایۀ الکترونی خود هستند.",
        "همۀ هالوژن‌ها بی‌رنگ هستند.",
        "گشتاور دوقطبی آن‌ها می‌تواند صفر نباشد."
      ],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. همه هالوژن‌ها ۷ الکترون در لایه ظرفیت دارند."
    },
    {
      id: 36,
      text: "باتوجه به جایگاه عنصرها در جدول تناوبی، کدام موارد نادرست هستند؟\nالف) همۀ عناصر دستۀ d و s فلز هستند.\nب) اغلب عناصر سمت چپ جدول تناوبی، فلز هستند.\nپ) اغلب نافلزات در سمت راست و بالای جدول تناوبی قرار دارند.\nت) همۀ نافلزها، تمایل به اشتراک‌گذاری الکترون دارند.",
      options: ["پ - ت", "الف - ت", "الف", "ب"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. تنها مورد الف نادرست است (هیدروژن در دسته s است اما نافلز می‌باشد)."
    },
    {
      id: 37,
      text: "کدام‌یک از ترکیبات یونی زیر، ترکیب قوی‌تر است؟",
      options: ["NaF", "MgCl2", "MgO", "NaI"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. MgO قوی‌ترین ترکیب یونی است."
    },
    {
      id: 38,
      text: "در تبدیل اتم نیکل (28Ni) به کاتیون (28Ni2+) ............",
      options: [
        "شعاع آن افزایش می‌یابد.",
        "شمار الکترون‌هایی با عدد اتمی ۱ = ۰، در آن ثابت می‌ماند.",
        "آرایش الکترونی آن مشابه آرایش الکترونی یون پایدار گاز نجیب می‌شود.",
        "جرم ذره به‌اندازۀ ۰/۰۵۱ amu کاهش می‌یابد."
      ],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. تعداد الکترون‌های با ۱ = ۰ ثابت می‌ماند."
    },
    {
      id: 39,
      text: "باتوجه به جدول زیر که قسمتی از جدول تناوبی را نشان می‌دهد، در کدام گزینه مقایسه به‌درستی صورت گرفته است؟",
      options: [
        "واکنش‌پذیری: X < Y",
        "تمایل به تشکیل آنیون: M < Y",
        "خصلت نافلزی: X < M",
        "شعاع اتمی: X > Z"
      ],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. X (ژرمانیم) از M (سلنیم) خصلت نافلزی کمتری دارد."
    },
    {
      id: 40,
      text: "باتوجه به جدول زیر که به بخشی از جدول تناوبی مربوط است، چند مورد از مطالب زیر، نادرست می‌باشد؟\n- خصلت فلزی X در مقایسه با E کمتر است.\n- تمایل D در گرفتن الکترون از Z بیشتر است.\n- شعاع اتمی X از G و Z بزرگ‌تر است.\n- در میان عنصرهای مشخص شده عنصر D کوچک‌ترین شعاع را دارد.\n- واکنش‌پذیری G از D کمتر ولی واکنش‌پذیری X از A بیشتر است.",
      options: ["۲", "۳", "۴", "۱"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۳ مورد نادرست است."
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
        <button onClick={() => router.push('/exam/yazdahom/tajrobi/kheili%20sabz/first-half/shimi-2-tajrobi')} style={{ position: 'absolute', left: '20px', top: '20px', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون ۴ - رفتار عناصرها و شعاع اتم</h1>
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
            <h2 style={{ textAlign: 'center', borderBottom: '3px solid #E65100', paddingBottom: '20px', marginBottom: '40px', fontSize: '26px', color: '#E65100' }}>📝 پاسخنامه تشریحی آزمون ۴</h2>
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

export default Shimi2Lesson3Exam4;