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

export default function Riyazi2ChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: مثلثات',
      icon: '📐',
      color: '#F44336',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: مثلثات',
      examQuestionCount: 25,
      lessons: [
        { id: 1, name: 'درس ۱-۱: نسبت‌های مثلثاتی', description: 'نسبت‌های مثلثاتی در مثلث قائم‌الزاویه، دایره مثلثاتی، زاویه‌های معروف', questionCount: 15, slug: 'lesson1' },
        { id: 2, name: 'درس ۱-۲: اتحادهای مثلثاتی', description: 'اتحادهای اصلی مثلثاتی، رابطه بین نسبت‌های مثلثاتی، اثبات اتحادها', questionCount: 12, slug: 'lesson2' },
        { id: 3, name: 'درس ۱-۳: معادلات مثلثاتی', description: 'حل معادلات مثلثاتی ساده، تعیین جواب‌ها در بازه‌های مختلف', questionCount: 10, slug: 'lesson3' },
        { id: 4, name: 'درس ۱-۴: توابع مثلثاتی', description: 'تعریف توابع مثلثاتی، رسم نمودار، دامنه و برد، ویژگی‌های توابع', questionCount: 12, slug: 'lesson4' },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: ماتریس و دترمینان',
      icon: '📊',
      color: '#2196F3',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: ماتریس و دترمینان',
      examQuestionCount: 25,
      lessons: [
        { id: 5, name: 'درس ۲-۱: تعریف ماتریس و اعمال روی آن', description: 'تعریف ماتریس، جمع، تفریق، ضرب ماتریس‌ها، ماتریس صفر و واحد', questionCount: 10, slug: 'lesson5' },
        { id: 6, name: 'درس ۲-۲: دترمینان ماتریس', description: 'تعریف دترمینان، محاسبه دترمینان ماتریس‌های ۲×۲ و ۳×۳، خواص دترمینان', questionCount: 12, slug: 'lesson6' },
        { id: 7, name: 'درس ۲-۳: ماتریس معکوس', description: 'تعریف ماتریس معکوس، محاسبه معکوس ماتریس ۲×۲ و ۳×۳، کاربردها', questionCount: 8, slug: 'lesson7' },
        { id: 8, name: 'درس ۲-۴: حل دستگاه معادلات با ماتریس', description: 'روش ماتریسی، روش کرامر، روش حذف گاوس، تحلیل دستگاه‌ها', questionCount: 10, slug: 'lesson8' },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: احتمال',
      icon: '🎲',
      color: '#FF9800',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: احتمال',
      examQuestionCount: 25,
      lessons: [
        { id: 9, name: 'درس ۳-۱: فضای نمونه و پیشامد', description: 'فضای نمونه، پیشامد، پیشامدهای ساده و مرکب، رویدادهای مستقل', questionCount: 12, slug: 'lesson9' },
        { id: 10, name: 'درس ۳-۲: احتمال کلاسیک', description: 'تعریف احتمال کلاسیک، محاسبه احتمال، قانون جمع احتمال', questionCount: 10, slug: 'lesson10' },
        { id: 11, name: 'درس ۳-۳: احتمال شرطی', description: 'تعریف احتمال شرطی، قانون ضرب احتمال، استقلال پیشامدها', questionCount: 8, slug: 'lesson11' },
      ]
    },
    {
      id: 4,
      name: 'فصل چهارم: حد و مشتق',
      icon: '📈',
      color: '#4CAF50',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم: حد و مشتق',
      examQuestionCount: 25,
      lessons: [
        { id: 12, name: 'درس ۴-۱: مفهوم حد', description: 'تعریف حد، محاسبه حد توابع، حدهای معروف، قضایای حد', questionCount: 10, slug: 'lesson12' },
        { id: 13, name: 'درس ۴-۲: پیوستگی', description: 'تعریف پیوستگی، بررسی پیوستگی توابع، قضیه مقدار میانی', questionCount: 8, slug: 'lesson13' },
        { id: 14, name: 'درس ۴-۳: مشتق', description: 'تعریف مشتق، قواعد مشتق‌گیری، مشتق توابع مثلثاتی و نمایی', questionCount: 12, slug: 'lesson14' },
        { id: 15, name: 'درس ۴-۴: کاربردهای مشتق', description: 'معادله خط مماس، اکسترمم‌های تابع، نقاط بحرانی، بهینه‌سازی', questionCount: 10, slug: 'lesson15' },
      ]
    },
    {
      id: 5,
      name: '🏆 آزمون جامع کل کتاب ریاضی (۲)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب ریاضی (۲) پایه یازدهم',
      examQuestionCount: 50,
      lessons: [
        { id: 16, name: '📚 کل دروس کتاب ریاضی (۲)', description: 'شامل تمام مباحث: مثلثات، ماتریس و دترمینان، احتمال، حد و مشتق', questionCount: 50, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/ghalamchi/first-half/riyazi-2-tajrobi/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/ghalamchi/first-half/riyazi-2-tajrobi/${examSlug}`);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f0f4f8' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '2rem', borderRadius: '1rem' }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/ghalamchi/first-half')} 
          style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: '#333', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1rem' }}
        >
          ← بازگشت به لیست دروس
        </button>
        <h1 style={{ fontSize: '2.5rem', color: '#1a237e', margin: '0.5rem 0', fontWeight: 'bold' }}>📐 ریاضی (۲) - پایه یازدهم تجربی قلمچی</h1>
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
                    <div style={{ backgroundColor: '#F44336', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>شروع آزمون →</div>
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
        <p>📐 این آزمون‌ها مطابق با کتاب ریاضی (۲) پایه یازدهم رشته تجربی طراحی شده‌اند.</p>
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