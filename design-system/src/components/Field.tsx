import { useId } from 'react';

export interface FieldProps {
  /** The question, in Jake's voice: "Where do I reply?", "What's broken? Give me specifics." */
  label: string;
  type?: 'text' | 'email' | 'tel' | 'url' | 'textarea' | 'select';
  /** Options for `select`. */
  options?: string[];
  name?: string;
  required?: boolean;
  /** Rows for `textarea` (each row is a ruled line). */
  rows?: number;
  defaultValue?: string;
}

/**
 * Form field written like a typed form: all-caps label, typewriter input on a thick ink underline; textareas are ruled paper.
 */
export function Field({ label, type = 'text', options = [], name, required, rows = 4, defaultValue }: FieldProps) {
  const id = useId();
  let control;
  if (type === 'textarea') control = <textarea id={id} name={name} rows={rows} required={required} defaultValue={defaultValue} />;
  else if (type === 'select') control = <select id={id} name={name} required={required} defaultValue={defaultValue}>{options.map(o => <option key={o}>{o}</option>)}</select>;
  else control = <input id={id} type={type} name={name} required={required} defaultValue={defaultValue} />;
  return <label className="field" htmlFor={id}><span>{label}</span>{control}</label>;
}

export interface CheckFieldProps {
  /** The opt-in, plainly worded. */
  label: string;
  name?: string;
  defaultChecked?: boolean;
}

/**
 * Checkbox drawn as a square ink box that takes a red marker tick, with its label beside it.
 */
export function CheckField({ label, name, defaultChecked }: CheckFieldProps) {
  return <label className="check-field"><input type="checkbox" name={name} defaultChecked={defaultChecked} /><span>{label}</span></label>;
}
