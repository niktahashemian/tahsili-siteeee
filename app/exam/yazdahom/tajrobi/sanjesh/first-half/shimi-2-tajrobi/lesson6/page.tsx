"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson6 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات شیمی (۲) - کامل =================
  const questions = [
{
  id: 268,
  text: "چرخۀ جریان فلز از طبیعت به طبیعت کدام است؟\n۱) سنگ معدن - استخراج فلز - فلز استخراج شده به صورت آلیاژ و خالص استفاده می‌شود - فلز خورده و فرسایش می‌یابد و زنگ می‌زند و به طبیعت باز می‌گردد.\n۲) سنگ معدن - استخراج فلز - فلز به شکل خالص استفاده می‌شود - فلز خورده و فرسایش می‌یابد و با زنگ زدن به طبیعت باز می‌گردد.\n۳) سنگ معدن - استخراج فلز - فلزها در ترکیب با نافلزات به صورت ترکیبات یونی استفاده می‌شوند - فلز خورده و فرسایش می‌یابد و زنگ می‌زند و به طبیعت باز می‌گردد.\n۴) سنگ معدن - فلز استخراج شده به صورت خالص یا آلیاژ آن در ساخت وسایل زندگی به کار می‌رود - فلزها از طریق فرسایش و زنگ زدن به طبیعت باز می‌گردند.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 0,
  answer: "گزینه ۱ درست است."
},
{
  id: 269,
  text: "کدام‌یک از گزینه‌های زیر درست است؟\n۱) با قرار دادن فلز مس در محلول آهن (II) سولفات، پس از مدتی رنگ محلول تغییر کرده و رسوب تشکیل می‌شود.\n۲) به دلیل واکنش‌پذیری بیشتر کربن نسبت به سدیم، در فولاد مبارکه از کربن برای استخراج آهن استفاده می‌شود.\n۳) هرچه فلزی فعال‌تر باشد، میل بیشتری به ایجاد ترکیب دارد و ترکیب‌هایش پایداری بیشتری نسبت به فلز دارند.\n۴) باتوجه به چرخه استخراج فلز و برگشت آن به طبیعت، می‌توان گفت فلزات منابعی تجدیدپذیرند.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 2,
  answer: "گزینه ۳ درست است."
},
{
  id: 270,
  text: "باتوجه به شکل داده شده چند مورد از عبارت‌های زیر نادرست اند؟\nالف) شکل فرآیند استخراج فلز از طبیعت و بازیافت آن به طبیعت را نشان می‌دهد.\nب) طبق شکل قانون پایستگی فلز در طبیعت برقرار نیست.\nپ) آهنگ مصرف و استخراج فلز بسیار بیشتر از آهنگ برگشت فلز به طبیعت به شکل سنگ معدن است.\nت) باتوجه به شکل، فلزها جزء منابع تجدیدپذیر هستند.\n۱) ۱\n۲) ۲\n۳) ۳\n۴) ۴",
  options: ["۱", "۲", "۳", "۴"],
  correctIndex: 1,
  answer: "۲ مورد نادرست است (ب و ت)."
},

{
  id: 271,
  text: "کدام‌یک از گزینه‌های زیر نادرست است؟\n۱) از بازیافت ۳ قوطی فولادی آن قدر انرژی ذخیره می شود که می توان یک لامپ ۶۰ واتی را حدود ۲۵ ساعت روشن نگه داشت.\n۲) در فرآیند استخراج 1000 kg آهن تقریباً 2000 kg سنگ معدن آن و 1000 kg از منابع معدنی دیگر استفاده می شود.\n۳) نفت خام مایع غلیظ و سیاه رنگ یا قهوه‌ای مایل به سبز است.\n۴) در صورت بازیافت فلزات گونه‌های زیستی کمتری از بین می‌روند.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 1,
  answer: "گزینه ۲ نادرست است. در فرآیند استخراج 1000 kg آهن، حدود 2000 kg سنگ معدن و 1000 kg از منابع معدنی دیگر استفاده نمی‌شود."
},
{
  id: 272,
  text: "دربارة 'بازیافت فلزها' چند مورد از موارد زیر نادرست است؟\nالف) موجب اتلاف بیشتر انرژی می‌شود.\nب) موجب کاهش سرعت گرمایش کرة زمین می‌شود.\nپ) تأثیری بر حفظ گونه‌های زیستی ندارد.\nت) به توسعه پایدار کمک می‌کند.\nث) ردپای زیست محیطی انسان را کاهش می‌دهد.\n۱) ۱\n۲) ۲\n۳) ۳\n۴) ۴",
  options: ["۱", "۲", "۳", "۴"],
  correctIndex: 1,
  answer: "۲ مورد نادرست است (الف و پ). بازیافت فلزها باعث صرفه‌جویی در انرژی می‌شود و تأثیر مثبتی بر حفظ گونه‌های زیستی دارد."
},
{
  id: 273,
  text: "چرخۀ جریان فلز از طبیعت به طبیعت کدام است؟\n۱) سنگ معدن - استخراج فلز - فلز استخراج شده به صورت آلیاژ و خالص استفاده می‌شود - فلز خورده و فرسایش می‌یابد و زنگ می‌زند و به طبیعت باز می‌گردد.\n۲) سنگ معدن - استخراج فلز - فلز به شکل خالص استفاده می‌شود - فلز خورده و فرسایش می‌یابد و با زنگ زدن به طبیعت باز می‌گردد.\n۳) سنگ معدن - استخراج فلز - فلزها در ترکیب با نافلزات به صورت ترکیبات یونی استفاده می‌شوند - فلز خورده و فرسایش می‌یابد و زنگ می‌زند و به طبیعت باز می‌گردد.\n۴) سنگ معدن - فلز استخراج شده به صورت خالص یا آلیاژ آن در ساخت وسایل زندگی به کار می‌رود - فلزها از طریق فرسایش و زنگ زدن به طبیعت باز می‌گردند.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 0,
  answer: "گزینه ۱ درست است. چرخه کامل: سنگ معدن → استخراج فلز → استفاده به صورت آلیاژ و خالص → فرسایش و زنگ زدن → بازگشت به طبیعت."
},
{
  id: 274,
  text: "کدام‌یک از گزینه‌های زیر درست است؟\n۱) با قرار دادن فلز مس در محلول آهن (II) سولفات، پس از مدتی رنگ محلول تغییر کرده و رسوب تشکیل می‌شود.\n۲) به دلیل واکنش‌پذیری بیشتر کربن نسبت به سدیم، در فولاد مبارکه از کربن برای استخراج آهن استفاده می‌شود.\n۳) هرچه فلزی فعال‌تر باشد، میل بیشتری به ایجاد ترکیب دارد و ترکیب‌هایش پایداری بیشتری نسبت به فلز دارند.\n۴) باتوجه به چرخه استخراج فلز و برگشت آن به طبیعت، می‌توان گفت فلزات منابعی تجدیدپذیرند.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 2,
  answer: "گزینه ۳ درست است. فلزات فعال‌تر میل بیشتری به ایجاد ترکیب دارند و ترکیب‌هایشان پایدارتر است."
},
{
  id: 275,
  text: "باتوجه به شکل داده شده چند مورد از عبارت‌های زیر نادرست اند؟\nالف) شکل فرآیند استخراج فلز از طبیعت و بازیافت آن به طبیعت را نشان می‌دهد.\nب) طبق شکل قانون پایستگی فلز در طبیعت برقرار نیست.\nپ) آهنگ مصرف و استخراج فلز بسیار بیشتر از آهنگ برگشت فلز به طبیعت به شکل سنگ معدن است.\nت) باتوجه به شکل، فلزها جزء منابع تجدیدپذیر هستند.\n۱) ۱\n۲) ۲\n۳) ۳\n۴) ۴",
  options: ["۱", "۲", "۳", "۴"],
  correctIndex: 1,
  answer: "۲ مورد نادرست است (ب و ت). قانون پایستگی فلز در طبیعت برقرار است و فلزها منابع تجدیدناپذیر هستند."
},
{
  id: 276,
  text: "کدام گزینه در مورد بازیافت فلزها درست است؟\n۱) بازیافت فلزها باعث افزایش آلودگی محیط زیست می‌شود.\n۲) بازیافت فلزها انرژی بیشتری مصرف می‌کند.\n۳) بازیافت فلزها به حفظ منابع طبیعی کمک می‌کند.\n۴) بازیافت فلزها تأثیری بر محیط زیست ندارد.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 2,
  answer: "بازیافت فلزها به حفظ منابع طبیعی کمک می‌کند و مصرف انرژی را کاهش می‌دهد."
},
{
  id: 277,
  text: "کدام یک از موارد زیر از مزایای بازیافت فلزات نیست؟\n۱) کاهش مصرف انرژی\n۲) کاهش آلودگی محیط زیست\n۳) افزایش استخراج معادن\n۴) حفظ منابع طبیعی",
  options: ["کاهش مصرف انرژی", "کاهش آلودگی محیط زیست", "افزایش استخراج معادن", "حفظ منابع طبیعی"],
  correctIndex: 2,
  answer: "افزایش استخراج معادن از مزایای بازیافت نیست. بازیافت باعث کاهش نیاز به استخراج جدید می‌شود."
},
{
  id: 278,
  text: "کدام گزینه در مورد فلزات به عنوان منابع تجدیدناپذیر درست است؟\n۱) فلزات با بازیافت به منابع تجدیدپذیر تبدیل می‌شوند.\n۲) فلزات به طور طبیعی در طبیعت تجدید می‌شوند.\n۳) فلزات پس از استخراج، به همان شکل در طبیعت بازمی‌گردند.\n۴) فلزات منابعی هستند که با سرعت مصرف، جایگزین نمی‌شوند.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 3,
  answer: "فلزات منابع تجدیدناپذیر هستند و با سرعت مصرف، در طبیعت جایگزین نمی‌شوند."
},
{
  id: 279,
  text: "کدام یک از موارد زیر در مورد بازیافت فلزات صحیح است؟\n۱) بازیافت فلزات باعث افزایش هزینه‌های تولید می‌شود.\n۲) بازیافت فلزات به کاهش انتشار گازهای گلخانه‌ای کمک می‌کند.\n۳) بازیافت فلزات کیفیت فلزات را کاهش می‌دهد.\n۴) بازیافت فلزات فقط برای فلزات گرانبها انجام می‌شود.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 1,
  answer: "بازیافت فلزات به کاهش انتشار گازهای گلخانه‌ای کمک می‌کند و ردپای کربن را کاهش می‌دهد."
},
{
  id: 280,
  text: "کدام یک از موارد زیر در مورد توسعه پایدار درست است؟\n۱) توسعه پایدار به معنای استفاده بی‌رویه از منابع طبیعی است.\n۲) توسعه پایدار نیازهای نسل حاضر را بدون توجه به نسل‌های آینده برآورده می‌کند.\n۳) توسعه پایدار به حفظ منابع برای نسل‌های آینده توجه دارد.\n۴) توسعه پایدار فقط به مسائل اقتصادی توجه دارد.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 2,
  answer: "توسعه پایدار به حفظ منابع برای نسل‌های آینده توجه دارد و استفاده متعادل از منابع را ترویج می‌کند."
},
{
  id: 281,
  text: "کدام یک از موارد زیر در مورد ردپای زیست‌محیطی انسان درست است؟\n۱) بازیافت فلزات ردپای زیست‌محیطی را افزایش می‌دهد.\n۲) کاهش مصرف منابع، ردپای زیست‌محیطی را کاهش می‌دهد.\n۳) ردپای زیست‌محیطی به معنای مصرف بیشتر انرژی است.\n۴) ردپای زیست‌محیطی فقط به آلودگی هوا مربوط می‌شود.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 1,
  answer: "کاهش مصرف منابع و بازیافت، ردپای زیست‌محیطی انسان را کاهش می‌دهد."
},
{
  id: 282,
  text: "کدام گزینه در مورد چرخه زندگی فلزات درست است؟\n۱) فلزات پس از استفاده به طور کامل از بین می‌روند.\n۲) فلزات پس از استفاده می‌توانند بازیافت شوند و دوباره استفاده گردند.\n۳) فلزات فقط یک بار قابل استفاده هستند.\n۴) فلزات پس از استفاده به شکل اولیه خود بازمی‌گردند.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 1,
  answer: "فلزات پس از استفاده می‌توانند بازیافت شوند و دوباره در چرخه تولید قرار گیرند."
},
{
  id: 283,
  text: "کدام یک از گزینه‌های زیر در مورد استخراج فلزات درست است؟\n۱) استخراج فلزات هیچ تأثیری بر محیط زیست ندارد.\n۲) استخراج فلزات باعث تخریب محیط زیست می‌شود.\n۳) استخراج فلزات همیشه مقرون به صرفه است.\n۴) استخراج فلزات فقط در کشورهای توسعه‌یافته انجام می‌شود.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 1,
  answer: "استخراج فلزات معمولاً باعث تخریب محیط زیست، آلودگی و مصرف انرژی می‌شود."
},
{
  id: 284,
  text: "کدام یک از موارد زیر در مورد بازیافت آهن درست است؟\n۱) بازیافت آهن باعث کاهش کیفیت آن می‌شود.\n۲) بازیافت آهن انرژی کمتری نسبت به استخراج اولیه مصرف می‌کند.\n۳) بازیافت آهن فقط در کشورهای پیشرفته انجام می‌شود.\n۴) بازیافت آهن مقرون به صرفه نیست.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 1,
  answer: "بازیافت آهن انرژی بسیار کمتری نسبت به استخراج اولیه از سنگ معدن مصرف می‌کند."
},
{
  id: 285,
  text: "کدام یک از گزینه‌های زیر در مورد تأثیر بازیافت بر محیط زیست درست است؟\n۱) بازیافت باعث افزایش آلودگی آب می‌شود.\n۲) بازیافت باعث کاهش آلودگی هوا می‌شود.\n۳) بازیافت تأثیری بر آلودگی ندارد.\n۴) بازیافت فقط آلودگی خاک را کاهش می‌دهد.",
  options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
  correctIndex: 1,
  answer: "بازیافت با کاهش نیاز به استخراج و فرآوری، باعث کاهش آلودگی هوا و محیط زیست می‌شود."
},
  ]; // <-- اینجا آرایه بسته میشه!

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
        backgroundColor: '#E65100',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/sanjesh/first-half/shimi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 آزمون جامع شیمی (۲)</h1>
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
                backgroundColor: '#E65100',
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
                      border: isSelected ? '3px solid #E65100' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#fff3e0' : '#fff',
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
                      backgroundColor: isSelected ? '#E65100' : '#fff',
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
                  backgroundColor: canCalculate ? '#E65100' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#E65100' }}>
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
            borderTop: '4px solid #E65100',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #E65100', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#E65100'
            }}>
              📝 پاسخنامه تشریحی شیمی (۲)
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
                      color: '#E65100',
                      backgroundColor: '#fff3e0',
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
                    <span style={{ fontWeight: 'bold', color: '#E65100' }}>📖 توضیح:</span> 
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

export default Shimi2lesson6;