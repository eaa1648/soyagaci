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
  ChevronRight
} from 'lucide-react';

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
      text: 'Merhaba. Yılmaz Ailesi Dijital Hafıza Asistanınızım. Ailenizin 5 kuşaklık soy kütüğü, 342 adet arşiv belgesi ve büyüklerinizin ses kayıtları hafızama yüklenmiştir. Aile geçmişi, şecere veya fotoğraflar hakkında dilediğinizi sorabilirsiniz.',
      citations: ['Yılmaz Ailesi Şecere Arşivi (1880 — 2026)', 'Bursa & İstanbul Nüfus Kütükleri'],
      suggestedFollowUps: [
        'Mustafa Yılmaz kimdir ve nerelerde görev yaptı?',
        'Bursa kökenli akrabalarımız kimlerdir?',
        'Arşivdeki en eski fotoğraf ve belge hangisidir?',
        'Ailede öğretmenlik veya mühendislik yapanlar kimlerdir?'
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
        aiReply = `Mustafa Yılmaz (1940 — 2012), ailenin 1. kuşak kurucu büyüğüdür.\n\n• Mesleği: Çapa Yüksek Öğretmen Okulu mezunu Cumhuriyet Başöğretmeni.\n• Ailesi: Ayşe Yılmaz (Demir) ile 1968 yılında evlenmiştir. Ali Yılmaz (1970) ve Zeynep Yılmaz (1975) adında iki evladı vardır.\n• Arşivdeki Yeri: 1984 yılına ait 4 dakikalık manyetik teyp ses kaydı ve 34 adet orijinal fotoğrafı arşivde kayıtlıdır.`;
        citations = ['Mustafa Yılmaz Şahıs Dosyası #1', '1968 Bursa Nikah Defteri Kaydı', '1984 Maarif Ses Arşivi'];
        followUps = ['Mustafa Yılmaz\'ın ses kaydını dinle', 'Soy ağacında 1. kuşağı göster'];
      } else if (qLower.includes('bursa') || qLower.includes('nereli')) {
        aiReply = `Ailenin ana kökleri Bursa Heykel ve Çekirge semtlerine uzanmaktadır.\n\n1. Kuşaktan Mustafa Yılmaz ve Ayşe Yılmaz Bursa doğumludur. 1990'lı yıllardan itibaren Ali Yılmaz'ın mühendislik kariyeri vesilesiyle aile İstanbul ve İzmir kollarına ayrılmıştır.`;
        citations = ['Bursa Heykel Nüfus Kütüğü', 'Aile Yaşam Coğrafyası Haritası'];
        followUps = ['İstanbul kolundaki akrabaları listele', 'İzmir kolundaki akrabaları listele'];
      } else if (qLower.includes('öğretmen') || qLower.includes('mühendis') || qLower.includes('meslek')) {
        aiReply = `Arşivdeki meslek ve kariyer dökümüne göre:\n\n• Mustafa Yılmaz (1. Kuşak): 1962-1988 yılları arasında Bursa Cumhuriyet İlkokulu Başöğretmeni.\n• Ali Yılmaz (2. Kuşak): İTÜ İnşaat Fakültesi mezunu Yüksek Mühendis.\n• Zeynep Yılmaz (2. Kuşak): Mimar ve Sanat Tarihi Öğretim Görevlisi.\n• Ahmet Yılmaz (3. Kuşak): Yazılım Mühendisi.`;
        citations = ['Meslek & Diplomalar Kütüğü'];
        followUps = ['Soy ağacında meslek filtresi uygula'];
      } else {
        aiReply = `"${query}" sorunuz aile arşivindeki 48 kişi kaydı ve 342 taranmış belge üzerinden analiz edildi.\n\nİlgili kayıtlar Yılmaz Ailesi'nin 1. ve 2. kuşak belgeleriyle eşleşmektedir. Kişi profilleri ve kronolojik zaman tüneli üzerinden detaylı inceleme yapabilirsiniz.`;
        citations = ['Dijital Aile Hafızası RAG Motoru', 'Gemini AI Modeli'];
        followUps = ['Dedemin kardeşlerini listele', 'Fotoğraf arşivini tara'];
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
    }, 1000);
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
            <span>Arşiv</span>
          </Link>
          <span style={{ color: 'var(--border-subtle)' }}>/</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} style={{ color: 'var(--brand-primary)' }} />
            <strong style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>Hafıza Asistanı</strong>
          </div>
        </div>

        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', background: 'var(--bg-surface)', padding: '4px 10px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
          48 Fert • 342 Belge
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
                Arşiv kayıtları taranıyor...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Aile geçmişiniz veya bir akrabanız hakkında soru sorun..."
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
            <span>Gönder</span>
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
