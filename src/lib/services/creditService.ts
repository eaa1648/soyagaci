import { db } from '@/lib/firebase/config';
import { doc, updateDoc, increment, collection, addDoc } from 'firebase/firestore';

export type CreditTransactionType = 'WELCOME' | 'INVITE_BONUS' | 'AI_USAGE' | 'FAMILY_VAULT_CONTRIBUTION';

export async function addCredits(userId: string, amount: number, type: CreditTransactionType, details: string) {
  const userRef = doc(db, 'users', userId);
  
  // Update user balance
  await updateDoc(userRef, {
    credits: increment(amount)
  });

  // Log transaction
  const transactionsRef = collection(db, 'credit_transactions');
  await addDoc(transactionsRef, {
    userId,
    amount,
    type,
    details,
    timestamp: new Date().toISOString()
  });
}

// Örnek: E-posta onaylandığında çağrılacak
export async function grantWelcomeCredit(userId: string) {
  await addCredits(userId, 100, 'WELCOME', 'E-posta doğrulama ödülü');
}

// Örnek: Davet edilen kişi kayıt olduğunda davet edene verilecek
export async function grantInviteBonus(inviterUserId: string, invitedEmail: string) {
  await addCredits(inviterUserId, 20, 'INVITE_BONUS', `${invitedEmail} kullanıcısını davet ödülü`);
}
