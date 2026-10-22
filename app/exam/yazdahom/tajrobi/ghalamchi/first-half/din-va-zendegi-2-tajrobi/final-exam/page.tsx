"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const DinVaZendegi2FinalExam = () => {
  const router = useRouter();
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isTimeUpRef = useRef(false);
  const isCalculatedRef = useRef(false);

  // ================= سوالات دین و زندگی (۲) - جامع نیم‌سال دوم =================
  const questions = [
    // ==================== فصل اول: هستی و خداشناسی ====================
    {
      id: 1,
      text: "کدام یک از موارد زیر از راه‌های خداشناسی است؟",
      options: ["برهان نظم", "برهان علّی", "فطرت", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: برهان نظم، برهان علّی و فطرت همه از راه‌های خداشناسی هستند."
    },
    {
      id: 2,
      text: "صفات جمالی خداوند کدامند؟",
      options: ["حیات، علم، قدرت", "عدل، انتقام، جلال", "غضب، قهر، عزت", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: صفات جمالی مانند حیات، علم و قدرت هستند که بیانگر کمال خداوندند."
    },
    {
      id: 3,
      text: "توحید به چه معناست؟",
      options: ["یگانه دانستن خدا", "سه دانستن خدا", "انکار خدا", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: توحید یعنی یگانه دانستن خدا و اعتقاد به یکتایی او."
    },
    {
      id: 4,
      text: "کدام یک از موارد زیر از صفات جلالی خداوند است؟",
      options: ["رحمان", "رحیم", "جبار", "کریم"],
      correctIndex: 2,
      answer: "گزینه ۳: 'جبار' از صفات جلالی خداوند است که بیانگر جبروت و قدرت اوست."
    },
    {
      id: 5,
      text: "برهان نظم بر چه اساسی استوار است؟",
      options: ["وجود نظم در جهان", "وجود شواهد تاریخی", "احساسات انسانی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: برهان نظم بر اساس وجود نظم و هماهنگی در جهان استوار است."
    },
    {
      id: 6,
      text: "اسم اعظم خداوند در قرآن کدام است؟",
      options: ["اللّه", "رحمان", "رحیم", "قدوس"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اللّه' اسم اعظم خداوند است که در قرآن بسیار به کار رفته است."
    },
    {
      id: 7,
      text: "شرک به چه معناست؟",
      options: ["یگانه دانستن خدا", "شریک قائل شدن برای خدا", "انکار خدا", "نادیده گرفتن خدا"],
      correctIndex: 1,
      answer: "گزینه ۲: شرک یعنی برای خدا شریک قائل شدن و چیزی را هم‌تای او دانستن."
    },
    {
      id: 8,
      text: "صفات خداوند به چند دسته تقسیم می‌شوند؟",
      options: ["یک دسته", "دو دسته", "سه دسته", "چهار دسته"],
      correctIndex: 1,
      answer: "گزینه ۲: صفات خداوند به دو دسته صفات جمالی و صفات جلالی تقسیم می‌شوند."
    },
    {
      id: 9,
      text: "کدام یک از موارد زیر از آثار توحید در زندگی است؟",
      options: ["امیدواری", "استقلال", "آرامش", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: توحید آثار زیادی مانند امیدواری، استقلال و آرامش در زندگی دارد."
    },
    {
      id: 10,
      text: "برهان علّی بر چه اساسی استوار است؟",
      options: ["وجود علت برای هر پدیده", "وجود نظم در جهان", "احساسات انسانی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: برهان علّی بر اساس وجود علت برای هر پدیده استوار است."
    },

    // ==================== فصل دوم: نبوت و امامت ====================
    {
      id: 11,
      text: "ضرورت نبوت به چه دلیل است؟",
      options: ["نیاز بشر به هدایت", "نیاز به قوانین الهی", "تعالی انسان", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: انسان برای هدایت، قوانین الهی و تعالی به نبوت نیاز دارد."
    },
    {
      id: 12,
      text: "عصمت پیامبران به چه معناست؟",
      options: ["خطا نکردن در رسالت", "گناه نکردن", "مصون از اشتباه", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عصمت یعنی مصونیت از گناه، خطا و اشتباه در رسالت الهی."
    },
    {
      id: 13,
      text: "ویژگی‌های امام در دیدگاه شیعه کدام است؟",
      options: ["عصمت", "علم لدنی", "نصب الهی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: امام در دیدگاه شیعه باید معصوم، دارای علم لدنی و منصوب از طرف خدا باشد."
    },
    {
      id: 14,
      text: "آیه 'إِنَّمَا وَلِیُّكُمُ اللّٰهُ وَ رَسُولُهُ وَ الَّذِینَ آمَنُوا' در شأن چه کسی نازل شده است؟",
      options: ["امام علی (ع)", "ابوبکر", "عمر", "عثمان"],
      correctIndex: 0,
      answer: "گزینه ۱: این آیه در شأن امام علی (ع) و درباره ولایت ایشان نازل شده است."
    },
    {
      id: 15,
      text: "عصمت پیامبران چه نقشی در هدایت دارد؟",
      options: ["افزایش اعتماد مردم", "کاهش خطا", "تضمین درست بودن پیام", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عصمت باعث افزایش اعتماد، کاهش خطا و تضمین درست بودن پیام الهی می‌شود."
    },
    {
      id: 16,
      text: "امامت چه تفاوتی با نبوت دارد؟",
      options: ["امامت ادامه‌دهنده نبوت است", "نبوت بالاتر از امامت است", "امامت دارای ولایت است", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: امامت ادامه‌دهنده نبوت و دارای ولایت سیاسی و دینی است."
    },
    {
      id: 17,
      text: "کدام یک از پیامبران دارای کتاب آسمانی هستند؟",
      options: ["موسی (ع)", "عیسی (ع)", "محمد (ص)", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: حضرت موسی (تورات)، عیسی (انجیل) و محمد (قرآن) دارای کتاب آسمانی هستند."
    },
    {
      id: 18,
      text: "حدیث غدیر درباره چه موضوعی است؟",
      options: ["ولایت امام علی (ع)", "خدا شناسی", "معاد", "اخلاق"],
      correctIndex: 0,
      answer: "گزینه ۱: حدیث غدیر درباره ولایت و جانشینی امام علی (ع) است."
    },
    {
      id: 19,
      text: "دلیل عصمت امام در دیدگاه شیعه چیست؟",
      options: ["آیات قرآن", "روایات", "عقل", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عصمت امام بر اساس آیات قرآن، روایات و عقل اثبات می‌شود."
    },
    {
      id: 20,
      text: "پیامبر اسلام (ص) در چه سالی به پیامبری مبعوث شد؟",
      options: ["۵۷۰ میلادی", "۶۱۰ میلادی", "۶۲۲ میلادی", "۶۳۲ میلادی"],
      correctIndex: 1,
      answer: "گزینه ۲: پیامبر اسلام (ص) در سال ۶۱۰ میلادی به پیامبری مبعوث شدند."
    },

    // ==================== فصل سوم: معاد و آخرت‌شناسی ====================
    {
      id: 21,
      text: "معاد به چه معناست؟",
      options: ["زندگی دوباره", "مرگ", "جهنم", "بهشت"],
      correctIndex: 0,
      answer: "گزینه ۱: معاد به معنای زندگی دوباره و رستاخیز پس از مرگ است."
    },
    {
      id: 22,
      text: "برزخ به چه معناست؟",
      options: ["عالم پس از مرگ تا قیامت", "جهنم", "بهشت", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: برزخ عالم فاصله بین مرگ تا قیامت است که انسان در آن به سر می‌برد."
    },
    {
      id: 23,
      text: "در قیامت چه وقایعی رخ می‌دهد؟",
      options: ["حساب و کتاب", "پاداش و کیفر", "نور و ظلمت", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: در قیامت حساب و کتاب، پاداش و کیفر و نور و ظلمت رخ می‌دهد."
    },
    {
      id: 24,
      text: "بهشت در قرآن چگونه توصیف شده است؟",
      options: ["باغ‌هایی با نهرهای جاری", "میوه‌های فراوان", "نعمت‌های جاودان", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: بهشت در قرآن به باغ‌هایی با نهرهای جاری، میوه‌های فراوان و نعمت‌های جاودان توصیف شده است."
    },
    {
      id: 25,
      text: "جهنم در قرآن چگونه توصیف شده است؟",
      options: ["آتش سوزان", "غذای زقوم", "زنجیر و غل و زنجیر", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: جهنم در قرآن به آتش سوزان، غذای زقوم و زنجیر و غل و زنجیر توصیف شده است."
    },
    {
      id: 26,
      text: "دلیل عقلی معاد چیست؟",
      options: ["عدالت الهی", "حکمت الهی", "وعد و وعید الهی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: عدالت الهی، حکمت الهی و وعد و وعید الهی از دلایل عقلی معاد هستند."
    },
    {
      id: 27,
      text: "در روز قیامت چه کتابی به انسان داده می‌شود؟",
      options: ["کتاب اعمال", "کتاب دعا", "کتاب قرآن", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: در روز قیامت به انسان کتاب اعمال او داده می‌شود که همه کارهایش در آن ثبت شده است."
    },
    {
      id: 28,
      text: "نعمت‌های بهشتی از چه نوعی هستند؟",
      options: ["مادی", "معنوی", "هر دو", "هیچ کدام"],
      correctIndex: 2,
      answer: "گزینه ۳: نعمت‌های بهشتی هم مادی و هم معنوی هستند و از هر دو نوع لذت دارند."
    },
    {
      id: 29,
      text: "عذاب‌های جهنمی از چه نوعی هستند؟",
      options: ["فیزیکی", "روحی", "هر دو", "هیچ کدام"],
      correctIndex: 2,
      answer: "گزینه ۳: عذاب‌های جهنمی هم فیزیکی و هم روحی هستند و از هر دو نوع رنج دارند."
    },
    {
      id: 30,
      text: "آیه 'كُلُّ نَفْسٍ ذَائِقَةُ الْمَوْتِ' بر چه موضوعی دلالت دارد؟",
      options: ["مرگ", "زندگی", "معاد", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: این آیه بر حتمی بودن مرگ برای هر انسانی دلالت دارد."
    },

    // ==================== فصل چهارم: اخلاق و سبک زندگی ====================
    {
      id: 31,
      text: "اخلاق فردی به چه موضوعاتی می‌پردازد؟",
      options: ["خودسازی", "تزکیه نفس", "مبارزه با رذایل", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اخلاق فردی به خودسازی، تزکیه نفس و مبارزه با رذایل اخلاقی می‌پردازد."
    },
    {
      id: 32,
      text: "عدالت در اسلام چه جایگاهی دارد؟",
      options: ["ارزشی اساسی", "فرعی", "غیر ضروری", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: عدالت در اسلام ارزشی اساسی و زیربنایی دارد و بر همه ابعاد زندگی حاکم است."
    },
    {
      id: 33,
      text: "احسان به چه معناست؟",
      options: ["نیکوکاری", "بدکاری", "بی‌تفاوتی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: احسان به معنای نیکوکاری و انجام کارهای خیر برای دیگران است."
    },
    {
      id: 34,
      text: "سبک زندگی اسلامی بر چه اصولی استوار است؟",
      options: ["توحید", "عدالت", "اخلاق", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: سبک زندگی اسلامی بر اصول توحید، عدالت و اخلاق استوار است."
    },
    {
      id: 35,
      text: "نقش خانواده در اسلام چیست؟",
      options: ["محیط تربیت", "محیط آرامش", "محیط رشد", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: خانواده در اسلام محیط تربیت، آرامش و رشد اعضای خود است."
    },
    {
      id: 36,
      text: "اقتصاد در اسلام بر چه اصولی استوار است؟",
      options: ["عدالت", "اخلاق", "انصاف", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اقتصاد در اسلام بر اصول عدالت، اخلاق و انصاف استوار است."
    },
    {
      id: 37,
      text: "رذایل اخلاقی کدامند؟",
      options: ["حسد", "کبر", "بخل", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: حسد، کبر و بخل از رذایل اخلاقی هستند که انسان باید با آنها مبارزه کند."
    },
    {
      id: 38,
      text: "فضایل اخلاقی کدامند؟",
      options: ["تواضع", "سخاوت", "حلم", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: تواضع، سخاوت و حلم از فضایل اخلاقی هستند که انسان باید آنها را کسب کند."
    },
    {
      id: 39,
      text: "اسلام به تغذیه سالم چه نگاهی دارد؟",
      options: ["مهم", "بی‌اهمیت", "ممنوع", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: اسلام به تغذیه سالم و بهداشت فردی اهمیت زیادی می‌دهد."
    },
    {
      id: 40,
      text: "حقوق دیگران در اسلام چه جایگاهی دارد؟",
      options: ["بسیار مهم", "بی‌اهمیت", "فرعی", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: حقوق دیگران در اسلام بسیار مهم است و رعایت آن از واجبات است."
    },
    {
      id: 41,
      text: "تزکیه نفس به چه معناست؟",
      options: ["پالایش روح", "آراستن به اخلاق نیک", "هر دو", "هیچ کدام"],
      correctIndex: 2,
      answer: "گزینه ۳: تزکیه نفس هم به معنای پالایش روح از رذایل و هم آراستن به فضایل اخلاقی است."
    },
    {
      id: 42,
      text: "آیه 'إِنَّ اللّهَ یَأْمُرُ بِالْعَدْلِ وَ الْإِحْسَانِ' بر چه موضوعی دلالت دارد؟",
      options: ["عدالت و احسان", "نماز و روزه", "حج و زکات", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: این آیه بر لزوم عدالت و احسان در زندگی دلالت دارد."
    },
    {
      id: 43,
      text: "هدف نهایی اخلاق اسلامی چیست؟",
      options: ["قرب الهی", "خوشبختی دنیوی", "ثروت", "شهرت"],
      correctIndex: 0,
      answer: "گزینه ۱: هدف نهایی اخلاق اسلامی، قرب الهی و رسیدن به کمال انسانی است."
    },
    {
      id: 44,
      text: "در اسلام، مهم‌ترین رذیله اخلاقی کدام است؟",
      options: ["کبر", "حسد", "بخل", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: کبر، حسد و بخل همگی از مهم‌ترین رذایل اخلاقی در اسلام هستند."
    },
    {
      id: 45,
      text: "انسان متقی در قرآن چگونه توصیف شده است؟",
      options: ["مؤمن و پرهیزگار", "ثروتمند", "زیبا", "دانشمند"],
      correctIndex: 0,
      answer: "گزینه ۱: انسان متقی یعنی مؤمن و پرهیزگار که از گناهان دوری می‌کند."
    },

    // ==================== سوالات ترکیبی ====================
    {
      id: 46,
      text: "کدام یک از موارد زیر از اسماء و صفات خداوند است؟",
      options: ["الرحمن", "الرحیم", "الملك", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: الرحمن، الرحیم و الملك همه از اسماء و صفات خداوند هستند."
    },
    {
      id: 47,
      text: "آیه 'لَيْسَ كَمِثْلِهِ شَيْءٌ' بر چه موضوعی دلالت دارد؟",
      options: ["توحید", "تنزیه خداوند", "نفی شباهت خدا به مخلوقات", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: این آیه بر توحید، تنزیه و نفی شباهت خداوند به مخلوقات دلالت دارد."
    },
    {
      id: 48,
      text: "در قرآن، کدام سوره به عنوان 'توحید' شناخته می‌شود؟",
      options: ["سوره حمد", "سوره توحید (اخلاص)", "سوره ناس", "سوره فلق"],
      correctIndex: 1,
      answer: "گزینه ۲: سوره اخلاص (توحید) به عنوان سوره توحید شناخته می‌شود."
    },
    {
      id: 49,
      text: "کدام یک از موارد زیر از ویژگی‌های امامان معصوم است؟",
      options: ["علم غیب", "شفاعت", "ولایت تکوینی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: امامان معصوم دارای علم غیب، شفاعت و ولایت تکوینی هستند."
    },
    {
      id: 50,
      text: "نقش اهل بیت در تفسیر قرآن چیست؟",
      options: ["تفسیر کامل قرآن", "بیان شأن نزول", "تأویل آیات", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اهل بیت نقش مهمی در تفسیر کامل قرآن، بیان شأن نزول و تأویل آیات دارند."
    },
    {
      id: 51,
      text: "آیه 'أَطِیعُوا اللّٰهَ وَ أَطِیعُوا الرَّسُولَ وَ أُولِي الْأَمْرِ مِنکُمْ' بر چه موضوعی دلالت دارد؟",
      options: ["لزوم اطاعت از خدا", "اطاعت از پیامبر", "اطاعت از اولی الامر", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: این آیه بر لزوم اطاعت از خدا، پیامبر و اولی الامر (امامان) دلالت دارد."
    },
    {
      id: 52,
      text: "هدف از آفرینش انسان چیست؟",
      options: ["عبادت", "آزمایش", "رسیدن به کمال", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: هدف از آفرینش انسان عبادت، آزمایش و رسیدن به کمال است."
    },
    {
      id: 53,
      text: "در قیامت انسان‌ها به چند گروه تقسیم می‌شوند؟",
      options: ["دو گروه", "سه گروه", "چهار گروه", "پنج گروه"],
      correctIndex: 1,
      answer: "گزینه ۲: در قیامت انسان‌ها به سه گروه مؤمنان، کافران و منافقان تقسیم می‌شوند."
    },
    {
      id: 54,
      text: "بهشت چند درجه دارد؟",
      options: ["یک درجه", "سه درجه", "هفت درجه", "صد درجه"],
      correctIndex: 3,
      answer: "گزینه ۴: بهشت دارای صد درجه است که هر درجه با دیگری تفاوت دارد."
    },
    {
      id: 55,
      text: "اولین پیامبر اولوالعزم چه کسی است؟",
      options: ["نوح (ع)", "ابراهیم (ع)", "موسی (ع)", "محمد (ص)"],
      correctIndex: 0,
      answer: "گزینه ۱: حضرت نوح (ع) اولین پیامبر اولوالعزم است."
    },
    {
      id: 56,
      text: "پیامبر خاتم کیست؟",
      options: ["عیسی (ع)", "موسی (ع)", "محمد (ص)", "ابراهیم (ع)"],
      correctIndex: 2,
      answer: "گزینه ۳: حضرت محمد (ص) آخرین پیامبر و خاتم الانبیاء است."
    },
    {
      id: 57,
      text: "سؤال قبر در چه عالمی رخ می‌دهد؟",
      options: ["عالم برزخ", "عالم قیامت", "عالم دنیا", "عالم آخرت"],
      correctIndex: 0,
      answer: "گزینه ۱: سؤال قبر در عالم برزخ و پس از مرگ تا روز قیامت رخ می‌دهد."
    },
    {
      id: 58,
      text: "قیامت صغری به چه معناست؟",
      options: ["مرگ انسان", "پایان جهان", "برپایی قیامت", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: قیامت صغری یعنی مرگ انسان و پایان زندگی دنیوی او."
    },
    {
      id: 59,
      text: "فطرت به چه معناست؟",
      options: ["آفرینش اولیه", "سرشت انسان", "آشنایی با خدا", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: فطرت به معنی آفرینش اولیه، سرشت انسان و آشنایی با خدا است."
    },
    {
      id: 60,
      text: "برهان نظم و برهان علّی از چه نوع براهینی هستند؟",
      options: ["برهان عقلی", "برهان نقلی", "برهان تجربی", "برهان فلسفی"],
      correctIndex: 0,
      answer: "گزینه ۱: برهان نظم و برهان علّی از براهین عقلی برای اثبات وجود خدا هستند."
    },
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
        backgroundColor: '#1A237E',
        color: 'white',
        padding: '20px',
        borderRadius: '8px',
        marginBottom: '30px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/gozine2/second-half')}
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
          ← بازگشت به لیست دروس
        </button>
        
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px' }}>🕌 آزمون جامع دین و زندگی (۲)</h1>
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
                      border: isSelected ? '3px solid #1A237E' : '1px solid #dee2e6',
                      borderRadius: '10px',
                      backgroundColor: isSelected ? '#e8eaf6' : '#fff',
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
                  backgroundColor: canCalculate ? '#1A237E' : '#6c757d',
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
              <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#1A237E' }}>
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
              📝 پاسخنامه تشریحی دین و زندگی (۲)
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
                    <span style={{ fontWeight: 'bold', color: '#1A237E' }}>📖 توضیح:</span> 
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

export default DinVaZendegi2FinalExam;