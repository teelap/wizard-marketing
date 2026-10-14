export interface StripesProps {
  /** 31px band instead of 53px. */
  thin?: boolean;
}

/**
 * Full-width horizontal rainbow band (nine stripes between ink rules) used as a section divider.
 */
export function Stripes({ thin }: StripesProps) {
  return <div className={thin ? 'stripes stripes--thin' : 'stripes'} aria-hidden="true" />;
}
