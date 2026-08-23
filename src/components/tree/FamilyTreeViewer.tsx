'use client';

import React, { useState, useRef, useCallback } from 'react';
import styles from './FamilyTreeViewer.module.css';
import Link from 'next/link';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Search, 
  Download, 
  Plus, 
  X, 
  ArrowUpRight,
  Sparkles,
  Volume2
} from 'lucide-react';

interface TreeNodeData {
  id: string;
  name: string;
  years: string;
  job: string;
  generation: number;
  gender: 'male' | 'female';
  isLiving: boolean;
  hasAudio?: boolean;
  x: number;
  y: number;
  parents?: string[];
  spouseId?: string;
  children?: string[];
}

const INITIAL_TREE_DATA: TreeNodeData[] = [
  // 1. Kuşak (Kök)
  {
    id: '1',
    name: 'Mustafa Yılmaz',
    years: '1940 — 2012',
    job: 'Başöğretmen',
    generation: 1,
    gender: 'male',
    isLiving: false,
    hasAudio: true,
    spouseId: '2',
    children: ['3', '4'],
    x: 400,
    y: 100,
  },
  {
    id: '2',
    name: 'Ayşe Yılmaz (Demir)',
    years: '1945 — Günümüz',
    job: 'Emekli Terzi',
    generation: 1,
    gender: 'female',
    isLiving: true,
    hasAudio: true,
    spouseId: '1',
    children: ['3', '4'],
    x: 660,
    y: 100,
  },
  // 2. Kuşak (Çocuklar)
  {
    id: '3',
    name: 'Ali Yılmaz',
    years: '1970 — Günümüz',
    job: 'İnşaat Mühendisi',
    generation: 2,
    gender: 'male',
    isLiving: true,
    hasAudio: true,
    parents: ['1', '2'],
    children: ['5', '6'],
    x: 320,
    y: 340,
  },
  {
    id: '4',
    name: 'Zeynep Yılmaz (Kaya)',
    years: '1975 — Günümüz',
    job: 'Mimar & Öğretim Görevlisi',
    generation: 2,
    gender: 'female',
    isLiving: true,
    parents: ['1', '2'],
    children: ['7'],
    x: 740,
    y: 340,
  },
  // 3. Kuşak (Torunlar)
  {
    id: '5',
    name: 'Ahmet Yılmaz',
    years: '1998 — Günümüz',
    job: 'Yazılım Mühendisi',
    generation: 3,
    gender: 'male',
    isLiving: true,
    parents: ['3'],
    x: 200,
    y: 580,
  },
  {
    id: '6',
    name: 'Elif Yılmaz',
    years: '2004 — Günümüz',
    job: 'Grafik Tasarım',
    generation: 3,
    gender: 'female',
    isLiving: true,
    parents: ['3'],
    x: 440,
    y: 580,
  },
  {
    id: '7',
    name: 'Can Kaya',
    years: '2008 — Günümüz',
    job: 'Lise Öğrencisi',
    generation: 3,
    gender: 'male',
    isLiving: true,
    parents: ['4'],
    x: 740,
    y: 580,
  },
];

