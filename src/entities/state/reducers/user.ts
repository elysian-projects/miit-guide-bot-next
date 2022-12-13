import { User, UserId } from "@/types/data";
import { createUserState, userExists } from "@/utils/state";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  users: User[],
}

const initialState: UserState = {
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state, {payload: userId}: PayloadAction<UserId>) {
      !userExists(state.users, userId) ?? state.users.push(createUserState(userId));
    },

    removeUser(state, {payload: userId}: PayloadAction<UserId>) {
      state.users = userExists(state.users, userId)
                    ? state.users.filter(user => user.id !== userId)
                    : state.users;
    },



  }
});

export default userSlice.reducer;
