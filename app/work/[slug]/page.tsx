export function generateStaticParams() {
  return [];
}

export const dynamicParams = false;

export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  await props.params;
  return <main />;
}
