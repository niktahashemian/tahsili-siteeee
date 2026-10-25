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

export default function ZistShenasi2FirstHalfPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  // آرایه فصل‌ها دقیقاً مطابق با فهرست کتاب زیست‌شناسی ۲
  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: تنظیم عصبی',
      icon: '🧠',
      color: '#8E24AA',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: تنظیم عصبی',
      examQuestionCount: 20,
      lessons: [
        { id: 1, name: 'گفتار ۱: یاخته‌های بافت عصبی', description: 'نورون‌ها، یاخته‌های پشتیبان', questionCount: 10, slug: 'lesson-1-1' },
        { id: 2, name: 'گفتار ۲: ساختار دستگاه عصبی', description: 'دستگاه عصبی مرکزی و محیطی', questionCount: 12, slug: 'lesson-1-2' },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: حواس',
      icon: '👁️',
      color: '#1E88E5',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: حواس',
      examQuestionCount: 20,
      lessons: [
        { id: 3, name: 'گفتار ۱: گیرنده‌های حسی', description: 'انواع گیرنده‌های حسی و مکانیسم تحریک', questionCount: 10, slug: 'lesson-2-1' },
        { id: 4, name: 'گفتار ۲: حواس ویژه', description: 'بینایی، شنوایی، بویایی و چشایی', questionCount: 12, slug: 'lesson-2-2' },
        { id: 5, name: 'گفتار ۳: گیرنده‌های حسی جانوران', description: 'حواس در جانوران مختلف', questionCount: 8, slug: 'lesson-2-3' },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: دستگاه حرکتی',
      icon: '🦴',
      color: '#43A047',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: دستگاه حرکتی',
      examQuestionCount: 20,
      lessons: [
        { id: 6, name: 'گفتار ۱: استخوان‌ها و اسکلت', description: 'ساختار استخوان، مفاصل و اسکلت', questionCount: 10, slug: 'lesson-3-1' },
        { id: 7, name: 'گفتار ۲: ماهیچه‌ها و حرکت', description: 'انواع ماهیچه، ساختار سارکومر و انقباض', questionCount: 12, slug: 'lesson-3-2' },
      ]
    },
    {
      id: 4,
      name: 'فصل چهارم: تنظیم شیمیایی',
      icon: '🧪',
      color: '#FB8C00',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم: تنظیم شیمیایی',
      examQuestionCount: 20,
      lessons: [
        { id: 8, name: 'گفتار ۱: ارتباط شیمیایی', description: 'هورمون‌ها و مکانیسم اثر آن‌ها', questionCount: 10, slug: 'lesson-4-1' },
        { id: 9, name: 'گفتار ۲: غده‌های درون‌ریز', description: 'هیپوفیز، تیروئید، پانکراس و غدد جنسی', questionCount: 12, slug: 'lesson-4-2' },
      ]
    },
    {
      id: 5,
      name: 'فصل پنجم: ایمنی',
      icon: '🛡️',
      color: '#E53935',
      examSlug: 'chapter5-exam',
      examName: 'آزمون جامع فصل پنجم: ایمنی',
      examQuestionCount: 20,
      lessons: [
        { id: 10, name: 'گفتار ۱: نخستین خط دفاعی: ورود ممنوع', description: 'پوست و مخاط‌ها', questionCount: 8, slug: 'lesson-5-1' },
        { id: 11, name: 'گفتار ۲: دومین خط دفاعی: واکنش‌های عمومی اما سریع', description: 'التهاب، تب، فاگوسیتوز', questionCount: 10, slug: 'lesson-5-2' },
        { id: 12, name: 'گفتار ۳: سومین خط دفاعی: دفاع اختصاصی', description: 'لنفوسیت‌های B و T، پادتن', questionCount: 12, slug: 'lesson-5-3' },
      ]
    },
    {
      id: 6,
      name: 'فصل ششم: تقسیم یاخته',
      icon: '🧫',
      color: '#00897B',
      examSlug: 'chapter6-exam',
      examName: 'آزمون جامع فصل ششم: تقسیم یاخته',
      examQuestionCount: 20,
      lessons: [
        { id: 13, name: 'گفتار ۱: فام‌تن (کروموزوم)', description: 'ساختار کروموزوم و چرخه یاخته‌ای', questionCount: 8, slug: 'lesson-6-1' },
        { id: 14, name: 'گفتار ۲: رشتمان (میتوز)', description: 'مراحل میتوز و سیتوکینز', questionCount: 12, slug: 'lesson-6-2' },
        { id: 15, name: 'گفتار ۳: کاستمان (میوز) و تولیدمثل جنسی', description: 'مراحل میوز و اهمیت تنوع ژنتیکی', questionCount: 14, slug: 'lesson-6-3' },
      ]
    },
    {
      id: 7,
      name: 'فصل هفتم: تولیدمثل',
      icon: '👶',
      color: '#D81B60',
      examSlug: 'chapter7-exam',
      examName: 'آزمون جامع فصل هفتم: تولیدمثل',
      examQuestionCount: 25,
      lessons: [
        { id: 16, name: 'گفتار ۱: دستگاه تولیدمثل در مرد', description: 'بیضه‌ها، مجاری و غدد ضمیمه', questionCount: 10, slug: 'lesson-7-1' },
        { id: 17, name: 'گفتار ۲: دستگاه تولیدمثل در زن', description: 'تخمدان‌ها، لوله رحم و چرخه جنسی', questionCount: 12, slug: 'lesson-7-2' },
        { id: 18, name: 'گفتار ۳: رشد و نمو جنین', description: 'لقاح، تشکیل رویان و جفت', questionCount: 12, slug: 'lesson-7-3' },
        { id: 19, name: 'گفتار ۴: تولیدمثل در جانوران', description: 'روش‌های تولیدمثل در بی‌مهرگان و مهره‌داران', questionCount: 10, slug: 'lesson-7-4' },
      ]
    },
    {
      id: 8,
      name: 'فصل هشتم: تولیدمثل نهان‌دانگان',
      icon: '🌸',
      color: '#7CB342',
      examSlug: 'chapter8-exam',
      examName: 'آزمون جامع فصل هشتم: تولیدمثل نهان‌دانگان',
      examQuestionCount: 20,
      lessons: [
        { id: 20, name: 'گفتار ۱: تولیدمثل غیرجنسی', description: 'روش‌های تکثیر رویشی در گیاهان', questionCount: 10, slug: 'lesson-8-1' },
        { id: 21, name: 'گفتار ۲: تولیدمثل جنسی', description: 'ساختار گل، دانه گرده و تخمک', questionCount: 12, slug: 'lesson-8-2' },
        { id: 22, name: 'گفتار ۳: از یاخته تخم تا گیاه', description: 'تشکیل دانه، میوه و جوانه‌زنی', questionCount: 10, slug: 'lesson-8-3' },
      ]
    },
    {
      id: 9,
      name: 'فصل نهم: پاسخ گیاهان به محرک‌ها',
      icon: '🌱',
      color: '#5E35B1',
      examSlug: 'chapter9-exam',
      examName: 'آزمون جامع فصل نهم: پاسخ گیاهان به محرک‌ها',
      examQuestionCount: 20,
      lessons: [
        { id: 23, name: 'گفتار ۱: تنظیم کننده‌های رشد در گیاهان', description: 'اکسین، جیبرلین، سیتوکینین و...', questionCount: 12, slug: 'lesson-9-1' },
        { id: 24, name: 'گفتار ۲: پاسخ به محیط', description: 'گرایش‌ها (فوتوتروپیسم، ژئوتروپیسم و...)', questionCount: 10, slug: 'lesson-9-2' },
      ]
    },
    {
      id: 10,
      name: '🏆 آزمون جامع کل کتاب زیست‌شناسی (۲)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب زیست‌شناسی (۲) - پایه یازدهم تجربی',
      examQuestionCount: 50,
      lessons: [
        { id: 25, name: '📚 کل دروس کتاب زیست‌شناسی (۲)', description: 'شامل تمام مباحث کتاب', questionCount: 50, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  // آدرس‌ها به first-half تغییر یافتند
  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/maz/first-half/zist-shenasi-2-tajrobi/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/maz/first-half/zist-shenasi-2-tajrobi/chapter-exam/${examSlug}`);
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
        <h1 style={{ fontSize: '2.5rem', color: '#1a237e', margin: '0.5rem 0', fontWeight: 'bold' }}>🧬 زیست‌شناسی (۲) - پایه یازدهم تجربی ماز</h1>
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
        <p>🧬 این آزمون‌ها مطابق با کتاب زیست‌شناسی (۲) پایه یازدهم رشته تجربی - انتشارات ماز طراحی شده‌اند.</p>
      </div>
    </div>
  );
}