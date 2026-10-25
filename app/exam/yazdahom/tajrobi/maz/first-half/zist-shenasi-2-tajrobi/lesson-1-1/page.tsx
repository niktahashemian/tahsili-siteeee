/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

// تعریف اینترفیس برای رفع خطای Property does not exist
interface Question {
  id: number;
  section: string;
  text: string;
  options: string[];
  correctIndex: number;
  answer: string;
  Image?: string;
  ImageComponent?: React.FC;
}

// انتقال سوالات به بیرون از کامپوننت برای رفع هشدار useCallback
const questions: Question[] = [
  {
    id: 18,
    section: "فصل اول: تنظیم عصبی",
    text: "نوار مغزی چیست؟",
    options: [
      "جریان الکتریکی ثبت شده از یاخته عصبی مغز",
      "جریان الکتریکی ثبت شده از یاخته پشتیبان مغز",
      "جریان یونی ثبت شده از یاخته پشتیبان مغز",
      "جریان یونی ثبت شده از یاخته عصبی مغز"
    ],
    correctIndex: 3,
    answer: "نوار مغزی (EEG) امواج الکتریکی مغز را ثبت می‌کند که حاصل فعالیت یاخته‌های عصبی است، نه یاخته‌های پشتیبان. بنابراین گزینه 4 صحیح است."
  },
  {
    id: 22,
    section: "فصل اول: تنظیم عصبی",
    text: "هر پمپ سدیم - پتاسیم نورون ............",
    options: [
      "ترابری یون‌ها را بدون مصرف انرژی و در جهت شیب غلظت انجام می‌دهد.",
      "در تماس با بخشی است که توسط شبکه آندوپلاسمی صاف تولید می‌شود.",
      "به دنبال مصرف H+ انرژی لازم جهت عبور مواد را به دست می‌آورد.",
      "در ساختار خود دارای سه جایگاه بزرگ برای یون سدیم و دو جایگاه کوچک‌تر برای یون پتاسیم است."
    ],
    correctIndex: 1,
    answer: "پمپ سدیم-پتاسیم با مصرف ATP، ۳ یون سدیم را به بیرون و ۲ یون پتاسیم را به درون می‌برد. ساختار آن دارای ۳ جایگاه برای سدیم و ۲ جایگاه برای پتاسیم است. گزینه 2 صحیح است."
  },
  {
    id: 33,
    section: "فصل اول: تنظیم عصبی",
    text: "کدام عبارت درست است؟",
    options: [
      "به دنبال بسته شدن کانال دریچه دار پتاسیمی، تراکم سدیم های درون نورون کاهش می یابد.",
      "در افراد سیگاری نیکوتین همانند ناقل عصبی ابتدا وارد گردش خون عمومی می شود سپس به مغز می رود.",
      "ادغام کیسه چه های حامل ناقل عصبی در پایانه یاخته پس سیناپسی انجام می شود که با مصرف انرژی همراه است.",
      "پایانه آکسونی نورون حرکتی می تواند پیام عصبی را به جسم سلولی نورون دیگر منتقل کند."
    ],
    correctIndex: 0,
    answer: "پایانه آکسون نورون حرکتی می‌تواند با جسم یاخته‌ای نورون دیگر (مثلاً در نخاع) سیناپس تشکیل دهد و پیام را منتقل کند. گزینه 1 صحیح است."
  },
  {
    id: 45,
    section: "فصل اول: تنظیم عصبی",
    text: "یاخته‌های پشتیبان ............",
    options: [
      "کمتر از یاخته‌های عصبی هستند.",
      "با کمک برخی از یاخته‌های عصبی میلین را تولید می‌کند.",
      "توانایی دریافت پیام عصبی را دارد.",
      "در حفظ مقدار طبیعی یون‌های مایع اطراف یاخته‌های عصبی نقش دارد."
    ],
    correctIndex: 3,
    answer: "یاخته‌های پشتیبان (نوروگلیا) با تنظیم غلظت یون‌ها، حفظ ایستایی (هومئوستازی) مایع اطراف نورون‌ها را بر عهده دارند. گزینه ۴ صحیح است."
  },
  {
    id: 48,
    section: "فصل اول: تنظیم عصبی",
    text: "کدام گزینه درباره بیماری MS درست بیان شده است؟",
    options: [
      "در صورت فعالیت سلول‌های عصبی نوروگلیا و ترمیم لایه لیپیدی، علائم بیماری از بین می‌رود.",
      "قشر مخ بیشتر از قشر نخاع مورد تهاجم دستگاه ایمنی قرار می‌گیرد.",
      "با تخریب تدریجی غلاف میلین، انتقال جهشی پیام‌های عصبی دچار اختلال می‌شود.",
      "این بیماری بر اثر اختلال در سیستم ایمنی بدن ایجاد شده است."
    ],
    correctIndex: 3,
    answer: "در بیماری MS، غلاف میلین توسط سیستم ایمنی تخریب می‌شود و این امر باعث اختلال در انتقال جهشی پیام عصبی و کاهش سرعت هدایت می‌گردد. گزینه 4 صحیح است."
  },
  {
    id: 55,
    section: "فصل اول: تنظیم عصبی",
    text: "کدام گزینه، برای تکمیل عبارت زیر مناسب است؟ \"تارهای عصبی میلین دار بر خلاف تارهای عصبی فاقد میلین می توانند ......\"",
    options: [
      "مقدار کمتری از یون‌های سدیم و پتاسیم را در دو سوی غشای خود جابه‌جا کنند.",
      "پیام‌های عصبی را با سرعت بیشتری به یاخته‌های پس‌سیناپسی هدایت کنند.",
      "با انجام برون‌رانی، محتویات وزیکول‌ها را در فضای بین‌یاخته‌ای رها کنند.",
      "پیام‌های عصبی را با مصرف انرژی بیشتری در طول خود هدایت کنند."
    ],
    correctIndex: 0,
    answer: "وجود غلاف میلین باعث ایجاد انتقال جهشی در گره‌های رانویه شده و سرعت هدایت پیام عصبی را به طور چشمگیری افزایش می‌دهد. گزینه 1 صحیح است."
  },
  {
    id: 90,
    section: "فصل اول: تنظیم عصبی",
    text: "کدام گزینه جمله زیر را به درستی تکمیل می‌کند؟ \"نورونی که وظیفه آن وارد کردن اطلاعات به دستگاه عصبی مرکزی است برخلاف سایر نورون‌ها ...... دارد اما همانند دیگر نورون‌ها ......\"",
    options: [
      "تنها یک دندریت - با یاخته‌های پشتیبان در ارتباط است.",
      "دندریت بلند - جسم یاخته آن‌ها در حدفاصل بین دو غلاف میلین است.",
      "تنها یک آکسون - همواره دارای غلاف میلین است.",
      "آکسون بلند - همواره پوششی به نام غلاف میلین دارد."
    ],
    correctIndex: 0,
    answer: "نورون‌های حسی (که اطلاعات را به دستگاه عصبی مرکزی وارد می‌کنند) دارای یک دندریت بلند و یک آکسون هستند، اما همانند سایر نورون‌ها با یاخته‌های پشتیبان در ارتباط‌اند. گزینه ۱ صحیح است."
  },
  {
    id: 70,
    section: "فصل اول: تنظیم عصبی",
    text: "کدام گزینه برای تکمیل عبارت زیر مناسب است؟ \"در بدن انسان، همۀ یاخته‌هایی که ......\"",
    options: [
      "دارینه‌ها و آسه‌های بلند را عایق‌بندی می‌کنند، در فاصله بین دو گره رانویه قرار گرفته‌اند.",
      "بافت عصبی مغز و نخاع را تشکیل می‌دهند، قادر به تغییر مقدار نوعی یون در خوانب هستند.",
      "با دارینه یاخته‌های عصبی حسی در ارتباط هستند، توسط غلاف ناپیوسته میلین پوشیده شده‌اند.",
      "از آلوده شدن نورون‌های مغزی توسط میکروب‌ها جلوگیری می‌کنند، جزء فراوان‌ترین یاخته‌های بافت عصبی هستند."
    ],
    correctIndex: 1,
    answer: "آستروسیت‌ها (نوعی یاخته پشتیبان) با تشکیل سد خونی-مغزی از نورون‌ها در برابر میکروب‌ها محافظت می‌کنند و یاخته‌های پشتیبان در کل، فراوان‌ترین یاخته‌های بافت عصبی هستند. گزینه 2 صحیح است."
  },
  {
    id: 82,
    section: "فصل اول: تنظیم عصبی",
    text: "کدام عبارت درست است؟",
    options: [
      "سرعت هدایت پیام عصبی در همۀ بخش‌های نورون رابط یکسان است.",
      "انتقال پیام بین دندریت نورون حسی و حرکتی نوعی انتقال شیمیایی محسوب می‌شود.",
      "بخش‌های میلین‌دار هر نورون به واسطۀ انتقال جهشی، زمان ارسال هر پیام را کاهش می‌دهد.",
      "فقط آکسون نورون‌ها توانایی انتقال پیام عصبی را دارد."
    ],
    correctIndex: 3,
    answer: "غلاف میلین با ایجاد انتقال جهشی پیام در گره‌های رانویه، سرعت هدایت و در نتیجه زمان ارسال پیام را کاهش می‌دهد (پیام سریع‌تر منتقل می‌شود). گزینه 4 صحیح است."
  },
  {
    id: 116,
    section: "فصل اول: تنظیم عصبی",
    text: "کدام عبارت، در رابطه با هدایت پیام در طول عصب تعادلی - شنوایی انسان، به درستی بیان شده است؟",
    options: [
      "هدایت پیام در این عصب تا رسیدن به پایانه آکسونی همواره به صورت جهشی رخ می‌دهد",
      "در بخشی از عصب که محل انجام سوخت وساز یاخته‌ای می‌باشد، ناقل‌های عصبی تولید می‌شوند",
      "در حین هدایت پیام، در یک یاخته امکان باز بودن هم‌زمان کانال‌های دریچه‌دار سدیمی و پتاسیمی وجود ندارد",
      "بخشی از این فرآیند، مرتبط با آزادکردن محتویات ریزکیسه‌های حاوی ناقل‌های عصبی از پایانه آکسونی می‌باشد"
    ],
    correctIndex: 0,
    answer: "در پایانه آکسونی، با رسیدن پیام عصبی، ریزکیسه‌های حاوی ناقل عصبی با غشا ادغام شده (اگزوسیتوز) و محتویات خود را در فضای سیناپسی آزاد می‌کنند. گزینه 1 صحیح است."
  }
];

