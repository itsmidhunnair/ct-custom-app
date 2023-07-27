import PropTypes from 'prop-types';

import {
  PageContentWide,
  TabHeader,
  TabularModalPage,
} from '@commercetools-frontend/application-components';

import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import AsyncSelectInput from '@commercetools-uikit/async-select-input';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';

import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';

import { Route, Switch, useParams, useRouteMatch } from 'react-router';
import { useProductDetailsFetcher } from '../../hooks/use-products-connector';
import useLocalLang from '../../hooks/use-local-lang/useLocalLang';
import GeneralInformation from './sub-form/general/general-information';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import { docToFormValues, formValuesToDoc } from './conversions';
import { useFormik } from 'formik';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import Label from '@commercetools-uikit/label';
import SelectInput from '@commercetools-uikit/select-input';
import { useState } from 'react';
import Stamp from '@commercetools-uikit/stamp';
import IconButton from '@commercetools-uikit/icon-button';
import { BinLinearIcon } from '@commercetools-uikit/icons';
import { formatDateTime } from '../../helpers';
import SaveToolBar from './sub-form/common/submitBtn';
import { useEffect } from 'react';
import {
  useProductDetailsUpdater,
  useUpdateAction,
} from '../../hooks/use-products-connector/use-products-connector';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
// import { useProductDetails } from '../../hooks/use-products-connector';

// import ProductDetialsForm from './productDetialsForm';

// import ProductVariant from './productVariant';

const ProductDetails = (props) => {
  const { id } = useParams();
  const match = useRouteMatch();

  const { product, error, loading } = useProductDetailsFetcher({ id });

  const { getLocalName } = useLocalLang();

  const productDetailUpdater = useProductDetailsUpdater();

  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale ?? '',
    projectLanguages: context.project?.languages ?? [],
  }));

  const formik = useFormik({
    initialValues: docToFormValues(product, projectLanguages),
    dataLocale: dataLocale,
    enableReinitialize: true,
    onSubmit: (values) => {
      submitFormik(values);
    },
  });

  const { updateProductAction } = useUpdateAction();
  const showNotification = useShowNotification();

  const submitFormik = async (values) => {
    const data = formValuesToDoc(values);
    console.log(
      '🚀 ~ file: product-details.jsx:66 ~ submitFormik ~ data:',
      data
    );
    try {
      const data = await productDetailUpdater.execute({
        oldDraft: product,
        newDraft: values,
      });
      console.log(
        '🚀 ~ file: product-details.jsx:78 ~ submitFormik ~ data:',
        data
      );
    } catch (error) {
      console.log(
        '🚀 ~ file: product-details.jsx:69 ~ submitFormik ~ error:',
        error
      );
    }
  };

  const [modified, setModified] = useState();

  useEffect(() => {
    setModified(
      !product?.masterData.published
        ? 'unpublish'
        : product?.masterData.hasStagedChanges
        ? 'modified'
        : 'publish'

      // product?.masterData.published
      //   ? !product?.masterData.hasStagedChanges
      //     ? 'publish'
      //     : 'modified'
      //   : 'unpublish'
    );
  }, [product]);

  console.log(
    '🚀 ~ file: product-details.jsx:27 ~ ProductDetails ~ product:',
    formik.dirty,
    formik.status,
    formik.handleChange
  );
  return (
    <>
      {loading && <LoadingSpinner />}
      {product ? (
        <TabularModalPage
          title={getLocalName({
            allLocales: product.masterData.current.nameAllLocales,
            key: 'name',
          })}
          isOpen
          onClose={props.onClose}
          formControls={
            <SpacingsInline>
              <SpacingsInline alignItems="center">
                <Text.Body>Status: </Text.Body>
                <SelectInput
                  name="status"
                  // controlShouldRenderValue={true}
                  value={modified}
                  closeMenuOnSelect
                  // showOptionGroupDivider
                  placeholder={<Stamp tone="warning" label="Modified" />}
                  onChange={async (e) => {
                    try {
                      await updateProductAction({
                        action: e.target.value,
                        products: [
                          {
                            id: product.id,
                            version: product.version,
                            isPublished: product?.masterData.published,
                            stagedChanges: product?.masterData.hasStagedChanges,
                          },
                        ],
                      });
                      showNotification({
                        kind: NOTIFICATION_KINDS_SIDE.success,
                        domain: DOMAINS.SIDE,
                        text: 'Product status updated successfully!',
                      });
                      setModified(e.target.value);
                    } catch (error) {
                      showNotification({
                        kind: NOTIFICATION_KINDS_SIDE.error,
                        domain: DOMAINS.SIDE,
                        text: error || 'Some Error Occured',
                      });
                    }
                  }}
                  options={[
                    {
                      value: 'publish',
                      label: (
                        <Stamp
                          tone="positive"
                          label="Published"
                          isCondensed={true}
                        />
                      ),
                    },
                    // {
                    //   value: 'modified',
                    //   label: <Stamp tone="warning" label="Modified" />,
                    // },
                    {
                      value: 'unpublish',
                      label: (
                        <Stamp
                          tone="critical"
                          label="Unpublished"
                          isCondensed={true}
                        />
                      ),
                    },
                  ]}
                />
              </SpacingsInline>
              {modified === 'unpublished' && (
                <IconButton icon={<BinLinearIcon />} />
              )}
            </SpacingsInline>
          }
          tabControls={
            <>
              <TabHeader to={`${match.url}`} exactPathMatch label="General" />
              <TabHeader to={`${match.url}/variant`} label="Variants" />
              <TabHeader to={`${match.url}/search`} label="Int./Ext. Search" />
              <TabHeader
                to={`${match.url}/product-selection`}
                label="Product Selection"
              />
            </>
          }
        >
          <div>
            <Spacings.Stack scale="m">
              <Switch>
                <form onSubmit={formik.handleSubmit}>
                  <Route path={`${match.url}`} exact>
                    <PageContentWide columns="2/1">
                      <GeneralInformation data={formik} />
                      <Spacings.Stack>
                        <Text.Body tone="secondary">
                          Date Created: {formatDateTime(product?.createdAt)}
                        </Text.Body>
                        <Text.Body tone="secondary">
                          Date Modified:{' '}
                          {formatDateTime(product?.lastModifiedAt)}
                        </Text.Body>
                      </Spacings.Stack>
                    </PageContentWide>
                  </Route>
                  <Route path={`${match.url}/variant`} exact>
                    {/* <ProductVariant /> */}
                  </Route>
                  <Route path={`${match.url}/search`} exact>
                    <div>Serach</div>
                  </Route>
                  <Route path={`${match.url}/product-selection`} exact>
                    <div>Product Selection</div>
                  </Route>
                  {/* <button type="submit">Submit</button> */}
                  {formik.dirty && <SaveToolBar reset={formik.handleReset} />}
                </form>
              </Switch>
            </Spacings.Stack>
          </div>
        </TabularModalPage>
      ) : (
        <></>
      )}
    </>
  );
};

ProductDetails.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ProductDetails;
