import { FaqList } from 'jtw-schoolhouse';

export const MastermindQuestions = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}>
    <FaqList openFirst items={[
      { q: 'Is there an application?', a: 'No. Anyone can join the free tier. Membership is $500 a month with a 7-day free trial.' },
      { q: 'When are the calls?', a: 'Tuesdays and Thursdays at 11am Arizona time.' },
      { q: 'Can I cancel?', a: 'Yes, any time, from your account.' },
    ]} />
  </div>
);
