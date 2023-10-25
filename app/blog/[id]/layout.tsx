export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="md:py-10">{children}</section>;
}
