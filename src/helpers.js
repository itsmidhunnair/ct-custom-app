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

const getDescriptionFromPayload = (payload) => ({
  description: transformLocalizedStringToLocalizedField(payload.description),
});

const convertAction = (actionName, actionPayload) => ({
  [actionName]:
    actionName === 'changeName'
      ? getNameFromPayload(actionPayload)
      : actionName === 'setDescription'
      ? getDescriptionFromPayload(actionPayload)
      : actionPayload,
});

/**
 * will format the array of action object with the Graphql accepted form
 *
 * @param {{"action": "changeName","name": {"en": "Waterproof Photo Housing by Seasheller","de": "Wasserdichtes Foto Gehäuse von Seashell","hi-IN": ""}}}
 *
 * @return {[{"changeName": {"name": [{"locale": "de","value": "Wasserdichtes Foto Gehäuse von Seashell"},{"locale": "en","value": "Waterproof Photo Housing by Seasheller"},{"locale": "hi-IN","value": ""}]}}]}
 *
 */
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
  description: transformLocalizedFieldToLocalizedString(
    draft.descriptionAllLocales || []
  ),
});

// /**
//  * To Toggle Values from array update the state variable with the new value
//  *
//  * @param {{array:Array, setArray:Function, value:String}}
//  */
// export const toggleElementFromArray = ({ array, setArray, value }) => {
//   const newArr = array.includes(value)
//     ? array.filter((id) => id !== value)
//     : [...array, value];
//   setArray(newArr);
// };

/**
 * To Toggle Values from array update the state variable with the new value
 *
 * @param {{array:Array, setArray:Function, value:{id:String, version:Int}}}
 */
export const toggleElementFromArray = ({ array, setArray, value }) => {
  const newArr = array.some((arr) => {
    if (arr.id === value.id) {
      return true;
    } else {
      return false;
    }
  })
    ? array.filter((arr) => arr.id !== value.id)
    : [...array, value];
  console.log(
    '🚀 ~ file: helpers.js:71 ~ toggleElementFromArray ~ newArr:',
    newArr
  );
  setArray(newArr);
};

/**
 * To format UTC date Time String
 *
 * @param date String
 *
 * @return {formatedDate} String
 *
 */
export const formatDateTime = (date) => {
  const formatedDate = new Date(date);
  return `${formatedDate.toDateString()} ${
    formatedDate.toTimeString().split(' ')[0]
  }`;
};
