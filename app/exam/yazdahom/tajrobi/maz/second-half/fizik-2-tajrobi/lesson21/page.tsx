"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const MagneticForceWireQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال غیرپیوسته از درس بیست و یک: نیروی مغناطیسی وارد بر سیم حامل جریان ====================
  const questions = [
    // ---------- سوال ۷۵ ----------
    {
      id: 75,
      text: "در شکل زیر، میله رسانای AB به طول ۸۵ سانتی‌متر به‌وسیله دو نیروسنج به حالت افقی نگه داشته شده است. این مجموعه (نیروسنج‌ها و میله) در میدان مغناطیسی B که عمود بر صفحه است واقع شده‌اند. اگر جریان عبوری از میله برابر با 2/3 A و از سمت A به B باشد، هر نیروسنج عدد 600 mN و اگر جریان عبوری از میله برابر 4/3 A باشد، هر نیروسنج عدد 1200 mN را نشان خواهد داد. اندازه میدان مغناطیسی B کدام است؟",
      image: "/img/magnetism_q75.png",
      options: ["1/8 T", "1/4 T", "1/3 T", "3/4 T"],
      correctIndex: 1,
      answer: "حالت اول \(F_T = 2 \times 600 = 1200 mN = 1.2 N\) و حالت دوم \(F_T = 2 \times 1200 = 2400 mN = 2.4 N\). چون در حالت دوم برآیند نیرو بیشتر شده، پس در حالت دوم نیروی مغناطیسی با نیروی وزن هم‌جهت و در حالت اول خلاف جهت است. از طرفی \(F_B = BIL \sin 90\)، بنابراین \(BIL(I_1 + I_2) = 1.2 \Rightarrow B \times \frac{85}{100} \times (\frac{2}{3} + \frac{4}{3}) = 1.2 \Rightarrow B = 1/4 T\). گزینه ۲ صحیح است."
    },

    // ---------- سوال ۷۹ ----------
    {
      id: 79,
      text: "از سیم رسانای یکنواختی به طول ۴ متر، مربع ABCD را ساخته‌ایم و مطابق شکل از آن جریان الکتریکی عبور می‌دهیم. اگر در این محل میدان مغناطیسی ۱۰۰ G عمود بر صفحه مربع برقرار باشد، بزرگی نیروی مغناطیسی وارد بر کل مربع ABCD چند میلی‌نیوتون است؟",
      image: "/img/magnetism_q79.png",
      options: ["1/2", "12", "1/6", "16"],
      correctIndex: 3,
      answer: "مسیر ABCD و AD دو رسانای موازی هستند که طول مسیر ABCD، سه برابر AD است. پس طبق رابطه \(R = \rho \frac{L}{A}\) مقاومت مسیر ABCD، سه برابر مسیر AD است. \(V_{AD} = V_{ABCD} \Rightarrow I_1 = 3I_2 \Rightarrow I_1 = 1/2 A, I_2 = 0/4 A\). باید توجه داشت نیروی وارد بر دو ضلع CD و AB هم‌اندازه و خلاف جهت هستند، پس فقط نیروهای وارد بر سیم BC و AD باید حساب شوند و نیروی وارد بر این دو سیم هم‌جهت است. \(F_{AD} = BIL = 10^{-2} \times 1/2 \times 1 = 1/2 \times 10^{-2} N\) و \(F_{BC} = BIL = 10^{-2} \times 0/4 \times 1 = 0/4 \times 10^{-2} N\). \(F_{net} = (1/2 + 0/4) \times 10^{-2} = 1/6 \times 10^{-2} N = 16 mN\). گزینه ۴ صحیح است."
    },

    // ---------- سوال ۸۴ ----------
    {
      id: 84,
      text: "مطابق شکل زیر سیمی به شکل نیم‌دایره به شعاع ۵ cm در میدان مغناطیسی یکنواخت به بزرگی ۰/۴ T قرار دارد. اگر از سیم جریان ۳ آمپر عبور کند، بزرگی نیروی مغناطیسی وارد بر آن چند نیوتون خواهد بود؟",
      image: "/img/magnetism_q84.png",
      options: ["0/06", "0/06π", "0/12", "0/12π"],
      correctIndex: 1,
      answer: "در سیم‌های غیرمستقیم، طبق رابطه \(F = BIL' \sin\alpha\) در میدان مغناطیسی B به سیم حامل جریان I نیروی F وارد می‌شود که L' طول تصویر سیم عمود بر خطوط میدان است. در اینجا \(L' = 2r = 2(0/05) = 0/1 m\) است. بنابراین \(F = 0/4 \times 3 \times 0/1 \times 1 = 0/12 N\). گزینه 2 صحیح است."
    },

    // ---------- سوال ۹۴ ----------
    {
      id: 94,
      text: "در شکل زیر سیم راستی به‌صورت خط شکسته حامل جریان ۴A در میدان مغناطیسی B=0/5T قرار دارد. برآیند نیروهای وارد بر سیم چند نیوتون است؟ (ab=bc=3m, cd=de=5m, fg=4m, ef=2/6m, sin 37=0/6)",
      image: "/img/magnetism_q94.png",
      options: ["4/8", "8/4", "4/8√3", "صفر"],
      correctIndex: 2,
      answer: "به قطعه سیم‌های de و ab که به موازات خطوط میدان مغناطیسی هستند، نیرویی وارد نمی‌شود. برآیند نیروهای وارد بر قطعه سیم‌های ef و cd و bc نیز صفر است زیرا جریان در ef و bc رو به بالا و در cd رو به پایین بوده و نیروها همدیگر را خنثی می‌کنند. تنها قطعه سیمی که به آن نیرو وارد شده و خنثی نمی‌شود fg است: \(F_{fg} = BIL_{fg} \sin \theta = 0/5 \times 4 \times 4 \times \sin 37^\circ = 4/8 N\). گزینه 3 صحیح است."
    },

    // ---------- سوال ۹۸ ----------
    {
      id: 98,
      text: "مطابق شکل، سیمی به طول ۵π سانتی‌متر را به‌صورت یک نیم‌دایره درآورده و آن را در میدان مغناطیسی یکنواخت ۲۵۰ G قرار می‌دهیم. اگر از سیم جریان ۲ A عبور دهیم، بزرگی نیروی مغناطیسی وارد بر قطعه سیم چند میلی‌نیوتن است؟",
      image: "/img/magnetism_q98.png",
      options: ["2", "5", "2/5π", "5π"],
      correctIndex: 1,
      answer: "مطابق شکل، بردار طول سیم، برداری است که از پایین نیم‌دایره شروع و به بالای نیم‌دایره ختم می‌شود و زاویه بین L و B برابر ۹۰ درجه است. با توجه به اینکه طول قطعه سیم ۵π سانتی‌متر است، قطر نیم‌دایره که همان طول بردار L است، برابر است با: \(\pi r = 5\pi \Rightarrow d = 2r = 10 cm \Rightarrow |\vec{L}| = 0/1 m\). \(F = ILB \sin\theta = 2 \times 0/1 \times 250 \times 10^{-4} \times \sin 90^\circ = 5 \times 10^{-3} N = 5 mN\). گزینه ۲ صحیح است."
    },

    // ---------- سوال ۱۰۰ ----------
    {
      id: 100,
      text: "یک سیم رسانا که حامل جریان I است در میدان مغناطیسی یکنواختی به‌طور معلق قرار گرفته است. اگر از سیمی با همان جنس و همان طول ولی ۱۰۰ سطح مقطع متفاوت استفاده کنیم و همان جریان I را از آن عبور دهیم، سیم شتاب ۵m/s² رو به بالا خواهد گرفت. سطح مقطع سیم جدید نسبت به سیم اولیه ............ (g=10 m/s²)",
      options: ["۲۵ درصد کمتر است", "۲۵ درصد بیشتر است", "۳۳ درصد کمتر است", "۳۳ درصد بیشتر است"],
      correctIndex: 0,
      answer: "شرط معلق بودن سیم اولیه: \(F = W \Rightarrow BIl\sin\alpha = mg\). قانون دوم نیوتون در مورد سیم دوم: \(F_{net} = m'a \Rightarrow F - m'g = m'a \Rightarrow mg - m'g = m'a \Rightarrow mg = m'(g+a) \Rightarrow m \times 10 = m'(10+5) \Rightarrow m' = \frac{2}{3}m\). چون جنس و طول یکسان است: \(\rho V' = \frac{2}{3}\rho V \Rightarrow V' = \frac{2}{3}V \Rightarrow A' = \frac{2}{3}A\). پس سطح مقطع سیم جدید حدوداً ۳۳ درصد کمتر از سیم اولیه است. گزینه 1 صحیح است."
    },

    // ---------- سوال ۱۰۷ ----------
    {
      id: 107,
      text: "مطابق شکل اگر یک میدان مغناطیسی یکنواخت ۳۰ گاوس در این محل و به طرف پایین (l) برقرار باشد، نیروی مغناطیسی خالص وارد بر سیم ABCD چند میلی‌نیوتون و به کدام طرف است؟",
      image: "/img/magnetism_q107.png",
      options: ["۱۵، درون‌سو", "۱۵، برون‌سو", "۳۰، درون‌سو", "۳۰، برون‌سو"],
      correctIndex: 0,
      answer: "به جای سیم غیرمستقیم ABCD یک سیم مستقیم از A به D در نظر می‌گیریم. \(AD = 1 + 1/5 = 2/5m\). \(F_B = BIL \sin\alpha = 30 \times 10^{-4} \times 2 \times 2/5 \times 1 = 15 \times 10^{-3} N = 15 mN\). طبق قاعده دست راست، جهت نیروی وارد بر سیم درون‌سو است. گزینه 1 صحیح است."
    },

    // ---------- سوال ۱۱۶ ----------
    {
      id: 109,
      text: "ﻣﻄﺎﺑﻖ ﺷﮑﻞ، ﯾﮏ آﻫﻨﺮﺑﺎی ﻧﻌﻠﯽ ﺷﮑﻞ روی ﺗﺮازوﯾﯽ ﻗﺮار ﮔﺮﻓﺘﻪ اﺳﺖ. اﮔﺮ از ﺑﯿﻦ دو ﻗﻄﺐ آﻫﻨﺮﺑﺎ، ﺳﯿﻤﯽ ﺣﺎﻣﻞ ﺟﺮﯾﺎن ﮐﻪ ﻋﻤﻮد ﺑﺮ ﺻﻔﺤﻪ اﺳﺖ ﺑﮕﺬرد، در ﮐﺪام ﺣﺎﻟﺖ، ﺗﺮازو ﻋﺪد ﺑﺰرگ ﺗﺮی را ﻧﺸﺎن ﺧﻮاﻫﺪ داد؟",
      image: "/img/magnetism_q114.png",
      options: ["ﺳﯿﻢ ﺣﺎﻣﻞ ﺟﺮﯾﺎن 5A درون ﺳﻮ ﺑﺎﺷﺪ.", "ﺳﯿﻢ ﺣﺎﻣﻞ ﺟﺮﯾﺎن 5A ﺑﺮون ﺳﻮ ﺑﺎﺷﺪ.", "ﺳﯿﻢ ﺣﺎﻣﻞ ﺟﺮﯾﺎن 10A درون ﺳﻮ ﺑﺎﺷﺪ.", "ﺳﯿﻢ ﺣﺎﻣﻞ ﺟﺮﯾﺎن 10A ﺑﺮون ﺳﻮ ﺑﺎﺷﺪ."],
      correctIndex: 3,
      answer: "نیروی وارد بر سیم از طرف میدان مغناطیسی به سمت پایین است. \(F_B + mg = IBL \sin\theta + mg = 3 \times 1/5 \times 2 \times \sin 90^\circ + 0/1 \times 10 = 9 + 1 = 10 N\). مجموع نیروی چهار نیروسنج باید این مقدار را تحمل کند. هر نیروسنج یک چهارم این مقدار را نشان می‌دهد: \(F_{net} = \frac{10}{4} = 2/5 N\). گزینه 4 صحیح است."
    },

    // ---------- سوال ۱۲۰ ----------
    {
      id: 120,
      text: "سیمی مطابق شکل در میدان مغناطیسی یکنواختی قرار گرفته و از آن جریان الکتریکی عبور می‌کند. سیم در چه جهتی منحرف می‌شود؟",
      image: "/img/magnetism_q120.png",
      options: ["۱", "۲", "چپ", "منحرف نمی‌شود"],
      correctIndex: 3,
      answer: "هر ضلعی از این شش ضلعی، یک ضلع روبه‌روی خود دارد که جهت جریان در آن‌ها مخالف یکدیگر و در نتیجه نیروی الکترومغناطیسی وارد بر آن‌ها نیز هم‌اندازه و مخالف هم هستند، بنابراین برآیند این نیروها برابر صفر است و ایجاد انحراف در شش ضلعی نمی‌کنند. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۱۲۸ ----------
    {
      id: 128,
      text: "در شکل زیر یک قاب مستطیلی شکل در یک میدان مغناطیسی یکنواخت قرار دارد. جهت برآیند نیروهای وارد بر حلقه کدام است؟",
      image: "/img/magnetism_q128.png",
      options: ["بالا", "راست", "پایین", "برآیند نیروها صفر است."],
      correctIndex: 3,
      answer: "مطابق شکل زیر طبق قاعده دست راست، نیروی وارد بر هر ضلع را رسم می‌کنیم. جهت نیروی F در هر ضلع در خلاف جهت نیروی وارد بر ضلع مقابلش می‌باشد و از طرفی چون I در هر دو ضلع مقابل هم یکسان می‌باشد پس اندازه نیروی مغناطیسی وارد بر دو ضلع مقابل هم نیز یکسان خواهد بود پس نیروی خالص وارد بر کل قاب صفر است. گزینه ۴ صحیح است."
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
              🧲 آزمون ۱۰ سوال پیوسته - نیروی مغناطیسی وارد بر سیم حامل جریان
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
              📝 پاسخنامه تشریحی نیروی مغناطیسی وارد بر سیم حامل جریان
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

export default MagneticForceWireQuiz;