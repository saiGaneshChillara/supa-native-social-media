import { supabase } from "../lib/supabase";

export const getUserData = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      .single();

      if (error) {
        return { success: false, message: error.message };
      }
      
      return { success: true, data };
  } catch (error) {
    console.log("Error in getting userData:", error);
    return { success: false, message: error.message };
  }
};