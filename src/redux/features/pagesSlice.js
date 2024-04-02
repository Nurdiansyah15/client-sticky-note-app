const initialState = {
  page: "",
};

export default function pagesReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    default:
      return state;
  }
}
