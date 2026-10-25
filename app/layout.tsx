// import './globals.css';

// export const metadata: Metadata = {
//   title: 'انتخاب رشته تحصیلی',
//   description: 'سیستم انتخاب پایه و رشته',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="fa" dir="rtl">
//       <body suppressHydrationWarning>{children}</body>
//     </html>
//   );
// }
// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';
import Header from './component/header/page';
import Footer from './component/footer/page';


export const metadata: Metadata = {
  title: 'سایت آزمون های جامعه پرتو امید',
  description: 'آزمون های جامعه پرتو امید',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body suppressHydrationWarning>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}