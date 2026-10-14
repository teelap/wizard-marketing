import { BriefForm, CheckField } from 'jtw-schoolhouse';

export const ContactBrief = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}><BriefForm submitLabel="Send it" /></div>
);
export const AuditRequest = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}>
    <BriefForm title="Audit request" to="To: Jake" color="sky" submitLabel="Request the audit"
      fields={[
        { label: 'Company and website', name: 'company' },
        { label: 'Where do I reply?', type: 'email', name: 'email' },
        { label: 'What should the audit look at first?', type: 'textarea', rows: 3, name: 'focus' },
      ]}>
      <CheckField label="Send me one marketing truth a week." />
    </BriefForm>
  </div>
);
