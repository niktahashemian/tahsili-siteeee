"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

const EnglishFinalExam = () => {
  const router = useRouter();

  // ================= سوالات جامع انگلیسی (۲) - ۶۰ سوال =================
  const questions = [
    // ==================== فصل اول: گرامر و زمان‌ها (۱۵ سوال) ====================
    {
      id: 1,
      text: "کدام یک از گزینه‌ها زمان حال ساده (Simple Present) را به درستی نشان می‌دهد؟",
      options: ["I am going to school", "I go to school", "I went to school", "I have gone to school"],
      correctIndex: 1,
      answer: "گزینه ۲: 'I go to school' زمان حال ساده است که برای بیان عادات و حقایق کلی استفاده می‌شود."
    },
    {
      id: 2,
      text: "کدام گزینه برای زمان حال استمراری (Present Continuous) صحیح است؟",
      options: ["She reads a book", "She is reading a book", "She read a book", "She has read a book"],
      correctIndex: 1,
      answer: "گزینه ۲: 'She is reading a book' زمان حال استمراری است که برای بیان کار در حال انجام استفاده می‌شود."
    },
    {
      id: 3,
      text: "کدام یک از افعال زیر در زمان گذشته ساده (Simple Past) بی‌قاعده است؟",
      options: ["walk → walked", "play → played", "go → went", "talk → talked"],
      correctIndex: 2,
      answer: "گزینه ۳: 'go' یک فعل بی‌قاعده است و شکل گذشته آن 'went' می‌شود."
    },
    {
      id: 4,
      text: "کدام جمله زمان گذشته ساده (Simple Past) را به درستی نشان می‌دهد؟",
      options: ["I am happy", "I was happy", "I will be happy", "I have been happy"],
      correctIndex: 1,
      answer: "گزینه ۲: 'I was happy' زمان گذشته ساده است که برای بیان حالتی در گذشته استفاده می‌شود."
    },
    {
      id: 5,
      text: "کدام زمان برای بیان عملی که در گذشته شروع شده و تا حالا ادامه دارد استفاده می‌شود؟",
      options: ["Simple Past", "Present Perfect", "Past Perfect", "Future Perfect"],
      correctIndex: 1,
      answer: "گزینه ۲: زمان Present Perfect برای بیان عملی که در گذشته شروع شده و تا حالا ادامه دارد استفاده می‌شود."
    },
    {
      id: 6,
      text: "کدام یک از گزینه‌ها زمان حال کامل (Present Perfect) است؟",
      options: ["I have eaten", "I ate", "I eat", "I am eating"],
      correctIndex: 0,
      answer: "گزینه ۱: 'I have eaten' زمان حال کامل است که از have/has + past participle ساخته می‌شود."
    },
    {
      id: 7,
      text: "تفاوت اصلی بین Simple Past و Present Perfect چیست؟",
      options: ["زمان دقیق در گذشته", "تأکید بر نتیجه", "همه موارد", "هیچکدام"],
      correctIndex: 2,
      answer: "گزینه ۳: Simple Past برای زمان دقیق گذشته و Present Perfect برای تأکید بر نتیجه و ارتباط با حال استفاده می‌شود."
    },
    {
      id: 8,
      text: "کدام گزینه زمان گذشته کامل (Past Perfect) را نشان می‌دهد؟",
      options: ["I had finished", "I have finished", "I finished", "I will finish"],
      correctIndex: 0,
      answer: "گزینه ۱: 'I had finished' زمان گذشته کامل است که برای بیان عملی که قبل از عمل دیگری در گذشته انجام شده استفاده می‌شود."
    },
    {
      id: 9,
      text: "کدام گزینه ساختار زمان آینده با 'will' را نشان می‌دهد؟",
      options: ["I am going to go", "I will go", "I go", "I went"],
      correctIndex: 1,
      answer: "گزینه ۲: 'I will go' ساختار زمان آینده با 'will' است که برای بیان تصمیمات لحظه‌ای و پیش‌بینی‌ها استفاده می‌شود."
    },
    {
      id: 10,
      text: "'Going to' برای چه زمانی استفاده می‌شود؟",
      options: ["تصمیمات لحظه‌ای", "برنامه‌های از قبل تعیین شده", "حقایق کلی", "اعمال گذشته"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Going to' برای برنامه‌ها و تصمیمات از قبل تعیین شده استفاده می‌شود."
    },
    {
      id: 11,
      text: "کدام جمله زمان آینده کامل (Future Perfect) است؟",
      options: ["I will have finished by tomorrow", "I will finish tomorrow", "I finish tomorrow", "I have finished"],
      correctIndex: 0,
      answer: "گزینه ۱: 'I will have finished by tomorrow' زمان آینده کامل است که برای بیان عملی که تا زمان خاصی در آینده انجام خواهد شد استفاده می‌شود."
    },
    {
      id: 12,
      text: "کدام گزینه برای زمان حال ساده با سوم شخص مفرد صحیح است؟",
      options: ["He go", "He goes", "He going", "He is go"],
      correctIndex: 1,
      answer: "گزینه ۲: در زمان حال ساده، برای سوم شخص مفرد (he, she, it) به فعل 's' اضافه می‌شود: He goes."
    },
    {
      id: 13,
      text: "کدام یک از گزینه‌ها زمان حال استمراری برای آینده را نشان می‌دهد؟",
      options: ["I am going to the cinema tomorrow", "I go to the cinema", "I went to the cinema", "I will go to the cinema"],
      correctIndex: 0,
      answer: "گزینه ۱: از حال استمراری (am/is/are + going) برای برنامه‌های آینده نیز استفاده می‌شود."
    },
    {
      id: 14,
      text: "کدام جمله زمان گذشته استمراری (Past Continuous) است؟",
      options: ["I was reading", "I read", "I have read", "I will read"],
      correctIndex: 0,
      answer: "گزینه ۱: 'I was reading' زمان گذشته استمراری است که برای بیان عملی در حال انجام در گذشته استفاده می‌شود."
    },
    {
      id: 15,
      text: "کدام یک از گزینه‌ها برای زمان گذشته کامل استمراری (Past Perfect Continuous) صحیح است؟",
      options: ["I had been waiting", "I have been waiting", "I was waiting", "I waited"],
      correctIndex: 0,
      answer: "گزینه ۱: 'I had been waiting' زمان گذشته کامل استمراری است که برای بیان عملی که مدت‌ها قبل از یک عمل دیگر در گذشته ادامه داشته استفاده می‌شود."
    },

    // ==================== فصل دوم: زمان‌های آینده و کامل (۱۵ سوال) ====================
    {
      id: 16,
      text: "کدام گزینه زمان آینده با 'will' را به درستی نشان می‌دهد؟",
      options: ["She will comes", "She will come", "She will coming", "She will came"],
      correctIndex: 1,
      answer: "گزینه ۲: با 'will' فعل به صورت ساده (base form) می‌آید: She will come."
    },
    {
      id: 17,
      text: "کدام جمله برای پیش‌بینی در آینده مناسب است؟",
      options: ["It will rain tomorrow", "It rains tomorrow", "It rained tomorrow", "It is raining tomorrow"],
      correctIndex: 0,
      answer: "گزینه ۱: از 'will' برای پیش‌بینی‌های آینده استفاده می‌شود: It will rain tomorrow."
    },
    {
      id: 18,
      text: "کدام گزینه ساختار حال کامل (Present Perfect) را به درستی نشان می‌دهد؟",
      options: ["I have saw", "I have seen", "I have see", "I have seeing"],
      correctIndex: 1,
      answer: "گزینه ۲: حال کامل با have/has + past participle ساخته می‌شود. شکل سوم 'see' = 'seen' است."
    },
    {
      id: 19,
      text: "کدام یک از گزینه‌ها زمان گذشته کامل (Past Perfect) است؟",
      options: ["I had ate", "I had eaten", "I have eaten", "I ate"],
      correctIndex: 1,
      answer: "گزینه ۲: گذشته کامل با had + past participle ساخته می‌شود: I had eaten."
    },
    {
      id: 20,
      text: "'By the time' با کدام زمان بیشتر استفاده می‌شود؟",
      options: ["Present Perfect", "Past Perfect", "Future Perfect", "Simple Past"],
      correctIndex: 2,
      answer: "گزینه ۳: 'By the time' معمولاً با Future Perfect استفاده می‌شود: By the time you arrive, I will have finished."
    },
    {
      id: 21,
      text: "کدام یک از گزینه‌ها زمان آینده کامل (Future Perfect) را نشان می‌دهد؟",
      options: ["I will finish", "I will have finished", "I have finished", "I had finished"],
      correctIndex: 1,
      answer: "گزینه ۲: Future Perfect با will have + past participle ساخته می‌شود: I will have finished."
    },
    {
      id: 22,
      text: "کدام جمله برای برنامه از قبل تعیین شده مناسب است؟",
      options: ["I will visit my friend", "I am going to visit my friend", "I visit my friend", "I visited my friend"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Going to' برای برنامه‌های از قبل تعیین شده استفاده می‌شود."
    },
    {
      id: 23,
      text: "کدام یک از گزینه‌ها زمان حال کامل استمراری (Present Perfect Continuous) است؟",
      options: ["I have been studying", "I have studied", "I was studying", "I studied"],
      correctIndex: 0,
      answer: "گزینه ۱: حال کامل استمراری با have/has been + verb-ing ساخته می‌شود."
    },
    {
      id: 24,
      text: "کدام جمله زمان آینده استمراری (Future Continuous) است؟",
      options: ["I will be sleeping at 10 PM", "I will sleep at 10 PM", "I sleep at 10 PM", "I slept at 10 PM"],
      correctIndex: 0,
      answer: "گزینه ۱: Future Continuous با will be + verb-ing ساخته می‌شود: I will be sleeping at 10 PM."
    },
    {
      id: 25,
      text: "کدام یک از گزینه‌ها برای بیان عملی که در آینده به پایان می‌رسد مناسب است؟",
      options: ["Future Simple", "Future Perfect", "Future Continuous", "Present Continuous"],
      correctIndex: 1,
      answer: "گزینه ۲: Future Perfect برای بیان عملی که تا زمان مشخصی در آینده به پایان می‌رسد استفاده می‌شود."
    },
    {
      id: 26,
      text: "کدام جمله زمان گذشته کامل استمراری (Past Perfect Continuous) است؟",
      options: ["I had been working for 2 hours", "I have been working for 2 hours", "I was working for 2 hours", "I worked for 2 hours"],
      correctIndex: 0,
      answer: "گزینه ۱: Past Perfect Continuous با had been + verb-ing ساخته می‌شود."
    },
    {
      id: 27,
      text: "'For' و 'Since' در کدام زمان بیشتر استفاده می‌شوند؟",
      options: ["Simple Past", "Present Perfect", "Past Perfect", "Future Simple"],
      correctIndex: 1,
      answer: "گزینه ۲: 'For' و 'Since' معمولاً با Present Perfect استفاده می‌شوند."
    },
    {
      id: 28,
      text: "کدام گزینه برای زمان آینده با 'be going to' صحیح است؟",
      options: ["She is going to studies", "She is going to study", "She is going to studying", "She is going to studied"],
      correctIndex: 1,
      answer: "گزینه ۲: با 'be going to' فعل به صورت ساده (base form) می‌آید: She is going to study."
    },
    {
      id: 29,
      text: "کدام یک از گزینه‌ها زمان حال کامل (Present Perfect) با 'just' است؟",
      options: ["I just ate", "I have just eaten", "I just eat", "I was just eating"],
      correctIndex: 1,
      answer: "گزینه ۲: 'Just' معمولاً با Present Perfect استفاده می‌شود: I have just eaten."
    },
    {
      id: 30,
      text: "کدام جمله زمان آینده کامل استمراری (Future Perfect Continuous) است؟",
      options: ["I will have been working", "I will have worked", "I will be working", "I have been working"],
      correctIndex: 0,
      answer: "گزینه ۱: Future Perfect Continuous با will have been + verb-ing ساخته می‌شود."
    },

    // ==================== فصل سوم: جملات شرطی و مجهول (۱۵ سوال) ====================
    {
      id: 31,
      text: "جمله شرطی نوع اول (Type 1) از چه ساختاری پیروی می‌کند؟",
      options: ["If + past, would + base", "If + present, will + base", "If + past perfect, would have + p.p", "If + present, present"],
      correctIndex: 1,
      answer: "گزینه ۲: نوع اول شرطی: If + present simple, will + base (برای شرایط واقعی و ممکن در آینده)."
    },
    {
      id: 32,
      text: "کدام جمله شرطی نوع دوم (Type 2) است؟",
      options: ["If I study, I will pass", "If I studied, I would pass", "If I had studied, I would have passed", "If I study, I pass"],
      correctIndex: 1,
      answer: "گزینه ۲: نوع دوم شرطی: If + past simple, would + base (برای شرایط غیرواقعی در حال یا آینده)."
    },
    {
      id: 33,
      text: "جمله شرطی نوع سوم (Type 3) برای چه شرایطی استفاده می‌شود؟",
      options: ["شرایط واقعی", "شرایط غیرواقعی در گذشته", "شرایط غیرواقعی در حال", "شرایط ممکن"],
      correctIndex: 1,
      answer: "گزینه ۲: نوع سوم شرطی برای شرایط غیرواقعی در گذشته استفاده می‌شود."
    },
    {
      id: 34,
      text: "کدام گزینه جمله شرطی نوع سوم را نشان می‌دهد؟",
      options: ["If I had known, I would have come", "If I know, I will come", "If I knew, I would come", "If I know, I come"],
      correctIndex: 0,
      answer: "گزینه ۱: نوع سوم: If + past perfect, would have + past participle."
    },
    {
      id: 35,
      text: "ساختار مجهول (Passive Voice) در زمان حال ساده چیست؟",
      options: ["am/is/are + past participle", "was/were + past participle", "have/has + past participle", "will + be + past participle"],
      correctIndex: 0,
      answer: "گزینه ۱: مجهول در زمان حال ساده: am/is/are + past participle."
    },
    {
      id: 36,
      text: "کدام یک از گزینه‌ها جمله مجهول در زمان گذشته ساده است؟",
      options: ["The book is read", "The book was read", "The book has been read", "The book will be read"],
      correctIndex: 1,
      answer: "گزینه ۲: مجهول در گذشته ساده: was/were + past participle."
    },
    {
      id: 37,
      text: "کدام گزینه جمله مجهول در زمان حال کامل است؟",
      options: ["The work is done", "The work was done", "The work has been done", "The work will be done"],
      correctIndex: 2,
      answer: "گزینه ۳: مجهول در حال کامل: have/has been + past participle."
    },
    {
      id: 38,
      text: "در جمله شرطی نوع اول، قسمت 'if' با کدام زمان می‌آید؟",
      options: ["Past Simple", "Present Simple", "Future Simple", "Past Perfect"],
      correctIndex: 1,
      answer: "گزینه ۲: در نوع اول شرطی، قسمت 'if' با Present Simple و قسمت اصلی با Future Simple می‌آید."
    },
    {
      id: 39,
      text: "کدام جمله شرطی نوع دوم صحیح است؟",
      options: ["If I were rich, I would travel", "If I am rich, I will travel", "If I was rich, I will travel", "If I had been rich, I would have traveled"],
      correctIndex: 0,
      answer: "گزینه ۱: در نوع دوم شرطی، برای 'were' با I استفاده می‌شود: If I were rich, I would travel."
    },
    {
      id: 40,
      text: "ساختار مجهول در زمان آینده چیست؟",
      options: ["will be + past participle", "will + past participle", "be + past participle", "will have + past participle"],
      correctIndex: 0,
      answer: "گزینه ۱: مجهول در آینده: will be + past participle."
    },
    {
      id: 41,
      text: "کدام یک از گزینه‌ها جمله شرطی نوع اول است؟",
      options: ["If it rains, we will stay home", "If it rained, we would stay home", "If it had rained, we would have stayed home", "If it rains, we stay home"],
      correctIndex: 0,
      answer: "گزینه ۱: نوع اول شرطی: If it rains, we will stay home."
    },
    {
      id: 42,
      text: "در مجهول، فاعل جمله چه جایگاهی دارد؟",
      options: ["قبل از فعل", "بعد از فعل", "حذف می‌شود", "همه موارد"],
      correctIndex: 2,
      answer: "گزینه ۳: در مجهول، فاعل معمولاً حذف می‌شود یا با 'by' می‌آید."
    },
    {
      id: 43,
      text: "کدام جمله مجهول در زمان گذشته کامل است؟",
      options: ["The work had been done", "The work has been done", "The work was done", "The work is done"],
      correctIndex: 0,
      answer: "گزینه ۱: مجهول در گذشته کامل: had been + past participle."
    },
    {
      id: 44,
      text: "در جملات شرطی نوع سوم، قسمت اصلی با کدام زمان می‌آید؟",
      options: ["would + base", "would have + past participle", "will + base", "had + past participle"],
      correctIndex: 1,
      answer: "گزینه ۲: در نوع سوم شرطی، قسمت اصلی با would have + past participle می‌آید."
    },
    {
      id: 45,
      text: "کدام یک از گزینه‌ها جمله مجهول در زمان حال استمراری است؟",
      options: ["The house is being built", "The house is built", "The house was built", "The house has been built"],
      correctIndex: 0,
      answer: "گزینه ۱: مجهول در حال استمراری: am/is/are being + past participle."
    },

    // ==================== فصل چهارم: گزارش‌گویی و نقل قول (۱۵ سوال) ====================
    {
      id: 46,
      text: "در نقل قول غیرمستقیم، زمان 'said' به چه زمانی تبدیل می‌شود؟",
      options: ["Present", "Past", "Future", "No change"],
      correctIndex: 1,
      answer: "گزینه ۲: در نقل قول غیرمستقیم، زمان جمله معمولاً یک مرحله به عقب برمی‌گردد (Past Tense)."
    },
    {
      id: 47,
      text: "جمله مستقیم 'I am happy' در نقل قول غیرمستقیم چگونه می‌شود؟",
      options: ["He said he is happy", "He said he was happy", "He said he will be happy", "He said he has been happy"],
      correctIndex: 1,
      answer: "گزینه ۲: در نقل قول غیرمستقیم، 'am' به 'was' تبدیل می‌شود: He said he was happy."
    },
    {
      id: 48,
      text: "در نقل قول غیرمستقیم، 'will' به چه کلمه‌ای تبدیل می‌شود؟",
      options: ["would", "will", "shall", "should"],
      correctIndex: 0,
      answer: "گزینه ۱: 'will' در نقل قول غیرمستقیم به 'would' تبدیل می‌شود."
    },
    {
      id: 49,
      text: "کدام یک از گزینه‌ها نقل قول غیرمستقیم جمله 'I am going to school' است؟",
      options: ["He said he is going to school", "He said he was going to school", "He said he will go to school", "He said he goes to school"],
      correctIndex: 1,
      answer: "گزینه ۲: در نقل قول غیرمستقیم، زمان 'am going' به 'was going' تبدیل می‌شود."
    },
    {
      id: 50,
      text: "در نقل قول غیرمستقیم، 'today' به چه کلمه‌ای تبدیل می‌شود؟",
      options: ["that day", "yesterday", "tomorrow", "now"],
      correctIndex: 0,
      answer: "گزینه ۱: 'today' در نقل قول غیرمستقیم به 'that day' تبدیل می‌شود."
    },
    {
      id: 51,
      text: "کدام یک از گزینه‌ها برای 'said' در نقل قول غیرمستقیم استفاده می‌شود؟",
      options: ["said", "told", "asked", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: از 'said'، 'told' و 'asked' بسته به نوع جمله در نقل قول غیرمستقیم استفاده می‌شود."
    },
    {
      id: 52,
      text: "در نقل قول غیرمستقیم، 'tomorrow' به چه کلمه‌ای تبدیل می‌شود؟",
      options: ["the next day", "today", "yesterday", "now"],
      correctIndex: 0,
      answer: "گزینه ۱: 'tomorrow' در نقل قول غیرمستقیم به 'the next day' تبدیل می‌شود."
    },
    {
      id: 53,
      text: "جمله مستقیم 'Where are you going?' در نقل قول غیرمستقیم چگونه می‌شود؟",
      options: ["He asked where are you going", "He asked where you are going", "He asked where I was going", "He asked where was I going"],
      correctIndex: 2,
      answer: "گزینه ۳: در نقل قول غیرمستقیم سوالی، ترتیب جمله به حالت مثبت تغییر می‌کند و زمان عقب می‌رود."
    },
    {
      id: 54,
      text: "در نقل قول غیرمستقیم، 'now' به چه کلمه‌ای تبدیل می‌شود؟",
      options: ["then", "now", "today", "that day"],
      correctIndex: 0,
      answer: "گزینه ۱: 'now' در نقل قول غیرمستقیم به 'then' تبدیل می‌شود."
    },
    {
      id: 55,
      text: "کدام یک از گزینه‌ها نقل قول غیرمستقیم صحیح برای 'I can swim' است؟",
      options: ["He said he can swim", "He said he could swim", "He said he will swim", "He said he swims"],
      correctIndex: 1,
      answer: "گزینه ۲: 'can' در نقل قول غیرمستقیم به 'could' تبدیل می‌شود."
    },
    {
      id: 56,
      text: "در نقل قول غیرمستقیم، 'must' به چه کلمه‌ای تبدیل می‌شود؟",
      options: ["must", "had to", "should", "would"],
      correctIndex: 1,
      answer: "گزینه ۲: 'must' در نقل قول غیرمستقیم معمولاً به 'had to' تبدیل می‌شود."
    },
    {
      id: 57,
      text: "جمله مستقیم 'I have finished' در نقل قول غیرمستقیم چگونه می‌شود؟",
      options: ["He said he have finished", "He said he has finished", "He said he had finished", "He said he finished"],
      correctIndex: 2,
      answer: "گزینه ۳: 'have finished' در نقل قول غیرمستقیم به 'had finished' تبدیل می‌شود."
    },
    {
      id: 58,
      text: "در نقل قول غیرمستقیم برای جمله امری از چه ساختاری استفاده می‌شود؟",
      options: ["said + to + infinitive", "told + object + to + infinitive", "asked + to + infinitive", "همه موارد"],
      correctIndex: 3,
      answer: "گزینه ۴: برای نقل قول غیرمستقیم جملات امری از ساختارهای مختلف با 'to + infinitive' استفاده می‌شود."
    },
    {
      id: 59,
      text: "کدام یک از گزینه‌ها نقل قول غیرمستقیم جمله 'Please help me' است؟",
      options: ["He said help me", "He asked to help him", "He told help me", "He said to help"],
      correctIndex: 1,
      answer: "گزینه ۲: برای درخواست‌ها در نقل قول غیرمستقیم از 'asked + to + infinitive' استفاده می‌شود."
    },
    {
      id: 60,
      text: "در نقل قول غیرمستقیم، 'this' به چه کلمه‌ای تبدیل می‌شود؟",
      options: ["that", "this", "these", "those"],
      correctIndex: 0,
      answer: "گزینه ۱: 'this' در نقل قول غیرمستقیم به 'that' تبدیل می‌شود."
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
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half/english-2-tajrobi')}
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
            <h1 style={{ margin: 0, fontSize: '28px' }}>📚 آزمون جامع کل کتاب انگلیسی (۲)</h1>
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
              📝 پاسخنامه تشریحی آزمون جامع انگلیسی (۲)
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

export default EnglishFinalExam;