import { VideoTable } from "@/components/dashboard/video-table";
import type { VideoRow } from "@/components/dashboard/video-table";
import { getVideoPerformance } from "@/lib/data";
import * as mock from "@/lib/mock/handlers";

export default async function VideosPage() {
  let raw;
  try {
    raw = await getVideoPerformance();
  } catch (e) {
    console.error("VideosPage data fetch failed, using mock:", e);
    raw = mock.getVideoPerformance();
  }

  const videos: VideoRow[] = raw.map((v) => ({
    videoId: v.videoId,
    title: v.title,
    views: v.views,
    clicks: v.clicks,
    conversions: v.conversions,
    earnings: v.earnings,
    postedDate: v.postedDate.toISOString(),
  }));

  return <VideoTable videos={videos} />;
}
