"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PhysicsExam = () => {
  const router = useRouter(); // برای بازگشت به صفحه قبل

  // داده‌های سوالات
  const questions = [
    {
      id: 1,
      text: "دو بار نقطه‌ای 2 μC و 8 μC در فاصله 30 سانتی‌متری از هم قرار دارند. اندازه نیروی بین آن‌ها چند نیوتون است؟ (k = 9×10^9)",
      options: ["0.16", "1.6", "16", "3.2"],
      correctIndex: 1,
      answer: "گزینه 2 (1.6): F = k q1 q2 / r² = 9×10^9 × 2×10^-6 × 8×10^-6 / 0.09 = 0.144/0.09 = 1.6 N."
    },
    {
      id: 2,
      text: "اگر فاصله‌ی دو بار نقطه‌ای را دو برابر کنیم، اندازه نیروی الکتریکی بین آن‌ها چند برابر می‌شود؟",
      options: ["2 برابر", "نصف", "یک‌چهارم", "4 برابر"],
      correctIndex: 2,
      answer: "گزینه 3 (یک‌چهارم): نیروی کولن با مجذور فاصله نسبت وارونه دارد؛ با دو برابر شدن فاصله، نیرو 1/4 می‌شود."
    },
    {
      id: 3,
      text: "دو بار نقطه‌ای +q و +4q در فاصله d از هم ثابت‌اند. بار سومی در چه فاصله‌ای از بار +q (روی خط واصل و بین دو بار) قرار گیرد تا در تعادل باشد؟",
      options: ["d/2", "d/3", "d/4", "2d/3"],
      correctIndex: 1,
      answer: "گزینه 2 (d/3): باید kq/x² = k·4q/(d-x)² باشد، یعنی d-x = 2x و در نتیجه x = d/3."
    },
    {
      id: 4,
      text: "بار 3 μC در نقطه‌ای از میدان الکتریکی به بزرگی 2000 N/C قرار دارد. اندازه نیروی وارد بر آن چند نیوتون است؟",
      options: ["6×10^-3", "6×10^-4", "6", "0.6"],
      correctIndex: 0,
      answer: "گزینه 1 (6×10^-3): F = qE = 3×10^-6 × 2000 = 6×10^-3 N."
    },
    {
      id: 5,
      text: "جهت نیروی الکتریکی وارد بر یک بار منفی در میدان الکتریکی چگونه است؟",
      options: ["هم‌جهت با میدان", "خلاف جهت میدان", "عمود بر میدان", "صفر است"],
      correctIndex: 1,
      answer: "گزینه 2 (خلاف جهت میدان): نیرو بر بار مثبت هم‌جهت میدان و بر بار منفی خلاف جهت میدان است."
    },
    {
      id: 6,
      text: "بزرگی میدان الکتریکی ناشی از بار نقطه‌ای 4 μC در فاصله 3 متری از آن چند N/C است؟",
      options: ["4×10^3", "1.2×10^4", "4×10^4", "1.2×10^3"],
      correctIndex: 0,
      answer: "گزینه 1 (4×10^3): E = kq/r² = 9×10^9 × 4×10^-6 / 9 = 4×10^3 N/C."
    },
    {
      id: 7,
      text: "پتانسیل الکتریکی ناشی از بار 5 نانوکولن در فاصله 0.9 متری از آن چند ولت است؟",
      options: ["5", "50", "500", "45"],
      correctIndex: 1,
      answer: "گزینه 2 (50): V = kq/r = 9×10^9 × 5×10^-9 / 0.9 = 45/0.9 = 50 V."
    },
    {
      id: 8,
      text: "بار 2 μC از نقطه‌ای با پتانسیل 100 V به نقطه‌ای با پتانسیل 300 V منتقل می‌شود. تغییر انرژی پتانسیل آن چند ژول است؟",
      options: ["4×10^-4", "4×10^-6", "2×10^-4", "6×10^-4"],
      correctIndex: 0,
      answer: "گزینه 1 (4×10^-4): ΔU = qΔV = 2×10^-6 × 200 = 4×10^-4 J."
    },
    {
      id: 9,
      text: "در میدان یکنواخت 200 V/m، بزرگی اختلاف پتانسیل بین دو نقطه که در راستای میدان 5 سانتی‌متر از هم فاصله دارند چند ولت است؟",
      options: ["10", "4000", "1", "2.5"],
      correctIndex: 0,
      answer: "گزینه 1 (10): |ΔV| = Ed = 200 × 0.05 = 10 V."
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