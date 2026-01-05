import React, { useState } from 'react';
import Table from './Table';

interface User {
  id: number;
  name: string;
  age: number;
}

const columns = [
  { key: 'id', title: 'ID', width: 60, sortable: true },
  { key: 'name', title: '姓名' },
  { key: 'age', title: '年龄', sortable: true },
];

const mockData: User[] = Array.from({ length: 46 }, (_, i) => ({
  id: i + 1,
  name: `User-${i + 1}`,
  age: 18 + (i % 20),
}));

function App() {
  const [page, setPage] = useState(1);
  return (
    <div style={{ padding: 24 }}>
      <h2>React Table Solo</h2>
      <Table
        data={mockData}
        columns={columns}
        page={page}
        pageSize={8}
        onPageChange={setPage}
      />
      <div style={{ marginTop: 16 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <span style={{ margin: '0 8px' }}>{page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;