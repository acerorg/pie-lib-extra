import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { withStyles } from '@material-ui/core/styles';

export const parseDegrees = html =>
  html
    // removes \(   use case: 50°
    .replace(/\\[(]/g, '')
    // removes \)   use case: 50°+m<1
    .replace(/\\[)]/g, '')
    // removes \degree  use case: 50°
    .replace(/\\degree/g, '&deg;');

const useStyles = withStyles(theme => ({
  editorWrapper: {
    marginTop: theme.spacing.unit * 2 + 5,
    marginLeft: '0px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    '& .mce-content-body': {
      padding: '10px 5px 0 5px',
      clear: 'both',
      float: 'none'
    }
  }
}));

function dataImageHandler(blobInfo, success, failure, progress) {
  progress(50);
  setTimeout(() => {
    progress(100);
    success(`data:${blobInfo.blob().type};base64,${blobInfo.base64()}`);
  }, 500);
}

function EditorHtml({ classes, markup, onChange, onDone, height, width, outputFormat, onBlur, onFocus, fixedToolbarContainer, tinyMCEApiKey, browserSpellCheck }) {

  const editorRef = useRef(null);

  const inputChange = (value, done) => {
    const htmlParsed = parseDegrees(value);

    if (value !== markup) {
      onChange && onChange(htmlParsed);
    }


    if (done && typeof onDone === 'function') {
      onDone(htmlParsed);
    }
  };

  return (
    <div className={classes.editorWrapper}>
      <Editor
        className={classes.editContainer}
        apiKey={tinyMCEApiKey || ''}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={markup}
        onBlur={onBlur}
        onFocus={onFocus}
        outputFormat={outputFormat}
        onEditorChange={inputChange}
        scriptLoading={{ async: true }}
        init={{
          height,
          width,
          menubar: '',
          inline: true,
          paste_data_images: true,
          object_resizing: true,
          automatic_uploads: false,
          fixed_toolbar_container: fixedToolbarContainer,
          browser_spellcheck: browserSpellCheck,
          external_plugins: {
            tiny_mce_wiris: '/@wiris/mathtype-tinymce5/plugin.min.js'
          },
          plugins: [
            'preview ' +
            'paste ' +
            'importcss ' +
            'searchreplace ' +
            'autolink ' +
            'directionality ' +
            'code ' +
            'visualblocks ' +
            'visualchars ' +
            'fullscreen ' +
            'image ' +
            'link ' +
            'media ' +
            'template ' +
            'codesample ' +
            'table ' +
            'charmap ' +
            'hr ' +
            'nonbreaking ' +
            'anchor ' +
            'insertdatetime ' +
            'advlist ' +
            'lists ' +
            'wordcount ' +
            'imagetools ' +
            'textpattern ' +
            'noneditable ' +
            'help ' +
            'charmap ' +
            'emoticons', +
            'tiny_mce_wiris'
          ],
          toolbar_mode: 'sliding',
          toolbar: [
            'undo',
            'redo |',
            'bold',
            'italic',
            'underline',
            'subscript',
            'superscript',
            'strikethrough |',
            'fontselect',
            'fontsizeselect',
            'formatselect |',
            'alignleft',
            'aligncenter',
            'alignright',
            'alignjustify |',
            'outdent',
            'indent |',
            'numlist',
            'bullist |',
            'forecolor',
            'backcolor',
            'removeformat |',
            'charmap',
            'emoticons |',
            'fullscreen',
            'preview',
            'insertfile |',
            'table',
            'tabledelete',
            'tableprops',
            'tablerowprops',
            'tablecellprops |',
            'tableinsertrowbefore',
            'tableinsertrowafter',
            'tabledeleterow |',
            'tableinsertcolbefore',
            'tableinsertcolafter',
            'tabledeletecol |',
            'image',
            'link',
            'unlink',
            'anchor',
            'codesample',
            'tiny_mce_wiris_formulaEditor',
            'tiny_mce_wiris_formulaEditorChemistry'
          ].join(' '),
          htmlAllowedTags: ['.*'],
          htmlAllowedAttrs: ['.*'],
          draggable_modal: true,
          contextmenu: false,
          setup: (editor) => {
            editor.on('blur', () => typeof onBlur === 'function' ? onBlur() : onBlur);
          },
          images_upload_handler: dataImageHandler,
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
    </div>
  );
}

EditorHtml.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onDone: PropTypes.func,
  markup: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
};
EditorHtml.defaultProps = {
  height: 120,
  width: 450,
  onDone: () => {}
};

export default useStyles(EditorHtml);
