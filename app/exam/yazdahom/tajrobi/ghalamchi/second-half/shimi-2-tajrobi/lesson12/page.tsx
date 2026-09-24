"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson12 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات فصل سوم شیمی یازدهم تجربی (کامل) =================
  const questions = [
    // ==================== سوال ۱ (صفحه ۲) ====================
    {
      id: 1,
      text: "تشکیل الیاف سلولز با تولید آب همراه است. اگر هر رشته از الیاف سلولز از اتصال ۳۰۰ مولکول گلوکز به یکدیگر تشکیل شده باشد و فرمول مولکولی هر رشته از آن C₁₈₀₀₀H₃₀₂₀₀O₁₅₁₀₀ باشد، به ازای تولید یک کیلوگرم سلولز به تقریب چند مولکول آب تولید می‌شود؟",
      options: ["۳/۶ N_A", "N_A", "۵/۹ N_A", "۷/۲ N_A"],
      correctIndex: 2,
      answer: "جرم مولی سلولز = ۱۸۰۰۰×۱۲ + ۳۰۲۰۰×۱ + ۱۵۱۰۰×۱۶ = ۴۸۷۸۰۰ g/mol\nتعداد مول سلولز = ۱۰۰۰ ÷ ۴۸۷۸۰۰ ≈ ۰/۰۰۲۰۵ mol\nهر مول سلولز ۲۹۰۰ مول آب تولید می‌کند\nتعداد مول آب = ۰/۰۰۲۰۵ × ۲۹۰۰ ≈ ۵/۹ mol\nتعداد مولکول آب = ۵/۹ × N_A"
    },
    // ==================== سوال ۲ (صفحه ۲) ====================
    {
      id: 2,
      text: "باتوجه به شکل، چند مورد از مطالب زیر نادرست است؟\nالف) نمایی ساده از الیاف سلولز و مولکول‌های سازندۀ آن در پنبه را نشان می‌دهد.\nب) سلولز را می‌توان پلیمری طبیعی با فرمول کلی (C₆H₁₂O₆)ₙ در نظر گرفت.\nپ) حلقه‌های گلوکز در آن از طریق پیوندهای استری به یکدیگر متصل شده‌اند.\nت) واحد سازندۀ الیاف سلولز با واحد سازندۀ مولکول‌های نشاسته یکسان است.",
      options: ["0", "1", "2","3"],
      correctIndex: 0,
      answer: "عبارت‌های درست: الف، پ و ت (۳ مورد)\nعبارت نادرست: ب - فرمول کلی سلولز (C₆H₁₀O₅)ₙ است نه (C₆H₁₂O₆)ₙ"
    },
    // ==================== سوال ۳ (صفحه ۲) ====================
    {
      id: 3,
      text: "کدام مطلب درست است؟",
      options: [
        "در همۀ درشت مولکول‌ها بخش‌هایی هست که در سرتاسر مولکول تکرار شده است",
        "پلیمرهای حاصل از هیدروکربن‌های سیرنشده، سیرشده هستند",
        "جرم پلیمر حاصل از پلیمری شدن اتن، به مقدار کاتالیزگرهای واکنش بستگی دارد",
        "در ساختار پلیمر به کاررفته در سرنگ، اتم هالوژن وجود ندارد"
      ],
      correctIndex: 3,
      answer: "در ساختار پلیمر به کار رفته در سرنگ (پلی‌پروپین) اتم هالوژن وجود ندارد و تنها از کربن و هیدروژن تشکیل شده است."
    },
    // ==================== سوال ۴ (صفحه ۲) ====================
    {
      id: 4,
      text: "چه تعداد از عبارت‌های زیر، درست هستند؟\nالف) جرم مولی و نوع اتم‌های سازندۀ درشت مولکول‌ها، بسیار زیاد است.\nب) ترتیب: پلی‌اتن > نفتالن > پروپان > آب، را می‌توان به قدرت نیروهای بین مولکولی این ترکیب‌ها نسبت داد.\nپ) برخلاف الیاف ساختگی، الیاف طبیعی تنها برای تهیۀ پارچه و پوشاک به کار می‌رود.\nت) ترتیب: نایلون > گلوکز > سیکلوهگزان > بنزن، را می‌توان به جرم مولی آن‌ها نسبت داد.",
      options: ["2", "1", "3", "4"],
      correctIndex: 2,
      answer: "عبارت‌های درست: الف و ت (۲ مورد)\nعبارت نادرست: ب - ترتیب نیروهای بین مولکولی: آب > پروپان > نفتالن > پلی‌اتن\nعبارت نادرست: پ - الیاف طبیعی کاربردهای متنوعی دارند"
    },
    // ==================== سوال ۵ (صفحه ۳) ====================
    {
      id: 5,
      text: "همۀ گزینه‌های زیر درست هستند، به‌جز:",
      options: [
        "پنبه از الیاف سلولز تشکیل شده و هر مولکول سلولز از اتصال تعداد بسیار زیادی مولکول گلوکز به یکدیگر حاصل شده است",
        "پلی‌اتن جامدی سفیدرنگ است که دما و فشار بالا از گاز اتن حاصل می‌شود",
        "تعیین تعداد دقیق مونومرهای شرکت‌کننده در یک واکنش پلیمری ممکن نیست به همین دلیل نمی‌توان فرمول مولکولی دقیقی برای پلیمرها بیان کرد",
        "تمام درشت مولکول‌ها به نوعی پلیمر هستند"
      ],
      correctIndex: 3,
      answer: "تمامی عبارت‌ها درست هستند، بنابراین گزینه ۴ (همه درست هستند) پاسخ صحیح است."
    },
    // ==================== سوال ۶ (صفحه ۳) ====================
    {
      id: 6,
      text: "چه تعداد از عبارت‌های زیر درست است؟\nالف) اگر گاز اتن را در فشار بالا گرما دهیم، جامد سفیدرنگی پدید می‌آید.\nب) پلی‌پروپین و پلی‌وینیل کلرید به ترتیب در سرنگ و کیسهٔ خون به کار رفته‌اند.\nپ) پلی‌اتن مذاب را در دستگاهی با عمل دمیدن هوا به ورقهٔ نازک پلاستیکی تبدیل می‌کنند.\nت) مرۀ ترش ریواس به دلیل وجود گروه عاملی کربوکسیل در آن است.",
      options: ["1", "2", "3", "4"],
      correctIndex: 2,
      answer: "عبارت‌های درست: الف، ب و پ (۳ مورد)\nعبارت نادرست: ت - ترشی ریواس به دلیل وجود اسید اگزالیک است نه گروه کربوکسیل"
    },
    // ==================== سوال ۷ (صفحه ۳) ====================
    {
      id: 7,
      text: "چه تعداد از عبارت‌های زیر درست است؟\nالف) درصد جرمی کربن در پلی‌اتن شاخه‌دار، بیشتر از این درصد در پلی‌اتن بدون شاخه است.\nب) نقطۀ ذوب پلی‌اتن شاخه‌دار کمتر از پلی‌اتن بدون شاخه است.\nپ) میزان استحکام پلی‌اتن سنگین از پلی‌اتن سبک بیشتر است.\nت) شفافیت پلی‌اتن شاخه‌دار بیشتر از پلی‌اتن بدون شاخه است.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 3,
      answer: "تمامی عبارت‌ها درست هستند:\nالف) درصد جرمی کربن در هر دو نوع پلی‌اتن یکسان است\nب) نقطه ذوب پلی‌اتن شاخه‌دار کمتر است\nپ) استحکام پلی‌اتن سنگین بیشتر است\nت) شفافیت پلی‌اتن شاخه‌دار بیشتر است"
    },
    // ==================== سوال ۸ (صفحه ۳) ====================
    {
      id: 8,
      text: "پاسخ درست پرسش 'ب' و پاسخ نادرست پرسش‌های 'الف' و 'پ' به ترتیب در کدام گزینه یافت می‌شود؟\nالف) در ساختار مولکولی زیر (وینیل کلرید) چند الکترون پیوندی وجود دارد؟\nب) پلی‌آمید از واکنش بین کدام ۲ دسته تشکیل می‌شود؟\nپ) در ساخت سرنگ از کدام پلیمر استفاده می‌شود؟",
      options: [
        "۶۲، دی‌آمین و دی‌اسید، تفلون",
        "۳۱، دی‌الکل و دی‌اسید، پلی‌پروپین",
        "۳۱، دی‌آمین و دی‌اسید، تفلون",
        "۶۲، دی‌آمین و دی‌اسید، پلی‌پروپین"
      ],
      correctIndex: 3,
      answer: "الف) در وینیل کلرید: ۶۲ الکترون پیوندی (۳۱ جفت)\nب) پلی‌آمید از واکنش دی‌آمین و دی‌اسید تشکیل می‌شود\nپ) در ساخت سرنگ از پلی‌پروپین استفاده می‌شود"
    },
    // ==================== سوال ۹ (صفحه ۳) ====================
    {
      id: 9,
      text: "تعداد زنجیر پلیمری ساخته شده است و هر زنجیر از اتصال چند مولکول سیانواتن به وجود آمده است؟\n(H = 1, C = 12, N = 14 : g.mol⁻¹, 1amu = 1/66 × 10⁻²⁴ g)",
      options: [
        "۲۴۰۰۰، ۶/۲۵×۱۰¹⁶",
        "۲۴۰۰۰، ۶/۲۵×۱۰¹⁴",
        "۲۴۰۰۰، ۶/۲۵×۱۰¹⁶",
        "۲۴۰۰۰، ۶/۲۵×۱۰¹⁴"
      ],
      correctIndex: 0,
      answer: "جرم یک مولکول سیانواتن = ۵۳ × ۱/۶۶×۱۰⁻²⁴ = ۸۷/۹۸×۱۰⁻²⁴ g\nn = (۳/۳۹۲×۱۰⁻¹⁸) ÷ (۸۷/۹۸×۱۰⁻²⁴) ≈ ۲۴۰۰۰\nتعداد زنجیرها = ۰/۰۰۴ ÷ (۲۴۰۰۰×۸۷/۹۸×۱۰⁻²⁴) = ۶/۲۵×۱۰¹⁶"
    },
    // ==================== سوال ۱۰ (صفحه ۴) ====================
    {
      id: 10,
      text: "چه تعداد از عبارت‌های زیر درست است؟\nالف) اتن در شرایط گوناگون واکنش پلیمری شدن را انجام داده و فرآورده‌هایی با ساختار متفاوت ایجاد می‌کند.\nب) پلی‌اتن سنگین را در دستگاهی با عمل دمیدن هوا به ورقه‌های نازک پلاستیکی تبدیل می‌کنند.\nپ) پلیمرهای ساخته شده در صنعت تنها از واکنش مونومرهای دارای پیوند دوگانۀ 'کربن-کربن' به دست می‌آیند.\nت) در ترکیب‌های آلی، بخش‌هایی که پیوندهای 'کربن- اکسیژن' دارند، بخش قطبی مولکول را تشکیل می‌دهند.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "عبارت‌های درست: الف و ت (۲ مورد)\nعبارت نادرست: ب - پلی‌اتن سبک را با دمیدن هوا به ورقه تبدیل می‌کنند\nعبارت نادرست: پ - پلیمرها از واکنش‌های مختلفی حاصل می‌شوند"
    },
    // ==================== سوال ۱۱ (صفحه ۴) ====================
    {
      id: 11,
      text: "(C = 12, N = 14, F = 19, H = 1 : g.mol⁻¹) کدام مطلب نادرست است؟",
      options: [
        "تعداد هیدروژن‌های استیرن، چهار برابر تعداد پیوندهای دوگانه در وینیل کلرید است",
        "اتانول و H₃C-O-CH₃ ایزومر یکدیگر محسوب می‌شوند",
        "تفاوت جرم مولی سیانواتن و تترافلوئورواتن برابر با ۴۷ گرم است",
        "کولار پلی‌آمیدی است که از فولاد هم‌جرم خود ۵ برابر مقاوم‌تر است"
      ],
      correctIndex: 2,
      answer: "جرم مولی سیانواتن (C₃H₇N) = ۵۷ g/mol\nجرم مولی تترافلوئورواتن (C₂F₄) = ۱۰۰ g/mol\nتفاوت = ۴۳ گرم، نه ۴۷ گرم"
    },
    // ==================== سوال ۱۲ (صفحه ۴) ====================
    {
      id: 12,
      text: "در چه تعداد از پلیمرهای زیر تنها اتم‌های کربن و هیدروژن وجود دارد؟\nالف) پلی‌استیرن\nب) پلی‌وینیل کلرید\nپ) پلی‌پروپن\nت) تفلون\nج) پلی‌سیانواتن",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "پلیمرهایی که فقط C و H دارند:\nالف) پلی‌استیرن ✓\nپ) پلی‌پروپن ✓\nپلیمرهای دارای عناصر دیگر:\nب) پلی‌وینیل کلرید: دارای Cl\nت) تفلون: دارای F\nج) پلی‌سیانواتن: دارای N\nپاسخ: ۲ مورد"
    },
    // ==================== سوال ۱۳ (صفحه ۴) ====================
    {
      id: 13,
      text: "هر مولکول نمونه‌ای از پلی‌استیرن به طور متوسط ۸۰۰ واحد تکرارشونده دارد. جرم ۳/۰۱×۱۰²¹ درشت مولکول از این نمونه، چند گرم خواهد بود؟\n(H = 1, C = 12 : g.mol⁻¹)",
      options: ["۲۰۸", "۴۱۶", "۲۰۸", "۴۱۶"],
      correctIndex: 1,
      answer: "جرم مولی استیرن = ۱۰۴ g/mol\nجرم مولی پلیمر = ۱۰۴ × ۸۰۰ = ۸۳۲۰۰ g/mol\n۱ mol = ۶/۰۲×۱۰²³ درشت‌مولکول ≈ ۸۳۲۰۰ g\n۳/۰۱×۱۰²¹ درشت‌مولکول = (۳/۰۱×۱۰²¹ ÷ ۶/۰۲×۱۰²³) × ۸۳۲۰۰ = ۴۱۶ g"
    },
    // ==================== سوال ۱۴ (صفحه ۵) ====================
    {
      id: 14,
      text: "پلی‌وینیل استات پلیمری است که در تهیۀ انواع پاستیل به کار می‌رود. باتوجه به فرمول ساختاری وینیل استات، ساختار این پلیمر کدام است؟",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 1,
      answer: "پلی‌وینیل استات از پلیمری شدن وینیل استات تولید می‌شود. ساختار آن به صورت زنجیره‌ای با گروه استات (-O-CO-CH₃) متصل به کربن است."
    },
    // ==================== سوال ۱۵ (صفحه ۵) ====================
    {
      id: 15,
      text: "در یک نمونۀ پلی‌استایرن به جرم ۵/۲ کیلوگرم نسبت جرم اتم‌های کربن به جرم اتم‌های هیدروژن کدام است؟\n(H = ۱, C = ۱۲ : g.mol⁻¹)",
      options: ["۸", "۱۲", "۵", "۷"],
      correctIndex: 1,
      answer: "فرمول استیرن: C₈H₈\nفرمول پلی‌استیرن: (C₈H₈)ₙ\nنسبت جرم کربن به هیدروژن = (۱۲×۸) ÷ (۱×۸) = ۱۲"
    },
    // ==================== سوال ۱۶ (صفحه ۵) ====================
    {
      id: 16,
      text: "چه تعداد از عبارت‌های زیر درست هستند؟\nالف) باتوجه به شرایط واکنش پلیمری شدن، می‌توانیم تعداد دقیق مونومرهای شرکت‌کننده در واکنش پلیمری شدن را تعیین کنیم.\nب) می‌توانیم با تغییر مونومر در واکنش پلیمری شدن، پلیمرهای جدید با ساختار و خواص متفاوت تهیه کنیم.\nپ) دلیل کاربرد وسیع تفلون، ویژگی‌های خاص آن مثل نچسب بودن و حل نشدن در حلال‌های آلی است.\nت) در ساختار پلیمر به کاررفته در نخ دندان، اتم هالوژن وجود دارد.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "عبارت‌های درست: ب، پ و ت (۳ مورد)\nعبارت نادرست: الف - نمی‌توان تعداد دقیق مونومرها را تعیین کرد"
    },
    // ==================== سوال ۱۷ (صفحه ۵) ====================
    {
      id: 17,
      text: "اگر در پلی‌اتن به‌جای یکی از هیدروژن‌های آن یک بار کلر و یک بار حلقة بنزنی قرار دهیم، پلیمرهای جدید به ترتیب در چه مواردی استفاده می‌شوند؟",
      options: [
        "کیسه خون - ظروف یک‌بارمصرف",
        "ظروف یک‌بارمصرف - کیسه خون",
        "پتو - کیسه خون",
        "کیسه خون - پتو"
      ],
      correctIndex: 2,
      answer: "جایگزینی کلر به جای H → پلی‌وینیل کلرید (PVC) → کیسه خون\nجایگزینی حلقه بنزنی → پلی‌استیرن → ظروف یک‌بارمصرف"
    },
    // ==================== سوال ۱۸ (صفحه ۵) ====================
    {
      id: 18,
      text: "اگر در ساختار مونومرهای سازندۀ یک نمونه پلی‌سیانواتن، درمجموع ۷/۵ گرم اتم هیدروژن وجود داشته باشد، جرم این نمونه پلیمر چند گرم است؟\n(H = ۱, C = ۱۲, N = ۱۴ : g.mol⁻¹)",
      options: ["۵۳", "۱۳۲/۵", "۱۰۶", "۲۶۵"],
      correctIndex: 1,
      answer: "فرمول پلی‌سیانواتن: (C₃H₇N)ₙ\nدر هر واحد تکرارشونده ۷ اتم H وجود دارد\n۷/۵ g H → ۷/۵ mol H\nتعداد واحدها = ۷/۵/۷ ≈ ۱/۰۷ mol\nجرم پلیمر = ۱/۰۷ × ۵۳ = ۱۳۲/۵ g"
    },
    // ==================== سوال ۱۹ (صفحه ۶) ====================
    {
      id: 19,
      text: "اگر بازدۀ درصدی واکنش پلیمری شدن پلی‌استیرن ۸۳ درصد باشد، ۱۳۰ گرم پلی‌استیرن از واکنش تقریباً چند مول استیرن تولید شده است؟\n(C = ۱۲, H = ۱ : g.mol⁻¹)",
      options: ["۱/۰۴", "۳", "۱/۵", "۲/۰۸"],
      correctIndex: 2,
      answer: "جرم مولی استیرن = ۱۰۴ g/mol\nمول استیرن مورد نیاز = (۱۳۰ ÷ ۱۰۴) × (۱۰۰ ÷ ۸۳) = ۱/۵ mol"
    },
    // ==================== سوال ۲۰ (صفحه ۶) ====================
    {
      id: 20,
      text: "نسبت تعداد اتم‌های هیدروژن در مونومر سازندۀ پلی‌استیرن به تعداد پیوندهای کووالانس موجود در مونومر سازندۀ پلی‌سیانواتن برابر با چند است؟",
      options: ["۱", "۴", "۸", "۱"],
      correctIndex: 3,
      answer: "استیرن (C₈H₈): ۸ اتم H\nسیانواتن (C₃H₇N): پیوندهای کووالانس = (۳×۴ + ۷×۱ + ۳×۱) ÷ ۲ = ۱۱\nنسبت = ۸ ÷ ۱۱ = ۸/۱۱ ≠ ۱"
    },
    // ==================== سوال ۲۱ (صفحه ۶) ====================
    
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
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/second-half/shimi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 فصل سوم شیمی یازدهم تجربی</h1>
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
              alignItems: 'flex-start',
              whiteSpace: 'pre-wrap'
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
                flexShrink: 0,
                marginTop: '2px'
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
              📝 پاسخنامه تشریحی - فصل سوم شیمی یازدهم تجربی
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
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333', whiteSpace: 'pre-wrap' }}>{q.answer}</span>
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

export default Shimi2lesson12;