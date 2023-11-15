'use client';

const { createContext, useContext, useReducer } = require('react');

const MemberStateContext = createContext(null);
const MemberDispatchContext = createContext(null);

const initialState = {
  teamList: [],
  schedulList: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TEAMLIST':
      return {
        ...state,
        teamList: action.teamList,
      };

    case 'SET_SCHEDULELIST':
      return {
        ...state,
        scheduleList: action.scheduleList,
      };

    case 'RESET':
      return initialState;

    default:
      return state;
  }
}

export function MemberProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MemberStateContext.Provider value={state}>
      <MemberDispatchContext.Provider value={dispatch}>{children}</MemberDispatchContext.Provider>
    </MemberStateContext.Provider>
  );
}

export function useMemberState() {
  const state = useContext(MemberStateContext);
  return state;
}

export function useMemberDispatch() {
  const dispatch = useContext(MemberDispatchContext);
  return dispatch;
}
