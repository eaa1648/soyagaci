'use client';

import React, { useState, useRef, useCallback } from 'react';
import styles from './FamilyTreeViewer.module.css';
import Link from 'next/link';

interface TreeNodeData {
  id: string;
  name: string;
  years: string;
  job: string;
  relation: string;
  generation: string;
  x: number;
  y: number;
  gender: 'male' | 'female';
  isLiving: boolean;
  avatarColor: string;
  photoCount: number;
  spouseId?: string;
  childrenIds?: string[];
}

const TREE_DATA: TreeNodeData[] = [
  // 1. Kuşak (Kökler)
  {
    id: '1',
    name: 'Mustafa Yılmaz',
    years: '1940 - 2012',
    job: 'Başöğretmen',
    relation: 'Büyük Dede (Kök)',
    generation: '1. Kuşak',
    x: 350,
    y: 120,
    gender: 'male',
    isLiving: false,
    avatarColor: '#f59e0b',
    photoCount: 34,
    spouseId: '2',
    childrenIds: ['3', '4']
  },
  {
    id: '2',
    name: 'Ayşe Yılmaz (Demir)',
    years: '1945 - Günümüz',
    job: 'Emekli Terzi',
    relation: 'Büyük Anne',
    generation: '1. Kuşak',
    x: 650,
    y: 120,
    gender: 'female',
    isLiving: true,
    avatarColor: '#10b981',
    photoCount: 48,
    spouseId: '1',
    childrenIds: ['3', '4']
  },

  // 2. Kuşak
  {
    id: '3',
    name: 'Ali Yılmaz',
    years: '1970 - Günümüz',
    job: 'Yüksek Mühendis',
    relation: 'Baba',
    generation: '2. Kuşak',
    x: 250,
    y: 380,
    gender: 'male',
    isLiving: true,
    avatarColor: '#6366f1',
    photoCount: 82,
    childrenIds: ['5', '6']
  },
  {
    id: '4',
    name: 'Zeynep Yılmaz (Kaya)',
    years: '1975 - Günümüz',
    job: 'Mimar & Araştırmacı',
    relation: 'Hala',
    generation: '2. Kuşak',
    x: 750,
    y: 380,
    gender: 'female',
    isLiving: true,
    avatarColor: '#ec4899',
    photoCount: 29,
    childrenIds: ['7']
  },

  // 3. Kuşak (Torunlar)
  {
    id: '5',
    name: 'Ahmet Yılmaz',
    years: '1998 - Günümüz',
    job: 'Yazılım Mühendisi',
    relation: 'Siz (Profil Sahibi)',
    generation: '3. Kuşak',
    x: 120,
    y: 640,
    gender: 'male',
    isLiving: true,
    avatarColor: '#06b6d4',
    photoCount: 115,
  },
  {
    id: '6',
    name: 'Elif Yılmaz',
    years: '2004 - Günümüz',
    job: 'Tıp Öğrencisi',
    relation: 'Kız Kardeş',
    generation: '3. Kuşak',
    x: 380,
    y: 640,
    gender: 'female',
    isLiving: true,
    avatarColor: '#a855f7',
    photoCount: 42,
  },
  {
    id: '7',
    name: 'Can Kaya',
    years: '2008 - Günümüz',
    job: 'Lise Öğrencisi',
    relation: 'Kuzen',
    generation: '3. Kuşak',
    x: 750,
    y: 640,
    gender: 'male',
    isLiving: true,
    avatarColor: '#f97316',
    photoCount: 19,
  },
];

