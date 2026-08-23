'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
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
import { getPersons, savePerson, PersonRecord } from '@/lib/services/personService';

interface TreeNodeData {
  id: string;
  name: string;
  years: string;
  job: string;
  generation: number;
  gender: 'male' | 'female';
  isLiving: boolean;
  hasAudio?: boolean;
  relationRole?: string;
  x: number;
  y: number;
  parents?: string[];
  spouseId?: string;
  children?: string[];
}

const KINSHIP_OPTIONS = [
  {
    group: 'Alt Kuşaklar (Evlat & Torun)',
    options: [
      { key: 'child_son', label: 'Oğlu (Erkek Çocuk)', genOffset: 1, gender: 'male' },
      { key: 'child_daughter', label: 'Kızı (Kız Çocuk)', genOffset: 1, gender: 'female' },
      { key: 'grandchild_son', label: 'Erkek Torunu', genOffset: 2, gender: 'male' },
      { key: 'grandchild_daughter', label: 'Kız Torunu', genOffset: 2, gender: 'female' },
      { key: 'nephew_male', label: 'Erkek Yeğeni', genOffset: 1, gender: 'male' },
      { key: 'nephew_female', label: 'Kız Yeğeni', genOffset: 1, gender: 'female' },
      { key: 'son_in_law', label: 'Damadı', genOffset: 1, gender: 'male' },
      { key: 'daughter_in_law', label: 'Gelini', genOffset: 1, gender: 'female' },
    ]
  },
  {
    group: 'Aynı Kuşak (Eş, Kardeş, Kuzen & Hısımlar)',
    options: [
      { key: 'spouse_female', label: 'Eşi (Hanımı)', genOffset: 0, gender: 'female' },
      { key: 'spouse_male', label: 'Eşi (Kocası)', genOffset: 0, gender: 'male' },
      { key: 'brother', label: 'Erkek Kardeşi / Ağabeyi', genOffset: 0, gender: 'male' },
      { key: 'sister', label: 'Kız Kardeşi / Ablası', genOffset: 0, gender: 'female' },
      { key: 'cousin_male', label: 'Erkek Kuzeni (Amca/Dayı/Hala/Teyze Oğlu)', genOffset: 0, gender: 'male' },
      { key: 'cousin_female', label: 'Kız Kuzeni (Amca/Dayı/Hala/Teyze Kızı)', genOffset: 0, gender: 'female' },
      { key: 'yenge', label: 'Yengesi', genOffset: 0, gender: 'female' },
      { key: 'eniste', label: 'Eniştesi', genOffset: 0, gender: 'male' },
      { key: 'bacanak', label: 'Bicanağı / Kayınbiraderi', genOffset: 0, gender: 'male' },
      { key: 'gorumce', label: 'Görümcesi / Baldızı / Eltisi', genOffset: 0, gender: 'female' },
    ]
  },
  {
    group: 'Yan Kollar (Amca, Dayı, Hala, Teyze)',
    options: [
      { key: 'uncle_pat', label: 'Amcası (Babanın Erkek Kardeşi)', genOffset: -1, gender: 'male' },
      { key: 'aunt_pat', label: 'Halası (Babanın Kız Kardeşi)', genOffset: -1, gender: 'female' },
      { key: 'uncle_mat', label: 'Dayısı (Annenin Erkek Kardeşi)', genOffset: -1, gender: 'male' },
      { key: 'aunt_mat', label: 'Teyzesi (Annenin Kız Kardeşi)', genOffset: -1, gender: 'female' },
    ]
  },
  {
    group: 'Üst Kuşaklar (Anne, Baba, Dede, Nine)',
    options: [
      { key: 'mother', label: 'Annesi', genOffset: -1, gender: 'female' },
      { key: 'father', label: 'Babası', genOffset: -1, gender: 'male' },
      { key: 'grandfather_pat', label: 'Büyükbabası / Dedesi (Baba Tarafı)', genOffset: -2, gender: 'male' },
      { key: 'grandmother_pat', label: 'Babaannesi', genOffset: -2, gender: 'female' },
      { key: 'grandfather_mat', label: 'Dedesi (Anne Tarafı)', genOffset: -2, gender: 'male' },
      { key: 'grandmother_mat', label: 'Anneannesi', genOffset: -2, gender: 'female' },
      { key: 'great_grandparent', label: 'Büyük Dede / Büyük Nine', genOffset: -3, gender: 'female' },
    ]
  }
];

