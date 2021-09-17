/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserDataInput = {
  id?: string | null,
  email: string,
  devices?: Array< string | null > | null,
};

export type ModelUserDataConditionInput = {
  email?: ModelStringInput | null,
  devices?: ModelStringInput | null,
  and?: Array< ModelUserDataConditionInput | null > | null,
  or?: Array< ModelUserDataConditionInput | null > | null,
  not?: ModelUserDataConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UserData = {
  __typename: "UserData",
  id: string,
  email: string,
  devices?: Array< string | null > | null,
  createdAt: string,
  updatedAt: string,
  owner?: string | null,
};

export type UpdateUserDataInput = {
  email?: string | null,
  devices?: Array< string | null > | null,
};

export type DeleteUserDataInput = {
  id: string,
};

export type ModelUserDataFilterInput = {
  email?: ModelStringInput | null,
  devices?: ModelStringInput | null,
  and?: Array< ModelUserDataFilterInput | null > | null,
  or?: Array< ModelUserDataFilterInput | null > | null,
  not?: ModelUserDataFilterInput | null,
};

export type ModelUserDataConnection = {
  __typename: "ModelUserDataConnection",
  items?:  Array<UserData | null > | null,
  nextToken?: string | null,
};

export type CreateUserDataMutationVariables = {
  input: CreateUserDataInput,
  condition?: ModelUserDataConditionInput | null,
};

export type CreateUserDataMutation = {
  createUserData?:  {
    __typename: "UserData",
    id: string,
    email: string,
    devices?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type UpdateUserDataMutationVariables = {
  input: UpdateUserDataInput,
  condition?: ModelUserDataConditionInput | null,
};

export type UpdateUserDataMutation = {
  updateUserData?:  {
    __typename: "UserData",
    id: string,
    email: string,
    devices?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type DeleteUserDataMutationVariables = {
  input: DeleteUserDataInput,
  condition?: ModelUserDataConditionInput | null,
};

export type DeleteUserDataMutation = {
  deleteUserData?:  {
    __typename: "UserData",
    id: string,
    email: string,
    devices?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type GetUserDataQueryVariables = {
  id: string,
};

export type GetUserDataQuery = {
  getUserData?:  {
    __typename: "UserData",
    id: string,
    email: string,
    devices?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type ListUserDataQueryVariables = {
  filter?: ModelUserDataFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserDataQuery = {
  listUserData?:  {
    __typename: "ModelUserDataConnection",
    items?:  Array< {
      __typename: "UserData",
      id: string,
      email: string,
      devices?: Array< string | null > | null,
      createdAt: string,
      updatedAt: string,
      owner?: string | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateUserDataSubscriptionVariables = {
  owner: string,
};

export type OnCreateUserDataSubscription = {
  onCreateUserData?:  {
    __typename: "UserData",
    id: string,
    email: string,
    devices?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnUpdateUserDataSubscriptionVariables = {
  owner: string,
};

export type OnUpdateUserDataSubscription = {
  onUpdateUserData?:  {
    __typename: "UserData",
    id: string,
    email: string,
    devices?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};

export type OnDeleteUserDataSubscriptionVariables = {
  owner: string,
};

export type OnDeleteUserDataSubscription = {
  onDeleteUserData?:  {
    __typename: "UserData",
    id: string,
    email: string,
    devices?: Array< string | null > | null,
    createdAt: string,
    updatedAt: string,
    owner?: string | null,
  } | null,
};
