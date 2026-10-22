"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson4Exam4 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 31,
      text: "کدام گزینه در مورد عناصر واسطه نادرست است؟",
      options: [
        "اتم هیچ یک از فلزهای واسطه با تشکیل کاتیون، به آرایش گاز نجیب دست نمی یابند.",
        "در اکسیدی از کروم (24Cr) که مجموع اتم‌های سازندۀ آن ۵ است، آرایش الکترونی یون کروم به صورت [Ar]3d3 است.",
        "از اسکاندیم (Sc) در وسایل خانه مانند تلویزیون رنگی و برخی شیشه‌ها استفاده می‌کنند.",
        "فلزهای دستۀ d به هنگام تشکیل کاتیون الکترون‌های بیرونی‌ترین زیرلایهٔ خود را از دست می‌دهند."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. اسکاندیم با تشکیل یون Sc3+ به آرایش گاز نجیب آرگون می‌رسد."
    },
    {
      id: 32,
      text: "کدام‌یک از عبارت‌های زیر پیرامون نخستین فلز واسطه در جدول دوره‌ای درست است؟\nالف) در وسایل خانه مانند تلویزیون رنگی و برخی شیشه‌ها وجود دارد.\nب) با تشکیل یون یک بار مثبت به پایداری می‌رسد.\nپ) در زیرلایهٔ ۲ = l خود یک الکترون دارد.\nت) شمارهٔ بیرونی‌ترین لایهٔ آن برابر ۳ است.",
      options: ["الف - پ", "ب - ت", "ب - الف", "پ - ت"],
      correctIndex: 0,
      answer: "موارد الف و پ درست هستند. اسکاندیم در تلویزیون رنگی استفاده می‌شود و در زیرلایه 3d خود یک الکترون دارد."
    },
    {
      id: 33,
      text: "آرایش الکترونی 18Ar]3d4 4s2] مربوط به یک ............ است و در یک لایهٔ ظرفیت آن ............ الکترون وجود دارد و در آرایش آن تعداد ............ الکترون در ۲ = l آن وجود دارد.",
      options: [
        "کاتیون واسطه - ۲ - ۸",
        "عنصر واسطه - ۲ - ۸",
        "کاتیون واسطه - ۴ - ۸",
        "عنصر واسطه - ۴ - ۸"
      ],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. عنصر واسطه تیتانیوم با ۲ الکترون در لایه ظرفیت و ۸ الکترون در زیرلایه d."
    },
    {
      id: 34,
      text: "پاسخ صحیح سوالات زیر، در کدام گزینه به درستی آمده است؟ (گزینه‌ها را از راست به چپ بخوانید)\n- نخستین فلز واسطه با نماد شیمیایی تک‌حرفی در کدام گروه قرار دارد؟\n- دومین گاز نجیب واکنش‌ناپذیر در کدام دوره قرار دارد؟\n- دومین عنصر اصلی در کدام دوره قرار دارد؟",
      options: ["۱، ۳، ۴", "۱، ۳، ۴", "۱، ۲، ۵", "۲، ۲، ۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. اسکاندیم (Sc) در گروه ۳، نئون در دوره ۲ و منیزیم در دوره ۳."
    },
    {
      id: 35,
      text: "کدام گزینه در رابطه با عنصری که در دورهٔ سوم و گروه چهاردهم جدول تناوبی قرار دارد، نادرست است؟",
      options: [
        "برخلاف عنصر A در واکنش با دیگر اتم‌ها الکترون به اشتراک می‌گذارد.",
        "هم‌گروه با عنصر B است.",
        "برخلاف عنصر C شکننده است.",
        "مانند عنصر D سطح درخشانی دارد."
      ],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. سیلیسیم شکننده است و در اثر ضربه خرد می‌شود."
    },
    {
      id: 36,
      text: "کدام گزینه نادرست است؟",
      options: [
        "در میان عنصرهای واسطه دورهٔ چهارم، دو عنصر وجود دارند که تعداد الکترون‌های دارای ۲ = l در اتم آن‌ها با اتم عنصر قبل از خود برابر است.",
        "پنجمین عنصر گروه چهاردهم همانند عنصری که ۱۴ الکترون دارای ۱ = l دارد در واکنش با دیگر عنصرها الکترون به اشتراک می‌گذارد.",
        "عنصری که مجموع (n + l) الکترون‌های لایهٔ ظرفیت آن برابر ۱۹ است همانند عنصرهای قبل و زیرین خود به صورت مولکول‌های دو اتمی گازی شکل هستند.",
        "عدد اتمی سه عنصری که تعداد الکترون‌های آخرین زیرلایهٔ آن‌ها از تعداد الکترون‌های آخرین زیرلایه هر دو عنصر قبل و بعد از آن‌ها کمتر است ۱۳، ۲۴ و ۳۷ هستند."
      ],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است."
    },
    {
      id: 37,
      text: "اگر آرایش الکترونی X2+ به 3d5 ختم شود، چند عبارت دربارهٔ آن نادرست است؟\n- عنصر X فلزی واسطه از دورهٔ ۴ و گروه ۸ جدول تناوبی است.\n- اتم X در واکنش با اکسیژن می‌تواند اکسیدهای XO و X2O3 را تشکیل دهد.\n- در آرایش الکترونی اتم خنثی، الکترون با ۵ = n + l وجود دارد.\n- تعداد الکترون‌های با ۱ = l در این اتم از مجموع الکترون‌های با ۰ = l آن کمتر است.\n- اگر اتم X در هستهٔ خود دارای ۲۸ نوترون باشد، عدد جرمی آن برابر ۵۴ خواهد بود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۲ عبارت نادرست هستند."
    },
    {
      id: 38,
      text: "چنانچه اتم یک فلز واسطه دورهٔ چهارم ۱۰ الکترون با ۲ = l داشته باشد، چه تعداد از عبارت‌های زیر می‌تواند در مورد این اتم نادرست باشد؟\n(الف) عدد اتمی اتم موردنظر یک عدد زوج است.\nب) این اتم تنها یون دو بار مثبت تشکیل می‌دهد.\nپ) این اتم به گروه یازدهم جدول تناوبی تعلق دارد.\nت) یون این عنصر می‌تواند ترکیب A2O را تشکیل دهد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. ۱ عبارت نادرست است."
    },
    {
      id: 39,
      text: "ترکیب یونی دوتایی حاصل از دو عنصر X و Y را در نظر بگیرید که فرمول شیمیایی آن شامل سه یون است. اگر آرایش الکترونی یکی از این یون‌ها به نئون و دیگری به آرگون رسیده باشد، چه تعداد از نتیجه‌گیری‌های زیر همواره درست است؟\n(الف) عنصرهای سازنده این ترکیب یونی در دو دوره متوالی جدول دوره‌ای قرار دارند.\nب) ترکیب یونی حاصل، براساس عناصر جدول تناوبی، دو ترکیب متفاوت می‌تواند باشد.\nپ) یکی از این دو عنصر در دما و فشار اتاق مولکول‌های دواتمی تشکیل می‌دهد.\nت) اختلاف عدد اتمی این دو عنصر برابر ۵ است.\nث) اتم هر یک از دو عنصر X و Y فاقد الکترون‌های با عدد کوانتومی ۲ است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. تنها عبارت ث همواره درست است."
    },
    {
      id: 40,
      text: "چند مورد از مطالب زیر درست هستند؟\nالف) رسانایی الکتریکی و گرمایی از ویژگی‌های فیزیکی مواد محسوب می‌شوند.\nب) هرچه اتمی راحت‌تر الکترون از دست بدهد، خصلت فلزی بیشتری دارد و فعالیت شیمیایی آن بیشتر است.\nپ) کشف عنصرهای طبیعی به پایان رسیده است و عنصرهای جدید همه به‌صورت ساختگی هستند.\nت) اتم را مانند کره‌ای در نظر می‌گیرند که الکترون‌ها پیرامون آن در یک الیۀ الکترونی در حرکت‌اند.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. تنها مورد الف درست است."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون ۴ - دنیای رنگی با عناصر دسته d</h1>
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

export default Shimi2Lesson4Exam4;