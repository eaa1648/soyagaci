import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const reports = [
      {
        type: 'DUPLICATE_SUSPICION',
        message: 'Mustafa Yılmaz (Doğum: 1940) kaydı ile ağaçtaki diğer "M. Yılmaz (1940)" kaydı aynı kişi olabilir.',
        nodeIds: ['1', '8']
      },
      {
        type: 'LOGICAL_ERROR',
        message: 'Ahmet Yılmaz\'ın doğum tarihi (2010), babasının ölüm tarihinden sonra görünüyor.',
        nodeIds: ['5', '6']
      }
    ];

    return NextResponse.json({ reports });
  } catch {
    return NextResponse.json({ error: 'Moderasyon servisi hatası.' }, { status: 500 });
  }
}
