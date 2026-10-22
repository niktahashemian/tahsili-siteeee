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

export default function Falsafe1ChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  // ======================== ساختار فصل‌ها و درس‌های کتاب فلسفه (1) یازدهم انسانی ========================
  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: چیستی فلسفه',
      icon: '🧠',
      color: '#3F51B5',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: چیستی فلسفه',
      examQuestionCount: 25,
      lessons: [
        { 
          id: 1, 
          name: 'درس اول: فلسفه چیست؟', 
          description: 'تعریف فلسفه، موضوع فلسفه، روش فلسفی، تفاوت با علوم دیگر', 
          questionCount: 12, 
          slug: 'lesson1' 
        },
        { 
          id: 2, 
          name: 'درس دوم: تاریخچه فلسفه', 
          description: 'فلسفه یونان باستان، فلسفه اسلامی، فلسفه جدید و معاصر', 
          questionCount: 10, 
          slug: 'lesson2' 
        },
        { 
          id: 3, 
          name: 'درس سوم: حوزه‌های فلسفه', 
          description: 'متافیزیک، معرفت‌شناسی، منطق، اخلاق، زیبایی‌شناسی', 
          questionCount: 10, 
          slug: 'lesson3' 
        },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: معرفت‌شناسی (شناخت‌شناسی)',
      icon: '🔍',
      color: '#4CAF50',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: معرفت‌شناسی (شناخت‌شناسی)',
      examQuestionCount: 28,
      lessons: [
        { 
          id: 4, 
          name: 'درس اول: منابع شناخت', 
          description: 'حس، عقل، تجربه، شهود، وحی و کشف به عنوان منابع شناخت', 
          questionCount: 12, 
          slug: 'lesson4' 
        },
        { 
          id: 5, 
          name: 'درس دوم: انواع شناخت', 
          description: 'شناخت حسی، شناخت عقلی، شناخت شهودی، شناخت تجربی', 
          questionCount: 10, 
          slug: 'lesson5' 
        },
        { 
          id: 6, 
          name: 'درس سوم: ملاک صدق و خطا', 
          description: 'نظریه مطابقت، نظریه انسجام، نظریه پراگماتیسم', 
          questionCount: 10, 
          slug: 'lesson6' 
        },
        { 
          id: 7, 
          name: 'درس چهارم: شک و یقین', 
          description: 'شک فلسفی، شک دکارتی، راه‌های رسیدن به یقین', 
          questionCount: 8, 
          slug: 'lesson7' 
        },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: متافیزیک (جهان‌شناسی فلسفی)',
      icon: '🌌',
      color: '#FF9800',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: متافیزیک (جهان‌شناسی فلسفی)',
      examQuestionCount: 25,
      lessons: [
        { 
          id: 8, 
          name: 'درس اول: وجود و هستی', 
          description: 'مفهوم وجود، موجود، انواع وجود (واجب، ممکن، ممتنع)', 
          questionCount: 12, 
          slug: 'lesson8' 
        },
        { 
          id: 9, 
          name: 'درس دوم: ماده و صورت', 
          description: 'مفهوم ماده و صورت در فلسفه ارسطو، پویایی و ایستایی', 
          questionCount: 10, 
          slug: 'lesson9' 
        },
        { 
          id: 10, 
          name: 'درس سوم: علیت و رابطه علّی', 
          description: 'تعریف علت، انواع علت، رابطه علّی و معلولی', 
          questionCount: 10, 
          slug: 'lesson10' 
        },
      ]
    },
    {
      id: 4,
      name: 'فصل چهارم: نفس‌شناسی (روان‌شناسی فلسفی)',
      icon: '🧘',
      color: '#E91E63',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم: نفس‌شناسی (روان‌شناسی فلسفی)',
      examQuestionCount: 30,
      lessons: [
        { 
          id: 11, 
          name: 'درس اول: چیستی نفس و روح', 
          description: 'تعریف نفس، رابطه نفس و بدن، دیدگاه‌های فلسفی در مورد نفس', 
          questionCount: 12, 
          slug: 'lesson11' 
        },
        { 
          id: 12, 
          name: 'درس دوم: قوای نفس', 
          description: 'قوای ادراکی، قوای تحریکی، قوای شهوی و غضبی', 
          questionCount: 10, 
          slug: 'lesson12' 
        },
        { 
          id: 13, 
          name: 'درس سوم: بقا و جاودانگی نفس', 
          description: 'براهین اثبات بقای نفس، تناسخ، معاد و آخرت', 
          questionCount: 10, 
          slug: 'lesson13' 
        },
        { 
          id: 14, 
          name: 'درس چهارم: رابطه نفس و بدن', 
          description: 'نظریه دوگانه‌گرایی، نظریه یگانه‌گرایی، تعامل نفس و بدن', 
          questionCount: 10, 
          slug: 'lesson14' 
        },
      ]
    },
    {
      id: 5,
      name: 'فصل پنجم: خداشناسی فلسفی',
      icon: '🕌',
      color: '#9C27B0',
      examSlug: 'chapter5-exam',
      examName: 'آزمون جامع فصل پنجم: خداشناسی فلسفی',
      examQuestionCount: 25,
      lessons: [
        { 
          id: 15, 
          name: 'درس اول: براهین اثبات خدا', 
          description: 'برهان نظم، برهان علیت، برهان امکان و وجوب، برهان فطرت', 
          questionCount: 12, 
          slug: 'lesson15' 
        },
        { 
          id: 16, 
          name: 'درس دوم: صفات خداوند', 
          description: 'صفات جمال و جلال، صفات ثبوتیه و سلبیه، اوصاف الهی', 
          questionCount: 10, 
          slug: 'lesson16' 
        },
        { 
          id: 17, 
          name: 'درس سوم: مساله شرور', 
          description: 'وجود شرور، عدل الهی، پاسخ‌های فلسفی به مساله شر', 
          questionCount: 10, 
          slug: 'lesson17' 
        },
      ]
    },
    {
      id: 6,
      name: 'فصل ششم: اخلاق فلسفی',
      icon: '⚖️',
      color: '#00BCD4',
      examSlug: 'chapter6-exam',
      examName: 'آزمون جامع فصل ششم: اخلاق فلسفی',
      examQuestionCount: 28,
      lessons: [
        { 
          id: 18, 
          name: 'درس اول: مبانی اخلاق', 
          description: 'تعریف اخلاق، حسن و قبح عقلی، نسبی‌گرایی و مطلق‌گرایی اخلاقی', 
          questionCount: 12, 
          slug: 'lesson18' 
        },
        { 
          id: 19, 
          name: 'درس دوم: نظریه‌های اخلاقی', 
          description: 'خودگروی، فایده‌گرایی، وظیفه‌گرایی، فضیلت‌گرایی', 
          questionCount: 10, 
          slug: 'lesson19' 
        },
        { 
          id: 20, 
          name: 'درس سوم: اخلاق و سعادت', 
          description: 'رابطه اخلاق و سعادت، فضایل اخلاقی، آرامش درون', 
          questionCount: 10, 
          slug: 'lesson20' 
        },
      ]
    },
    {
      id: 7,
      name: '🎯 آزمون جامع کل کتاب فلسفه (1)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب فلسفه (1)',
      examQuestionCount: 50,
      lessons: [
        { 
          id: 21, 
          name: '📚 کل دروس کتاب فلسفه (1)', 
          description: 'شامل تمام مباحث: چیستی فلسفه، معرفت‌شناسی، متافیزیک، نفس‌شناسی، خداشناسی فلسفی و اخلاق فلسفی', 
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
    router.push(`/exam/yazdahom/ensani/ghalamchi/first-half/falsafe-1/lesson/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/ensani/ghalamchi/first-half/falsafe-1/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      {/* هدر */}
      <div style={styles.header}>
        <h1 style={styles.title}>📚 فلسفه (1) - انتخاب فصل و درس</h1>
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