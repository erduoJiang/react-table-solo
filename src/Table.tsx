import React, { useState } from 'react';
import type { TableProps, Column } from './types';

export default function Table<T = any>({
  data,
  columns,
  page = 1,
  pageSize = 10,
  onSortChange,
  onPageChange,
  renderRow,
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleHeaderClick = (col: Column<T>) => {
    if (!col.sortable) return;
    const newOrder = sortKey === col.key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(col.key);
    setSortOrder(newOrder);
    onSortChange?.(col.key, newOrder);
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = (a as any)[sortKey];
    const valB = (b as any)[sortKey];
    if (valA === valB) return 0;
    const result = valA > valB ? 1 : -1;
    return sortOrder === 'asc' ? result : -result;
  });

  const start = (page - 1) * pageSize;
  const displayData = sortedData.slice(start, start + pageSize);

  return (
    <table className="react-table" cellPadding={8} cellSpacing={0} border={1} style={{ borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{ cursor: col.sortable ? 'pointer' : 'default', width: col.width }}
              onClick={() => handleHeaderClick(col)}
            >
              {col.title}
              {col.sortable && (
                <span style={{ marginLeft: 4, fontSize: 12 }}>
                  {sortKey === col.key ? (sortOrder === 'asc' ? '▲' : '▼') : '⇅'}
                </span>
              )}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayData.map((record, idx) =>
          renderRow ? (
            <tr key={idx}>{renderRow(record)}</tr>
          ) : (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.key}>
                  {col.render
                    ? col.render((record as any)[col.key], record)
                    : (record as any)[col.key]}
                </td>
              ))}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}