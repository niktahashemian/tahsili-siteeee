"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson9 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۲-۲: ظرفیت گرمایی و گرمایی ویژه =================
  const questions = [
    {
      id: 11,
      text: "اگر به ۱۰۷ گرم آلومینیم با دمای ۲۰ °C و ظرفیت گرمایی ویژه ۰/۸۵ J.g⁻¹.°C⁻¹، ۱۰ کالری گرما دهیم، دمای آن در مقیاس سلسیوس تقریباً چند درجه افزایش می‌یابد؟ (Al = 27 g.mol⁻¹)",
      options: ["5/9", "6/7", "5", "4/3"],
      correctIndex: 3,
      answer: "۴/۳ درجه سلسیوس افزایش می‌یابد."
    },
    {
      id: 12,
      text: "مقداری کلسیم کربنات با خلوص ۶۰ درصد با مقدار کافی هیدروکلریک اسید واکنش می‌دهد. اگر به کربن دی‌اکسید حاصل ۹۲/۴ ژول گرما دهیم، دمای آن ۱۰ درجه سلسیوس افزایش می‌یابد. جرم کلسیم کربنات اولیه برحسب گرم کدام است؟ (Ca = 40, O = 16, C = 12 : g.mol⁻¹, cCO₂ = 0/84 J.g⁻¹.°C⁻¹)",
      options: ["4/17", "2/5", "4/17", "2/5"],
      correctIndex: 0,
      answer: "۴/۱۷ گرم"
    },
    {
      id: 13,
      text: "۳ لیتر آب (d = 1 g.mL⁻¹) و ۲ لیتر اتانول (d = 0/8 g.mL⁻¹) با یکدیگر مخلوط شده و یک محلول همگن را به وجود آورده‌اند. مقدار گرمای لازم برای افزایش دمای این محلول به میزان ۸ °C چند کیلوژول است؟ (c آب = ۴/۲, c اتانول = ۲/۴ J.g⁻¹.°C⁻¹)",
      options: ["2/0/8", "2/0/8", "16/48", "164/8"],
      correctIndex: 3,
      answer: "۱۶۴/۸ کیلوژول"
    },
    {
      id: 14,
      text: "کدام گزینه درست است؟\n۱) در دما و فشار یکسان، الماس نسبت به گرافیت از پایداری بیشتری برخوردار است.\n۲) گرمای 2 گرم آب 80 درجه سانتی‌گراد از m گرم آب 40 درجه سانتی‌گراد بیشتر است.\n۳) گرمای آزادشده از یک واکنش در دمای ثابت، به طور عمده وابسته به تفاوت انرژی گرمایی مواد واکنش‌دهنده و فرآورده است.\n۴) میانگین انرژی جنبشی ذرات سازندۀ یک ماده رابطۀ مستقیم با دمای آن ماده دارد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 3,
      answer: "گزینه ۴ درست است. میانگین انرژی جنبشی ذرات با دمای ماده رابطه مستقیم دارد."
    },
    {
      id: 15,
      text: "کدام گزینه از لحاظ درست یا نادرست بودن همانند عبارت زیر است؟\n\"جنبش‌های نامنظم مواد در حالت فیزیکی گازی بیشتر از حالت مایع است.\"\n۱) مجموع انرژی جنبشی ذرات سازندۀ یک نمونه ماده، هم‌ارز با انرژی گرمایی آن است.\n۲) یکای رایج دما در SI، درجة سلسیوس (°C) است.\n۳) اگر دو نمونه آب با دمای یکسان و مقدار متفاوت داشته باشیم، انرژی گرمایی موجود در هر دو یکسان است.\n۴) گرمای یک نمونه ماده به دمای آن بستگی دارد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 3,
      answer: "گزینه ۴ درست است."
    },
    {
      id: 16,
      text: "ظرفیت گرمایی ۱۱ گرم اتانول با چند گرم آب برابر است؟ (ظرفیت گرمایی ویژه آب = 4/18 J.g⁻¹.C⁻¹ و ظرفیت گرمایی ویژه اتانول = 2/47 J.g⁻¹.C⁻¹)",
      options: ["13", "6/5", "3/25", "21"],
      correctIndex: 1,
      answer: "۶/۵ گرم آب"
    },
    {
      id: 17,
      text: "یک نیروگاه سوخت فسیلی از سوخت زغال سنگ با فرمول کلی C₁₃₅H₉₆O₉NS استفاده می‌کند. اگر کربن دی‌اکسید آزادشده در واکنش سوختن کامل زغال سنگ در یکی از قسمت‌های این نیروگاه با جذب 1188 کیلوژول گرما، 10°C افزایش دما داشته باشد، چند کیلوگرم کلسیم اکسید با خلوص 70% نیاز است تا نصف SO₂ تولیدشده را قبل از ورود به هواکره به دام بیندازد؟ (گرمای ویژه کربن دی‌اکسید را 0/8 J.g⁻¹.C⁻¹ در نظر بگیرید و واکنش‌ها موازنه شوند) (Ca = 40, O = 16, C = 12 : g.mol⁻¹)",
      options: ["10", "7", "14", "20"],
      correctIndex: 0,
      answer: "۱۰ کیلوگرم"
    },
    {
      id: 18,
      text: "چند میلی‌لیتر اتانول 3/69 کیلوژول انرژی دریافت کند تا به دمای 53°C برسد، دمای اولیه اتانول کدام است؟ (چگالی اتانول را 0/8 g.mL⁻¹ و گرمای ویژه آن را 2/46 J.g⁻¹.C⁻¹ در نظر بگیرید)",
      options: ["33°C", "23°C", "38°C", "28°C"],
      correctIndex: 1,
      answer: "۲۳°C"
    },
    {
      id: 19,
      text: "به‌تقریب چند گرم یخ 0°C را به 60g آب با دمای 40°C اضافه کنیم تا درنهایت آب با دمای 10°C داشته باشیم؟ (آنتالپی ذوب یخ تقریباً برابر 333 J.g⁻¹ است، ظرفیت گرمایی ویژه آب هم 4/2 J.g⁻¹.C⁻¹)",
      options: ["20", "32/5", "27", "30"],
      correctIndex: 0,
      answer: "۲۰ گرم یخ"
    },
    {
      id: 20,
      text: "باتوجه به واکنش فرضی زیر تعیین کنید از واکنش چند لیتر محلول ۰/۵ مول بر لیتر ماده A، گرمایی آزاد می‌شود تا دمای ۱۰ کیلوگرم آب ۲۰ درجه سانتی‌گراد را به ۴۰ درجه برساند؟ (ظرفیت گرمایی ویژه آب ۴/۲ ژول بر گرم درجه سانتی‌گراد است)\nA(aq) + 2BC(aq) → AC₂(s) + 2B(aq)  ΔH = -84 kJ",
      options: ["10000", "20000", "10", "20"],
      correctIndex: 2,
      answer: "۱۰ لیتر"
    },
    {
      id: 21,
      text: "کدام‌یک از گزینه‌های زیر پیرامون شکل داده‌شده، نادرست است؟\n۱) نیروهای بین مولکولی در روغن‌زیتون قوی‌تر از آب است.\n۲) اگر یک تخم‌مرغ در روغن زیتون و یک تخم‌مرغ در آب انداخته شود، تخم‌مرغ موجود در آب می‌پزد.\n۳) ظرفیت گرمایی ویژه آب تقریباً ۲/۱۲ برابر ظرفیت گرمایی ویژه روغن زیتون است.\n۴) به دلیل ظرفیت گرمایی بیشتر آب، با دادن گرمای یکسان، دمای آب کمتر افزایش می‌یابد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 0,
      answer: "گزینه ۱ نادرست است. نیروهای بین مولکولی در آب قوی‌تر از روغن زیتون است."
    },
    {
      id: 22,
      text: "اگر به کربن دی‌اکسید حاصل از واکنش میان ۳۰ گرم کربن ۸۰ درصد خالص با مقدار کافی گاز اکسیژن، ۸۸۰ ژول گرما دهیم، دمای آن چند درجه افزایش می‌یابد؟ (ظرفیت گرمایی ویژه CO₂ = 0/84 J.g⁻¹.K⁻¹, C = 12, O = 16 : g.mol⁻¹)",
      options: ["12/5", "10", "15", "13/5"],
      correctIndex: 0,
      answer: "۱۲/۵ درجه افزایش می‌یابد."
    },
    {
      id: 23,
      text: "مخلوطی از گازهای هلیم و اکسیژن به جرم ۴ گرم موجود است. این مخلوط در شرایط STP ۶/۷۲ لیتر حجم دارد. اگر بخواهیم دمای این مخلوط را ۱۰°C افزایش دهیم، چند ژول گرما نیاز است؟ (O = 16, He = 4 : g.mol⁻¹)\nماده: He = ۵/۲, O₂ = ۰/۹۲ J.g⁻¹.°C⁻¹",
      options: ["68/14", "71/04", "62/38", "75/18"],
      correctIndex: 0,
      answer: "۶۸/۱۴ ژول"
    },
    {
      id: 24,
      text: "مخلوطی از دو فلز کلسیم و منیزیم به جرم ۱۱۲ گرم را در اختیار داریم اگر بر اثر دادن ۳۶۶۹ ژول گرما به این مخلوط دمای کلسیم به‌اندازه ۳۰°C و دمای منیزیم به‌اندازه ۷۰°C افزایش پیدا کند، چند درصد جرمی مخلوط اولیه را کلسیم تشکیل می‌دهد؟ (cCa = 0/65, cMg = 1/05 J.g⁻¹.°C⁻¹)",
      options: ["40", "25", "75", "60"],
      correctIndex: 0,
      answer: "۴۰ درصد کلسیم"
    },
    {
      id: 25,
      text: "در ظرفی از جنس آهن به جرم ۴۰۰ گرم مقداری آب به جرم ۵۰۰ گرم می‌ریزیم. اگر دمای ظرف و آب برابر با ۴۰ °C باشد، برای آنکه دمای سامانه (آب و ظرف) را به ۹۰ °C برسانیم، باید به تقریب چند گرم متان بسوزانیم؟ فرض کنید که ۴۰ درصد انرژی سوختن متان هدر می‌رود. بر اثر سوختن هر مول متان ۹۰۰ kJ انرژی آزاد می‌شود. (c آب = ۴/۲, c آهن = ۰/۵ J.g⁻¹.C⁻¹)",
      options: ["4/8", "2/2", "5/6", "3/4"],
      correctIndex: 0,
      answer: "۴/۸ گرم متان"
    },
    {
      id: 26,
      text: "اگر ۱۰ گرم اتانول با جذب ۴۸/۶ ژول گرما از دمای ۲۴ °C به دمای ۲۶ °C برسد، ظرفیت گرمایی مولی آن چند ژول بر مول بر درجۀ سانتی‌گراد است؟ (C = 12, O = 16, H = 1: g.mol⁻¹)",
      options: ["2/43", "11/78", "115/4", "2/65"],
      correctIndex: 2,
      answer: "۱۱۵/۴ J.mol⁻¹.C⁻¹"
    },
    {
      id: 27,
      text: "اگر دو لیوان یکسان موجود باشد که اولی دارای ۱۰۰ و دومی دارای ۳۰۰ mL آب بوده و هر دو در دمای ۲۵ °C باشند، چند مورد از عبارت‌های زیر در ارتباط با آنها درست است؟\nالف) میانگین سرعت حرکت مولکول‌های آب در هر دو لیوان برابر است.\nب) ظرفیت گرمایی ویژه آب، در هر دو لیوان برابر است.\nپ) ظرفیت گرمایی آب در لیوان دوم در مقایسه با لیوان اول بیشتر است.\nت) برای رساندن دمای آب در هریک از دو لیوان به ۳۵ °C گرمای برابری لازم است.",
      options: ["۱", "۲", "۴", "۳"],
      correctIndex: 1,
      answer: "۲ مورد درست است (الف و ب)."
    },
    {
      id: 28,
      text: "چند گرم ماده باید به انرژی تبدیل شود تا با انرژی حاصل از آن بتوانیم ۴۰ تن آب ۲۵ °C را در فشار یک اتمسفر به نقطه‌جوش آن برسانیم؟ (ظرفیت گرمایی ویژه آب را ۴/۲ J.g⁻¹.C⁻¹ در نظر بگیرید)",
      options: ["4/2 × 10⁻¹⁰", "14 × 10⁻⁵", "14 × 10⁻⁸", "14"],
      correctIndex: 2,
      answer: "۱۴ × ۱۰⁻⁸ گرم"
    },
    {
      id: 29,
      text: "مقدار یکسانی گرما به دو سامانه a و b به ترتیب حاوی ۲۰g نقره و ۳۵g طلا وارد می‌کنیم. اگر هر دو سامانه در ابتدا در دمای اتاق قرار داشته باشند، کدام موارد دربارۀ حالت نهایی سامانه‌ها درست است؟ (cAg = 0/236, cAu = 0/128 J.g⁻¹.C⁻¹)\nالف) میانگین انرژی جنبشی ذرات در سامانه b کمتر است.\nب) میانگین تندی ذرات در سامانه a بیشتر است.\nپ) دمای نهایی سامانه b بیشتر از a است.\nت) میانگین انرژی جنبشی ذرات در b بیشتر است و انرژی گرمایی هر دو سامانه یکسان است.",
      options: ["الف - ت", "پ - ب", "ب - ت", "پ - ب"],
      correctIndex: 2,
      answer: "عبارت‌های ب و ت درست هستند."
    },
    {
      id: 30,
      text: "کدام مورد از عبارت‌های زیر درست است؟\n۱) بوی غذای گرم آسان تر و سریع تر از غذای سرد به مشام می‌رسد.\n۲) جنب‌وجوش مولکول‌ها در حالت فیزیکی مایع از گاز کمتر و از جامد بیشتر است.\n۳) در ساختار مولکول‌های روغن، پیوند دوگانه بیشتری به نسبت چربی‌ها وجود دارد.\n۴) روغن برخلاف چربی جزء ترکیبات آلی به شمار می‌رود.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است. بوی غذای گرم سریع‌تر به مشام می‌رسد."
    },
    {
      id: 31,
      text: "با توجه به شکل زیر پاسخ سؤالات مطرح شده در کدام گزینه آمده است؟ (فرض کنید مقدار آب و روغن زیتون یکسان است)\nالف) اگر گرمای یکسان به هر دو ماده آب و روغن زیتون داده شود، دمای کدام‌یک کمتر افزایش می‌یابد؟\nب) نیروهای بین مولکولی در کدام‌یک قوی‌تر است؟",
      options: ["آب - روغن زیتون", "روغن زیتون - روغن زیتون", "آب - آب", "روغن زیتون - آب"],
      correctIndex: 2,
      answer: "آب - آب. آب ظرفیت گرمایی ویژه بیشتری دارد و نیروهای بین مولکولی در آب قوی‌تر است."
    },
    {
      id: 32,
      text: "کدام مورد از عبارت‌های زیر در رابطه با دما و گرما درست است؟\nالف) تغییر دما باعث مبادلة گرما می‌شود.\nب) با استفاده از گرما می‌توان، یک نمونه ماده را توصیف کرد.\nپ) انجام فرآیند می‌تواند باعث تغییر دما شود.\nت) برای افزایش دمای ۲۰۰ گرم آب از ۵۰°C به ۷۵°C و ۲۰۰ گرم روغن زیتون از ۵۰°C به ۷۵°C گرمای یکسانی نیاز است.",
      options: ["الف - ب", "پ - ت", "پ - ب - ت", "ب - پ"],
      correctIndex: 2,
      answer: "عبارت‌های پ، ب و ت درست هستند."
    },
    {
      id: 33,
      text: "کدام موارد درست هستند؟\nالف) مولکول‌های روغن مایع به دلیل داشتن پیوندهای سیرنشدة بیشتر، واکنش‌پذیری بیشتری از چربی جامد دارند.\nب) دمای یک ماده، معیاری برای توصیف مجموع انرژی جنبشی ذرات سازندۀ آن است.\nپ) آب و اتانول دارای ظرفیت گرمایی ویژه کمتری نسبت به برخی فلزات مانند آلومینیم و طلا هستند.\nت) تفاوت در انرژی پتانسیل مواد واکنش‌دهنده و فرآورده، به شکل گرما در واکنش‌های شیمیایی ظاهر می‌شود.",
      options: ["الف - ب - ت", "الف - ت", "الف - ب - پ", "ب - ت"],
      correctIndex: 1,
      answer: "عبارت‌های الف و ت درست هستند."
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
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/shimi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🌡️ درس ۲-۲: ظرفیت گرمایی و گرمایی ویژه</h1>
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
              📝 پاسخنامه تشریحی - درس ۲-۲: ظرفیت گرمایی و گرمایی ویژه
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

export default Shimi2lesson9;