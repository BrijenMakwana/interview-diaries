export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="flex flex-col md:py-10">{children}</section>;
}
