"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson4 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۲-۴: عناصر به چه شکلی در طبیعت یافت می‌شوند؟ =================
  const questions = [
    {
      id: 196,
      text: "چند مورد از مطالب زیر درست است؟\n- یکی از روش‌های بیرون کشیدن فلز از معدن یا خاک، گیاه‌پالایی است.\n- گیاه‌پالایی برای استخراج فلزات کمیاب مانند روی و نیکل، مناسب و مقرون‌به‌صرفه است.\n- تیتانیوم برخلاف طلا، محکم است و برای استخراج آن، از آهن و منیزیم استفاده می‌شود.\n- آلایندۀ حاصل از استخراج مس طی واکنش Cu₂S با گاز اکسیژن، در فرآورده‌های حاصل از سوختن زغال‌سنگ نیز دیده می‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه 3 درست است. ۲ مورد (اول و چهارم) درست هستند."
    },
    {
      id: 197,
      text: "چند مورد از عبارت‌های زیر درست هستند؟\nالف) آهن در طبیعت به صورت کانه بوکسیت (Fe₃O₄) یافت می‌شود.\nب) خواص فیزیکی شبه فلزها، بیشتر به فلزها شبیه بوده، درحالی‌که رفتار شیمیایی آن‌ها همانند نافلزها است.\nپ) بازیافت فلزها رد پای کربن دی‌اکسید را کاهش می‌دهد و سبب کاهش سرعت گرمایش جهانی می‌شود.\nت) از بازگردانی هفت قوطی فولادی آنقدر انرژی ذخیره می‌شود که می‌توان پنج لامپ ۶۰ واتی را در حدود ۲۴ ساعت روشن نگه داشت.\nث) در تولید لامپ چراغ‌های عقب خودروها از هالوژن‌ها استفاده می‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه 2 درست است. ۳ مورد (ب، پ، ث) درست هستند."
    },
    {
      id: 200,
      text: "چند مورد از موارد زیر درست است؟\nالف) نخستین عنصر دورۀ چهارم جدول دوره‌ای عناصر در تلویزیون‌های رنگی و برخی شیشه‌ها کاربرد دارد.\nب) برخی فلزات مانند نقره، طلا و پلاتین به‌صورت رگه‌هایی لابه‌لای خاک در طبیعت یافت می‌شوند.\nپ) نخستین عنصری که لایه سوم اتم آن از الکترون پر می‌شود، واکنش‌پذیری کمتری نسبت به دومین عنصری که لایه سوم آن از الکترون پر می‌شود، دارد.\nت) عنصرهای جدول دوره‌ای را می‌توان بر اساس بنیادی‌ترین ویژگی آن‌ها، یعنی عدد اتمی (Z) در سه دسته شامل فلز، نافلز و شبه‌فلز جای داد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "گزینه 4 درست است. فقط مورد (الف) درست است."
    },
    {
      id: 201,
      text: "پاسخ دو سوال \"الف\" و \"ب\" در کدام گزینه به درستی آمده است؟\nالف) درصورتی که در پالایش طلا به کمک گیاهان در هر هکتار بتوان ۲۰ تن گیاه برداشت کرد و بیشترین مقدار فلز طلا در یک کیلوگرم از گیاه ۱/۰ گرم باشد در هر هکتار چند کیلوگرم طلا از زمین بیرون کشیده می‌شود؟\nب) درصد کدام فلز در گیاهانی که آن را جذب می‌کنند کمتر از درصد آن فلز در سنگ معدن است؟",
      options: ["Ni, ۲", "Zn, ۲", "Ni, ۱", "Zn, ۱"],
      correctIndex: 1,
      answer: "گزینه 2 درست است. پاسخ الف: ۲ کیلوگرم طلا. پاسخ ب: درصد فلز نیکل (Ni) در گیاه کمتر از سنگ معدن آن است."
    },
    {
      id: 202,
      text: "چند مورد از عنصرهای پیشنهادی برای تکمیل جملۀ زیر مناسب است؟\n\"عنصرهایی همانند ...... به شکل آزاد در طبیعت یافت نمی‌شوند.\"\n- هیدروژن - گوگرد - پلاتین - نیتروژن\n- سدیم - کلر - مس - کربن",
      options: ["۲", "۳", "۴", "۵"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۳ مورد (هیدروژن، سدیم، کلر) به شکل آزاد در طبیعت یافت نمی‌شوند."
    },
    {
      id: 203,
      text: "در مورد فلز طلا (Au) چند مورد از عبارت‌های زیر صحیح است؟\n- در میان فلزها، تنها طلا به شکل کلوخه‌ها یا رگه‌های زرد لایه‌ای خاک یافت می‌شود.\n- در طبیعت به شکل فلزی و عنصری خود نیز یافت می‌شود.\n- چند گرم از آن را با چکش‌کاری می‌توان به صفحه‌ای با مساحت چند متر مربع تبدیل کرد.\n- رسانایی الکتریکی بالای آن در شرایط دمایی گوناگون حفظ نمی‌شود.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه 2 درست است. ۳ مورد صحیح هستند (سه مورد اول)."
    },
    
    {
      id: 205,
      text: "چه تعداد از گزاره‌های زیر درست هستند؟\nالف) همۀ فلزات در طبیعت به صورت ترکیبات یونی همچون اکسیدها، کربنات‌ها و ... یافت می‌شوند.\nب) سرخی یاقوت و سبزی زمرد مربوط به وجود فلزات اصلی در ترکیبات آن‌ها است.\nپ) سدیم فلزی نرم است که با چاقو بریده می‌شود و در هوا به آرامی رنگش تیره می‌شود.\nت) رسانایی الکتریسیته و گرما از ویژگی‌های مشترک میان تمام فلزات است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه 3 درست است. فقط ۱ گزاره (پ) درست است."
    },
    {
      id: 206,
      text: "چند مورد از مطالب زیر، جمله داده شده را به نادرستی تکمیل می‌کند؟\nدر هیدروکسیدهای عنصری که بیشترین مصرف سالانه را در میان فلزات دارد، نسبت شمار آنیون‌های رسوب سرخ به آنیون‌های رسوب سبز، ...... از نسبت شمار ...... به ...... در ...... است.\n- بیشتر / آنیون‌ها / کاتیون‌ها / کلسیم فسفات\n- بیشتر / کاتیون‌ها / آنیون‌ها / آهن (II) سولفات\n- برابر / آنیون‌ها / کاتیون‌ها / آهن (III) کربنات",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه ۳ درست است. ۳ مورد جمله را به نادرستی تکمیل می‌کنند."
    },
    {
      id: 207,
      text: "چند مورد از عبارت‌های پیشنهادی برای تکمیل جملهٔ زیر مناسب است؟\n\"آهن فلزی است که ......\"\nالف) در سطح جهان دارای بیشترین مصرف سالانه در بین صنایع گوناگون است.\nب) در طبیعت فقط به شکل هماتیت یافت می‌شود.\nپ) دارای دو نوع یون با بارهای الکتریکی ۲+ و ۳+ است.\nت) ترکیب‌های دارای آن در آب نامحلول ولی در اسیدها محلول هستند.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است. ۲ مورد (الف و پ) مناسب هستند."
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 درس ۲-۴: عناصر به چه شکلی در طبیعت یافت می‌شوند؟</h1>
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
              📝 پاسخنامه تشریحی - درس ۲-۴: عناصر به چه شکلی در طبیعت یافت می‌شوند؟
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

export default Shimi2lesson4;