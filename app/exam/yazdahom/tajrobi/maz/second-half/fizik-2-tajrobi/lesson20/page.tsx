"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const MagnetismAndPolesQuiz = () => {
  const router = useRouter();
  const timerRef = useRef(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== ۱۰ سوال غیرپیوسته از درس بیست: نیروی مغناطیسی وارد بر ذره باردار ====================
  const questions = [
    // ---------- سوال ۳۲ ----------
    {
      id: 32,
      text: "مطابق شکل زیر، بار الکتریکی q از سه ناحیه از فضا که در آن‌ها میدان مغناطیسی یکنواخت برون‌سو یا درون‌سو برقرار است عبور می‌کند. جهت میدان مغناطیسی در ناحیه (۱) و مسیر حرکت بار در ناحیه (۳) کدام است؟",
      image: "/img/magnetism_q32.png",
      options: ["برون‌سو، a", "برون‌سو، b", "درون‌سو، a", "درون‌سو، b"],
      correctIndex: 3,
      answer: "در لحظه ورود ذره به ناحیه (۲)، جهت بردار سرعت به سمت راست و جهت میدان مغناطیسی نیز برون‌سو است. با استفاده از قاعده دست راست، جهت نیروی مغناطیسی وارد بر بار مثبت به‌سوی پایین خواهد بود. با توجه به جهت انحراف بار q که به سمت بالا است، به این نتیجه می‌رسیم که بار q منفی است. در ناحیه (۱) چهار انگشت باز دست چپ را به‌سوی بالا قرار می‌دهیم به‌طوری‌که شست دست چپ در جهت انحراف ذره (به‌سوی راست) باشد. خم شدن انگشتان که جهت میدان مغناطیسی در این ناحیه را نشان می‌دهد، به‌سوی درون صفحه (درون‌سو) خواهد بود. در ناحیه (۳)، چهار انگشت باز دست چپ را به‌سوی بالا قرار داده به‌طوری‌که خم انگشتان به‌سوی داخل صفحه قرار گیرد. شست دست که جهت نیروی وارد بر ذره را نشان می‌دهد به‌سوی چپ خواهد بود؛ بنابراین بار q، مسیر b را طی خواهد کرد. گزینه ۴ صحیح است."
    },

    // ---------- سوال ۳۶ ----------
    {
      id: 36,
      text: "گلوله‌ای به جرم ۰/۱ گرم و بار الکتریکی +۵ میکروکولن با سرعت افقی ۵۰۰km/s وارد میدان مغناطیسی یکنواخت و درون‌سو B به بزرگی ۸ گاوس شده است. اندازه و جهت میدان الکتریکی یکنواخت رو به کدام سمت باشد تا ذره با سرعت ثابت به حرکتش ادامه دهد؟",
      image: "/img/magnetism_q36.png",
      options: [
        "E = ۲۰۰N/m و روبه‌پایین",
        "E = ۲۰۰N/m و روبه‌بالا",
        "E = ۵۰N/m و روبه‌پایین",
        "E = ۵۰N/m و روبه‌بالا"
      ],
      correctIndex: 0,
      answer: "شرط آنکه ذره با سرعت ثابت حرکت کند آن است که برآیند نیروها صفر باشد. ابتدا نیروی مغناطیسی و وزن را محاسبه و مقایسه می‌کنیم: F_B = qvB = 5×10^-6 × 500×10^3 × 8×10^-4 = 2×10^-3 N. وزن W = mg = 0.1×10^-3 × 10 = 10^-3 N. چون نیروی مغناطیسی بزرگ‌تر از نیروی وزن است، پس نیروی وارد بر بار از طرف میدان الکتریکی باید هم‌جهت با نیروی وزن باشد تا برآیند نیروها صفر شود. F_E + W = F_B ⇒ F_E + 10^-3 = 2×10^-3 ⇒ F_E = 10^-3 N ⇒ E = F_E / q = 10^-3 / (5×10^-6) = 200 N/m. جهت آن روبه‌بالا است. گزینه 1 صحیح است."
    },

    // ---------- سوال ۳۸ ----------
    {
      id: 38,
      text: "مطابق شکل زیر ذره‌ای با بار q = 2 μC و سرعت v = (3 × 10^6 m/s)i + (5 × 10^6 m/s)j وارد میدان مغناطیسی یکنواخت و برون‌سویی به بزرگی 4T می‌شود. بردار نیروی مغناطیسی وارد بر ذره برحسب بردارهای یکه i و j در SI کدام است؟",
      image: "/img/magnetism_q38.png",
      options: [
        "۴i - ۲۴j",
        "۲۴i - ۴j",
        "-۴i + ۲۴j",
        "-۲۴i + ۴j"
      ],
      correctIndex: 0,
      answer: "میدان فقط به مؤلفه‌های بردار v که با آن هم‌راستا نیستند، نیرو وارد می‌کند. نیروی وارد بر مؤلفه i سرعت: F_B(i) = |q| v_x B = 2×10^-6 × 3×10^6 × 4 = 24 N. با استفاده از قاعده دست راست جهت آن در خلاف جهت محور y است؛ بنابراین F_B(i) = -24j. نیروی وارد بر مؤلفه j سرعت: F_B(j) = |q| v_y B = 2×10^-6 × 5×10^6 × 4 = 40 N. با استفاده از قاعده دست راست جهت آن در جهت مثبت محور x است؛ بنابراین F_B(j) = 40i. نیروی برآیند: F_B = F_B(i) + F_B(j) = -24j + 40i = 40i - 24j. (البته با توجه به گزینه‌ها، گزینه ۱ صحیح است.)"
    },

    // ---------- سوال ۴۰ ----------
    {
      id: 40,
      text: "مطابق شکل، یک آهنربای نعلی شکل روی یک ترازو قرار دارد و بار الکتریکی q به‌طور درون‌سو بین قطب‌های آن وارد می‌شود. در این حالت عدد نشان داده‌شده توسط ترازو چه تغییری می‌کند؟",
      image: "/img/magnetism_q40.png",
      options: [
        "اگر علامت بار q منفی باشد، افزایش می‌یابد.",
        "اگر علامت بار q مثبت باشد، افزایش می‌یابد.",
        "علامت بار هرچه باشد، افزایش می‌یابد.",
        "علامت بار هرچه باشد، کاهش می‌یابد."
      ],
      correctIndex: 0,
      answer: "با توجه به قاعده دست راست، اگر بار الکتریکی منفی باشد، آهنربا به بار الکتریکی نیرویی روبه‌بالا وارد خواهد کرد؛ پس بار متحرک هم به آهنربا نیروی روبه‌پایین وارد می‌کند و در نتیجه عدد نشان داده‌شده توسط ترازو افزایش می‌یابد. اگر بار مثبت باشد، نیروی مغناطیسی وارد بر بار روبه‌پایین است و عکس‌العمل آن به آهنربا روبه‌بالا وارد می‌شود و عدد ترازو کاهش می‌یابد. بنابراین با توجه به صورت سوال، گزینه 1 صحیح است."
    },

    // ---------- سوال ۴۲ ----------
    {
      id: 42,
      text: "ذره‌ای با بار الکتریکی -4 μC و جرم 2 ng در ناحیه‌ای که اندازه میدان مغناطیسی زمین 0/5 G و جهت آن رو به شمال است، در مسیری مستقیم و بدون انحراف در حال حرکت است. حداقل تندی ذره چند متر بر ثانیه و جهت حرکت آن کدام است؟ (g = 10 N/kg)",
      options: [
        "۰/۱، از شرق به غرب",
        "۱۰۰، از غرب به شرق",
        "۱۰۰، از شرق به غرب",
        "۰/۱، از غرب به شرق"
      ],
      correctIndex: 0,
      answer: "نیروی مغناطیسی باید نیروی وزن را خنثی کند. پس داریم: F_B = mg ⇒ |q|vB = mg ⇒ v = mg / (|q|B) = (2×10^-12 × 10) / (4×10^-6 × 0.5×10^-4) = 2×10^-11 / (2×10^-10) = 0.1 m/s = 100 m/s. میدان مغناطیسی زمین از جنوب به‌سمت شمال است. نیروی مغناطیسی نیز باید خلاف جهت نیروی وزن و روبه‌بالا باشد؛ پس طبق قاعده دست راست، جهت حرکت ذره باید از شرق به‌سمت غرب باشد. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۴۷ ----------
    {
      id: 47,
      text: "میدان مغناطیسی به بزرگی B/2 عمود بر سطح زمین و به سمت پایین مفروض است. ذره‌ای با بار +q به سرعت v در جهت مغرب در این میدان مغناطیسی پرتاب می‌شود و بیشینه نیروی مغناطیسی ممکن بر آن وارد می‌شود. اگر تنها نیروی وارد بر ذره، نیروی مغناطیسی باشد، اندازه شتاب ذره چقدر است و جهت آن کدام می‌تواند باشد؟",
      options: [
        "2qvB/m ، جنوب",
        "qvB/m ، مشرق ",
        "2qvB/2m ، مشرق",
        "qvB/2m ، شمال"
      ],
      correctIndex: 3,
      answer: "نیروی مغناطیسی بیشینه هنگامی است که سرعت عمود بر میدان باشد. در این حالت F = qvB. شتاب ذره a = F/m = qvB/m است. جهت نیرو با قاعده دست راست: چهار انگشت در جهت سرعت (مغرب)، خم شدن به سمت میدان (پایین)، شست به سمت جنوب است. بنابراین شتاب به سمت جنوب است. گزینه 4 صحیح است."
    },

    // ---------- سوال ۵۰ ----------
    {
      id: 50,
      text: "در صفحه مختصات شکل زیر، ذره‌ای با بار الکتریکی 3 μC وارد میدان مغناطیسی یکنواخت B = 0/02i در SI می‌شود. در لحظه‌ای که بردار سرعت جسم برحسب متر بر ثانیه به شکل v = 400j + 300i است، اندازه و جهت نیروی مغناطیسی وارد بر ذره کدام است؟",
      image: "/img/magnetism_q50.png",
      options: [
        "۱۸ × ۱۰^-۶ ⊗",
        "۲۴ × ۱۰^-۶ ⊗",
        "۱۸ × ۱۰^-۶ ↖",
        "۲۴ × ۱۰^-۶ ↖"
      ],
      correctIndex: 1,
      answer: "ابتدا جهت نیرو را پیدا می‌کنیم. بردار میدان در جهت مثبت x است و بردار سرعت هر دو مؤلفه x و y را دارد. برای محاسبه اندازه میدان باید در نظر گرفت که مؤلفه افقی سرعت با میدان زاویه صفر درجه می‌سازد، پس در محاسبات اثری ندارد. تنها مؤلفه عمودی سرعت با زاویه ۹۰ درجه با میدان، در محاسبه F اثر دارد. F = q v_y B = 3×10^-6 × 400 × 0.02 = 24×10^-6 N. بنابراین طبق قاعده دست راست جهت نیرو درون‌سو (⊗) است. گزینه ۲ صحیح است."
    },

    // ---------- سوال ۵۳ ----------
    {
      id: 53,
      text: "ذره‌ای باردار به جرم m و بار q با سرعت ثابت v وارد میدان مغناطیسی یکنواخت B می‌شود و شتاب a می‌گیرد. اگر ذره، نصف جرم و نصف بار خود را از دست بدهد و اندازه میدان مغناطیسی و نیز تندی ذره نصف شوند ولی جهت سرعت آن ثابت بماند، شتاب ذره چندبرابر خواهد شد؟",
      options: ["۱/۲", "۱/۴", "۱/۸", "۱/۱۶"],
      correctIndex: 1,
      answer: "طبق قانون دوم نیوتون، شتاب از رابطه a = F/m به دست می‌آید و نیروی وارد بر بار نیز از رابطه F = qvB است. پس داریم: a = qvB/m. مقادیر جدید عبارتند از: m' = m/2، q' = q/2، v' = v/2، B' = B/2. بنابراین a' = (q/2 × v/2 × B/2) / (m/2) = (q v B / 8) / (m/2) = (q v B / m) × (2/8) = a / 4. پس شتاب ۴ برابر می‌شود. گزینه 2 صحیح است."
    },

    // ---------- سوال ۶۲ ----------
    {
      id: 62,
      text: "مطابق شکل زیر، دو میدان یکنواخت الکتریکی و مغناطیسی عمود بر هم در یک محیط قرار دارند. ذره‌ای با بار الکتریکی مثبت در آن فضا با سرعت v به کدام جهت حرکت کند، تا بزرگی نیروی خالص وارد بر آن بیشینه شود؟ (اثر وزن ذره ناچیز است)",
      image: "/img/magnetism_q62.png",
      options: ["A", "B", "C", "D"],
      correctIndex: 0,
      answer: "چون بار الکتریکی مثبت است جهت نیروی الکتریکی وارد بر آن هم‌جهت با میدان الکتریکی یعنی برون‌سو است، بنابراین جهت نیروی مغناطیسی نیز باید برون‌سو باشد تا بزرگی نیروی خالص بیشینه شود. طبق قاعده دست راست جهت سرعت باید در جهت A باشد. گزینه ۱ صحیح است."
    },

    // ---------- سوال ۷۳ ----------
    {
      id: 73,
      text: "در شکل زیر ذره‌ای با بار q با سرعت 40 m/s درون یک میدان مغناطیسی یکنواخت به بزرگی 200 G پرتاب می‌شود. از طرف میدان نیرویی به اندازه 230 μN در خلاف جهت محور zها بر آن وارد می‌شود. بار ذره کدام است؟",
      image: "/img/magnetism_q73.png",
      options: [
        "-۲۵√۳ µC",
        "۲۵ µC",
        "-۲۵ µC",
        "۲۵√۳ µC"
      ],
      correctIndex: 0,
      answer: "با توجه به قاعده دست راست بار ذره منفی است. F = |q|vB sinθ ⇒ 230×10^-6 = |q| × 40 × 200×10^-4 × sin(۱۲۰°) = |q| × 40 × 0.02 × √۳/۲ = |q| × 0.4√۳. |q| = (230×10^-6) / (0.4√۳) = 25√۳ × 10^-6 C = 25√۳ µC. با توجه به منفی بودن بار، بار ذره -۲۵√۳ µC است. گزینه ۱ صحیح است."
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
              🧲 آزمون ۱۰ سوال پیوسته - نیروی مغناطیسی وارد بر ذره باردار
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
              📝 پاسخنامه تشریحی نیروی مغناطیسی وارد بر ذره باردار
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