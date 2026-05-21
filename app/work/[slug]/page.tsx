export default async function CaseStudyPage(props: PageProps<"/work/[slug]">) {
  await props.params;
  return <main />;
}
