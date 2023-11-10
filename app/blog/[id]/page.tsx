import InterviewCard from "@/components/interview-card";
import SectionHeading from "@/components/section-heading";
import { db, getDoc, doc } from "@/firebase/firebase";
import { Chip } from "@nextui-org/chip";
import moment from "moment";
import CustomMarkdown from "@/components/custom-markdown";
import Newsletter from "@/components/newsletter";
import PlayArticle from "@/components/play-article";
import AddComment from "@/components/add-comment";
import ArticleShare from "@/components/article-share";
import { Divider } from "@nextui-org/divider";
import Article from "@/components/article";

const getArticle = async (articleID: string) => {
  const docRef = doc(db, "interview-experiences", articleID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) return docSnap.data();

  return null;
};

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticle(params.id);

  return (
    <main className="flex flex-col items-center w-full gap-10">
      <SectionHeading
        text="interview experience for"
        highlightedText={article?.company}
      />

      <div className="flex flex-row items-center justify-center gap-3 flex-wrap">
        <PlayArticle text={article?.content} />
        <ArticleShare articleUrl={`/blog/${params.id}`} />
      </div>

      <section className="flex flex-row items-start justify-center gap-10 flex-wrap w-full">
        <Article
          selected={article?.selected}
          mode={article?.mode}
          rounds={article?.rounds}
          interviewDate={article?.interviewDate}
          content={article?.content}
        />

        <div>
          <InterviewCard
            id={article?.id}
            company={article?.company}
            position={article?.position}
            difficulty={article?.difficulty}
            overview={article?.overview}
            publishedDate={article?.publishedDate}
            author={article?.author}
            content={article?.content}
            isRoute={false}
            isHoverable={false}
            isPressable={false}
          />

          <AddComment articleID={params.id} comments={article?.comments} />
        </div>
      </section>

      <Divider />

      <Newsletter />
    </main>
  );
}
