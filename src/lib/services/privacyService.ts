/**
 * Kademeli Mahremiyet, KVKK Koruma Kalkanı ve Belge Görünürlük Servisi
 */

export type UserRoleType = 'platform_admin' | 'family_admin' | 'verified_member' | 'guest';
export type DocumentVisibility = 'PRIVATE' | 'CORE_FAMILY' | 'PUBLIC_TREE';

export interface PrivacyContext {
  userId: string;
  userRole: UserRoleType;
  coreFamilyIds: string[]; // 1. Derece Yakınlar (Anne, Baba, Eş, Çocuklar)
}

export interface MaskedPersonView {
  id: string;
  displayName: string;
  years: string;
  isLiving: boolean;
  isMasked: boolean;
  canViewFullDetails: boolean;
  canViewPrivateDocs: boolean;
}

export class PrivacyService {
  /**
   * Yaşayan bireylerin hassas verilerini kullanıcının yakınlık derecesine göre maskeler.
   */
  public static maskPersonForViewer(
    person: { id: string; name: string; years: string; isLiving: boolean },
    viewerContext: PrivacyContext
  ): MaskedPersonView {
    // 1. Yönetici ise tüm verileri açık görsün
    if (viewerContext.userRole === 'platform_admin' || viewerContext.userRole === 'family_admin') {
      return {
        id: person.id,
        displayName: person.name,
        years: person.years,
        isLiving: person.isLiving,
        isMasked: false,
        canViewFullDetails: true,
        canViewPrivateDocs: true,
      };
    }

    // 2. Vefat etmiş aile büyükleri (Tarihi şahıslar) KVKK kapsamında herkese açıktır
    if (!person.isLiving) {
      return {
        id: person.id,
        displayName: person.name,
        years: person.years,
        isLiving: false,
        isMasked: false,
        canViewFullDetails: true,
        canViewPrivateDocs: viewerContext.userRole === 'verified_member',
      };
    }

    // 3. Yaşayan Birey: 1. Derece Çekirdek Aile kontrolü
    const isCoreRelative = viewerContext.coreFamilyIds.includes(person.id) || viewerContext.userId === person.id;
    if (isCoreRelative) {
      return {
        id: person.id,
        displayName: person.name,
        years: person.years,
        isLiving: true,
        isMasked: false,
        canViewFullDetails: true,
        canViewPrivateDocs: true,
      };
    }

    // 4. Uzak akraba veya misafir için yaşayan birey maskeleme kuralı
    const nameParts = person.name.split(' ');
    const maskedName = nameParts.map((p, i) => i === 0 ? p : `${p.charAt(0)}.`).join(' ');

    return {
      id: person.id,
      displayName: `${maskedName} (Yaşıyor)`,
      years: 'Gizli (Yaşayan Fert)',
      isLiving: true,
      isMasked: true,
      canViewFullDetails: false,
      canViewPrivateDocs: false,
    };
  }

  /**
   * Belge görünürlük seviyesini kontrol eder.
   */
  public static canViewDocument(
    docVisibility: DocumentVisibility,
    uploaderId: string,
    viewerContext: PrivacyContext
  ): boolean {
    if (viewerContext.userRole === 'platform_admin' || viewerContext.userRole === 'family_admin') {
      return true;
    }
    if (uploaderId === viewerContext.userId) {
      return true;
    }

    switch (docVisibility) {
      case 'PRIVATE':
        return false;
      case 'CORE_FAMILY':
        return viewerContext.coreFamilyIds.includes(uploaderId);
      case 'PUBLIC_TREE':
        return viewerContext.userRole === 'verified_member';
      default:
        return false;
    }
  }
}
