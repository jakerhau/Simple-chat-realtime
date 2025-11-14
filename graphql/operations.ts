// GraphQL Operations for AWS AppSync

export const listMessages = /* GraphQL */ `
  query ListMessages {
    listMessages {
      id
      content
      sender
      createdAt
    }
  }
`;

export const sendMessage = /* GraphQL */ `
  mutation SendMessage($content: String!, $sender: String!) {
    sendMessage(content: $content, sender: $sender) {
      id
      content
      sender
      createdAt
    }
  }
`;

export const onSendMessage = /* GraphQL */ `
  subscription OnSendMessage {
    onSendMessage {
      id
      content
      sender
      createdAt
    }
  }
`;

export const getNewModelName = /* GraphQL */ `
  query GetNewModelName($id: ID!) {
    getNewModelName(id: $id) {
      id
      name
    }
  }
`;

export const listNewModelNames = /* GraphQL */ `
  query ListNewModelNames($filter: TableNewModelNameFilterInput, $limit: Int, $nextToken: String) {
    listNewModelNames(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`;

export const createNewModelName = /* GraphQL */ `
  mutation CreateNewModelName($input: CreateNewModelNameInput!) {
    createNewModelName(input: $input) {
      id
      name
    }
  }
`;

export const updateNewModelName = /* GraphQL */ `
  mutation UpdateNewModelName($input: UpdateNewModelNameInput!) {
    updateNewModelName(input: $input) {
      id
      name
    }
  }
`;

export const deleteNewModelName = /* GraphQL */ `
  mutation DeleteNewModelName($input: DeleteNewModelNameInput!) {
    deleteNewModelName(input: $input) {
      id
      name
    }
  }
`;

export const onCreateNewModelName = /* GraphQL */ `
  subscription OnCreateNewModelName($id: ID, $name: String) {
    onCreateNewModelName(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const onUpdateNewModelName = /* GraphQL */ `
  subscription OnUpdateNewModelName($id: ID, $name: String) {
    onUpdateNewModelName(id: $id, name: $name) {
      id
      name
    }
  }
`;

export const onDeleteNewModelName = /* GraphQL */ `
  subscription OnDeleteNewModelName($id: ID, $name: String) {
    onDeleteNewModelName(id: $id, name: $name) {
      id
      name
    }
  }
`;

