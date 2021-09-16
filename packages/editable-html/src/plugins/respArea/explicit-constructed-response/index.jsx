import React from 'react';
import PropTypes from 'prop-types';

const ExplicitConstructedResponse = props => {
  const { attributes, value, index } = props;
  return (
    <span
      {...attributes}
      style={{
        display: 'inline-flex',
        minHeight: '50px',
        minWidth: '178px',
        position: 'relative',
        margin: '0 5px',
        cursor: 'pointer'
      }}
    >
        <span style={{
            width: '30px',
            height: '30px',
            background: '#C4C4C4',
            borderRadius: '50%',
            position: 'absolute',
            left: '-5px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontWeight: '700',
            fontSize: '12',
            font: 'Roboto'

        }}
        >{Number(index)+Number(1)}</span>
      <div
        style={{
          display: 'inline-flex',
          minWidth: '150px',
          minHeight: '30px',
          height: '30px',
          background: '#FFF',
          border: '1px solid #C0C3CF',
          boxSizing: 'border-box',
          borderRadius: '15px',
          overflow: 'hidden',
          padding: '5px',
          paddingLeft: '25px'
        }}
        dangerouslySetInnerHTML={{
          __html: value || '<div>&nbsp;</div>'
        }}
      />
    </span>
  );
};

ExplicitConstructedResponse.propTypes = {
  attributes: PropTypes.object,
  value: PropTypes.object,
  index: PropTypes.number
};

export default ExplicitConstructedResponse;
