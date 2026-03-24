import { VideoTable } from "@/components/dashboard/video-table";
import type { VideoRow } from "@/components/dashboard/video-table";
import { getVideoPerformance } from "@/lib/data";

export default function VideosPage() {
  const videos: VideoRow[] = getVideoPerformance().map((v) => ({
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
