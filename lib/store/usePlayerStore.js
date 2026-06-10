import { create } from 'zustand';

export const usePlayerStore = create((set, get) => ({
  currentTrack: null,
  queue: [],
  currentIndex: 0,
  isPlaying: false,
  volume: 0.8,

  setQueue: (tracks, index = 0) =>
    set({
      queue: tracks,
      currentIndex: index,
      currentTrack: tracks[index],
      isPlaying: true,
    }),

  togglePlay: () =>
    set((state) => ({
      isPlaying: !state.isPlaying,
    })),

  nextTrack: () => {
    const { queue, currentIndex } = get();
    if (currentIndex < queue.length - 1) {
      const nextIndex = currentIndex + 1;
      set({
        currentIndex: nextIndex,
        currentTrack: queue[nextIndex],
        isPlaying: true,
      });
    }
  },

  prevTrack: () => {
    const { currentIndex, queue } = get();
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      set({
        currentIndex: prevIndex,
        currentTrack: queue[prevIndex],
        isPlaying: true,
      });
    }
  },
}));
