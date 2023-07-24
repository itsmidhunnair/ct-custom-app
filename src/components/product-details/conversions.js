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
      product?.masterData.staged.desc ?? []
    )
  ),
  status: product?.masterData.published
    ? 'published'
    : product?.masterData.hasStagedChanges
    ? 'modified'
    : 'unpublished',

  createdAt: `${new Date(product?.createdAt).toDateString()} ${
    new Date(product?.createdAt).toTimeString().split(' ')[0]
  }`,
  lastModifiedAt: `${new Date(product?.lastModifiedAt).toDateString()} ${
    new Date(product?.lastModifiedAt).toTimeString().split(' ')[0]
  }`,
});

export const formValuesToDoc = (formValues) => ({
  key: formValues.key,
  roles: formValues.roles,
  name: LocalizedTextInput.omitEmptyTranslations(formValues.name),
});
