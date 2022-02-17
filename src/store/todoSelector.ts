import {todosAdapter} from "./todoSlice";
import type {RootState} from "./index";

const todosSelector = todosAdapter.getSelectors((state: RootState) => state.todosData);

export const todosEntities = todosSelector.selectAll;
