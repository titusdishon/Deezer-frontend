import { combineReducers } from '@reduxjs/toolkit';
import music from './musicSlice';

/**
 * @description Aggregate all reducers into a root reducer
 */
const rootReducer = combineReducers({
  music
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
