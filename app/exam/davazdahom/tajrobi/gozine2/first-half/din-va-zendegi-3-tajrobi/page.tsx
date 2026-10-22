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

export default function DinVaZendegi2ChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: هستی و خداشناسی',
      icon: '🕌',
      color: '#1A237E',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: هستی و خداشناسی',
      examQuestionCount: 25,
      lessons: [
        { id: 1, name: 'درس ۱-۱: شناخت خداوند', description: 'راه‌های خداشناسی، برهان نظم و برهان علّی', questionCount: 12, slug: 'lesson1' },
        { id: 2, name: 'درس ۱-۲: صفات خداوند', description: 'صفات جمالی و جلالی، اسماء و صفات الهی', questionCount: 15, slug: 'lesson2' },
        { id: 3, name: 'درس ۱-۳: توحید و شرک', description: 'انواع توحید، شرک و آثار آن در زندگی', questionCount: 10, slug: 'lesson3' },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: نبوت و امامت',
      icon: '📿',
      color: '#1565C0',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: نبوت و امامت',
      examQuestionCount: 28,
      lessons: [
        { id: 4, name: 'درس ۲-۱: ضرورت نبوت', description: 'حکمت و ضرورت بعثت پیامبران، ویژگی‌های پیامبران', questionCount: 12, slug: 'lesson4' },
        { id: 5, name: 'درس ۲-۲: عصمت پیامبران', description: 'عصمت انبیا، دلایل عصمت و نقش آن در هدایت', questionCount: 10, slug: 'lesson5' },
        { id: 6, name: 'درس ۲-۳: امامت و ولایت', description: 'ضرورت امامت، ویژگی‌های امام، امامت در قرآن', questionCount: 10, slug: 'lesson6' },
        { id: 7, name: 'درس ۲-۴: جایگاه و منزلت اهل بیت', description: 'مقام و منزلت اهل بیت علیهم السلام در قرآن و روایات', questionCount: 8, slug: 'lesson7' },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: معاد و آخرت‌شناسی',
      icon: '⭐',
      color: '#E65100',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: معاد و آخرت‌شناسی',
      examQuestionCount: 30,
      lessons: [
        { id: 8, name: 'درس ۳-۱: ضرورت و حقیقت معاد', description: 'دلایل عقلی و نقلی معاد، حقیقت مرگ و برزخ', questionCount: 15, slug: 'lesson8' },
        { id: 9, name: 'درس ۳-۲: قیامت و رستاخیز', description: 'شرایط و وقایع قیامت، حساب و کتاب اعمال', questionCount: 12, slug: 'lesson9' },
        { id: 10, name: 'درس ۳-۳: بهشت و جهنم', description: 'وصف بهشت و جهنم، نعمت‌های بهشتی و عذاب‌های جهنمی', questionCount: 10, slug: 'lesson10' },
      ]
    },
    {
      id: 4,
      name: 'فصل چهارم: اخلاق و سبک زندگی',
      icon: '🌿',
      color: '#4CAF50',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم: اخلاق و سبک زندگی',
      examQuestionCount: 25,
      lessons: [
        { id: 11, name: 'درس ۴-۱: اخلاق فردی', description: 'تزکیه نفس، خودسازی، مبارزه با رذایل اخلاقی', questionCount: 10, slug: 'lesson11' },
        { id: 12, name: 'درس ۴-۲: اخلاق اجتماعی', description: 'عدالت، احسان، نیکوکاری، حقوق دیگران و روابط اجتماعی', questionCount: 12, slug: 'lesson12' },
        { id: 13, name: 'درس ۴-۳: سبک زندگی اسلامی', description: 'اسلام و سبک زندگی، خانواده، اقتصاد، بهداشت و تغذیه در اسلام', questionCount: 10, slug: 'lesson13' },
      ]
    },
    {
      id: 5,
      name: '🏆 آزمون جامع کل کتاب دین و زندگی (2)',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب دین و زندگی (2)',
      examQuestionCount: 50,
      lessons: [
        { id: 14, name: '📚 کل دروس کتاب دین و زندگی (2)', description: 'شامل تمام مباحث: خداشناسی، نبوت و امامت، معاد و آخرت‌شناسی، اخلاق و سبک زندگی', questionCount: 50, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/davazdahom/tajrobi/gozine2/first-half/din-va-zendegi-3-tajrobi/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/davazdahom/tajrobi/gozine2/first-half/din-va-zendegi-3-tajrobi/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button onClick={() => router.push('/exam/davazdahom/tajrobi/gozine2/first-half')} style={styles.backButton}>
          ← بازگشت به لیست دروس
        </button>
        <h1 style={styles.title}>🕌 دین و زندگی (2) - پایه یازدهم ریاضی قلمچی</h1>
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
        <p>🕌 این آزمون‌ها مطابق با کتاب دین و زندگی (۲) پایه یازدهم رشته ریاضی طراحی شده‌اند.</p>
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
    color: '#1a237e',
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
