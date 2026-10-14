import { QuoteBlock } from 'jtw-schoolhouse';

export const Foreword = () => (
  <div style={{ background: 'var(--yellow)', padding: 32 }}>
    <QuoteBlock quote="I wish I’d written this book." cite="Marty Marion, thirty years positioning Fortune 100 brands, who wrote the foreword" />
  </div>
);
export const WithoutRecord = () => (
  <div style={{ background: 'var(--cream)', padding: 32 }}>
    <QuoteBlock record={false} quote="People don’t buy features. They buy dreams." cite="Jake Tlapek" />
  </div>
);
