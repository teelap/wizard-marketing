import { Field } from 'jtw-schoolhouse';

export const TextAndEmail = () => (
  <div style={{ background: 'var(--paper)', padding: 24 }}>
    <Field label="Who are you?" name="name" defaultValue="Dana from Brightside HVAC" />
    <Field label="Where do I reply?" type="email" name="email" />
  </div>
);
export const RuledTextarea = () => (
  <div style={{ background: 'var(--paper)', padding: 24 }}>
    <Field label="What’s broken? Give me specifics." type="textarea" rows={3} defaultValue="Leads stalled at 40 a month after we raised prices." />
  </div>
);
export const Select = () => (
  <div style={{ background: 'var(--paper)', padding: 24 }}>
    <Field label="What do you need?" type="select" options={['A Strategy Session', 'A Marketing Audit', 'A fractional CMO']} />
  </div>
);
