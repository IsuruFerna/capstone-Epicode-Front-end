import ActionType, { Action } from "../actions/action-types/action-types";
import SelectedUserActionType, {
   SelectedUser,
} from "../actions/action-types/selectedUser-types";
import { PostState } from "./post";

interface SelectedUserPostState extends PostState, SelectedUser {}

const initialState = {
   username: "",
   firstName: "",
   lastName: "",
   userId: "",
   loading: false,
   error: null,
   data: [],
   first: null,
   last: null,
   totalPages: null,
   pageNumber: null,
};

const selectedUserReducer = (
   state: SelectedUserPostState = initialState,
   action: Action
) => {
   switch (action.type) {
      case ActionType.GET_POST_REQUEST:
         return {
            loading: true,
            error: null,
            data: [],
            first: null,
            last: null,
            totalPages: null,
            pageNumber: null,
         };

      case ActionType.GET_POST_SUCCESS:
         return {
            ...state,
            data: [...state.data, ...action.payload.content],
            first: action.payload.first,
            last: action.payload.last,
            totalPages: action.payload.totalPages,
            pageNumber: action.payload.pageable.pageNumber,
            loading: false,
            error: null,
         };

      case ActionType.GET_POST_FAIL:
         return {
            loading: false,
            error: action.payload,
            data: null,
            first: null,
            last: null,
            totalPages: null,
            pageNumber: null,
         };

      case SelectedUserActionType.SET_SELECTED_USER:
         return {
            ...state,
            username: action.payload.username,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            userId: action.payload.userId,
         };

      default:
         return state;
   }
};
