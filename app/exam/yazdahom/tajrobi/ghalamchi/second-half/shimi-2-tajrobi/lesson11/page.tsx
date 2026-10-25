"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const Shimi2lesson11 = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات درس ۱۱: ترموشیمی =================
  // بازه سوالات ۵۱ تا ۲۰۰ (از صفحه ۱۱ تا ۴۱) - ۱۰ سوال رندوم
  const questions = [
    {
      id: 52,
      text: "وقتی n مول آب در یک مول سولفوریک اسید حل می‌شود، مقدار گرمای آزادشده برحسب ژول از این رابطه به دست می‌آید:\nQ(J) = (۷/۴۷ × ۱۰⁴ × n) / (n + ۱/۸)\nاگر ۷۲g آب را در یک مول H₂SO₄ حل کنیم، با گرمای آزادشده دمای چند گرم آب را می‌توانیم از ۰°C تا ۸۷°C بالا ببریم؟ (ظرفیت گرمایی آب ۴/۲ J.g⁻¹.°C⁻¹ است)",
      options: ["۱۴۱", "۴۵۴", "۲۰۴", "۸۱۸"],
      correctIndex: 0,
      answer: "گزینه ۱ (۱۴۱). n = ۷۲/۱۸ = ۴ مول. Q = (۷/۴۷×۱۰⁴ × ۴)/(۴+۱/۸) = ۵۱۵۱۷/۲ ژول. Q = mcΔθ → ۵۱۵۱۷/۲ = m × ۴/۲ × ۸۷ → m = ۱۴۱ گرم"
    },
    {
      id: 53,
      text: "گرافیت و الماس دو آلوتروپ از کربن هستند که گرمای حاصل از سوختن آن‌ها با اکسیژن با یکدیگر متفاوت است. در صورتی که ۶g گرافیت در اختیار داشته باشیم چه مقدار الماس کمتری نسبت به گرافیت استفاده کنیم تا مقدار گرمای آزادشده توسط هر دو واکنش یکسان باشد؟ (C = ۱۲ g.mol⁻¹)\nC(s, گرافیت) + O₂(g) → CO₂(g)  ΔH = -۳۹۳/۵ kJ\nC(s, الماس) + O₂(g) → CO₂(g)  ΔH = -۳۹۵/۴ kJ",
      options: ["۱g", "۰/۰۳g", "۰/۰۵g", "۰/۰۵g"],
      correctIndex: 1,
      answer: "گزینه 2 (۰/۰۳g). ۶g گرافیت = ۰/۵ مول → ۰/۵ × ۳۹۳/۵ = ۱۹۶/۷۵ kJ. برای الماس: x/۱۲ × ۳۹۵/۴ = ۱۹۶/۷۵ → x = ۵/۹۷g. اختلاف = ۶ - ۵/۹۷ = ۰/۰۳g"
    },
    {
      id: 56,
      text: "ﭼﻪ ﺗﻌﺪاد از ﻋﺒﺎرت ﻫﺎی زﯾﺮ درﺳﺖ اﺳﺖ؟ \n اﻟﻒ) آﻧﺘﺎﻟﭙﯽ واﮐﻨﺶ ﺑﻪ دﻣﺎی واﮐﻨﺶ دﻫﻨﺪه ﻫﺎ و ﻓﺮآورده ﻫﺎ ﺑﺮﺧﻼف ﻓﺸﺎر آن ﻫﺎ واﺑﺴﺘﻪ اﺳﺖ.\n ب) اﮐﺴﺎﯾﺶ ﮔﻠﻮﮐﺰ ﺑﺎ ﺟﺬب اﻧﺮژی ﻫﻤﺮاه اﺳﺖ. \n پ) تغییر آﻧﺘﺎﻟﭙﯽ واﮐﻨﺶ ﻫﻢ ارز ﺑﺎ ﮔﺮﻣﺎﯾﯽ اﺳﺖ ﮐﻪ در ﻓﺸﺎر ﺛﺎﺑﺖ ﺑﺎ ﻣﺤﯿﻂ ﭘﯿﺮاﻣﻮن دادوﺳﺘﺪ ﻣﯽ ﮐﻨﺪ.\n ت) آﻧﺘﺎﻟﭙﯽ ﯾﮏ ﺳﺎﻣﺎﻧﻪ ﻫﻢ ارز ﺑﺎ ﻣﺠﻤﻮع اﻧﺮژی ﻫﺎی ﺟﻨﺒﺸﯽ و ﭘﺘﺎﻧﺴﯿﻞ ذره ﻫﺎی ﺳﺎزﻧﺪۀ ﺳﺎﻣﺎﻧﻪ اﺳﺖ. \n",
      options: ["1", "2", "3", "4"],
      correctIndex: 1,
      answer: "گزینه 2 (۸۱۰/۴). x مول کامل + y مول ناقص = ۰/۵ مول. ۵x + ۳/۵y = ۲/۲ مول O₂ → x = ۰/۳ و y = ۰/۲. Q = ۰/۳ × ۱۸۹۸ + ۰/۲ × ۱۲۰۵ = ۵۶۹/۴ + ۲۴۱ = ۸۱۰/۴ kJ"
    },
    {
      id: 66,
      text: "اﮔﺮ ﯾﮏ ﻣﺎﻫﯽ ﻗﺰل آﻻ ﺣﺎوی 3 درﺻﺪ ﮐﺮﺑﻮﻫﯿﺪرات، 5 درﺻﺪ ﭼﺮﺑﯽ و 17 درﺻﺪ ﭘﺮوﺗﺌﯿﻦ ﺑﺎﺷﺪ، ﺑﺎ ﺧﻮردن ﯾﮏ ﻣﺎﻫﯽ 300 ﮔﺮﻣﯽ، ﭼﻨﺪ ﮐﯿﻠﻮژول اﻧﺮژی ﺑﻪ ﺑﺪنﻣﯽ رﺳﺪ؟ (ارزش ﺳﻮﺧﺘﯽ ﮐﺮﺑﻮﻫﯿﺪرات، ﭼﺮﺑﯽ و ﭘﺮوﺗﺌﯿﻦ ﺑﻪ ﺗﺮﺗﯿﺐ 17، 38 و 17 ﮐﯿﻠﻮژول ﺑﺮ ﮔﺮم اﺳﺖ) .",
      options: ["530", "540", "1620", "1590"],
      correctIndex: 3,
      answer: "گزینه 4 (۴۹/۵۴). با ترکیب واکنش‌ها: ΔH = ۸۵ + (-۲۲/۵) + (-۱۹۷/۵) = -۱۳۵ kJ. برای ۲۰g ClF: (۲۰/۵۴/۵) × ۱۳۵ = ۴۹/۵۴ kJ"
    },
    {
      id: 76,
      text: "ﮐﺪام ﮔﺰﯾﻨﻪ درﺳﺖ اﺳﺖ؟\n1-  دادوﺳﺘﺪ ﮔﺮﻣﺎ ﺑﺎ ﻣﺤﯿﻂ ﭘﯿﺮاﻣﻮن و اﯾﺠﺎد ﻧﻮر و ﺻﺪا، از وﯾﮋﮔﯽ ﻫﺎی ﺑﻨﯿﺎدی ﻫﻤﮥ واﮐﻨﺶ ﻫﺎی ﺷﯿﻤﺎﯾﯽ است؟\n۲- زﻏﺎل ﮐﮏ، واﮐﻨﺶ دﻫﻨﺪه ای راﯾﺞ در اﺳﺘﺨﺮاج آﻫﻦ ﺑﻮده ﮐﻪ ﺗﺄﻣﯿﻦ ﮐﻨﻨﺪۀ اﻧﺮژی ﻻزم ﺑﺮای اﻧﺠﺎم اﯾﻦ واﮐﻨﺶ ﻧﯿﺰ هست\n۳- در واﮐﻨﺶ اﮐﺴﺎﯾﺶ ﮔﻠﻮﮐﺰ در ﺑﺪن ﺗﻌﺪاد ﻣﻮل ﮔﺎزی ﻓﺮآورده ﻫﺎ دو ﺑﺮاﺑﺮ ﺗﻌﺪاد ﻣﻮل ﮔﺎزی واﮐﻨﺶ دﻫﻨﺪه ﻫﺎ اﺳت\n ۴- در واﮐﻨﺶ اﮐﺴﺎﯾﺶ ﮔﻠﻮﮐﺰ ﺑﻪ دﻟﯿﻞ آزاد ﺷﺪن ﻣﻘﺪار زﯾﺎدی اﻧﺮژی دﻣﺎی ﻓﺮآورده ﻫﺎی واﮐﻨﺶ ﺑﺴﯿﺎر ﮐﻤﺘﺮ از دﻣﺎی واﮐﻨﺶ دﻫﻨﺪه ﻫﺎ است",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 1,
      answer: "گزینه ۲ (بوتان، ۴۰). بوتان: ۳(C-C) + ۱۰(C-H) = ۳(۳۴۸) + ۱۰(۴۱۲) = ۵۱۶۴. سیکلوبوتان: ۴(C-C) + ۸(C-H) = ۴(۳۴۸) + ۸(۴۱۲) = ۴۶۸۸. ΔH = ۵۱۶۴ - ۴۶۸۸ - ۴۳۶ = ۴۰ kJ. بوتان پایدارتر است."
    },
    {
      id: 90,
      text: "ﭼﻪ ﺗﻌﺪاد از ﻋﺒﺎرت ﻫﺎی زﯾﺮ درﺳﺖ ﻫﺴﺘﻨﺪ؟\nاﻟﻒ) در واﮐﻨﺶ ﻫﺎﯾﯽ ﺑﺎ دﻣﺎی ﺛﺎﺑﺖ، ﺗﺒﺎدل اﻧﺮژی ﺑﯿﻦ ﻣﺤﯿﻂ و ﺳﺎﻣﺎﻧﻪ رخ ﻧﻤﯽ دﻫﺪ.\n ب) در ﻓﺮآﯾﻨﺪ ﮔﺮﻣﺎﮔﯿﺮ، ﮔﺮﻣﺎ از ﻣﺤﯿﻂ ﺑﻪ ﺳﺎﻣﺎﻧﻪ ﻣﻨﺘﻘﻞ ﻣﯽ ﺷﻮد.\n پ) اﻧﺠﻤﺎد آب ﻓﺮآﯾﻨﺪی ﮔﺮﻣﺎده اﺳﺖ.\n ت) ﺗﺒﺪﯾﻞ ﮐﺮﺑﻦ دی اﮐﺴﯿﺪ ﺟﺎﻣﺪ ﺑﻪ ﮔﺎز ﮐﺮﺑﻦ دی اﮐﺴﯿﺪ ﻓﺮآﯾﻨﺪی ﮔﺮﻣﺎﮔﯿﺮ اﺳﺖ.",
      options: ["۱", "۲", "۳", "۴"],
      correctIndex: 2,
      answer: "گزینه 3 (۲۰/۲۵). ۲C + ۳H₂ → C₂H₆: ΔH = ۲(-۳۹۳) + ۳(-۲۸۵) + ۱۵۶۰ = -۸۱ kJ. برای ۶g گرافیت (۰/۵ مول): ۰/۵/۲ × ۸۱ = ۲۰/۲۵ kJ"
    },
    {
      id: 104,
      text: "از واکنش ۵ گرم گاز هیدروژن با I₂(g) در دما و فشار معین ۳۷/۲ کیلوژول گرما آزاد می‌شود؛ اما هنگامی‌که همین مقدار گاز هیدروژن با I₂(s) در همان شرایط واکنش می‌دهد، ۱۳۲/۴ کیلوژول گرما مصرف می‌شود. آنتالپی تصعید ید چند کیلوژول بر مول است؟",
      options: ["+۲۳۸", "+۶۷/۸۴", "+۳۸/۱۲", "+۹۵/۲"],
      correctIndex: 1,
      answer: "گزینه ۲ (+۶۷/۸۴). ۵g H₂ = ۲/۵ مول. ΔH برای ۱ مول H₂ با I₂(g): -۳۷/۲/۲/۵ = -۱۴/۸۸ kJ. با I₂(s): +۱۳۲/۴/۲/۵ = +۵۲/۹۶ kJ. تصعید: ۵۲/۹۶ - (-۱۴/۸۸) = ۶۷/۸۴ kJ"
    },
    {
      id: 105,
      text: "اتیل آمین (C2H5NH2) در حالت گازی طی یک واکنش گرماگیر مطابق معادله زیر به گازهای اتن (C2H4) و آمونیاک (NH₃) تجزیه می‌شود. با استفاده از مقادیر آنتالپی‌های پیوند داده شده در جدول زیر، آنتالپی پیوند C – N چقدر است؟\nC2H5NH2 → C2H4 + NH3  ΔH = ۵۳/۶ kJ.mol⁻¹\n(آنرژی پیوند: N-H: ۳۹۱، C=C: ۶۱۴، C-C: ۳۴۸، C-H: ۴۱۵)",
      options: ["۲۰۸/۶", "۱۸۸/۴", "۲۳۶/۴", "۲۹۵/۶"],
      correctIndex: 3,
      answer: "گزینه ۴ (۲۹۵/۶). ΔH = [(C-C) + (C-H) + (C-N)] - [(C=C) + (N-H)] = ۵۳/۶ = [۳۴۸ + ۴۱۵ + x] - [۶۱۴ + ۳۹۱] → ۵۳/۶ = ۷۶۳ + x - ۱۰۰۵ → x = ۲۹۵/۶"
    },
    {
      id: 147,
      text: "مقداری آمونیاک طی واکنش زیر، ۱۲ مول فرآورده ایجاد می‌کند. اگر آنتالپی این واکنش، صد برابر گرمای لازم برای افزایش دمای این مقدار آمونیاک از ۲۵°C به ۱۲۰°C باشد، میانگین آنتالپی پیوند N – H بر حسب کیلوژول بر مول کدام است؟ (گرمای ویژه آمونیاک را ۱/۱۵ J.g⁻¹.°C⁻¹ در نظر بگیرید) (N = ۱۴, H = ۱: g.mol⁻¹)\nNH₃(g) → NH(g) + ۲H(g)",
      options: ["۳۷۷", "۳۹۵", "۳۸۶", "۳۹۱"],
      correctIndex: 3,
      answer: "گزینه 4 (۳۹۱). ۱۲ مول فرآورده = ۴ مول NH₃. Q = ۴ × ۱۷ × ۱/۱۵ × ۹۵ = ۷۴۲۹ J. ΔH = ۱۰۰ × ۷/۴۳ = ۷۴۳ kJ برای ۴ مول. برای ۱ مول: ۱۸۵/۷۵ kJ. هر NH₃ دو پیوند N-H می‌شکند: ΔH(N-H) = ۱۸۵/۷۵/۲ × ۴ = ۳۹۱ kJ"
    },
    {
      id: 194,
      text: "یک ظرف دربسته فولادی با دمای ۲۵°C و جرم ۳ کیلوگرم داریم. داخل این ظرف ۵/۶ گرم اتن به همراه اکسیژن کافی می‌سوزد. اگر ۷۰ درصد از گرمای حاصل از سوختن اتن توسط ظرف جذب شود، دمای ظرف به چند درجه سلسیوس می‌رسد؟ (گرمای ویژه فولاد ۰/۵ J.g⁻¹.°C⁻¹ است) (واکنش موازنه شود)\n(آنتالپی پیوند: C=C: ۶۲۰، C-H: ۴۱۵، O=O: ۵۰۰، C=O: ۸۰۰، O-H: ۴۷۰ kJ.mol⁻¹)\nC₂H₄(g) + O₂(g) → CO₂(g) + H₂O(g)",
      options: ["۱۲۱", "۱۴۶", "۱۷۲", "۱۹۷"],
      correctIndex: 1,
      answer: "گزینه 2 (۱۴۶). ΔH = [۶۲۰ + ۴(۴۱۵) + ۳(۵۰۰)] - [۴(۸۰۰) + ۴(۴۷۰)] = -۱۳۰۰ kJ. ۵/۶g اتن = ۰/۲ مول → ۲۶۰ kJ. ۷۰٪ = ۱۸۲ kJ. Q = mcΔθ → ۱۸۲۰۰۰ = ۳۰۰۰ × ۰/۵ × Δθ → Δθ = ۱۲۱°C. دما = ۲۵ + ۱۲۱ = ۱۴۶°C"
    }
=======
  // ================= سوالات درس ۲-۴: ترموشیمی =================
  const questions = [
    
    {
      id: 134,
      text: "اگر به 160 گرم آب با دمای 10°C، 41800 ژول گرما داده شود، دمای آن 62/5 درجه افزایش می‌یابد. در آزمایش دیگر همان 160 گرم آب با دمای 10°C را با 1000 گرم روغن زیتون با دمای 70°C مخلوط می‌کنیم که به دمای تعادل 55°C می‌رسند. حال اگر به یک کیلوگرم روغن و یک کیلوگرم آب (در دو ظرف جداگانه و دمای یکسان) هرکدام به طور جداگانه 60 kJ گرما داده شود، تفاوت دمای این دو ماده، به تقریب چند درجه سانتی‌گراد خواهد بود؟",
      options: ["23", "32", "43", "55"],
      correctIndex: 0,
      answer: "۲۳ درجه سانتی‌گراد"
    },
    
    {
      id: 136,
      text: "مجموع آنتالپی‌های پیوند در دو گاز اتان و پروپان برابر با 2820 و 3992 کیلوژول است. تفاوت آنتالپی پیوندهای C – C و C – H چند کیلوژول بر مول است؟",
      options: ["64", "45", "46", "54"],
      correctIndex: 0,
      answer: "۶۴ کیلوژول بر مول"
    },
    
    {
      id: 138,
      text: "مقداری آمونیاک طی واکنش NH₃(g) → NH(g) + 2H(g)، 12 مول فرآورده ایجاد می‌کند. اگر آنتالپی این واکنش، صد برابر گرمای لازم برای افزایش دمای این مقدار آمونیاک از 25°C به 100°C باشد، ΔH این واکنش بر حسب کیلوژول بر مول کدام است؟ (گرمای ویژۀ آمونیاک را 1/15 J.g⁻¹.C⁻¹ در نظر بگیرید) (N = 14, H = 1: g.mol⁻¹)",
      options: ["395", "391", "377", "386"],
      correctIndex: 0,
      answer: "۳۹۵ کیلوژول بر مول"
    },
    
    {
      id: 140,
      text: "کدام گزینه زیر درست است؟\n۱) در واکنش تجزیه دی‌نیتروژن تترااکسید به نیتروژن دی‌اکسید علامت Q منفی است.\n۲) در واکنش تجزیه هیدروژن پراکسید پایداری فرآورده‌ها از پایداری واکنش‌دهنده بیشتر است.\n۳) سطح انرژی واکنش‌دهنده‌ها در واکنش فتوسنتز از سطح انرژی فرآورده‌ها بیشتر است.\n۴) انحلال کلسیم کلرید خشک در آب، گرم‌گیر است.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 1,
      answer: "گزینه ۲ درست است."
    },
    
    
    {
      id: 143,
      text: "۲۲ گرم گاز پروپان را با ۷۰/۴ گرم گاز اکسیژن می‌سوزانیم. به‌علت کمبود اکسیژن، علاوه بر سوختن کامل، مقداری از پروپان به‌طور ناقص مطابق معادله‌های ترموشیمیایی زیر سوخته و در پایان تمام پروپان و اکسیژن مصرف می‌شوند. مقدار گرمای آزاد شده در این فرایند برحسب کیلوژول کدام است؟ (C = 12, H = 1: g.mol⁻¹)\nC₃H₈(g) + 5O₂(g) → 3CO₂(g) + 4H₂O(g)  ΔH = -1898 kJ\n۲C₃H₈(g) + 7O₂(g) → 6CO(g) + 8H₂O(g)  ΔH = -2410 kJ",
      options: ["912/5", "1077", "741/4", "810/4"],
      correctIndex: 0,
      answer: "۹۱۲/۵ کیلوژول"
    },
    
    {
      id: 145,
      text: "اگر آنتالپی سوختن متان با گرمای آزادشده از سوختن ۱۷/۸ گرم پروپان برابر باشد، بر اثر سوختن ۴ گرم متان چند kJ انرژی آزاد می‌شود؟ (آنتالپی سوختن پروپان را -2220 کیلوژول بر مول در نظر بگیرید) (C = 12, H = 1: g.mol⁻¹)",
      options: ["236/5", "236/5", "222/5", "222/5"],
      correctIndex: 0,
      answer: "۲۳۶/۵ کیلوژول"
    },
    
    {
      id: 147,
      text: "کدام گزینه نادرست است؟\n۱) ΔH یک واکنش به راهی که برای انجام واکنش انتخاب می‌کند، وابسته نیست.\n۲) استفاده از آنتالپی پیوند، همانند قانون هس، راهی غیرمستقیم برای محاسبة گرمای واکنش است.\n۳) به کار بردن آنتالپی‌های پیوند برای تعیین ΔH واکنش‌هایی مناسب است که همه اجزای آن واکنش به حالت گاز باشند.\n۴) پیچیدگی مولکول‌ها در یک واکنش گازی، با اختلاف گرمای محاسبه‌شده به کمک آنتالپی پیوند و داده‌های تجربی، رابطه عکس دارد.",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 3,
      answer: "گزینه ۴ نادرست است."
    },
    
    {
      id: 149,
      text: "کشاورزی در گلخانه خود ۲۰۰ نهال سیب کاشته است. اگر هر نهال روزانه ۳ لیتر گاز اکسیژن تولید کند، گرمای مصرف شده توسط این نهال‌ها در مدت یک هفته در عمل فتوسنتز، برحسب کیلوژول کدام است؟ (چگالی گاز اکسیژن را در شرایط گلخانه ۱/۶ گرم بر لیتر و تغییر آنتالپی را در واکنش موازنه شده فتوسنتز، ۲۸۰۰ کیلوژول بر مول در نظر بگیرید) (O₂ = ۳۲ g.mol⁻¹)\n۶CO₂(g) + ۶H₂O(l) → C₆H₁₂O₆(s) + ۶O₂(g)",
      options: ["98000", "14000", "58800", "84000"],
      correctIndex: 2,
      answer: "۵۸۸۰۰ کیلوژول"
    },
    
    {
      id: 151,
      text: "کدام گزینه، جاهای خالی موجود در جمله زیر را به درستی کامل می‌کند؟\nمقدار آنتالپی پیوند ...... از آنتالپی پیوند ...... در شرایط یکسان ...... است.\n۱) O – H, کوچک‌تر\n۲) N – H, بزرگ‌تر\n۳) C = C, کوچک‌تر\n۴) H – Cl, بزرگ‌تر",
      options: ["گزینه ۱", "گزینه ۲", "گزینه ۳", "گزینه ۴"],
      correctIndex: 0,
      answer: "گزینه ۱ درست است."
    },
    
    
    {
      id: 154,
      text: "اگر برای شکستن همۀ پیوندهای موجود در ۶/۴ گرم متان و تبدیل آنها به اتم‌های سازنده، ۸۳۰ کیلوژول انرژی صرف شود، میانگین آنتالپی پیوند C – H در مولکول متان چند کیلوژول بر مول است؟ (C = 12, H = 1: g.mol⁻¹)",
      options: ["540", "415", "400", "450"],
      correctIndex: 1,
      answer: "۴۱۵ کیلوژول بر مول"
    },
    
  ];

  // ==================== State ====================
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [isScoreCalculated, setIsScoreCalculated] = useState(false);
  const [timeLeft, setTimeLeft] = useState(50 * 60); // 50 دقیقه
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
        backgroundColor: '#2196F3',
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🔥 درس ۱۱: ترموشیمی</h1>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🧪 درس ۲-۴: ترموشیمی</h1>
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
                backgroundColor: '#2196F3',
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
                      border: isSelected ? '3px solid #2196F3' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e3f2fd' : '#fff',
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
                      backgroundColor: isSelected ? '#2196F3' : '#fff',
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
                  backgroundColor: canCalculate ? '#2196F3' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#2196F3' }}>
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
            borderTop: '4px solid #2196F3',
            paddingTop: '40px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            width: '100%'
          }}>
            <h2 style={{ 
              textAlign: 'center', 
              borderBottom: '3px solid #2196F3', 
              paddingBottom: '20px', 
              marginBottom: '40px',
              fontSize: '26px',
              color: '#2196F3'
            }}>
              📝 پاسخنامه تشریحی - درس ۱۱: ترموشیمی
              📝 پاسخنامه تشریحی - درس ۲-۴: ترموشیمی
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
                      color: '#2196F3',
                      backgroundColor: '#e3f2fd',
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
                    <span style={{ fontWeight: 'bold', color: '#2196F3' }}>📖 توضیح:</span> 
                    <br />
                    <span style={{ fontSize: '15px', lineHeight: '1.8', color: '#333' }}>{q.answer}</span>
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

export default Shimi2Lesson11;

