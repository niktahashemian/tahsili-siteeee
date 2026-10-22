"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PhysicsExam = () => {
  const router = useRouter(); // برای بازگشت به صفحه قبل

  // داده‌های سوالات
  const questions = [
    {
      id: 1,
      text: "سه بار هم‌اندازه‌ی +q در رئوس یک مثلث متساوی‌الاضلاع به ضلع a قرار دارند. اندازه‌ی نیروی خالص وارد بر یکی از آن‌ها چقدر است؟",
      options: ["kq²/a²", "√3 kq²/a²", "2kq²/a²", "3kq²/a²"],
      correctIndex: 1,
      answer: "گزینه 2 (√3 kq²/a²): دو نیروی هم‌اندازه‌ی kq²/a² با زاویه‌ی 60° برآیند 2·(kq²/a²)·cos30° = √3 kq²/a² دارند."
    },
    {
      id: 2,
      text: "چهار بار هم‌اندازه و هم‌نام +q در رئوس یک مربع قرار دارند. میدان الکتریکی در مرکز مربع چقدر است؟",
      options: ["صفر", "4kq/a²", "2kq/a²", "kq/a²"],
      correctIndex: 0,
      answer: "گزینه 1 (صفر): میدان بارهای روبه‌رو هم‌اندازه و مخالف‌جهت‌اند و یکدیگر را خنثی می‌کنند؛ برآیند صفر است."
    },
    {
      id: 3,
      text: "دو بار +9 μC و +1 μC در فاصله‌ی 0.4 متری قرار دارند. میدان برآیند در چه فاصله‌ای از بار 9 μC (بین دو بار) صفر است؟",
      options: ["0.1 متر", "0.2 متر", "0.3 متر", "0.25 متر"],
      correctIndex: 2,
      answer: "گزینه 3 (0.3 متر): 9/x² = 1/(0.4 - x)² ⇒ 3(0.4 - x) = x ⇒ x = 0.3 متر."
    },
    {
      id: 4,
      text: "پتانسیل الکتریکی در وسط فاصله‌ی دو بار +2 μC و -2 μC چقدر است؟",
      options: ["صفر", "مثبت", "منفی", "بی‌نهایت"],
      correctIndex: 0,
      answer: "گزینه 1 (صفر): پتانسیل کمیتی نرده‌ای است: kq/r + k(-q)/r = 0."
    },
    {
      id: 5,
      text: "بار 4 μC از نقطه‌ای با پتانسیل 50 V به نقطه‌ای با پتانسیل 10 V می‌رود. کار نیروی میدان چند ژول است؟",
      options: ["1.6×10^-4", "-1.6×10^-4", "1.6×10^-5", "2.4×10^-4"],
      correctIndex: 0,
      answer: "گزینه 1 (1.6×10^-4): W = q(V_A - V_B) = 4×10^-6 × 40 = 1.6×10^-4 J (مثبت)."
    },
    {
      id: 6,
      text: "اختلاف پتانسیل دو صفحه‌ی موازی به فاصله‌ی 2 سانتی‌متر برابر 400 V است. میدان بین آن‌ها چند V/m است؟",
      options: ["2×10^4", "8×10^3", "2×10^2", "8×10^5"],
      correctIndex: 0,
      answer: "گزینه 1 (2×10^4): E = V/d = 400 / 0.02 = 2×10^4 V/m."
    },
    {
      id: 7,
      text: "دو خازن 3 μF و 6 μF را متوالی (سری) می‌بندیم. ظرفیت معادل چند میکروفاراد است؟",
      options: ["9", "2", "4.5", "18"],
      correctIndex: 1,
      answer: "گزینه 2 (2): C = (3×6)/(3+6) = 2 μF."
    },
    {
      id: 8,
      text: "دو خازن 3 μF و 6 μF به صورت موازی به باتری 12 V وصل شده‌اند. بار کل ذخیره‌شده چند میکروکولن است؟",
      options: ["108", "36", "216", "72"],
      correctIndex: 0,
      answer: "گزینه 1 (108): C = 9 μF و Q = CV = 9 × 12 = 108 μC."
    },
    {
      id: 9,
      text: "ثابت زمانی مدار RC با R = 2 kΩ و C = 5 μF چند ثانیه است؟",
      options: ["10^-2", "10^-3", "10^-1", "10"],
      correctIndex: 0,
      answer: "گزینه 1 (10^-2): τ = RC = 2000 × 5×10^-6 = 10^-2 s."
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswers, setShowAnswers] = useState(false);

  const handleOptionClick = (questionId, optionIndex) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: optionIndex
    });
  };

  return (
    <div style={{
      fontFamily: 'Tahoma, Arial, sans-serif',
      width: '100vw',
      minHeight: '100vh',
      padding: '15px 10px', // کمی پدینگ افقی کم شده تا باکس‌ها کامل پهن شوند
      backgroundColor: '#f4f4f4',
      direction: 'rtl',
      textAlign: 'right',
      boxSizing: 'border-box',
      overflowX: 'hidden'
    }}>
      
      {/* دکمه بازگشت به لیست دروس */}
      <div style={{ maxWidth: '100%', marginBottom: '20px' }}>
        <button 
          onClick={() => router.back()}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4a5568',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          ← بازگشت به لیست دروس
        </button>
      </div>

      {/* بخش سوالات - حالا عرض 100% دارد و باکس‌ها تمام صفحه هستند */}
      <div style={{ width: '100%' }}>
        {questions.map((q) => (
          <div key={q.id} style={{
            marginBottom: '20px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '5px', // کمی گردی گوشه اما تقریبا تخت
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            width: '100%' // کل عرض صفحه
          }}>
            <div style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '15px', fontWeight: 'bold' }}>
              {q.id}-) {q.text}
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '15px',
              marginRight: '10px'
            }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedAnswers[q.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 15px',
                      border: isSelected ? '2px solid #007bff' : '1px solid #ccc',
                      borderRadius: '8px',
                      backgroundColor: isSelected ? '#e6f2ff' : '#fff',
                      cursor: 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%'
                    }}
                  >
                    <span style={{
                      display: 'inline-block',
                      width: '25px',
                      height: '25px',
                      border: '1px solid #000',
                      borderRadius: '50%',
                      textAlign: 'center',
                      lineHeight: '25px',
                      fontSize: '14px',
                      marginLeft: '15px',
                      backgroundColor: '#fff',
                      color: '#000'
                    }}>
                      {idx + 1}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
            {/* خط جداکننده زیر هر سوال */}
            <hr style={{ marginTop: '20px', border: '0', borderTop: '1px solid #ddd' }} />
          </div>
        ))}

        {/* دکمه نمایش پاسخنامه */}
        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '50px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '15px 40px',
              fontSize: '18px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            {showAnswers ? "بستن پاسخنامه" : "نمایش پاسخنامه تشریحی"}
          </button>
        </div>

        {/* بخش پاسخنامه */}
        {showAnswers && (
          <div style={{
            marginTop: '30px',
            borderTop: '3px double #333',
            paddingTop: '30px',
            backgroundColor: '#fff',
            padding: '30px',
            borderRadius: '5px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            width: '100%'
          }}>
            <h2 style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '15px', marginBottom: '30px' }}>
              پاسخنامه تشریحی
            </h2>
            
            {questions.map((q) => (
              <div key={q.id} style={{
                marginBottom: '30px',
                borderBottom: '1px dashed #999',
                paddingBottom: '20px'
              }}>
                <div style={{ fontSize: '17px', lineHeight: '1.8' }}>
                  <span style={{ fontWeight: 'bold', color: '#007bff' }}>پاسخ سوال {q.id}:</span> 
                  <br />
                  {q.answer}
                  <br />
                  <span style={{ color: '#28a745', fontSize: '14px' }}>
                    (گزینه صحیح: {q.correctIndex + 1})
                  </span>
                </div>
                <hr style={{ marginTop: '15px', border: '0', borderTop: '1px solid #eee' }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysicsExam;