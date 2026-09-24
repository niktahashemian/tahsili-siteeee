"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const GeologyFinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع زمین‌شناسی (۶۰ سوال) =================
  const questions = [
    // ==================== فصل اول: زمین و تحولات آن (۱۵ سوال) ====================
    {
      id: 1,
      text: "سن زمین تقریباً چند میلیارد سال است؟",
      options: ["۴.۶ میلیارد سال", "۵ میلیارد سال", "۳ میلیارد سال", "۱۰ میلیارد سال"],
      correctIndex: 0,
      answer: "گزینه ۱: سن زمین تقریباً ۴.۶ میلیارد سال تخمین زده شده است."
    },
    {
      id: 2,
      text: "ضخیم‌ترین لایه زمین کدام است؟",
      options: ["پوسته", "گوشته", "هسته بیرونی", "هسته درونی"],
      correctIndex: 1,
      answer: "گزینه ۲: گوشته با ضخامت حدود ۲۹۰۰ کیلومتر، ضخیم‌ترین لایه زمین است."
    },
    {
      id: 3,
      text: "کدام یک از موارد زیر از عوامل فرسایش است؟",
      options: ["باد", "آب", "یخچال‌ها", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: باد، آب و یخچال‌ها همگی از عوامل فرسایش هستند."
    },
    {
      id: 4,
      text: "جریان‌های همرفتی در کدام بخش زمین رخ می‌دهند؟",
      options: ["پوسته", "گوشته", "هسته درونی", "اتمسفر"],
      correctIndex: 1,
      answer: "گزینه ۲: جریان‌های همرفتی در گوشته زمین رخ می‌دهند و عامل حرکت صفحات تکتونیکی هستند."
    },
    {
      id: 5,
      text: "نظریه‌ای که حرکت صفحات تکتونیکی را توضیح می‌دهد، چه نام دارد؟",
      options: ["نظریه زایش قاره‌ها", "نظریه رانش قاره‌ها", "نظریه زمین‌شناسی", "نظریه فرسایش"],
      correctIndex: 1,
      answer: "گزینه ۲: نظریه رانش قاره‌ها توسط آلفرد وگنر مطرح شد و حرکت صفحات را توضیح می‌دهد."
    },
    {
      id: 6,
      text: "هسته درونی زمین در چه حالتی است؟",
      options: ["مایع", "جامد", "گاز", "پلاسما"],
      correctIndex: 1,
      answer: "گزینه ۲: هسته درونی زمین به دلیل فشار بسیار زیاد، در حالت جامد است."
    },
    {
      id: 7,
      text: "کدام یک از موارد زیر باعث تغییر شکل پوسته زمین می‌شود؟",
      options: ["زمین‌لرزه", "آتشفشان", "کوه‌زایی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: زمین‌لرزه، آتشفشان و کوه‌زایی همگی باعث تغییر شکل پوسته زمین می‌شوند."
    },
    {
      id: 8,
      text: "پوسته زمین از چه موادی تشکیل شده است؟",
      options: ["سنگ و کانی", "فلزات مذاب", "آب و یخ", "گازها"],
      correctIndex: 0,
      answer: "گزینه ۱: پوسته زمین از سنگ‌ها و کانی‌های مختلف تشکیل شده است."
    },
    {
      id: 9,
      text: "کدام لایه زمین بیشترین دما را دارد؟",
      options: ["پوسته", "گوشته", "هسته درونی", "هسته بیرونی"],
      correctIndex: 2,
      answer: "گزینه ۳: هسته درونی با دمای حدود ۵۵۰۰ درجه سانتی‌گراد، داغ‌ترین لایه زمین است."
    },
    {
      id: 10,
      text: "عامل اصلی حرکت صفحات تکتونیکی چیست؟",
      options: ["جاذبه ماه", "جریان‌های همرفتی در گوشته", "بادهای شدید", "چرخش زمین"],
      correctIndex: 1,
      answer: "گزینه ۲: جریان‌های همرفتی در گوشته، عامل اصلی حرکت صفحات تکتونیکی هستند."
    },
    {
      id: 11,
      text: "کدام یک از موارد زیر در پوسته قاره‌ای بیشتر یافت می‌شود؟",
      options: ["بازالت", "گرانیت", "سنگ آهک", "الماس"],
      correctIndex: 1,
      answer: "گزینه ۲: گرانیت یکی از سنگ‌های اصلی پوسته قاره‌ای است."
    },
    {
      id: 12,
      text: "کدام یک از موارد زیر در پوسته اقیانوسی بیشتر یافت می‌شود؟",
      options: ["بازالت", "گرانیت", "سنگ آهک", "ماسه‌سنگ"],
      correctIndex: 0,
      answer: "گزینه ۱: بازالت سنگ اصلی پوسته اقیانوسی است."
    },
    {
      id: 13,
      text: "مرز بین پوسته و گوشته چه نام دارد؟",
      options: ["موهو", "سطح لیتوسفر", "ایزوسفر", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: ناپیوستگی موهو (Moho) مرز بین پوسته و گوشته است."
    },
    {
      id: 14,
      text: "چرخه زمین‌شناسی به چه معناست؟",
      options: ["تبدیل سنگ‌ها به یکدیگر", "حرکت قاره‌ها", "تشکیل کوه‌ها", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: چرخه زمین‌شناسی فرآیند تبدیل سنگ‌ها به یکدیگر از طریق فرسایش، رسوب‌گذاری و دگرگونی است."
    },
    {
      id: 15,
      text: "نظریه رانش قاره‌ها توسط چه کسی ارائه شد؟",
      options: ["آلفرد وگنر", "چارلز داروین", "نیوتن", "انیشتین"],
      correctIndex: 0,
      answer: "گزینه ۱: آلفرد وگنر در سال ۱۹۱۲ نظریه رانش قاره‌ها را ارائه داد."
    },

    // ==================== فصل دوم: سنگ‌ها و کانی‌ها (۱۵ سوال) ====================
    {
      id: 16,
      text: "تعریف کانی چیست؟",
      options: ["ماده معدنی طبیعی", "ساختار کریستالی", "جامد طبیعی با ترکیب شیمیایی مشخص", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: کانی ماده‌ای جامد، طبیعی، با ترکیب شیمیایی مشخص و ساختار کریستالی است."
    },
    {
      id: 17,
      text: "سختی کانی با کدام مقیاس اندازه‌گیری می‌شود؟",
      options: ["مقیاس ریشتر", "مقیاس موهس", "مقیاس سلسیوس", "مقیاس بوفرت"],
      correctIndex: 1,
      answer: "گزینه ۲: مقیاس موهس برای اندازه‌گیری سختی کانی‌ها استفاده می‌شود."
    },
    {
      id: 18,
      text: "سخت‌ترین کانی چیست؟",
      options: ["الماس", "کوارتز", "فلدسپات", "کلسیت"],
      correctIndex: 0,
      answer: "گزینه ۱: الماس با سختی ۱۰ در مقیاس موهس، سخت‌ترین کانی است."
    },
    {
      id: 19,
      text: "سنگ‌های آذرین چگونه تشکیل می‌شوند؟",
      options: ["از سرد شدن ماگما", "از رسوب‌گذاری", "از دگرگونی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: سنگ‌های آذرین از سرد شدن و انجماد ماگما یا گدازه تشکیل می‌شوند."
    },
    {
      id: 20,
      text: "سنگ‌های رسوبی چگونه تشکیل می‌شوند؟",
      options: ["از رسوب‌گذاری و فشردگی", "از سرد شدن ماگما", "از دگرگونی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: سنگ‌های رسوبی از رسوب‌گذاری، فشردگی و سیمان‌شدن رسوبات تشکیل می‌شوند."
    },
    {
      id: 21,
      text: "سنگ‌های دگرگونی چگونه تشکیل می‌شوند؟",
      options: ["از تغییر سنگ‌های دیگر در اثر حرارت و فشار", "از سرد شدن ماگما", "از رسوب‌گذاری", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: سنگ‌های دگرگونی در اثر حرارت و فشار بالا بر روی سنگ‌های دیگر تشکیل می‌شوند."
    },
    {
      id: 22,
      text: "کوارتز با چه سختی در مقیاس موهس اندازه‌گیری می‌شود؟",
      options: ["۵", "۷", "۸", "۹"],
      correctIndex: 1,
      answer: "گزینه ۲: کوارتز با سختی ۷ در مقیاس موهس اندازه‌گیری می‌شود."
    },
    {
      id: 23,
      text: "کانی فلدسپات بیشتر در کدام نوع سنگ یافت می‌شود؟",
      options: ["آذرین", "رسوبی", "دگرگونی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: فلدسپات یکی از کانی‌های اصلی سنگ‌های آذرین است."
    },
    {
      id: 24,
      text: "چرخه سنگ‌ها شامل کدام مراحل است؟",
      options: ["آذرین → رسوبی → دگرگونی", "رسوبی → دگرگونی → آذرین", "آذرین → دگرگونی → رسوبی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: چرخه سنگ‌ها شامل تبدیل سنگ‌ها از نوعی به نوع دیگر در یک چرخه پیوسته است."
    },
    {
      id: 25,
      text: "کدام یک از موارد زیر از عوامل دگرگونی سنگ‌هاست؟",
      options: ["فشار", "دما", "فعالیت شیمیایی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: فشار، دما و فعالیت شیمیایی همگی از عوامل دگرگونی سنگ‌ها هستند."
    },
    {
      id: 26,
      text: "سنگ مرمر از دگرگونی کدام سنگ به وجود می‌آید؟",
      options: ["سنگ آهک", "ماسه‌سنگ", "گرانیت", "بازالت"],
      correctIndex: 0,
      answer: "گزینه ۱: سنگ مرمر از دگرگونی سنگ آهک تشکیل می‌شود."
    },
    {
      id: 27,
      text: "نوع سنگ آذرین که در سطح زمین تشکیل می‌شود چیست؟",
      options: ["آذرین درونی", "آذرین بیرونی", "آذرین نیمه‌عمیق", "همه موارد"],
      correctIndex: 1,
      answer: "گزینه ۲: سنگ‌های آذرین بیرونی در سطح زمین و از سرد شدن سریع گدازه تشکیل می‌شوند."
    },
    {
      id: 28,
      text: "کدام یک از موارد زیر از کانی‌های سیلیکاته است؟",
      options: ["کوارتز", "فلدسپات", "میکا", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: کوارتز، فلدسپات و میکا همگی از کانی‌های سیلیکاته هستند."
    },
    {
      id: 29,
      text: "کانی‌های غیرسیلیکاته شامل کدام گروه هستند؟",
      options: ["کربنات‌ها", "اکسیدها", "سولفیدها", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: کربنات‌ها، اکسیدها و سولفیدها از کانی‌های غیرسیلیکاته هستند."
    },
    {
      id: 30,
      text: "کلسیت با چه سختی در مقیاس موهس اندازه‌گیری می‌شود؟",
      options: ["۳", "۴", "۵", "۶"],
      correctIndex: 0,
      answer: "گزینه ۱: کلسیت با سختی ۳ در مقیاس موهس اندازه‌گیری می‌شود."
    },

    // ==================== فصل سوم: فسیل‌ها و تاریخ زمین (۱۵ سوال) ====================
    {
      id: 31,
      text: "فسیل به چه معناست؟",
      options: ["بقایای جانداران قدیمی", "سنگ‌های رسوبی", "کانسارهای معدنی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: فسیل‌ها بقایای جانداران قدیمی هستند که در لایه‌های زمین حفظ شده‌اند."
    },
    {
      id: 32,
      text: "کدام یک از موارد زیر به عنوان فسیل راهنما استفاده می‌شود؟",
      options: ["بقایای جاندارانی که در دوره خاصی زندگی می‌کرده‌اند", "بقایای بزرگ‌ترین جانداران", "بقایای کوچک‌ترین جانداران", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: فسیل‌های راهنما بقایای جاندارانی هستند که در دوره خاصی زندگی می‌کرده‌اند."
    },
    {
      id: 33,
      text: "قدیمی‌ترین دوره زمین‌شناسی کدام است؟",
      options: ["پرکامبرین", "پالئوزوئیک", "مزوزوئیک", "سنوزوئیک"],
      correctIndex: 0,
      answer: "گزینه ۱: دوره پرکامبرین قدیمی‌ترین دوره زمین‌شناسی است."
    },
    {
      id: 34,
      text: "دوره مزوزوئیک با چه رویدادی همراه بود؟",
      options: ["ظهور دایناسورها", "ظهور پستانداران", "ظهور پرندگان", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: دوره مزوزوئیک با ظهور و گسترش دایناسورها همراه بود."
    },
    {
      id: 35,
      text: "عصر یخبندان مربوط به کدام دوره است؟",
      options: ["پرکامبرین", "پالئوزوئیک", "مزوزوئیک", "سنوزوئیک"],
      correctIndex: 3,
      answer: "گزینه ۴: عصرهای یخبندان در دوره سنوزوئیک رخ داده‌اند."
    },
    {
      id: 36,
      text: "فرآیند فسیل‌شدن شامل چه مراحلی است؟",
      options: ["دفن شدن", "حفظ شدن", "کانی‌شدن", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: فرآیند فسیل‌شدن شامل دفن شدن، حفظ شدن و کانی‌شدن است."
    },
    {
      id: 37,
      text: "کدام یک از موارد زیر از فسیل‌های شاخص دوره پالئوزوئیک است؟",
      options: ["تری‌لوبیت", "دایناسور", "ماموت", "انسان اولیه"],
      correctIndex: 0,
      answer: "گزینه ۱: تری‌لوبیت‌ها از فسیل‌های شاخص دوره پالئوزوئیک هستند."
    },
    {
      id: 38,
      text: "دوره سنوزوئیک به چه دلیل اهمیت دارد؟",
      options: ["ظهور انسان", "انقراض دایناسورها", "ظهور پستانداران", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: دوره سنوزوئیک به دلیل ظهور انسان اهمیت دارد."
    },
    {
      id: 39,
      text: "انقراض دسته‌جمعی دایناسورها در پایان کدام دوره رخ داد؟",
      options: ["پرکامبرین", "پالئوزوئیک", "مزوزوئیک", "سنوزوئیک"],
      correctIndex: 2,
      answer: "گزینه ۳: انقراض دایناسورها در پایان دوره مزوزوئیک (حدود ۶۵ میلیون سال پیش) رخ داد."
    },
    {
      id: 40,
      text: "کدام یک از موارد زیر برای تعیین سن نسبی سنگ‌ها استفاده می‌شود؟",
      options: ["فسیل‌های راهنما", "اندازه‌گیری رادیواکتیو", "مقایسه لایه‌ها", "گزینه ۱ و ۳"],
      correctIndex: 3,
      answer: "گزینه ۴: برای تعیین سن نسبی از فسیل‌های راهنما و مقایسه لایه‌ها استفاده می‌شود."
    },
    {
      id: 41,
      text: "تعیین سن مطلق سنگ‌ها با استفاده از کدام روش انجام می‌شود؟",
      options: ["اندازه‌گیری رادیواکتیو", "مقایسه لایه‌ها", "فسیل‌های راهنما", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: تعیین سن مطلق با استفاده از اندازه‌گیری رادیواکتیو انجام می‌شود."
    },
    {
      id: 42,
      text: "ایزوتوپ رادیواکتیو کربن-۱۴ برای تعیین سن کدام مواد استفاده می‌شود؟",
      options: ["مواد آلی تا ۵۰ هزار سال", "سنگ‌های آذرین", "سنگ‌های رسوبی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: کربن-۱۴ برای تعیین سن مواد آلی تا حدود ۵۰ هزار سال استفاده می‌شود."
    },
    {
      id: 43,
      text: "تغییرات آب و هوایی در طول تاریخ زمین به چه عواملی بستگی داشته است؟",
      options: ["فعالیت‌های آتشفشانی", "تغییرات مدار زمین", "غلظت گازهای گلخانه‌ای", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: فعالیت‌های آتشفشانی، تغییرات مدار زمین و غلظت گازهای گلخانه‌ای همگی در تغییرات اقلیمی مؤثر بوده‌اند."
    },
    {
      id: 44,
      text: "قدیمی‌ترین فسیل‌های شناخته شده مربوط به چه دوره‌ای هستند؟",
      options: ["پرکامبرین", "پالئوزوئیک", "مزوزوئیک", "سنوزوئیک"],
      correctIndex: 0,
      answer: "گزینه ۱: قدیمی‌ترین فسیل‌ها مربوط به دوره پرکامبرین هستند."
    },
    {
      id: 45,
      text: "دوره‌های زمین‌شناسی بر اساس چه عواملی تقسیم‌بندی می‌شوند؟",
      options: ["تغییرات فسیلی", "رویدادهای زمین‌شناسی", "تغییرات اقلیمی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: تغییرات فسیلی، رویدادهای زمین‌شناسی و تغییرات اقلیمی مبنای تقسیم‌بندی دوره‌های زمین‌شناسی هستند."
    },

    // ==================== فصل چهارم: منابع و انرژی زمین (۱۵ سوال) ====================
    {
      id: 46,
      text: "نفت از دگرگونی چه موادی به وجود می‌آید؟",
      options: ["بقایای جانداران دریایی", "بقایای گیاهان", "بقایای جانوران خشکی", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: نفت از دگرگونی بقایای جانداران دریایی در اثر حرارت و فشار به وجود می‌آید."
    },
    {
      id: 47,
      text: "کدام یک از موارد زیر از سوخت‌های فسیلی است؟",
      options: ["نفت", "گاز طبیعی", "زغال‌سنگ", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: نفت، گاز طبیعی و زغال‌سنگ همگی از سوخت‌های فسیلی هستند."
    },
    {
      id: 48,
      text: "انرژی‌های تجدیدپذیر شامل کدام موارد هستند؟",
      options: ["انرژی خورشیدی", "انرژی بادی", "انرژی آبی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: انرژی خورشیدی، بادی و آبی همگی از انرژی‌های تجدیدپذیر هستند."
    },
    {
      id: 49,
      text: "سفره‌های آب زیرزمینی در کدام لایه‌ها قرار دارند؟",
      options: ["سنگ‌های نفوذپذیر", "سنگ‌های نفوذناپذیر", "سطح زمین", "همه موارد"],
      correctIndex: 0,
      answer: "گزینه ۱: سفره‌های آب زیرزمینی در سنگ‌های نفوذپذیر مانند ماسه‌سنگ و سنگ‌آهک قرار دارند."
    },
    {
      id: 50,
      text: "آلاینده‌های اصلی آب‌های زیرزمینی کدامند؟",
      options: ["مواد شیمیایی کشاورزی", "فاضلاب", "مواد نفتی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: مواد شیمیایی کشاورزی، فاضلاب و مواد نفتی از آلاینده‌های اصلی آب‌های زیرزمینی هستند."
    },
    {
      id: 51,
      text: "استخراج معادن چه تأثیری بر محیط زیست دارد؟",
      options: ["تخریب زمین", "آلودگی آب", "تولید زباله‌های معدنی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: استخراج معادن باعث تخریب زمین، آلودگی آب و تولید زباله‌های معدنی می‌شود."
    },
    {
      id: 52,
      text: "کدام یک از موارد زیر از منابع معدنی فلزی است؟",
      options: ["آهن", "مس", "طلا", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: آهن، مس و طلا همگی از منابع معدنی فلزی هستند."
    },
    {
      id: 53,
      text: "کدام یک از موارد زیر از منابع معدنی غیرفلزی است؟",
      options: ["سنگ آهک", "نمک", "گچ", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: سنگ آهک، نمک و گچ همگی از منابع معدنی غیرفلزی هستند."
    },
    {
      id: 54,
      text: "چرخه آب شامل کدام مراحل است؟",
      options: ["تبخیر", "میعان", "بارش", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: چرخه آب شامل تبخیر، میعان و بارش است."
    },
    {
      id: 55,
      text: "عوامل مؤثر بر کیفیت آب‌های زیرزمینی کدامند؟",
      options: ["نوع سنگ‌ها", "میزان بارش", "فعالیت‌های انسانی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: نوع سنگ‌ها، میزان بارش و فعالیت‌های انسانی بر کیفیت آب‌های زیرزمینی مؤثرند."
    },
    {
      id: 56,
      text: "کدام یک از موارد زیر برای حفاظت از منابع زمین مؤثر است؟",
      options: ["بازیافت", "مدیریت مصرف", "استفاده از انرژی‌های تجدیدپذیر", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: بازیافت، مدیریت مصرف و استفاده از انرژی‌های تجدیدپذیر همگی برای حفاظت از منابع زمین مؤثرند."
    },
    {
      id: 57,
      text: "آلاینده‌های نفتی چه تأثیری بر محیط زیست دارند؟",
      options: ["آلودگی آب", "آلودگی خاک", "آلودگی هوا", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: آلاینده‌های نفتی آب، خاک و هوا را آلوده می‌کنند."
    },
    {
      id: 58,
      text: "کدام یک از موارد زیر از روش‌های استخراج معادن است؟",
      options: ["روشنایی", "زیرزمینی", "شیمیایی", "گزینه ۱ و ۲"],
      correctIndex: 3,
      answer: "گزینه ۴: روش‌های روشنایی و زیرزمینی از روش‌های استخراج معادن هستند."
    },
    {
      id: 59,
      text: "منابع تجدیدپذیر شامل کدام موارد هستند؟",
      options: ["آب", "باد", "خورشید", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: آب، باد و خورشید همگی از منابع انرژی تجدیدپذیر هستند."
    },
    {
      id: 60,
      text: "مدیریت پایدار منابع زمین به چه معناست؟",
      options: ["استفاده بهینه از منابع", "حفاظت از منابع", "توسعه پایدار", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: استفاده بهینه از منابع، حفاظت از منابع و توسعه پایدار همگی از اهداف مدیریت پایدار منابع زمین هستند."
    }
  ];

  // State ها
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showAnswers, setShowAnswers] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [hasCalculated, setHasCalculated] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 دقیقه به ثانیه
  const [isTimeUp, setIsTimeUp] = useState(false);

  // محاسبه امتیاز با useCallback برای جلوگیری از رندرهای مجدد غیرضروری
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
  }, [selectedAnswers, questions]);

  // تایمر
  useEffect(() => {
    if (isTimeUp || hasCalculated) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // وقتی زمان تمام شد، امتیاز را محاسبه کن
          setIsTimeUp(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimeUp, hasCalculated]);

  // وقتی زمان تمام شد، امتیاز را محاسبه کن
  useEffect(() => {
    if (isTimeUp && !hasCalculated) {
      // با استفاده از setTimeout، setState را به چرخه بعدی موکول می‌کنیم
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
    
    // اگر قبلاً محاسبه شده بود، آن را بازنشانی کن
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

  // تابع محاسبه دستی امتیاز
  const handleCalculateScore = useCallback(() => {
    calculateScore();
    // زمان را متوقف کن
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
          onClick={() => router.push('/exam/yazdahom/tajrobi/sanjesh/second-half/zamin-shenasi-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>🌍 آزمون جامع کل کتاب زمین‌شناسی</h1>
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
              📝 پاسخنامه تشریحی آزمون جامع زمین‌شناسی
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

export default GeologyFinalExam;