export function FamilyTreeViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Canvas Viewport State
  const [scale, setScale] = useState(0.95);
  const [position, setPosition] = useState({ x: -100, y: -20 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null);
  const [filterGen, setFilterGen] = useState<string>('all');

  // Center on specific node
  const centerOnNode = useCallback((node: TreeNodeData) => {
    setSelectedNode(node);
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    setPosition({
      x: clientWidth / 2 - node.x * scale - 120,
      y: clientHeight / 2 - node.y * scale - 60,
    });
  }, [scale]);

  // Pan (Drag) Logic
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  // Zoom (Wheel)
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSensitivity = 0.0012;
    const delta = -e.deltaY * zoomSensitivity;
    const newScale = Math.min(Math.max(0.3, scale * Math.exp(delta)), 2.8);
    setScale(newScale);
  };

  // Search filter
  const searchResults = searchQuery
    ? TREE_DATA.filter(n => n.name.toLowerCase().includes(searchQuery.toLowerCase()) || n.job.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className={styles.viewerContainer}>
      
      {/* Top Floating Command Bar */}
      <div className={styles.topBar}>
        
        {/* Home & Breadcrumb */}
        <div className={styles.breadcrumbGroup}>
          <Link href="/" className={styles.homeBtn} title="Ana Sayfaya Dön">
            ← Ana Sayfa
          </Link>
          <div className={styles.treeTitlePill}>
            <span className={styles.pulseLive} />
            <strong>Yılmaz Âilesi Şecere-i Âzâmı</strong>
            <span className={styles.nodeCountBadge}>7 Kişi / 3 Kuşak</span>
          </div>
        </div>

        {/* Tree Search Bar */}
        <div className={styles.searchContainer}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Ağaçta kişi bul (örn: 'Mustafa', 'Elif')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          {searchResults.length > 0 && (
            <div className={styles.searchResultsDropdown}>
              {searchResults.map(result => (
                <div 
                  key={result.id} 
                  className={styles.searchResultItem}
                  onClick={() => { centerOnNode(result); setSearchQuery(''); }}
                >
                  <div className={styles.resultAvatar} style={{ background: result.avatarColor }}>
                    {result.name.charAt(0)}
                  </div>
                  <div>
                    <strong>{result.name}</strong>
                    <span>{result.relation} • {result.years}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filter Controls */}
        <div className={styles.filterGroup}>
          <button 
            className={`${styles.filterBtn} ${filterGen === 'all' ? styles.filterActive : ''}`}
            onClick={() => setFilterGen('all')}
          >
            Tüm Ağaç
          </button>
          <button 
            className={`${styles.filterBtn} ${filterGen === '1. Kuşak' ? styles.filterActive : ''}`}
            onClick={() => setFilterGen('1. Kuşak')}
          >
            1. Kuşak
          </button>
          <button 
            className={`${styles.filterBtn} ${filterGen === 'living' ? styles.filterActive : ''}`}
            onClick={() => setFilterGen('living')}
          >
            Yaşayanlar
          </button>
        </div>

      </div>

      {/* Floating Canvas Controls */}
      <div className={styles.controlsDock}>
        <div className={styles.zoomPill}>
          <button onClick={() => setScale(s => Math.min(s * 1.25, 2.5))} title="Yakınlaştır">+</button>
          <span>{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale(s => Math.max(s / 1.25, 0.3))} title="Uzaklaştır">-</button>
        </div>
        <button 
          className={styles.controlActionBtn} 
          onClick={() => { setScale(0.95); setPosition({ x: -100, y: -20 }); }}
          title="Merkeze Al"
        >
          🎯 Merkeze Al
        </button>
        <button 
          className={styles.controlActionBtn}
          onClick={() => alert('Soy ağacı yüksek çözünürlüklü PDF formatında indiriliyor...')}
          title="PDF Olarak Dışa Aktar"
        >
          📄 PDF İndir
        </button>
      </div>

      {/* Generation Level Markers (Left Side) */}
      <div className={styles.generationMarkers}>
        <div className={styles.genMarker} style={{ top: '15%' }}>
          <span className={styles.genBadge}>1. KUŞAK • KÖKLER</span>
          <span className={styles.genSub}>1940 - 1969 Dönemi</span>
        </div>
        <div className={styles.genMarker} style={{ top: '45%' }}>
          <span className={styles.genBadge}>2. KUŞAK • ÇOCUKLAR</span>
          <span className={styles.genSub}>1970 - 1995 Dönemi</span>
        </div>
        <div className={styles.genMarker} style={{ top: '75%' }}>
          <span className={styles.genBadge}>3. KUŞAK • TORUNLAR</span>
          <span className={styles.genSub}>1996 - Günümüz</span>
        </div>
      </div>

      {/* The Interactive Infinite Canvas */}
      <div 
        ref={containerRef}
        className={`${styles.canvas} ${isDragging ? styles.dragging : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
      >
        <div 
          className={styles.transformLayer}
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}
        >
          
          {/* Glowing SVG Connection Cables */}
          <svg className={styles.linesSvg}>
            
            {/* Evlilik Bağı (Mustafa & Ayşe) */}
            <line x1="470" y1="170" x2="650" y2="170" stroke="rgba(245, 158, 11, 0.7)" strokeWidth="3" strokeDasharray="6,4" />
            <circle cx="560" cy="170" r="10" fill="#0f172a" stroke="#f59e0b" strokeWidth="2" />
            <text x="554" y="174" fill="#f59e0b" fontSize="11">💍</text>

            {/* Kökten 2. Kuşağa İnen Ana Dal */}
            <path d="M 560 180 L 560 260" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="3" fill="none" />
            
            {/* 2. Kuşak Yatay Dağıtım Çizgisi */}
            <path d="M 370 260 L 870 260" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="3" fill="none" />
            
            {/* Ali ve Zeynep'e İnen Çizgiler */}
            <path d="M 370 260 L 370 380" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="3" fill="none" />
            <path d="M 870 260 L 870 380" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="3" fill="none" />

            {/* Ali'den 3. Kuşağa (Ahmet & Elif) */}
            <path d="M 370 460 L 370 530" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="3" fill="none" />
            <path d="M 240 530 L 500 530" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="3" fill="none" />
            <path d="M 240 530 L 240 640" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="3" fill="none" />
            <path d="M 500 530 L 500 640" stroke="rgba(99, 102, 241, 0.6)" strokeWidth="3" fill="none" />

            {/* Zeynep'ten Can'a */}
            <path d="M 870 460 L 870 640" stroke="rgba(236, 72, 153, 0.6)" strokeWidth="3" fill="none" />

          </svg>

          {/* Render Nodes */}
          {TREE_DATA.map(node => {
            const isMatch = filterGen === 'all' || 
              (filterGen === 'living' && node.isLiving) || 
              node.generation === filterGen;

            const isSelected = selectedNode?.id === node.id;

            return (
              <div 
                key={node.id} 
                className={`${styles.nodeWrapper} ${!isMatch ? styles.nodeDimmed : ''} ${isSelected ? styles.nodeSelected : ''}`}
                style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
                onClick={() => setSelectedNode(node)}
              >
                <div className={styles.treeCard}>
                  
                  {/* Generation Pill */}
                  <div className={styles.nodeHeaderRow}>
                    <span className={styles.nodeGenBadge}>{node.generation}</span>
                    {node.isLiving ? (
                      <span className={styles.livingIndicator} title="Yaşıyor" />
                    ) : (
                      <span className={styles.deceasedIcon} title="Mazi">🕊️</span>
                    )}
                  </div>

                  {/* Avatar & Info */}
                  <div className={styles.nodeContent}>
                    <div 
                      className={styles.nodeAvatar} 
                      style={{ 
                        borderColor: node.avatarColor,
                        boxShadow: `0 0 16px ${node.avatarColor}40`
                      }}
                    >
                      {node.name.charAt(0)}
                    </div>
                    
                    <div className={styles.nodeDetails}>
                      <h4 className={styles.nodeName}>{node.name}</h4>
                      <span className={styles.nodeRelation}>{node.relation}</span>
                      <span className={styles.nodeYears}>🗓️ {node.years}</span>
                      <span className={styles.nodeJob}>💼 {node.job}</span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className={styles.nodeCardFooter}>
                    <Link 
                      href={`/person/${node.id}`} 
                      className={styles.profileLinkBtn}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      Profili Gör →
                    </Link>
                    <span className={styles.photoCountTag}>📸 {node.photoCount}</span>
                  </div>

                </div>
              </div>
            );
          })}

        </div>
      </div>

      {/* Selected Node Inspector Drawer */}
      {selectedNode && (
        <div className={styles.inspectorDrawer}>
          <div className={styles.inspectorHeader}>
            <div className={styles.inspectorAvatar} style={{ background: selectedNode.avatarColor }}>
              {selectedNode.name.charAt(0)}
            </div>
            <div>
              <h3>{selectedNode.name}</h3>
              <span className={styles.inspectorRelation}>{selectedNode.relation} • {selectedNode.years}</span>
            </div>
            <button className={styles.inspectorClose} onClick={() => setSelectedNode(null)}>✕</button>
          </div>

          <div className={styles.inspectorBody}>
            <div className={styles.inspectorStatRow}>
              <div><strong>Meslek:</strong> {selectedNode.job}</div>
              <div><strong>Kuşak:</strong> {selectedNode.generation}</div>
              <div><strong>Durum:</strong> {selectedNode.isLiving ? 'Yaşıyor' : 'Vefat Etti (Rahmetli)'}</div>
              <div><strong>Fotoğraf & Belge:</strong> {selectedNode.photoCount} Adet</div>
            </div>

            <div className={styles.inspectorActions}>
              <Link href={`/person/${selectedNode.id}`} className={styles.inspectorPrimaryBtn}>
                Tam Profili & Anıları Aç
              </Link>
              <Link href={`/ai-chat?q=${encodeURIComponent(`${selectedNode.name} hakkında ne biliyorsun?`)}`} className={styles.inspectorAiBtn}>
                ✨ AI ile Sorgula
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
