import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/firebaseAdmin';

// Platform Admins can set custom user claims for roles
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { uid, role, familyId } = body;

    if (!uid || !role) {
      return NextResponse.json({ error: 'Eksik parametreler.' }, { status: 400 });
    }

    if (role !== 'platform_admin' && role !== 'family_admin' && role !== 'user') {
      return NextResponse.json({ error: 'Geçersiz rol.' }, { status: 400 });
    }

    const claims: Record<string, string> = { role };
    
    if (role === 'family_admin' && familyId) {
      claims.familyId = familyId;
    }

    await adminAuth.setCustomUserClaims(uid, claims);

    return NextResponse.json({ message: `Kullanıcıya başarıyla '${role}' yetkisi verildi.` });
  } catch (error: unknown) {
    console.error('Yetki verme hatası:', error);
    return NextResponse.json({ error: 'Yetki verme başarısız oldu.' }, { status: 500 });
  }
}
