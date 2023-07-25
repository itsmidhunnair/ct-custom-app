import React from 'react';
import SpacingsInline from '@commercetools-uikit/spacings-inline';
import {} from '@commercetools-uikit/icon-button';
import { BinLinearIcon, DotIcon } from '@commercetools-uikit/icons';
import PropTypes from 'prop-types';
/**
 * Option Component of the Action Select Tag in listing Page
 * @param {{label:String, type:('publish' | 'unpublish' | 'delete' | 'disabled')}}
 */
export const ActionSelectOption = ({ label, type }) => {
  return (
    <>
      <SpacingsInline alignItems="center">
        {type === 'delete' || label === 'Delete' ? (
          <BinLinearIcon
            size="medium"
            color={type === 'delete' ? 'solid' : 'neutral60'}
          />
        ) : (
          <DotIcon
            color={`${
              type === 'publish'
                ? 'primary40'
                : type === 'unpublish'
                ? 'error'
                : 'neutral60'
            }`}
            size="small"
          />
        )}
        <SpacingsInline>{label}</SpacingsInline>
      </SpacingsInline>
    </>
  );
};

ActionSelectOption.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['publish', 'unpublish', 'delete', 'disabled'])
    .isRequired,
};
