// TypeScript types for GraphQL schema

export type Message = {
  id: string;
  content: string;
  sender: string;
  createdAt: string;
};

export type NewModelName = {
  id: string;
  name?: string | null;
};

export type NewModelNameConnection = {
  items?: Array<NewModelName | null> | null;
  nextToken?: string | null;
};

export type CreateNewModelNameInput = {
  name?: string | null;
};

export type UpdateNewModelNameInput = {
  id: string;
  name?: string | null;
};

export type DeleteNewModelNameInput = {
  id: string;
};

export type TableNewModelNameFilterInput = {
  id?: TableIDFilterInput | null;
  name?: TableStringFilterInput | null;
};

export type TableIDFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  size?: ModelSizeInput | null;
};

export type TableStringFilterInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  size?: ModelSizeInput | null;
};

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

