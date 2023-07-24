import {
  transformLocalizedStringToLocalizedField,
  transformLocalizedFieldToLocalizedString,
  formatLocalizedString,
} from '@commercetools-frontend/l10n';

export const getErrorMessage = (error) =>
  error.graphQLErrors?.map((e) => e.message).join('\n') || error.message;

export const extractErrorFromGraphQlResponse = (graphQlResponse) => {
  if (
    typeof graphQlResponse.networkError?.result !== 'string' &&
    graphQlResponse.networkError?.result?.errors?.length > 0
  ) {
    return graphQlResponse.networkError.result.errors;
  }

  if (graphQlResponse.graphQLErrors?.length > 0) {
    return graphQlResponse.graphQLErrors;
  }

  return graphQlResponse;
};

const getNameFromPayload = (payload) => ({
  name: transformLocalizedStringToLocalizedField(payload.name),
});

const convertAction = (actionName, actionPayload) => ({
  [actionName]:
    actionName === 'changeName'
      ? getNameFromPayload(actionPayload)
      : actionPayload,
});

export const createGraphQlUpdateActions = (actions) =>
  actions.reduce(
    (previousActions, { action: actionName, ...actionPayload }) => [
      ...previousActions,
      convertAction(actionName, actionPayload),
    ],
    []
  );

export const convertToActionData = (draft) => ({
  ...draft,
  name: transformLocalizedFieldToLocalizedString(draft.nameAllLocales || []),
});

/**
 * To Toggle Values from array update the state variable with the new value
 *
 * @param {{array:Array, setArray:Function, value:String}}
 */
export const toggleElementFromArray = ({ array, setArray, value }) => {
  const newArr = array.includes(value)
    ? array.filter((id) => id !== value)
    : [...array, value];
  setArray(newArr);
};
