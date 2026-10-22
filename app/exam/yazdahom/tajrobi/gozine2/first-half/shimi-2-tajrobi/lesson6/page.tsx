"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2Lesson7Exam1 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  const questions = [
    {
      id: 1,
      text: "در دو لولۀ آزمایش زیر که شامل محلول حاوی یون‌های Fe²⁺ و Fe³⁺ هستند، قطره‌قطره محلول سدیم هیدروکسید می‌افزاییم. در لولۀ ۱ و ۲ به ترتیب رسوب‌های ...... و ...... رنگی تشکیل می‌شود.",
      options: [
        "سبز ژلاتینی - قرمز قهوه‌ای",
        "قرمز قهوه‌ای - سبز ژلاتینی",
        "سفید - سبز ژلاتینی",
        "سفید - قرمز قهوه‌ای"
      ],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. Fe²⁺ رسوب سبز ژلاتینی و Fe³⁺ رسوب قرمز قهوه‌ای می‌دهد."
    },
    {
      id: 2,
      text: "کدام گزینه زیر نادرست است؟\n۱) برای شناسایی کاتیون یک فلز موجود در محلول، باید آنیونی به محلول اضافه شود تا با کاتیون موردنظر رسوب دهد.\n۲) از محلول پتاسیم هیدروکسید می‌توان برای شناسایی یون آهن استفاده کرد.\n۳) طی واکنش آهن (II) کلرید با سدیم هیدروکسید، رسوبی قرمز متمایل به قهوه‌ای رنگ حاصل می‌شود.\n۴) برای شناسایی کاتیون موجود در زنگ آهن، باید زنگ آهن را در هیدروکلریک اسید حل کرد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 2,
      answer: "گزینه ۳ نادرست است. آهن (II) کلرید با سدیم هیدروکسید رسوب سبز ژلاتینی می‌دهد."
    },
    {
      id: 3,
      text: "دو واکنش زیر مربوط به شناسایی کاتیون موجود در اکسیدی از آهن است. کدام مطلب درست است؟ (Fe = ۵۶ ، O = ۱۶ : g.mol⁻¹)\nI) اکسید آهن + HCl(aq) → A(aq) + H₂O(l)\nII) A(aq) + NaOH(aq) → Fe(OH)₃(s) + NaCl(aq)",
      options: [
        "نسبت استوکیومتری کاتیون به آنیون در هر دو ترکیب A و اکسید آهن یکسان و برابر با ۳ است.",
        "حالت فیزیکی x و y به ترتیب aq و s است.",
        "نسبت مجموع ضرایب مواد در معادلۀ موازنه‌شدۀ (I) به واکنش (II) برابر ۱/۲ است.",
        "در هر گرم از این اکسید آهن، ۰/۷ گرم آهن وجود دارد."
      ],
      correctIndex: 3,
      answer: "گزینه ۴ درست است. در هر گرم Fe₂O₃ حدود ۰/۷ گرم آهن وجود دارد."
      
    },
    {
      id: 4,
      text: "کدام عبارت درست نیست؟\n۱) طلا همواره در گذر زمان جلای فلزی خود را حفظ می‌کند و همچنان خوش‌رنگ و درخشان باقی می‌ماند.\n۲) به برگه‌ها و رشته‌سیم‌های بسیار نازک از طلا، طلا می‌گویند.\n۳) مجموع ضرایب مواد در واکنش آهن (III) کلرید با سدیم هیدروکسید برابر ۶ است.\n۴) اگر به محلول حاصل از زنگ آهن و هیدروکلریک اسید قطره‌قطره سدیم هیدروکسید اضافه کنیم، رسوب قهوه‌ای‌رنگ تشکیل می‌شود.",
      correctIndex: 2,
      answer: "گزینه 3 نادرست است. Y قرمز قهوه‌ای رنگ است، نه سبز"
    },
    {
      id: 5,
      text: "برای تشخیص کاتیون موجود در زنگ آهن، واکنش‌های زیر را انجام می‌دهیم. کدام‌یک نادرست است؟ (Fe = ۵۶)\nI) زنگ آهن + هیدروکلریک اسید → X + آب\nII) X + سدیم هیدروکسید → Y + سدیم کلرید",
      options: [
        "Y سبزرنگ بوده و برخلاف X نامحلول در آب است.",
        "کاتیون موجود در زنگ آهن دارای ۵ الکترون با ۱ = l است.",
        "کاتیون موجود در هر دو ترکیب X و Y دارای الکترون‌های مساوی هستند.",
        "X = FeCl₃ است و مجموع ضرایب واکنش اول ۱۲ است."
      ],
      correctIndex: 0,
      answer: "گزینه 1 نادرست است. Y قرمز قهوه‌ای رنگ است، نه سبز."
    },
    {
      id: 6,
      text: "اگر میخ آهنی را به محلول مس (II) سولفات وارد کنیم، اتم‌های ...... جایگزین یون‌های ...... شده و نشان می‌دهد آهن از مس ...... است.",
      options: [
        "Cu ، Fe ، کم‌واکنش‌پذیرتر",
        "Fe ، Cu ، واکنش‌پذیرتر",
        "Cu ، Fe ، واکنش‌پذیرتر",
        "Fe ، Cu ، کم‌واکنش‌پذیرتر"
      ],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. آهن واکنش‌پذیرتر از مس است."
    },
    {
      id: 7,
      text: "دربارة واکنش 2Fe₂O₃(s) + 3C(s) → 4Fe(s) + 3CO₂(g) چند مورد از مطالب زیر نادرست هستند؟ (Fe = ۵۶ ، C = ۱۲ ، O = ۱۶ : g.mol⁻¹)\n- از این واکنش در فولاد مبارکه برای استخراج آهن استفاده می‌شود.\n- از واکنش ۱/۶ گرم آهن (III) اکسید با مقدار کافی کربن، ۰/۲ مول آهن تولید می‌شود.\n- به ازای تولید ۳۳/۶ لیتر گاز CO₂ در شرایط STP مقدار ۴۸۰ گرم آهن (III) اکسید استفاده می‌شود.\n- واکنش‌پذیری و فعالیت شیمیایی آهن از کربن بیشتر است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه 3 درست است. ۲ مورد نادرست هستند."
    },
    {
      id: 8,
      text: "چند مورد از عبارت‌های زیر درست هستند؟\nالف) برای شناسایی یون Fe²⁺ همانند یون Fe³⁺ می‌توان از محلول حاوی یون هیدروکسید استفاده کرد.\nب) آهن (II) هیدروکسید محلولی سبزرنگ است.\nپ) زنگ آهن حاوی یون Fe³⁺ است.\nت) زنگ آهن در هیدروکلریک اسید حل می‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. ۳ مورد درست (الف، پ و ت)."
    },
    {
      id: 9,
      text: "چند مورد از عبارت‌های زیر درست است؟\nالف) در تناوب سوم هیچ فلزی در طبیعت به‌صورت آزاد یافت نمی‌شود.\nب) برای شناسایی یون آهن (III) در یک محلول آبی می‌توان از سود سوزآور استفاده کرد.\nپ) واکنش هر یک از فلزات آلومینیم و روی با محلول مس (II) سولفات به‌طور خودبه‌خودی انجام می‌شود.\nت) برای استخراج هرکدام از فلزهای واسطه تناوب چهارم از سنگ معدن آن‌ها، می‌توان از فلز Mg استفاده کرد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "گزینه 4 درست است. ۳ مورد درست (الف، ب و پ)."
    },
    {
      id: 10,
      text: "با اضافه کردن محلول سدیم هیدروکسید به آهن (II) کلرید، رسوبی ...... رنگ تولید می‌گردد. ازطرفی اگر به مقداری زنگ آهن، محلول هیدروکلریک اسید افزوده شود، محلولی با فرمول شیمیایی ...... حاصل می‌گردد.",
      options: [
        "سبز - FeCl₃",
        "قرمز قهوه‌ای - FeCl₃",
        "سبز - FeCl₂",
        "قرمز قهوه‌ای - FeCl₂"
      ],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. Fe(OH)₂ سبز و FeCl₃ از زنگ آهن حاصل می‌شود."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون ۱ - شناسایی کاتیون‌های آهن</h1>
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

export default Shimi2Lesson7Exam1;