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

export default function ShimiTajrobiChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: مولکول‌ها در خدمت تندرستی',
      icon: '🧬',
      color: '#00897B',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: مولکول‌ها در خدمت تندرستی',
      examQuestionCount: 25,
      lessons: [
        { id: 1, name: 'درس ۱-۱: ویتامین‌ها و مواد معدنی', description: 'ویتامین‌های محلول در آب و چربی، نقش مواد معدنی در بدن', questionCount: 12, slug: 'lesson1' },
        { id: 2, name: 'درس ۱-۲: داروها و ترکیب‌های شیمیایی', description: 'داروهای مسکن، آنتی‌بیوتیک‌ها، ترکیب‌های شیمیایی دارویی', questionCount: 10, slug: 'lesson2' },
        { id: 3, name: 'درس ۱-۳: شیمی و تغذیه', description: 'کربوهیدرات‌ها، پروتئین‌ها، چربی‌ها و نقش آنها در بدن', questionCount: 10, slug: 'lesson3' },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: آسایش و رفاه در سایه شیمی',
      icon: '🏠',
      color: '#6D4C41',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: آسایش و رفاه در سایه شیمی',
      examQuestionCount: 28,
      lessons: [
        { id: 4, name: 'درس ۲-۱: مواد شیمیایی در زندگی روزمره', description: 'مواد شوینده، ضدعفونی‌کننده‌ها، ترکیب‌های مورد استفاده در خانه', questionCount: 12, slug: 'lesson4' },
        { id: 5, name: 'درس ۲-۲: پلیمرها و کاربردها', description: 'پلیمرهای طبیعی و مصنوعی، پلاستیک‌ها، الیاف و کاربردها', questionCount: 10, slug: 'lesson5' },
        { id: 6, name: 'درس ۲-۳: سرامیک‌ها و شیشه‌ها', description: 'سرامیک‌ها، شیشه‌ها، خواص و کاربردهای صنعتی', questionCount: 10, slug: 'lesson6' },
        { id: 7, name: 'درس ۲-۴: مواد مرکب و نانومواد', description: 'مواد مرکب، نانومواد، کاربردهای فناوری نانو', questionCount: 8, slug: 'lesson7' },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: شیمی جلوه‌ای از هنر، زیبایی و ماندگاری',
      icon: '🎨',
      color: '#AD1457',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: شیمی جلوه‌ای از هنر، زیبایی و ماندگاری',
      examQuestionCount: 30,
      lessons: [
        { id: 8, name: 'درس ۳-۱: رنگ‌ها و رنگدانه‌ها', description: 'رنگ‌های طبیعی و مصنوعی، رنگدانه‌ها، شیمی رنگ', questionCount: 12, slug: 'lesson8' },
        { id: 9, name: 'درس ۳-۲: مواد آرایشی و بهداشتی', description: 'ترکیب‌های شیمیایی در لوازم آرایشی، عطرها، مواد نگهدارنده', questionCount: 12, slug: 'lesson9' },
        { id: 10, name: 'درس ۳-۳: شیمی و هنر', description: 'رنگ‌های نقاشی، مواد حفاظت‌کننده آثار هنری، مرمت', questionCount: 10, slug: 'lesson10' },
        { id: 11, name: 'درس ۳-۴: شیمی و محیط زیست', description: 'آلاینده‌ها، اثرات زیست‌محیطی، شیمی سبز', questionCount: 8, slug: 'lesson11' },
      ]
    },
    {
      id: 4,
      name: 'فصل چهارم: شیمی در مسیر تولید و فناوری',
      icon: '⚗️',
      color: '#F57C00',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم: شیمی در مسیر تولید و فناوری',
      examQuestionCount: 25,
      lessons: [
        { id: 12, name: 'درس ۴-۱: مواد اولیه و فرآیندهای شیمیایی', description: 'مواد اولیه صنعتی، فرآیندهای تولید، کاتالیزورها', questionCount: 12, slug: 'lesson12' },
        { id: 13, name: 'درس ۴-۲: انرژی و سوخت‌ها', description: 'سوخت‌های فسیلی، انرژی‌های تجدیدپذیر، پیل‌های سوختی', questionCount: 10, slug: 'lesson13' },
        { id: 14, name: 'درس ۴-۳: مواد معدنی و فلزات', description: 'استخراج فلزات، آلیاژها، خواص و کاربردهای فلزات', questionCount: 10, slug: 'lesson14' },
      ]
    },
    {
      id: 5,
      name: '🏆 آزمون جامع کل کتاب شیمی ۳',
      icon: '🏆',
      color: '#D32F2F',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب شیمی ۳',
      examQuestionCount: 60,
      lessons: [
        { id: 15, name: '📚 کل دروس کتاب شیمی ۳', description: 'شامل تمام مباحث: شیمی و تندرستی، آسایش و رفاه، هنر و زیبایی، تولید و فناوری', questionCount: 60, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/davazdahom/tajrobi/gozine2/first-half/shimi-3-tajrobi/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/davazdahom/tajrobi/gozine2/first-half/shimi-3-tajrobi/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => router.push('/exam/davazdahom/tajrobi/gozine2/first-half')} style={styles.backButton}>
          ← بازگشت به لیست دروس
        </button>
        <h1 style={styles.title}>🧪 شیمی ۳ - پایه دوازدهم تجربی قلمچی</h1>
        <p style={styles.subtitle}>برای شروع، روی هر فصل کلیک کنید و سپس درس یا آزمون جامع مورد نظر را انتخاب نمایید</p>
      </div>

      <div style={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <div key={chapter.id} style={styles.chapterWrapper}>
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

            {openChapter === chapter.id && (
              <div style={styles.lessonsContainer}>
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
                  <div style={styles.examButton}>شروع آزمون جامع →</div>
                </div>

                <div style={styles.divider}>
                  <span style={styles.dividerText}>📖 دروس فصل</span>
                </div>

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
                    <div style={styles.lessonButton}>شروع آزمون →</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={styles.infoBox}>
        <p>💡 نکته: برای شروع آزمون هر درس یا آزمون جامع فصل، روی آن کلیک کنید.</p>
        <p>📊 پس از اتمام هر آزمون، درصد شما به همراه پاسخنامه تشریحی نمایش داده می‌شود.</p>
        <p>🏆 آزمون‌های جامع شامل سوالات ترکیبی از تمام دروس آن فصل می‌باشند.</p>
        <p>🧪 این آزمون‌ها مطابق با کتاب شیمی ۳ پایه دوازدهم رشته تجربی طراحی شده‌اند.</p>
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
      `}</style>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    padding: '2rem',
    backgroundColor: '#f0f4f8',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
    padding: '2rem',
    borderRadius: '1rem',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    color: '#333',
    border: 'none',
    padding: '0.5rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#00897B',
    margin: '0.5rem 0',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#555',
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
    backgroundColor: 'white',
    borderRadius: '1rem',
    overflow: 'hidden',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
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
    backgroundColor: '#f8f9fa',
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
    border: '2px solid #81c784',
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
    backgroundColor: '#e9ecef',
    padding: '0.2rem 1rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    color: '#6c757d',
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
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
    backgroundColor: '#9C27B0',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  examButton: {
    backgroundColor: '#4caf50',
    color: 'white',
    padding: '0.4rem 1rem',
    borderRadius: '2rem',
    fontSize: '0.75rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginTop: '2rem',
    maxWidth: '600px',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    color: '#555',
  },
};
