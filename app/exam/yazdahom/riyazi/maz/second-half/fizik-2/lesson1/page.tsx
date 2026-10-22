"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PhysicsExam = () => {
  const router = useRouter(); // برای بازگشت به صفحه قبل

  // داده‌های سوالات
  const questions = [
    {
      id: 1,
      text: "دو بار الکتریکی نقطه‌ای q1 = +4 μC و q2 = -9 μC در فاصله ۲۰ سانتی‌متری از یکدیگر ثابت شده‌اند. نیروی الکتریکی خالص وارد بر بار q3 = +2 μC که در وسط فاصله بین این دو بار قرار دارد، چند نیوتون است؟ (k = 9 × 10^9 N.m^2/C^2)",
      options: ["1.8 به سمت راست", "18 به سمت چپ", "1.8 به سمت چپ", "18 به سمت راست"],
      correctIndex: 2,
      answer: "گزینه ۳ (1.8 به سمت چپ): نیروی بار مثبت بر بار وسط، دافعه (به سمت راست) و نیروی بار منفی بر بار وسط، جاذبه (به سمت چپ) است. چون بار منفی بزرگتر است، نیروی خالص به سمت چپ خواهد بود."
    },
    {
      id: 2,
      text: "یک کره رسانای توپر با شعاع ۱۰ سانتی‌متر و بار الکتریکی Q = +8 μC در نظر بگیرید. اگر پتانسیل الکتریکی در سطح این کره برابر با Vs و در فاصله ۲۰ سانتی‌متری از مرکز آن برابر با V1 باشد، نسبت Vs/V1 کدام است؟",
      options: ["1/2", "1", "2", "4"],
      correctIndex: 2,
      answer: "گزینه ۳ (2): پتانسیل با فاصله نسبت عکس دارد. Vs در فاصله ۱۰ و V1 در فاصله ۲۰ است، پس Vs دو برابر V1 است."
    },
    {
      id: 3,
      text: "در یک مدار الکتریکی، اختلاف پتانسیل دو سر یک مقاومت R برابر با V و توان مصرفی آن P است. اگر ولتاژ دو سر مقاومت را ۴ برابر کنیم، توان مصرفی چند برابر می‌شود؟",
      options: ["2", "4", "8", "16"],
      correctIndex: 3,
      answer: "گزینه ۴ (16): طبق فرمول P = V^2 / R، توان با مجذور ولتاژ نسبت مستقیم دارد. اگر ولتاژ ۴ برابر شود، توان ۴ به توان ۲ = ۱۶ برابر می‌شود."
    },
    {
      id: 4,
      text: "در یک رسانای استوانه‌ای به طول L و سطح مقطع A، چگالی جریان الکتریکی J است. اگر طول آن را نصف کرده و سطح مقطع آن را دو برابر کنیم (ولتاژ دو سر سیم ثابت بماند)، چگالی جریان جدید (J') چه رابطه‌ای با J دارد؟",
      options: ["J' = 1/4 J", "J' = 1/2 J", "J' = 2 J", "J' = 4 J"],
      correctIndex: 2,
      answer: "گزینه ۳ (J' = 2 J): مقاومت با طول نسبت مستقیم و با سطح مقطع نسبت عکس دارد، پس مقاومت ۱/۴ می‌شود. جریان ۴ برابر می‌شود. چگالی جریان برابر I/A است که می‌شود 4I / 2A = 2J."
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