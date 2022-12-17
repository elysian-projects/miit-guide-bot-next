import { initialState } from "@/constants/state";
import { StorageState, UserId, UserState } from "@/types/data";
import { removeUserFromList } from "@/utils/data";
import { getInitialUserState, userExists } from "@/utils/state";
import create from "zustand";


const throwErrorIfNoUserFound = (state: StorageState, userId: UserId): void => {
  if(!userExists(state, userId)) {
    throw new Error(`No user with id ${userId} found!`);
  }
};

interface UserStore {
  applicationStorage: StorageState,
  addUser: (userId: UserId) => void,
  removeUser: (userId: UserId) => void,
  updatePropValue: <P extends keyof UserState, K extends UserState[P]>(userId: UserId, propName: P, propValue: K) => void,
  resetUserState: (userId: UserId) => void
}

export const createUserStore = create<UserStore>(set => ({
  applicationStorage: initialState,

  addUser: (userId: UserId) => {
    set(state => ({
      applicationStorage: {
        ...state.applicationStorage,
        [userId]: getInitialUserState(userId)
      }
    })
  );},

  removeUser: (userId: UserId) => {
    set(state => ({
      applicationStorage: {
        ...removeUserFromList(state.applicationStorage, userId)
      }
    }));
  },

  updatePropValue: (userId, prop, value) => {
    set(state => ({
      applicationStorage: {
        ...state.applicationStorage,
        [userId]: {
          ...state.applicationStorage[userId],
          [prop]: value
        }
      }
    }));
  },

  resetUserState: (userId: UserId) => {
    set(state => ({
      applicationStorage: {
        ...state.applicationStorage,
        [userId]: getInitialUserState(userId)
      }
    }));
  }
}));

// export const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     addUser(state, {payload: userId}: PayloadAction<UserId>) {
//       throwErrorIfNoUserFound(state, userId);

//       state[userId] = getInitialUserState(userId);
//     },

//     removeUser(state, {payload: userId}: PayloadAction<UserId>) {
//       throwErrorIfNoUserFound(state, userId);

//       removeUserFromList(state, userId);
//     },

//     // updatePropValue<T extends StorageState, P extends keyof UserState = keyof UserState, K extends UserStateValue<P> = never>(state: T, payload: PayloadAction<{userId: UserId, propName: P, propValue: K}>) {
//     //   const {propName, userId} = payload.payload;

//     //   throwErrorIfNoUserFound(state, userId);

//     //   state[userId][propName] = payload.payload.propValue;
//     // },

//     updatePropValue<T extends StorageState, P extends keyof UserState, K extends UserState[P]>(state: T, payload: PayloadAction<UserId>) {
//       const {userId, prop, value} = payload.payload;

//       throwErrorIfNoUserFound(state, userId);

//       state[userId][prop] = value;
//     },

//     // FIXME: find a way to return a value from here
//     getUserState(state, {payload: userId}: PayloadAction<UserId>): UserState {
//       throwErrorIfNoUserFound(state, userId);

//       return state[userId];
//     },

//     resetUserState(state, {payload: userId}: PayloadAction<UserId>) {
//       throwErrorIfNoUserFound(state, userId);

//       state[userId] = getInitialUserState(userId);
//     },
//   }
// });

// export default userSlice.reducer;
