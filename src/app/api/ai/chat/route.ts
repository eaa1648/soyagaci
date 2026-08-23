import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt, familyTreeContext } = await request.json();
    
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({ 
      response: `[Gemini API]: "${prompt}" sorgunuz aile kütüğü üzerinden (${familyTreeContext || 'Yılmaz Hanedanı'}) analiz edildi.` 
    });

  } catch {
    return NextResponse.json({ error: 'AI servisi şu an kullanılamıyor.' }, { status: 500 });
  }
}
