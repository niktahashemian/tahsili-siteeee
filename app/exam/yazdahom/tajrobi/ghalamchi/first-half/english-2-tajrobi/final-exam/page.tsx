"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const English2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات زبان انگلیسی (۲) - جامع =================
  const questions = [
    // ==================== فصل اول: Grammar (زمان‌ها) ====================
    {
      id: 1,
      text: "Which sentence is in Present Simple tense?",
      options: ["She goes to school every day", "She is going to school now", "She went to school yesterday", "She will go to school tomorrow"],
      correctIndex: 0,
      answer: "گزینه ۱: 'She goes to school every day' جمله‌ای در زمان حال ساده است که نشان‌دهنده کار روزمره است."
    },
    {
      id: 2,
      text: "What is the past tense of 'write'?",
      options: ["wrote", "written", "writing", "writes"],
      correctIndex: 0,
      answer: "گزینه ۱: گذشته فعل 'write'، 'wrote' است."
    },
    {
      id: 3,
      text: "Which sentence is in Present Continuous tense?",
      options: ["I am reading a book now", "I read books every day", "I have read this book", "I will read this book"],
      correctIndex: 0,
      answer: "گزینه ۱: 'I am reading a book now' جمله‌ای در زمان حال استمراری است که نشان‌دهنده عملی در حال انجام است."
    },
    {
      id: 4,
      text: "What is the correct form of 'to be' for 'He' in Present Simple?",
      options: ["is", "am", "are", "was"],
      correctIndex: 0,
      answer: "گزینه ۱: برای ضمیر 'He' در زمان حال ساده از 'is' استفاده می‌شود."
    },
    {
      id: 5,
      text: "Which sentence is in Future Simple tense?",
      options: ["She will travel to Paris next year", "She travels to Paris every year", "She traveled to Paris last year", "She is traveling to Paris now"],
      correctIndex: 0,
      answer: "گزینه ۱: 'She will travel to Paris next year' جمله‌ای در زمان آینده ساده است."
    },
    {
      id: 6,
      text: "What is the past participle of 'eat'?",
      options: ["eaten", "ate", "eating", "eats"],
      correctIndex: 0,
      answer: "گزینه ۱: اسم مفعول (past participle) فعل 'eat'، 'eaten' است."
    },

    // ==================== فصل دوم: Vocabulary (لغات) ====================
    {
      id: 7,
      text: "What is the meaning of 'environment'?",
      options: ["محیط زیست", "انرژی", "آب و هوا", "جمعیت"],
      correctIndex: 0,
      answer: "گزینه ۱: 'Environment' به معنی محیط زیست است."
    },
    {
      id: 8,
      text: "What is the synonym of 'beautiful'?",
      options: ["ugly", "pretty", "big", "small"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Pretty' مترادف 'beautiful' به معنی زیبا است."
    },
    {
      id: 9,
      text: "What does 'abundant' mean?",
      options: ["کم", "زیاد و فراوان", "نادر", "گران"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Abundant' به معنی زیاد و فراوان است."
    },
    {
      id: 10,
      text: "What is the meaning of 'responsible'?",
      options: ["بی‌مسئولیت", "مسئولیت‌پذیر", "بی‌خیال", "بی‌اهمیت"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Responsible' به معنی مسئولیت‌پذیر است."
    },
    {
      id: 11,
      text: "What does 'essential' mean?",
      options: ["غیرضروری", "ضروری و اساسی", "زیبا", "بزرگ"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Essential' به معنی ضروری و اساسی است."
    },
    {
      id: 12,
      text: "What is the opposite of 'ancient'?",
      options: ["old", "modern", "historic", "traditional"],
      correctIndex: 1,
      answer: "گزینه ۲: متضاد 'ancient' (قدیمی)، 'modern' (مدرن) است."
    },

    // ==================== فصل سوم: Reading Comprehension ====================
    {
      id: 13,
      text: "Read the text: 'Ali is a student. He studies at university. He likes reading books.' What does Ali like?",
      options: ["studying", "reading books", "teaching", "playing"],
      correctIndex: 1,
      answer: "گزینه ۲: علی به خواندن کتاب علاقه دارد ('He likes reading books')."
    },
    {
      id: 14,
      text: "What is the main idea of a text usually about?",
      options: ["The title", "The conclusion", "The main subject", "The author"],
      correctIndex: 2,
      answer: "گزینه ۳: ایده اصلی یک متن معمولاً درباره موضوع اصلی آن است."
    },
    {
      id: 15,
      text: "What does 'paragraph' mean?",
      options: ["جمله", "پاراگراف", "کلمه", "عنوان"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Paragraph' به معنی پاراگراف است."
    },
    {
      id: 16,
      text: "What is the purpose of reading comprehension questions?",
      options: ["To check understanding", "To memorize", "To write", "To speak"],
      correctIndex: 0,
      answer: "گزینه ۱: سوالات درک مطلب برای بررسی درک مطلب هستند."
    },
    {
      id: 17,
      text: "What does 'topic sentence' mean?",
      options: ["جمله اصلی پاراگراف", "جمله آخر", "جمله اول", "عنوان"],
      correctIndex: 0,
      answer: "گزینه ۱: 'Topic sentence' جمله اصلی پاراگراف است که موضوع آن را مشخص می‌کند."
    },
    {
      id: 18,
      text: "Which word is a synonym for 'difficult'?",
      options: ["easy", "hard", "simple", "clear"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Hard' مترادف 'difficult' به معنی دشوار است."
    },

    // ==================== فصل چهارم: Writing ====================
    {
      id: 19,
      text: "What is the correct word order in English sentences?",
      options: ["Subject + Verb + Object", "Verb + Subject + Object", "Object + Verb + Subject", "Subject + Object + Verb"],
      correctIndex: 0,
      answer: "گزینه ۱: ترتیب صحیح کلمات در جمله انگلیسی: Subject + Verb + Object است."
    },
    {
      id: 20,
      text: "What is the plural form of 'child'?",
      options: ["childs", "children", "childrens", "childes"],
      correctIndex: 1,
      answer: "گزینه ۲: جمع 'child'، 'children' است."
    },
    {
      id: 21,
      text: "Which sentence is grammatically correct?",
      options: ["She doesn't like coffee", "She don't like coffee", "She not like coffee", "She doesn't likes coffee"],
      correctIndex: 0,
      answer: "گزینه ۱: 'She doesn't like coffee' از نظر دستوری صحیح است."
    },
    {
      id: 22,
      text: "What is the correct spelling?",
      options: ["beautiful", "beautifull", "beutiful", "beutyful"],
      correctIndex: 0,
      answer: "گزینه ۱: 'Beautiful' املای صحیح کلمه است."
    },
    {
      id: 23,
      text: "Which one is a question word?",
      options: ["where", "book", "table", "big"],
      correctIndex: 0,
      answer: "گزینه ۱: 'Where' یک کلمه سوالی است."
    },
    {
      id: 24,
      text: "What is the opposite of 'happy'?",
      options: ["joyful", "sad", "excited", "glad"],
      correctIndex: 1,
      answer: "گزینه ۲: متضاد 'happy' (خوشحال)، 'sad' (ناراحت) است."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 25,
      text: "Which one is an adjective?",
      options: ["quickly", "quick", "quicken", "quickness"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Quick' یک صفت است که اسم را توصیف می‌کند."
    },
    {
      id: 26,
      text: "What is the meaning of 'global'?",
      options: ["محلی", "جهانی", "منطقه‌ای", "ملی"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Global' به معنی جهانی است."
    },
    {
      id: 27,
      text: "Which word is an adverb?",
      options: ["beautiful", "beautifully", "beauty", "beautify"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Beautifully' یک قید است که فعل را توصیف می‌کند."
    },
    {
      id: 28,
      text: "What does 'pollution' mean?",
      options: ["آلودگی", "تمیزی", "آب", "هوا"],
      correctIndex: 0,
      answer: "گزینه ۱: 'Pollution' به معنی آلودگی است."
    },
    {
      id: 29,
      text: "Which sentence uses Present Perfect correctly?",
      options: ["I have visited Paris", "I visited Paris", "I am visiting Paris", "I will visit Paris"],
      correctIndex: 0,
      answer: "گزینه ۱: 'I have visited Paris' جمله‌ای در زمان حال کامل است."
    },
    {
      id: 30,
      text: "What does 'opportunity' mean?",
      options: ["مشکل", "فرصت", "چالش", "کار"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Opportunity' به معنی فرصت است."
    },
    {
      id: 31,
      text: "Which one is a countable noun?",
      options: ["water", "book", "air", "music"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Book' یک اسم قابل شمارش است."
    },
    {
      id: 32,
      text: "What does 'intelligent' mean?",
      options: ["باهوش", "تنبل", "زیبا", "بلند"],
      correctIndex: 0,
      answer: "گزینه ۱: 'Intelligent' به معنی باهوش است."
    },
    {
      id: 33,
      text: "What is the past tense of 'teach'?",
      options: ["teached", "taught", "teaching", "teaches"],
      correctIndex: 1,
      answer: "گزینه ۲: گذشته فعل 'teach'، 'taught' است."
    },
    {
      id: 34,
      text: "Which word means 'very important'?",
      options: ["essential", "optional", "unnecessary", "trivial"],
      correctIndex: 0,
      answer: "گزینه ۱: 'Essential' به معنی بسیار مهم و ضروری است."
    },
    {
      id: 35,
      text: "What does 'improve' mean?",
      options: ["بدتر شدن", "بهتر شدن", "تغییر کردن", "توقف کردن"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Improve' به معنی بهتر شدن است."
    },
    {
      id: 36,
      text: "Which sentence is in Passive Voice?",
      options: ["The book was written by Ali", "Ali wrote the book", "Ali is writing the book", "Ali will write the book"],
      correctIndex: 0,
      answer: "گزینه ۱: 'The book was written by Ali' جمله‌ای در مجهول است."
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
        backgroundColor: '#E65100',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/english-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🌍 آزمون جامع زبان انگلیسی (۲)</h1>
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
                backgroundColor: '#E65100',
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
              📝 پاسخنامه تشریحی زبان انگلیسی (۲)
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

export default English2FinalExam;