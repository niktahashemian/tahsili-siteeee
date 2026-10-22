"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson4Exam1 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 144,
      text: "با توجه به آرایش الکترونی اتم‌های A، B، C و D کدام‌یک از آن‌ها با از دست دادن الکترون و یا به دست آوردن الکترون می‌تواند به یون پایداری با آرایش هشت‌تایی تبدیل شود؟\nA: 1s2 2s2 2p6 3p5\nB: 1s2 2s2 2p6 3s2 3p6\nC: 1s2 2s2 2p6 3s2 3p6 3d1 4s2\nD: 1s2 2s2 2p6 3s2 3d4 4s1",
      options: ["A , C", "فقط A", "A، B و C", "B , D"],
      correctIndex: 0,
      answer: "عناصر A (کلر) و C (اسکاندیم) می‌توانند به آرایش هشت‌تایی برسند. A با گرفتن ۱ الکترون و C با از دست دادن ۳ الکترون."
    },
    {
      id: 2,
      text: "آرایش الکترونی کدام دو جفت کاتیون زیر یکسان نیست؟",
      options: [
        "26fe2+,27co3+",
        "30zn2+29cu+",
        "25Mn3+,24rc3+",
        "22Ti2+,23V3+"
      ],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. 25Mn3+ آرایش [Ar]3d4 دارد و 24Cr3+ آرایش [Ar]3d3 دارد."
    },
    {
      id: 3,
      text: "در مورد عنصرهای واسطه چند مورد از مطالب زیر نادرست‌اند؟\n- دو عنصر دارای آرایش 3d5 و دو عنصر دارای آرایش 3d10 هستند.\n- فاز آهن (26Fe) دارای دو اکسید طبیعی FeO و Fe2O3 است.\n- از بین آن‌ها نخستین عنصر در وسایل خانه مانند تلویزیون رنگی و برخی شیشه‌ها وجود دارد.\n- کاتیون 21Sc3+ برعکس 24Cr3+ به آرایش هشتایی می‌رسد.",
      options: ["۱", "صفر", "۳", "۲"],
      correctIndex: 0,
      answer: "۲ مورد نادرست است. (مورد اول: Cr و Mn دارای 3d5 و Cu و Zn دارای 3d10 هستند. مورد چهارم: Sc3+ به آرایش هشتایی می‌رسد اما Cr3+ به آرایش [Ar]3d3 می‌رسد که هشتایی نیست)."
    },
    {
      id: 4,
      text: "اگر آرایش الکترونی کاتیون ترکیب MN (نیترید فلز M) به صورت [Ar]3d4 باشد، کدام مورد درست است؟\nالف) اکسید فلز M می‌تواند به صورت MO باشد.\nب) عدد اتمی عنصر M برابر با ۲۵ است.\nپ) عنصر M دارای ۴ الکترون با 2 = l است.\nت) شمار الکترون لایه ظرفیت عنصر M برابر با ۶ است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "۲ مورد درست است (الف و ب). فلز M کروم (Cr) است."
    },
    {
      id: 5,
      text: "کدام گزینه درست است؟",
      options: [
        "آهن همانند فلز سدیم به سرعت با اکسیژن در هوای مرطوب واکنش می‌دهد و به زنگ آهن تبدیل می‌شود.",
        "کاتیون فلزات گروه ۱۴ جدول دوره‌ای، در واکنش با دیگر اتم‌ها الکترون از دست می‌دهند و به آرایش گاز نجیب ماقبل خود می‌رسند.",
        "روند کلی تغییر واکنش‌پذیری عناصر دورهٔ دوم جدول دوره‌ای با افزایش شمارهٔ گروه در ابتدا فقط به‌صورت کاهشی و سپس فقط به‌صورت افزایشی است.",
        "کاتیون فلزی که در تلویزیون رنگی و برخی شیشه‌ها وجود دارد همانند آنیون عنصری که بیشترین خصلت نافلزی را در میان عناصر دورهٔ سوم جدول تناوبی دارد، دارای دو زیرلایه پر از الکترون با ۱ = l است."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ درست است. فلز مورد نظر اسکاندیم (Sc) و آنیون مورد نظر کلر (Cl-) است."
    },
    {
      id: 6,
      text: "آرایش الکترونی کاتیون A2+ و B3+ به ترتیب به زیرلایه‌های 3d7 و 3d7 ختم شده است. کدام عددهای اتمی زیر را می‌توان به عنصر آن‌ها نسبت داد؟",
      options: ["28 و 21", "27 و 21", "27 و 23", "28 و 23"],
      correctIndex: 0,
      answer: "گزینه 1 درست است. A (کبالت) با عدد اتمی ۲۷ و B (آهن) با عدد اتمی ۲۶ است."
    },
    {
      id: 7,
      text: "کدام گزینه نادرست است؟",
      options: [
        "فلز واسطه‌ای که در برخی شیشه‌ها وجود دارد، با تشکیل یون پایدار به آرایش گاز نجیب نمی‌رسد.",
        "همۀ مواد طبیعی و ساختگی از گره زمین به دست می‌آیند.",
        "در سال‌های اخیر، مواد معدنی نسبت به فلزات میزان مصرف بیشتری داشته‌اند.",
        "رنگ سبز زمرد نشان‌دهندۀ وجود عنصری از دستۀ d در آن است."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. اسکاندیم با تشکیل یون Sc3+ به آرایش گاز نجیب آرگون می‌رسد."
    },
    {
      id: 8,
      text: "چند مورد از مطالب زیر درمورد جدول دوره‌ای مندلیف درست است؟\n- عناصری که در یک گروه قرار دارند، خواص شیمیایی مشابه و عناصر موجود در یک دوره خواص فیزیکی مشابهی دارند.\n- در هر خانه از جدول اطلاعاتی نظیر نماد شیمیایی عنصر، عدد اتمی و عدد جرمی درج شده است.\n- خواص فلزی و خواص نافلزی به ترتیب با شعاع اتمی رابطه مستقیم و عکس دارند.\n- در جدول، زیرلایه 3d در عناصر فلزی ۵۰ - ۷۰ در حال پر شدن است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "1 مورد درست است (مورد اول و سوم)."
    },
    {
      id: 9,
      text: "کدام مطلب در مورد کاتیون فلز واسطه در ترکیب NiSO4 درست است؟ (Ni در دوره چهارم و گروه ۱۰ قرار دارد)",
      options: [
        "شمار الکترون‌ها در بیرونی‌ترین زیرلایه آن برابر با ۲ است.",
        "آرایش الکترونی کاتیون 3m+1 شبیه به آرایش الکترونی کاتیون این ترکیب است.",
        "مجموع شمار الکترون‌ها در لایه‌های دوم و سوم آن برابر است.",
        "بار الکتریکی آن با بار الکتریکی کاتیون فلزی با عدد اتمی ۳۸ برابر است."
      ],
      correctIndex: 2,
      answer: "گزینه 3 درست است. Ni2+ و Ca2+ هر دو بار ۲+ دارند."
    },
    {
      id: 10,
      text: "در ترکیب CoCl3 نسبت شمار الکترون با ۱ = l در آنیون آن به شمار الکترون با ۰ = l در کاتیون آن کدام است؟ (کبالت در گروه نهم و دوره چهارم و شمار پروتون‌های کلر برابر ۱۷ است)",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. نسبت ۱۲ به ۶ برابر ۲ است."
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
        <button onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/shimi-2-tajrobi')} style={{ position: 'absolute', left: '20px', top: '20px', padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}>← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون ۱ - دنیای رنگی با عناصر دسته d</h1>
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
            <h2 style={{ textAlign: 'center', borderBottom: '3px solid #E65100', paddingBottom: '20px', marginBottom: '40px', fontSize: '26px', color: '#E65100' }}>📝 پاسخنامه تشریحی آزمون ۱</h2>
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

export default Shimi2Lesson4Exam1;