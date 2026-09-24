"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const ArabicFinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع عربی (۲) - ۶۰ سوال =================
  const questions = [
    // ==================== فصل اول: افعال و صرف (۱۵ سوال) ====================
    {
      id: 1,
      text: "فعل ماضی از چه ریشه‌ای ساخته می‌شود؟",
      options: ["ماضی", "مضارع", "امر", "مصدر"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل ماضی از ریشه ماضی ساخته می‌شود که به گذشته اشاره دارد."
    },
    {
      id: 2,
      text: "شناسه فعل ماضی برای ضمیر 'هُوَ' چیست؟",
      options: ["تُ", "تَ", "َ", "نَا"],
      correctIndex: 2,
      answer: "گزینه ۳: برای ضمیر هُوَ (مفرد مذکر غایب)، شناسه فعل ماضی 'َ' است (مثلاً: كَتَبَ)."
    },
    {
      id: 3,
      text: "فعل امر از چه زبانی ساخته می‌شود؟",
      options: ["ماضی", "مضارع", "مصدر", "اسم فاعل"],
      correctIndex: 1,
      answer: "گزینه ۲: فعل امر از مضارع ساخته می‌شود و برای دستور دادن استفاده می‌شود."
    },
    {
      id: 4,
      text: "فعل 'يَكْتُبُ' در چه صرفی است؟",
      options: ["ماضی", "مضارع", "امر", "نهی"],
      correctIndex: 1,
      answer: "گزینه ۲: 'يَكْتُبُ' فعل مضارع است که به زمان حال و آینده اشاره دارد."
    },
    {
      id: 5,
      text: "فعل معتل به چه فعل‌هایی گفته می‌شود؟",
      options: ["فعل‌هایی که حرف عله دارند", "فعل‌های سالم", "فعل‌های ناقص", "فعل‌های رباعی"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل معتل به فعل‌هایی گفته می‌شود که در ریشه آنها یکی از حروف عله (ا، و، ی) وجود دارد."
    },
    {
      id: 6,
      text: "صرف فعل مضارع برای ضمیر 'أَنَا' چگونه است؟",
      options: ["أَكْتُبُ", "نَكْتُبُ", "يَكْتُبُ", "تَكْتُبُ"],
      correctIndex: 0,
      answer: "گزینه ۱: برای ضمیر أَنَا (متکلم وحده)، فعل مضارع با 'أ' شروع می‌شود: أَكْتُبُ."
    },
    {
      id: 7,
      text: "فعل نهی از چه ساختاری ساخته می‌شود؟",
      options: ["لا + فعل مضارع", "لا + فعل ماضی", "لا + فعل امر", "ما + فعل مضارع"],
      correctIndex: 0,
      answer: "گزینه ۱: فعل نهی با اضافه شدن 'لا' به فعل مضارع ساخته می‌شود (مثلاً: لا تَكْتُبْ)."
    },
    {
      id: 8,
      text: "فعل 'قَالَ' از چه نوع فعلی است؟",
      options: ["سالم", "معتل", "ناقص", "مهموز"],
      correctIndex: 1,
      answer: "گزینه ۲: 'قَالَ' از افعال معتل است زیرا در ریشه آن حرف عله (ا) وجود دارد."
    },
    {
      id: 9,
      text: "در فعل مضارع، ضمیر 'هُمْ' چه شناسه‌ای دارد؟",
      options: ["ُونَ", "ِينَ", "ُونَ", "ُونَ"],
      correctIndex: 0,
      answer: "گزینه ۱: برای ضمیر هُمْ، شناسه فعل مضارع 'ُونَ' است (مثلاً: يَكْتُبُونَ)."
    },
    {
      id: 10,
      text: "فعل 'دَعَا' در ماضی چه نوع فعلی است؟",
      options: ["سالم", "معتل", "ناقص", "مهموز"],
      correctIndex: 2,
      answer: "گزینه ۳: 'دَعَا' فعل ناقص است زیرا به حرف عله (ا) ختم می‌شود."
    },
    {
      id: 11,
      text: "مصدر فعل 'كَتَبَ' چیست؟",
      options: ["كِتَابَة", "مَكْتُوب", "كَاتِب", "يَكْتُب"],
      correctIndex: 0,
      answer: "گزینه ۱: مصدر فعل كَتَبَ، كِتَابَة است که به معنای نوشتن است."
    },
    {
      id: 12,
      text: "فعل امر برای ضمیر 'أَنْتَ' چگونه است؟",
      options: ["اُكْتُبْ", "اِكْتُبْ", "اُكْتُبِي", "اِكْتُبُوا"],
      correctIndex: 1,
      answer: "گزینه ۲: برای ضمیر أَنْتَ (مفرد مذکر مخاطب)، فعل امر 'اِكْتُبْ' است."
    },
    {
      id: 13,
      text: "فعل 'يَسْتَغْفِرُ' از چه بابی است؟",
      options: ["باب اول", "باب دوم", "باب سوم", "باب دهم"],
      correctIndex: 3,
      answer: "گزینه ۴: 'يَسْتَغْفِرُ' از باب استفعال (باب دهم) است که به معنی طلب کردن است."
    },
    {
      id: 14,
      text: "فعل ماضی مجهول چگونه ساخته می‌شود؟",
      options: ["ضمّ اول و فتح ما قبل الآخر", "فتح اول و ضم ما قبل الآخر", "ضمّ اول و کسر ما قبل الآخر", "کسر اول و فتح ما قبل الآخر"],
      correctIndex: 0,
      answer: "گزینه ۱: در فعل ماضی مجهول، حرف اول ضمه و حرف ما قبل آخر فتحه می‌گیرد."
    },
    {
      id: 15,
      text: "معنی فعل 'اسْتَخْرَجَ' چیست؟",
      options: ["بیرون آورد", "نوشت", "خواند", "گفت"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اسْتَخْرَجَ' به معنی بیرون آوردن و استخراج کردن است."
    },

    // ==================== فصل دوم: اعراب و نحو (۱۵ سوال) ====================
    {
      id: 16,
      text: "علامت اصلی رفع در اسم‌های مفرد چیست؟",
      options: ["ضَمَّة", "فَتْحَة", "كَسْرَة", "سُكُون"],
      correctIndex: 0,
      answer: "گزینه ۱: علامت اصلی رفع در اسم‌های مفرد، ضَمَّة است."
    },
    {
      id: 17,
      text: "مفعول به چه علامت اعرابی دارد؟",
      options: ["رفع", "نصب", "جر", "جزم"],
      correctIndex: 1,
      answer: "گزینه ۲: مفعول به همواره منصوب است و علامت نصب دارد."
    },
    {
      id: 18,
      text: "فاعل در جمله چه علامت اعرابی دارد؟",
      options: ["رفع", "نصب", "جر", "جزم"],
      correctIndex: 0,
      answer: "گزینه ۱: فاعل در جمله همواره مرفوع است."
    },
    {
      id: 19,
      text: "در جمله 'اَلطَّالِبُ مُجْتَهِدٌ'، مبتدا و خبر کدامند؟",
      options: ["اَلطَّالِبُ = مبتدا، مُجْتَهِدٌ = خبر", "مُجْتَهِدٌ = مبتدا، اَلطَّالِبُ = خبر", "هر دو مبتدا", "هر دو خبر"],
      correctIndex: 0,
      answer: "گزینه ۱: در جمله اسمیه، اَلطَّالِبُ مبتدا و مُجْتَهِدٌ خبر است."
    },
    {
      id: 20,
      text: "علامت نصب در جمع مذکر سالم چیست؟",
      options: ["ضَمَّة", "فَتْحَة", "كَسْرَة", "یاء"],
      correctIndex: 3,
      answer: "گزینه ۴: علامت نصب در جمع مذکر سالم، 'یاء' است (مثلاً: مُعَلِّمِينَ)."
    },
    {
      id: 21,
      text: "در جمله 'مَرَرْتُ بِالرَّجُلِ'، 'بِالرَّجُلِ' چه نقشی دارد؟",
      options: ["مفعول به", "مجرور", "فاعل", "خبر"],
      correctIndex: 1,
      answer: "گزینه ۲: 'بِالرَّجُلِ' مجرور است زیرا حرف جر 'بِ' بر آن وارد شده است."
    },
    {
      id: 22,
      text: "علامت جر در اسم‌های مفرد چیست؟",
      options: ["ضَمَّة", "فَتْحَة", "كَسْرَة", "سُكُون"],
      correctIndex: 2,
      answer: "گزینه ۳: علامت جر در اسم‌های مفرد، كَسْرَة است."
    },
    {
      id: 23,
      text: "منصوبات شامل چه مواردی هستند؟",
      options: ["مفعول به و مفعول مطلق", "مفعول فیه و حال", "تمیز و مستثنی", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: منصوبات شامل مفعول به، مفعول مطلق، مفعول فیه، حال، تمیز و مستثنی هستند."
    },
    {
      id: 24,
      text: "اعراب فرعی در کدام موارد استفاده می‌شود؟",
      options: ["جمع مذکر سالم", "اسم تفضیل", "اسم منقوص", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: اعراب فرعی در جمع مذکر سالم، اسم تفضیل و اسم منقوص استفاده می‌شود."
    },
    {
      id: 25,
      text: "در جمله 'إِنَّ اللهَ عَلِيمٌ'، 'إِنَّ' چه نوع حرفی است؟",
      options: ["حرف نافی", "حرف شرطی", "حرف مشبه بالفعل", "حرف عطف"],
      correctIndex: 2,
      answer: "گزینه ۳: 'إِنَّ' از حروف مشبه بالفعل است که اسم را نصب و خبر را رفع می‌دهد."
    },
    {
      id: 26,
      text: "مبتدا و خبر چه نوع ارکانی در جمله هستند؟",
      options: ["جمله فعلیه", "جمله اسمیه", "جمله شرطیه", "جمله استفهامیه"],
      correctIndex: 1,
      answer: "گزینه ۲: مبتدا و خبر ارکان جمله اسمیه هستند."
    },
    {
      id: 27,
      text: "نائب فاعل در جمله مجهول چه نقشی دارد؟",
      options: ["فاعل واقعی", "جایگزین فاعل", "مفعول", "حال"],
      correctIndex: 1,
      answer: "گزینه ۲: نائب فاعل در جمله مجهول جایگزین فاعل می‌شود و مرفوع است."
    },
    {
      id: 28,
      text: "علامت جزم در فعل مضارع چیست؟",
      options: ["ضَمَّة", "فَتْحَة", "كَسْرَة", "سُكُون یا حذف"],
      correctIndex: 3,
      answer: "گزینه ۴: علامت جزم در فعل مضارع، سُكُون یا حذف حرف علت است."
    },
    {
      id: 29,
      text: "در جمله 'يَضْرِبُ زَيْدٌ عَمْراً'، فاعل و مفعول به کدامند؟",
      options: ["زَيْدٌ = فاعل، عَمْراً = مفعول به", "عَمْراً = فاعل، زَيْدٌ = مفعول به", "هردو فاعل", "هردو مفعول"],
      correctIndex: 0,
      answer: "گزینه ۱: در این جمله، زَيْدٌ فاعل و عَمْراً مفعول به است."
    },
    {
      id: 30,
      text: "مرفوعات شامل چه مواردی هستند؟",
      options: ["فاعل و نائب فاعل", "مبتدا و خبر", "اسم إن و أخواتها", "گزینه ۱ و ۲"],
      correctIndex: 3,
      answer: "گزینه ۴: مرفوعات شامل فاعل، نائب فاعل، مبتدا و خبر هستند."
    },

    // ==================== فصل سوم: ترجمه و درک مطلب (۱۵ سوال) ====================
    {
      id: 31,
      text: "ترجمه صحیح 'ذَهَبَ الرَّجُلُ إِلَى الْبَيْتِ' چیست؟",
      options: ["مرد به خانه رفت", "مرد از خانه رفت", "مرد در خانه بود", "مرد خانه را دید"],
      correctIndex: 0,
      answer: "گزینه ۱: 'ذَهَبَ' به معنی رفت، 'الرَّجُلُ' به معنی مرد و 'إِلَى الْبَيْتِ' به معنی به خانه است."
    },
    {
      id: 32,
      text: "معنی کلمه 'مَدْرَسَة' چیست؟",
      options: ["مدرسه", "دانشگاه", "خانه", "مسجد"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مَدْرَسَة' به معنی مدرسه است."
    },
    {
      id: 33,
      text: "ترجمه 'اَلْكِتَابُ جَدِيدٌ' چیست؟",
      options: ["کتاب جدید است", "کتاب قدیمی است", "کتاب را خواندم", "کتاب خوب است"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اَلْكِتَابُ' یعنی کتاب، 'جَدِيدٌ' یعنی جدید → کتاب جدید است."
    },
    {
      id: 34,
      text: "معنی 'يَشْرَبُ الْوَلَدُ اللَّبَنَ' چیست؟",
      options: ["پسر شیر می‌خورد", "پسر آب می‌خورد", "پسر می‌خورد شیر", "پسر شیر را دید"],
      correctIndex: 0,
      answer: "گزینه ۱: 'يَشْرَبُ' می‌خورد، 'الْوَلَدُ' پسر، 'اللَّبَنَ' شیر → پسر شیر می‌خورد."
    },
    {
      id: 35,
      text: "کلمه 'مُعَلِّم' در عربی به چه معناست؟",
      options: ["معلم", "دانش‌آموز", "مدیر", "نویسنده"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مُعَلِّم' به معنی معلم و آموزگار است."
    },
    {
      id: 36,
      text: "ترجمه 'اَلشَّمْسُ مُشْرِقَةٌ' چیست؟",
      options: ["خورشید درخشان است", "خورشید گرم است", "خورشید زیبا است", "خورشید بزرگ است"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اَلشَّمْسُ' خورشید، 'مُشْرِقَةٌ' درخشان → خورشید درخشان است."
    },
    {
      id: 37,
      text: "معنی 'كَيْفَ حَالُكَ' چیست؟",
      options: ["حالت چطور است؟", "کجا هستی؟", "چی کار می‌کنی؟", "اسمت چیست؟"],
      correctIndex: 0,
      answer: "گزینه ۱: 'كَيْفَ' یعنی چگونه، 'حَالُكَ' یعنی حالت → حالت چطور است؟"
    },
    {
      id: 38,
      text: "ترجمه 'أُحِبُّ الْعِلْمَ' چیست؟",
      options: ["من علم را دوست دارم", "من علم می‌آموزم", "من عالم هستم", "من کتاب را دوست دارم"],
      correctIndex: 0,
      answer: "گزینه ۱: 'أُحِبُّ' من دوست دارم، 'الْعِلْمَ' علم را → من علم را دوست دارم."
    },
    {
      id: 39,
      text: "کلمه 'طَالِب' به چه معناست؟",
      options: ["دانش‌آموز", "معلم", "پزشک", "مهندس"],
      correctIndex: 0,
      answer: "گزینه ۱: 'طَالِب' به معنی دانش‌آموز و جوینده علم است."
    },
    {
      id: 40,
      text: "ترجمه 'اَلْأَرْضُ مُسْتَدِيرَةٌ' چیست؟",
      options: ["زمین گرد است", "زمین صاف است", "زمین آبی است", "زمین سبز است"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اَلْأَرْضُ' زمین، 'مُسْتَدِيرَةٌ' گرد → زمین گرد است."
    },
    {
      id: 41,
      text: "معنی 'جَاءَ الْخَرِيفُ' چیست؟",
      options: ["پاییز آمد", "بهار آمد", "زمستان آمد", "تابستان آمد"],
      correctIndex: 0,
      answer: "گزینه ۱: 'جَاءَ' آمد، 'الْخَرِيفُ' پاییز → پاییز آمد."
    },
    {
      id: 42,
      text: "ترجمه 'يَسْكُنُ الْمُدَرِّسُ فِي الْمَدِينَةِ' چیست؟",
      options: ["معلم در شهر ساکن است", "معلم در روستا ساکن است", "معلم به شهر رفت", "معلم شهر را دید"],
      correctIndex: 0,
      answer: "گزینه ۱: 'يَسْكُنُ' ساکن است، 'الْمُدَرِّسُ' معلم، 'فِي الْمَدِينَةِ' در شهر → معلم در شهر ساکن است."
    },
    {
      id: 43,
      text: "معنی 'اَلْفَلَاحُ يَزْرَعُ الْأَرْضَ' چیست؟",
      options: ["دهقان زمین را می‌کارد", "دهقان زمین را آب می‌دهد", "دهقان زمین را می‌شوید", "دهقان زمین را می‌سازد"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اَلْفَلَاحُ' دهقان، 'يَزْرَعُ' می‌کارد، 'الْأَرْضَ' زمین را → دهقان زمین را می‌کارد."
    },
    {
      id: 44,
      text: "کلمه 'طَيِّب' در عربی به چه معناست؟",
      options: ["خوب و پاکیزه", "بد", "بزرگ", "کوچک"],
      correctIndex: 0,
      answer: "گزینه ۱: 'طَيِّب' به معنی خوب، پاکیزه و خوشمزه است."
    },
    {
      id: 45,
      text: "ترجمه 'اَللَّيْلُ طَوِيلٌ' چیست؟",
      options: ["شب طولانی است", "روز طولانی است", "شب کوتاه است", "روز کوتاه است"],
      correctIndex: 0,
      answer: "گزینه ۱: 'اَللَّيْلُ' شب، 'طَوِيلٌ' طولانی → شب طولانی است."
    },

    // ==================== فصل چهارم: تحلیل صرفی و نحوی (۱۵ سوال) ====================
    {
      id: 46,
      text: "وزن کلمه 'مَكْتُوب' چیست؟",
      options: ["مَفْعُول", "مَفْعَل", "مُفْعَل", "فَعِيل"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مَكْتُوب' از وزن 'مَفْعُول' است که اسم مفعول را نشان می‌دهد."
    },
    {
      id: 47,
      text: "اسم فاعل از چه ریشه‌ای ساخته می‌شود؟",
      options: ["ماضی", "مضارع", "امر", "مصدر"],
      correctIndex: 1,
      answer: "گزینه ۲: اسم فاعل از مضارع ساخته می‌شود با تبدیل حرف مضارعه به میم مضموم."
    },
    {
      id: 48,
      text: "وزن 'مُعَلِّم' در صرف عربی چیست؟",
      options: ["مُفَعِّل", "مُفَعَّل", "مُفْعَل", "فَعَّال"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مُعَلِّم' از وزن 'مُفَعِّل' است که اسم فاعل باب تفعیل را نشان می‌دهد."
    },
    {
      id: 49,
      text: "کلمه 'مَسْجِد' از چه وزنی است؟",
      options: ["مَفْعَل", "مَفْعِل", "مُفْعَل", "مُفْعِل"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مَسْجِد' از وزن 'مَفْعَل' است که مکان را نشان می‌دهد (مکان سجود)."
    },
    {
      id: 50,
      text: "اسم مفعول از چه ساختاری ساخته می‌شود؟",
      options: ["مَفْعُول", "مُفْعَل", "فَاعِل", "فَعِيل"],
      correctIndex: 0,
      answer: "گزینه ۱: اسم مفعول معمولاً از وزن 'مَفْعُول' ساخته می‌شود."
    },
    {
      id: 51,
      text: "حرف 'لِ' در جمله چه نقشی دارد؟",
      options: ["حرف جر", "حرف عطف", "حرف نفی", "حرف استفهام"],
      correctIndex: 0,
      answer: "گزینه ۱: 'لِ' یکی از حروف جر است و به معنی 'برای' یا 'مالِ' است."
    },
    {
      id: 52,
      text: "کلمه 'قِرَاءَة' از چه ریشه‌ای است؟",
      options: ["ق ر أ", "ق ر و", "ق ر ی", "ق ل أ"],
      correctIndex: 0,
      answer: "گزینه ۱: 'قِرَاءَة' از ریشه (ق ر أ) است که به معنی خواندن است."
    },
    {
      id: 53,
      text: "در جمله 'ذَهَبَ الْأَوْلَادُ إِلَى الْمَدْرَسَةِ'، اعراب 'الْمَدْرَسَةِ' چیست؟",
      options: ["مرفوع", "منصوب", "مجرور", "مجزوم"],
      correctIndex: 2,
      answer: "گزینه ۳: 'الْمَدْرَسَةِ' مجرور است زیرا بعد از حرف جر 'إِلَى' آمده است."
    },
    {
      id: 54,
      text: "اسم تفضیل در عربی به چه معناست؟",
      options: ["صفت برتر", "صفت معمولی", "اسم مکان", "اسم زمان"],
      correctIndex: 0,
      answer: "گزینه ۱: اسم تفضیل صفت برتری است و از وزن 'أَفْعَل' ساخته می‌شود."
    },
    {
      id: 55,
      text: "در جمله 'يَقْرَأُ الطَّالِبُ الْكِتَابَ'، اعراب 'الطَّالِبُ' چیست؟",
      options: ["مرفوع", "منصوب", "مجرور", "مجزوم"],
      correctIndex: 0,
      answer: "گزینه ۱: 'الطَّالِبُ' فاعل است و بنابراین مرفوع می‌باشد."
    },
    {
      id: 56,
      text: "کلمه 'مَغْرِب' از چه وزنی است؟",
      options: ["مَفْعَل", "مَفْعِل", "مُفْعَل", "مُفْعِل"],
      correctIndex: 1,
      answer: "گزینه ۲: 'مَغْرِب' از وزن 'مَفْعِل' است که مکان یا زمان وقوع فعل را نشان می‌دهد."
    },
    {
      id: 57,
      text: "وزن 'مُسْتَفْعِل' برای کدام باب است؟",
      options: ["باب اول", "باب دوم", "باب سوم", "باب دهم"],
      correctIndex: 3,
      answer: "گزینه ۴: 'مُسْتَفْعِل' از وزن باب استفعال (باب دهم) است که طلب کردن را نشان می‌دهد."
    },
    {
      id: 58,
      text: "در جمله 'ضَرَبَ زَيْدٌ عَمْراً'، 'ضَرَبَ' چه نقشی دارد؟",
      options: ["فاعل", "مفعول", "فعل", "حال"],
      correctIndex: 2,
      answer: "گزینه ۳: 'ضَرَبَ' فعل جمله است و به معنی زد است."
    },
    {
      id: 59,
      text: "کلمه 'مِفْتَاح' از چه وزنی است؟",
      options: ["مِفْتَاح", "مَفْتَاح", "مُفْتَاح", "فَتَّاح"],
      correctIndex: 0,
      answer: "گزینه ۱: 'مِفْتَاح' از وزن 'مِفْعَال' است که ابزار را نشان می‌دهد (ابزار باز کردن)."
    },
    {
      id: 60,
      text: "تحلیل نحوی 'اَلْكِتَابُ جَدِيدٌ' نشان می‌دهد که:",
      options: ["اَلْكِتَابُ مبتدا و جَدِيدٌ خبر", "اَلْكِتَابُ خبر و جَدِيدٌ مبتدا", "هردو مبتدا", "هردو خبر"],
      correctIndex: 0,
      answer: "گزینه ۱: در جمله اسمیه، اَلْكِتَابُ مبتدا و جَدِيدٌ خبر است و هر دو مرفوع هستند."
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
          onClick={() => router.push('/exam/yazdahom/tajrobi/sanjesh/first-half/arabi-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📚 آزمون جامع کل کتاب عربی (۲)</h1>
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
              📝 پاسخنامه تشریحی آزمون جامع عربی (۲)
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

export default ArabicFinalExam;