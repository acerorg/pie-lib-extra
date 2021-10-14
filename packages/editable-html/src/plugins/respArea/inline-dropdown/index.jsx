import React from 'react';
import PropTypes from 'prop-types';
import { Chevron } from '../icons';

const InlineDropdown = ({ attributes, selectedItem, index }) => {
  // TODO: Investigate
  // Needed because items with values inside have different positioning for some reason
  const html = selectedItem || '<div>&nbsp</div>';

  return (
    <span
      {...attributes}
      style={{
        display: 'inline-flex',
        height: '50px',
        margin: '0 5px',
        cursor: 'pointer'
      }}
    >
         <span style={{
             width: '30px',
             height: '30px',
             background: '#DDDDDD',
             borderRadius: '50%',
             position: 'absolute',
             display: 'flex',
             justifyContent: 'center',
             alignItems: 'center',
             fontWeight: '700',
             fontSize: '12',
             font: 'Roboto',
             zIndex: '1'
         }}
         >{Number(index)+Number(1)}</span>
      <div
        style={{
            display: 'inline-flex',
            minWidth: '150px',
            height: '30px',
            background: '#FFF',
            border: '1px solid #C0C3CF',
            boxSizing: 'border-box',
            borderRadius: '15px',
            overflow: 'hidden',
            paddingTop: '0',
            padding: '5px',
            paddingLeft: '30px',
            position: 'relative'
        }}
      >
        <div
          style={{
            flex: 1,
            overflow: 'hidden',
            padding: '0 25px 0 8px',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
          dangerouslySetInnerHTML={{
            __html: html
          }}
        />
        <Chevron
          direction="down"
          style={{
            position: 'absolute',
            top: '5px',
            right: '5px'
          }}
        />
      </div>
    </span>
  );
};

InlineDropdown.propTypes = {
  attributes: PropTypes.object,
  selectedItem: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
};

export default InlineDropdown;
