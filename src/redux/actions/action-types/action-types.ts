import {
   AddNewPostToHomeFeedAction,
   UpdatePostedPostInStore,
} from "./post-types";

export enum ActionType {
   GET_POST_REQUEST = "GET_POST_REQUEST",
   GET_POST_SUCCESS = "GET_POST_SUCCESS",
   GET_POST_FAIL = "GET_POST_FAIL",
   PUT_LIKE = "PUT_LIKE",
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
   isLiked: boolean;
   likeCount: number;
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

type PutLikeResponseType = {
   isLiked: boolean;
   likeCount: number;
   id: string;
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

export interface PutLikeAction {
   type: ActionType.PUT_LIKE;
   payload: PutLikeResponseType;
}

export type Action =
   | GetPostFailAction
   | GetPostRequestAction
   | GetPostSuccessAction
   | UpdatePostedPostInStore
   | PutLikeAction
   | AddNewPostToHomeFeedAction;

export default ActionType;
