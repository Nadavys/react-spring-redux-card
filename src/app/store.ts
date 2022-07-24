import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import cardlistReducer from '../features/counter/cardlistSlice';
import { debounce } from "debounce";

const KEY = "redux_saved";

export const store = configureStore({
  reducer: {
    cardlist: cardlistReducer,
  },
  preloadedState: loadState(),
});

export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY);
    if (!serializedState) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

store.subscribe(
  // we use debounce to save the state once each 1000ms
  // for better performances in case multiple changes occur in a short time
  debounce(() => {
    saveState(store.getState());
  }, 1000)
);

//save only selected items to localstore
const ITEMS_TO_PERSIST = ['cardlist'];
export async function saveState(state: Record<string, any>) {
  try {
    const stateObjectToPersist: any = ITEMS_TO_PERSIST.reduce(
      (acc:any, item:any) => {
        acc[item] = state[item];
        return acc;
      }, {}
    );
    
    const serializedState = JSON.stringify(stateObjectToPersist);
    localStorage.setItem(KEY, serializedState);
  } catch (e) {
    // Ignore
  }
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
