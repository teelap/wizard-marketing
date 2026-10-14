export interface PriceProps {
  /** The price as written on the site: "$400", "$2,000", "from $2,500". */
  amount: string;
  /** What it buys or how often: "30 min", "/mo". */
  unit?: string;
}

/**
 * Yellow price ticket, tilted 2°, with the amount in the display face and a small all-caps unit.
 */
export function Price({ amount, unit }: PriceProps) {
  return <span className="price">{amount}{unit && <small>{unit}</small>}</span>;
}
