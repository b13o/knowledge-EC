import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchBook, fetchBooks } from "@/lib/github";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import TableOfContents from "./_components/table-of-contents";
// import { checkAccessAndRedirect } from "@/lib/supabase/utils";

export async function generateStaticParams() {
  // すべての本を取得
  const books = await fetchBooks();

  // 全ての本の中の、全てのチャプターを取得
  const paramsPromises = books.map(async (book) => {
    const bookDetail = await fetchBook(book.id).catch(() => null);

    if (!bookDetail || !bookDetail.chapters) return [];

    return bookDetail.chapters.map((chapter) => ({
      bookSlug: book.id,
      chapterSlug: chapter.slug,
    }));
  });

  const nestedParams = await Promise.all(paramsPromises);
  return nestedParams.flat();
}

interface ChapterPageProps {
  params: Promise<{ bookSlug: string; chapterSlug: string }>;
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { bookSlug, chapterSlug } = await params;
  const book = await fetchBook(bookSlug);

  if (!book || !book.chapters) {
    notFound();
  }

  // if (book.isPaid) {
  //   await checkAccessAndRedirect(book.id, "book");
  // }

  // データ一覧から、現在のチャプターを探す
  const chapterIndex = book.chapters.findIndex(
    (chapter) => chapter.slug === chapterSlug
  );

  if (chapterIndex === -1) {
    notFound();
  }

  const chapter = book.chapters[chapterIndex];
  // 前後のチャプターを取得
  const prevChapter = chapterIndex > 0 ? book.chapters[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex < book.chapters.length - 1
      ? book.chapters[chapterIndex + 1]
      : null;

  return (
    <div className="min-h-screen flex bg-white">
      {/* サイドバー */}
      <aside className="hidden lg:block sticky top-[65px] h-[calc(100vh-65px)] w-80 bg-white border-r border-gray-100 z-10 overflow-y-auto">
        <TableOfContents
          chapters={book.chapters}
          currentSlug={chapterSlug}
          bookSlug={bookSlug}
        />
      </aside>

      {/* メインコンテンツ */}
      <main className="flex-1 min-w-0">
        <div className="w-full bg-slate-50 py-12">
          <div className="container mx-auto px-4 max-w-3xl">
            <div className="flex flex-col items-center text-center space-y-6">
              <Link
                href={`/books/${bookSlug}`}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                <span className="font-medium">{book.title}</span>
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                {chapter.title}
              </h1>
              <div className="text-gray-500">
                Chapter {chapterIndex + 1} of {book.chapters.length}
              </div>
            </div>
          </div>
        </div>

        {/* チャプター内容 */}
        <article className="container mx-auto px-4 py-12 max-w-3xl">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: chapter.content }}
          />
        </article>

        {/* 章間のナビゲーション */}
        <div className="container mx-auto px-4 py-8 max-w-3xl border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {prevChapter && (
              <Link
                href={`/books/${bookSlug}/${prevChapter?.slug || chapter.slug}`}
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-24! py-12 text-lg"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  前の章
                </Button>
              </Link>
            )}

            {nextChapter && (
              <Link
                href={`/books/${bookSlug}/${nextChapter?.slug || chapter.slug}`}
              >
                <Button
                  variant="outline"
                  className="w-full sm:w-auto px-24! py-12 text-lg"
                >
                  次の章
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
