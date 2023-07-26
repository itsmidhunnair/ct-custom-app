import SecondaryButton from '@commercetools-uikit/secondary-button';
import PrimaryButton from '@commercetools-uikit/primary-button';
import PropTypes from 'prop-types';

const SaveToolBar = ({ reset }) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          maxWidth: '800px',
          padding: '0 10px',
          position: 'absolute',
          margin: '0 auto',
          inset: 'auto 0 0 0',
          zIndex: '1000',
        }}
      >
        <div
          style={{
            width: '100%',
            background: '#213c45',
            color: 'white',
            borderRadius: '8px 8px 0 0',
            padding: '12px 15px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <SecondaryButton
            title="Cancle"
            label="Cancle"
            onClick={() => reset()}
          />
          <PrimaryButton type="submit" title="Save" label="Save" />
        </div>
      </div>
    </>
  );
};

SaveToolBar.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default SaveToolBar;
