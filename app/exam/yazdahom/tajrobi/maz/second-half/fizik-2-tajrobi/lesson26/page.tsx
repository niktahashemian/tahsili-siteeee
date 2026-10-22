"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const LenzLawQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال غیرپیوسته از درس بیست و سه: قانون لنز ====================
  // از سوال ۸۲ تا ۱۱۱ (انتخاب شده: 82, 86, 87, 89, 96, 97, 98, 103, 110, 111)
  const questions = [
    // ---------- سوال ۸۲ ----------
    {
      id: 82,
      text: "یک قاب مستطیل شکل با مقاومت ۳ Ω را با تندی ثابت 6 m/s مطابق شکل وارد میدان مغناطیسی یکنواخت درون‌سویی به بزرگی 0/5 T می‌کنیم. هنگام ورود قاب به میدان، اندازه جریان القایی ایجادشده در قاب چند آمپر و جهت آن کدام است؟",
      image: "/img/lenz_q82.png",
      options: [
        "۱- پادساعتگرد - ۰/۲",
        "۲- ساعتگرد - ۰/۲",
        "۳- پادساعتگرد - ۰/۳",
        "۴- ساعتگرد - ۰/۳"
      ],
      correctIndex: 0,
      answer: "ابتدا از رابطه ε = BLv نیرو محرکه القایی را به دست می‌آوریم: ε = 0/5 × 0/2 × 6 = 0/6 V. جریان القایی: I = ε/R = 0/6/3 = 0/2 A. با ورود قاب به میدان شار مغناطیسی عبوری از آن افزایش می‌یابد، پس نیرومحرکه برای مخالفت با افزایش شار، جریان القایی پادساعتگردی را ایجاد می‌کند تا میدان مغناطیسی ناشی از آن (B′) با افزایش شار مخالفت کند. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۸۶ ----------
    {
      id: 86,
      text: "در مدار زیر با بستن کلید K، جریان القاشده در قاب به صورت ...... و در حلقه به صورت ...... خواهد بود.",
      image: "/img/lenz_q86.png",
      options: [
        "۱) پادساعتگرد - پادساعتگرد",
        "۲) پادساعتگرد - ساعتگرد",
        "۳) ساعتگرد - ساعتگرد",
        "۴) ساعتگرد - پادساعتگرد"
      ],
      correctIndex: 1,
      answer: "با بستن کلید، تمام جریان مدار از شاخه پایینی می‌گذرد و درنتیجه شاخه بالایی اتصال کوتاه شده و جریان آن کاهش می‌یابد. طبق قانون لنز چون شار گذرنده از قاب در حال کاهش است، پس باید در آن جریانی پادساعتگرد القا شود تا با کاهش شار مخالفت کند و نیز چون شار گذرنده از حلقه در حال افزایش است، پس باید در آن جریانی ساعتگرد القا گردد تا با افزایش شار در حلقه مخالفت کند. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۸۷ ----------
    {
      id: 87,
      text: "دو سیمولۀ A و B مقابل یکدیگر قرار دارند. با تغییر مقاومت رئوستا جریانی در مدار سیمولۀ B القا می‌شود. باتوجه به شکل می‌توان نتیجه گرفت که مقاومت رئوستا در حال ...... است و دو سیموله نیروی ...... به یکدیگر وارد می‌کنند.",
      image: "/img/lenz_q87.png",
      options: [
        "۱) کاهش - جاذبه",
        "۲) کاهش - دافعه",
        "۳) افزایش - دافعه",
        "۴) افزایش - جاذبه"
      ],
      correctIndex: 3,
      answer: "جریان در سیمولۀ A از قطب مثبت است و جهت جریان در سیمولۀ B هم‌جهت با سیمولۀ A است؛ بنابراین قطب‌های غیرهمنام مقابل یکدیگر قرار دارند و مقاومت رئوستا در حال افزایش است. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۸۹ ----------
    {
      id: 89,
      text: "در شکل زیر هنگام نزدیک کردن آهنربا به سیم پیچ جهت جریان القایی در میلی آمپرسنج چگونه است؟",
      image: "/img/lenz_q89.png",
      options: [
        "۱) از A به طرف B",
        "۲) متناوباً از A به B و بالعکس",
        "۳) از B به طرف A",
        "۴) بستگی به شتاب حرکت آهنربا دارد."
      ],
      correctIndex: 2,
      answer: "برای تعیین جهت جریان القایی، از قانون لنز استفاده می‌کنیم. با نزدیک شدن آهنربا به سیملوله، شار مغناطیسی بیشتری از سیملوله عبور کرده و جریانی از آن عبور نمی‌کند (عمل سیملوله فاقد خاصیت آهنربایی است). گام اول: شار در حال افزایش است و بنا بر قانون لنز میدان مغناطیسی القایی باید با میدان مغناطیسی خارجی مخالف باشد، در نتیجه میدان مغناطیسی القایی برون‌سو می‌شود و بنا بر قانون دست راست جریان در میله باید رو به بالا باشد. پس جریان در R به طرف پایین است. گام دوم: با کمک قانون دست راست و باتوجه به قطب‌های سیم‌پیچ، جریان القایی در میله اصلی از A به B است. گزینه 3 صحیح است."
    },

    // ---------- سوال ۹۶ ----------
    {
      id: 96,
      text: "در شکل زیر، هر دو حلقة رسانا در صفحۀ کاغذ قرار دارند. اگر حلقة کوچک حامل جریان در جهت حرکت نشان داده شده، وارد حلقة بزرگ تر شود و از سمت دیگر آن خارج گردد. جهت جریان القایی در حلقة بزرگ تر قبل از ورود حلقة کوچک تر به آن و بعد از خروج حلقة کوچک تر از آن، به ترتیب از راست به چپ در کدام جهت است؟",
      image: "/img/lenz_q96.png",
      options: ["۱) 1.1", "۲) 2.2", "۳) 2.1", "۴) 1.2"],
      correctIndex: 2,
      answer: "طبق قاعده دست راست، جهت میدان مغناطیسی ناشی از جریان در حلقه کوچکتر، در داخل آن برون‌سو و در خارج از آن درون‌سو است. بنابراین با نزدیک شدن حلقه کوچکتر به حلقه بزرگتر، میدان مغناطیسی درون‌سوی عبوری از حلقه بزرگتر افزایش یافته و طبق قانون لنز، جریان القایی در جهت (۱) در آن القا می‌شود تا مانع افزایش میدان مغناطیسی درون‌سوی عبوری از حلقه بزرگتر شود. بعد از خروج حلقه کوچکتر و با دور شدن آن، میدان مغناطیسی درون‌سوی عبوری از حلقه بزرگتر در حال کاهش خواهد بود؛ بنابراین طبق قانون لنز، جریان القایی در جهت (۲) خواهد بود تا مانع کاهش میدان مغناطیسی درون‌سوی عبوری از حلقه بزرگتر شود. گزینه 3 صحیح است."
    },

    // ---------- سوال ۹۷ ----------
    {
      id: 97,
      text: "یک حلقة مسی به صورت افقی، توسط گیره ای عایق به یک میلة قائم بسته شده است. اگر یک آهنربا را مطابق شکل زیر از بالای حلقه رها کنیم، جهت جریان القاشده در حلقة مسی قبل از ورود به حلقه و پس از عبور از آن از دید ناظری که از بالا نگاه می کند، کدام است؟",
      image: "/img/lenz_q97.png",
      options: [
        "۱) ساعتگرد - ساعتگرد",
        "۲) ساعتگرد - پادساعتگرد",
        "۳) پادساعتگرد - ساعتگرد",
        "۴) پادساعتگرد - پادساعتگرد"
      ],
      correctIndex: 2,
      answer: "کافی است از قانون لنز کمک بگیریم: هنگام ورود آهنربا به حلقه، شار (B) به سمت پایین افزایش می‌یابد. القایی پادساعتگرد B' القایی در خلاف جهت B اصلی در حلقه به وجود می‌آید تا با افزایش Φ هم مخالفت کند. هنگام خروج آهنربا از حلقه، شار (B) به سمت پایین کاهش می‌یابد. القایی همسو با B اصلی در حلقه به وجود می‌آید تا با کاهش Φ مخالفت کند؛ I القایی از دید ناظر بالای حلقه، ساعتگرد است. بنابراین: پادساعتگرد - ساعتگرد. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۹۸ ----------
    {
      id: 98,
      text: "مطابق شکل زیر چهار قاب مستطیلی در جهات نشان داده شده وارد یک میدان مغناطیسی یکنواخت شده یا از آن خارج می شوند. کدام گزینه جهت جریان القایی در قاب ها را به طور صحیح بیان می کند؟",
      image: "/img/lenz_q98.png",
      options: [
        "۱) در قاب 1 و 4 جریان ساعتگرد و در قاب 3 و 2 جریان پادساعتگرد القا می‌شود.",
        "۲) در قاب 1، 2 و 4 جریان پادساعتگرد القا می‌شود و در قاب 3 جریان ساعتگرد القا می‌شود.",
        "۳) در قاب 1 و 4 جریان پادساعتگرد و در قاب 2 و 3 جریان ساعتگرد القا می‌شود.",
        "۴) در قاب 1، 2 و 4 جریان ساعتگرد و در قاب 3 جریان پادساعتگرد القا می‌شود."
      ],
      correctIndex: 1,
      answer: "طبق قانون لنز در قاب‌هایی که وارد میدان می‌شوند یعنی قاب ۲، ۱ و ۴ جریان به نحوی القا می‌گردد که با افزایش شار مخالفت کند، یعنی جریان پادساعتگرد تا میدان برون‌سوی حاصل، مخالف میدان درون‌سوی اصلی شود. در قاب ۳ که از میدان خارج می‌شود، عکس این پدیده رخ می‌دهد. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۰۳ ----------
    {
      id: 103,
      text: "در مدار شکل زیر دو حلقه رسانا در مجاورت یک سیملوله قرار دارند. با بستن یا باز کردن کلید چه پدیده‌ای مشاهده می‌گردد؟",
      image: "/img/lenz_q103.png",
      options: [
        "۱) با بستن کلید هر دو حلقه جذب سیملوله می‌شوند و با باز کردن کلید هر دو از سیملوله دفع می‌گردند.",
        "۲) با بستن کلید هر دو حلقه از سیملوله دفع شده و با باز کردن کلید هر دو جذب سیملوله می‌شوند.",
        "۳) با بستن کلید، حلقه (1) از سیملوله دفع شده و حلقه (2) جذب آن می‌شود و با باز کردن کلید عکس آن رخ می‌دهد.",
        "۴) با بستن کلید، حلقه (2) از سیملوله دفع شده و حلقه (1) جذب آن می‌شود و با باز کردن کلید عکس آن رخ می‌دهد."
      ],
      correctIndex: 1,
      answer: "با بستن کلید چون شار افزایش می‌یابد، لذا در حلقه‌ها جریانی غیرهمسو با سیملوله ایجاد می‌شود تا با افزایش شار مخالفت کند و در نتیجه هر دو حلقه از سیملوله دفع می‌شوند. با باز کردن کلید عکس آن پدیده رخ داده و هر دو جذب می‌شوند. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۱۰ ----------
    {
      id: 110,
      text: "در مدار شکل زیر، دو حلقة رسانا در مجاورت یک سیمولۀ حامل جریان قرار دارند. در چه صورتی جریان‌های القایی در هر دو حلقه با یکدیگر هم‌جهت خواهند بود؟",
      image: "/img/lenz_q110.png",
      options: [
        "۱) حلقة (1) به‌سمت راست و حلقة (۲) به‌سمت چپ حرکت کند.",
        "۲) حلقة (۱) به‌سمت چپ و حلقة (۲) به‌سمت راست حرکت کند.",
        "۳) هر دو حلقه به‌سمت راست یا هر دو به‌سمت چپ حرکت کنند.",
        "۴) جریان عبوری از سیموله کاهش یابد."
      ],
      correctIndex: 2,
      answer: "طبق قانون لنز فقط در گزینه (۳) باعث می‌شود که در هر دو حلقه جریان‌هایی هم‌جهت ایجاد گردند. مثلاً اگر هر دو حلقه به‌سمت چپ حرکت کنند، چون شار گذرنده از حلقة (۱) کاهش می‌یابد، باید در آن جریانی روبه‌بالا القا گردد (پادساعتگرد) و نیز چون شار گذرنده از حلقة (۲) افزایش می‌یابد، باید در آن جریان روبه‌بالا القا گردد. گزینه ۳ صحیح است."
    },

    // ---------- سوال ۱۱۱ ----------
    {
      id: 111,
      text: "در شکل زیر در کدام حالت‌ها جریان القایی در مقاومت R' به طرف چپ است؟\nالف) لحظه بستن کلید\nب) کلید بسته باشد و مقاومت متغیر R را زیاد کنیم.\nپ) کلید بسته باشد و سیموله‌ها را از هم دور کنیم.\nت) کلید بسته باشد و مقاومت متغیر R را کم کنیم.",
      image: "/img/lenz_q111.png",
      options: ["۱) الف و پ", "۲) ت", "۳) پ و پ", "۴) پ و ت"],
      correctIndex: 2,
      answer: "دقت کنید که جریان در حلقه‌های (۱) رو به بالاست و اگر جریان القایی در مقاومت R' به طرف چپ برقرار شود باید در حلقه‌های (۲) نیز جریان رو به بالا باشد پس جریان القایی در سیموله (۲) هم‌جهت جریان در سیموله (۱) می‌شود. در این حالت شار گذرنده از سیموله (۲) باید کاهش یابد و در حالت‌های زیر این پدیده رخ می‌دهد: ۱- جریان در سیموله (۱) در حال کاهش باشد. ۲- لحظه باز کردن کلید. ۳- افزایش مقاومت متغیر R. ۴- دور کردن سیموله‌ها از یکدیگر. گزینه 3 صحیح است."
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
            <h1 style={{ margin: 0, fontSize: '26px' }}>
              🧲 آزمون ۱۰ سوال پیوسته - قانون لنز
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
              📝 پاسخنامه تشریحی قانون لنز
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

export default LenzLawQuiz;