export default function ZistShenasi2ExamPage() {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 دقیقه برای 10 سوال
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [imageErrors, setImageErrors] = useState<{[key: number]: boolean}>({});

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
  }, [selectedAnswers]); // questions از وابستگی‌ها حذف شد چون بیرون از کامپوننت است

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp || isScoreCalculated) return;
    setSelectedAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
      isCalculatedRef.current = false;
    }
  };

  const handleImageError = (qId: number) => {
    setImageErrors(prev => ({ ...prev, [qId]: true }));
  };

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
      width: '100vw', minHeight: '100vh', padding: '15px 10px',
      backgroundColor: '#f8f9fa', direction: 'rtl', textAlign: 'right',
      boxSizing: 'border-box', overflowX: 'hidden'
    }}>
      <div style={{
        backgroundColor: '#1565C0', color: 'white', padding: '20px',
        borderRadius: '8px', marginBottom: '30px', textAlign: 'center',
        position: 'relative'
      }}>
        <button
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half/zist-shenasi-2-tajrobi')}
          style={{
            position: 'absolute', left: '20px', top: '20px',
            padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.2)',
            color: 'white', border: 'none', borderRadius: '6px',
            cursor: 'pointer', fontSize: '14px'
          }}
        >← بازگشت</button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧠 آزمون زیست‌شناسی (۲)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>
              فصل اول: تنظیم عصبی - {questions.length} سوال - پاسخ داده شده: {answeredCount}/{questions.length}
            </p>
          </div>
          <div style={{
            backgroundColor: isTimeUp ? '#dc3545' : 'rgba(255,255,255,0.15)',
            padding: '10px 25px', borderRadius: '50px', fontSize: '24px',
            fontWeight: 'bold', fontFamily: 'monospace',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? '⏰ تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => {
          const ImgComp = q.ImageComponent;
          return (
            <div key={q.id} style={{
              marginBottom: '25px', backgroundColor: '#ffffff',
              padding: '20px 25px', borderRadius: '8px',
              border: '1px solid #e9ecef', boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
            }}>
              <div style={{
                display: 'inline-block', backgroundColor: '#e3f2fd',
                color: '#1565C0', padding: '4px 14px', borderRadius: '20px',
                fontSize: '12px', fontWeight: 'bold', marginBottom: '12px'
              }}>{q.section}</div>
              <div style={{
                fontSize: '17px', lineHeight: '1.9', marginBottom: '20px',
                fontWeight: '500', display: 'flex', alignItems: 'flex-start',
                whiteSpace: 'pre-wrap'
              }}>
                <span style={{
                  display: 'inline-block', backgroundColor: '#1565C0',
                  color: 'white', width: '30px', height: '30px',
                  textAlign: 'center', lineHeight: '30px', borderRadius: '50%',
                  fontSize: '14px', marginLeft: '15px', flexShrink: 0, marginTop: '2px'
                }}>{index + 1}</span>
                <span>{q.text}</span>
              </div>

              {ImgComp && (
                <div style={{
                  marginBottom: '20px', display: 'flex',
                  justifyContent: 'center', backgroundColor: '#f8f9fa',
                  padding: '15px', borderRadius: '10px',
                  border: '1px solid #e9ecef', overflowX: 'auto'
                }}>
                  <ImgComp />
                </div>
              )}

              {q.Image && !ImgComp && (
                <div style={{
                  marginBottom: '20px', display: 'flex',
                  justifyContent: 'center', backgroundColor: '#f8f9fa',
                  padding: '15px', borderRadius: '10px',
                  border: '1px solid #e9ecef', minHeight: '180px',
                  alignItems: 'center'
                }}>
                  {imageErrors[q.id] ? (
                    <div style={{ textAlign: 'center', color: '#6c757d', fontSize: '14px', padding: '30px' }}>
                      <div style={{ fontSize: '40px', marginBottom: '10px' }}>🖼️</div>
                      <p style={{ margin: 0, fontWeight: 'bold' }}>تصویر شکل این سوال</p>
                    </div>
                  ) : (
                    <img
                      src={q.Image}
                      alt={`شکل سوال ${index + 1}`}
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
                    <button key={idx} onClick={() => handleOptionClick(q.id, idx)} disabled={isDisabled}
                      style={{
                        display: 'flex', alignItems: 'center', padding: '12px 18px',
                        border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
                        borderRadius: '10px', backgroundColor: isSelected ? '#e3f2fd' : '#fff',
                        cursor: isDisabled ? 'not-allowed' : 'pointer', fontSize: '15px',
                        textAlign: 'right', transition: 'all 0.2s', width: '100%',
                        opacity: isDisabled && !isSelected ? 0.6 : 1
                      }}>
                      <span style={{
                        display: 'inline-block', width: '28px', height: '28px',
                        border: '1px solid #000', borderRadius: '50%',
                        textAlign: 'center', lineHeight: '28px', fontSize: '14px',
                        marginLeft: '15px', backgroundColor: isSelected ? '#1565C0' : '#fff',
                        color: isSelected ? '#fff' : '#000', flexShrink: 0
                      }}>{String.fromCharCode(65 + idx)}</span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{
          marginTop: '30px', marginBottom: '30px', padding: '20px',
          backgroundColor: '#ffffff', borderRadius: '12px',
          border: '1px solid #dee2e6', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          textAlign: 'center'
        }}>
          {!isScoreCalculated ? (
            <div>
              <button onClick={() => { if (canCalculate) calculateScore(); }}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px', fontSize: '18px',
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
                  color: '#fff', border: 'none', borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold', opacity: canCalculate ? 1 : 0.6
                }}>
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
                ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '28px' }}>{Math.round(score!)}%</span>
                {isTimeUp && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
              </div>
              <div style={{
                width: '80%', maxWidth: '400px', height: '20px',
                backgroundColor: '#e9ecef', borderRadius: '10px',
                overflow: 'hidden', margin: '15px auto'
              }}>
                <div style={{
                  width: `${score}%`, height: '100%',
                  backgroundColor: getScoreColor(score!),
                  transition: 'width 0.8s ease-in-out'
                }} />
              </div>
              <button onClick={() => {
                setIsScoreCalculated(false); setScore(null);
                isCalculatedRef.current = false; isTimeUpRef.current = false;
              }} style={{
                padding: '10px 25px', fontSize: '14px',
                backgroundColor: '#ff9800', color: '#fff',
                border: 'none', borderRadius: '50px', cursor: 'pointer',
                fontWeight: 'bold', marginTop: '10px'
              }}>🔄 تغییر پاسخ‌ها</button>
            </div>
          )}
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px', fontSize: '18px',
              backgroundColor: showAnswers ? '#dc3545' : '#28a745',
              color: '#fff', border: 'none', borderRadius: '50px',
              cursor: 'pointer', fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)', transition: 'all 0.2s'
            }}>
            {showAnswers ? "❌ بستن پاسخنامه" : "📄 مشاهده پاسخنامه تشریحی"}
          </button>
        </div>

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
            }}>📝 پاسخنامه تشریحی</h2>
            {questions.map((q, index) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctIndex;
              const ImgComp = q.ImageComponent;
              return (
                <div key={q.id} style={{
                  marginBottom: '35px', borderBottom: '1px dashed #ced4da',
                  paddingBottom: '25px'
                }}>
                  <div style={{ fontSize: '16px', lineHeight: '2' }}>
                    <span style={{
                      fontWeight: 'bold', color: '#1565C0',
                      backgroundColor: '#e3f2fd', padding: '5px 15px',
                      borderRadius: '20px', display: 'inline-block', marginBottom: '10px'
                    }}>سوال {index + 1} - {q.section}</span>
                    <br />
                    {ImgComp && (
                      <div style={{
                        marginBottom: '15px', display: 'flex',
                        justifyContent: 'center', backgroundColor: '#f8f9fa',
                        padding: '10px', borderRadius: '8px', overflowX: 'auto'
                      }}>
                        <ImgComp />
                      </div>
                    )}
                    {q.Image && !ImgComp && !imageErrors[q.id] && (
                      <div style={{
                        marginBottom: '15px', display: 'flex',
                        justifyContent: 'center', backgroundColor: '#f8f9fa',
                        padding: '10px', borderRadius: '8px'
                      }}>
                        <img src={q.Image} alt={`سوال ${q.id}`}
                          style={{ maxWidth: '100%', maxHeight: '250px', objectFit: 'contain', borderRadius: '6px' }} />
                      </div>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span>
                    <span style={{ fontSize: '15px', marginRight: '5px' }}>{q.options[q.correctIndex]}</span>
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
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح:</span>
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333', whiteSpace: 'pre-wrap' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {showAnswers && !isScoreCalculated && (
          <div style={{
            textAlign: 'center', padding: '30px', backgroundColor: '#fff3cd',
            borderRadius: '12px', border: '1px solid #ffc107'
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