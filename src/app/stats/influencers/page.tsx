import StatPage from '@/components/StatPage';

export default function InfluencersPage() {
  return (
    <StatPage 
      number="793"
      title="Active TikTok Influencers"
      description="Growing community of content creators leveraging blockchain technology to monetize their influence."
      color="from-brand-cyan to-white"
      metrics={[
        {
          label: "Growth Rate",
          value: "45%",
          subtext: "Monthly increase"
        },
        {
          label: "Average Followers",
          value: "2.5M",
          subtext: "Per influencer"
        },
        {
          label: "Engagement Rate",
          value: "85%",
          subtext: "Platform average"
        }
      ]}
    />
  );
} 