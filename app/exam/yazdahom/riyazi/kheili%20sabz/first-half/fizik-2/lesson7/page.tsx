"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PhysicsExam = () => {
  const router = useRouter(); // برای بازگشت به صفحه قبل

  // داده‌های سوالات
  const questions = [
    {
      id: 1,
      text: "اگر نیروی الکتریکی روی یک بار کار مثبت انجام دهد، انرژی پتانسیل الکتریکی آن چه تغییری می‌کند؟",
      options: ["افزایش می‌یابد", "کاهش می‌یابد", "ثابت می‌ماند", "ابتدا زیاد و سپس کم می‌شود"],
      correctIndex: 1,
      answer: "گزینه 2 (کاهش می‌یابد): ΔU = -W_E. وقتی کار نیروی میدان مثبت باشد، ΔU منفی و انرژی پتانسیل کاهش می‌یابد."
    },
    {
      id: 2,
      text: "بار +2 μC در میدان یکنواخت 500 N/C به اندازه 0.4 متر در جهت میدان جابه‌جا می‌شود. تغییر انرژی پتانسیل آن چند ژول است؟",
      options: ["+4×10^-4", "-4×10^-4", "+4×10^-3", "-4×10^-3"],
      correctIndex: 1,
      answer: "گزینه 2 (-4×10^-4): W = qEd = 2×10^-6 × 500 × 0.4 = 4×10^-4 J (مثبت). پس ΔU = -W = -4×10^-4 J."
    },
    {
      id: 3,
      text: "انرژی پتانسیل الکتریکی دو بار نقطه‌ای 2 μC و 3 μC در فاصله 18 سانتی‌متری چند ژول است؟",
      options: ["0.03", "0.3", "3", "0.9"],
      correctIndex: 1,
      answer: "گزینه 2 (0.3): U = k q1 q2 / r = 9×10^9 × 6×10^-12 / 0.18 = 0.054/0.18 = 0.3 J."
    },
    {
      id: 4,
      text: "وقتی دو بار هم‌نام را به هم نزدیک می‌کنیم، انرژی پتانسیل الکتریکی سامانه چگونه تغییر می‌کند؟",
      options: ["کاهش می‌یابد", "ثابت می‌ماند", "افزایش می‌یابد", "صفر می‌شود"],
      correctIndex: 2,
      answer: "گزینه 3 (افزایش می‌یابد): برای نزدیک کردن بارهای هم‌نام باید کار خارجی انجام دهیم؛ این کار به صورت انرژی پتانسیل ذخیره می‌شود."
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