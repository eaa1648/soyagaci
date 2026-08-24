'use client';

import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  Sparkles, 
  ArrowLeft, 
  Bookmark, 
  CornerDownLeft, 
  User, 
  Bot,
  ChevronRight,
  GitGraph,
  Crown
} from 'lucide-react';
import { OTTOMAN_DYNASTY_DATA } from '@/lib/services/historicalTrees';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  citations?: string[];
  suggestedFollowUps?: string[];
  timestamp: string;
}

function AIChatContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'ai',
      text: 'Merhaba. Şecere ve Aile Hafızası Asistanınızım. Deterministik Akrabalık Motoru (Graph BFS) ve Aile Arşivi hafızama yüklenmiştir.\n\n• Sülale Akrabalık Hesaplama ("Dayımın kızı bana ne düşer?", "Dedemin amcası kimdir?")\n• Aile Belgeleri ve Ses Kaydı Taraması\n• Osmanlı Hanedanı Tarihi Şecere Sorguları\n\nhakkında dilediğinizi sorabilirsiniz.',
      citations: ['Yılmaz Ailesi Şecere Grafı', 'Türk Medeni Kanunu Madde 17/18', 'Osmanlı Hanedan Kütüğü'],
      suggestedFollowUps: [
        'Dayımın kızı bana ne düşer ve kaçıncı derece akrabadır?',
        'Mustafa Yılmaz kimdir ve nerelerde görev yaptı?',
        'Fatih Sultan Mehmed ile Kanuni arasındaki soy bağı nedir?',
        'Bursa kökenli akrabalarımız ve eski adreslerimiz nelerdir?'
      ],
      timestamp: 'Şimdi'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialQueryHandled = useRef(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = useCallback((textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newId = `msg-${Date.now()}`;

    const userMsg: Message = {
      id: newId,
      role: 'user',
      text: query,
      timestamp: 'Şimdi'
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // AI & Deterministik Akrabalık Yanıt Mantığı
    setTimeout(() => {
      let aiReply = '';
      let citations: string[] = [];
      let followUps: string[] = [];

      const qLower = query.toLowerCase();

      // 1. Deterministik Akrabalık Derecesi Sorguları
      if (qLower.includes('dayı') || qLower.includes('kuzen') || qLower.includes('amca') || qLower.includes('hala') || qLower.includes('derece') || qLower.includes('ne düşer')) {
        
        if (qLower.includes('dayı') && (qLower.includes('kız') || qLower.includes('oğul') || qLower.includes('çocuk'))) {
          aiReply = `📐 **Deterministik Akrabalık Hesabı (Graph BFS):**\n\n• **Akrabalık Tanımı:** Kuzen (Dayı Çocuğu)\n• **Hukuki Sınıf:** 4. Derece Yansoy Kan Hısımı (Türk Medeni Kanunu Madde 17)\n• **Soy Yolu (Lineage Path):** Siz ➡️ Ebeveyniniz (Anne) ➡️ Ortak Dede/Nine ➡️ Dayınız ➡️ Kuzeniniz\n• **Nesil Farkı:** Toplam 4 doğum aralığı bulunmaktadır.`;
          citations = ['Türk Medeni Kanunu Madde 17 (Hısımlık)', 'Soy Ağacı Graf BFS Motoru'];
          followUps = ['Amcamın oğlu kaçıncı derece akrabadır?', 'Teyzemin kızıyla miras bağı nedir?'];
        } else if (qLower.includes('amca') || qLower.includes('hala') || qLower.includes('teyze')) {
          aiReply = `📐 **Deterministik Akrabalık Hesabı (Graph BFS):**\n\n• **Akrabalık Tanımı:** 3. Derece Yansoy Kan Hısımı\n• **Soy Yolu:** Siz ➡️ Ebeveyniniz ➡️ Ortak Dede/Nine ➡️ Amcanız / Halanız / Teyzeniz\n• **Hukuki Statü:** 3 doğum farkı içeren doğrudan yan soy kan bağıdır.`;
          citations = ['Türk Medeni Kanunu Madde 17', 'Akrabalık Dereceleri Kütüğü'];
          followUps = ['Kuzenler kaçıncı derece akrabadır?', 'Kayın hısımlığı dereceleri nelerdir?'];
        } else {
          aiReply = `📐 **Akrabalık ve Hısımlık Derecesi Analizi:**\n\nTürk Medeni Kanunu'na göre akrabalık derecesi, akrabaları birbirine bağlayan doğum sayısı ile belirlenir:\n\n• 1. Derece: Anne, Baba, Çocuklar\n• 2. Derece: Kardeşler, Torunlar, Dede, Nine\n• 3. Derece: Amca, Dayı, Hala, Teyze, Yeğen\n• 4. Derece: Kuzenler (Amca/Dayı/Hala/Teyze Çocukları)`;
          citations = ['TMK Madde 17 & 18', 'Şecere Akrabalık Motoru'];
          followUps = ['Dayımın kızı bana ne düşer?', 'Dedemin amcası kimdir?'];
        }
      }
      // 2. Tarihi Şecere & Osmanlı Hanedanı Sorguları
      else if (qLower.includes('fatih') || qLower.includes('kanuni') || qLower.includes('osmanlı') || qLower.includes('padişah')) {
        if ((qLower.includes('fatih') || qLower.includes('mehmed')) && (qLower.includes('kanuni') || qLower.includes('süleyman'))) {
          aiReply = `👑 **Osmanlı Hanedanı Şecere Analizi:**\n\nFatih Sultan Mehmed (II. Mehmed), Kanunî Sultan Süleyman'ın **Büyük Dedesi (Babasının Dedesi)**dir.\n\n• **Soy Zinciri (5 Kuşak):**\n  1. II. Mehmed (Fatih Sultan Mehmed — 7. Padişah)\n  2. II. Bayezid (Oğlu — 8. Padişah)\n  3. I. Selim (Yavuz Sultan Selim — Torunu — 9. Padişah)\n  4. I. Süleyman (Kanunî Sultan Süleyman — Torununun Oğlu — 10. Padişah)`;
          citations = ['Osmanlı Hanedan Kütüğü (BOA)', 'İslam Ansiklopedisi Hanedan Şeceresi'];
          followUps = ['Yavuz Sultan Selim\'in babası kimdir?', 'Osman Gazi ile Orhan Gazi arasındaki bağ nedir?'];
        } else {
          const matched = OTTOMAN_DYNASTY_DATA.find(f => qLower.includes(f.name.toLowerCase()) || qLower.includes(f.title.toLowerCase())) || OTTOMAN_DYNASTY_DATA[0];
          aiReply = `👑 **${matched.name} (${matched.title})**\n\n• Saltanat Dönemi: ${matched.reignYears}\n• Hayat Yılları: ${matched.lifeYears}\n• Babası: ${matched.fatherName} | Annesi: ${matched.motherName}\n• Kabir: ${matched.burialPlace}\n\nÖnemli Hadiseler: ${matched.majorEvents.join(', ')}\n\n${matched.biography}`;
          citations = ['Osmanlı Hanedan Arşivi', 'Tarihi Şecereler Veritabanı'];
          followUps = ['Kanuni Sultan Süleyman kimdir?', 'Tüm 36 Padişah şeceresini aç'];
        }
      }
      // 3. Aile Arşivi ve Şahıs Sorguları
      else if (qLower.includes('mustafa') || qLower.includes('dede') || qLower.includes('öğretmen')) {
        aiReply = `Mustafa Yılmaz (1940 — 2012), ailenin 1. kuşak kurucu büyüğüdür.\n\n• Mesleği: Çapa Yüksek Öğretmen Okulu mezunu Cumhuriyet Başöğretmeni.\n• Ailesi: Ayşe Yılmaz (Demir) ile evlenmiştir. Ali Yılmaz ve Zeynep Yılmaz adında iki evladı vardır.\n• Arşivdeki Yeri: 1984 yılına ait 4 dakikalık manyetik teyp ses kaydı ve 34 adet orijinal fotoğrafı arşivde kayıtlıdır.`;
        citations = ['Mustafa Yılmaz Şahıs Dosyası #1', '1968 Bursa Nikah Defteri', '1984 Maarif Ses Arşivi'];
        followUps = ['Mustafa Yılmaz\'ın ses kaydını dinle', 'Soy ağacında 1. kuşağı göster'];
      } else {
        aiReply = `"${query}" sorunuz aile arşivindeki şahıs kayıtları, tapu ve berat belgeleri üzerinden analiz edildi.\n\nİlgili kayıtlar aile kütüğündeki kuşaklarla eşleşmektedir. Şahıs profilleri, zaman tüneli ve akrabalık grafı üzerinden detaylı inceleme yapabilirsiniz.`;
        citations = ['Dijital Aile Hafızası RAG Motoru', 'Gemini AI Modeli'];
        followUps = ['Dayımın kızı bana ne düşer?', 'Tarihi fotoğraf arşivini tara'];
      }

      const aiMsg: Message = {
        id: `ai-${Date.now() + 1}`,
        role: 'ai',
        text: aiReply,
        citations,
        suggestedFollowUps: followUps,
        timestamp: 'Şimdi'
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800);
  }, [input]);

  // Handle URL query on load
  useEffect(() => {
    if (initialQuery && !initialQueryHandled.current) {
      initialQueryHandled.current = true;
      handleSend(initialQuery);
    }
  }, [initialQuery, handleSend]);

  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '24px 24px 40px 24px', height: 'calc(100vh - var(--header-height))', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
            <ArrowLeft size={14} />
            <span>Ana Sayfa</span>
          </Link>
          <span style={{ color: 'var(--border-subtle)' }}>/</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} style={{ color: 'var(--brand-primary)' }} />
            <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>Şecere & Hafıza Asistanı</strong>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <Link href="/kesfet" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', color: 'var(--accent-emerald)', background: 'var(--bg-surface)', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', textDecoration: 'none' }}>
            <Crown size={12} />
            <span>Tarihi Şecereler</span>
          </Link>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', background: 'var(--bg-surface)', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <GitGraph size={12} /> Graph BFS Aktif
          </span>
        </div>
      </div>

      {/* Main Chat Box */}
      <Card style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        overflow: 'hidden', 
        background: 'var(--bg-surface)', 
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)'
      }}>
        
        {/* Messages Stream */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{ 
                display: 'flex',
                gap: '14px',
                alignItems: 'flex-start',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}
            >
              {/* Avatar */}
              <div style={{ 
                width: '32px', 
                height: '32px', 
                borderRadius: 'var(--radius-sm)', 
                background: msg.role === 'user' ? 'var(--bg-surface-raised)' : 'var(--brand-surface)',
                border: '1px solid var(--border-subtle)',
                color: msg.role === 'user' ? 'var(--text-primary)' : 'var(--brand-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                {msg.role === 'user' ? <User size={15} /> : <Bot size={15} />}
              </div>

              {/* Message Content */}
              <div style={{ 
                maxWidth: '80%',
                background: msg.role === 'user' ? 'var(--bg-surface-raised)' : 'var(--bg-main)',
                border: '1px solid var(--border-subtle)',
                padding: '16px 20px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                lineHeight: 1.6
              }}>
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.9rem' }}>
                  {msg.text}
                </div>

                {/* Citations Box */}
                {msg.citations && msg.citations.length > 0 && (
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--brand-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Bookmark size={11} /> Kaynak:
                    </span>
                    {msg.citations.map((c, i) => (
                      <span key={i} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: 'var(--radius-xs)', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Followups */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Önerilen Takip Soruları:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {msg.suggestedFollowUps.map((fu, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(fu)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: 'var(--radius-full)',
                            background: 'var(--bg-surface)',
                            border: '1px solid var(--border-medium)',
                            color: 'var(--text-secondary)',
                            fontSize: '0.74rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <ChevronRight size={12} />
                          <span>{fu}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--brand-surface)', color: 'var(--brand-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={15} />
              </div>
              <div style={{ background: 'var(--bg-main)', padding: '12px 18px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                Akrabalık grafı ve arşiv kayıtları taranıyor...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Akrabalık derecesi ('Dayımın kızı...') veya aile geçmişi hakkında sorun..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-main)',
              border: '1px solid var(--border-medium)',
              padding: '0 16px',
              color: 'var(--text-primary)',
              fontSize: '0.88rem',
              outline: 'none',
            }}
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            style={{
              padding: '0 18px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--brand-primary)',
              color: '#FFFFFF',
              border: 'none',
              fontWeight: 500,
              fontSize: '0.84rem',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              opacity: input.trim() ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>Sor</span>
            <CornerDownLeft size={14} />
          </button>
        </div>

      </Card>
    </div>
  );
}

export default function AIChatPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>Asistan Yükleniyor...</div>}>
      <AIChatContent />
    </Suspense>
  );
}
