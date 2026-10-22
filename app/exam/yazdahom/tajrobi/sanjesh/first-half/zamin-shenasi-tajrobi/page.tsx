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

export default function JameeShenasi2ChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  // ======================== ساختار فصل‌ها و درس‌های کتاب جامعه‌شناسی (2) یازدهم انسانی ========================
  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: مبانی جامعه‌شناسی',
      icon: '👥',
      color: '#E91E63',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: مبانی جامعه‌شناسی',
      examQuestionCount: 25,
      lessons: [
        { 
          id: 1, 
          name: 'درس اول: جامعه‌شناسی چیست؟', 
          description: 'تعریف جامعه‌شناسی، موضوع و روش مطالعه، اهمیت جامعه‌شناسی', 
          questionCount: 12, 
          slug: 'lesson1' 
        },
        { 
          id: 2, 
          name: 'درس دوم: جامعه و فرهنگ', 
          description: 'تعریف جامعه، فرهنگ، ویژگی‌ها و اجزای فرهنگ', 
          questionCount: 10, 
          slug: 'lesson2' 
        },
        { 
          id: 3, 
          name: 'درس سوم: هویت و اجتماعی شدن', 
          description: 'فرایند جامعه‌پذیری، هویت فردی و اجتماعی، عوامل اجتماعی‌شدن', 
          questionCount: 10, 
          slug: 'lesson3' 
        },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: نهادهای اجتماعی',
      icon: '🏛️',
      color: '#4CAF50',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: نهادهای اجتماعی',
      examQuestionCount: 28,
      lessons: [
        { 
          id: 4, 
          name: 'درس اول: خانواده به عنوان نهاد اجتماعی', 
          description: 'تعریف خانواده، انواع خانواده، کارکردهای خانواده', 
          questionCount: 12, 
          slug: 'lesson4' 
        },
        { 
          id: 5, 
          name: 'درس دوم: آموزش و پرورش', 
          description: 'نقش آموزش در جامعه، آموزش رسمی و غیررسمی', 
          questionCount: 10, 
          slug: 'lesson5' 
        },
        { 
          id: 6, 
          name: 'درس سوم: دین و مذهب', 
          description: 'نقش دین در جامعه، انواع دین، کارکردهای دین', 
          questionCount: 10, 
          slug: 'lesson6' 
        },
        { 
          id: 7, 
          name: 'درس چهارم: اقتصاد و سیاست', 
          description: 'نهاد اقتصاد، نهاد سیاست، تعامل آنها', 
          questionCount: 8, 
          slug: 'lesson7' 
        },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: کنش‌ها و روابط اجتماعی',
      icon: '🤝',
      color: '#2196F3',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: کنش‌ها و روابط اجتماعی',
      examQuestionCount: 25,
      lessons: [
        { 
          id: 8, 
          name: 'درس اول: کنش متقابل اجتماعی', 
          description: 'تعریف کنش متقابل، انواع روابط اجتماعی، شبکه‌های اجتماعی', 
          questionCount: 12, 
          slug: 'lesson8' 
        },
        { 
          id: 9, 
          name: 'درس دوم: گروه‌ها و سازمان‌های اجتماعی', 
          description: 'انواع گروه‌های اجتماعی، سازمان‌های رسمی و غیررسمی', 
          questionCount: 10, 
          slug: 'lesson9' 
        },
        { 
          id: 10, 
          name: 'درس سوم: طبقه و نابرابری اجتماعی', 
          description: 'تعریف طبقه اجتماعی، انواع نابرابری، تحرک اجتماعی', 
          questionCount: 10, 
          slug: 'lesson10' 
        },
      ]
    },
    {
      id: 4,
      name: 'فصل چهارم: تغییرات و تحولات اجتماعی',
      icon: '🔄',
      color: '#FF9800',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم: تغییرات و تحولات اجتماعی',
      examQuestionCount: 30,
      lessons: [
        { 
          id: 11, 
          name: 'درس اول: نظریه‌های تغییر اجتماعی', 
          description: 'نظریه‌های تکاملی، مارکسیستی، کارکردگرایی و تضاد', 
          questionCount: 12, 
          slug: 'lesson11' 
        },
        { 
          id: 12, 
          name: 'درس دوم: عوامل تغییر اجتماعی', 
          description: 'عوامل درون‌زا و برون‌زا، فناوری، جمعیت، فرهنگ', 
          questionCount: 10, 
          slug: 'lesson12' 
        },
        { 
          id: 13, 
          name: 'درس سوم: توسعه و مدرنیزاسیون', 
          description: 'مفهوم توسعه، مدرنیزاسیون، توسعه پایدار', 
          questionCount: 10, 
          slug: 'lesson13' 
        },
        { 
          id: 14, 
          name: 'درس چهارم: جهانی‌سازی و پیامدها', 
          description: 'جهانی‌سازی، ابعاد فرهنگی، اقتصادی و سیاسی', 
          questionCount: 10, 
          slug: 'lesson14' 
        },
      ]
    },
    {
      id: 5,
      name: 'فصل پنجم: کنترل و انحراف اجتماعی',
      icon: '⚖️',
      color: '#9C27B0',
      examSlug: 'chapter5-exam',
      examName: 'آزمون جامع فصل پنجم: کنترل و انحراف اجتماعی',
      examQuestionCount: 25,
      lessons: [
        { 
          id: 15, 
          name: 'درس اول: هنجارها و ارزش‌های اجتماعی', 
          description: 'تعریف هنجار، ارزش، انواع هنجارها و کارکردها', 
          questionCount: 12, 
          slug: 'lesson15' 
        },
        { 
          id: 16, 
          name: 'درس دوم: انحراف اجتماعی', 
          description: 'تعریف انحراف، نظریه‌های انحراف، رفتارهای انحرافی', 
          questionCount: 10, 
          slug: 'lesson16' 
        },
        { 
          id: 17, 
          name: 'درس سوم: کنترل اجتماعی', 
          description: 'کنترل رسمی و غیررسمی، نقش نهادها در کنترل', 
          questionCount: 10, 
          slug: 'lesson17' 
        },
      ]
    },
    {
      id: 6,
      name: 'فصل ششم: روش‌های تحقیق در جامعه‌شناسی',
      icon: '🔬',
      color: '#00BCD4',
      examSlug: 'chapter6-exam',
      examName: 'آزمون جامع فصل ششم: روش‌های تحقیق در جامعه‌شناسی',
      examQuestionCount: 28,
      lessons: [
        { 
          id: 18, 
          name: 'درس اول: مبانی روش‌شناسی', 
          description: 'روش علمی، روش‌های تحقیق کمی و کیفی', 
          questionCount: 12, 
          slug: 'lesson18' 
        },
        { 
          id: 19, 
          name: 'درس دوم: روش‌های جمع‌آوری داده‌ها', 
          description: 'پرسشنامه، مصاحبه، مشاهده، اسناد و مدارک', 
          questionCount: 10, 
          slug: 'lesson19' 
        },
        { 
          id: 20, 
          name: 'درس سوم: تحلیل و تفسیر داده‌ها', 
          description: 'تحلیل کمی، تحلیل کیفی، تفسیر نتایج', 
          questionCount: 10, 
          slug: 'lesson20' 
        },
      ]
    },
    {
      id: 7,
      name: '🎯 آزمون جامع کل کتاب جامعه‌شناسی (2)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب جامعه‌شناسی (2)',
      examQuestionCount: 50,
      lessons: [
        { 
          id: 21, 
          name: '📚 کل دروس کتاب جامعه‌شناسی (2)', 
          description: 'شامل تمام مباحث: مبانی جامعه‌شناسی، نهادهای اجتماعی، کنش‌ها و روابط اجتماعی، تغییرات اجتماعی، کنترل و انحراف اجتماعی و روش‌های تحقیق', 
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
    router.push(`/exam/yazdahom/ensani/ghalamchi/first-half/jamee-shenasi-2/lesson/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/ensani/ghalamchi/first-half/jamee-shenasi-2/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      {/* هدر */}
      <div style={styles.header}>
        <h1 style={styles.title}>📚 جامعه‌شناسی (2) - انتخاب فصل و درس</h1>
        <p style={styles.subtitle}>برای شروع، روی هر فصل کلیک کنید و سپس درس یا آزمون جامع مورد نظر را انتخاب نمایید</p>
        
        {/* دکمه بازگشت - در وسط */}
        <div style={styles.backWrapper}>
          <Link href="/exam/yazdahom/ensani/gozine2/first-half" className="back-link">
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