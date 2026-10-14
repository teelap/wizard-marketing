import { DataTable } from 'jtw-schoolhouse';

export const Objections = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}>
    <DataTable columns={['What they say', 'What they usually believe', 'What breaks it']} rows={[
      ['Too expensive', 'This will not work, so any price is wasted', 'Proof of the outcome, not a discount'],
      ['Let me think about it', 'If I pick wrong, I look stupid', 'Remove the personal risk of choosing'],
      ['We tried this before', 'This category does not work for businesses like mine', 'A case that matches their situation exactly'],
    ]} />
  </div>
);
