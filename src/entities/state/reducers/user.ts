import { StorageState, UserId } from "@/types/data";
import { removeUserFromList } from "@/utils/data";
import { getInitialUserState, userExists } from "@/utils/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StorageState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, {payload: userId}: PayloadAction<UserId>) {
      if(!userExists(state, userId)) {
        return;
      }

      state[userId] = getInitialUserState(userId);
    },

    removeUser(state, {payload: userId}: PayloadAction<UserId>) {
      if(!userExists(state, userId)) {
        return;
      }

      removeUserFromList(state, userId);
    },

    getUserState(state, {payload: userId}: PayloadAction<UserId>) {
      if(!userExists(state, userId)) {
        return;
      }
    },

    resetUserState(state, {payload: userId}: PayloadAction<UserId>) {
      if(!userExists(state, userId)) {
        return;
      }

      state[userId] = getInitialUserState(userId);
    },
  }
});

export default userSlice.reducer;
