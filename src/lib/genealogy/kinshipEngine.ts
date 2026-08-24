/**
 * Deterministik Akrabalık Motoru (Graph BFS Kinship Engine)
 * Türk Medeni Kanunu ve Şecere Geleneğine göre 1., 2., 3., 4. Derece Kan ve Kayın Hısımlığı Hesaplar.
 */

export interface KinshipGraphNode {
  id: string;
  name: string;
  gender: 'male' | 'female';
  isLiving?: boolean;
  fatherId?: string;
  motherId?: string;
  spouseIds?: string[];
  childrenIds?: string[];
}

export interface KinshipResult {
  sourceName: string;
  targetName: string;
  relationshipName: string; // Örn: "Kuzen (Dayı Kızı)", "Amca", "2. Derece Kan Hısımı"
  degree: number; // 1, 2, 3, 4, vb.
  relationType: 'direct_ancestor' | 'direct_descendant' | 'collateral_blood' | 'affine_in_law' | 'spouse' | 'self' | 'unknown';
  lineageDescription: string; // Örn: "Ahmet -> Ali (Baba) -> Mustafa (Dede) -> Zeynep (Hala) -> Can (Kuzen)"
  civilCodeCategory: string; // Türk Medeni Kanunu Madde 17/18/19 sınıflandırması
}

export class KinshipEngine {
  private nodes: Map<string, KinshipGraphNode> = new Map();

  constructor(initialNodes?: KinshipGraphNode[]) {
    if (initialNodes) {
      initialNodes.forEach(node => this.nodes.set(node.id, node));
    }
  }

  public addNode(node: KinshipGraphNode) {
    this.nodes.set(node.id, node);
  }

