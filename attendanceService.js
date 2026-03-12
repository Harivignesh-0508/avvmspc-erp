import { supabase } from './supabaseClient';

export const attendanceService = {
  // Mark attendance for a student
  markAttendance: async ({ student_id, status, session_type = 'morning', marked_by }) => {
    const { data, error } = await supabase
      .from('attendance')
      .insert([
        { 
          student_id, 
          status, 
          session_type, 
          marked_by,
          date: new Date().toISOString().split('T')[0] 
        }
      ])
      .select();

    if (error) throw error;
    return data[0];
  },

  // Get attendance for a specific student
  getStudentAttendance: async (student_id) => {
    const { data, error } = await supabase
      .from('attendance')
      .select('*')
      .eq('student_id', student_id)
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  },

  // Get attendance stats for a class (Staff view)
  getClassAttendance: async (date = new Date().toISOString().split('T')[0]) => {
    const { data, error } = await supabase
      .from('attendance')
      .select(`
        *,
        students (
          full_name,
          register_no,
          department
        )
      `)
      .eq('date', date);

    if (error) throw error;
    return data;
  }
};
