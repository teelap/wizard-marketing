import type { ReactNode } from 'react';

export interface DataTableProps {
  /** Header labels (rendered all-caps on a yellow band). */
  columns: string[];
  /** One array of cells per row. */
  rows: ReactNode[][];
}

/**
 * Table in a paper card: yellow all-caps header band, thick ink row rules. Scrolls sideways inside its own box on phones.
 */
export function DataTable({ columns, rows }: DataTableProps) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