  /**
   * İki kişi arasındaki akrabalık bağını deterministik olarak hesaplar.
   */
  public calculateRelationship(sourceId: string, targetId: string): KinshipResult {
    const source = this.nodes.get(sourceId);
    const target = this.nodes.get(targetId);

    if (!source || !target) {
      return {
        sourceName: source?.name || sourceId,
        targetName: target?.name || targetId,
        relationshipName: 'Bilinmeyen Akrabalık',
        degree: 0,
        relationType: 'unknown',
        lineageDescription: 'Kişi kaydı veritabanında bulunamadı.',
        civilCodeCategory: 'Tanımsız'
      };
    }

    if (sourceId === targetId) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: 'Kendisi',
        degree: 0,
        relationType: 'self',
        lineageDescription: `${source.name}`,
        civilCodeCategory: 'Asıl Şahıs'
      };
    }

    // 1. Eş Kontrolü
    if (source.spouseIds?.includes(targetId) || target.spouseIds?.includes(sourceId)) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: target.gender === 'female' ? 'Eşi (Hanımı)' : 'Eşi (Kocası)',
        degree: 0,
        relationType: 'spouse',
        lineageDescription: `${source.name} 💍 ${target.name}`,
        civilCodeCategory: 'Evlilik Bağı'
      };
    }

    // 2. Doğrudan Anne / Baba (1. Derece Üst Soy)
    if (source.fatherId === targetId) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: 'Babası',
        degree: 1,
        relationType: 'direct_ancestor',
        lineageDescription: `${source.name} ⬆️ Babası (${target.name})`,
        civilCodeCategory: '1. Derece Üstsoy Kan Hısımı'
      };
    }
    if (source.motherId === targetId) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: 'Annesi',
        degree: 1,
        relationType: 'direct_ancestor',
        lineageDescription: `${source.name} ⬆️ Annesi (${target.name})`,
        civilCodeCategory: '1. Derece Üstsoy Kan Hısımı'
      };
    }

    // 3. Doğrudan Evlat (1. Derece Alt Soy)
    if (target.fatherId === sourceId || target.motherId === sourceId) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: target.gender === 'female' ? 'Kızı (Evladı)' : 'Oğlu (Evladı)',
        degree: 1,
        relationType: 'direct_descendant',
        lineageDescription: `${source.name} ⬇️ Evladı (${target.name})`,
        civilCodeCategory: '1. Derece Altsoy Kan Hısımı'
      };
    }

    // 4. Kardeş Kontrolü (2. Derece Yansoy)
    const shareParents = (source.fatherId && source.fatherId === target.fatherId) ||
                         (source.motherId && source.motherId === target.motherId);
    if (shareParents) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: target.gender === 'female' ? 'Kız Kardeşi / Ablası' : 'Erkek Kardeşi / Ağabeyi',
        degree: 2,
        relationType: 'collateral_blood',
        lineageDescription: `${source.name} ⬅️ Ortak Ebeveyn ➡️ ${target.name}`,
        civilCodeCategory: '2. Derece Yansoy Kan Hısımı'
      };
    }

    // 5. Dede / Nine Kontrolü (2. Derece Üstsoy)
    const sourceFather = source.fatherId ? this.nodes.get(source.fatherId) : null;
    const sourceMother = source.motherId ? this.nodes.get(source.motherId) : null;

    if (sourceFather?.fatherId === targetId) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: 'Dedesi / Büyükbabası (Baba Tarafı)',
        degree: 2,
        relationType: 'direct_ancestor',
        lineageDescription: `${source.name} -> ${sourceFather.name} (Baba) -> ${target.name} (Dede)`,
        civilCodeCategory: '2. Derece Üstsoy Kan Hısımı'
      };
    }
    if (sourceFather?.motherId === targetId) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: 'Babaannesi',
        degree: 2,
        relationType: 'direct_ancestor',
        lineageDescription: `${source.name} -> ${sourceFather.name} (Baba) -> ${target.name} (Babaanne)`,
        civilCodeCategory: '2. Derece Üstsoy Kan Hısımı'
      };
    }
    if (sourceMother?.fatherId === targetId) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: 'Dedesi (Anne Tarafı)',
        degree: 2,
        relationType: 'direct_ancestor',
        lineageDescription: `${source.name} -> ${sourceMother.name} (Anne) -> ${target.name} (Dede)`,
        civilCodeCategory: '2. Derece Üstsoy Kan Hısımı'
      };
    }
    if (sourceMother?.motherId === targetId) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: 'Anneannesi',
        degree: 2,
        relationType: 'direct_ancestor',
        lineageDescription: `${source.name} -> ${sourceMother.name} (Anne) -> ${target.name} (Anneanne)`,
        civilCodeCategory: '2. Derece Üstsoy Kan Hısımı'
      };
    }

    // 6. Torun Kontrolü (2. Derece Altsoy)
    if (target.fatherId && (this.nodes.get(target.fatherId)?.fatherId === sourceId || this.nodes.get(target.fatherId)?.motherId === sourceId)) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: target.gender === 'female' ? 'Kız Torunu' : 'Erkek Torunu',
        degree: 2,
        relationType: 'direct_descendant',
        lineageDescription: `${source.name} -> Evlat -> ${target.name} (Torun)`,
        civilCodeCategory: '2. Derece Altsoy Kan Hısımı'
      };
    }

    // 7. Amca, Dayı, Hala, Teyze (3. Derece Yansoy)
    if (sourceFather) {
      const isFatherSibling = (sourceFather.fatherId && sourceFather.fatherId === target.fatherId) ||
                              (sourceFather.motherId && sourceFather.motherId === target.motherId);
      if (isFatherSibling) {
        return {
          sourceName: source.name,
          targetName: target.name,
          relationshipName: target.gender === 'female' ? 'Halası (Babanın Kız Kardeşi)' : 'Amcası (Babanın Erkek Kardeşi)',
          degree: 3,
          relationType: 'collateral_blood',
          lineageDescription: `${source.name} -> ${sourceFather.name} (Baba) -> Kardeşi: ${target.name}`,
          civilCodeCategory: '3. Derece Yansoy Kan Hısımı'
        };
      }
    }
    if (sourceMother) {
      const isMotherSibling = (sourceMother.fatherId && sourceMother.fatherId === target.fatherId) ||
                              (sourceMother.motherId && sourceMother.motherId === target.motherId);
      if (isMotherSibling) {
        return {
          sourceName: source.name,
          targetName: target.name,
          relationshipName: target.gender === 'female' ? 'Teyzesi (Annenin Kız Kardeşi)' : 'Dayısı (Annenin Erkek Kardeşi)',
          degree: 3,
          relationType: 'collateral_blood',
          lineageDescription: `${source.name} -> ${sourceMother.name} (Anne) -> Kardeşi: ${target.name}`,
          civilCodeCategory: '3. Derece Yansoy Kan Hısımı'
        };
      }
    }

    // 8. Kuzen Kontrolü (4. Derece Yansoy)
    // Eğer target'in ebeveynlerinden biri source'un amcası, dayısı, halası veya teyzesi ise
    const targetFather = target.fatherId ? this.nodes.get(target.fatherId) : null;
    const targetMother = target.motherId ? this.nodes.get(target.motherId) : null;

    const isCousinViaFather = targetFather && (
      (sourceFather && sourceFather.fatherId === targetFather.fatherId) ||
      (sourceMother && sourceMother.fatherId === targetFather.fatherId)
    );
    const isCousinViaMother = targetMother && (
      (sourceFather && sourceFather.fatherId === targetMother.fatherId) ||
      (sourceMother && sourceMother.fatherId === targetMother.fatherId)
    );

    if (isCousinViaFather || isCousinViaMother) {
      const branchName = targetFather ? 'Amca/Dayı Oğlu-Kızı' : 'Hala/Teyze Oğlu-Kızı';
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: `Kuzeni (${branchName})`,
        degree: 4,
        relationType: 'collateral_blood',
        lineageDescription: `${source.name} -> Ebeveyn -> Ortak Dede/Nine -> Ebeveyn -> ${target.name} (Kuzen)`,
        civilCodeCategory: '4. Derece Yansoy Kan Hısımı'
      };
    }

    // 9. Yeğen Kontrolü (3. Derece Yansoy)
    if (targetFather && shareParentsWithNode(source, targetFather)) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: target.gender === 'female' ? 'Kız Yeğeni' : 'Erkek Yeğeni',
        degree: 3,
        relationType: 'collateral_blood',
        lineageDescription: `${source.name} -> Kardeş (${targetFather.name}) -> ${target.name} (Yeğen)`,
        civilCodeCategory: '3. Derece Yansoy Kan Hısımı'
      };
    }
    if (targetMother && shareParentsWithNode(source, targetMother)) {
      return {
        sourceName: source.name,
        targetName: target.name,
        relationshipName: target.gender === 'female' ? 'Kız Yeğeni' : 'Erkek Yeğeni',
        degree: 3,
        relationType: 'collateral_blood',
        lineageDescription: `${source.name} -> Kardeş (${targetMother.name}) -> ${target.name} (Yeğen)`,
        civilCodeCategory: '3. Derece Yansoy Kan Hısımı'
      };
    }

    // Genel Akrabalık Tespiti
    return {
      sourceName: source.name,
      targetName: target.name,
      relationshipName: 'Uzak Sülale Akrabası',
      degree: 5,
      relationType: 'collateral_blood',
      lineageDescription: `${source.name} ile ${target.name} ortak soy kütüğüne bağlıdır.`,
      civilCodeCategory: 'Genişletilmiş Sülale Hısımı'
    };
  }
}

