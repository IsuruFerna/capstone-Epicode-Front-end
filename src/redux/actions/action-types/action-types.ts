enum ActionType {
   GET_POST_REQUEST = "GET_POST_REQUEST",
   GET_POST_SUCCESS = "GET_POST_SUCCESS",
   GET_POST_FAIL = "GET_POST_FAIL",
}

type Sort = {
   empty: boolean;
   sorted: boolean;
   unsorted: boolean;
};

type Pageable = {
   offset: number;
   pageNumber: number;
   pageSize: number;
   paged: boolean;
   sort: Sort;
   unpaged: boolean;
};

type ContentItem = {};

export type FetchResponseType = {
   content: ContentItem[];
   empty: boolean;
   first: boolean;
   last: boolean;
   number: number;
   numberOfElements: number;
   pageable: Pageable;
   size: number;
   sort: Sort;
   totalElements: number;
   totalPages: number;
};

interface GetPostRequestAction {
   type: ActionType.GET_POST_REQUEST;
}

interface GetPostSuccessAction {
   type: ActionType.GET_POST_SUCCESS;
   payload: FetchResponseType;
}

interface GetPostFailAction {
   type: ActionType.GET_POST_FAIL;
   payload: string;
}

export type Action =
   | GetPostFailAction
   | GetPostRequestAction
   | GetPostSuccessAction;

export default ActionType;
