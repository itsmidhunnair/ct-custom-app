import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import LocalizedTextInput from '@commercetools-uikit/localized-text-input';
import Text from '@commercetools-uikit/text';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';
import Label from '@commercetools-uikit/label';
import FieldLabel from '@commercetools-uikit/field-label';
import useLocalLang from '../../../../hooks/use-local-lang/useLocalLang';
import TextField from '@commercetools-uikit/text-field';
import messages from '../../messages';
import { Formik, useFormik } from 'formik';
import { docToFormValues } from '../../conversions';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import Spacings from '@commercetools-uikit/spacings';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import TextInput from '@commercetools-uikit/text-input';

const GeneralInformation = ({ data }) => {
  const intl = useIntl();

  return (
    <>
      <CollapsiblePanel
        condensed
        // isClosed={this.state.isPanelOpen}
        // onToggle={this.togglePanel}
        header="General Information"
      >
        <div style={{ width: '100%' }}>
          {/* <TextField
        name="key"
        title={intl.formatMessage(messages.productKeyLabel)}
        value={formik.values.key}
        // title="{intl.formatMessage(messages.channelKeyLabel)}"
      /> */}
          <Spacings.Stack>
            <Spacings.Stack scale="s">
              <FieldLabel
                hasRequiredIndicator
                title={intl.formatMessage(messages.productNameLabel)}
                description={intl.formatMessage(messages.productNameLabelDesc)}
              />
              <LocalizedTextInput
                name="name"
                value={data.values.name}
                selectedLanguage="en"
                onChange={data.handleChange}
                />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <FieldLabel
                hasRequiredIndicator
                title={intl.formatMessage(messages.productDescriptionLabel)}
                description={intl.formatMessage(
                  messages.productDescriptionLabelDesc
                  )}
                  />
              <LocalizedTextInput
                name="description"
                value={data.values.description}
                selectedLanguage="en"
                onChange={data.handleChange}
                />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <FieldLabel
                hasRequiredIndicator
                title={intl.formatMessage(messages.productKeyLabel)}
                description={intl.formatMessage(messages.productKeyLabelDesc)}
              />
              <TextInput
                name="key"
                value={data.values.key}
                touched={data.touched.key}
                onChange={data.handleChange}
              />
            </Spacings.Stack>
            <Spacings.Stack scale="s">
              <FieldLabel
                hasRequiredIndicator
                title={intl.formatMessage(messages.productKeyLabel)}
                description={intl.formatMessage(messages.productKeyLabelDesc)}
              />
              <TextInput
                name="key"
                value={data.values.key}
                touched={data.touched.key}
                onChange={data.handleChange}
              />
            </Spacings.Stack>
          </Spacings.Stack>
        </div>
      </CollapsiblePanel>
    </>
  );
};

GeneralInformation.propTypes = {
  data: PropTypes.object.isRequired,
};

export default GeneralInformation;
