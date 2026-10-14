import { Checklist } from 'jtw-schoolhouse';

export const WhatsIncluded = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}>
    <Checklist items={[
      'Group consulting calls every Tuesday and Thursday',
      { text: 'Six course tracks', note: '96 lessons, self-paced' },
      'A members’ lounge and Jake on WhatsApp',
    ]} />
  </div>
);