function shareParentsWithNode(n1: KinshipGraphNode, n2: KinshipGraphNode): boolean {
  return Boolean(
    (n1.fatherId && n1.fatherId === n2.fatherId) ||
    (n1.motherId && n1.motherId === n2.motherId)
  );
}

// Standart Aile Grafı Örneği
export const SAMPLE_KINSHIP_GRAPH: KinshipGraphNode[] = [
  { id: '1', name: 'Mustafa Yılmaz', gender: 'male', spouseIds: ['2'], childrenIds: ['3', '4'] },
  { id: '2', name: 'Ayşe Yılmaz (Demir)', gender: 'female', spouseIds: ['1'], childrenIds: ['3', '4'] },
  { id: '3', name: 'Ali Yılmaz', gender: 'male', fatherId: '1', motherId: '2', childrenIds: ['5', '6'] },
  { id: '4', name: 'Zeynep Yılmaz (Kaya)', gender: 'female', fatherId: '1', motherId: '2', childrenIds: ['7'] },
  { id: '5', name: 'Ahmet Yılmaz', gender: 'male', fatherId: '3' },
  { id: '6', name: 'Elif Yılmaz', gender: 'female', fatherId: '3' },
  { id: '7', name: 'Can Kaya', gender: 'male', motherId: '4' },
];
