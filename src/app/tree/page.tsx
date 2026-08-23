import React from 'react';
import { FamilyTreeViewer } from '@/components/tree/FamilyTreeViewer';

export default function TreePage() {
  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <FamilyTreeViewer />
    </main>
  );
}
