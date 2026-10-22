"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const MagnetismAndPolesQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال پیوسته از مغناطیس و قطب‌های مغناطیسی ====================
  const questions = [
    // ---------- سوال ۱ ----------
    {
      id: 1,
      text: "مطابق شکل یک آهن‌ربای میله‌ای به چهار قطعه شکسته شده است. قسمت‌های C و A به ترتیب از راست به چپ دارای کدام خاصیت مغناطیسی هستند؟",
      image: "/img/magnetism_q1.png",
      options: ["N . خنثی", "S . خنثی", "N . N", "N . S"],
      correctIndex: 2,
      answer: "در طبیعت تک‌قطبی مغناطیسی وجود ندارد. هر قطعه یک آهنربای کامل با قطب‌های N و S است که قطب‌های ناهمنام کنار هم قرار می‌گیرند. بنابراین A (راست‌ترین قطعه) در سمت راست خود قطب N دارد و C (قطعه دوم از راست) نیز در سمت راست خود قطب N دارد. گزینه ۳ صحیح است."
    },
    // ---------- سوال ۲ ----------
    {
      id: 2,
      text: "دو قطعه A و B را مطابق شکل به هم نزدیک می‌کنیم. در شکل (الف)، A و B همدیگر را جذب می‌کنند و در شکل (ب)، A و B یکدیگر را تقریباً جذب نمی‌کنند. کدام گزینه درست است؟",
      image: "/img/magnetism_q2.png",
      options: ["آهن و A آهنربا است. B", "آهن و A آهن است. B", "آهنربا و A آهنربا است. B", "آهنربا و A آهن است. B"],
      correctIndex: 3,
      answer: "در شکل (الف) جذب رخ می‌دهد که می‌تواند ناشی از آهنربا-آهن یا آهنربا-آهنربا باشد. در شکل (ب) جذب رخ نمی‌دهد، یعنی هیچ‌کدام آهنربا نیستند یا هر دو آهن هستند. چون در (الف) جذب داشته‌اند، A آهنربا و B آهن است. گزینه 4 صحیح است."
    },
    // ---------- سوال ۳ ----------
    {
      id: 3,
      text: "چهار میلهٔ مشابه a و b و c ازلحاظ الکتریکی خنثی هستند. مطابق شکل در آزمایش‌های (1) و (2) میله‌های a و c را در جهت‌های نشان داده‌شده به‌آرامی روی میله‌های b و d حرکت می‌دهیم. در آزمایش (1) اندازه نیروی جاذبه ابتدا کاهش و سپس افزایش می‌یابد و در آزمایش (2) نیرو تغییر محسوسی نمی‌کند. کدام گزینه درست است؟",
      image: "/img/magnetism_q3.png",
      options: ["آهن است. a آهنربا و", "آهنربا است. c آهن و", "میله‌های b و c آهنربا هستند.", "میله‌های a و d آهنربا هستند."],
      correctIndex: 2,
      answer: "در آزمایش (۱) با حرکت میله a روی b نیرو تغییر می‌کند، پس b آهنربا است و a آهن است (چون اگر a هم آهنربا بود، نوع نیرو تغییر می‌کرد). در آزمایش (۲) نیرو تغییر نمی‌کند، پس d آهن است و c آهنربا است. گزینه 3 صحیح است."
    },
    // ---------- سوال ۴ ----------
    {
      id: 4,
      text: "مطابق شکل زیر اگر یک آهنربای میله ای به چهار قسمت شکسته شود، قسمت های C ، B ، A به ترتیب از راست به چپ کدام اند؟",
      image: "/img/magnetism_q4.png",
      options: ["S ، خنثی، خنثی", "S ، S ، خنثی", "N ، S ، S", "S ، N ، N"],
      correctIndex: 2,
      answer: "با شکستن آهنربا، هر قطعه یک آهنربای مجزا با دو قطب N و S می‌شود. با توجه به شکل، A سمت راستش N است، B سمت راستش N است و C سمت راستش S است. بنابراین از راست به چپ به ترتیب C, B, A دارای قطب‌های S, N, N هستند. گزینه 3 صحیح است."
    },
    // ---------- سوال ۵ ----------
    {
      id: 5,
      text: "آهنربای میله ای شکل زیر را از محل های نشان داده شده برش می دهیم. قطب a نشان دهنده کدام قطب آهنرباست و نیروی مغناطیسی انتهای میخ ها از چه نوعی است؟",
      image: "/img/magnetism_q5.png",
      options: ["S - رانشی", "S - ریاضی", "N - رانشی", "N - ریاضی"],
      correctIndex: 1,
      answer: "پس از برش، در محل a (که مجاور قطب N اولیه بوده) قطب S ایجاد می‌شود. انتهای نزدیک میخ‌ها به آهنربا قطب مخالف پیدا می‌کنند و انتهای دورتر (که به هم نزدیک هستند) قطب‌های هم‌نام پیدا کرده و یکدیگر را می‌رانند. گزینه 2 صحیح است."
    },
    // ---------- سوال ۶ ----------
    {
      id: 6,
      text: "مطابق شکل زیر اگر قطب S آهنربا را چندین بار و در جهت نشان داده شده بر روی یک سوزن بکشیم، سوزن خاصیت مغناطیسی پیدا می کند. قطب های N و S بر روی سوزن چگونه خواهد بود؟",
      image: "/img/magnetism_q6.png",
      options: ["N", "S", "S", "N", "N S", "S N"],
      correctIndex: 3,
      answer: "هنگام مالش، نوک سوزن (که آخرین بار توسط قطب S مالیده می‌شود) قطب S و انتهای دیگر قطب N می‌شود. در تصویر، نوک سوزن در سمت راست است و آخرین تماس در سمت راست رخ داده است. گزینه ۴ صحیح است."
    },
    // ---------- سوال ۷ ----------
    {
      id: 7,
      text: "مطابق شکل زیر، سه میخ آهنی در اثر القای خاصیت مغناطیسی در آن ها، جذب آهنربا شده اند. قطب های القاشده در سرهای A و B به ترتیب کدام اند؟",
      image: "/img/magnetism_q7.png",
      options: ["N - N", "S - S", "S - N", "N - S"],
      correctIndex: 1,
      answer: "در سرهای نزدیک به آهنربای اصلی، قطب‌های مخالف القا می‌شود. سمت راست آهنربا S است، پس نوک میخ سمت راست (A) قطب S می‌شود. سمت چپ آهنربا N است، پس نوک میخ سمت چپ (B) قطب N می‌شود. پس A قطب S و B قطب N است. گزینه 2 (S - N) صحیح است. (توجه: در صورت سوال ترتیب A و B خواسته شده است)"
    },
    // ---------- سوال ۸ ----------
    {
      id: 8,
      text: "یک قطعه آهن و یک آهنربا از نظر ظاهر کامالً مشابه هستند. تنها با مالحظۀ نیروی این دو بر یکدیگر کدام گزینه دربارۀ تشخیص آهن از آهنربا صحیح است؟",
      options: ["آهنربا مشخص می شود ولی قطب های آن قابل تشخیص نیستند", "آهنربا و قطب هایش مشخص می شوند.", "نه آهنربا و نه قطب های آن مشخص نمی شوند.", "اظهارنظر قطعی میسر نیست."],
      correctIndex: 0,
      answer: "با نزدیک کردن قطب آهنربا به میله آهنی، نیروی جاذبه در تمام نقاط میله (ابتدا، انتها و وسط) یکسان است. اما اگر آهنربا را به آهنربای دیگر نزدیک کنیم، نیرو در قطب‌ها بیشتر از وسط است. با این روش می‌توان آهنربا را از آهن تشخیص داد، اما قطب‌های آن را نمی‌توان تشخیص داد. گزینه ۱ صحیح است."
    },
    // ---------- سوال ۹ ----------
    {
      id: 9,
      text: "کدام یک از گزینه های زیر نادرست است؟",
      options: [
        "در آهنربا دو ناحیه وجود دارد که خاصیت مغناطیسی در آن ها بیشتر از قسمت های دیگر است.",
        "مادۀ کانی مگنتیت Fe2O3 است که ویژگی آهنربایی دارد.",
        "در طبیعت تک-قطبی مغناطیسی وجود ندارد.",
        "اگر یک آهنربا را توسط نخی آویزان کنیم، همیشه در راستای تقریبی شمال - جنوب جغرافیایی قرار می‌گیرد."
      ],
      correctIndex: 1,
      answer: "ماده کانی مگنتیت در واقع Fe3O4 است، نه Fe2O3. سایر گزینه‌ها صحیح هستند. گزینه ۲ نادرست است."
    },
    // ---------- سوال ۱۰ ----------
    {
      id: 10,
      text: "در کدام شکل زیر، نحوة قرار گرفتن سوزن‌های آویزان از آهنربا نادرست نشان داده شده است؟",
      image: "/img/magnetism_q10.png",
      options: ["شکل ۱", "شکل ۲", "شکل ۳", "شکل ۴"],
      correctIndex: 2,
      answer: "در اثر خاصیت القای مغناطیسی، سوزن‌ها با قطب مخالف جذب آهنربا می‌گردند و طرف دیگر سوزن‌ها هم‌نام با قطبی می‌شود که به آن چسبیده‌اند. در شکل ۴، سوزن‌ها در سمت راست دفع شده‌اند که نادرست است، زیرا باید جذب شوند. گزینه 3 صحیح است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // ۱۵ دقیقه
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
        backgroundColor: '#1565C0', color: 'white',
        padding: '20px', borderRadius: '8px',
        marginBottom: '30px', textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/second-half/fizik-2-tajrobi/')}
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
              🧲 آزمون ۱۰ سوال پیوسته - مغناطیس و قطب‌ها
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
                display: 'inline-block', backgroundColor: '#1565C0',
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
                    src={q.image} alt={`شکل سوال ${index + 1}`}
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
                      border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e3f2fd' : '#fff',
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
                      backgroundColor: isSelected ? '#1565C0' : '#fff',
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
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>
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
            marginTop: '30px', borderTop: '4px solid #1565C0',
            paddingTop: '40px', backgroundColor: '#ffffff',
            padding: '40px', borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)', width: '100%'
          }}>
            <h2 style={{
              textAlign: 'center', borderBottom: '3px solid #1565C0',
              paddingBottom: '20px', marginBottom: '40px',
              fontSize: '26px', color: '#1565C0'
            }}>
              📝 پاسخنامه تشریحی مغناطیس و قطب‌ها
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
                      fontWeight: 'bold', color: '#1565C0',
                      backgroundColor: '#e3f2fd', padding: '5px 15px',
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
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح: </span>
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

export default MagnetismAndPolesQuiz;