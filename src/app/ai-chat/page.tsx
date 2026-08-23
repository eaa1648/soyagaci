'use client';

import React, { useState, useEffect, useRef, Suspense, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
      text: 'Merhaba Ahmet! Ben Yılmaz Ailesi Dijital Hafıza Asistanınızım. Ailenizin 5 kuşaklık soy ağacı kayıtları, 342 adet fotoğraf ve belgesi, ayrıca büyüklerinizin ses kayıtları hafızama yüklendi. Ailenizle ilgili merak ettiğiniz her şeyi bana sorabilirsiniz.',
      citations: ['Yılmaz Hanedanı Arşivi (1880 - 2026)', 'Bursa ve İstanbul Nüfus Kütükleri'],
      suggestedFollowUps: [
        'Dedem Mustafa Yılmaz kimdir ve nerelerde çalıştı?',
        'Bursa kökenli akrabalarım kimlerdir?',
        'Ailemizdeki en eski fotoğraf hangi yıla ait?',
        'Öğretmenlik mesleğini yapan aile bireyleri kimler?'
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

    // AI Response generation logic
    setTimeout(() => {
      let aiReply = '';
      let citations: string[] = [];
      let followUps: string[] = [];

      const qLower = query.toLowerCase();

      if (qLower.includes('mustafa') || qLower.includes('dede')) {
        aiReply = `**Mustafa Yılmaz (1940 - 2012)** ailenizin 1. kuşak kurucu büyüğüdür.\n\n• **Mesleği:** Çapa Yüksek Öğretmen Okulu mezunu Cumhuriyet Başöğretmeni.\n• **Eşi:** Ayşe Yılmaz (Demir) (1968 evliliği).\n• **Çocukları:** Ali Yılmaz (1970) ve Zeynep Yılmaz (Kaya) (1975).\n• **Öne Çıkan Mirası:** 1984 yılında teyp kasetine kaydettiği 4 dakikalık ses hatırası ve 34 adet tarihi fotoğrafı arşivimizde mevcuttur.`;
        citations = ['Mustafa Yılmaz Kişi Kartı #1', '1968 Bursa Nikah Defteri', '1984 Ses Arşivi'];
        followUps = ['Mustafa Dede\'nin ses kaydını dinle', 'Mustafa Yılmaz\'ın soy ağacındaki yerini göster'];
      } else if (qLower.includes('bursa') || qLower.includes('nereli')) {
        aiReply = `Ailenizin ana kökleri **Bursa Heykel ve Çekirge** semtlerine dayanmaktadır.\n\n1. Kuşaktan **Mustafa Yılmaz** ve **Ayşe Yılmaz** Bursa doğumludur. 2. Kuşaktan itibaren **Ali Yılmaz**'ın eğitimi ve mühendislik görevi sebebiyle aile İstanbul (Kadıköy) ve İzmir (Alsancak) kollarına ayrılmıştır.`;
        citations = ['Bursa Heykel Nüfus Kaydı', 'Yaşam Haritası & Göç Analizi'];
        followUps = ['İstanbul kolundaki akrabaları listele', 'İzmir kolundaki akrabaları listele'];
      } else if (qLower.includes('öğretmen') || qLower.includes('meslek')) {
        aiReply = `Arşivdeki meslek taramasına göre ailenizde **2 eğitimci** bulunmaktadır:\n\n1. **Mustafa Yılmaz (Büyük Dede):** 1962-1988 yılları arasında Bursa Cumhuriyet İlkokulu Başöğretmeni.\n2. **Zeynep Yılmaz (Kaya) (Hala):** Mimar olmasının yanı sıra Ege Üniversitesi'nde Sanat Tarihi dersleri vermiştir.`;
        citations = ['Maarif Müdürlüğü 1974 Beratı', 'Aile Bireyleri Meslek Kütüğü'];
        followUps = ['Mühendis olan aile bireylerini göster'];
      } else {
        aiReply = `**"${query}"** sorunuz aile hafızamızda tarandı:\n\nArşivdeki 48 kişi kaydı ve 342 belge üzerinde yaptığım incelemede bu konunun **Yılmaz Ailesi 1. ve 2. Kuşak** dönemine ait hatıralarla yakından ilgili olduğu görülüyor. İlgili fotoğraflar ve kişi profilleri sisteme tam olarak entegre edilmiştir.`;
        citations = ['Dijital Aile Hafızası RAG Motoru', 'Gemini 2.5 Pro Modeli'];
        followUps = ['Dedemin kardeşlerini göster', 'Soy ağacında 3. kuşağı filtrele'];
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
    }, 1100);
  }, [input]);

  // Handle URL query on load
  useEffect(() => {
    if (initialQuery && !initialQueryHandled.current) {
      initialQueryHandled.current = true;
      handleSend(initialQuery);
    }
  }, [initialQuery, handleSend]);

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 24px 60px 24px', height: 'calc(100vh - 72px)', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header Card */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontWeight: 600 }}>← Ana Sayfa</Link>
          <span style={{ color: 'var(--border-color)' }}>|</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem' }}>✨</span>
            <strong style={{ fontSize: '1.1rem', color: '#ffffff' }}>Hafıza-i Âile Yapay Zekâsı</strong>
            <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: '9999px', background: 'linear-gradient(135deg, #ec4899, #8b5cf6)', color: '#fff', fontWeight: 800 }}>Gemini 2.5 Pro</span>
          </div>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', background: 'rgba(245, 158, 11, 0.12)', padding: '4px 12px', borderRadius: '9999px', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
          📚 48 Kişi & 342 Belge Bağlandı
        </div>
      </div>

      {/* Main Chat Box */}
      <Card style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255, 255, 255, 0.12)' }}>
        
        {/* Messages Scroll Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              style={{ 
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                display: 'flex',
                gap: '12px',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row'
              }}
            >
              {/* Avatar */}
              <div style={{ 
                width: '36px', 
                height: '36px', 
                borderRadius: '50%', 
                background: msg.role === 'user' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.9rem',
                flexShrink: 0,
                boxShadow: msg.role === 'ai' ? '0 0 15px rgba(99, 102, 241, 0.4)' : 'none'
              }}>
                {msg.role === 'user' ? 'A' : '✨'}
              </div>

              {/* Message Content Bubble */}
              <div style={{ 
                background: msg.role === 'user' ? 'linear-gradient(135deg, #4f46e5 0%, #4338ca 100%)' : 'rgba(30, 41, 59, 0.8)',
                color: '#ffffff',
                padding: '16px 20px',
                borderRadius: msg.role === 'user' ? '18px 4px 18px 18px' : '4px 18px 18px 18px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
                lineHeight: 1.6
              }}>
                <div style={{ whiteSpace: 'pre-wrap', fontSize: '0.94rem' }}>
                  {msg.text}
                </div>

                {/* Citations Box */}
                {msg.citations && msg.citations.length > 0 && (
                  <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', fontWeight: 700 }}>📌 Kaynaklar:</span>
                    {msg.citations.map((c, i) => (
                      <span key={i} style={{ fontSize: '0.7rem', padding: '2px 8px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.08)', color: 'var(--text-secondary)' }}>
                        {c}
                      </span>
                    ))}
                  </div>
                )}

                {/* Suggested Followups */}
                {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#c7d2fe', fontWeight: 600 }}>Önerilen Sorular:</span>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {msg.suggestedFollowUps.map((fu, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(fu)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '9999px',
                            background: 'rgba(99, 102, 241, 0.15)',
                            border: '1px solid rgba(99, 102, 241, 0.35)',
                            color: '#c7d2fe',
                            fontSize: '0.75rem',
                            cursor: 'pointer',
                            textAlign: 'left',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          💬 {fu}
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
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', alignSelf: 'flex-start' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>✨</div>
              <div style={{ background: 'rgba(30, 41, 59, 0.8)', padding: '12px 18px', borderRadius: '4px 18px 18px 18px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                Arşiv taranıyor ve yapay zekâ cevabı hazırlanıyor...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Dock */}
        <div style={{ padding: '18px 24px', borderTop: '1px solid var(--border-color)', background: 'rgba(10, 15, 30, 0.95)', display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', width: '44px', height: '44px', borderRadius: '50%', fontSize: '1.1rem', cursor: 'pointer' }}
            title="Sesli Soru Sor"
            onClick={() => alert('Mikrofon dinleme simülasyonu: Sesiniz algılanıyor...')}
          >
            🎙️
          </button>
          
          <input
            type="text"
            placeholder="Aileniz, fotoğraflarınız veya geçmişiniz hakkında bir soru sorun..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            style={{
              flex: 1,
              height: '46px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              padding: '0 20px',
              color: '#ffffff',
              fontSize: '0.95rem',
              outline: 'none',
              fontFamily: 'inherit'
            }}
          />

          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            style={{
              padding: '0 24px',
              height: '46px',
              borderRadius: '9999px',
              background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
              color: '#ffffff',
              border: 'none',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: input.trim() ? 'pointer' : 'not-allowed',
              opacity: input.trim() ? 1 : 0.5,
              boxShadow: input.trim() ? '0 4px 16px rgba(99, 102, 241, 0.4)' : 'none'
            }}
          >
            Gönder
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
