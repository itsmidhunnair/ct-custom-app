import { ContentNotification } from '@commercetools-uikit/notifications';
import React, { useEffect } from 'react';
import { getErrorMessage, toggleElementFromArray } from '../../helpers';
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
import { Switch, useHistory, useRouteMatch } from 'react-router-dom';
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

  const showNotification = useShowNotification();

  const { getLocalName } = useLocalLang();

  const { updateProductAction } = useUpdateAction();

  const { data, error, loading, refetch } = useProductsFetcher({
    page,
    perPage,
    tableSorting,
  });

  // useEffect(() => {
  // }, []);

  // const rows = [
  //   { id: 'parasite', title: 'Parasite', country: 'South Korea' },
  //   { id: 'portrait', title: 'Portrait of a Lady on Fire', country: 'France' },
  //   { id: 'wat', title: 'Woman at War', country: 'Iceland' },
  // ];

  const itemRenderer = (item, column) => {
    switch (column.key) {
      case 'product_name':
        return getLocalName({
          allLocales: item.masterData.current.nameAllLocales,
          key: 'name',
        });
      case 'product_type':
        return item.productType.name;
      case 'key':
        return item.key;
      case 'status':
        return (
          <Stamp
            tone={item.masterData.published ? 'primary' : 'critical'}
            label={item.masterData.published ? 'Published' : 'Unpublished'}
          />
        );
      case 'createdAt':
        const date_created = new Date(item.createdAt);
        return `${date_created.toDateString()} ${
          date_created.toTimeString().split(' ')[0]
        }`;
      case 'lastModifiedAt':
        const date_modified = new Date(item.lastModifiedAt);
        return `${date_modified.toDateString()} ${
          date_modified.toTimeString().split(' ')[0]
        }`;

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
              const ids = data.results.map((item) => ({
                id: item.id,
                version: item.version,
                isPublished: item.masterData.published,
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
                isPublished: row.masterData.published,
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
      <Spacings.Stack scale="s">
        <Text.Headline as="h2">Products</Text.Headline>
        <Text.Body>All Products</Text.Body>
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
                  refetch();
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
        <SpacingsInline>
          <SelectInput></SelectInput>
        </SpacingsInline>
      </SpacingsInline>
      <Spacings.Stack scale="xs">
        {data ? (
          <>
            <DataTableManager columns={columns}>
              <DataTable
                rows={data.results}
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
              totalItems={data.total}
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
