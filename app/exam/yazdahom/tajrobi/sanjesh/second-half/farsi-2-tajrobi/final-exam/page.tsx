"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const FarsiFinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع فارسی (۲) - ۶۰ سوال =================
  const questions = [
    // ==================== فصل اول: ادبیات تعلیمی (۱۵ سوال) ====================
    {
      id: 1,
      text: "کتاب گلستان سعدی در چه قرنی نوشته شده است؟",
      options: ["قرن ششم", "قرن هفتم", "قرن هشتم", "قرن نهم"],
      correctIndex: 1,
      answer: "گزینه ۲: گلستان سعدی در قرن هفتم هجری (سال ۶۵۶ هجری) نوشته شده است."
    },
    {
      id: 2,
      text: "کلیله و دمنه به چه زبانی نوشته شده است؟",
      options: ["فارسی", "عربی", "پهلوی", "سنسکریت"],
      correctIndex: 3,
      answer: "گزینه ۴: کلیله و دمنه در اصل به زبان سنسکریت (هندی) نوشته شده و بعد به فارسی و عربی ترجمه شده است."
    },
    {
      id: 3,
      text: "مهم‌ترین ویژگی بوستان سعدی چیست؟",
      options: ["نثر فنی", "نظم تعلیمی", "داستان‌های عاشقانه", "حماسه سرایی"],
      correctIndex: 1,
      answer: "گزینه ۲: بوستان سعدی یک منظومه تعلیمی است و شامل پندهای اخلاقی و اجتماعی می‌باشد."
    },
    {
      id: 4,
      text: "در گلستان سعدی، راوی چه جایگاهی دارد؟",
      options: ["راوی اول شخص", "راوی سوم شخص", "راوی دانای کل", "راوی عینی"],
      correctIndex: 0,
      answer: "گزینه ۱: در گلستان، سعدی به عنوان راوی اول شخص و نویسنده مستقیم حکایت‌ها حضور دارد."
    },
    {
      id: 5,
      text: "کلیله و دمنه شامل چه نوع داستان‌هایی است؟",
      options: ["تمثیلی و حیوانات", "تاریخی", "عاشقانه", "حماسی"],
      correctIndex: 0,
      answer: "گزینه ۱: کلیله و دمنه شامل داستان‌های تمثیلی با شخصیت‌های حیوانی است که نتیجه‌گیری اخلاقی دارند."
    },
    {
      id: 6,
      text: "سعدی در گلستان از چه نوع نثری استفاده کرده است؟",
      options: ["نثر ساده", "نثر فنی", "نثر مسجع", "نثر علمی"],
      correctIndex: 2,
      answer: "گزینه ۳: سعدی در گلستان از نثر مسجع استفاده کرده است که با نظم و موسیقی همراه است."
    },
    {
      id: 7,
      text: "هدف اصلی ادبیات تعلیمی چیست؟",
      options: ["سرگرمی", "آموزش اخلاق", "ثبت تاریخ", "عشق‌ورزی"],
      correctIndex: 1,
      answer: "گزینه ۲: هدف اصلی ادبیات تعلیمی آموزش مفاهیم اخلاقی و تربیتی به مخاطب است."
    },
    {
      id: 8,
      text: "کدام یک از آثار زیر از سعدی نیست؟",
      options: ["گلستان", "بوستان", "کلیات سعدی", "شاهنامه"],
      correctIndex: 3,
      answer: "گزینه ۴: شاهنامه اثر فردوسی است و به سعدی تعلق ندارد."
    },
    {
      id: 9,
      text: "در داستان‌های کلیله و دمنه، شخصیت‌ها معمولاً چه هستند؟",
      options: ["انسان‌ها", "حیوانات", "فرشتگان", "جن‌ها"],
      correctIndex: 1,
      answer: "گزینه ۲: در کلیله و دمنه، شخصیت‌ها عمدتاً حیوانات هستند که رفتارهای انسانی دارند."
    },
    {
      id: 10,
      text: "مضمون اصلی بوستان سعدی چیست؟",
      options: ["عشق عارفانه", "پند و اندرز", "جنگ و حماسه", "طبیعت‌گرایی"],
      correctIndex: 1,
      answer: "گزینه ۲: مضمون اصلی بوستان سعدی پند و اندرز و آموزش اخلاقیات است."
    },
    {
      id: 11,
      text: "آرایه‌های ادبی در گلستان سعدی شامل چه مواردی است؟",
      options: ["تشبیه و استعاره", "سجع و جناس", "تضاد و مراعات النظیر", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: سعدی در گلستان از انواع آرایه‌های ادبی مانند تشبیه، استعاره، سجع، جناس، تضاد و مراعات النظیر استفاده کرده است."
    },
    {
      id: 12,
      text: "کلیله و دمنه توسط چه کسی به فارسی برگردانده شد؟",
      options: ["سعدی", "فردوسی", "نصرالله منشی", "حافظ"],
      correctIndex: 2,
      answer: "گزینه ۳: کلیله و دمنه توسط نصرالله منشی به فارسی ترجمه شده است."
    },
    {
      id: 13,
      text: "سبک گلستان سعدی چه نام دارد؟",
      options: ["سبک خراسانی", "سبک عراقی", "سبک هندی", "سبک بازگشت"],
      correctIndex: 1,
      answer: "گزینه ۲: گلستان سعدی به سبک عراقی نوشته شده است."
    },
    {
      id: 14,
      text: "یکی از ویژگی‌های ادبیات تعلیمی چیست؟",
      options: ["زبان ساده", "پندآموزی", "داستان‌پردازی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: ادبیات تعلیمی با زبان ساده، پندآموزی و داستان‌پردازی مشخص می‌شود."
    },
    {
      id: 15,
      text: "سعدی در چه شهری به دنیا آمد؟",
      options: ["اصفهان", "شیراز", "تهران", "مشهد"],
      correctIndex: 1,
      answer: "گزینه ۲: سعدی در شهر شیراز متولد شد و در همان شهر نیز درگذشت."
    },

    // ==================== فصل دوم: ادبیات غنایی (۱۵ سوال) ====================
    {
      id: 16,
      text: "غزلیات حافظ در چه قرنی سروده شده است؟",
      options: ["قرن هفتم", "قرن هشتم", "قرن نهم", "قرن دهم"],
      correctIndex: 1,
      answer: "گزینه ۲: حافظ در قرن هشتم هجری می‌زیسته و غزلیات خود را در این قرن سروده است."
    },
    {
      id: 17,
      text: "مثنوی معنوی مولوی شامل چند دفتر است؟",
      options: ["۳ دفتر", "۴ دفتر", "۵ دفتر", "۶ دفتر"],
      correctIndex: 3,
      answer: "گزینه ۴: مثنوی معنوی شامل ۶ دفتر است که بیش از ۲۵ هزار بیت دارد."
    },
    {
      id: 18,
      text: "شعر غنایی به چه نوع شعری گفته می‌شود؟",
      options: ["شعر حماسی", "شعر عاشقانه", "شعر تعلیمی", "شعر فلسفی"],
      correctIndex: 1,
      answer: "گزینه ۲: شعر غنایی به شعر عاشقانه و احساسی گفته می‌شود که عواطف شاعر را بیان می‌کند."
    },
    {
      id: 19,
      text: "حافظ در اشعار خود از چه نوع عشقی سخن می‌گوید؟",
      options: ["عشق زمینی", "عشق عارفانه", "عشق وطنی", "گزینه ۱ و ۲"],
      correctIndex: 3,
      answer: "گزینه ۴: حافظ هم از عشق زمینی و هم از عشق عارفانه سخن گفته و میان این دو پیوند برقرار کرده است."
    },
    {
      id: 20,
      text: "مولوی در مثنوی از چه زبانی استفاده کرده است؟",
      options: ["زبان عربی", "زبان ترکی", "زبان فارسی ساده", "زبان فارسی با آرایه‌های ادبی"],
      correctIndex: 3,
      answer: "گزینه ۴: مولوی در مثنوی از زبان فارسی با آرایه‌های ادبی فراوان استفاده کرده است."
    },
    {
      id: 21,
      text: "شمس تبریزی چه نقشی در زندگی مولوی داشت؟",
      options: ["معلم", "مرشد", "پیر و مراد", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: شمس تبریزی معلم، مرشد و پیر مولوی بود و تأثیر عمیقی بر او گذاشت."
    },
    {
      id: 22,
      text: "رباعیات خیام شامل چه تعداد رباعی است؟",
      options: ["۱۰۰ رباعی", "۲۰۰ رباعی", "۴۰۰ رباعی", "حدود ۵۰۰ رباعی"],
      correctIndex: 3,
      answer: "گزینه ۴: رباعیات خیام شامل حدود ۵۰۰ رباعی (در برخی نسخ ۴۰۰ تا ۵۰۰) می‌باشد."
    },
    {
      id: 23,
      text: "مضمون اصلی اشعار خیام چیست؟",
      options: ["عشق", "جنگ", "فلسفه و نگرش به زندگی", "مذهب"],
      correctIndex: 2,
      answer: "گزینه ۳: اشعار خیام عمدتاً درباره فلسفه، شکوه از دنیا و نگرش او به زندگی است."
    },
    {
      id: 24,
      text: "سعدی در غزلیات خود از چه موضوعاتی سخن می‌گوید؟",
      options: ["عشق و عرفان", "اجتماع", "سیاست", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: سعدی در غزلیات خود عمدتاً از عشق و عرفان سخن می‌گوید."
    },
    {
      id: 25,
      text: "دیوان حافظ شامل چه تعداد غزل است؟",
      options: ["حدود ۴۰۰ غزل", "حدود ۵۰۰ غزل", "حدود ۶۰۰ غزل", "حدود ۷۰۰ غزل"],
      correctIndex: 1,
      answer: "گزینه ۲: دیوان حافظ شامل حدود ۵۰۰ غزل (۴۸۵ غزل) می‌باشد."
    },
    {
      id: 26,
      text: "مولوی در مثنوی از چه نوع داستان‌هایی استفاده کرده است؟",
      options: ["داستان‌های تاریخی", "داستان‌های تمثیلی", "داستان‌های عاشقانه", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: مولوی در مثنوی از انواع داستان‌های تاریخی، تمثیلی و عاشقانه استفاده کرده است."
    },
    {
      id: 27,
      text: "عشق در ادبیات غنایی چه جایگاهی دارد؟",
      options: ["جایگاه محوری", "جایگاه فرعی", "بی‌اهمیت", "غایب"],
      correctIndex: 0,
      answer: "گزینه ۱: عشق در ادبیات غنایی جایگاه محوری و اصلی دارد."
    },
    {
      id: 28,
      text: "حافظ در چه سالی درگذشت؟",
      options: ["۷۹۱ هجری", "۷۹۰ هجری", "۷۹۲ هجری", "۷۹۳ هجری"],
      correctIndex: 0,
      answer: "گزینه ۱: حافظ در سال ۷۹۱ هجری قمری در شیراز درگذشت."
    },
    {
      id: 29,
      text: "یکی از مهم‌ترین ویژگی‌های شعر مولوی چیست؟",
      options: ["استفاده از مفاهیم عرفانی", "زبان ساده", "وزن سنگین", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: یکی از مهم‌ترین ویژگی‌های شعر مولوی، استفاده از مفاهیم عمیق عرفانی است."
    },
    {
      id: 30,
      text: "خیام بیشتر به چه عنوانی شناخته شده است؟",
      options: ["شاعر", "ریاضیدان", "ستاره‌شناس", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: خیام علاوه بر شاعری، ریاضیدان و ستاره‌شناس برجسته‌ای نیز بوده است."
    },

    // ==================== فصل سوم: ادبیات حماسی (۱۵ سوال) ====================
    {
      id: 31,
      text: "شاهنامه فردوسی شامل چند بخش است؟",
      options: ["۲ بخش", "۳ بخش", "۴ بخش", "۵ بخش"],
      correctIndex: 1,
      answer: "گزینه ۲: شاهنامه شامل سه بخش اساطیری، پهلوانی و تاریخی است."
    },
    {
      id: 32,
      text: "داستان رستم و سهراب در کدام بخش شاهنامه قرار دارد؟",
      options: ["بخش اساطیری", "بخش پهلوانی", "بخش تاریخی", "همه موارد"],
      correctIndex: 1,
      answer: "گزینه ۲: داستان رستم و سهراب در بخش پهلوانی شاهنامه قرار دارد."
    },
    {
      id: 33,
      text: "پیام اصلی داستان رستم و سهراب چیست؟",
      options: ["عشق و دوستی", "تراژدی و غرور انسانی", "جنگ و حماسه", "آموزش اخلاق"],
      correctIndex: 1,
      answer: "گزینه ۲: پیام اصلی داستان رستم و سهراب، تراژدی و غرور انسانی است که به فاجعه منجر می‌شود."
    },
    {
      id: 34,
      text: "فردوسی شاهنامه را به چه کسی تقدیم کرده است؟",
      options: ["سلطان محمود غزنوی", "پادشاهان سامانی", "امیران آل بویه", "هیچ کدام"],
      correctIndex: 0,
      answer: "گزینه ۱: فردوسی شاهنامه را به سلطان محمود غزنوی تقدیم کرده است."
    },
    {
      id: 35,
      text: "سبک شاهنامه فردوسی چیست؟",
      options: ["سبک خراسانی", "سبک عراقی", "سبک هندی", "سبک بازگشت"],
      correctIndex: 0,
      answer: "گزینه ۱: شاهنامه به سبک خراسانی (سبک قدیم فارسی) سروده شده است."
    },
    {
      id: 36,
      text: "داستان سیاوش در شاهنامه چه ویژگی‌هایی دارد؟",
      options: ["بی‌گناهی و تراژدی", "قدرت و سلطه", "عشق و عرفان", "طنز"],
      correctIndex: 0,
      answer: "گزینه ۱: داستان سیاوش، داستان بی‌گناهی و تراژدی است که سیاوش به ناحق کشته می‌شود."
    },
    {
      id: 37,
      text: "یکی از شخصیت‌های اصلی شاهنامه در بخش پهلوانی چه کسی است؟",
      options: ["رستم", "کیومرث", "جمشید", "فریدون"],
      correctIndex: 0,
      answer: "گزینه ۱: رستم اصلی‌ترین شخصیت بخش پهلوانی شاهنامه است."
    },
    {
      id: 38,
      text: "ادبیات حماسی چه ویژگی‌هایی دارد؟",
      options: ["قهرمان‌محوری", "جنگ‌های بزرگ", "میهن‌پرستی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: ادبیات حماسی با قهرمان‌محوری، جنگ‌های بزرگ و میهن‌پرستی مشخص می‌شود."
    },
    {
      id: 39,
      text: "زبان شاهنامه چگونه است؟",
      options: ["زبان ساده", "زبان فاخر", "زبان عامیانه", "زبان علمی"],
      correctIndex: 1,
      answer: "گزینه ۲: زبان شاهنامه، زبان فاخر و حماسی است که با واژگان کهن فارسی آمیخته شده است."
    },
    {
      id: 40,
      text: "فردوسی شاهنامه را در چند سال سرود؟",
      options: ["۲۰ سال", "۳۰ سال", "۴۰ سال", "۵۰ سال"],
      correctIndex: 1,
      answer: "گزینه ۲: فردوسی حدود ۳۰ سال از عمر خود را صرف سرودن شاهنامه کرد."
    },
    {
      id: 41,
      text: "داستان رستم و سهراب چگونه به پایان می‌رسد؟",
      options: ["پیروزی رستم", "پیروزی سهراب", "مرگ سهراب", "مصلحت"],
      correctIndex: 2,
      answer: "گزینه ۳: داستان رستم و سهراب با مرگ سهراب به دست پدرش رستم به پایان می‌رسد."
    },
    {
      id: 42,
      text: "در شاهنامه، کیومرث چه شخصیتی دارد؟",
      options: ["اولین پادشاه", "آخرین پادشاه", "پهلوان اساطیری", "قهرمان ملی"],
      correctIndex: 0,
      answer: "گزینه ۱: کیومرث در شاهنامه به عنوان اولین پادشاه و انسان نخستین معرفی شده است."
    },
    {
      id: 43,
      text: "رستم چه ویژگی‌هایی دارد؟",
      options: ["قدرت بدنی", "شجاعت", "وفاداری", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: رستم دارای قدرت بدنی فوق‌العاده، شجاعت بی‌نظیر و وفاداری است."
    },
    {
      id: 44,
      text: "حماسه در ادبیات به چه معناست؟",
      options: ["داستان عاشقانه", "داستان جنگی", "داستان قهرمانی", "داستان آموزشی"],
      correctIndex: 2,
      answer: "گزینه ۳: حماسه در ادبیات به داستان‌های قهرمانی و پهلوانی گفته می‌شود."
    },
    {
      id: 45,
      text: "چرا فردوسی شاهنامه را سرود؟",
      options: ["برای حفظ زبان فارسی", "برای ثبت تاریخ", "برای تفریح", "گزینه ۱ و ۲"],
      correctIndex: 3,
      answer: "گزینه ۴: فردوسی شاهنامه را برای حفظ زبان فارسی و ثبت تاریخ و فرهنگ ایران سرود."
    },

    // ==================== فصل چهارم: ادبیات داستانی (۱۵ سوال) ====================
    {
      id: 46,
      text: "عناصر اصلی داستان کدامند؟",
      options: ["شخصیت", "طرح", "درون‌مایه", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: شخصیت، طرح و درون‌مایه از عناصر اصلی داستان هستند."
    },
    {
      id: 47,
      text: "جلال آل‌احمد بیشتر به کدام سبک نوشته است؟",
      options: ["داستان تاریخی", "داستان اجتماعی", "داستان عاشقانه", "داستان علمی"],
      correctIndex: 1,
      answer: "گزینه ۲: جلال آل‌احمد بیشتر به داستان‌های اجتماعی با رویکرد انتقادی پرداخته است."
    },
    {
      id: 48,
      text: "معروف‌ترین اثر صادق هدایت کدام است؟",
      options: ["بوف کور", "سگ ولگرد", "زنده به گور", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: بوف کور معروف‌ترین و مهم‌ترین اثر صادق هدایت است."
    },
    {
      id: 49,
      text: "ادبیات داستانی معاصر ایران چه ویژگی‌هایی دارد؟",
      options: ["واقع‌گرایی", "نقد اجتماعی", "توجه به روانشناسی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: ادبیات داستانی معاصر ایران با واقع‌گرایی، نقد اجتماعی و توجه به روانشناسی مشخص می‌شود."
    },
    {
      id: 50,
      text: "داستان کوتاه چه ویژگی‌هایی دارد؟",
      options: ["مختصر است", "یک یا چند شخصیت دارد", "طرح ساده دارد", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: داستان کوتاه مختصر، با چند شخصیت و طرح ساده است."
    },
    {
      id: 51,
      text: "جلال آل‌احمد در چه سالی درگذشت؟",
      options: ["۱۳۴۸", "۱۳۵۰", "۱۳۴۵", "۱۳۵۵"],
      correctIndex: 0,
      answer: "گزینه ۱: جلال آل‌احمد در سال ۱۳۴۸ شمسی درگذشت."
    },
    {
      id: 52,
      text: "صادق هدایت چگونه نویسنده‌ای بود؟",
      options: ["واقع‌گرا", "روان‌شناختی", "طبیعت‌گرا", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: صادق هدایت نویسنده‌ای واقع‌گرا، روان‌شناختی و طبیعت‌گرا بود."
    },
    {
      id: 53,
      text: "ادبیات دفاع مقدس به چه موضوعاتی می‌پردازد؟",
      options: ["جنگ ایران و عراق", "ایثار و فداکاری", "میهن‌پرستی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: ادبیات دفاع مقدس به جنگ ایران و عراق، ایثار و فداکاری و میهن‌پرستی می‌پردازد."
    },
    {
      id: 54,
      text: "عنصر 'شخصیت' در داستان به چه معناست؟",
      options: ["قهرمان داستان", "افراد داستان", "راوی", "همه موارد"],
      correctIndex: 1,
      answer: "گزینه ۲: شخصیت به افراد و موجوداتی که در داستان نقش دارند گفته می‌شود."
    },
    {
      id: 55,
      text: "درون‌مایه (تم) داستان چیست؟",
      options: ["پیام اصلی داستان", "مکان داستان", "زمان داستان", "روایت داستان"],
      correctIndex: 0,
      answer: "گزینه ۱: درون‌مایه یا تم، پیام اصلی و مفهوم کلی داستان است."
    },
    {
      id: 56,
      text: "نثر جلال آل‌احمد چه ویژگی‌هایی دارد؟",
      options: ["ساده", "طنزآمیز", "انتقادی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: نثر جلال آل‌احمد ساده، طنزآمیز و انتقادی است."
    },
    {
      id: 57,
      text: "راوی دانای کل چه ویژگی‌هایی دارد؟",
      options: ["همه چیز می‌داند", "به درون شخصیت‌ها آگاه است", "خارج از داستان است", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: راوی دانای کل از همه چیز آگاه است، به درون شخصیت‌ها راه دارد و خارج از داستان است."
    },
    {
      id: 58,
      text: "داستان‌نویسی مدرن در ایران از چه زمانی شروع شد؟",
      options: ["قرن ۱۲", "قرن ۱۳", "قرن ۱۴", "قرن ۱۵"],
      correctIndex: 2,
      answer: "گزینه ۳: داستان‌نویسی مدرن در ایران از قرن ۱۴ (اوایل دوره پهلوی) شروع شد."
    },
    {
      id: 59,
      text: "یکی از مهم‌ترین آثار صادق هدایت غیر از بوف کور چیست؟",
      options: ["سگ ولگرد", "زنده به گور", "سه قطره خون", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: سگ ولگرد، زنده به گور و سه قطره خون از آثار مهم صادق هدایت هستند."
    },
    {
      id: 60,
      text: "هدف ادبیات داستانی چیست؟",
      options: ["سرگرمی", "آموزش", "نقد اجتماعی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: ادبیات داستانی با اهداف سرگرمی، آموزش و نقد اجتماعی نوشته می‌شود."
    }
  ];

  // State ها
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(90 * 60);
  const [isTimeUp, setIsTimeUp] = useState(false);

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
          onClick={() => router.push('/exam/yazdahom/tajrobi/sanjesh/second-half/farsi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📖 آزمون جامع کل کتاب فارسی (۲)</h1>
            <p style={{ marginTop: '10px', fontSize: '16px', opacity: 0.9 }}>ویژه آزمون‌های گزینه دو - شامل {questions.length} سوال ترکیبی از ۴ فصل</p>
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
              📝 پاسخنامه تشریحی آزمون جامع فارسی (۲)
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

export default FarsiFinalExam;