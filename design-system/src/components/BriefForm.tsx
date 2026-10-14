import type { FormEventHandler, ReactNode } from 'react';
import { cssVar, type Hue } from '../art';
import type { Style } from '../util';
import { Field, type FieldProps } from './Field';

export interface BriefFormProps {
  /** Header line in the display face. */
  title?: string;
  /** Small all-caps note on the header's right ("To: Jake"). */
  to?: string;
  /** Header band colour. */
  color?: Hue;
  /** The fields, top to bottom. Defaults to name, email and "What's broken?". */
  fields?: FieldProps[];
  /** Extra content after the fields (e.g. a CheckField opt-in). */
  children?: ReactNode;
  /** The send button's label: an order ("Send it", "Request the audit"). */
  submitLabel?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const DEFAULT_FIELDS: FieldProps[] = [
  { label: 'Who are you?', name: 'name', required: true },
  { label: 'Where do I reply?', type: 'email', name: 'email', required: true },
  { label: 'What’s broken? Give me specifics.', type: 'textarea', name: 'message', required: true },
];

/**
 * Contact form as a typed brief on a card: coloured header band, typewriter fields, full-width red send button.
 */
export function BriefForm({ title = 'Your brief', to = 'To: Jake', color = 'mint', fields = DEFAULT_FIELDS, children, submitLabel = 'Send it', onSubmit }: BriefFormProps) {
  return (
    <div className="brief card" style={{ '--c': cssVar(color), maxWidth: 560 } as Style}>
      <div className="brief-head">{title} <span>{to}</span></div>
      <form onSubmit={onSubmit ?? (e => e.preventDefault())}>
        {fields.map((f, i) => <Field key={i} {...f} />)}
        {children}
        <button type="submit" className="btn btn-red">{submitLabel}</button>
      </form>
    </div>
  );
}
