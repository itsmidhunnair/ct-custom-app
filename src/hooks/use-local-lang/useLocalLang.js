import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';

const useLocalLang = () => {
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));

  /**
   * To get localized String of name
   * @param {{allLocales:Object,key:String}}
   */
  const getLocalName = ({ allLocales, key }) =>
    formatLocalizedString(
      { name: transformLocalizedFieldToLocalizedString(allLocales) },
      {
        key: key,
        locale: dataLocale,
        fallbackOrder: projectLanguages,
        fallback: NO_VALUE_FALLBACK,
      }
    );
  return { getLocalName };
};

export default useLocalLang;
