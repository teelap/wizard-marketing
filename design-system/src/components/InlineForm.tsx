import type { FormEventHandler } from 'react';

export interface InlineFormProps {
  /** Placeholder in the pill input. */
  placeholder?: string;
  /** Button label: an order ("Send it to me", "Join"). */
  buttonLabel?: string;
  /** Button colour. */
  buttonVariant?: 'red' | 'yellow' | 'ink';
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

/**
 * One-line email signup: a pill input with an inset shadow beside a button. Wraps to two lines on phones.
 */
export function InlineForm({ placeholder = 'Your best email', buttonLabel = 'Send it to me', buttonVariant = 'red', onSubmit }: InlineFormProps) {
  return (
    <form className="inline-form" onSubmit={onSubmit ?? (e => e.preventDefault())}>
      <input type="email" placeholder={placeholder} aria-label={placeholder} required />
      <button type="submit" className={buttonVariant === 'yellow' ? 'btn' : `btn btn-${buttonVariant}`}>{buttonLabel}</button>
    </form>
  );
}
