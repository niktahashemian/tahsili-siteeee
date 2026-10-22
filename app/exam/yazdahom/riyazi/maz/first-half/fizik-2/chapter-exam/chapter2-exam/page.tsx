"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const PhysicsExam = () => {
  const router = useRouter(); // برای بازگشت به صفحه قبل

  // داده‌های سوالات
  const questions = [
    {
      id: 1,
      text: "در یک سیم در مدت 60 ثانیه، بار 120 کولن عبور می‌کند. جریان متوسط چند آمپر است؟",
      options: ["0.5", "2", "20", "7200"],
      correctIndex: 1,
      answer: "گزینه 2 (2): I = q/t = 120/60 = 2 A."
    },
    {
      id: 2,
      text: "جریان 0.8 آمپر در مدت 10 ثانیه از یک سیم می‌گذرد. چند الکترون از مقطع سیم عبور کرده است؟ (e = 1.6×10^-19 C)",
      options: ["5×10^19", "5×10^18", "1.28×10^19", "8×10^19"],
      correctIndex: 0,
      answer: "گزینه 1 (5×10^19): q = It = 8 C و n = q/e = 8 / 1.6×10^-19 = 5×10^19."
    },
    {
      id: 3,
      text: "جهت قراردادی جریان الکتریکی در مدار بیرون از باتری چگونه است؟",
      options: ["از قطب منفی به قطب مثبت", "از قطب مثبت به قطب منفی", "فقط در جهت حرکت الکترون‌ها", "جهت ندارد"],
      correctIndex: 1,
      answer: "گزینه 2 (از قطب مثبت به قطب منفی): جهت قراردادی همان جهت حرکت بارهای مثبت است: در بیرون باتری از قطب مثبت به منفی."
    },
    {
      id: 4,
      text: "جریان 2 میلی‌آمپر در مدت 5 دقیقه چند کولن بار جابه‌جا می‌کند؟",
      options: ["0.6", "0.01", "10", "6"],
      correctIndex: 0,
      answer: "گزینه 1 (0.6): q = It = 2×10^-3 × 300 = 0.6 C."
    },
    {
      id: 5,
      text: "اختلاف پتانسیل دو سر مقاومتی 12 ولت و جریان عبوری 3 آمپر است. مقاومت چند اهم است؟",
      options: ["4", "36", "0.25", "9"],
      correctIndex: 0,
      answer: "گزینه 1 (4): R = V/I = 12/3 = 4 Ω."
    },
    {
      id: 6,
      text: "از مقاومت 20 اهمی جریان 0.5 آمپر می‌گذرد. ولتاژ دو سر آن چند ولت است؟",
      options: ["40", "10", "20.5", "2.5"],
      correctIndex: 1,
      answer: "گزینه 2 (10): V = IR = 0.5 × 20 = 10 V."
    },
    {
      id: 7,
      text: "اگر ولتاژ دو سر یک مقاومت اهمی دو برابر شود، جریان عبوری چه می‌شود؟",
      options: ["نصف", "ثابت", "دو برابر", "چهار برابر"],
      correctIndex: 2,
      answer: "گزینه 3 (دو برابر): در رسانای اهمی R ثابت است و I = V/R با V نسبت مستقیم دارد."
    },
    {
      id: 8,
      text: "شیب نمودار ولتاژ برحسب جریان (V-I) برای یک رسانای اهمی چه کمیتی را نشان می‌دهد؟",
      options: ["توان", "مقاومت", "بار", "رسانایی"],
      correctIndex: 1,
      answer: "گزینه 2 (مقاومت): چون V = RI، شیب نمودار V-I برابر مقاومت R است."
    },
    {
      id: 9,
      text: "سیمی را بدون تغییر حجم می‌کشیم تا طولش دو برابر شود. مقاومتش چند برابر می‌شود؟",
      options: ["2", "4", "1/2", "8"],
      correctIndex: 1,
      answer: "گزینه 2 (4): طول دو برابر و سطح مقطع نصف می‌شود؛ R = ρL/A پس 2 × 2 = 4 برابر می‌شود."
    },
    {
      id: 10,
      text: "اگر شعاع سیمی را دو برابر کنیم (طول و جنس ثابت)، مقاومت آن چند برابر می‌شود؟",
      options: ["1/2", "1/4", "1/8", "4"],
      correctIndex: 1,
      answer: "گزینه 2 (1/4): سطح مقطع با مجذور شعاع متناسب است؛ A چهار برابر و R یک‌چهارم می‌شود."
    },
    {
      id: 11,
      text: "مقاومت سیم مسی به طول 100 متر و سطح مقطع 1 میلی‌متر مربع چند اهم است؟ (ρ = 1.7×10^-8 Ω.m)",
      options: ["17", "0.17", "1.7", "0.017"],
      correctIndex: 2,
      answer: "گزینه 3 (1.7): R = ρL/A = 1.7×10^-8 × 100 / 10^-6 = 1.7 Ω."
    },
    {
      id: 12,
      text: "با افزایش دما، مقاومت یک رسانای فلزی چه تغییری می‌کند؟",
      options: ["کاهش می‌یابد", "افزایش می‌یابد", "تغییر نمی‌کند", "صفر می‌شود"],
      correctIndex: 1,
      answer: "گزینه 2 (افزایش می‌یابد): در فلزها با افزایش دما، ارتعاش یون‌ها بیشتر و مقاومت ویژه و مقاومت زیاد می‌شود."
    },
    {
      id: 13,
      text: "باتری با نیروی محرکه 12 V و مقاومت درونی 1 Ω به مقاومت 5 Ω وصل شده است. جریان مدار چند آمپر است؟",
      options: ["2", "2.4", "3", "1.2"],
      correctIndex: 0,
      answer: "گزینه 1 (2): I = ε/(R + r) = 12/(5 + 1) = 2 A."
    },
    {
      id: 14,
      text: "باتری با ε = 10 V و r = 0.5 Ω جریان 4 A می‌دهد. ولتاژ دو سر باتری چند ولت است؟",
      options: ["12", "8", "10", "6"],
      correctIndex: 1,
      answer: "گزینه 2 (8): V = ε - Ir = 10 - 4 × 0.5 = 8 V."
    },
    {
      id: 15,
      text: "جریان اتصال کوتاه باتری با ε = 6 V و r = 0.2 Ω چند آمپر است؟",
      options: ["1.2", "6", "30", "0.3"],
      correctIndex: 2,
      answer: "گزینه 3 (30): در اتصال کوتاه R = 0 و I = ε/r = 6/0.2 = 30 A."
    },
    {
      id: 16,
      text: "ولتاژ دو سر یک باتری در مدار باز (جریان صفر) چگونه است؟",
      options: ["صفر است", "برابر نیروی محرکه است", "کمتر از نیروی محرکه است", "بی‌نهایت است"],
      correctIndex: 1,
      answer: "گزینه 2 (برابر نیروی محرکه است): وقتی I = 0، افت ولتاژ درونی صفر و V = ε است."
    },
    {
      id: 17,
      text: "وسیله‌ای با ولتاژ 220 V جریان 5 A می‌کشد. توان مصرفی آن چند وات است؟",
      options: ["44", "1100", "225", "4400"],
      correctIndex: 1,
      answer: "گزینه 2 (1100): P = VI = 220 × 5 = 1100 W."
    },
    {
      id: 18,
      text: "جریان 3 آمپر از مقاومت 10 اهمی می‌گذرد. توان مصرفی آن چند وات است؟",
      options: ["90", "30", "300", "900"],
      correctIndex: 0,
      answer: "گزینه 1 (90): P = I²R = 9 × 10 = 90 W."
    },
    {
      id: 19,
      text: "لامپی 100 واتی 2 ساعت روشن بوده است. انرژی مصرفی چند کیلووات‌ساعت است؟",
      options: ["0.2", "2", "200", "0.02"],
      correctIndex: 0,
      answer: "گزینه 1 (0.2): E = Pt = 0.1 kW × 2 h = 0.2 kWh."
    },
    {
      id: 20,
      text: "مقاومت لامپی با مشخصات 100 W و 220 V چند اهم است؟",
      options: ["2.2", "48.4", "484", "4840"],
      correctIndex: 2,
      answer: "گزینه 3 (484): R = V²/P = 220²/100 = 48400/100 = 484 Ω."
    },
    {
      id: 21,
      text: "سه مقاومت 2، 3 و 5 اهمی را به صورت متوالی (سری) می‌بندیم. مقاومت معادل چند اهم است؟",
      options: ["10", "30", "1", "0.97"],
      correctIndex: 0,
      answer: "گزینه 1 (10): در حالت سری: R = 2 + 3 + 5 = 10 Ω."
    },
    {
      id: 22,
      text: "مقاومت معادل دو مقاومت 6 Ω و 3 Ω که موازی بسته شده‌اند چند اهم است؟",
      options: ["9", "4.5", "2", "18"],
      correctIndex: 2,
      answer: "گزینه 3 (2): R = (6 × 3)/(6 + 3) = 18/9 = 2 Ω."
    },
    {
      id: 23,
      text: "مقاومت‌های 4 Ω و 2 Ω به صورت سری به باتری ایده‌آل 12 V وصل شده‌اند. جریان مدار چند آمپر است؟",
      options: ["2", "3", "6", "1"],
      correctIndex: 0,
      answer: "گزینه 1 (2): R = 6 Ω و I = 12/6 = 2 A."
    },
    {
      id: 24,
      text: "دو مقاومت یکسان R موازی‌اند و با مقاومت سومی برابر R سری شده‌اند. مقاومت معادل کل چقدر است؟",
      options: ["2R", "1.5R", "0.5R", "3R"],
      correctIndex: 1,
      answer: "گزینه 2 (1.5R): موازی دو R برابر R/2 است؛ با R سری: R/2 + R = 1.5R."
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