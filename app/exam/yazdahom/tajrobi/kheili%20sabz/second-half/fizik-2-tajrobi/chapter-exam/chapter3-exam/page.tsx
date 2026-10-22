"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PhysicsExam = () => {
  const router = useRouter(); // برای بازگشت به صفحه قبل

  // داده‌های سوالات
  const questions = [
    {
      id: 1,
      text: "دو قطب مغناطیسی همنام چه نیرویی بر هم وارد می‌کنند؟",
      options: ["جاذبه", "دافعه", "نیرویی وارد نمی‌کنند", "ابتدا جاذبه سپس دافعه"],
      correctIndex: 1,
      answer: "گزینه 2 (دافعه): قطب‌های همنام یکدیگر را می‌رانند و قطب‌های ناهمنام یکدیگر را می‌ربایند."
    },
    {
      id: 2,
      text: "یک آهن‌ربای میله‌ای را از وسط می‌شکنیم. چه می‌شود؟",
      options: ["یک قطب N و یک قطب S جدا می‌شوند", "دو آهن‌ربای کامل هر کدام با دو قطب به دست می‌آید", "آهن‌ربایی خاصیت خود را از دست می‌دهد", "هر نیمه فقط یک قطب دارد"],
      correctIndex: 1,
      answer: "گزینه 2 (دو آهن‌ربای کامل هر کدام با دو قطب به دست می‌آید): قطب مغناطیسی تک‌قطبی وجود ندارد؛ هر قطعه دوباره دو قطب N و S پیدا می‌کند."
    },
    {
      id: 3,
      text: "خطوط میدان مغناطیسی در بیرون یک آهن‌ربا در چه جهتی هستند؟",
      options: ["از S به N", "از N به S", "از مرکز به بیرون", "دایره‌ای حول قطب‌ها"],
      correctIndex: 1,
      answer: "گزینه 2 (از N به S): خارج آهن‌ربا خطوط میدان از قطب N خارج و به قطب S وارد می‌شوند (داخل آهن‌ربا از S به N)."
    },
    {
      id: 4,
      text: "ذره‌ای با بار 2 μC با سرعت 10^4 m/s عمود بر میدان مغناطیسی 0.5 T حرکت می‌کند. نیروی مغناطیسی وارد بر آن چند نیوتون است؟",
      options: ["10^-2", "10^-3", "10^-1", "2×10^-2"],
      correctIndex: 0,
      answer: "گزینه 1 (10^-2): F = qvB sinθ = 2×10^-6 × 10^4 × 0.5 × 1 = 10^-2 N."
    },
    {
      id: 5,
      text: "ذره‌ی باردار موازی با خطوط میدان مغناطیسی حرکت می‌کند. نیروی مغناطیسی وارد بر آن چقدر است؟",
      options: ["بیشینه", "نصف بیشینه", "صفر", "بی‌نهایت"],
      correctIndex: 2,
      answer: "گزینه 3 (صفر): θ = 0 است و sinθ = 0؛ پس نیروی مغناطیسی صفر می‌شود."
    },
    {
      id: 6,
      text: "ذره‌ای بار دار عمود بر میدان مغناطیسی حرکت دایره‌ای می‌کند. اگر سرعتش دو برابر شود، شعاع مسیر چند برابر می‌شود؟",
      options: ["1/2", "2", "4", "ثابت می‌ماند"],
      correctIndex: 1,
      answer: "گزینه 2 (2): r = mv/(qB) با v متناسب است؛ پس شعاع دو برابر می‌شود."
    },
    {
      id: 7,
      text: "پیچه‌ای با 100 دور دارد و شار گذرنده از آن در 0.5 ثانیه به اندازه 0.02 وبر تغییر می‌کند. اندازه emf القایی چند ولت است؟",
      options: ["0.4", "40", "4", "400"],
      correctIndex: 2,
      answer: "گزینه 3 (4): |ε| = N |ΔΦ/Δt| = 100 × 0.02/0.5 = 4 V."
    },
    {
      id: 8,
      text: "شار گذرنده از پیچه‌ی 50 دوری در 0.1 ثانیه از 0.1 وبر به 0.3 وبر می‌رسد. اندازه emf القایی چند ولت است؟",
      options: ["100", "10", "1000", "50"],
      correctIndex: 0,
      answer: "گزینه 1 (100): |ε| = 50 × 0.2/0.1 = 100 V."
    },
    {
      id: 9,
      text: "میله‌ای رسانا به طول 0.5 متر با سرعت 4 m/s در میدان 0.2 T (عمود) حرکت می‌کند. emf القایی چند ولت است؟",
      options: ["0.04", "4", "0.4", "1.6"],
      correctIndex: 2,
      answer: "گزینه 3 (0.4): ε = BLv = 0.2 × 0.5 × 4 = 0.4 V."
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