enum SelectedUserActionType {
   SET_SELECTED_USER = "SET_SELECTED_USER",
}

export interface SelectedUser {
   username: string;
   firstName: string;
   lastName: string;
   userId: string;
}

export interface SetSelectedUserAction {
   type: SelectedUserActionType.SET_SELECTED_USER;
   payload: SelectedUser;
}

export default SelectedUserActionType;
