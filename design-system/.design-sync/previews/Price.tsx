import { Price } from 'jtw-schoolhouse';

export const Session = () => <div style={{ padding: 16 }}><Price amount="$400" unit="30 min" /></div>;
export const Monthly = () => <div style={{ padding: 16 }}><Price amount="from $2,500" unit="/mo" /></div>;
export const Audit = () => <div style={{ padding: 16 }}><Price amount="$2,000" unit="audit" /></div>;
