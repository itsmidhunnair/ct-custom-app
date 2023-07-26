import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import { transformLocalizedFieldToLocalizedString } from '@commercetools-frontend/l10n';

export const docToFormValues = (product, languages) => ({
  key: product?.key ?? '',
  name: LocalizedTextInput.createLocalizedString(
    languages,
    transformLocalizedFieldToLocalizedString(
      product?.masterData.staged.nameAllLocales ?? []
    )
  ),
  description: LocalizedTextInput.createLocalizedString(
    languages,
    transformLocalizedFieldToLocalizedString(
      product?.masterData.staged.descriptionAllLocales ?? []
    )
  ),
});

export const formValuesToDoc = (formValues) => ({
  key: formValues.key,
  name: LocalizedTextInput.omitEmptyTranslations(formValues.name),
  description: LocalizedTextInput.omitEmptyTranslations(formValues.description),
});
