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
      text: "قطب N عقربه‌ی قطب‌نما در راستای میدان مغناطیسی زمین به کدام سمت می‌ایستد؟",
      options: ["قطب شمال جغرافیایی", "قطب جنوب جغرافیایی", "شرق", "غرب"],
      correctIndex: 0,
      answer: "گزینه 1 (قطب شمال جغرافیایی): قطب N عقربه به سمت قطب شمال جغرافیایی می‌ایستد (که از نظر مغناطیسی یک قطب S است)."
    },
    {
      id: 5,
      text: "یکای میدان مغناطیسی در SI کدام است؟",
      options: ["گوس", "تسلا", "وبر", "هانری"],
      correctIndex: 1,
      answer: "گزینه 2 (تسلا): یکای SI میدان مغناطیسی تسلا (T) است."
    },
    {
      id: 6,
      text: "میدان مغناطیسی 5 گاوس معادل چند تسلا است؟ (1 G = 10^-4 T)",
      options: ["5×10^-4", "5×10^-5", "5×10^-3", "5×10^4"],
      correctIndex: 0,
      answer: "گزینه 1 (5×10^-4): 5 G = 5 × 10^-4 T."
    },
    {
      id: 7,
      text: "خطوط میدان مغناطیسی چه ویژگی‌ای دارند؟",
      options: ["باز هستند", "بسته هستند", "از بار مثبت خارج می‌شوند", "همدیگر را قطع می‌کنند"],
      correctIndex: 1,
      answer: "گزینه 2 (بسته هستند): خطوط میدان مغناطیسی همواره حلقه‌های بسته‌اند و منبع یا چاه (تک‌قطبی) ندارند."
    },
    {
      id: 8,
      text: "اندازه‌ی میدان مغناطیسی زمین روی سطح آن تقریباً چه مقدار است؟",
      options: ["5×10^-5 T", "5×10^-2 T", "5 T", "5×10^-9 T"],
      correctIndex: 0,
      answer: "گزینه 1 (5×10^-5 T): میدان مغناطیسی زمین در حدود 0.5 گاوس یعنی حدود 5×10^-5 تسلا است."
    },
    {
      id: 9,
      text: "ذره‌ای با بار 2 μC با سرعت 10^4 m/s عمود بر میدان مغناطیسی 0.5 T حرکت می‌کند. نیروی مغناطیسی وارد بر آن چند نیوتون است؟",
      options: ["10^-2", "10^-3", "10^-1", "2×10^-2"],
      correctIndex: 0,
      answer: "گزینه 1 (10^-2): F = qvB sinθ = 2×10^-6 × 10^4 × 0.5 × 1 = 10^-2 N."
    },
    {
      id: 10,
      text: "ذره‌ی باردار موازی با خطوط میدان مغناطیسی حرکت می‌کند. نیروی مغناطیسی وارد بر آن چقدر است؟",
      options: ["بیشینه", "نصف بیشینه", "صفر", "بی‌نهایت"],
      correctIndex: 2,
      answer: "گزینه 3 (صفر): θ = 0 است و sinθ = 0؛ پس نیروی مغناطیسی صفر می‌شود."
    },
    {
      id: 11,
      text: "ذره‌ای بار دار عمود بر میدان مغناطیسی حرکت دایره‌ای می‌کند. اگر سرعتش دو برابر شود، شعاع مسیر چند برابر می‌شود؟",
      options: ["1/2", "2", "4", "ثابت می‌ماند"],
      correctIndex: 1,
      answer: "گزینه 2 (2): r = mv/(qB) با v متناسب است؛ پس شعاع دو برابر می‌شود."
    },
    {
      id: 12,
      text: "وقتی ذره‌ی باردار در میدان مغناطیسی عمود بر آن حرکت می‌کند، انرژی جنبشی آن چه می‌شود؟",
      options: ["افزایش می‌یابد", "کاهش می‌یابد", "ثابت می‌ماند", "ابتدا زیاد بعد کم می‌شود"],
      correctIndex: 2,
      answer: "گزینه 3 (ثابت می‌ماند): نیروی مغناطیسی همواره بر سرعت عمود است و کار انجام نمی‌دهد؛ پس بزرگی سرعت و انرژی جنبشی ثابت می‌ماند."
    },
    {
      id: 13,
      text: "سیمی به طول 0.8 متر حامل جریان 5 آمپر عمود بر میدان مغناطیسی 0.2 T است. نیروی وارد بر آن چند نیوتون است؟",
      options: ["0.08", "0.8", "8", "0.4"],
      correctIndex: 1,
      answer: "گزینه 2 (0.8): F = BIL = 0.2 × 5 × 0.8 = 0.8 N."
    },
    {
      id: 14,
      text: "سیمی به طول 1 متر با جریان 2 A با میدان 0.4 T زاویه‌ی 30° می‌سازد. نیرو چند نیوتون است؟",
      options: ["0.8", "0.69", "0.4", "0.2"],
      correctIndex: 2,
      answer: "گزینه 3 (0.4): F = BIL sinθ = 0.4 × 2 × 1 × 0.5 = 0.4 N."
    },
    {
      id: 15,
      text: "اگر سیم حامل جریان موازی خطوط میدان مغناطیسی قرار گیرد، نیروی وارد بر آن چقدر است؟",
      options: ["بیشینه", "صفر", "نصف بیشینه", "BIL/2"],
      correctIndex: 1,
      answer: "گزینه 2 (صفر): θ = 0 و sinθ = 0، پس نیرو صفر است."
    },
    {
      id: 16,
      text: "دو سیم راست موازی که جریان‌هایشان هم‌جهت است، چه نیرویی بر هم وارد می‌کنند؟",
      options: ["همدیگر را می‌رانند", "همدیگر را می‌ربایند", "نیرویی وارد نمی‌کنند", "گشتاور ایجاد می‌کنند"],
      correctIndex: 1,
      answer: "گزینه 2 (همدیگر را می‌ربایند): جریان‌های هم‌جهت یکدیگر را جذب و جریان‌های ناهم‌جهت یکدیگر را دفع می‌کنند."
    },
    {
      id: 17,
      text: "میدان مغناطیسی در فاصله 0.2 متری سیم راست بلند حامل جریان 10 A چند تسلا است؟ (μ0 = 4π×10^-7 T.m/A)",
      options: ["10^-6", "2×10^-5", "10^-5", "10^-4"],
      correctIndex: 2,
      answer: "گزینه 3 (10^-5): B = μ0 I / (2πr) = 2×10^-7 × 10 / 0.2 = 10^-5 T."
    },
    {
      id: 18,
      text: "سیم‌لوله‌ای با 1000 دور در هر متر حامل جریان 2 A است. میدان مغناطیسی درون آن چند تسلا است؟",
      options: ["8π×10^-3", "8π×10^-4", "4π×10^-4", "8π×10^-5"],
      correctIndex: 1,
      answer: "گزینه 2 (8π×10^-4): B = μ0 n I = 4π×10^-7 × 1000 × 2 = 8π×10^-4 T."
    },
    {
      id: 19,
      text: "میدان مغناطیسی در مرکز حلقه‌ای به شعاع 0.1 متر با جریان 5 A چند تسلا است؟",
      options: ["π×10^-5", "2π×10^-5", "π×10^-6", "10π×10^-5"],
      correctIndex: 0,
      answer: "گزینه 1 (π×10^-5): B = μ0 I / (2R) = 4π×10^-7 × 5 / 0.2 = π×10^-5 T."
    },
    {
      id: 20,
      text: "برای تعیین جهت میدان مغناطیسی حول سیم حامل جریان، از قاعده‌ی دست راست چگونه استفاده می‌کنیم؟",
      options: ["شست جهت میدان، چهار انگشت جهت جریان", "شست جهت جریان، چهار انگشت جهت چرخش میدان", "شست جهت نیرو", "انگشتان جهت سرعت"],
      correctIndex: 1,
      answer: "گزینه 2 (شست جهت جریان، چهار انگشت جهت چرخش میدان): شست دست راست در جهت جریان قرار می‌گیرد و چهار انگشت خمیده جهت خطوط میدان را حول سیم نشان می‌دهد."
    },
    {
      id: 21,
      text: "کدام ماده فرومغناطیس است؟",
      options: ["آلومینیوم", "مس", "آهن", "بیسموت"],
      correctIndex: 2,
      answer: "گزینه 3 (آهن): آهن، کبالت و نیکل از مواد فرومغناطیس هستند."
    },
    {
      id: 22,
      text: "مواد پارامغناطیس در میدان مغناطیسی خارجی چه رفتاری دارند؟",
      options: ["به شدت جذب می‌شوند", "به طور ضعیف جذب می‌شوند", "به طور ضعیف دفع می‌شوند", "اثری نمی‌پذیرند"],
      correctIndex: 1,
      answer: "گزینه 2 (به طور ضعیف جذب می‌شوند): مواد پارامغناطیس (مثل آلومینیوم) به آهن‌ربا به طور ضعیف جذب می‌شوند."
    },
    {
      id: 23,
      text: "مواد دیامغناطیس در برابر میدان مغناطیسی خارجی چه رفتاری دارند؟",
      options: ["جذب قوی", "جذب ضعیف", "دفع ضعیف", "هیچ واکنشی"],
      correctIndex: 2,
      answer: "گزینه 3 (دفع ضعیف): مواد دیامغناطیس (مثل مس و بیسموت) به طور ضعیف از میدان خارجی دفع می‌شوند."
    },
    {
      id: 24,
      text: "اگر دمای یک ماده‌ی فرومغناطیس از دمای کوری بالاتر برود، چه رخ می‌دهد؟",
      options: ["قوی‌تر می‌شود", "فرومغناطیسی بودن را از دست داده و پارامغناطیس می‌شود", "دیامغناطیس می‌شود", "تغییری نمی‌کند"],
      correctIndex: 1,
      answer: "گزینه 2 (فرومغناطیسی بودن را از دست داده و پارامغناطیس می‌شود): بالاتر از دمای کوری، آرایش حوزه‌های مغناطیسی به هم می‌خورد و ماده رفتار پارامغناطیسی پیدا می‌کند."
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