"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Math2FinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع ریاضی (۲) - رشته تجربی (۶۰ سوال) =================
  const questions = [
    // ==================== فصل اول: تابع (۱۵ سوال) ====================
    {
      id: 1,
      text: "دامنه تابع f(x) = √(x-2) کدام است؟",
      options: ["x ≥ 2", "x > 2", "x ≤ 2", "x < 2"],
      correctIndex: 0,
      answer: "گزینه ۱: برای ریشه دوم، عبارت زیر ریشه باید نامنفی باشد: x-2 ≥ 0 → x ≥ 2"
    },
    {
      id: 2,
      text: "نوع تابع f(x) = 2x + 3 چیست؟",
      options: ["خطی", "درجه دوم", "نمایی", "لگاریتمی"],
      correctIndex: 0,
      answer: "گزینه ۱: تابع f(x) = 2x + 3 یک تابع خطی است (درجه ۱)."
    },
    {
      id: 3,
      text: "نقطه تلاقی تابع f(x) = 2x - 4 با محور xها کدام است؟",
      options: ["(2,0)", "(0,-4)", "(4,0)", "(-2,0)"],
      correctIndex: 0,
      answer: "گزینه ۱: برای یافتن نقطه تلاقی با محور x، f(x) = 0 → 2x - 4 = 0 → x = 2 → (2,0)"
    },
    {
      id: 4,
      text: "دامنه تابع f(x) = 1/(x-3) کدام است؟",
      options: ["R - {3}", "R", "x > 3", "x < 3"],
      correctIndex: 0,
      answer: "گزینه ۱: مخرج کسر نباید صفر شود، پس x ≠ 3 → دامنه R - {3}"
    },
    {
      id: 5,
      text: "ترکیب توابع (f∘g)(x) برای f(x) = 2x و g(x) = x + 1 چیست؟",
      options: ["2x + 2", "2x + 1", "2x - 1", "x + 2"],
      correctIndex: 0,
      answer: "گزینه ۱: (f∘g)(x) = f(g(x)) = 2(x+1) = 2x + 2"
    },
    {
      id: 6,
      text: "تابع f(x) = x² - 4 چه نوع تابعی است؟",
      options: ["زوج", "فرد", "نه زوج نه فرد", "هم زوج هم فرد"],
      correctIndex: 0,
      answer: "گزینه ۱: f(-x) = (-x)² - 4 = x² - 4 = f(x) → تابع زوج است."
    },
    {
      id: 7,
      text: "معادله خطی که از دو نقطه (1,2) و (3,6) عبور می‌کند، کدام است؟",
      options: ["y = 2x", "y = 2x + 1", "y = 2x - 1", "y = x + 1"],
      correctIndex: 0,
      answer: "گزینه ۱: شیب = (6-2)/(3-1) = 4/2 = 2، سپس y-2 = 2(x-1) → y = 2x"
    },
    {
      id: 8,
      text: "تعداد ریشه‌های معادله x² - 5x + 6 = 0 چند است؟",
      options: ["۰", "۱", "۲", "۳"],
      correctIndex: 2,
      answer: "گزینه ۳: Δ = 25 - 24 = 1 > 0 → دو ریشه متمایز"
    },
    {
      id: 9,
      text: "تابع f(x) = 3x - 5 چه نوع تابعی است؟",
      options: ["یک‌به‌یک", "روی", "هم یک‌به‌یک و هم روی", "نه یک‌به‌یک و نه روی"],
      correctIndex: 2,
      answer: "گزینه ۳: تابع خطی با شیب غیرصفر، یک‌به‌یک و روی است."
    },
    {
      id: 10,
      text: "دامنه تابع f(x) = ln(x-1) کدام است؟",
      options: ["x > 1", "x ≥ 1", "x < 1", "x ≤ 1"],
      correctIndex: 0,
      answer: "گزینه ۱: برای لگاریتم، ورودی باید مثبت باشد: x-1 > 0 → x > 1"
    },
    {
      id: 11,
      text: "نمودار تابع f(x) = 2^x چه ویژگی‌هایی دارد؟",
      options: ["صعودی", "نزولی", "ثابت", "متناوب"],
      correctIndex: 0,
      answer: "گزینه ۱: تابع نمایی با پایه بزرگتر از ۱، صعودی است."
    },
    {
      id: 12,
      text: "مجموع ریشه‌های معادله x² - 4x + 3 = 0 کدام است؟",
      options: ["۴", "۳", "-۴", "-۳"],
      correctIndex: 0,
      answer: "گزینه ۱: در معادله درجه دوم ax² + bx + c = 0، مجموع ریشه‌ها = -b/a = 4"
    },
    {
      id: 13,
      text: "حد تابع f(x) = (x²-4)/(x-2) در x→2 کدام است؟",
      options: ["۴", "۲", "۰", "نامحدود"],
      correctIndex: 0,
      answer: "گزینه ۱: با ساده‌سازی: (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2، حد در x→2 برابر ۴ است."
    },
    {
      id: 14,
      text: "تابع f(x) = |x| در نقطه x=0 چه ویژگی‌ای دارد؟",
      options: ["پیوسته است", "مشتق‌پذیر است", "ناپیوسته است", "حد ندارد"],
      correctIndex: 0,
      answer: "گزینه ۱: تابع قدر مطلق در x=0 پیوسته است ولی مشتق‌پذیر نیست."
    },
    {
      id: 15,
      text: "معکوس تابع f(x) = 2x + 1 کدام است؟",
      options: ["f⁻¹(x) = (x-1)/2", "f⁻¹(x) = 2x - 1", "f⁻¹(x) = (x+1)/2", "f⁻¹(x) = 2(x-1)"],
      correctIndex: 0,
      answer: "گزینه ۱: y = 2x + 1 → x = (y-1)/2 → f⁻¹(x) = (x-1)/2"
    },

    // ==================== فصل دوم: مثلثات (۱۵ سوال) ====================
    {
      id: 16,
      text: "sin(30°) چند است؟",
      options: ["۰", "۱/۲", "√۳/۲", "۱"],
      correctIndex: 1,
      answer: "گزینه ۲: sin(30°) = 1/2"
    },
    {
      id: 17,
      text: "cos(60°) چند است؟",
      options: ["۰", "۱/۲", "√۳/۲", "۱"],
      correctIndex: 1,
      answer: "گزینه ۲: cos(60°) = 1/2"
    },
    {
      id: 18,
      text: "tan(45°) چند است؟",
      options: ["۰", "۱", "√۳", "۲"],
      correctIndex: 1,
      answer: "گزینه ۲: tan(45°) = 1"
    },
    {
      id: 19,
      text: "sin²(x) + cos²(x) = ?",
      options: ["۰", "۱", "۲", "sin²(x)"],
      correctIndex: 1,
      answer: "گزینه ۲: اتحاد مثلثاتی sin²(x) + cos²(x) = 1"
    },
    {
      id: 20,
      text: "cot(x) برابر با کدام است؟",
      options: ["sin(x)/cos(x)", "cos(x)/sin(x)", "1/tan(x)", "هر دو گزینه ۲ و ۳"],
      correctIndex: 3,
      answer: "گزینه ۴: cot(x) = cos(x)/sin(x) = 1/tan(x)"
    },
    {
      id: 21,
      text: "sin(90°) چند است؟",
      options: ["۰", "۱/۲", "۱", "√۳/۲"],
      correctIndex: 2,
      answer: "گزینه ۳: sin(90°) = 1"
    },
    {
      id: 22,
      text: "cos(0°) چند است؟",
      options: ["۰", "۱/۲", "۱", "√۳/۲"],
      correctIndex: 2,
      answer: "گزینه ۳: cos(0°) = 1"
    },
    {
      id: 23,
      text: "tan(60°) چند است؟",
      options: ["۱", "√۳", "۲", "۱/√۳"],
      correctIndex: 1,
      answer: "گزینه ۲: tan(60°) = √3"
    },
    {
      id: 24,
      text: "معادله sin(x) = 0.5 در بازه [0, 2π] چند جواب دارد؟",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲: sin(x) = 0.5 در بازه [0, 2π] دو جواب دارد: x = π/6 و x = 5π/6"
    },
    {
      id: 25,
      text: "قضیه سینوس برای مثلث ABC چه می‌گوید؟",
      options: ["a/sin(A) = b/sin(B) = c/sin(C)", "a² = b² + c² - 2bc·cos(A)", "A+B+C = 180°", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: قضیه سینوس می‌گوید a/sin(A) = b/sin(B) = c/sin(C)"
    },
    {
      id: 26,
      text: "قضیه کسینوس برای مثلث ABC با اضلاع a, b, c و زاویه A کدام است؟",
      options: ["a² = b² + c² - 2bc·cos(A)", "a² = b² + c² + 2bc·cos(A)", "sin²(A) + cos²(A) = 1", "a = b + c"],
      correctIndex: 0,
      answer: "گزینه ۱: قضیه کسینوس: a² = b² + c² - 2bc·cos(A)"
    },
    {
      id: 27,
      text: "مساحت مثلث با دو ضلع ۵ و ۶ و زاویه بین آنها ۳۰° چند است؟",
      options: ["۱۵", "۷.۵", "۳۰", "۱۰"],
      correctIndex: 1,
      answer: "گزینه ۲: S = ½ × 5 × 6 × sin(30°) = ½ × 30 × ½ = 7.5"
    },
    {
      id: 28,
      text: "sin(45°) چند است؟",
      options: ["۱/۲", "√۲/۲", "√۳/۲", "۱"],
      correctIndex: 1,
      answer: "گزینه ۲: sin(45°) = √2/2"
    },
    {
      id: 29,
      text: "cos(90°) چند است؟",
      options: ["۰", "۱", "-۱", "۱/۲"],
      correctIndex: 0,
      answer: "گزینه ۱: cos(90°) = 0"
    },
    {
      id: 30,
      text: "اگر sin(x) = 3/5 و x در ربع اول باشد، cos(x) چند است؟",
      options: ["۴/۵", "۳/۵", "۲/۵", "۱/۵"],
      correctIndex: 0,
      answer: "گزینه ۱: cos(x) = √(1 - sin²(x)) = √(1 - 9/25) = √(16/25) = 4/5"
    },

    // ==================== فصل سوم: حد و پیوستگی (۱۵ سوال) ====================
    {
      id: 31,
      text: "حد تابع f(x) = 3x + 2 در x→1 کدام است؟",
      options: ["۳", "۵", "۴", "۲"],
      correctIndex: 1,
      answer: "گزینه ۲: lim(x→1) (3x+2) = 3(1)+2 = 5"
    },
    {
      id: 32,
      text: "حد تابع f(x) = (x²-1)/(x-1) در x→1 کدام است؟",
      options: ["۰", "۱", "۲", "۳"],
      correctIndex: 2,
      answer: "گزینه ۳: (x²-1)/(x-1) = (x-1)(x+1)/(x-1) = x+1 → lim = 1+1 = 2"
    },
    {
      id: 33,
      text: "شرط پیوستگی تابع f در نقطه a چیست؟",
      options: ["حد چپ = حد راست", "حد تابع = f(a)", "حد چپ = f(a)", "حد راست = f(a)"],
      correctIndex: 1,
      answer: "گزینه ۲: تابع f در نقطه a پیوسته است اگر lim(x→a) f(x) = f(a)"
    },
    {
      id: 34,
      text: "حد تابع f(x) = 1/x در x→0+ کدام است؟",
      options: ["۰", "۱", "+∞", "-∞"],
      correctIndex: 2,
      answer: "گزینه ۳: وقتی x از سمت راست به ۰ نزدیک می‌شود، 1/x به +∞ میل می‌کند."
    },
    {
      id: 35,
      text: "حد تابع f(x) = sin(x)/x در x→0 کدام است؟",
      options: ["۰", "۱", "∞", "ناموجود"],
      correctIndex: 1,
      answer: "گزینه ۲: حد معروف lim(x→0) sin(x)/x = 1"
    },
    {
      id: 36,
      text: "تعریف حد تابع در نقطه a با استفاده از ε-δ چه نام دارد؟",
      options: ["تعریف اپسیلون-دلتا", "تعریف کوشی", "تعریف هاینه", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: تعریف حد با استفاده از ε-δ، تعریف اپسیلون-دلتا نام دارد."
    },
    {
      id: 37,
      text: "تابع f(x) = |x| در x=0 چه ویژگی‌هایی دارد؟",
      options: ["پیوسته است و مشتق‌پذیر نیست", "پیوسته است و مشتق‌پذیر است", "ناپیوسته است", "حد ندارد"],
      correctIndex: 0,
      answer: "گزینه ۱: تابع قدر مطلق در x=0 پیوسته است ولی مشتق چپ و راست برابر نیستند."
    },
    {
      id: 38,
      text: "حد تابع f(x) = x² - 3x + 2 در x→2 کدام است؟",
      options: ["۰", "۱", "۲", "۳"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→2) (x²-3x+2) = 4-6+2 = 0"
    },
    {
      id: 39,
      text: "قضیه مقدار میانی در ریاضیات چه می‌گوید؟",
      options: ["تابع پیوسته در بازه بسته، همه مقادیر بین دو مقدار خود را می‌گیرد", "تابع مشتق‌پذیر است", "تابع یک‌به‌یک است", "تابع روی است"],
      correctIndex: 0,
      answer: "گزینه ۱: قضیه مقدار میانی می‌گوید تابع پیوسته در بازه بسته، همه مقادیر بین f(a) و f(b) را می‌گیرد."
    },
    {
      id: 40,
      text: "حد تابع f(x) = (x²-4)/(x-2) در x→2 کدام است؟",
      options: ["۴", "۲", "۰", "∞"],
      correctIndex: 0,
      answer: "گزینه ۱: (x²-4)/(x-2) = (x-2)(x+2)/(x-2) = x+2 → lim = 2+2 = 4"
    },
    {
      id: 41,
      text: "حد تابع f(x) = 2x/(x-1) در x→1- کدام است؟",
      options: ["+∞", "-∞", "۲", "ناموجود"],
      correctIndex: 1,
      answer: "گزینه ۲: وقتی x از سمت چپ به ۱ نزدیک می‌شود، x-1 منفی است و 2x مثبت، پس 2x/(x-1) → -∞"
    },
    {
      id: 42,
      text: "مفهوم پیوستگی در یک نقطه چیست؟",
      options: ["حد تابع در آن نقطه برابر مقدار تابع است", "تابع در آن نقطه تعریف شده است", "حد چپ و راست برابرند", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: برای پیوستگی در نقطه a، باید تابع در a تعریف شده باشد، حد چپ و راست برابر باشند و حد با f(a) برابر باشد."
    },
    {
      id: 43,
      text: "حد تابع f(x) = (3x²-5x+2)/(x-1) در x→1 کدام است؟",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱: با ساده‌سازی: (3x²-5x+2)/(x-1) = (x-1)(3x-2)/(x-1) = 3x-2 → lim = 3-2 = 1"
    },
    {
      id: 44,
      text: "حد تابع f(x) = e^x در x→+∞ کدام است؟",
      options: ["۰", "۱", "+∞", "-∞"],
      correctIndex: 2,
      answer: "گزینه ۳: lim(x→+∞) e^x = +∞"
    },
    {
      id: 45,
      text: "حد تابع f(x) = 1/x² در x→∞ کدام است؟",
      options: ["۰", "۱", "∞", "ناموجود"],
      correctIndex: 0,
      answer: "گزینه ۱: lim(x→∞) 1/x² = 0"
    },

    // ==================== فصل چهارم: مشتق (۱۵ سوال) ====================
    {
      id: 46,
      text: "مشتق تابع f(x) = 3x² + 2x - 1 چیست؟",
      options: ["6x + 2", "6x - 2", "3x² + 2", "6x + 1"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 6x + 2"
    },
    {
      id: 47,
      text: "مشتق تابع f(x) = sin(x) چیست؟",
      options: ["cos(x)", "-cos(x)", "sin(x)", "tan(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق sin(x) برابر cos(x) است."
    },
    {
      id: 48,
      text: "مشتق تابع f(x) = e^x چیست؟",
      options: ["e^x", "xe^(x-1)", "e", "ln(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق e^x برابر خودش یعنی e^x است."
    },
    {
      id: 49,
      text: "مشتق تابع f(x) = ln(x) چیست؟",
      options: ["1/x", "x", "1", "ln(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق ln(x) برابر 1/x است."
    },
    {
      id: 50,
      text: "مشتق تابع f(x) = x⁵ - 2x³ + x چیست؟",
      options: ["5x⁴ - 6x² + 1", "5x⁴ - 6x³ + 1", "5x⁴ - 2x² + 1", "5x⁴ - 2x² + x"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 5x⁴ - 6x² + 1"
    },
    {
      id: 51,
      text: "نقطه بحرانی تابع f(x) = x² - 4x + 3 کدام است؟",
      options: ["x = 2", "x = 1", "x = 3", "x = -2"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 2x - 4 = 0 → x = 2"
    },
    {
      id: 52,
      text: "قاعده ضرب برای مشتق f(x)·g(x) چیست؟",
      options: ["f'(x)·g(x) + f(x)·g'(x)", "f'(x)·g'(x)", "f(x)·g'(x)", "f'(x)·g(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: قاعده ضرب: (f·g)' = f'·g + f·g'"
    },
    {
      id: 53,
      text: "قاعده زنجیره‌ای برای مشتق f(g(x)) چیست؟",
      options: ["f'(g(x))·g'(x)", "f'(x)·g'(x)", "f(g(x))·g'(x)", "f'(g(x))"],
      correctIndex: 0,
      answer: "گزینه ۱: قاعده زنجیره‌ای: (f(g(x)))' = f'(g(x))·g'(x)"
    },
    {
      id: 54,
      text: "مشتق تابع f(x) = cos(x) چیست؟",
      options: ["-sin(x)", "sin(x)", "cos(x)", "-cos(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق cos(x) برابر -sin(x) است."
    },
    {
      id: 55,
      text: "مشتق تابع f(x) = tan(x) چیست؟",
      options: ["sec²(x)", "csc²(x)", "sin(x)/cos²(x)", "1/cos²(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق tan(x) برابر sec²(x) است."
    },
    {
      id: 56,
      text: "مشتق تابع f(x) = 2ˣ چیست؟",
      options: ["2ˣ·ln(2)", "2ˣ", "x·2^(x-1)", "ln(2)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق aˣ برابر aˣ·ln(a) است، پس 2ˣ·ln(2)"
    },
    {
      id: 57,
      text: "مشتق تابع f(x) = √x چیست؟",
      options: ["1/(2√x)", "2√x", "1/√x", "x^(-1/2)"],
      correctIndex: 0,
      answer: "گزینه ۱: مشتق √x = x^(1/2) برابر 1/(2√x) است."
    },
    {
      id: 58,
      text: "مشتق تابع f(x) = x²·sin(x) با استفاده از قاعده ضرب چیست؟",
      options: ["2x·sin(x) + x²·cos(x)", "2x·cos(x)", "x²·cos(x)", "2x·sin(x) - x²·cos(x)"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 2x·sin(x) + x²·cos(x)"
    },
    {
      id: 59,
      text: "شیب خط مماس بر منحنی f(x) = x² در نقطه x = 1 کدام است؟",
      options: ["۲", "۱", "۰", "۴"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 2x → f'(1) = 2"
    },
    {
      id: 60,
      text: "نقطه مینیمم تابع f(x) = x² - 4x + 3 کدام است؟",
      options: ["(2,-1)", "(2,0)", "(1,-2)", "(3,0)"],
      correctIndex: 0,
      answer: "گزینه ۱: f'(x) = 2x-4 = 0 → x=2، f(2) = 4-8+3 = -1 → (2,-1)"
    }
  ];

  // State ها
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

  // محاسبه امتیاز با useCallback
  const calculateScore = useCallback(() => {
    let correctCount = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correctCount++;
      }
    });
    const percentage = (correctCount / questions.length) * 100;
    setScore(percentage);
    setHasCalculated(true);
  }, [selectedAnswers]);

  // تایمر
  useEffect(() => {
    if (isTimeUp || hasCalculated) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimeUp, hasCalculated]);

  // وقتی زمان تمام شد، امتیاز را محاسبه کن (با setTimeout برای جلوگیری از setState مستقیم در effect)
  useEffect(() => {
    if (isTimeUp && !hasCalculated) {
      const timer = setTimeout(() => {
        calculateScore();
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isTimeUp, hasCalculated, calculateScore]);

  const handleOptionClick = (questionId: number, optionIndex: number) => {
    if (isTimeUp) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
    
    if (hasCalculated) {
      setHasCalculated(false);
      setScore(null);
    }
  };

  const isAllAnswered = questions.every(q => selectedAnswers[q.id] !== undefined);
  const canCalculate = isAllAnswered && !hasCalculated && !isTimeUp;

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

  const handleCalculateScore = useCallback(() => {
    calculateScore();
    setIsTimeUp(true);
  }, [calculateScore]);

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
      
      <div style={{
        backgroundColor: '#1A237E',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/sanjesh/first-half/riyazi-2-tajrobi')}
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
          ← بازگشت به فصل‌ها
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>📐 آزمون جامع کل کتاب ریاضی (۲) - تجربی</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>ویژه آزمون‌های قلمچی - شامل {questions.length} سوال ترکیبی از ۴ فصل</p>
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
            gap: '10px',
            border: isTimeUp ? '2px solid #ffcccc' : '1px solid rgba(255,255,255,0.3)'
          }}>
            <span>⏱️</span>
            <span>{isTimeUp ? 'زمان تمام شد!' : formatTime(timeLeft)}</span>
          </div>
        </div>
        {!isTimeUp && <p style={{ fontSize: '14px', opacity: 0.7, marginTop: '5px' }}>زمان باقی‌مانده</p>}
      </div>

      <div style={{ width: '100%' }}>
        {questions.map((q, index) => (
          <div key={q.id} style={{
            marginBottom: '25px',
            backgroundColor: '#ffffff',
            padding: '20px 25px',
            borderRadius: '0px',
            borderBottom: '2px solid #e9ecef',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
            width: '100%'
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
                backgroundColor: '#1A237E',
                color: 'white',
                width: '30px',
                height: '30px',
                textAlign: 'center',
                lineHeight: '30px',
                borderRadius: '50%',
                fontSize: '14px',
                marginLeft: '15px',
                marginTop: '2px',
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
                const disabled = isTimeUp; 
                
                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(q.id, idx)}
                    disabled={disabled}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '12px 18px',
                      border: isSelected ? '3px solid #1A237E' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
                      cursor: disabled ? 'not-allowed' : 'pointer',
                      fontSize: '15px',
                      textAlign: 'right',
                      transition: 'all 0.2s',
                      width: '100%',
                      opacity: disabled && !isSelected ? 0.6 : 1
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
                      backgroundColor: isSelected ? '#1A237E' : '#fff',
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

        {(isAllAnswered || hasCalculated || isTimeUp) && (
          <div style={{
            marginTop: '30px', 
            marginBottom: '30px', 
            padding: '20px', 
            backgroundColor: '#ffffff', 
            borderRadius: '12px', 
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
              
              <div>
                {!hasCalculated ? (
                  <button
                    onClick={handleCalculateScore}
                    disabled={!canCalculate}
                    style={{
                      padding: '12px 30px',
                      fontSize: '18px',
                      backgroundColor: canCalculate ? '#1A237E' : '#6c757d',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      cursor: canCalculate ? 'pointer' : 'not-allowed',
                      fontWeight: 'bold',
                      opacity: canCalculate ? 1 : 0.6
                    }}
                  >
                    {!isAllAnswered && !isTimeUp ? 'لطفاً به همه سوالات پاسخ دهید' : 'محاسبه درصد'}
                  </button>
                ) : (
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1A237E' }}>
                    ✅ درصد شما: <span style={{ color: getScoreColor(score!), fontSize: '22px' }}>{Math.round(score!)}%</span>
                    {isTimeUp && hasCalculated && <span style={{ fontSize: '14px', color: '#dc3545', marginRight: '15px' }}>(زمان پایان یافت)</span>}
                  </div>
                )}
              </div>

              {hasCalculated && (
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{
                    width: '100%',
                    height: '15px',
                    backgroundColor: '#e9ecef',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    marginTop: '5px'
                  }}>
                    <div style={{
                      width: `${score}%`,
                      height: '100%',
                      backgroundColor: getScoreColor(score!),
                      transition: 'width 0.5s ease-in-out'
                    }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '60px' }}>
          <button
            onClick={() => setShowAnswers(!showAnswers)}
            style={{
              padding: '18px 50px',
              fontSize: '20px',
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

        {showAnswers && (
          <div style={{
            marginTop: '30px',
            borderTop: '4px solid #1A237E',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #1A237E', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#1A237E'
            }}>
              📝 پاسخنامه تشریحی آزمون جامع ریاضی (۲) - تجربی
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
                  <div style={{ fontSize: '18px', lineHeight: '2' }}>
                    <span style={{ 
                      fontWeight: 'bold', 
                      color: '#1A237E',
                      backgroundColor: '#e8eaf6',
                      padding: '5px 15px',
                      borderRadius: '20px',
                      display: 'inline-block',
                      marginBottom: '10px'
                    }}>
                      سوال {index + 1}
                    </span>
                    <br />
                    <span style={{ fontWeight: 'bold', color: '#28a745' }}>✅ پاسخ صحیح:</span> <span style={{ fontSize: '16px' }}>{q.options[q.correctIndex]}</span>
                    <br />
                    {userAnswer !== undefined && (
                      <span>
                        <span style={{ fontWeight: 'bold', color: isCorrect ? '#28a745' : '#dc3545' }}>
                          {isCorrect ? '✔️ پاسخ شما صحیح است' : '❌ پاسخ شما نادرست است'}
                        </span>
                        <span style={{ fontSize: '16px', color: '#666', marginRight: '10px' }}>
                          (شما گزینه {String.fromCharCode(65 + userAnswer)} را انتخاب کردید)
                        </span>
                        <br />
                      </span>
                    )}
                    <span style={{ fontWeight: 'bold', color: '#1A237E' }}>📖 توضیح کامل:</span> 
                    <br />
                    <span style={{ fontSize: '16px', lineHeight: '1.8' }}>{q.answer}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Math2FinalExam;