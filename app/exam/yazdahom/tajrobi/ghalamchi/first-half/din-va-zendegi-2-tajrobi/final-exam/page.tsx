"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const DinVZendegi2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);

  // ================= سوالات آزمون جامع دین و زندگی (۲) =================
  const questions = [
    // ==================== فصل اول: خداوند، جهان و انسان ====================
    {
      id: 1,
      text: "کدام یک از موارد زیر از براهین اثبات وجود خداوند است؟",
      options: ["برهان نظم", "برهان امکان و وجوب", "برهان فطرت", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: برهان نظم، برهان امکان و وجوب، برهان فطرت از مهم‌ترین براهین اثبات وجود خدا هستند."
    },
    {
      id: 2,
      text: "توحید ذاتی به چه معناست؟",
      options: ["یگانگی خداوند در ذات", "یگانگی خداوند در صفات", "یگانگی خداوند در افعال", "یگانگی خداوند در عبادت"],
      correctIndex: 0,
      answer: "توحید ذاتی یعنی خداوند در ذات خود یکتا و بی‌نظیر است و هیچ شریکی ندارد."
    },
    {
      id: 3,
      text: "آیه 'وَفِي أَنفُسِكُمْ أَفَلَا تُبْصِرُونَ' به کدام موضوع اشاره دارد؟",
      options: ["شناخت خدا از طریق طبیعت", "شناخت خدا از طریق وجود خود انسان", "شناخت خدا از طریق عقل", "شناخت خدا از طریق وحی"],
      correctIndex: 1,
      answer: "این آیه به شناخت خدا از طریق وجود خود انسان اشاره دارد و نشان می‌دهد که انسان با تأمل در وجود خود می‌تواند به خدا پی ببرد."
    },
    {
      id: 4,
      text: "کرامت ذاتی انسان به چه معناست؟",
      options: ["کرامتی که انسان با اعمال خود به دست می‌آورد", "کرامتی که خداوند به همه انسان‌ها عطا کرده است", "کرامتی که فقط مومنان دارند", "کرامتی که فقط پیامبران دارند"],
      correctIndex: 1,
      answer: "کرامت ذاتی، کرامتی است که خداوند به همه انسان‌ها عطا کرده است و با ایمان و عمل صالح افزایش می‌یابد."
    },
    {
      id: 5,
      text: "فطرت در اصطلاح دینی به چه معناست؟",
      options: ["آفرینش اولیه انسان", "شناخت فطری خدا", "تمایل طبیعی به نیکی", "همه موارد"],
      correctIndex: 3,
      answer: "فطرت شامل آفرینش اولیه، شناخت فطری خدا و تمایل طبیعی به نیکی است."
    },
    // ==================== فصل دوم: راهنماشناسی و پیامبرشناسی ====================
    {
      id: 6,
      text: "ضرورت بعثت پیامبران چیست؟",
      options: ["هدایت بشر به سعادت", "تکمیل عقل انسان", "بیان احکام الهی", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: پیامبران برای هدایت بشر، تکمیل عقل و بیان احکام الهی مبعوث شده‌اند."
    },
    {
      id: 7,
      text: "نبوت خاصه به چه معناست؟",
      options: ["نبوت همه پیامبران", "نبوت حضرت محمد (ص)", "نبوت اولوالعزم", "نبوت انبیای بنی‌اسرائیل"],
      correctIndex: 1,
      answer: "نبوت خاصه به نبوت حضرت محمد (ص) و اثبات آن با دلایل خاص اشاره دارد."
    },
    {
      id: 8,
      text: "قرآن کریم از چه جهتی معجزه است؟",
      options: ["فصاحت و بلاغت", "اخبار غیبی", "نظم و هماهنگی", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: قرآن از نظر فصاحت و بلاغت، اخبار غیبی و نظم و هماهنگی معجزه است."
    },
    {
      id: 9,
      text: "کدام یک از موارد زیر از ویژگی‌های اخلاقی پیامبر اکرم (ص) است؟",
      options: ["رحمت و مهربانی", "صداقت و امانت", "تواضع و فروتنی", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: رحمت، صداقت، امانت، تواضع و فروتنی از ویژگی‌های بارز پیامبر اکرم (ص) است."
    },
    {
      id: 10,
      text: "آیه 'لَقَدْ كَانَ لَكُمْ فِي رَسُولِ اللَّهِ أُسْوَةٌ حَسَنَةٌ' به چه موضوعی اشاره دارد؟",
      options: ["اسوه بودن پیامبر", "لزوم اطاعت از پیامبر", "مهربانی پیامبر", "همه موارد"],
      correctIndex: 0,
      answer: "این آیه به اسوه بودن پیامبر اکرم (ص) برای همه مسلمانان اشاره دارد."
    },
    // ==================== فصل سوم: امامت و ولایت ====================
    {
      id: 11,
      text: "ضرورت امامت پس از پیامبر چیست؟",
      options: ["حفظ دین و شریعت", "اداره جامعه اسلامی", "هدایت معنوی مردم", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: امام برای حفظ دین، اداره جامعه و هدایت معنوی مردم ضروری است."
    },
    {
      id: 12,
      text: "عصمت امام به چه معناست؟",
      options: ["معصوم بودن از گناه", "معصوم بودن از خطا", "معصوم بودن از فراموشی", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: عصمت یعنی معصوم بودن از گناه، خطا و فراموشی."
    },
    {
      id: 13,
      text: "حدیث غدیر به کدام موضوع اشاره دارد؟",
      options: ["وصایت حضرت علی (ع)", "دعوت به نماز", "جهاد با کافران", "روزه‌داری"],
      correctIndex: 0,
      answer: "حدیث غدیر به وصایت و جانشینی حضرت علی (ع) پس از پیامبر اشاره دارد."
    },
    {
      id: 14,
      text: "فرهنگ انتظار چه نقشی در زندگی مسلمانان دارد؟",
      options: ["امید به آینده", "تلاش برای اصلاح خود", "آمادگی برای ظهور", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: فرهنگ انتظار باعث امید به آینده، تلاش برای اصلاح خود و آمادگی برای ظهور می‌شود."
    },
    {
      id: 15,
      text: "امام زمان (عج) در دوران غیبت چه وظیفه‌ای دارند؟",
      options: ["هدایت مردم از طریق علما", "اداره مستقیم جامعه", "ظهور و قیام", "هیچ کدام"],
      correctIndex: 0,
      answer: "امام زمان (عج) در دوران غیبت، مردم را از طریق علما و فقها هدایت می‌کنند."
    },
    // ==================== فصل چهارم: قیامت و حیات اخروی ====================
    {
      id: 16,
      text: "دلیل اصلی اثبات معاد چیست؟",
      options: ["عدل الهی", "حکمت الهی", "آیات قرآن", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: عدل الهی، حکمت الهی و آیات قرآن از دلایل اصلی اثبات معاد هستند."
    },
    {
      id: 17,
      text: "عالم برزخ چیست؟",
      options: ["جهان پس از مرگ تا قیامت", "جهان آخرت", "جهان قیامت", "جهان طبیعی"],
      correctIndex: 0,
      answer: "عالم برزخ، فاصله بین مرگ و قیامت است که انسان در آن زندگی می‌کند."
    },
    {
      id: 18,
      text: "عدل الهی به چه معناست؟",
      options: ["خداوند ظلم نمی‌کند", "خداوند پاداش و کیفر عادلانه می‌دهد", "خداوند حکیم است", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: عدل الهی یعنی خداوند ظلم نمی‌کند، عادلانه پاداش و کیفر می‌دهد و حکیم است."
    },
    {
      id: 19,
      text: "حیات طیبه به چه معناست؟",
      options: ["زندگی توأم با ایمان و عمل صالح", "زندگی مرفه", "زندگی طولانی", "زندگی همراه با سلامتی"],
      correctIndex: 0,
      answer: "حیات طیبه، زندگی توأم با ایمان و عمل صالح است که به سعادت اخروی منجر می‌شود."
    },
    {
      id: 20,
      text: "کدام یک از موارد زیر از نشانه‌های قیامت است؟",
      options: ["ظهور حضرت مهدی (عج)", "خروج سفیانی", "طلوع خورشید از مغرب", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: ظهور حضرت مهدی (عج)، خروج سفیانی و طلوع خورشید از مغرب از نشانه‌های قیامت هستند."
    },
    // ==================== سوالات ترکیبی ====================
    {
      id: 21,
      text: "کدام یک از موارد زیر از صفات الهی است؟",
      options: ["علم", "قدرت", "حیات", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: علم، قدرت و حیات از صفات ذاتی و کمالی خداوند هستند."
    },
    {
      id: 22,
      text: "هدف اصلی از آفرینش انسان چیست؟",
      options: ["عبادت و بندگی", "کسب علم", "ثروت‌اندوزی", "لذت‌جویی"],
      correctIndex: 0,
      answer: "هدف اصلی از آفرینش انسان، عبادت و بندگی خداوند است."
    },
    {
      id: 23,
      text: "کدام یک از موارد زیر از راه‌های شناخت خدا نیست؟",
      options: ["عقل", "وحی", "فطرت", "هوای نفس"],
      correctIndex: 3,
      answer: "هوای نفس راه شناخت خدا نیست، بلکه انسان را از حقیقت دور می‌کند."
    },
    {
      id: 24,
      text: "اولین پیامبر اولوالعزم چه کسی است؟",
      options: ["حضرت نوح (ع)", "حضرت ابراهیم (ع)", "حضرت موسی (ع)", "حضرت محمد (ص)"],
      correctIndex: 0,
      answer: "حضرت نوح (ع) اولین پیامبر اولوالعزم است."
    },
    {
      id: 25,
      text: "کدام سوره به توحید و یکتاپرستی تأکید دارد؟",
      options: ["سوره اخلاص", "سوره کافرون", "سوره توحید", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: سوره‌های اخلاص و کافرون به توحید و یکتاپرستی تأکید دارند."
    },
    {
      id: 26,
      text: "محور اصلی دعوت انبیا چیست؟",
      options: ["توحید و یکتاپرستی", "عدالت اجتماعی", "اخلاق فردی", "همه موارد"],
      correctIndex: 0,
      answer: "محور اصلی دعوت انبیا، توحید و یکتاپرستی است."
    },
    {
      id: 27,
      text: "کدام یک از موارد زیر از وظایف منتظران امام زمان (عج) است؟",
      options: ["خودسازی", "تلاش برای عدالت", "آمادگی برای ظهور", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: خودسازی، تلاش برای عدالت و آمادگی برای ظهور از وظایف منتظران است."
    },
    {
      id: 28,
      text: "ایمان به قیامت چه تأثیری در زندگی انسان دارد؟",
      options: ["مسئولیت‌پذیری", "عدالت‌محوری", "امید و تلاش", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: ایمان به قیامت باعث مسئولیت‌پذیری، عدالت‌محوری و امید و تلاش می‌شود."
    },
    {
      id: 29,
      text: "کدام یک از موارد زیر از اهداف بعثت پیامبران است؟",
      options: ["تزکیه و پاکسازی", "تعلیم و تربیت", "اقامه عدل", "همه موارد"],
      correctIndex: 3,
      answer: "همه موارد: تزکیه، تعلیم و اقامه عدل از اهداف بعثت پیامبران است."
    },
    {
      id: 30,
      text: "در قیامت چه چیزی باعث نجات انسان می‌شود؟",
      options: ["ایمان و عمل صالح", "ثروت", "نسبت خانوادگی", "همه موارد"],
      correctIndex: 0,
      answer: "ایمان و عمل صالح باعث نجات انسان در قیامت می‌شود."
    },
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // ========== تابع محاسبه درصد (با useCallback) ==========
  const calculateScore = useCallback(() => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setIsScoreCalculated(true);
  }, [selectedAnswers, questions]);

  // ========== تابع انتخاب گزینه ==========
  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp) return;

    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));

    if (isScoreCalculated) {
      setIsScoreCalculated(false);
      setScore(null);
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
          if (timerRef.current) clearInterval(timerRef.current);
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

  // ========== زمان تمام شد (اصلاح شده) ==========
  useEffect(() => {
    if (isTimeUp && !isScoreCalculated && !isTimeUpRef.current) {
      isTimeUpRef.current = true;
      // محاسبه نمره با یک تأخیر کوچک برای جلوگیری از خطای ESLint
      const timeoutId = setTimeout(() => {
        calculateScore();
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [isTimeUp, isScoreCalculated, calculateScore]);

  // ========== بررسی پاسخ‌دهی به همه سوالات ==========
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
        backgroundColor: '#1a237e',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/din-va-zendegi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📖 آزمون جامع دین و زندگی (۲)</h1>
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
              alignItems: 'flex-start'
            }}>
              <span style={{
                display: 'inline-block',
                backgroundColor: '#1a237e',
                color: 'white',
                width: '30px',
                height: '30px',
                textAlign: 'center',
                lineHeight: '30px',
                borderRadius: '50%',
                fontSize: '14px',
                marginLeft: '15px',
                flexShrink: 0
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
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={isTimeUp || isScoreCalculated}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #1a237e' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
                      cursor: (isTimeUp || isScoreCalculated) ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: (isTimeUp || isScoreCalculated) && !isSelected ? 0.6 : 1
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
                      backgroundColor: isSelected ? '#1a237e' : '#fff',
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
                onClick={calculateScore}
                disabled={!canCalculate}
                style={{
                  padding: '15px 40px',
                  fontSize: '18px',
                  backgroundColor: canCalculate ? '#1a237e' : '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '50px',
                  cursor: canCalculate ? 'pointer' : 'not-allowed',
                  fontWeight: 'bold',
                  opacity: canCalculate ? 1 : 0.6
                }}
              >
                {!isAllAnswered ? `✅ ${answeredCount}/${questions.length} پاسخ داده شده - ادامه دهید` : '📊 محاسبه درصد'}
              </button>
              {!isAllAnswered && !isTimeUp && (
                <p style={{ marginTop: '10px', color: '#666', fontSize: '14px' }}>
                  {questions.length - answeredCount} سوال دیگر باقی مانده است
                </p>
              )}
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1a237e' }}>
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
            borderTop: '4px solid #1a237e',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #1a237e', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1a237e'
            }}>
              📝 پاسخنامه تشریحی دین و زندگی (۲)
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
                      color: '#1a237e',
                      backgroundColor: '#e8eaf6',
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
                    <span style={{ fontWeight: 'bold', color: '#1a237e' }}>📖 توضیح:</span> 
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

export default DinVZendegi2FinalExam;