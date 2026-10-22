'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// تعریف تایپ برای درس
interface Lesson {
  id: number;
  name: string;
  description: string;
  questionCount: number;
  slug: string;
}

// تعریف تایپ برای فصل
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

export default function EnsanVaMohitZistChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  // ======================== ساختار فصل‌ها و درس‌های کتاب انسان و محیط زیست یازدهم ========================
  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: محیط زیست و انسان',
      icon: '🌍',
      color: '#607D8B',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: محیط زیست و انسان',
      examQuestionCount: 25,
      lessons: [
        { 
          id: 1, 
          name: 'درس اول: تعریف محیط زیست', 
          description: 'تعریف محیط زیست، اجزای محیط زیست، اکوسیستم و زیست‌بوم', 
          questionCount: 12, 
          slug: 'lesson1' 
        },
        { 
          id: 2, 
          name: 'درس دوم: رابطه انسان و طبیعت', 
          description: 'تأثیر انسان بر طبیعت، بهره‌برداری از منابع، تغییرات زیست‌محیطی', 
          questionCount: 10, 
          slug: 'lesson2' 
        },
        { 
          id: 3, 
          name: 'درس سوم: تنوع زیستی و اهمیت آن', 
          description: 'تنوع ژنتیکی، گونه‌ای و اکوسیستمی، اهمیت تنوع زیستی', 
          questionCount: 10, 
          slug: 'lesson3' 
        },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: آلودگی‌های محیط زیست',
      icon: '☁️',
      color: '#F44336',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: آلودگی‌های محیط زیست',
      examQuestionCount: 28,
      lessons: [
        { 
          id: 4, 
          name: 'درس اول: آلودگی هوا', 
          description: 'منابع آلودگی هوا، گازهای گلخانه‌ای، ذرات معلق، اثرات بر سلامت', 
          questionCount: 12, 
          slug: 'lesson4' 
        },
        { 
          id: 5, 
          name: 'درس دوم: آلودگی آب و خاک', 
          description: 'آلاینده‌های آب و خاک، پساب‌ها، سموم کشاورزی، فلزات سنگین', 
          questionCount: 10, 
          slug: 'lesson5' 
        },
        { 
          id: 6, 
          name: 'درس سوم: آلودگی صوتی و نوری', 
          description: 'منابع آلودگی صوتی، اثرات بر سلامت، آلودگی نوری', 
          questionCount: 10, 
          slug: 'lesson6' 
        },
        { 
          id: 7, 
          name: 'درس چهارم: پسماند و مدیریت آن', 
          description: 'انواع پسماند، بازیافت، کمپوست، مدیریت پسماند', 
          questionCount: 8, 
          slug: 'lesson7' 
        },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: بحران‌های زیست‌محیطی',
      icon: '🌊',
      color: '#FF9800',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: بحران‌های زیست‌محیطی',
      examQuestionCount: 25,
      lessons: [
        { 
          id: 8, 
          name: 'درس اول: گرمایش جهانی و تغییر اقلیم', 
          description: 'علل گرمایش جهانی، اثر گلخانه‌ای، پیامدهای تغییر اقلیم', 
          questionCount: 12, 
          slug: 'lesson8' 
        },
        { 
          id: 9, 
          name: 'درس دوم: خشکسالی و کمبود آب', 
          description: 'علل خشکسالی، بحران آب، راه‌های مدیریت منابع آب', 
          questionCount: 10, 
          slug: 'lesson9' 
        },
        { 
          id: 10, 
          name: 'درس سوم: بیابان‌زایی و فرسایش خاک', 
          description: 'علل بیابان‌زایی، فرسایش خاک، راه‌های مقابله', 
          questionCount: 10, 
          slug: 'lesson10' 
        },
      ]
    },
    {
      id: 4,
      name: 'فصل چهارم: توسعه پایدار و محیط زیست',
      icon: '🌱',
      color: '#4CAF50',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم: توسعه پایدار و محیط زیست',
      examQuestionCount: 30,
      lessons: [
        { 
          id: 11, 
          name: 'درس اول: مفهوم توسعه پایدار', 
          description: 'تعریف توسعه پایدار، ابعاد اقتصادی، اجتماعی و زیست‌محیطی', 
          questionCount: 12, 
          slug: 'lesson11' 
        },
        { 
          id: 12, 
          name: 'درس دوم: انرژی‌های تجدیدپذیر', 
          description: 'انرژی خورشیدی، بادی، آبی، زمین‌گرمایی، زیست‌توده', 
          questionCount: 10, 
          slug: 'lesson12' 
        },
        { 
          id: 13, 
          name: 'درس سوم: اقتصاد سبز و مصرف پایدار', 
          description: 'اقتصاد سبز، مصرف پایدار، تولید سبز، اقتصاد چرخشی', 
          questionCount: 10, 
          slug: 'lesson13' 
        },
        { 
          id: 14, 
          name: 'درس چهارم: شهرهای پایدار', 
          description: 'شهرهای سبز، حمل و نقل پایدار، معماری سبز', 
          questionCount: 10, 
          slug: 'lesson14' 
        },
      ]
    },
    {
      id: 5,
      name: 'فصل پنجم: حفاظت از محیط زیست در ایران',
      icon: '🇮🇷',
      color: '#2196F3',
      examSlug: 'chapter5-exam',
      examName: 'آزمون جامع فصل پنجم: حفاظت از محیط زیست در ایران',
      examQuestionCount: 25,
      lessons: [
        { 
          id: 15, 
          name: 'درس اول: مناطق حفاظت شده ایران', 
          description: 'پارک‌های ملی، مناطق حفاظت شده، پناهگاه‌های حیات وحش', 
          questionCount: 12, 
          slug: 'lesson15' 
        },
        { 
          id: 16, 
          name: 'درس دوم: تنوع زیستی ایران', 
          description: 'گونه‌های گیاهی و جانوری نادر، زیست‌گاه‌های مهم', 
          questionCount: 10, 
          slug: 'lesson16' 
        },
        { 
          id: 17, 
          name: 'درس سوم: چالش‌های محیط زیستی ایران', 
          description: 'ریزگردها، خشک شدن تالاب‌ها، فرونشست زمین', 
          questionCount: 10, 
          slug: 'lesson17' 
        },
      ]
    },
    {
      id: 6,
      name: 'فصل ششم: آینده محیط زیست',
      icon: '🚀',
      color: '#9C27B0',
      examSlug: 'chapter6-exam',
      examName: 'آزمون جامع فصل ششم: آینده محیط زیست',
      examQuestionCount: 28,
      lessons: [
        { 
          id: 18, 
          name: 'درس اول: فناوری‌های سبز', 
          description: 'فناوری‌های پاک، نوآوری‌های سبز، شهرهای هوشمند', 
          questionCount: 12, 
          slug: 'lesson18' 
        },
        { 
          id: 19, 
          name: 'درس دوم: آموزش و فرهنگ زیست‌محیطی', 
          description: 'آموزش محیط زیست، نقش رسانه، مسئولیت اجتماعی', 
          questionCount: 10, 
          slug: 'lesson19' 
        },
        { 
          id: 20, 
          name: 'درس سوم: همکاری‌های بین‌المللی', 
          description: 'توافق‌های زیست‌محیطی، سازمان‌های بین‌المللی، توسعه همکاری', 
          questionCount: 10, 
          slug: 'lesson20' 
        },
      ]
    },
    {
      id: 7,
      name: '🎯 آزمون جامع کل کتاب انسان و محیط زیست',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب انسان و محیط زیست',
      examQuestionCount: 50,
      lessons: [
        { 
          id: 21, 
          name: '📚 کل دروس کتاب انسان و محیط زیست', 
          description: 'شامل تمام مباحث: محیط زیست و انسان، آلودگی‌ها، بحران‌های زیست‌محیطی، توسعه پایدار، حفاظت در ایران و آینده محیط زیست', 
          questionCount: 50, 
          slug: 'final-exam' 
        },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/yazdahom/ensani/ghalamchi/first-half/ensan-va-mohit-zist/lesson/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/ensani/ghalamchi/first-half/ensan-va-mohit-zist/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      {/* هدر */}
      <div style={styles.header}>
        <h1 style={styles.title}>📚 انسان و محیط زیست - انتخاب فصل و درس</h1>
        <p style={styles.subtitle}>برای شروع، روی هر فصل کلیک کنید و سپس درس یا آزمون جامع مورد نظر را انتخاب نمایید</p>
        
        {/* دکمه بازگشت - در وسط */}
        <div style={styles.backWrapper}>
          <Link href="/exam/yazdahom/ensani/gozine2/second-half" className="back-link">
            ← بازگشت به لیست دروس
          </Link>
        </div>
      </div>

      {/* فصل‌ها */}
      <div style={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <div key={chapter.id} style={styles.chapterWrapper}>
            {/* دکمه فصل */}
            <button
              onClick={() => handleChapterClick(chapter.id)}
              style={{
                ...styles.chapterButton,
                backgroundColor: openChapter === chapter.id ? chapter.color : '#4a5568',
              }}
            >
              <span style={styles.chapterIcon}>{chapter.icon}</span>
              <span style={styles.chapterName}>{chapter.name}</span>
              <span style={styles.chapterArrow}>{openChapter === chapter.id ? '▲' : '▼'}</span>
            </button>

            {/* درس‌ها و آزمون جامع فصل (فقط در صورت باز بودن نمایش داده می‌شود) */}
            {openChapter === chapter.id && (
              <div style={styles.lessonsContainer}>
                {/* آزمون جامع فصل */}
                <div
                  style={styles.chapterExamCard}
                  onClick={() => handleChapterExamClick(chapter.examSlug)}
                >
                  <div style={styles.chapterExamIcon}>🎯</div>
                  <div style={styles.lessonInfo}>
                    <h3 style={styles.chapterExamTitle}>{chapter.examName}</h3>
                    <p style={styles.lessonDescription}>آزمون جامع تمام دروس این فصل</p>
                    <div style={styles.lessonStats}>
                      <span style={styles.questionCount}>📝 {chapter.examQuestionCount} سوال</span>
                      <span style={styles.durationBadge}>⏱️ {Math.floor(chapter.examQuestionCount * 1.5)} دقیقه</span>
                    </div>
                  </div>
                  <div style={styles.examButton}>
                    شروع آزمون جامع →
                  </div>
                </div>

                {/* خط جداکننده */}
                <div style={styles.divider}>
                  <span style={styles.dividerText}>📖 دروس فصل</span>
                </div>

                {/* درس‌های فصل */}
                {chapter.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    style={styles.lessonCard}
                    onClick={() => handleLessonClick(lesson.slug)}
                  >
                    <div style={styles.lessonIcon}>📘</div>
                    <div style={styles.lessonInfo}>
                      <h3 style={styles.lessonName}>{lesson.name}</h3>
                      <p style={styles.lessonDescription}>{lesson.description}</p>
                      <div style={styles.lessonStats}>
                        <span style={styles.questionCount}>📝 {lesson.questionCount} سوال</span>
                      </div>
                    </div>
                    <div style={styles.lessonButton}>
                      شروع آزمون →
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* اطلاعات تکمیلی */}
      <div style={styles.infoBox}>
        <p>💡 نکته: برای شروع آزمون هر درس یا آزمون جامع فصل، روی آن کلیک کنید.</p>
        <p>📊 پس از اتمام هر آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
        <p>🏆 آزمون‌های جامع شامل سوالات ترکیبی از تمام دروس آن فصل می‌باشند.</p>
      </div>

      <style>{`
        .back-link {
          display: inline-block;
          background: #4a5568;
          color: white;
          padding: 0.6rem 1.5rem;
          border-radius: 2rem;
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .back-link:hover {
          background: #2d3748;
          transform: translateX(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
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
      `}</style>
    </div>
  );
}

// استایل‌ها
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
    background: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
    direction: 'rtl',
    fontFamily: "'Vazir', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  backWrapper: {
    marginTop: '1rem',
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#1a202c',
    margin: '0.5rem 0',
  },
  subtitle: {
    color: '#4a5568',
    fontSize: '1rem',
  },
  chaptersContainer: {
    maxWidth: '900px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  chapterWrapper: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: '1rem',
    overflow: 'hidden',
  },
  chapterButton: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1.2rem 1.5rem',
    border: 'none',
    color: 'white',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  chapterIcon: {
    fontSize: '1.5rem',
  },
  chapterName: {
    flex: 1,
    textAlign: 'right',
    marginRight: '1rem',
  },
  chapterArrow: {
    fontSize: '0.9rem',
  },
  lessonsContainer: {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.8rem',
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  chapterExamCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: '#e8f5e9',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    border: '1px solid #81c784',
  },
  chapterExamIcon: {
    fontSize: '2rem',
    marginRight: '1rem',
  },
  chapterExamTitle: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  divider: {
    textAlign: 'center',
    margin: '0.5rem 0',
    position: 'relative',
  },
  dividerText: {
    backgroundColor: '#f5f5f5',
    padding: '0.2rem 1rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    color: '#888',
  },
  lessonCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1rem',
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    cursor: 'pointer',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  lessonIcon: {
    fontSize: '1.8rem',
    marginRight: '1rem',
  },
  lessonInfo: {
    flex: 1,
  },
  lessonName: {
    margin: 0,
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#333',
  },
  lessonDescription: {
    margin: '0.25rem 0',
    fontSize: '0.75rem',
    color: '#666',
  },
  lessonStats: {
    marginTop: '0.25rem',
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  questionCount: {
    backgroundColor: '#f0f0f0',
    padding: '0.2rem 0.6rem',
    borderRadius: '1rem',
    fontSize: '0.7rem',
    color: '#555',
  },
  durationBadge: {
    backgroundColor: '#e3f2fd',
    padding: '0.2rem 0.6rem',
    borderRadius: '1rem',
    fontSize: '0.7rem',
    color: '#1565c0',
  },
  lessonButton: {
    backgroundColor: '#9C27B0',
    color: 'white',
    padding: '0.4rem 0.8rem',
    borderRadius: '2rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  examButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '0.4rem 0.8rem',
    borderRadius: '2rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  infoBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: '1rem',
    padding: '1rem',
    marginTop: '2rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: '#4a5568',
  },
};