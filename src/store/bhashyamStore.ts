import { create } from "zustand";

interface State {
    section: number;
    valli_no: number;
    bhashyam_no: number;
}

interface Actions {
    setSection: (section: number) => void;
    setValliNo: (bhashyamNo: number) => void;
    incrementValli: () => void;
    decrementValli: () => void;
    setBhashyamNo: (bhashyamNo: number) => void;
    incrementBhashyam: () => void;
    decrementBhashyam: () => void;
}

const MAX_VALLI = 4;
const MAX_BHASHYAM = 18;

const useBhashyamStore = create<State & Actions>((set) => ({
    section: 0,
    valli_no: 0,
    bhashyam_no: 0,
    setSection: (section) => set(() => ({ section: section })),
    setValliNo: (valliNo) => set(() => ({ valli_no: valliNo })),
    setBhashyamNo: (bhashyamNo) => set(() => ({ bhashyam_no: bhashyamNo })),

    incrementValli: () =>
        set((state) => {
            let newValliNo = state.valli_no + 1;
            if (newValliNo > MAX_VALLI) newValliNo = MAX_VALLI;
            return { valli_no: newValliNo };
        }),
    
    decrementValli: () =>
        set((state) => {
            let newValliNo = state.valli_no - 1;
            if (newValliNo < 0) newValliNo = 0;
            return { valli_no: newValliNo };
        }),     

    incrementBhashyam: () =>
        set((state) => {
            let newBhashyamNo = state.bhashyam_no + 1;
            if (newBhashyamNo > MAX_BHASHYAM) newBhashyamNo = MAX_BHASHYAM;
            return { bhashyam_no: newBhashyamNo };
        }),

    decrementBhashyam: () =>
        set((state) => {
            let newBhashyamNo = state.bhashyam_no - 1;
            if (newBhashyamNo < 0) newBhashyamNo = 0; // Prevent going below 0
            return { bhashyam_no: newBhashyamNo };
        }),
}));

export default useBhashyamStore;
