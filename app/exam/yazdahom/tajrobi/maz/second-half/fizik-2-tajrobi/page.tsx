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
      id: 2,
      name: 'فصل دوم: جریان الکتریکی و مدارهای جریان مستقیم',
      icon: '🔌',
      color: '#2196F3',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: جریان الکتریکی و مدارهای جریان مستقیم',
      examQuestionCount: 25,
      lessons: [
        { id: 15, name: 'درس ۲-۴: نیروی محرکه الکتریکی و مدارها', description: 'نیروی محرکه، مدارهای سری و موازی', questionCount: 12, slug: 'lesson15' },
        { id: 16, name: 'درس ۲-۵: توان در مدارهای الکتریکی', description: 'توان الکتریکی، انرژی مصرفی، بازده', questionCount: 10, slug: 'lesson16' },
        { id: 17, name: 'درس ۲-۶: ترکیب مقاومت‌ها', description: 'مقاومت‌های سری و موازی، مدارهای ترکیبی', questionCount: 12, slug: 'lesson17' },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: مغناطیس و القای الکترومغناطیسی',
      icon: '🧲',
      color: '#F44336',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: مغناطیس و القای الکترومغناطیسی',
      examQuestionCount: 25,
      lessons: [
        { id: 18, name: 'درس ۳-۱: مغناطیس و قطب‌های مغناطیسی', description: 'آهنرباها، قطب‌های مغناطیسی، میدان مغناطیسی', questionCount: 10, slug: 'lesson18' },
        { id: 19, name: 'درس ۳-۲: میدان مغناطیسی', description: 'خطوط میدان مغناطیسی، میدان زمین، میدان حاصل از آهنربا', questionCount: 10, slug: 'lesson19' },
        { id: 20, name: 'درس ۳-۳: نیروی مغناطیسی وارد بر ذره باردار متحرک در میدان مغناطیسی', description: 'نیروی لورنتس، حرکت ذره باردار در میدان مغناطیسی', questionCount: 12, slug: 'lesson20' },
        { id: 21, name: 'درس ۳-۴: نیروی مغناطیسی وارد بر سیم حامل جریان', description: 'نیروی وارد بر سیم حامل جریان، گشتاور مغناطیسی', questionCount: 12, slug: 'lesson21' },
        { id: 22, name: 'درس ۳-۵: میدان مغناطیسی حاصل از جریان الکتریکی', description: 'میدان سیم راست، حلقه و سیم‌لوله', questionCount: 12, slug: 'lesson22' },
        { id: 23, name: 'درس ۳-۶: ویژگی‌های مغناطیسی مواد', description: 'مواد فرومغناطیس، پارامغناطیس و دیامغناطیس', questionCount: 10, slug: 'lesson23' },
        { id: 24, name: 'درس ۳-۷: پدیده القای الکترومغناطیسی', description: 'شار مغناطیسی، پدیده القا، جریان القایی', questionCount: 12, slug: 'lesson24' },
        { id: 25, name: 'درس ۳-۸: قانون القای الکترومغناطیسی فاراده', description: 'قانون فاراده، نیروی محرکه القایی', questionCount: 12, slug: 'lesson25' },
        { id: 26, name: 'درس ۳-۹: قانون لنز', description: 'قانون لنز، جهت جریان القایی', questionCount: 10, slug: 'lesson26' },
        { id: 27, name: 'درس ۳-۱۰: القاگرها', description: 'القاگر، ضریب خودالقایی، انرژی القاگر', questionCount: 10, slug: 'lesson27' },
        { id: 28, name: 'درس ۳-۱۱: جریان متناوب', description: 'جریان متناوب، مولد، ترانسفورماتور', questionCount: 12, slug: 'lesson28' },
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
    router.push(`/exam/yazdahom/tajrobi/maz/second-half/fizik-2-tajrobi/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/maz/second-half/fizik-2-tajrobi/chapter-exam/${examSlug}`);
  };

  return (
    <div style={{ minHeight: '100vh', padding: '2rem', backgroundColor: '#f0f4f8' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', padding: '2rem', borderRadius: '1rem' }}>
        <button 
          onClick={() => router.push('/exam/yazdahom/tajrobi/maz/second-half')} 
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