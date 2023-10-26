import UserProfile from "@/components/user-profile";
import SectionHeading from "@/components/section-heading";

import CustomDivider from "@/components/custom-divider";

export default function DocsPage({
  params,
}: {
  params: {
    email: string;
  };
}) {
  return (
    <main className="flex flex-col items-center justify-center">
      <SectionHeading text="all" highlightedText="interviews" />
      <section className="flex gap-5 flex-wrap items-center justify-evenly mt-10"></section>
    </main>
  );
}
