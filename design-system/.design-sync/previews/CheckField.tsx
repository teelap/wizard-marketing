import { CheckField } from 'jtw-schoolhouse';

export const Checked = () => (
  <div style={{ background: 'var(--paper)', padding: 24 }}><CheckField label="Send me one marketing truth a week." defaultChecked /></div>
);
export const Unchecked = () => (
  <div style={{ background: 'var(--paper)', padding: 24 }}><CheckField label="Tell me when the audiobook is out." /></div>
);
