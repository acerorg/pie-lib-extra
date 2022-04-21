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
    marginRight: '5px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    padding: '0px',
    display: 'flex',
    flexDirection: 'column',
    '& .mce-content-body': {
      padding: '5px',
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

function EditorHtml({ classes, markup, onChange, onDone, height, width, outputFormat, onBlur, onFocus, fixedToolbarContainer }) {

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
        apiKey="jia0ekj0smryac6bkoratszcr5zks933f60faprd3b30work"
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
          external_plugins: {
            // this needs to be setup in the parent project
            tiny_mce_wiris: '/@wiris/mathtype-tinymce5/plugin.min.js'
          },
          plugins: [
            'advlist',
            'anchor',
            'autolink',
            'charmap',
            'code',
            'fullscreen',
            'help',
            'image imagetools',
            'insertdatetime',
            'link',
            'lists',
            'media',
            'paste',
            'preview',
            'print',
            'searchreplace',
            'table',
            'visualblocks',
            'wordcount'
          ],
          toolbar_mode: 'sliding',
          toolbar: [
            'bold italic underline strikethrough alignleft aligncenter alignright alignjustify table code | fullscreen',
            'formatselect link anchor',
            'outdent indent numlist bullist checklist',
            'forecolor backcolor casechange permanentpen formatpainter removeformat',
            'pagebreak',
            'charmap emoticons',
            'save print insertfile image media pageembed template',
            'a11ycheck ltr rtl',
            'showcomments addcomment searchreplace tiny_mce_wiris_formulaEditor tiny_mce_wiris_formulaEditorChemistry',
          ].join(' | '),
          htmlAllowedTags: ['.*'],
          htmlAllowedAttrs: ['.*'],
          draggable_modal: true,
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
