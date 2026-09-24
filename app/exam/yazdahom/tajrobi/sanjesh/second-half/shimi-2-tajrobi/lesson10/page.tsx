"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson10 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۲-۳: جاری شدن انرژی گرمایی =================
  const questions = [
    // ==================== سوالات ۳۴ تا ۵۰ (صفحه ۷-۱۰) ====================
    {
      id: 34,
      text: "۱۰ گرم منگنز دی‌اکسید ۹۰ درصد خالص را در مقدار کافی محلول هیدروکلریک اسید حل می‌کنیم. گاز به‌دست‌آمده از این واکنش را مطابق معادلة موازنه‌نشدة زیر جمع‌آوری کرده و به آن ۵۰/۴ ژول گرما می‌دهیم تا دمای آن ۱۵°C افزایش یابد. اگر گرمای ویژه گاز کلر ۰/۴۸ J.g⁻¹.C⁻¹ باشد، درصد خلوص MnO₂ چند است؟ (O = 16, Cl = 35/5, Mn = 55: g.mol⁻¹)\nMnO₂(s) + HCl(aq) → MnCl₂(aq) + Cl₂(g) + H₂O(l)",
      options: ["95/9", "87/6", "87/6", "95/9"],
      correctIndex: 0,
      answer: "۹۵/۹ درصد"
    },
    {
      id: 35,
      text: "اگر نمودار تغییرات دمای ۵g از یک ترکیب آلی برحسب گرمای داده‌شده مطابق شکل زیر باشد و ظرفیت گرمایی ۴ مول از این ترکیب برابر ۳۷/۲ J.K⁻¹ باشد، جرم مولی این ترکیب آلی کدام است؟",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است."
    },
    {
      id: 36,
      text: "در یک یخچال صحرایی، یک بطری محتوی مقدار مشخص اتانول با دمای ۵۰ °C قرار دارد، چند گرم آب باید از بدنه ظرف تبخیر شود تا دمای اتانول به ۳۰ °C کاهش یابد؟ (ظرفیت گرمایی اتانول در بطری برابر ۵/۵ J.°C⁻¹ و انرژی موردنیاز برای تبخیر یک مول آب ۴۴ کیلوژول است، H = 1, O = 16 : g.mol⁻¹)",
      options: ["4/5 × 10⁻³", "2/25 × 10⁻²", "4/5 × 10⁻³", "2/25 × 10⁻³"],
      correctIndex: 1,
      answer: "۲/۲۵ × ۱۰⁻² گرم آب"
    },
    {
      id: 37,
      text: "کدام مورد از مطالب زیر همواره صحیح است؟\nالف) ظرفیت گرمایی از لحاظ عددی بزرگ‌تر از ظرفیت گرمایی ویژه است.\nب) بوتان در دمای کمتری نسبت به هگزان از فاز گاز به مایع تبدیل می‌شود.\nپ) اختلاف جرم مولکولی سیکلوهگزان و بنزن برابر با جرم ۳ مولکول هیدروژن است.\nت) فرمول عمومی آلکان‌ها CₙH₂ₙ₊₂ بوده و ترکیبی با فرمول CₙHₙ₊₂ حتماً یک آلکن است.\nث) به دلیل واکنش‌پذیری کم آلکان‌ها، مقدار آن‌ها در نفت خام بسیار ناچیز است.",
      options: ["الف - ب - ت", "همه موارد", "الف - پ", "ب - پ - ت"],
      correctIndex: 0,
      answer: "عبارت‌های الف، ب و ت درست هستند."
    },
    {
      id: 38,
      text: "هرگاه به ۲۰ گرم از بخار آب، اتانول، سدیم کلرید و اکسیژن که ظرفیت گرمایی ویژه هریک از آن‌ها به ترتیب ۲/۵، ۸/۵، ۰/۹۲ و ۰/۸۴ J.g⁻¹.C⁻¹ است، ۱۰۰ ژول گرما داده شود، مقایسه تغییر دمای آن‌ها کدام است؟",
      options: ["اکسیژن < اتانول < بخار آب < سدیم کلرید", "اتانول < اکسیژن < سدیم کلرید < بخار آب", "سدیم کلرید < بخار آب < اتانول < اکسیژن", "بخار آب < سدیم کلرید < اکسیژن < اتانول"],
      correctIndex: 1,
      answer: "اتانول < اکسیژن < سدیم کلرید < بخار آب"
    },
    {
      id: 39,
      text: "اگر تخم مرغی را در ظرفی حاوی ۲۰۰ g آب در دمای اتاق قرار دهیم و آن را تا دمای ۷۵ °C حرارت دهیم، تخم مرغ پخته می‌شود. اگر این تخم مرغ را در ظرفی حاوی ۳۶۰g روغن زیتون در دمای اتاق قرار دهیم، تا چه دمایی باید حرارت داده شود تا تخم مرغ کامل پخته شود؟ (c آب = ۴/۱۸۴, c روغن = ۱/۹۷ J.g⁻¹.°C⁻¹)",
      options: ["۵۶ °C", "۶۴ °C", "۸۴ °C", "۹۲ °C"],
      correctIndex: 2,
      answer: "۸۴ °C"
    },
    {
      id: 40,
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) گرمای ویژه یک ماده به نوع ماده و مقدار آن بستگی دارد.\nب) گرما را می‌توان مجموع انرژی جنبشی ذره‌های تشکیل‌دهندۀ ماده دانست.\nپ) هر ترکیبی که دارای حلقة بنزنی باشد، آروماتیک نامیده می‌شود.\nت) آهن فلزی است که بیشترین مصرف سالیانه را در میان فلزها دارد.",
      options: ["۲", "۱", "۴", "۳"],
      correctIndex: 1,
      answer: "۲ مورد درست است (پ و ت)."
    },
    {
      id: 41,
      text: "کدام عبارت درست است؟\n۱) تفاوت در انرژی گرمایی مواد واکنش‌دهنده و فرآورده تأثیر زیادی در مقدار گرمای مبادله‌شده در واکنش در دمای ثابت دارد.\n۲) ظرفیت گرمایی ویژه در دما و فشار معین، به جرم ماده و نوع آن وابسته است.\n۳) میزان جنب‌وجوش ذرات یک ماده به میانگین تندی ذرات سازندۀ آن ماده وابسته نیست.\n۴) تکه سیب‌زمینی نسبت به تکه نان با دما و جرم یکسان، دیرتر با محیطی با دمای متفاوت به تعادل گرمایی می‌رسد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 3,
      answer: "گزینه ۴ درست است."
    },
    {
      id: 42,
      text: "دمای ۴۰ گرم الکل با دریافت مقداری گرما از ۴۵°C به ۳۰°C می‌رسد. همین مقدار گرما دمای چند گرم گرافیت را به میزان ۸°C افزایش می‌دهد؟ (ظرفیت گرمایی ویژه الکل ۲/۸ J.g⁻¹.C⁻¹، ظرفیت گرمایی یک مول گرافیت ۸/۵ J.C⁻¹، C = 12 g.mol⁻¹)",
      options: ["296", "24", "17/5", "148/75"],
      correctIndex: 3,
      answer: "۱۴۸/۷۵ گرم"
    },
    {
      id: 43,
      text: "باتوجه به نمودار زیر کدام گزینه درست است؟\n۱) درصورتی که A و B دو ماده مختلف باشند، ظرفیت گرمایی B بیشتر از A است.\n۲) درصورتی که A و B دو ماده مختلف باشند، ظرفیت گرمایی ویژه A بیشتر از B است.\n۳) درصورتی که A و B دو ماده مختلف باشند، برای تغییر دما به‌اندازۀ a، ماده A گرمای بیشتری جذب کرده است.\n۴) درصورتی که A و B دو ماده مختلف باشند، برای تغییر دما به‌اندازۀ a، ماده B گرمای بیشتری جذب کرده است.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است."
    },
    {
      id: 44,
      text: "اگر جرم ماده A دو برابر B و ظرفیت گرمایی ویژه ماده B، برابر ظرفیت گرمایی ویژه ماده A باشد، مقدار گرمای لازم برای ماده A چندبرابر ماده B خواهد بود، برای آنکه هر دو ماده تغییر دمایی یکسانی را داشته باشند؟",
      options: ["۴", "۱", "۲", "۳"],
      correctIndex: 2,
      answer: "۲ برابر"
    },
    {
      id: 45,
      text: "کدام مطلب در مورد ظرفیت گرمایی ویژه درست است؟\n۱) مقایسۀ ظرفیت گرمایی ویژه آب، اتانول و نمک طعام در دمای 25°C و فشار یک اتمسفر به صورت H₂O(l) > NaCl(s) > C₂H₅OH(l) است.\n۲) اگر ظرفیت گرمایی ویژه ماده A از ظرفیت گرمایی ویژه B بیشتر باشد، ظرفیت گرمایی مولی آن نیز از ماده B بیشتر خواهد بود.\n۳) گاز هیدروژن تنها ماده‌ای است که گرمای مولی آن با گرمای ویژه آن برابر است.\n۴) گرمای ویژه به عواملی همچون نیروهای بین‌ذره‌ای و حالت فیزیکی وابسته است.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 3,
      answer: "گزینه ۴ درست است. گرمای ویژه به نیروهای بین‌ذره‌ای و حالت فیزیکی وابسته است."
    },
    {
      id: 46,
      text: "گرمای حاصل از کاهش دمای ۱۴ g آلومینیوم از ۲۵ °C به ۰/۱۱ °C، دمای چند مول کربن دی‌اکسید را از ۲۵ °C به ۳۰ °C افزایش می‌دهد؟ (Al = 27, C = 12, O = 16 : g.mol⁻¹) (cAl = 0/9, cCO₂ = 0/84 J.g⁻¹.°C⁻¹)",
      options: ["0/54 mol", "0/27 mol", "0/47 mol", "0/48 mol"],
      correctIndex: 0,
      answer: "۰/۵۴ مول"
    },
    {
      id: 47,
      text: "اگر به گاز حاصل از تجزیه کامل ۲۰۰ گرم کلسیم کربنات با خلوص ۹۰ درصد، ۱۳۹۴ ژول گرما دهیم دمای آن از ۲۳ °C به ۴۵ °C می‌رسد، ظرفیت گرمایی ویژه گاز کربن دی‌اکسید چند J.g⁻¹.°C⁻¹ است؟ (CaCO₃(s) → CaO(s) + CO₂(g))",
      options: ["0/84", "0/92", "0/75", "0/88"],
      correctIndex: 0,
      answer: "۰/۸۴ J.g⁻¹.°C⁻¹"
    },
    {
      id: 48,
      text: "در ارتباط با فرآیند هم‌دما شدن بستنی با بدن، چه تعداد از عبارت‌های زیر نادرست هستند؟ (بستنی را سامانه در نظر بگیرید)\nالف) بخش عمدة انرژی موجود در بستنی، هنگام فرآیند هم‌دما شدن به بدن ما می‌رسد.\nب) تغییر سطح انرژی سامانه در این فرآیند با گوارشی و سوخت و ساز بستنی در بدن مشابه است.\nپ) جاری شدن انرژی از سامانه به محیط پیرامون با کاهش میانگین انرژی جنبشی ذرات سامانه همراه است.\nت) علامت تغییر سطح انرژی در این فرآیند با قرینه تغییر سطح انرژی فرآیند اکسایش گلوکز (سامانه) در بدن مشابه است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "۲ مورد نادرست است (الف و ب)."
    },
    {
      id: 49,
      text: "ظرفیت گرمایی ویژه آب، ۲/۱۵ برابر ظرفیت گرمایی ویژه آلومینیم است. اگر ۱/۵ کیلوگرم آب ۱۵ °C را در یک کاسه آلومینیمی ۵۰۰ گرمی با دمای ۱۲۰ °C بریزیم و این دو هم‌دما شوند، اختلاف دمای اولیه و نهایی آب چند درجه سانتی‌گراد است؟",
      options: ["14/1", "69/55", "29/1", "54/55"],
      correctIndex: 2,
      answer: "۲۹/۱ درجه سانتی‌گراد"
    },
    {
      id: 50,
      text: "درون ظرفی ۱/۶ گرم NH₄NO₃ وارد می‌کنیم. اگر درون ظرف ۷۵ گرم آب با دمای اولیه ۲۵ °C وجود داشته باشد، پس از انحلال کامل آمونیوم نیترات، دمای مجموعه به ۲۳/۳۸ °C می‌رسد. گرمای جذب‌شده به ازای انحلال کامل ۱ مول آمونیوم نیترات چند کیلوژول است؟ (ظرفیت گرمایی ویژه مخلوط را ۴/۲ J.g⁻¹.°C⁻¹ در نظر بگیرید) (H = 1, N = 14, O = 16 : g.mol⁻¹)",
      options: ["26", "260", "531", "13"],
      correctIndex: 0,
      answer: "۲۶ کیلوژول"
    },
    {
      id: 51,
      text: "چند عبارت درست است؟\nالف) انرژی حاصل از سوختن مواد با جرم آن‌ها رابطه ندارد.\nب) هنگام هم‌دما شدن شیر ۶۰ °C با بدن، بخش عمده‌ای از انرژی موجود در شیر با علامت منفی مبادله می‌شود.\nپ) در فرآیند 2HCl + 1/4 H₂O گرمای آزادشده صرف افزایش جنبش ذرات نمی‌شود.\nت) با استفاده از رابطه Q = mcΔθ، هر نوع گرمایی قابل‌محاسبه است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "۲ مورد درست است (ب و پ)."
    },
    {
      id: 52,
      text: "کدام گزینه در مورد فرآیند گوارش و سوخت‌وساز شیر در بدن نادرست است؟\n۱) بیانگر تبادل انرژی در فرآیند گوارش و سوخت‌وساز شیر در بدن است.\n۲) با انتقال گرما از سامانه به محیط، انرژی سامانه کاهش یافته است.\n۳) تغییر انرژی سامانه همراه با از دست دادن گرما بوده است.\n۴) در سمت راست معادلة واکنش انجام شده قرار می‌گیرد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است."
    }
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // ========== تابع محاسبه درصد ==========
  const calculateScore = useCallback(() => {
    if (isCalculatedRef.current) return;
    isCalculatedRef.current = true;

    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setIsScoreCalculated(true);
  }, [selectedAnswers]);

  // ========== تابع انتخاب گزینه ==========
  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;

    setSelectedAnswers(prev => {
      const newAnswers = { ...prev, [questionId]: optionIndex };
      return newAnswers;
    });

    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  // ========== تایمر ==========
  useEffect(() => {
    if (isTimeUp || isScoreCalculated) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsTimeUp(true);
          isTimeUpRef.current = true;
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isTimeUp, isScoreCalculated]);

  // ========== زمان تمام شد ==========
  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      const timeoutId = setTimeout(() => {
        calculateScore();
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  // ========== بررسی پاسخ‌دهی ==========
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
    <div style={{
      fontFamily: 'Tahoma, Arial, sans-serif',
      width: '100vw',
      minHeight: '100vh',
      padding: '15px 10px',
      backgroundColor: '#f8f9fa',
      direction: 'rtl',
      textAlign: 'right',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      
      {/* هدر */}
      <div style={{
        backgroundColor: '#2196F3',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/sanjesh/second-half/shimi-2-tajrobi')}
          style={{
            position: 'absolute',
            left: '20px',
            top: '20px',
            padding: '8px 16px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          ← بازگشت
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🔥 درس ۲-۳: جاری شدن انرژی گرمایی</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px',
            borderRadius: '50px',
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: 'monospace',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      {/* سوالات */}
      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px',
            backgroundColor: '#ffffff',
            padding: '20px 25px',
            borderRadius: '8px',
            border: '1px solid #e9ecef',
            boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
          }}>
            <div style={{ 
              fontSize: '17px', 
              lineHeight: '1.9', 
              marginBottom: '20px', 
              fontWeight: '500',
              display: 'flex',
              alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#2196F3',
                color: 'white',
                width: '30px',
                height: '30px',
                textAlign: 'center',
                lineHeight: '30px',
                borderRadius: '50%',
                fontSize: '14px',
                marginLeft: '15px',
                flexShrink: 0,
                marginTop: '2px'
              }}>
                {index + 1}
              </span>
              <span>{q.text}</span>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px 30px',
              marginRight: '20px'
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
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #2196F3' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                      cursor: isDisabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: isDisabled && !isSelected ? 0.6 : 1
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: '28px',
                      height: '28px',
                      border: '1px solid #000',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '28px',
                      fontSize: '14px',
                      marginLeft: '15px',
                      backgroundColor: isSelected ? '#2196F3' : '#fff',
                      color: isSelected ? '#fff' : '#000'
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

        {/* دکمه محاسبه */}
        <div style={{
          marginTop: '30px', 
          marginBottom: '30px', 
          padding: '20px', 
          backgroundColor: '#ffffff', 
          borderRadius: '12px', 
          border: '1px solid #dee2e6',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          
          {!isScoreCalculated ? (
            <div>
              <button
                onClick={() => {
                  if (canCalculate) {
                    calculateScore();
                  }
                }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: canCalculate ? '#2196F3' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6
                }}
              >
                {!isAllAnswered && !isTimeUp ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید` : '📊 محاسبه درصد'}
              </button>
              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                  {questions.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2196F3' }}>
                ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span>
                {isTimeUp && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
              </div>
              
              <div style={{
                width: '80%',
                maxWidth: '400px',
                height: '20px',
                backgroundColor: '#e9ecef',
                borderRadius: '10px',
                overflow: 'hidden',
                margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`,
                  height: '100%',
                  backgroundColor: getScoreColor(score!),
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
                  padding: '10px 25px',
                  fontSize: '14px',
                  backgroundColor: '#ff9800',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  marginTop: '10px'
                }}
              >
                🔄 تغییر پاسخ‌ها
              </button>
            </div>
          )}
        </div>

        {/* دکمه پاسخنامه */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
              transition: 'all 0.2s'
            }}
          >
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

        {/* پاسخنامه */}
        {showAnswers && isScoreCalculated && (
          <div style={{
            marginTop: '30px',
            borderTop: '4px solid #2196F3',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #2196F3', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#2196F3'
            }}>
              📝 پاسخنامه تشریحی - درس ۲-۳: جاری شدن انرژی گرمایی
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
                      fontWeight: 'bold', 
                      color: '#2196F3',
                      backgroundColor: '#e3f2fd',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      سوال {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span> 
                    <span style={{ fontSize: '15px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                          {isCorrect ? '✔️ صحیح' : '❌ نادرست'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#666', marginRight: '10px' }}>
                          (انتخاب شما: {String.fromCharCode(65 + userAnswer)})
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#2196F3' }}>📖 توضیح:</span> 
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div style={{
            textAlign: 'center',
            padding: '30px',
            backgroundColor: '#fff3cd',
            borderRadius: '12px',
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

export default Shimi2lesson10;