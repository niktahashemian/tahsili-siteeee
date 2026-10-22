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

export default function Fizik2ChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: الکتریسیته ساکن',
      icon: '⚡',
      color: '#9C27B0',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: الکتریسیته ساکن',
      examQuestionCount: 25,
      lessons: [
        { id: 1, name: 'درس ۱-۱: بار الکتریکی', description: 'مفهوم بار الکتریکی، انواع بار، پایستگی بار', questionCount: 10, slug: 'lesson1' },
        { id: 2, name: 'درس ۱-۲: بایستگی و کوانتیده بودن بار الکتریکی', description: 'کوانتیده بودن بار، یکای بار، بار عنصری', questionCount: 8, slug: 'lesson2' },
        { id: 3, name: 'درس ۱-۳: قانون کولن', description: 'نیروی بین دو بار نقطه‌ای، ثابت کولن، اصل برهم‌نهی', questionCount: 12, slug: 'lesson3' },
        { id: 4, name: 'درس ۱-۴: میدان الکتریکی', description: 'مفهوم میدان الکتریکی، میدان حاصل از بار نقطه‌ای', questionCount: 12, slug: 'lesson4' },
        { id: 5, name: 'درس ۱-۵: میدان الکتریکی حاصل از یک ذره باردار', description: 'محاسبه میدان الکتریکی، برهم‌نهی میدان‌ها', questionCount: 10, slug: 'lesson5' },
        { id: 6, name: 'درس ۱-۶: خطوط میدان الکتریکی', description: 'رسم خطوط میدان، ویژگی‌های خطوط میدان', questionCount: 8, slug: 'lesson6' },
        { id: 7, name: 'درس ۱-۷: انرژی پتانسیل الکتریکی', description: 'انرژی پتانسیل الکتریکی، کار و انرژی', questionCount: 10, slug: 'lesson7' },
        { id: 8, name: 'درس ۱-۸: پتانسیل الکتریکی', description: 'پتانسیل الکتریکی، اختلاف پتانسیل، رابطه با میدان', questionCount: 12, slug: 'lesson8' },
        { id: 9, name: 'درس ۱-۹: توزیع بار الکتریکی در اجسام رسانا', description: 'توزیع بار در رساناها، اثر نوک، پدیده القا', questionCount: 10, slug: 'lesson9' },
        { id: 10, name: 'درس ۱-۱۰: خازن', description: 'خازن، ظرفیت خازن، خازن تخت، دی‌الکتریک', questionCount: 12, slug: 'lesson10' },
        { id: 11, name: 'درس ۱-۱۱: انرژی خازن', description: 'انرژی ذخیره شده در خازن، کاربردهای خازن', questionCount: 8, slug: 'lesson11' },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: جریان الکتریکی و مدارهای جریان مستقیم',
      icon: '🔌',
      color: '#2196F3',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: جریان الکتریکی و مدارهای جریان مستقیم',
      examQuestionCount: 25,
      lessons: [
        { id: 12, name: 'درس ۲-۱: جریان الکتریکی', description: 'مفهوم جریان الکتریکی، جهت جریان، شدت جریان', questionCount: 10, slug: 'lesson12' },
        { id: 13, name: 'درس ۲-۲: مقاومت الکتریکی و قانون اهم', description: 'مقاومت الکتریکی، قانون اهم، مقاومت ویژه', questionCount: 12, slug: 'lesson13' },
        { id: 14, name: 'درس ۲-۳: عوامل مؤثر بر مقاومت الکتریکی', description: 'طول، سطح مقطع، جنس و دما', questionCount: 10, slug: 'lesson14' },
      ]
    },
    
    
    {
      id: 5,
      name: '🏆 آزمون جامع کل کتاب فیزیک (۲)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب فیزیک (۲) - پایه یازدهم تجربی',
      examQuestionCount: 50,
      lessons: [
        { id: 31, name: '📚 کل دروس کتاب فیزیک (۲)', description: 'شامل تمام مباحث: الکتریسیته ساکن، جریان الکتریکی و مدارها، مغناطیس و القای الکترومغناطیسی', questionCount: 50, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/maz/first-half/fizik-2-tajrobi/chapter-exam/${examSlug}`);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f0f4f8' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '2rem', borderRadius: '1rem' }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/first-half')} 
          style={{ backgroundColor: 'rgba(0,0,0,0.1)', color: '#333', border: 'none', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1rem' }}
        >
          ← بازگشت به لیست دروس
        </button>
        <h1 style={{ fontSize: '2.5rem', color: '#1a237e', margin: '0.5rem 0', fontWeight: 'bold' }}>⚛️ فیزیک (۲) - پایه یازدهم تجربی ماز</h1>
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
                {chapter.examQuestionCount > 0 && (
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
                    <div style={{ backgroundColor: '#4caf50', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>شروع آزمون جامع →</div>
                  </div>
                )}

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
                      cursor: lesson.questionCount > 0 ? 'pointer' : 'default',
                      transition: 'all 0.2s',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
                      opacity: lesson.questionCount > 0 ? 1 : 0.6
                    }}
                    onClick={() => lesson.questionCount > 0 && handleLessonClick(lesson.slug)}
                  >
                    <div style={{ fontSize: '1.8rem', marginRight: '1rem' }}>📘</div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#333' }}>{lesson.name}</h3>
                      <p style={{ margin: '0.25rem 0', fontSize: '0.8rem', color: '#666' }}>{lesson.description}</p>
                      {lesson.questionCount > 0 ? (
                        <div style={{ marginTop: '0.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          <span style={{ backgroundColor: '#f0f0f0', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#555' }}>📝 {lesson.questionCount} سوال</span>
                          <span style={{ backgroundColor: '#e3f2fd', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#1565c0' }}>⏱️ {Math.floor(lesson.questionCount * 1.5)} دقیقه</span>
                        </div>
                      ) : (
                        <span style={{ backgroundColor: '#fff3cd', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#856404' }}>📄 مطالعه‌ای</span>
                      )}
                    </div>
                    {lesson.questionCount > 0 && (
                      <div style={{ backgroundColor: '#9C27B0', color: 'white', padding: '0.4rem 1rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>شروع آزمون →</div>
                    )}
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
        <p>⚛️ این آزمون‌ها مطابق با کتاب فیزیک (۲) پایه یازدهم رشته تجربی - انتشارات ماز طراحی شده‌اند.</p>
      </div>
    </div>
  );
}