"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const RandomChargeDistributionQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال تصادفی از درس نهم ====================
  const questions = [
    // ---------- سوال ۱۱۴ ----------
    {
      id: 114,
      text: "چند مورد از عبارت‌های زیر نادرست است؟\nآ) خطوط میدان برآیند هرگز یکدیگر را قطع نمی‌کنند.\nب) اگر بار الکتریکی منفی در خلاف جهت خطوط میدان حرکت کند، انرژی پتانسیل الکتریکی ذره باردار افزایش می‌یابد.\nپ) اگر یک کره رسانای خنثی درون یک توری فلزی قرار گیرد، بار الکتریکی روی سطح خارجی آن القا می‌شود.\nت) اگر شمعی در نزدیکی کالهک یک مولد وان دو گراف قرار بگیرد، شعله شمع به‌سمت کالهک مولد منحرف می‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "عبارت (آ) درست است (خطوط میدان هرگز قطع نمی‌شوند). عبارت (ب) نادرست است (بار منفی در خلاف جهت میدان انرژی پتانسیلش کاهش می‌یابد). عبارت (پ) نادرست است (بار روی سطح خارجی توری القا می‌شود، نه کره داخل). عبارت (ت) درست است (شعله شمع توسط میدان الکتریکی منحرف می‌شود). پس ۲ مورد نادرست است. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۱۵ ----------
    {
      id: 115,
      text: "در شکل زیر، جسم رسانا بار الکتریکی منفی دارد. کدام عبارت‌های زیر درست است؟\nالف) اگر بار q₀ از D تا B جابه‌جا شود، انرژی پتانسیل الکتریکی‌اش زیاد می‌شود.\nب) کار نیروی الکتریکی بر بار q₀ در جابه‌جایی از D تا C برابر صفر است.\nپ) پتانسیل الکتریکی C بیشتر از پتانسیل الکتریکی D است.\nت) پتانسیل الکتریکی B برابر پتانسیل الکتریکی A است.",
      image: "/img/q115.png",
      imageAlt: "جسم رسانا با بار منفی و نقاط A, B, C, D",
      options: ["الف و ب", "ب و ت", "الف و ت", "ب و پ"],
      correctIndex: 1,
      answer: "چون جسم رسانا بار منفی دارد، پتانسیل اطراف آن منفی است. با دور شدن از رسانا پتانسیل افزایش می‌یابد. عبارت (الف) درست است چون با حرکت از D به B (دورتر شدن) پتانسیل افزایش یافته و برای بار مثبت q₀ انرژی پتانسیل زیاد می‌شود. عبارت (ب) نادرست است چون نقاط D و C هم‌پتانسیل نیستند. عبارت (پ) نادرست است چون C به رسانا نزدیک‌تر از D است. عبارت (ت) درست است چون تمام نقاط سطح رسانا هم‌پتانسیل هستند. گزینه 2 صحیح است."
    },

    // ---------- سوال ۱۱۶ ----------
    {
      id: 116,
      text: "چه تعداد از عبارت‌های زیر نادرست است؟\nآ) هنگام‌که یک جسم رسانای خنثی داخل میدان الکتریکی خارجی قرار گیرد، درون رسانا میدان الکتریکی ایجاد می‌شود.\nب) میدان الکتریکی خارجی باعث جدا شدن بارهای مثبت و منفی سطح جسم رسانایی که درون آن قرار دارد می‌شود.\nپ) در یک رسانای دوکی شکل، بار الکتریکی روی سطح خارجی آن به‌طور یکنواخت توزیع می‌شود.\nت) پتانسیل الکتریکی روی سطح رسانا در نقاط نوک‌تیز شدیدتر است.",
      options: ["یک", "سه", "چهار", "دو"],
      correctIndex: 1,
      answer: "عبارت (آ) نادرست است (میدان الکتریکی درون رسانا در حالت تعادل صفر است). عبارت (ب) نادرست است (بارهای مثبت و منفی درون رسانا جابه‌جا می‌شوند نه سطح آن). عبارت (پ) نادرست است (توزیع بار در رسانای دوکی یکنواخت نیست و در نوک‌تیزها بیشتر است). عبارت (ت) نادرست است (پتانسیل در تمام نقاط رسانا یکسان است). در واقع هر چهار عبارت نادرست‌اند. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۱۷ ----------
    {
      id: 117,
      text: "کدام گزاره زیر درباره یک رسانای باردار نادرست است؟",
      options: [
        "بار در سطح خارجی پخش می‌شود.",
        "میدان الکتریکی درون رسانا صفر است.",
        "پتانسیل در نقاط نوک‌تیز بیشتر است.",
        "تمام نقاط رسانا هم‌پتانسیل هستند."
      ],
      correctIndex: 2,
      answer: "در یک رسانای باردار، تمام نقاط (از جمله نوک‌تیزها) هم‌پتانسیل هستند. پتانسیل در نوک‌تیز بیشتر نیست، بلکه چگالی بار سطحی در نوک‌تیز بیشتر است. گزینه ۳ نادرست است."
    },

    // ---------- سوال ۱۱۸ ----------
    {
      id: 118,
      text: "شکل (الف) جدول سری تریوالکتریک چهار جسم نارسانا A, B, C, D را نشان می‌دهد. اگر جسم C را با جسم B مالش داده و مطابق شکل (ب) به ۳ کره فلزی که به هم چسبیده و خنثی هستند نزدیک کنیم، بار نقاط (۱) و (۲) و (۳) به ترتیب از راست به چپ کدام است؟",
      image: "/img/q118.png",
      imageAlt: "سری تریوالکتریک و سه کره فلزی",
      options: [
        "مثبت، منفی، مثبت",
        "خنثی، خنثی، منفی",
        "مثبت، خنثی، منفی",
        "خنثی، خنثی، مثبت"
      ],
      correctIndex: 1,
      answer: "جسم C در سری تریوالکتریک بالاتر از B است (نزدیک‌تر به انتهای مثبت). پس با مالش، C مثبت و B منفی می‌شود. میله C بار مثبت دارد و به کره (۱) نزدیک می‌شود، بار منفی روی (۱) القا شده و بار مثبت به کره (۳) رانده می‌شود. چون کره‌ها به هم چسبیده‌اند، بار منفی روی نزدیک‌ترین کره (۱) و بار مثبت روی دورترین کره (۳) قرار می‌گیرد. اما کره (۱) به میله C نزدیک است و بار منفی دارد، کره (۲) خنثی و کره (۳) مثبت. با توجه به گزینه‌ها و شکل: نقاط (۱)، (۲)، (۳) به ترتیب خنثی، خنثی، منفی. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۲۰ ----------
    {
      id: 120,
      text: "کره رسانا و توپر A دارای بار ۶ µC داخل کره رسانا و توخالی B که بدون بار است قرار داده و درب آن را می‌بندیم. اگر شعاع کره A نصف شعاع کره B باشد، بار روی کره‌های A و B به ترتیب چند میکروکولن خواهد بود؟",
      image: "/img/q120.png",
      imageAlt: "کره رسانای A داخل کره توخالی B",
      options: [
        "q_B = +۶ , q_A = ۰",
        "q_B = +۳ , q_A = +۳",
        "q_B = +۴ , q_A = +۲",
        "q_B = ۰ , q_A = +۳"
      ],
      correctIndex: 0,
      answer: "وقتی کره رسانای باردار A داخل کره رسانای خنثی B قرار می‌گیرد و تماس برقرار می‌شود، بار کل روی سطح خارجی کره B توزیع می‌شود (چون بار اضافی همیشه روی سطح خارجی رسانا قرار می‌گیرد). بنابراین تمام بار ۶ µC روی سطح خارجی B می‌رود و بار A صفر می‌شود. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۱۲۲ ----------
    {
      id: 122,
      text: "در شکل زیر گلوله فلزی با بار +Q را درون استوانه خنثی که روی پایه عایق قرار دارد، می‌بریم و با آن تماس می‌دهیم. بار ایجاد شده درون و بیرون استوانه به ترتیب کدام‌اند؟",
      image: "/img/q122.png",
      imageAlt: "گلوله فلزی با بار +Q داخل استوانه خنثی",
      options: [
        "صفر، +Q",
        "+Q، -Q",
        "+Q، +Q",
        "صفر، -Q"
      ],
      correctIndex: 0,
      answer: "با تماس گلوله باردار با استوانه رسانا، بار کل روی سطح خارجی استوانه توزیع می‌شود (بار اضافی همیشه به سطح خارجی رسانا می‌رود). بنابراین بار درون استوانه صفر و بار بیرون آن +Q خواهد بود. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۱۲۳ ----------
    {
      id: 123,
      text: "در شکل زیر، سه پوسته کروی توخالی و رسانای A، B، C به ترتیب دارای بارهای الکتریکی q_A = +۱۰ µC، q_B = -۶ µC، q_C = +۴ µC هستند. با بستن کلیدهای k₁ و k₂ بار هر پوسته چقدر می‌شود؟",
      image: "/img/q123.png",
      imageAlt: "سه پوسته کروی هم‌مرکز با کلیدها",
      options: [
        "q_A = ۰ , q_B = -۲ µC , q_C = +۱۰ µC",
        "q_A = +۳ µC , q_B = +۳ µC , q_C = +۳ µC",
        "q_A = ۰ , q_B = ۰ , q_C = +۸ µC",
        "q_A = +۴ µC , q_B = ۰ , q_C = +۴ µC"
      ],
      correctIndex: 2,
      answer: "با بستن کلیدها، هر سه پوسته به یک جسم رسانا تبدیل می‌شوند و بار کل روی سطح خارجی (کره C) توزیع می‌شود. بار کل: q_total = 10 + (-6) + 4 = +8 µC. بنابراین q_A = q_B = 0 و q_C = +8 µC. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۱۲۶ ----------
    {
      id: 126,
      text: "زنبورهای عسل، معمولاً حین پرواز دارای بار مثبت می‌شوند، در این حال وقتی زنبور به گرده بدون بار روی بساک یک گل می‌رسد، ......",
      options: [
        "چون گرده ازنظر الکتریکی خنثی است، میدان الکتریکی زنبور به آن نیرویی وارد نمی‌کند.",
        "میدان الکتریکی زنبور روی گرده بارهای مثبت و منفی القا می‌کند و گرده جذب زنبور می‌شود.",
        "میدان الکتریکی زنبور روی گرده بارهای مثبت و منفی القا می‌کند و گرده از زنبور دفع می‌شود.",
        "نیروی گرانشی‌ای که زنبور به گرده وارد می‌کند، سبب جذب گرده به‌طرف زنبور می‌شود."
      ],
      correctIndex: 1,
      answer: "زنبور بار مثبت دارد. میدان الکتریکی زنبور روی گرده بدون بار، بارهای القایی ایجاد می‌کند: بار منفی نزدیک به زنبور و بار مثبت دورتر. چون بارهای منفی نزدیک‌ترند، نیروی جاذبه غالب شده و گرده جذب زنبور می‌شود. گزینه 2 صحیح است."
    },

    // ---------- سوال ۱۲۸ ----------
    {
      id: 128,
      text: "یک رسانای منزوی را در یک میدان الکتریکی خارجی قرار می‌دهیم. در حالت تعادل الکترواستاتیکی، ......",
      options: [
        "میدان درروی سطح رسانا باید مؤلفه‌ای مماس بر سطح داشته باشد.",
        "میدان درروی سطح رسانا برابر صفر است.",
        "الکترون‌های آزاد طوری روی سطح خارجی توزیع می‌شوند که اثر میدان خارجی را درون رسانا خنثی کنند.",
        "گزینه‌های ۱ و ۲"
      ],
      correctIndex: 2,
      answer: "در حالت تعادل الکترواستاتیکی، الکترون‌های آزاد رسانا طوری روی سطح خارجی توزیع می‌شوند که میدان الکتریکی خارجی را درون رسانا خنثی کنند (میدان درون رسانا صفر می‌شود). میدان روی سطح رسانا عمود بر سطح است، نه مماس. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۱۳۱ ----------
    {
      id: 131,
      text: "مطابق شکل، کره عایقی را که دارای بار مثبت است به کره رسانایی که از سقف آویزان است نزدیک می‌کنیم. کدام جمله زیر درست‌تر است؟",
      image: "/img/q131.png",
      imageAlt: "کره عایق باردار مثبت و کره رسانا آویزان",
      options: [
        "دو کره یکدیگر را جذب می‌کنند.",
        "دو کره یکدیگر را دفع می‌کنند.",
        "ابتدا یکدیگر را جذب می‌کنند؛ اما ممکن است بعد یکدیگر را دفع نمایند.",
        "ابتدا یکدیگر را دفع می‌کنند؛ اما ممکن است بعد یکدیگر را جذب نمایند."
      ],
      correctIndex: 2,
      answer: "کره عایق بار مثبت دارد و کره رسانا خنثی است. با نزدیک کردن کره باردار، بار منفی روی سطح نزدیک کره رسانا القا می‌شود و بار مثبت به سطح دورتر می‌رود. چون بارهای منفی القایی نزدیک‌ترند، نیروی جاذبه غالب شده و دو کره یکدیگر را جذب می‌کنند. گزینه 3 صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  // ========== محاسبه درصد ==========
  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) correctCount++;
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setIsScoreCalculated(true);
  }, [selectedAnswers, questions]);

  // ========== انتخاب گزینه ==========
  const handleOptionClick = (questionId, optionIndex) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== تایمر ==========
  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } };
  }, [isTimeUp, isScoreCalculated]);

  // ========== پایان زمان ==========
  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => calculateScore(), 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !isScoreCalculated && !isTimeUp;
  const answeredCount = Object.keys(selectedAnswers).length;

  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745';
    if (score >= 50) return '#ffc107';
    return '#dc3545';
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleImageError = (qId) => {
    setImageErrors(prev => ({ ...prev, [qId]: true }));
  };

  return (
    <div style={{
      fontFamily: 'Tahoma, Arial, sans-serif',
      width: '100vw', minHeight: '100vh',
      padding: '15px 10px', backgroundColor: '#f8f9fa',
      direction: 'rtl', textAlign: 'right',
      boxSizing: 'border-box', overflowX: 'hidden'
    }}>

      {/* ==================== هدر ==================== */}
      <div style={{
        backgroundColor: '#4a148c', color: 'white',
        padding: '20px', borderRadius: '8px',
        marginBottom: '30px', textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >
          ← بازگشت
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>
              ⚡ آزمون ۱۰ سوال تصادفی - توزیع بار الکتریکی در اجسام رسانا
            </h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px', borderRadius: '50px',
            fontSize: '24px', fontWeight: 'bold',
            fontFamily: 'monospace', display: 'flex',
            alignItems: 'center', gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* ==================== سوالات ==================== */}
      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px', backgroundColor: '#ffffff',
            padding: '20px 25px', borderRadius: '8px',
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{
              fontSize: '17px', lineHeight: '1.9',
              marginBottom: '20px', fontWeight: '500',
              display: 'flex', alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
            }}>
              <span style={{
                display: 'inline-block', backgroundColor: '#4a148c',
                color: 'white', width: '30px', height: '30px',
                textAlign: 'center', lineHeight: '30px',
                borderRadius: '50%', fontSize: '14px',
                marginLeft: '15px', flexShrink: 0, marginTop: '2px'
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>

            {q.image && (
              <div style={{
                display: 'flex', justifyContent: 'center',
                margin: '20px 0', padding: '15px',
                backgroundColor: '#fafafa', borderRadius: '8px',
                border: '1px dashed #ced4da',
                minHeight: '180px', alignItems: 'center'
              }}>
                {imageErrors[q.id] ? (
                  <div style={{ textAlign: 'center', color: '#6c757d', fontSize: '14px', padding: '30px' }}>
                    <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                    <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                    <p style={{ margin: '5px 0 0 0', direction: 'ltr', fontFamily: 'monospace', fontSize: '12px', color: '#adb5bd' }}>{q.image}</p>
                  </div>
                ) : (
                  <img
                    src={q.image} alt={q.imageAlt}
                    onError={() => handleImageError(q.id)}
                    style={{
                      maxWidth: '100%', maxHeight: '350px',
                      height: 'auto', objectFit: 'contain',
                      borderRadius: '6px'
                    }}
                  />
                )}
              </div>
            )}

            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '12px 30px', marginRight: '20px'
            }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                const isDisabled = isTimeUp || isScoreCalculated;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={isDisabled}
                    style={{
                      display: 'flex', alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #4a148c' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#f3e5f5' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px', textAlign: 'right',
                      transition: 'all 0.2s', width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1
                    }}
                  >
                    <span style={{
                      display: 'inline-block', width: '28px', height: '28px',
                      border: '1px solid #000', borderRadius: '50%',
                      textAlign: 'center', lineHeight: '28px',
                      fontSize: '14px', marginLeft: '15px',
                      backgroundColor: isSelected ? '#4a148c' : '#fff',
                      color: isSelected ? '#fff' : '#000', flexShrink: 0
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* ==================== دکمه محاسبه ==================== */}
        <div style={{
          marginTop: '30px', marginBottom: '30px',
          padding: '20px', backgroundColor: '#ffffff',
          borderRadius: '12px', border: '1px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => { if (canCalculate) calculateScore(); }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px', fontSize: '18px',
                  backgroundColor: canCalculate ? '#4a148c' : '#6c757d',
                  color: '#fff', border: 'none', borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6
                }}
              >
                {!isAllAnswered && !isTimeUp
                  ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید`
                  : '📊 محاسبه درصد'}
              </button>
              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                  {questions.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#4a148c' }}>
                ✅ درصد شما:{' '}
                <span style={{ color: getScoreColor(score), fontSize: '28px' }}>
                  {Math.round(score)}%
                </span>
                {isTimeUp && (
                  <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>
                    (زمان پایان یافت)
                  </span>
                )}
              </div>
              <div style={{
                width: '80%', maxWidth: '400px', height: '20px',
                backgroundColor: '#e9ecef', borderRadius: '10px',
                overflow: 'hidden', margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`, height: '100%',
                  backgroundColor: getScoreColor(score),
                  transition: 'width 0.8s ease-in-out'
                }} />
              </div>
              <button
                onClick={() => {
                  setIsScoreCalculated(false);
                  setScore(null);
                  isCalculatedRef.current = false;
                  isTimeUpRef.current = false;
                }}
                style={{
                  padding: '10px 25px', fontSize: '14px',
                  backgroundColor: '#ff9800', color: '#fff',
                  border: 'none', borderRadius: '50px',
                  cursor: 'pointer', fontWeight: 'bold', marginTop: '10px'
                }}
              >
                🔄 تغییر پاسخ‌ها
              </button>
            </div>
          )}
        </div>

        {/* ==================== دکمه پاسخنامه ==================== */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px', fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff', border: 'none', borderRadius: '50px',
              cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
          >
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {/* ==================== پاسخنامه ==================== */}
        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px', borderTop: '4px solid #4a148c',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #4a148c',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#4a148c'
            }}>
              📝 پاسخنامه تشریحی توزیع بار الکتریکی در اجسام رسانا
            </h2>

            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              return (
                <div key={q.id} style={{
                  marginBottom: '35px',
                  borderBottom: '1px dashed #ced4da',
                  paddingBottom: '25px'
                }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{
                      fontWeight: 'bold', color: '#4a148c',
                      backgroundColor: '#f3e5f5', padding: '5px 15px',
                      borderRadius: '20px', display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      سوال {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح: </span>
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{
                          fontWeight: 'bold',
                          color: isCorrect ? '#28a745' : '#dc3545'
                        }}>
                          {isCorrect ? '✔️ صحیح' : '❌ نادرست'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#4a148c' }}>📖 توضیح: </span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>
                      {q.answer}
                    </span>
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

export default RandomChargeDistributionQuiz;