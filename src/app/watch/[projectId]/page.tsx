import StoryMode from "@/components/sections/StoryMode";

interface Props {
  params: Promise<{
    projectId: string;
  }>;
}

export default async function WatchPage({ params }: Props) {
  const { projectId } = await params;

  return <StoryMode projectId={projectId} />;
}