export interface Column<T = any> {
    key: string;
    title: string;
    width?: number;
    sortable?: boolean;
    render?: (value: any, record: T) => React.ReactNode;
  }
  
  export interface TableProps<T = any> {
    data: T[];
    columns: Column<T>[];
    page?: number;
    pageSize?: number;
    onSortChange?: (key: string, order: 'asc' | 'desc') => void;
    onPageChange?: (page: number) => void;
    renderRow?: (record: T) => React.ReactNode;
  }