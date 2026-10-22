"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson3Exam2 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 11,
      text: "چند مورد از مقایسه‌های زیر درست هستند؟\n- شعاع اتمی: S < Br\n- واکنش‌پذیری: Ca < Sr\n- خاصیت نافلزی: P < Ge\n- تعداد یون تشکیل‌دهنده: Ni < Sc",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "گزینه ۴ درست است. هر چهار مقایسه درست هستند."
    },
    {
      id: 12,
      text: "باتوجه به واکنش کلی زیر چند گزینه درست است؟ (عنصر A هالوژن است)\nA2(x) + H2 → 2HA(g)\nالف) اگر A هالوژنی باشد که حتی در دمای -۲۰۰ °C به‌سرعت واکنش دهد، تمایل A به تشکیل آنیون کمتر از بقیه هالوژن‌ها است.\nب) اگر t برابر با ۲۵ °C باشد و واکنش انجام نشود، آنگاه x به‌صورت I2 یا s است.\nپ) اگر x جامد باشد، در این صورت A شعاع بیشتری نسبت به Br دارد.\nت) اگر A2 هالوژنی باشد که در واکنش با فلز سدیم نور زردرنگ تولید می‌کند، آنگاه t > ۲۰۰ °C است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. ۳ مورد درست هستند."
    },
    {
      id: 13,
      text: "کدام مقایسه در مورد شعاع گونه‌ها درست است؟",
      options: [
        "K < 20Ca < 21Sc",
        "Sc3+ < K+ < Cl-",
        "Cl- < K+ < Ca2+",
        "K+ < Cl- < Ca2+"
      ],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ترتیب شعاع: Sc3+ < K+ < Cl-."
    },
    {
      id: 14,
      text: "عناصری که در سمت چپ ............ جدول تناوبی قرار دارند، بیشترین خصلت فلزی و عناصری که در سمت راست و ............ جدول تناوبی جای دارند (به‌جز گازهای نجیب) بیشترین خصلت نافلزی را دارند.",
      options: [
        "پایین - پایین",
        "بالا - بالا",
        "پایین - بالا",
        "بالا - پایین"
      ],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. بیشترین خصلت فلزی در پایین و چپ، و بیشترین خصلت نافلزی در بالا و راست جدول است."
    },
    {
      id: 15,
      text: "کدام گزینۀ زیر نادرست است؟",
      options: [
        "در دورۀ سوم جدول تناوبی به ترتیب ۳ و ۴ عنصر فلزی و نافلزی وجود دارد.",
        "عنصر کلر در دمای اتاق به آرامی با گاز هیدروژن واکنش می‌دهد.",
        "خصلت فلزی، فلزات قلیایی از فلزات قلیایی خاکی بیشتر است.",
        "فعالیت شیمیایی عنصر 55A از 37B بیشتر است."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. در دوره سوم ۳ فلز و ۵ نافلز (شامل آرگون) وجود دارد."
    },
    {
      id: 16,
      text: "عنصر X در دورۀ سوم و گروه سیزدهم و عنصر Y در دورۀ چهارم و گروه چهاردهم جدول تناوبی جای دارند. چه تعداد از ویژگی‌های زیر بین دو عنصر X و Y مشابه است؟\nالف) خرد نشدن در اثر ضربه\nب) میزان رسانایی الکتریکی\nپ) تبادل الکترون در اثر واکنش\nت) جز عناصر دستۀ p",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۲ ویژگی مشابه (میزان رسانایی الکتریکی و دسته p)."
    },
    {
      id: 17,
      text: "چند مورد از موارد زیر درست است؟\n- در تمام عنصرهایی که در یک گروه جای گرفته‌اند، آرایش الکترونی لایه ظرفیت مشابه است.\n- عدم توزیع یکسان عناصر در جهان باعث پیدایش تجارت جهانی شده است.\n- عنصرها در جدول دوره‌ای بر اساس بنیادی‌ترین ویژگی آن‌ها، یعنی عدد اتمی چیده شده‌اند.\n- کلر همانند شبه فلز دورۀ سوم جدول دوره‌ای می‌تواند با دریافت الکترون به آرایش الکترونی گاز نجیب هم‌دورۀ خود یعنی آرگون برسد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۲ مورد درست (مورد دوم و سوم)."
    },
    {
      id: 18,
      text: "چه تعداد از ویژگی‌های زیر به ترتیب از راست به چپ بین دو عنصر Si و Mg مشترک و متفاوت است؟\nالف) بالا بودن رسانایی الکتریکی\nب) از دست دادن الکترون در واکنش با دیگر اتم‌ها\nپ) قابلیت تغییر شکل در اثر ضربه\nت) سطح درخشان",
      options: ["۲، ۲", "۳، ۱", "۱، ۳", "۴، ۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. ۲ ویژگی مشترک و ۲ ویژگی متفاوت."
    },
    {
      id: 19,
      text: "چه تعداد از موارد زیر درست هستند؟\nالف) همۀ نافلزها با گرفتن الکترون به آنیون تبدیل می‌شوند.\nب) هالیدها با گرفتن یک الکترون، به آرایش گاز نجیب بعد از خود می‌رسد.\nپ) خصلت نافلزی با شعاع اتمی رابطه عکس دارد.\nت) تعداد لایه‌های الکترونی در هالوژن‌ها با واکنش‌پذیری آن‌ها رابطه‌ی مستقیم دارد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. تنها مورد پ درست است."
    },
    {
      id: 20,
      text: "چه تعداد از ویژگی‌های زیر با افزایش عدد اتمی در گروه هالوژن‌ها، افزایش می‌یابد؟\nالف) شعاع یونی\nب) شعاع اتمی\nپ) واکنش‌پذیری\nت) دمای لازم برای واکنش با هیدروژن",
      options: ["صفر", "۱", "۲", "۳"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. ۳ ویژگی (شعاع یونی، شعاع اتمی و دمای لازم) افزایش می‌یابد."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون ۲ - رفتار عناصرها و شعاع اتم</h1>
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

export default Shimi2Lesson3Exam2;