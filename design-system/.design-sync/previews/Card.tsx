import { Card, Display } from 'jtw-schoolhouse';

export const Plain = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}><Card><Display as="h3" size="sm">No contracts</Display><p>Cancel any time. Jake reads every message himself.</p></Card></div>
);
export const IndexCard = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}><Card variant="index"><Display as="h3" size="sm">The weekly truth</Display><p>One marketing truth a week. No spam, unsubscribe anytime.</p></Card></div>
);
export const LegalPad = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}><Card variant="legal"><Display as="h3" size="sm">The fine print</Display><p>Prices are on this page. No discovery-call maze.</p></Card></div>
);
export const StickyNote = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}><Card variant="sticky"><p>Strategy Sessions are 30 minutes for $400 or 60 minutes for $750.</p></Card></div>
);
