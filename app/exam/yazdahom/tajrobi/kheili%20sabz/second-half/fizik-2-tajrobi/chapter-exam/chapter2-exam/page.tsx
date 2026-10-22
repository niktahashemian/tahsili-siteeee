"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PhysicsExam = () => {
  const router = useRouter(); // برای بازگشت به صفحه قبل

  // داده‌های سوالات
  const questions = [
    {
      id: 1,
      text: "اختلاف پتانسیل دو سر مقاومتی 12 ولت و جریان عبوری 3 آمپر است. مقاومت چند اهم است؟",
      options: ["4", "36", "0.25", "9"],
      correctIndex: 0,
      answer: "گزینه 1 (4): R = V/I = 12/3 = 4 Ω."
    },
    {
      id: 2,
      text: "از مقاومت 20 اهمی جریان 0.5 آمپر می‌گذرد. ولتاژ دو سر آن چند ولت است؟",
      options: ["40", "10", "20.5", "2.5"],
      correctIndex: 1,
      answer: "گزینه 2 (10): V = IR = 0.5 × 20 = 10 V."
    },
    {
      id: 3,
      text: "اگر ولتاژ دو سر یک مقاومت اهمی دو برابر شود، جریان عبوری چه می‌شود؟",
      options: ["نصف", "ثابت", "دو برابر", "چهار برابر"],
      correctIndex: 2,
      answer: "گزینه 3 (دو برابر): در رسانای اهمی R ثابت است و I = V/R با V نسبت مستقیم دارد."
    },
    {
      id: 4,
      text: "سه مقاومت 2، 3 و 5 اهمی را به صورت متوالی (سری) می‌بندیم. مقاومت معادل چند اهم است؟",
      options: ["10", "30", "1", "0.97"],
      correctIndex: 0,
      answer: "گزینه 1 (10): در حالت سری: R = 2 + 3 + 5 = 10 Ω."
    },
    {
      id: 5,
      text: "مقاومت معادل دو مقاومت 6 Ω و 3 Ω که موازی بسته شده‌اند چند اهم است؟",
      options: ["9", "4.5", "2", "18"],
      correctIndex: 2,
      answer: "گزینه 3 (2): R = (6 × 3)/(6 + 3) = 18/9 = 2 Ω."
    },
    {
      id: 6,
      text: "مقاومت‌های 4 Ω و 2 Ω به صورت سری به باتری ایده‌آل 12 V وصل شده‌اند. جریان مدار چند آمپر است؟",
      options: ["2", "3", "6", "1"],
      correctIndex: 0,
      answer: "گزینه 1 (2): R = 6 Ω و I = 12/6 = 2 A."
    },
    {
      id: 7,
      text: "وسیله‌ای با ولتاژ 220 V جریان 5 A می‌کشد. توان مصرفی آن چند وات است؟",
      options: ["44", "1100", "225", "4400"],
      correctIndex: 1,
      answer: "گزینه 2 (1100): P = VI = 220 × 5 = 1100 W."
    },
    {
      id: 8,
      text: "جریان 3 آمپر از مقاومت 10 اهمی می‌گذرد. توان مصرفی آن چند وات است؟",
      options: ["90", "30", "300", "900"],
      correctIndex: 0,
      answer: "گزینه 1 (90): P = I²R = 9 × 10 = 90 W."
    },
    {
      id: 9,
      text: "لامپی 100 واتی 2 ساعت روشن بوده است. انرژی مصرفی چند کیلووات‌ساعت است؟",
      options: ["0.2", "2", "200", "0.02"],
      correctIndex: 0,
      answer: "گزینه 1 (0.2): E = Pt = 0.1 kW × 2 h = 0.2 kWh."
    },
    {
      id: 10,
      text: "در یک گره، جریان‌های 3 A و 2 A وارد و جریان 4 A خارج می‌شود. جریان دیگر خارج‌شونده چقدر است؟",
      options: ["1 A خارج", "1 A وارد", "9 A خارج", "5 A وارد"],
      correctIndex: 0,
      answer: "گزینه 1 (1 A خارج): طبق قانون گره (KCL) مجموع ورودی = 5 A باید برابر مجموع خروجی باشد؛ پس 1 A دیگر خارج می‌شود."
    },
    {
      id: 11,
      text: "باتری 12 V با دو مقاومت 2 Ω و 4 Ω سری شده است. جریان مدار چند آمپر است؟",
      options: ["3", "6", "2", "1.5"],
      correctIndex: 2,
      answer: "گزینه 3 (2): طبق KVL: 12 = I(2+4) ⇒ I = 2 A."
    },
    {
      id: 12,
      text: "قانون ولتاژ کیرشهف (KVL) بیانگر کدام اصل پایستگی است؟",
      options: ["پایستگی بار", "پایستگی انرژی", "پایستگی تکانه", "پایستگی جرم"],
      correctIndex: 1,
      answer: "گزینه 2 (پایستگی انرژی): مجموع جبری تغییرات پتانسیل در یک حلقه‌ی بسته صفر است که به دلیل پایستگی انرژی است."
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