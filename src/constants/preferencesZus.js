import { create } from 'zustand';

const usePreferencesStore = create((set) => ({
  img_duck: null,
  color_duck: '#FFFFFF', 
  mode_color: 'light',   
  setImgDuck: (newImg) => set({ img_duck: newImg }),
  setColorDuck: (newColor) => set({ color_duck: newColor }),
  setModeColor: (newMode) => set({ mode_color: newMode }),

  loadPreferences: (preferences) => set(preferences),
  
  resetPreferences: () => set({
    img_duck: null,
    color_duck: '#FFFFFF',
    mode_color: 'light',
  }),
}), {
  name: 'preferences', 
});

export default usePreferencesStore;