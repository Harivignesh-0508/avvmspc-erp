import { supabase } from './supabaseClient';

export const feeService = {
  // Get all fees for a student
  getStudentFees: async (student_id) => {
    const { data, error } = await supabase
      .from('fees')
      .select('*')
      .eq('student_id', student_id)
      .order('due_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Record a payment for a fee item
  payFee: async ({ fee_id, amount_paid, transaction_ref = `TXN-${Date.now()}` }) => {
    const { data, error } = await supabase
      .from('fees')
      .update({
        amount_paid,
        payment_status: 'paid',
        transaction_ref,
        last_payment_date: new Date().toISOString()
      })
      .eq('id', fee_id)
      .select();

    if (error) throw error;
    return data[0];
  },

  // Get total collections (Admin view)
  getCollectionStats: async () => {
    const { data, error } = await supabase
      .from('fees')
      .select('amount_paid, payment_status, due_date')
      .eq('payment_status', 'paid');

    if (error) throw error;
    
    const total = data.reduce((sum, item) => sum + parseFloat(item.amount_paid || 0), 0);
    return { 
      total, 
      count: data.length, 
      lastCollection: data[data.length - 1]?.due_date 
    };
  }
};
