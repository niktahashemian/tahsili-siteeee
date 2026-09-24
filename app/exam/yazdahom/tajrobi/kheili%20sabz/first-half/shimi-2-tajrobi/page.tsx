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

export default function Shimi2ChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  // ======================== ساختار فصل‌ها و درس‌های کتاب شیمی (2) یازدهم تجربی قلمچی ========================
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
        { 
          id: 1, 
          name: 'درس ۱-۱: الگوها و روندها در رفتار مواد و عناصر', 
          description: 'آرایش الکترونی، اوربیتال‌ها، اعداد کوانتومی و جایگاه عناصر در جدول تناوبی', 
          questionCount: 15, 
          slug: 'lesson1' 
        },
        { 
          id: 2, 
          name: 'درس ۱-۲: رفتار عناصرها و شعاع اتم', 
          description: 'انرژی یونش، الکترونگاتیوی، شعاع اتمی و یونی و روند تغییرات آن‌ها در جدول', 
          questionCount: 12, 
          slug: 'lesson2' 
        },
        { 
          id: 3, 
          name: 'درس ۱-۳: دنیای رنگی با عناصر دسته d', 
          description: 'عناصر واسطه، کاتیون‌های رنگی، شناسایی یون‌های آهن و ترکیبات رنگی', 
          questionCount: 10, 
          slug: 'lesson3' 
        },
        { 
          id: 4, 
          name: 'درس ۱-۴: عناصر به چه شکلی در طبیعت یافت می‌شوند؟', 
          description: 'فلزات آزاد، ترکیبات معدنی، استخراج فلزات و روش‌های جداسازی', 
          questionCount: 12, 
          slug: 'lesson4' 
        },
        { 
          id: 5, 
          name: 'درس ۱-۵: واکنش‌پذیری عناصرها', 
          description: 'سری واکنش‌پذیری فلزات، واکنش‌های خودبه‌خودی و استخراج فلزات', 
          questionCount: 12, 
          slug: 'lesson5' 
        },
        { 
          id: 6, 
          name: 'درس ۱-۶: شناسایی کاتیون‌های آهن در ترکیبات', 
          description: 'شناسایی یون‌های Fe²⁺ و Fe³⁺، رسوب‌های رنگی و واکنش‌های شناسایی', 
          questionCount: 12, 
          slug: 'lesson6' 
        },
        { 
          id: 7, 
          name: 'درس ۱-۷: جریان فلز بین محیط زیست و جامعه', 
          description: 'بازیافت فلزات، توسعه پایدار، ردپای کربن و چرخه فلزات در طبیعت', 
          questionCount: 12, 
          slug: 'lesson7' 
        },
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
        { 
          id: 8, 
          name: 'درس ۲-۱: مفهوم دما، گرما، انرژی', 
          description: 'مفهوم آنتالپی، تشخیص واکنش‌های گرماگیر و گرمازا و محاسبات مربوطه', 
          questionCount: 10, 
          slug: 'lesson8' 
        },
        { 
          id: 9, 
          name: 'درس ۲-۲: ظرفیت گرمایی و گرمایی ویژه', 
          description: 'قانون هس، آنتالپی استاندارد تشکیل، آنتالپی استاندارد سوختن و محاسبات', 
          questionCount: 12, 
          slug: 'lesson9' 
        },
        { 
          id: 10, 
          name: 'درس ۲-۳: جاری شدن انرژی گرمایی', 
          description: 'عوامل مؤثر بر سرعت واکنش، نظریه برخورد و انرژی فعال‌سازی', 
          questionCount: 8, 
          slug: 'lesson10' 
        },
        { 
          id: 11, 
          name: 'درس ۲-۴: ترموشیمی', 
          description: 'تأثیر دما، غلظت، سطح تماس و کاتالیزور بر سرعت واکنش‌ها', 
          questionCount: 8, 
          slug: 'lesson11' 
        },
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
        { 
          id: 12, 
          name: 'درس ۳-۱: الیاف و درشت مولکول‌ها و پلیمری شدن', 
          description: 'ساختار اتم کربن، ترکیب‌های آلی، گروه‌های عاملی و شناسایی آن‌ها', 
          questionCount: 12, 
          slug: 'lesson12' 
        },
        { 
          id: 13, 
          name: 'درس ۳-۲: پلی‌استرها', 
          description: 'تشکیل استر، هیدرولیز استر، پلی‌استرها و کاربردهای آن‌ها در صنعت نساجی', 
          questionCount: 10, 
          slug: 'lesson13' 
        },
        { 
          id: 14, 
          name: 'درس ۳-۳: پلی‌آمیدها', 
          description: 'پلی‌آمیدها، ساختار نایلون، الیاف مصنوعی و طبیعی و تفاوت آن‌ها', 
          questionCount: 8, 
          slug: 'lesson14' 
        },
      ]
    },
    {
      id: 4,
      name: '🏆 آزمون جامع کل کتاب شیمی (2)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب شیمی (2) پایه یازدهم تجربی',
      examQuestionCount: 50,
      lessons: [
        { 
          id: 15, 
          name: '📚 کل دروس کتاب شیمی (2)', 
          description: 'شامل تمام مباحث: ساختار اتم، جدول تناوبی، پیوند شیمیایی، ترمودینامیک، سینتیک، تعادل، اسید و باز، الکتروشیمی و شیمی آلی', 
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
    router.push(`/exam/yazdahom/tajrobi/kheili%20sabz/first-half/shimi-2-tajrobi/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/tajrobi/kheili%20sabz/first-half/shimi-2-tajrobi/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      {/* هدر */}
      <div style={styles.header}>
        <h1 style={styles.title}>📚 شیمی (2) - انتخاب فصل و درس</h1>
        <p style={styles.subtitle}>برای شروع، روی هر فصل کلیک کنید و سپس درس یا آزمون جامع مورد نظر را انتخاب نمایید</p>
        
        {/* دکمه بازگشت */}
        <div style={styles.backWrapper}>
          <Link href="/exam/yazdahom/tajrobi/kheili%20sabz/first-half" className="back-link">
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
                        <span style={styles.durationBadge}>⏱️ {Math.floor(lesson.questionCount * 1.5)} دقیقه</span>
                      </div>
                    </div>
                    <div style={{...styles.lessonButton, backgroundColor: chapter.color}}>
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
        <p>🧪 این آزمون‌ها مطابق با کتاب شیمی (۲) پایه یازدهم رشته تجربی طراحی شده‌اند.</p>
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
    fontSize: '0.8rem',
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
    padding: '1.5rem',
    marginTop: '2rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: '#4a5568',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
};