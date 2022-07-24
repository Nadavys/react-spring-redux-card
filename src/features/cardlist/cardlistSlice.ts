import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';

export interface ICard{
  color: string,
  name: string
}

const democards:any = [
  {name:'Red card', color: 'red'},{name:'Blue card', color: 'blue'},{name:'White Card', color: 'white'},
]

export interface CardlistState {
  list: ICard[ ]
}

const initialState: CardlistState = {
  list: [
    ...democards
  ]
};

export const counterSlice = createSlice({
  name: 'cardlist',
  initialState,
  reducers: {
    addCard:(state, action: PayloadAction<ICard>)=>{
      const list = [...state.list, action.payload];
      return {...state, list};
    },
    removeCard:(state, action: PayloadAction<number>)=>{
      const index = action.payload;
      const list:any = state.list.slice();
      list.splice(index, 1)
      return {...state, list};
    },
    placeAtStart:(state, action: PayloadAction<number>)=>{
      const index = action.payload;
      const list:any = state.list.slice();
      const temp = list[index];
      list.splice(index, 1);
      list.unshift(temp);
      return {...state, list};
    },
    placeAtEnd:(state, action: PayloadAction<number>)=>{
      const index = action.payload;
      const list = state.list.slice();
      const temp = list[index];
      list.splice(index, 1);
      list.push(temp);
      return {...state, list};
    }
  },
});

export const { addCard, removeCard, placeAtStart, placeAtEnd } = counterSlice.actions;

export const selectCardlist = (state: RootState) => state.cardlist.list;

export default counterSlice.reducer;
