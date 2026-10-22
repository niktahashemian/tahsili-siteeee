"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Arabic2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات عربی (۲) - جامع =================
  const questions = [
    // ==================== فصل اول: افعال و صرف ====================
    {
      id: 1,
      text: "فعل ماضی از چه ریشه‌ای ساخته می‌شود؟",
      options: ["ماضی", "مضارع", "امر", "مصدر"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل ماضی از ریشه ماضی ساخته می‌شود که به گذشته اشاره دارد."
    },
    {
      id: 2,
      text: "شناسه فعل ماضی برای ضمیر 'هُوَ' چیست؟",
      options: ["تُ", "تَ", "َ", "نَا"],
      correctIndex: 2,
      answer: "گزینه ۳: برای ضمیر هُوَ (مفرد مذکر غایب)، شناسه فعل ماضی 'َ' است (مثلاً: كَتَبَ)."
    },
    {
      id: 3,
      text: "فعل امر از چه زبانی ساخته می‌شود؟",
      options: ["ماضی", "مضارع", "مصدر", "اسم فاعل"],
      correctIndex: 1,
      answer: "گزینه ۲: فعل امر از مضارع ساخته می‌شود و برای دستور دادن استفاده می‌شود."
    },
    {
      id: 4,
      text: "فعل 'يَكْتُبُ' در چه صرفی است؟",
      options: ["ماضی", "مضارع", "امر", "نهی"],
      correctIndex: 1,
      answer: "گزینه ۲: 'يَكْتُبُ' فعل مضارع است که به زمان حال و آینده اشاره دارد."
    },
    {
      id: 5,
      text: "فعل معتل به چه فعل‌هایی گفته می‌شود؟",
      options: ["فعل‌هایی که حرف عله دارند", "فعل‌های سالم", "فعل‌های ناقص", "فعل‌های رباعی"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل معتل به فعل‌هایی گفته می‌شود که در ریشه آنها یکی از حروف عله (ا، و، ی) وجود دارد."
    },
    {
      id: 6,
      text: "صرف فعل مضارع برای ضمیر 'أَنَا' چگونه است؟",
      options: ["أَكْتُبُ", "نَكْتُبُ", "يَكْتُبُ", "تَكْتُبُ"],
      correctIndex: 0,
      answer: "گزینه ۱: برای ضمیر أَنَا (متکلم وحده)، فعل مضارع با 'أ' شروع می‌شود: أَكْتُبُ."
    },

    // ==================== فصل دوم: اعراب و نحو ====================
    {
      id: 7,
      text: "علامت اصلی رفع در اسم‌های مفرد چیست؟",
      options: ["ضَمَّة", "فَتْحَة", "كَسْرَة", "سُكُون"],
      correctIndex: 0,
      answer: "گزینه ۱: علامت اصلی رفع در اسم‌های مفرد، ضَمَّة است."
    },
    {
      id: 8,
      text: "مفعول به چه علامت اعرابی دارد؟",
      options: ["رفع", "نصب", "جر", "جزم"],
      correctIndex: 1,
      answer: "گزینه ۲: مفعول به همواره منصوب است و علامت نصب دارد."
    },
    {
      id: 9,
      text: "فاعل در جمله چه علامت اعرابی دارد؟",
      options: ["رفع", "نصب", "جر", "جزم"],
      correctIndex: 0,
      answer: "گزینه ۱: فاعل در جمله همواره مرفوع است."
    },
    {
      id: 10,
      text: "در جمله 'اَلطَّالِبُ مُجْتَهِدٌ'، مبتدا و خبر کدامند؟",
      options: ["اَلطَّالِبُ = مبتدا، مُجْتَهِدٌ = خبر", "مُجْتَهِدٌ = مبتدا، اَلطَّالِبُ = خبر", "هر دو مبتدا", "هر دو خبر"],
      correctIndex: 0,
      answer: "گزینه ۱: در جمله اسمیه، اَلطَّالِبُ مبتدا و مُجْتَهِدٌ خبر است."
    },
    {
      id: 11,
      text: "علامت نصب در جمع مذکر سالم چیست؟",
      options: ["ضَمَّة", "فَتْحَة", "كَسْرَة", "یاء"],
      correctIndex: 3,
      answer: "گزینه ۴: علامت نصب در جمع مذکر سالم، 'یاء' است (مثلاً: مُعَلِّمِينَ)."
    },
    {
      id: 12,
      text: "در جمله 'مَرَرْتُ بِالرَّجُلِ'، 'بِالرَّجُلِ' چه نقشی دارد؟",
      options: ["مفعول به", "مجرور", "فاعل", "خبر"],
      correctIndex: 1,
      answer: "گزینه ۲: 'بِالرَّجُلِ' مجرور است زیرا حرف جر 'بِ' بر آن وارد شده است."
    },

    // ==================== فصل سوم: ترجمه و درک مطلب ====================
    {
      id: 13,
      text: "ترجمه صحیح 'ذَهَبَ الرَّجُلُ إِلَى الْبَيْتِ' چیست؟",
      options: ["مرد به خانه رفت", "مرد از خانه رفت", "مرد در خانه بود", "مرد خانه را دید"],
      correctIndex: 0,
      answer: "گزینه ۱: 'ذَهَبَ' به معنی رفت، 'الرَّجُلُ' به معنی مرد و 'إِلَى الْبَيْتِ' به معنی به خانه است."
    },
    {
      id: 14,
      text: "معنی کلمه 'مَدْرَسَة' چیست؟",
      options: ["مدرسه", "دانشگاه", "خانه", "مسجد"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مَدْرَسَة' به معنی مدرسه است."
    },
    {
      id: 15,
      text: "ترجمه 'اَلْكِتَابُ جَدِيدٌ' چیست؟",
      options: ["کتاب جدید است", "کتاب قدیمی است", "کتاب را خواندم", "کتاب خوب است"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اَلْكِتَابُ' یعنی کتاب، 'جَدِيدٌ' یعنی جدید → کتاب جدید است."
    },
    {
      id: 16,
      text: "معنی 'يَشْرَبُ الْوَلَدُ اللَّبَنَ' چیست؟",
      options: ["پسر شیر می‌خورد", "پسر آب می‌خورد", "پسر می‌خورد شیر", "پسر شیر را دید"],
      correctIndex: 0,
      answer: "گزینه ۱: 'يَشْرَبُ' می‌خورد، 'الْوَلَدُ' پسر، 'اللَّبَنَ' شیر → پسر شیر می‌خورد."
    },
    {
      id: 17,
      text: "کلمه 'مُعَلِّم' در عربی به چه معناست؟",
      options: ["معلم", "دانش‌آموز", "مدیر", "نویسنده"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مُعَلِّم' به معنی معلم و آموزگار است."
    },
    {
      id: 18,
      text: "ترجمه 'اَلشَّمْسُ مُشْرِقَةٌ' چیست؟",
      options: ["خورشید درخشان است", "خورشید گرم است", "خورشید زیبا است", "خورشید بزرگ است"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اَلشَّمْسُ' خورشید، 'مُشْرِقَةٌ' درخشان → خورشید درخشان است."
    },

    // ==================== فصل چهارم: تحلیل صرفی و نحوی ====================
    {
      id: 19,
      text: "وزن کلمه 'مَكْتُوب' چیست؟",
      options: ["مَفْعُول", "مَفْعَل", "مُفْعَل", "فَعِيل"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مَكْتُوب' از وزن 'مَفْعُول' است که اسم مفعول را نشان می‌دهد."
    },
    {
      id: 20,
      text: "اسم فاعل از چه ریشه‌ای ساخته می‌شود؟",
      options: ["ماضی", "مضارع", "امر", "مصدر"],
      correctIndex: 1,
      answer: "گزینه ۲: اسم فاعل از مضارع ساخته می‌شود با تبدیل حرف مضارعه به میم مضموم."
    },
    {
      id: 21,
      text: "وزن 'مُعَلِّم' در صرف عربی چیست؟",
      options: ["مُفَعِّل", "مُفَعَّل", "مُفْعَل", "فَعَّال"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مُعَلِّم' از وزن 'مُفَعِّل' است که اسم فاعل باب تفعیل را نشان می‌دهد."
    },
    {
      id: 22,
      text: "کلمه 'مَسْجِد' از چه وزنی است؟",
      options: ["مَفْعَل", "مَفْعِل", "مُفْعَل", "مُفْعِل"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مَسْجِد' از وزن 'مَفْعَل' است که مکان را نشان می‌دهد (مکان سجود)."
    },
    {
      id: 23,
      text: "اسم مفعول از چه ساختاری ساخته می‌شود؟",
      options: ["مَفْعُول", "مُفْعَل", "فَاعِل", "فَعِيل"],
      correctIndex: 0,
      answer: "گزینه ۱: اسم مفعول معمولاً از وزن 'مَفْعُول' ساخته می‌شود."
    },
    {
      id: 24,
      text: "حرف 'لِ' در جمله چه نقشی دارد؟",
      options: ["حرف جر", "حرف عطف", "حرف نفی", "حرف استفهام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'لِ' یکی از حروف جر است و به معنی 'برای' یا 'مالِ' است."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "فعل نهی از چه ساختاری ساخته می‌شود؟",
      options: ["لا + فعل مضارع", "لا + فعل ماضی", "لا + فعل امر", "ما + فعل مضارع"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل نهی با اضافه شدن 'لا' به فعل مضارع ساخته می‌شود (مثلاً: لا تَكْتُبْ)."
    },
    {
      id: 26,
      text: "فعل 'قَالَ' از چه نوع فعلی است؟",
      options: ["سالم", "معتل", "ناقص", "مهموز"],
      correctIndex: 1,
      answer: "گزینه ۲: 'قَالَ' از افعال معتل است زیرا در ریشه آن حرف عله (ا) وجود دارد."
    },
    {
      id: 27,
      text: "در فعل مضارع، ضمیر 'هُمْ' چه شناسه‌ای دارد؟",
      options: ["ُونَ", "ِينَ", "ُونَ", "ُونَ"],
      correctIndex: 0,
      answer: "گزینه ۱: برای ضمیر هُمْ، شناسه فعل مضارع 'ُونَ' است (مثلاً: يَكْتُبُونَ)."
    },
    {
      id: 28,
      text: "فعل 'دَعَا' در ماضی چه نوع فعلی است؟",
      options: ["سالم", "معتل", "ناقص", "مهموز"],
      correctIndex: 2,
      answer: "گزینه ۳: 'دَعَا' فعل ناقص است زیرا به حرف عله (ا) ختم می‌شود."
    },
    {
      id: 29,
      text: "علامت جر در اسم‌های مفرد چیست؟",
      options: ["ضَمَّة", "فَتْحَة", "كَسْرَة", "سُكُون"],
      correctIndex: 2,
      answer: "گزینه ۳: علامت جر در اسم‌های مفرد، كَسْرَة است."
    },
    {
      id: 30,
      text: "منصوبات شامل چه مواردی هستند؟",
      options: ["مفعول به و مفعول مطلق", "مفعول فیه و حال", "تمیز و مستثنی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: منصوبات شامل مفعول به، مفعول مطلق، مفعول فیه، حال، تمیز و مستثنی هستند."
    },
    {
      id: 31,
      text: "اعراب فرعی در کدام موارد استفاده می‌شود؟",
      options: ["جمع مذکر سالم", "اسم تفضیل", "اسم منقوص", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اعراب فرعی در جمع مذکر سالم، اسم تفضیل و اسم منقوص استفاده می‌شود."
    },
    {
      id: 32,
      text: "در جمله 'إِنَّ اللهَ عَلِيمٌ'، 'إِنَّ' چه نوع حرفی است؟",
      options: ["حرف نافی", "حرف شرطی", "حرف مشبه بالفعل", "حرف عطف"],
      correctIndex: 2,
      answer: "گزینه ۳: 'إِنَّ' از حروف مشبه بالفعل است که اسم را نصب و خبر را رفع می‌دهد."
    },
    {
      id: 33,
      text: "مبتدا و خبر چه نوع ارکانی در جمله هستند؟",
      options: ["جمله فعلیه", "جمله اسمیه", "جمله شرطیه", "جمله استفهامیه"],
      correctIndex: 1,
      answer: "گزینه ۲: مبتدا و خبر ارکان جمله اسمیه هستند."
    },
    {
      id: 34,
      text: "نائب فاعل در جمله مجهول چه نقشی دارد؟",
      options: ["فاعل واقعی", "جایگزین فاعل", "مفعول", "حال"],
      correctIndex: 1,
      answer: "گزینه ۲: نائب فاعل در جمله مجهول جایگزین فاعل می‌شود و مرفوع است."
    },
    {
      id: 35,
      text: "معنی 'كَيْفَ حَالُكَ' چیست؟",
      options: ["حالت چطور است؟", "کجا هستی؟", "چی کار می‌کنی؟", "اسمت چیست؟"],
      correctIndex: 0,
      answer: "گزینه ۱: 'كَيْفَ' یعنی چگونه، 'حَالُكَ' یعنی حالت → حالت چطور است؟"
    },
    {
      id: 36,
      text: "ترجمه 'أُحِبُّ الْعِلْمَ' چیست؟",
      options: ["من علم را دوست دارم", "من علم می‌آموزم", "من عالم هستم", "من کتاب را دوست دارم"],
      correctIndex: 0,
      answer: "گزینه ۱: 'أُحِبُّ' من دوست دارم، 'الْعِلْمَ' علم را → من علم را دوست دارم."
    },
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
        backgroundColor: '#1565C0',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/arabi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📚 آزمون جامع عربی (۲)</h1>
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
                backgroundColor: '#1565C0',
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
                      border: isSelected ? '3px solid #1565C0' : '1px solid #dee2e6',
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
                      backgroundColor: isSelected ? '#1565C0' : '#fff',
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
                  backgroundColor: canCalculate ? '#1565C0' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1565C0' }}>
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
            borderTop: '4px solid #1565C0',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #1565C0', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1565C0'
            }}>
              📝 پاسخنامه تشریحی عربی (۲)
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
                      color: '#1565C0',
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
                    <span style={{ fontWeight: 'bold', color: '#1565C0' }}>📖 توضیح:</span> 
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

export default Arabic2FinalExam;