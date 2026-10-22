"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson5Exam5 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 41,
      text: "کدام گزینه در مورد فلزات نادرست است؟",
      options: [
        "همه فلزات در طبیعت به شکل ترکیبات یونی یافت می‌شوند.",
        "برخی فلزات مانند طلا به شکل آزاد در طبیعت یافت می‌شوند.",
        "فلزات واکنش‌پذیر در طبیعت به شکل ترکیبات یونی یافت می‌شوند.",
        "آهن در طبیعت به شکل اکسید یافت می‌شود."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. همه فلزات به شکل ترکیبات یونی یافت نمی‌شوند."
    },
    {
      id: 42,
      text: "کدام گزینه در مورد نافلزات نادرست است؟",
      options: [
        "اکسیژن و نیتروژن به شکل آزاد در هوا وجود دارند.",
        "گوگرد به شکل آزاد در طبیعت یافت می‌شود.",
        "همه نافلزات به شکل آزاد در طبیعت یافت می‌شوند.",
        "کربن به شکل گرافیت و الماس در طبیعت یافت می‌شود."
      ],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. همه نافلزات به شکل آزاد یافت نمی‌شوند."
    },
    {
      id: 43,
      text: "کدام گزینه در مورد سنگ معدن نادرست است؟",
      options: [
        "سنگ معدن ماده‌ای است که فلز از آن استخراج می‌شود.",
        "عیار سنگ معدن نشان‌دهنده درصد فلز موجود در آن است.",
        "همه سنگ‌های معدن دارای فلز هستند.",
        "سنگ معدن ممکن است حاوی ترکیبات فلزی باشد."
      ],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. همه سنگ‌های معدن دارای فلز نیستند."
    },
    {
      id: 44,
      text: "کدام گزینه در مورد کانه نادرست است؟",
      options: [
        "کانه به ترکیب فلزی موجود در سنگ معدن گفته می‌شود.",
        "هماتیت یک کانه آهن است.",
        "بوکسیت یک کانه آلومینیم است.",
        "همه کانه‌ها اکسید هستند."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است. کانه‌ها می‌توانند سولفید، کربنات و... باشند."
    },
    {
      id: 45,
      text: "کدام گزینه در مورد استخراج فلزات نادرست است؟",
      options: [
        "فلزات واکنش‌پذیر با الکترولیز استخراج می‌شوند.",
        "فلزات کم‌واکنش‌پذیر با حرارت دادن استخراج می‌شوند.",
        "کربن می‌تواند همه فلزات را از اکسیدهایشان جدا کند.",
        "آهن با کربن از سنگ معدن استخراج می‌شود."
      ],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. کربن نمی‌تواند فلزات بسیار واکنش‌پذیر مانند سدیم و پتاسیم را جدا کند."
    },
    {
      id: 46,
      text: "کدام گزینه در مورد واکنش ترمیت نادرست است؟",
      options: [
        "در این واکنش آلومینیم با اکسید آهن واکنش می‌دهد.",
        "محصول این واکنش آهن مذاب است.",
        "از این واکنش برای جوش دادن خطوط راه‌آهن استفاده می‌شود.",
        "واکنش‌پذیری آهن از آلومینیم بیشتر است."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است. واکنش‌پذیری آلومینیم از آهن بیشتر است."
    },
    {
      id: 47,
      text: "کدام گزینه در مورد بازیافت فلزات نادرست است؟",
      options: [
        "باعث کاهش مصرف انرژی می‌شود.",
        "باعث کاهش آلودگی محیط زیست می‌شود.",
        "باعث افزایش ردپای کربن دی‌اکسید می‌شود.",
        "به حفظ منابع طبیعی کمک می‌کند."
      ],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. بازیافت باعث کاهش ردپای کربن دی‌اکسید می‌شود."
    },
    {
      id: 48,
      text: "کدام گزینه در مورد گیاه‌پالایی نادرست است؟",
      options: [
        "یکی از روش‌های بیرون کشیدن فلز از معدن یا خاک، گیاه‌پالایی است.",
        "گیاه‌پالایی برای استخراج فلزات کمیاب مانند روی و نیکل، مناسب و مقرون‌به‌صرفه است.",
        "تیتانیوم برخلاف طلا، محکم است و برای استخراج آن، از آهن و منیزیم استفاده می‌شود.",
        "آلایندۀ حاصل از استخراج مس طی واکنش Cu2S با گاز اکسیژن، در فرآورده‌های حاصل از سوختن زغال‌سنگ نیز دیده می‌شود."
      ],
      correctIndex: 1,
      answer: "گزینه ۲ نادرست است. گیاه‌پالایی برای فلزات کمیاب مانند طلا مناسب است، نه روی و نیکل."
    },
    {
      id: 49,
      text: "کدام گزینه در مورد چرخه فلزات نادرست است؟",
      options: [
        "فلزات از سنگ معدن استخراج می‌شوند.",
        "فلزات استخراج شده به صورت خالص یا آلیاژ استفاده می‌شوند.",
        "فلزات از طریق فرسایش و زنگ زدن به طبیعت باز می‌گردند.",
        "آهنگ برگشت فلز به طبیعت با آهنگ استخراج آن برابر است."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است. آهنگ برگشت فلز به طبیعت بسیار کمتر از آهنگ استخراج آن است."
    },
    {
      id: 50,
      text: "کدام گزینه در مورد منابع فلزی نادرست است؟",
      options: [
        "فلزات منابع تجدیدپذیر هستند.",
        "فلزات منابع تجدیدناپذیر هستند.",
        "بازیافت فلزات به توسعه پایدار کمک می‌کند.",
        "مصرف فلزات در سال‌های اخیر افزایش یافته است."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. فلزات منابع تجدیدناپذیر هستند."
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
        <button onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/shimi-2-tajrobi')} style={{ position: 'absolute', left: '20px', top: '20px', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون ۵ - عناصر به چه شکلی در طبیعت یافت می‌شوند؟</h1>
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
            <h2 style={{ textAlign: 'center', borderBottom: '3px solid #E65100', paddingBottom: '20px', marginBottom: '40px', fontSize: '26px', color: '#E65100' }}>📝 پاسخنامه تشریحی آزمون ۵</h2>
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

export default Shimi2Lesson5Exam5;