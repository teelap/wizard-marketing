import { ReportCard } from 'jtw-schoolhouse';

export const Archademia = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}><div style={{ maxWidth: 460 }}>
    <ReportCard org="Archademia" name="Adam" color="yellow" tilt={-1.2}
      quote="Jake is everything we hoped for. We saw impressive results in a quicker time frame than expected." />
  </div></div>
);
export const KingdomAndCo = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}><div style={{ maxWidth: 460 }}>
    <ReportCard org="Kingdom & Co." name="Kyla" color="pink" tilt={0.8}
      quote="The most transparent experience I’ve had. Weekly updates. I recommend Jake to every company I know." />
  </div></div>
);