const INITIAL_NODES: TreeNodeData[] = [
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
  const [treeData, setTreeData] = useState<TreeNodeData[]>(INITIAL_NODES);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 50, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(INITIAL_NODES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Add Relative Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPersonName, setNewPersonName] = useState('');
  const [newPersonJob, setNewPersonJob] = useState('');
  const [newPersonBirthYear, setNewPersonBirthYear] = useState('');
  const [newPersonBirthPlace, setNewPersonBirthPlace] = useState('Bursa');
  const [selectedKinshipKey, setSelectedKinshipKey] = useState(KINSHIP_OPTIONS[0].options[0].key);

  const containerRef = useRef<HTMLDivElement>(null);

  // Sync from person service on mount
  useEffect(() => {
    getPersons().then(persons => {
      if (persons && persons.length > INITIAL_NODES.length) {
        // Map any extra added persons to tree
        const extraNodes: TreeNodeData[] = persons.slice(INITIAL_NODES.length).map((p, idx) => ({
          id: p.id,
          name: p.name,
          years: p.years,
          job: p.job,
          generation: parseInt(p.generation) || 3,
          gender: 'male',
          isLiving: p.isLiving,
          x: 200 + (idx * 220),
          y: 580
        }));
        setTreeData([...INITIAL_NODES, ...extraNodes]);
      }
    });
  }, []);

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

  // Comprehensive Add Kinship Person Logic
  const handleAddPersonSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersonName.trim() || !selectedNode) return;

    let matchedOpt = KINSHIP_OPTIONS[0].options[0];
    for (const group of KINSHIP_OPTIONS) {
      const found = group.options.find(o => o.key === selectedKinshipKey);
      if (found) {
        matchedOpt = found;
        break;
      }
    }

    const calculatedGen = Math.max(1, selectedNode.generation + matchedOpt.genOffset);
    const targetY = 100 + ((calculatedGen - 1) * 240);
    
    // Spread horizontal position to avoid overlapping
    const countInSameGen = treeData.filter(n => n.generation === calculatedGen).length;
    const targetX = 180 + (countInSameGen * 230);

    const newId = `p-${Date.now()}`;
    const newTreeNode: TreeNodeData = {
      id: newId,
      name: newPersonName,
      years: newPersonBirthYear ? `${newPersonBirthYear} — Günümüz` : `${new Date().getFullYear()} — Günümüz`,
      job: newPersonJob || 'Aile Üyesi',
      generation: calculatedGen,
      gender: matchedOpt.gender as 'male' | 'female',
      isLiving: true,
      relationRole: matchedOpt.label,
      x: targetX,
      y: targetY,
    };

    setTreeData(prev => [...prev, newTreeNode]);
    setSelectedNode(newTreeNode);

    // Save to unified PersonService so it persists across entire app!
    const newPersonRecord: PersonRecord = {
      id: newId,
      name: newPersonName,
      title: `${matchedOpt.label} • ${calculatedGen}. Kuşak`,
      years: newTreeNode.years,
      job: newPersonJob || 'Aile Üyesi',
      birthPlace: newPersonBirthPlace,
      bloodType: 'A Rh (+)',
      nickname: newPersonName.split(' ')[0],
      generation: `${calculatedGen}. Kuşak`,
      branch: 'bursa',
      isLiving: true,
      hasAudio: false,
      biography: `${selectedNode.name} isimli aile büyüğümüzün ${matchedOpt.label.toLowerCase()} olarak soyağacına işlenmiştir.`,
      milestones: [
        { year: newPersonBirthYear || '2026', title: 'Doğum', desc: `${newPersonBirthPlace} doğumlu.`, tag: 'Doğum' }
      ],
      relatives: [
        { id: selectedNode.id, name: selectedNode.name, relation: 'Bağlı Olduğu Fert', years: selectedNode.years, badge: `${selectedNode.generation}. Kuşak` }
      ],
      photos: [],
      stories: [],
      audioTitle: '',
      audioDuration: ''
    };

    await savePerson(newPersonRecord);

    setShowAddModal(false);
    setNewPersonName('');
    setNewPersonJob('');
    setNewPersonBirthYear('');
  };

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
            placeholder="Ağaçta akraba ara (Dayı, Amca, Kuzen...)" 
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
          <span>Akraba Ekle</span>
        </button>

      </div>

      {/* 2. GENERATION TIERS (VERTICAL GUIDES) */}
      <div className={styles.generationGuides} style={{ transform: `translateY(${pan.y}px)` }}>
        <div className={styles.tierTag} style={{ top: `${100 * zoom}px` }}>1. Kuşak (Kökler & Büyükler)</div>
        <div className={styles.tierTag} style={{ top: `${340 * zoom}px` }}>2. Kuşak (Anne/Baba & Yan Kollar)</div>
        <div className={styles.tierTag} style={{ top: `${580 * zoom}px` }}>3. Kuşak (Torunlar & Kuzenler)</div>
      </div>

      {/* 3. INTERACTIVE SVG CONNECTING LINES & CANVAS */}
      <div 
        className={styles.canvasTransform}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        <svg className={styles.connectionsSvg} width="3200" height="2400">
          {/* Marriage connection (Mustafa & Ayşe) */}
          <path d="M 620 160 L 660 160" className={styles.marriageLine} />
          
          {/* Generation 1 to Generation 2 (Branching line) */}
          <path d="M 640 160 L 640 240 L 430 240 L 430 340" className={styles.lineageLine} />
          <path d="M 640 240 L 850 240 L 850 340" className={styles.lineageLine} />

          {/* Ali Yılmaz to Children (Ahmet & Elif) */}
          <path d="M 430 460 L 430 510 L 310 510 L 310 580" className={styles.lineageLine} />
          <path d="M 430 510 L 550 510 L 550 580" className={styles.lineageLine} />

          {/* Zeynep to Child (Can) */}
          <path d="M 850 460 L 850 580" className={styles.lineageLine} />
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
                {node.relationRole && (
                  <span style={{ fontSize: '0.66rem', color: 'var(--brand-primary)', fontWeight: 600 }}>
                    {node.relationRole.split(' ')[0]}
                  </span>
                )}
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

      {/* 6. COMPREHENSIVE ADD RELATIVE MODAL */}
      {showAddModal && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modalCard} style={{ maxWidth: '520px' }}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Soy Ağacına Akraba / Fert Ekle</h3>
              <button className={styles.modalCloseBtn} onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddPersonSubmit} className={styles.modalForm}>
              <div>
                <label className={styles.formLabel}>Bağlantı Kurulacak Seçili Kişi</label>
                <div className={styles.targetPersonPill}>
                  <strong>{selectedNode?.name || 'Mustafa Yılmaz'}</strong> ({selectedNode?.generation}. Kuşak)
                </div>
              </div>

              {/* Categorized Kinship Dropdown */}
              <div>
                <label className={styles.formLabel}>Akrabalık Bağı / Sülale Unvanı</label>
                <select 
                  value={selectedKinshipKey} 
                  onChange={(e) => setSelectedKinshipKey(e.target.value)}
                  className={styles.formSelect}
                  style={{ fontSize: '0.86rem', padding: '10px 12px' }}
                >
                  {KINSHIP_OPTIONS.map((grp, gIdx) => (
                    <optgroup key={gIdx} label={grp.group} style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      {grp.options.map(opt => (
                        <option key={opt.key} value={opt.key}>
                          {opt.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
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
                  <label className={styles.formLabel}>Doğum Yılı</label>
                  <input 
                    type="text" 
                    placeholder="Örn: 1982"
                    value={newPersonBirthYear}
                    onChange={(e) => setNewPersonBirthYear(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label className={styles.formLabel}>Meslek / Unvan</label>
                  <input 
                    type="text" 
                    placeholder="Örn: Avukat, Esnaf, Mimar..."
                    value={newPersonJob}
                    onChange={(e) => setNewPersonJob(e.target.value)}
                    className={styles.formInput}
                  />
                </div>

                <div>
                  <label className={styles.formLabel}>Doğum Yeri / Şehir</label>
                  <input 
                    type="text" 
                    placeholder="Örn: Bursa, İstanbul, İzmir..."
                    value={newPersonBirthPlace}
                    onChange={(e) => setNewPersonBirthPlace(e.target.value)}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.modalFooter} style={{ marginTop: '12px' }}>
                <button type="button" className={styles.modalCancelBtn} onClick={() => setShowAddModal(false)}>
                  İptal
                </button>
                <button type="submit" className={styles.modalSubmitBtn}>
                  Kaydet ve Ağaca Yerleştir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