export function FamilyTreeViewer() {
  const [treeData, setTreeData] = useState<TreeNodeData[]>(INITIAL_TREE_DATA);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 50, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(INITIAL_TREE_DATA[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add Relative Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonJob, setNewPersonJob] = useState('');
  const [newPersonGender, setNewPersonGender] = useState<'male' | 'female'>('male');
  const [newPersonRelation, setNewPersonRelation] = useState<'child' | 'spouse' | 'sibling'>('child');

  const containerRef = useRef<HTMLDivElement>(null);

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.nodeCard}`) || 
        (e.target as HTMLElement).closest(`.${styles.toolbar}`) ||
        (e.target as HTMLElement).closest(`.${styles.drawer}`)) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom(prev => Math.min(Math.max(prev * zoomFactor, 0.4), 2.2));
  }, []);

  const resetView = () => {
    setZoom(1);
    setPan({ x: 50, y: 30 });
  };

  // Add person logic
  const handleAddPersonSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersonName.trim() || !selectedNode) return;

    let targetX = selectedNode.x + 200;
    let targetY = selectedNode.y;
    let targetGen = selectedNode.generation;

    if (newPersonRelation === 'child') {
      targetGen = selectedNode.generation + 1;
      targetY = selectedNode.y + 240;
      targetX = selectedNode.x;
    } else if (newPersonRelation === 'spouse') {
      targetX = selectedNode.x + 260;
    }

    const newId = `p-${Date.now()}`;
    const newPerson: TreeNodeData = {
      id: newId,
      name: newPersonName,
      years: `${new Date().getFullYear()} — Günümüz`,
      job: newPersonJob || 'Aile Üyesi',
      generation: targetGen,
      gender: newPersonGender,
      isLiving: true,
      x: targetX,
      y: targetY,
    };

    setTreeData(prev => [...prev, newPerson]);
    setSelectedNode(newPerson);
    setShowAddModal(false);
    setNewPersonName('');
    setNewPersonJob('');
  };

  // Center node in view
  const centerNode = (node: TreeNodeData) => {
    setSelectedNode(node);
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const targetPanX = (rect.width / 2) - (node.x * zoom) - (110 * zoom);
    const targetPanY = (rect.height / 2) - (node.y * zoom) - (60 * zoom);
    setPan({ x: targetPanX, y: targetPanY });
  };

  const handleSearchSelect = (name: string) => {
    const found = treeData.find(n => n.name.toLowerCase().includes(name.toLowerCase()));
    if (found) {
      centerNode(found);
      setSearchQuery('');
    }
  };

  return (
    <div 
      className={styles.canvasWrapper} 
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      
      {/* 1. TOP TOOLBAR */}
      <div className={styles.toolbar}>
        
        {/* Search in tree */}
        <div className={styles.searchBox}>
          <Search size={14} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Ağaçta kişi ara..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchSelect(searchQuery)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.toolbarDivider} />

        {/* Zoom Controls */}
        <div className={styles.btnGroup}>
          <button className={styles.toolBtn} onClick={() => setZoom(z => Math.min(z + 0.15, 2.2))} title="Yakınlaştır">
            <ZoomIn size={16} />
          </button>
          <button className={styles.toolBtn} onClick={() => setZoom(z => Math.max(z - 0.15, 0.4))} title="Uzaklaştır">
            <ZoomOut size={16} />
          </button>
          <button className={styles.toolBtn} onClick={resetView} title="Merkeze Sıfırla">
            <RotateCcw size={15} />
          </button>
        </div>

        <div className={styles.toolbarDivider} />

        {/* Export and Add */}
        <button className={styles.toolBtn} onClick={() => alert('Yüksek çözünürlüklü SVG soyağacı şeması dışa aktarıldı.')} title="Şemayı İndir">
          <Download size={15} />
          <span className={styles.btnText}>Dışa Aktar</span>
        </button>

        <button className={styles.primaryToolBtn} onClick={() => setShowAddModal(true)}>
          <Plus size={15} strokeWidth={2.4} />
          <span>Kişi Ekle</span>
        </button>

      </div>

      {/* 2. GENERATION TIERS (VERTICAL GUIDES) */}
      <div className={styles.generationGuides} style={{ transform: `translateY(${pan.y}px)` }}>
        <div className={styles.tierTag} style={{ top: `${100 * zoom}px` }}>1. Kuşak (Kökler)</div>
        <div className={styles.tierTag} style={{ top: `${340 * zoom}px` }}>2. Kuşak (Evlatlar)</div>
        <div className={styles.tierTag} style={{ top: `${580 * zoom}px` }}>3. Kuşak (Torunlar)</div>
      </div>

      {/* 3. INTERACTIVE SVG CONNECTING LINES & CANVAS */}
      <div 
        className={styles.canvasTransform}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        <svg className={styles.connectionsSvg} width="2400" height="1800">
          
          {/* Marriage connection (Mustafa & Ayşe) */}
          <path 
            d="M 620 160 L 660 160" 
            className={styles.marriageLine}
          />
          
          {/* Generation 1 to Generation 2 (Branching line) */}
          <path 
            d="M 640 160 L 640 240 L 430 240 L 430 340" 
            className={styles.lineageLine}
          />
          <path 
            d="M 640 240 L 850 240 L 850 340" 
            className={styles.lineageLine}
          />

          {/* Ali Yılmaz to Children (Ahmet & Elif) */}
          <path 
            d="M 430 460 L 430 510 L 310 510 L 310 580" 
            className={styles.lineageLine}
          />
          <path 
            d="M 430 510 L 550 510 L 550 580" 
            className={styles.lineageLine}
          />

          {/* Zeynep to Child (Can) */}
          <path 
            d="M 850 460 L 850 580" 
            className={styles.lineageLine}
          />
        </svg>

        {/* 4. TREE NODES (CARDS) */}
        {treeData.map(node => {
          const isSelected = selectedNode?.id === node.id;
          return (
            <div
              key={node.id}
              className={`${styles.nodeCard} ${isSelected ? styles.nodeSelected : ''}`}
              style={{ left: `${node.x}px`, top: `${node.y}px` }}
              onClick={() => setSelectedNode(node)}
            >
              <div className={styles.nodeHeader}>
                <span className={styles.nodeGenBadge}>{node.generation}. Kuşak</span>
                {node.hasAudio && (
                  <span className={styles.nodeAudioIcon} title="Ses Hatırası Var">
                    <Volume2 size={11} />
                  </span>
                )}
                <span className={`${styles.nodeStatusDot} ${node.isLiving ? styles.nodeLiving : styles.nodeDeceased}`} />
              </div>

              <div className={styles.nodeBody}>
                <div className={styles.nodeAvatar}>
                  {node.name.charAt(0)}
                </div>
                <div className={styles.nodeInfo}>
                  <strong className={styles.nodeName}>{node.name}</strong>
                  <span className={styles.nodeJob}>{node.job}</span>
                  <span className={styles.nodeYears}>{node.years}</span>
                </div>
              </div>
            </div>
          );
        })}

      </div>

      {/* 5. SELECTED NODE INSPECTOR DRAWER */}
      {selectedNode && (
        <div className={styles.drawer}>
          <div className={styles.drawerHeader}>
            <span className={styles.drawerSubtitle}>{selectedNode.generation}. Kuşak Aile Bireyi</span>
            <button className={styles.drawerCloseBtn} onClick={() => setSelectedNode(null)}>
              <X size={16} />
            </button>
          </div>

          <div className={styles.drawerProfile}>
            <div className={styles.drawerAvatar}>
              {selectedNode.name.charAt(0)}
            </div>
            <div>
              <h3 className={styles.drawerName}>{selectedNode.name}</h3>
              <p className={styles.drawerJob}>{selectedNode.job}</p>
              <span className={styles.drawerYears}>{selectedNode.years}</span>
            </div>
          </div>

          <div className={styles.drawerActions}>
            <Link href={`/person/${selectedNode.id}`} className={styles.drawerPrimaryBtn}>
              <span>Tüm Profili Aç</span>
              <ArrowUpRight size={14} />
            </Link>
            
            <Link 
              href={`/ai-chat?q=${encodeURIComponent(`${selectedNode.name} hakkında arşivde ne kayıt var?`)}`} 
              className={styles.drawerSecondaryBtn}
            >
              <Sparkles size={14} />
              <span>Yapay Zekâya Sor</span>
            </Link>
          </div>
        </div>
      )}

      {/* 6. ADD PERSON MODAL */}
      {showAddModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalCard}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Soy Ağacına Yeni Birey Ekle</h3>
              <button className={styles.modalCloseBtn} onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPersonSubmit} className={styles.modalForm}>
              <div>
                <label className={styles.formLabel}>Bağlantı Kurulacak Kişi</label>
                <div className={styles.targetPersonPill}>
                  <strong>{selectedNode?.name || 'Mustafa Yılmaz'}</strong> ({selectedNode?.generation}. Kuşak)
                </div>
              </div>

              <div>
                <label className={styles.formLabel}>Akrabalık Bağı</label>
                <select 
                  value={newPersonRelation} 
                  onChange={(e) => setNewPersonRelation(e.target.value as 'child' | 'spouse' | 'sibling')}
                  className={styles.formSelect}
                >
                  <option value="child">Çocuğu Olarak Ekle (Alt Kuşak)</option>
                  <option value="spouse">Eşi Olarak Ekle (Aynı Kuşak)</option>
                  <option value="sibling">Kardeşi Olarak Ekle</option>
                </select>
              </div>

              <div>
                <label className={styles.formLabel}>Adı ve Soyadı</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Örn: Mehmet Yılmaz"
                  value={newPersonName}
                  onChange={(e) => setNewPersonName(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div>
                <label className={styles.formLabel}>Meslek / Unvan</label>
                <input 
                  type="text" 
                  placeholder="Örn: Doktor, Öğretmen..."
                  value={newPersonJob}
                  onChange={(e) => setNewPersonJob(e.target.value)}
                  className={styles.formInput}
                />
              </div>

              <div>
                <label className={styles.formLabel}>Cinsiyet</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={newPersonGender === 'male'} 
                      onChange={() => setNewPersonGender('male')} 
                    />
                    <span>Erkek</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <input 
                      type="radio" 
                      name="gender" 
                      checked={newPersonGender === 'female'} 
                      onChange={() => setNewPersonGender('female')} 
                    />
                    <span>Kadın</span>
                  </label>
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.modalCancelBtn} onClick={() => setShowAddModal(false)}>
                  İptal
                </button>
                <button type="submit" className={styles.modalSubmitBtn}>
                  Ağaca Yerleştir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
