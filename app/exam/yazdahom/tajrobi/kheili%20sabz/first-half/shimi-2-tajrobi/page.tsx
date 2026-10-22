'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Lesson {
  id: number;
  name: string;
  description: string;
  questionCount: number;
  slug: string;
}

interface Chapter {
  id: number;
  name: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  examSlug: string;
  examName: string;
  examQuestionCount: number;
}

export default function Shimi2ChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: منابع شیمیایی و نقش آن در زندگی',
      icon: '🧪',
      color: '#9C27B0',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: قدر هدایای زمینی را بدانیم',
      examQuestionCount: 25,
      lessons: [
        { id: 1, name: 'درس ۱-۱: الگوها و روندها در رفتار مواد و عناصر', description: 'آرایش الکترونی، اوربیتال‌ها، اعداد کوانتومی و جایگاه عناصر در جدول تناوبی', questionCount: 15, slug: 'lesson1' },
        { id: 2, name: 'درس ۱-۲: رفتار عناصرها و شعاع اتم', description: 'انرژی یونش، الکترونگاتیوی، شعاع اتمی و یونی و روند تغییرات آن‌ها در جدول', questionCount: 12, slug: 'lesson2' },
        { id: 3, name: 'درس ۱-۳: دنیای رنگی با عناصر دسته ی دی ', description: 'محاسبات استوکیومتری، شناسایی محدودکننده واکنش و محاسبه بازده درصدی', questionCount: 10, slug: 'lesson3' },
        { id: 4, name: 'درس ۱-۴: عناصر به چه شکلی در طبیعت یافت میشوند؟', description: 'آلکان‌ها، آلکن‌ها، آلکین‌ها، نام‌گذاری IUPAC و ویژگی‌های فیزیکی و شیمیایی', questionCount: 12, slug: 'lesson4' },
        { id: 5, name: 'درس ۱-۵: واكنش پذیری عناصر ها', description: 'آلکان‌ها، آلکن‌ها، آلکین‌ها، نام‌گذاری IUPAC و ویژگی‌های فیزیکی و شیمیایی', questionCount: 12, slug: 'lesson5' },
        { id: 6, name: 'درس ۱-۶: شناسايی کاتیون های اهن در ترکیباات', description: 'آلکان‌ها، آلکن‌ها، آلکین‌ها، نام‌گذاری IUPAC و ویژگی‌های فیزیکی و شیمیایی', questionCount: 12, slug: 'lesson6' },
        { id: 7, name: 'درس ۱-۷: جريان فلزبين محیط زیست و جامعه', description: 'آلکان‌ها، آلکن‌ها، آلکین‌ها، نام‌گذاری IUPAC و ویژگی‌های فیزیکی و شیمیایی', questionCount: 12, slug: 'lesson7' },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: پیوندها و انرژی شیمیایی',
      icon: '⚡',
      color: '#2196F3',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: پیوندها و انرژی شیمیایی',
      examQuestionCount: 25,
      lessons: [
        { id: 5, name: 'درس ۲-۱: مفهوم دما ،گرما  ، انرژی', description: 'مفهوم آنتالپی، تشخیص واکنش‌های گرماگیر و گرمازا و محاسبات مربوطه', questionCount: 10, slug: 'lesson8' },
        { id: 6, name: 'درس ۲-۲: ظرفیت گرمایی و گرمایی ویژه', description: 'قانون هس، آنتالپی استاندارد تشکیل، آنتالپی استاندارد سوختن و محاسبات', questionCount: 12, slug: 'lesson9' },
        { id: 7, name: 'درس ۲-۳: جاری شدن انرژی گرمایی', description: 'عوامل مؤثر بر سرعت واکنش، نظریه برخورد و انرژی فعال‌سازی', questionCount: 8, slug: 'lesson10' },
        { id: 8, name: 'درس ۲-۴: ترموشیمی', description: 'تأثیر دما، غلظت، سطح تماس و کاتالیزور بر سرعت واکنش‌ها', questionCount: 8, slug: 'lesson11' },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: پوشاک، نیازی پایان‌ناپذیر',
      icon: '👕',
      color: '#FF9800',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: پوشاک، نیازی پایان‌ناپذیر',
      examQuestionCount: 25,
      lessons: [
        { id: 9, name: 'درس ۳-۱: کربن‌ها و ترکیب‌های آلی', description: 'ساختار اتم کربن، ترکیب‌های آلی، گروه‌های عاملی و شناسایی آن‌ها', questionCount: 12, slug: 'lesson9' },
        { id: 10, name: 'درس ۳-۲: استرها و پلی‌استرها', description: 'تشکیل استر، هیدرولیز استر، پلی‌استرها و کاربردهای آن‌ها در صنعت نساجی', questionCount: 10, slug: 'lesson10' },
        { id: 11, name: 'درس ۳-۳: پلی‌آمیدها و الیاف', description: 'پلی‌آمیدها، ساختار نایلون، الیاف مصنوعی و طبیعی و تفاوت آن‌ها', questionCount: 8, slug: 'lesson11' },
      ]
    },
    {
      id: 4,
      name: '🏆 آزمون جامع کل کتاب شیمی (2)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب شیمی (2) پایه یازدهم',
      examQuestionCount: 50,
      lessons: [
        { id: 12, name: '📚 کل دروس کتاب شیمی (2)', description: 'شامل تمام مباحث: ساختار اتم، جدول تناوبی، پیوند شیمیایی، ترمودینامیک، سینتیک، تعادل، اسید و باز، الکتروشیمی و شیمی آلی', questionCount: 50, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/kheili%20sabz/first-half/shimi-2-tajrobi/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/kheili%20sabz/first-half/shimi-2-tajrobi/${examSlug}`);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f0f4f8' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '2rem', borderRadius: '1rem' }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/kheili%20sabz/first-half')} 
          style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: '#333', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1rem' }}
        >
          ← بازگشت به لیست دروس
        </button>
        <h1 style={{ fontSize: '2.5rem', color: '#1a237e', margin: '0.5rem 0', fontWeight: 'bold' }}>🧪 شیمی (2) - پایه یازدهم تجربی قلمچی</h1>
        <p style={{ color: '#555', fontSize: '1rem' }}>برای شروع، روی هر فصل کلیک کنید و سپس درس یا آزمون جامع مورد نظر را انتخاب نمایید</p>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {chapters.map((chapter) => (
          <div key={chapter.id} style={{ backgroundColor: 'white', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <button
              onClick={() => handleChapterClick(chapter.id)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.2rem 1.5rem',
                border: 'none',
                backgroundColor: openChapter === chapter.id ? chapter.color : '#4a5568',
                color: 'white',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <span style={{ fontSize: '1.5rem' }}>{chapter.icon}</span>
              <span style={{ flex: 1, textAlign: 'right', marginRight: '1rem' }}>{chapter.name}</span>
              <span style={{ fontSize: '0.9rem' }}>{openChapter === chapter.id ? '▲' : '▼'}</span>
            </button>

            {openChapter === chapter.id && (
              <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', backgroundColor: '#f8f9fa' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    backgroundColor: '#e8f5e9',
                    borderRadius: '0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    border: '2px solid #81c784'
                  }}
                  onClick={() => handleChapterExamClick(chapter.examSlug)}
                >
                  <div style={{ fontSize: '2rem', marginRight: '1rem' }}>🎯</div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#2e7d32' }}>{chapter.examName}</h3>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#666' }}>آزمون جامع تمام دروس این فصل</p>
                    <div style={{ marginTop: '0.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: '#f0f0f0', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#555' }}>📝 {chapter.examQuestionCount} سوال</span>
                      <span style={{ backgroundColor: '#e3f2fd', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#1565c0' }}>⏱️ {Math.floor(chapter.examQuestionCount * 1.5)} دقیقه</span>
                    </div>
                  </div>
                  <div style={{ backgroundColor: '#4caf50', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>شروع آزمون جامع →</div>
                </div>

                <div style={{ textAlign: 'center', margin: '0.5rem 0', position: 'relative' }}>
                  <span style={{ backgroundColor: '#e9ecef', padding: '0.2rem 1rem', borderRadius: '1rem', fontSize: '0.75rem', color: '#6c757d' }}>📖 دروس فصل</span>
                </div>

                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '1rem',
                      backgroundColor: 'white',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.08)'
                    }}
                    onClick={() => handleLessonClick(lesson.slug)}
                  >
                    <div style={{ fontSize: '1.8rem', marginRight: '1rem' }}>📘</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>{lesson.name}</h3>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#666' }}>{lesson.description}</p>
                      <div style={{ marginTop: '0.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <span style={{ backgroundColor: '#f0f0f0', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#555' }}>📝 {lesson.questionCount} سوال</span>
                        <span style={{ backgroundColor: '#e3f2fd', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#1565c0' }}>⏱️ {Math.floor(lesson.questionCount * 1.5)} دقیقه</span>
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#9C27B0', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>شروع آزمون →</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.5rem', marginTop: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', color: '#555' }}>
        <p>💡 نکته: برای شروع آزمون هر درس یا آزمون جامع فصل، روی آن کلیک کنید.</p>
        <p>📊 پس از اتمام هر آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
        <p>🏆 آزمون‌های جامع شامل سوالات ترکیبی از تمام دروس آن فصل می‌باشند.</p>
        <p>🧪 این آزمون‌ها مطابق با کتاب شیمی (۲) پایه یازدهم رشته تجربی طراحی شده‌اند.</p>
      </div>

      <style>{`
        .lesson-card:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .lesson-card:hover .lesson-button {
          background-color: #10b981;
        }
        .chapter-exam-card:hover {
          transform: translateX(5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .chapter-exam-card:hover .exam-button {
          background-color: #10b981;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .lessons-container {
          animation: fadeIn 0.3s ease-out;
        }
        button {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}