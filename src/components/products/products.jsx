import { ContentNotification } from '@commercetools-uikit/notifications';
import React, { useEffect } from 'react';
import {
  formatDateTime,
  getErrorMessage,
  toggleElementFromArray,
} from '../../helpers';
import { useProductsFetcher } from '../../hooks/use-products-connector';
import Text from '@commercetools-uikit/text';
import DataTable from '@commercetools-uikit/data-table';
import Stamp from '@commercetools-uikit/stamp';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import Spacings from '@commercetools-uikit/spacings';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import { Pagination } from '@commercetools-uikit/pagination';
import {
  useDataTableSortingState,
  usePaginationState,
} from '@commercetools-uikit/hooks';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import {
  Switch,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import ChannelDetails from '../channel-details';
import useLocalLang from '../../hooks/use-local-lang/useLocalLang';
import { useState } from 'react';
import SelectInput from '@commercetools-uikit/select-input';
import Grid from '@commercetools-uikit/grid';
import { BinLinearIcon, DotIcon } from '@commercetools-uikit/icons';
import { ActionSelectOption } from './constants/components';
import { useUpdateAction } from '../../hooks/use-products-connector/use-products-connector';
import { useShowNotification } from '@commercetools-frontend/actions-global';
import {
  DOMAINS,
  NOTIFICATION_KINDS_SIDE,
} from '@commercetools-frontend/constants';
import SelectableSearchInput from '@commercetools-uikit/selectable-search-input';
import useURLQuery from '../../hooks/common/useURLQuery';

const Products = () => {
  const { page, perPage } = usePaginationState();
  const tableSorting = useDataTableSortingState({
    key: 'key',
    order: 'asc',
  });

  const [action, setAction] = useState();
  const [selectedProduct, setSelectedProduct] = useState([]);
  const { push } = useHistory();
  const match = useRouteMatch();
  console.log('🚀 ~ file: products.jsx:56 ~ Products ~ match:', match);

  const urlQuery = useURLQuery();
  // console.log('🚀 ~ file: products.jsx:51 ~ Products ~ search:', urlQuery.get("demo"));

  const showNotification = useShowNotification();

  const { getLocalName } = useLocalLang();

  const { updateProductAction } = useUpdateAction();

  const { data, error, loading } = useProductsFetcher({
    page,
    perPage,
    tableSorting,
    search: urlQuery.get('search'),
  });

  const [products, setProducts] = useState();

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  console.log('🚀 ~ file: products.jsx:67 ~ Products ~ data:', data);

  // const rows = [
  //   { id: 'parasite', title: 'Parasite', country: 'South Korea' },
  //   { id: 'portrait', title: 'Portrait of a Lady on Fire', country: 'France' },
  //   { id: 'wat', title: 'Woman at War', country: 'Iceland' },
  // ];

  const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'product_name':
        return getLocalName({
          allLocales: item.nameAllLocales,
          key: 'name',
        });
      case 'product_type':
        return item.productType.name;
      case 'key':
        return item.key;
      case 'status':
        return (
          <Stamp
            tone={
              item.hasStagedChanges
                ? 'warning'
                : item.published
                ? 'primary'
                : 'critical'
            }
            label={
              item.hasStagedChanges
                ? 'Modified'
                : item.published
                ? 'Published'
                : 'Unpublished'
            }
          />
        );
      case 'createdAt':
        return formatDateTime(item.createdAt);
      case 'lastModifiedAt':
        return formatDateTime(item.lastModifiedAt);

      default:
        break;
    }
  };

  const columns = [
    {
      key: 'checkbox',
      label: (
        <CheckboxInput
          isIndeterminate={
            selectedProduct.length < perPage.value && selectedProduct.length > 0
          }
          isChecked={selectedProduct.length === perPage.value}
          onChange={(e) => {
            if (e.target.checked) {
              const ids = products.results.map((item) => ({
                id: item.id,
                version: item.version,
                isPublished: item.published,
              }));
              setSelectedProduct(ids);
            } else {
              setSelectedProduct([]);
            }
          }}
        />
      ),
      shouldIgnoreRowClick: true,
      align: 'center',
      renderItem: (row) => (
        <CheckboxInput
          isChecked={selectedProduct.some((prod) => prod.id === row.id)}
          onChange={() => {
            toggleElementFromArray({
              array: selectedProduct,
              setArray: setSelectedProduct,
              value: {
                id: row.id,
                version: row.version,
                isPublished: row.published,
                stagedChanges: row.hasStagedChanges,
              },
            });
          }}
        />
      ),
      disableResizing: true,
    },

    { key: 'product_name', label: 'Product Name' },
    { key: 'product_type', label: 'Product Type' },
    { key: 'key', label: 'Product Key', isSortable: true },
    { key: 'status', label: 'Status' },
    { key: 'createdAt', label: 'Date Created', isSortable: true },
    { key: 'lastModifiedAt', label: 'Date Modified', isSortable: true },
  ];

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

  return (
    <Spacings.Stack scale="l">
      <Spacings.Inline alignItems="flex-end" scale="s">
        <Text.Headline as="h2">Products</Text.Headline>
        <Text.Body as="span">{products?.total} results</Text.Body>
      </Spacings.Inline>
      <Spacings.Stack>
        {' '}
        <SelectableSearchInput
          value={{ text: urlQuery.get('search') }}
          onSubmit={(val) => {
            push(`?search=${val.text}`);
          }}
          onReset={() => {
            push(match.url);
          }}
          options={[
            { value: 'one', label: 'One' },
            { value: 'two', label: 'Two' },
          ]}
        />
      </Spacings.Stack>
      <SpacingsInline justifyContent="space-between">
        <SpacingsInline alignItems="center">
          <div
            style={{
              width: '200px',
            }}
          >
            <SelectInput
              name="action"
              value={selectedProduct.length > 0 && action}
              options={[
                {
                  value: 'publish',
                  label: (
                    <ActionSelectOption
                      label="Published"
                      type={selectedProduct.length > 0 && 'publish'}
                    />
                  ),
                  isDisabled: selectedProduct.length === 0,
                },
                {
                  value: 'unpublish',
                  label: (
                    <ActionSelectOption
                      label="Unpublished"
                      type={selectedProduct.length > 0 && 'unpublish'}
                    />
                  ),
                  isDisabled: selectedProduct.length === 0,
                },
                {
                  value: 'delete',
                  label: (
                    <ActionSelectOption
                      label="Delete"
                      type={selectedProduct.length > 0 && 'delete'}
                    />
                  ),
                  isDisabled: selectedProduct.length === 0,
                },
              ]}
              onChange={async (e) => {
                try {
                  setAction(e.target.value);
                  await updateProductAction({
                    action: e.target.value,
                    products: selectedProduct,
                  });
                  // refetch();
                  setSelectedProduct([]);
                  setAction();
                  showNotification({
                    kind: NOTIFICATION_KINDS_SIDE.success,
                    domain: DOMAINS.SIDE,
                    text: 'Product status updated successfully!',
                  });
                } catch (error) {
                  showNotification({
                    kind: NOTIFICATION_KINDS_SIDE.error,
                    domain: DOMAINS.SIDE,
                    text: error || 'Some Error Occured',
                  });
                }
              }}
            ></SelectInput>
          </div>
          {selectedProduct.length > 0 && (
            <>
              <Text.Detail tone="primary">{selectedProduct.length}</Text.Detail>
              <Text.Detail>product selected</Text.Detail>
            </>
          )}
        </SpacingsInline>
      </SpacingsInline>
      <Spacings.Stack scale="xs">
        {products ? (
          <>
            <DataTableManager columns={columns}>
              <DataTable
                rows={products.results}
                columns={columns}
                itemRenderer={(item, column) => itemRenderer(item, column)}
                sortedBy={tableSorting.key}
                sortDirection={tableSorting.order}
                onSortChange={tableSorting.onChange}
                onRowClick={(row) => {
                  push(`${match.url}/${row.id}`);
                }}
              ></DataTable>
            </DataTableManager>
            <Pagination
              totalItems={products.total}
              page={page.value}
              perPage={perPage.value}
              onPageChange={page.onChange}
              onPerPageChange={perPage.onChange}
            />
          </>
        ) : null}
      </Spacings.Stack>
    </Spacings.Stack>
  );
};

export default Products;
