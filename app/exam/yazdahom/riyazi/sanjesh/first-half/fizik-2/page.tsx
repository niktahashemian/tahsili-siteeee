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

export default function Hesaban1ChaptersPage() {
  const router = useRouter();
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  // ======================== ساختار فصل‌ها و درس‌های کتاب فیزیک (2) ========================
  const chapters: Chapter[] = [
    {
      id: 1,
      name: 'فصل اول: الکتریسیتۀ ساکن',
      icon: '📐',
      color: '#9C27B0',
      examSlug: 'chapter1-exam',
      examName: 'آزمون جامع فصل اول: الکتریسیتۀ ساکن',
      examQuestionCount: 30,
      lessons: [
        { id: 1, name: 'درس اول: بار الکتریکی', description: 'حل معادله درجه دوم، دلتا، ریشه‌ها', questionCount: 15, slug: 'lesson1' },
        { id: 2, name: 'درس دوم: پایستگی و کوانتیده بودن بار الکتریکی', description: 'رسم سهمی، رأس، عرض از مبدأ', questionCount: 12, slug: 'lesson2' },
        { id: 3, name: 'درس سوم: قانون کولن', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson3' },
        { id: 4, name: 'درس چهارم: میدان الکتریکی', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson4' },
        { id: 5, name: 'درس پنجم: میدان الکتریکی حاصل از یک ذرۀ باردار', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson5' },
        { id: 6, name: 'درس ششم: خطوط میدان الکتریکی', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson6' },
        { id: 7, name: 'درس هفتم: انرژی پتانسیل الکتریکی', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson7' },
        { id: 8, name: 'درس هشتم: پتانسیل الکتریکی', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson8' },
        { id: 9, name: 'درس نهم: میدان الکتریکی در داخل رساناها', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson9' },
        { id: 10, name: 'درس دهم: خازن', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson10' },
        { id: 11, name: 'درس یازدهم: خازن با دیالکتریک', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson11' },
        { id: 12, name: 'درس دوازدهم: انرژی خازن', description: 'تعیین علامت عبارات جبری، نامعادله', questionCount: 10, slug: 'lesson12' },
      ]
    },
    {
      id: 2,
      name: 'فصل دوم: جریان الکتریکی و مدارهای جریان مستقیم ',
      icon: '📊',
      color: '#2196F3',
      examSlug: 'chapter2-exam',
      examName: 'آزمون جامع فصل دوم: جریان الکتریکی و مدارهای جریان مستقیم ',
      examQuestionCount: 28,
      lessons: [
        { id: 4, name: 'درس اول: جریان الکتریکی', description: 'تعریف تابع، دامنه و برد', questionCount: 10, slug: 'lesson13' },
        { id: 5, name: 'درس دوم: مقاومت الکتریکی و قانون اهم', description: 'نمودار توابع خطی و درجه دوم', questionCount: 12, slug: 'lesson14' },
        { id: 6, name: 'درس چهارم: عوامل مؤثر بر مقاومت الکتریکی', description: 'نقاط بحرانی، اکسترمم', questionCount: 8, slug: 'lesson15' },
        { id: 7, name: 'درس پنجم: نیروی محرکۀ الکتریکی و مدارها', description: 'نقاط بحرانی، اکسترمم', questionCount: 8, slug: 'lesson16' },
        { id: 8, name: 'درس ششم: توان در مدارهای الکتریکی', description: 'نقاط بحرانی، اکسترمم', questionCount: 8, slug: 'lesson17' },
        { id: 9, name: 'درس هفتم: ترکیب مقاومت‌ها', description: 'نقاط بحرانی، اکسترمم', questionCount: 8, slug: 'lesson18' },
      ]
    },
    {
      id: 3,
      name: 'فصل سوم: مغناطیس',
      icon: '📈',
      color: '#FF9800',
      examSlug: 'chapter3-exam',
      examName: 'آزمون جامع فصل سوم: مغناطیس',
      examQuestionCount: 32,
      lessons: [
        { id: 7, name: 'درس اول: مغناطیس و قطبهای مغناطیسی', description: 'ویژگی‌ها و نمودار تابع نمایی', questionCount: 12, slug: 'lesson19' },
        { id: 8, name: 'درس دوم: میدان مغناطیسی', description: 'تعریف لگاریتم، خواص لگاریتم', questionCount: 15, slug: 'lesson20' },
        { id: 9, name: 'درس سوم: نیروی مغناطیسی وارد بر ذرۀ باردار متحرک در میدان مغناطیسى', description: 'حل معادلات نمایی و لگاریتمی', questionCount: 10, slug: 'lesson21' },
        { id: 10, name: 'درس چهارم : نیروی مغناطیسی وارد بر سیم حامل جریان ', description: 'حل معادلات نمایی و لگاریتمی', questionCount: 10, slug: 'lesson22' },
        { id: 11, name: 'درس پنجم: میدان مغناطیسی حاصل از جریان الکتریکی', description: 'حل معادلات نمایی و لگاریتمی', questionCount: 10, slug: 'lesson23' },
        { id: 12, name: 'درس ششم: ویژگیهای مغناطیسی مواد', description: 'حل معادلات نمایی و لگاریتمی', questionCount: 10, slug: 'lesson24' },
      ]
    },
    {
      id: 4,
      name: 'فصل چهارم: القای الکترومغناطیسی و جریان متناوب ',
      icon: '🔺',
      color: '#4CAF50',
      examSlug: 'chapter4-exam',
      examName: 'آزمون جامع فصل چهارم: القای الکترومغناطیسی و جریان متناوب ',
      examQuestionCount: 28,
      lessons: [
        { id: 10, name: 'درس اول: پدیدۀ القای الکترومغناطیسی', description: 'نسبت‌های مثلثاتی، دایره واحد', questionCount: 12, slug: 'lesson25' },
        { id: 11, name: 'درس دوم: قانون القای الکترومغناطیسی فاراده', description: 'اتحادهای مثلثاتی', questionCount: 10, slug: 'lesson26' },
        { id: 12, name: 'درس سوم: قانون لنز', description: 'حل معادلات مثلثاتی', questionCount: 11, slug: 'lesson27' },
        { id: 13, name: 'درس چهارم: القاگرها', description: 'حل معادلات مثلثاتی', questionCount: 12, slug: 'lesson28' },
        { id: 14, name: 'درس پنجم: جریان متناوب', description: 'حل معادلات مثلثاتی', questionCount: 13, slug: 'lesson29' },
      ]
    },
    {
      id: 5,
      name: '🎯 آزمون جامع کل کتاب فیزیک (2) ',
      icon: '🏆',
      color: '#FF6B6B',
      examSlug: 'final-exam',
      examName: 'آزمون جامع کل کتاب فیزیک (2) ',
      examQuestionCount: 50,
      lessons: [
        { id: 22, name: '📚 کل دروس کتاب  فیزیک (2) ', description: 'شامل تمام مباحث', questionCount: 50, slug: 'final-exam' },
      ]
    }
  ];

  const handleChapterClick = (chapterId: number) => {
    setOpenChapter(openChapter === chapterId ? null : chapterId);
  };

  // *** اصلاح مسیرها با اضافه کردن yazdahom ***
  const handleLessonClick = (lessonSlug: string) => {
    router.push(`/exam/yazdahom/riyazi/sanjesh/first-half/fizik-2/${lessonSlug}`);
  };

  const handleChapterExamClick = (examSlug: string) => {
    router.push(`/exam/yazdahom/riyazi/sanjesh/first-half/fizik-2/chapter-exam/${examSlug}`);
  };

  return (
    <div style={styles.container}>
      {/* هدر */}
      <div className="exam-header">
        <Link href="/exam/yazdahom/riyazi/sanjesh/first-half" className="back-to-home">
          ← بازگشت به لیست دروس
        </Link>
       
      </div>
      <div style={styles.header}>
        <button onClick={() => router.back()} style={styles.backButton}>
          ← بازگشت به لیست دروس
        </button>
        
        <h1 style={styles.title}>📚 فیزیک (2) - انتخاب فصل و درس</h1>
        <p style={styles.subtitle}>برای شروع، روی هر فصل کلیک کنید و سپس درس یا آزمون جامع مورد نظر را انتخاب نمایید</p>
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

            {/* درس‌ها و آزمون جامع فصل */}
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
        .lesson-card:hover { transform: translateX(5px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .lesson-card:hover .lesson-button { background-color: #10b981; }
        .chapter-exam-card:hover { transform: translateX(5px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
        .chapter-exam-card:hover .exam-button { background-color: #10b981; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .lessons-container { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </div>
  );
}

// استایل‌ها (بدون تغییر)
const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: '100vh', padding: '2rem' },
  header: { textAlign: 'center', marginBottom: '2rem' },
  backButton: { backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', cursor: 'pointer', fontSize: '0.9rem', marginBottom: '1rem' },
  title: { fontSize: '2rem', color: 'black', margin: '0.5rem 0' },
  subtitle: { color: 'rgba(255,255,255,0.9)', fontSize: '1rem' },
  chaptersContainer: { maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' },
  chapterWrapper: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', overflow: 'hidden' },
  chapterButton: { width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem 1.5rem', border: 'none', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' },
  chapterIcon: { fontSize: '1.5rem' },
  chapterName: { flex: 1, textAlign: 'right', marginRight: '1rem' },
  chapterArrow: { fontSize: '0.9rem' },
  lessonsContainer: { padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', backgroundColor: 'rgba(255,255,255,0.95)' },
  chapterExamCard: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#e8f5e9', borderRadius: '0.75rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', border: '1px solid #81c784' },
  chapterExamIcon: { fontSize: '2rem', marginRight: '1rem' },
  chapterExamTitle: { margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#2e7d32' },
  divider: { textAlign: 'center', margin: '0.5rem 0', position: 'relative' },
  dividerText: { backgroundColor: '#f5f5f5', padding: '0.2rem 1rem', borderRadius: '1rem', fontSize: '0.75rem', color: '#888' },
  lessonCard: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', borderRadius: '0.75rem', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  lessonIcon: { fontSize: '1.8rem', marginRight: '1rem' },
  lessonInfo: { flex: 1 },
  lessonName: { margin: 0, fontSize: '1rem', fontWeight: 'bold', color: '#333' },
  lessonDescription: { margin: '0.25rem 0', fontSize: '0.75rem', color: '#666' },
  lessonStats: { marginTop: '0.25rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
  questionCount: { backgroundColor: '#f0f0f0', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#555' },
  durationBadge: { backgroundColor: '#e3f2fd', padding: '0.2rem 0.6rem', borderRadius: '1rem', fontSize: '0.7rem', color: '#1565c0' },
  lessonButton: { backgroundColor: '#9C27B0', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', transition: 'all 0.2s' },
  examButton: { backgroundColor: '#4caf50', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '2rem', fontSize: '0.75rem', fontWeight: 'bold', whiteSpace: 'nowrap', transition: 'all 0.2s' },
  infoBox: { backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '1rem', padding: '1rem', marginTop: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' },
};