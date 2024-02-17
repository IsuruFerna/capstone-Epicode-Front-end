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

export type ContentItem = {
   content: string | null;
   media: string | null;
   edited: boolean;
   id: string;
   timeStamp: string;
   username: string;
   firstName: string;
   lastName: string;
};

export type FetchResponsePostType = {
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
   payload: FetchResponsePostType;
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
