import { create } from "zustand";



export const useRates = create((set) => ({
  rates: null,
  loading: true,
  error: null,
  editableCell: { row: null, col: null },
  setInitialRates: (data) => set({ rates: data }),
  setRates: (index, field, value) =>
    set(({ rates }) => {
      const updatedRates = rates?.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: value };
        }
        return item;
      });
      return { rates: updatedRates };
    }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setEditableCell: (row, col) => set({ editableCell: { row, col } }),
}));

// import { create } from "zustand";

// export interface IRate {
//   ccy: string;
//   base_ccy: string;
//   buy: string;
//   sale: string;
// }
// interface IUseRates {
//   rates: IRate[] | null;
//   loading: boolean;
//   error: any;
//   editableCell: { row: number | null; col: string | null };
//   setInitialRates: (data: IRate[]) => void;
//   setRates: (index: number, field: string, value: string) => void;
//   setLoading: (loading: boolean) => void;
//   setError: (error: any) => void;
//   setEditableCell: (row: number | null, col: string | null) => void;
// }

// export const useRates = create<IUseRates>((set) => ({
//   rates: null,
//   loading: true,
//   error: null,
//   editableCell: { row: null, col: null },
//   setInitialRates: (data) => set({ rates: data }),
//   setRates: (index, field, value) =>
//     set(({ rates }) => {
//       const updatedRates = rates?.map((item, i) => {
//         if (i === index) {
//           return { ...item, [field]: value };
//         }
//         return item;
//       });
//       return { rates: updatedRates };
//     }),
//   setLoading: (loading) => set({ loading }),
//   setError: (error) => set({ error }),
//   setEditableCell: (row, col) => set({ editableCell: { row, col } }),
// }));
