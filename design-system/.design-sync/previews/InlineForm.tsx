import { InlineForm } from 'jtw-schoolhouse';

export const Newsletter = () => (
  <div style={{ background: 'var(--paper)', padding: 24 }}><InlineForm /></div>
);
export const OnYellow = () => (
  <div style={{ background: 'var(--yellow)', padding: 24 }}><InlineForm buttonLabel="Join" buttonVariant="ink" placeholder="Your email" /></div>
);
