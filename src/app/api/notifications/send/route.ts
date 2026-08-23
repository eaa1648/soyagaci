import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { title, targetType, targetId } = await request.json();
    console.log(`Sending notification to ${targetType} [${targetId || 'ALL'}]: ${title}`);
    return NextResponse.json({ success: true, message: 'Bildirimler sıraya alındı.' });
  } catch {
    return NextResponse.json({ error: 'Bildirim gönderilemedi.' }, { status: 500 });
  }
}
