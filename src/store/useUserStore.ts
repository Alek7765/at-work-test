import { create } from 'zustand';
import { UserFormData } from '@/types/user';

interface UserStore {
  archivedIds: number[];
  hiddenIds: number[];
  updatedUsers: Record<number, UserFormData>;
  
  archiveUser: (id: number) => void;
  restoreUser: (id: number) => void;
  hideUser: (id: number) => void;
  updateUser: (id: number, data: UserFormData) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  archivedIds: [],
  hiddenIds: [],
  updatedUsers: {},
  
  archiveUser: (id) => set((state) => ({ 
    archivedIds: [...state.archivedIds, id].filter((v, i, a) => a.indexOf(v) === i) 
  })),
  
  restoreUser: (id) => set((state) => ({ 
    archivedIds: state.archivedIds.filter(archiveId => archiveId !== id) 
  })),
  
  hideUser: (id) => set((state) => ({ 
    hiddenIds: [...state.hiddenIds, id].filter((v, i, a) => a.indexOf(v) === i) 
  })),
  
  updateUser: (id, data) => set((state) => ({
    updatedUsers: {
      ...state.updatedUsers,
      [id]: data
    }
  }))
}));
