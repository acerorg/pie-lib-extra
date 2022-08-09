import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import { InputContainer } from '@pie-lib/render-ui';
import EditableHtml from '@teachforward/editable-html-tm';

import { InputCheckbox, InputRadio } from '../inputs';
import ActionDelete from '@material-ui/icons/Delete';
import ArrowRight from '@material-ui/icons/SubdirectoryArrowRight';
import IconButton from '@material-ui/core/IconButton';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const EditableHtmlContainer = withStyles(theme => ({
  labelContainer: {},
  editorHolder: {
    // marginTop: theme.spacing.unit * 1.5
  }
}))(
  ({
    label,
    classes,
    onChange,
    value,
    className,
    imageSupport,
    disabled,
    nonEmpty,
    toolbarOpts,
    fixedToolbarContainer = '',
    onBlur = () => {},
    tinyMCEApiKey = '',
    browserSpellCheck
  }) => {
    const names = classNames(classes.labelContainer, className);

    return (
      <InputContainer label={label} className={names}>
        <div>
          <EditableHtml
            markup={value || ''}
            disabled={disabled}
            nonEmpty={nonEmpty}
            onChange={onChange}
            imageSupport={imageSupport}
            className={classes.editor}
            toolbarOpts={toolbarOpts}
            fixedToolbarContainer={fixedToolbarContainer}
            onBlur={onBlur}
            tinyMCEApiKey={tinyMCEApiKey}
            browserSpellCheck={browserSpellCheck}
          />
        </div>
      </InputContainer>
    );
  }
);

const Feedback = withStyles(() => ({
  text: {
    width: '100%'
  },
  feedbackContainer: {
    position: 'relative'
  },
  arrowIcon: {
    fill: '#ccc',
    left: -56,
    position: 'absolute',
    top: 20
  }
}))(
  ({
    value,
    onChange,
    type,
    correct,
    classes,
    defaults,
    toolbarOpts,
    fixedToolbarContainer = '',
    onBlur = () => {},
    tinyMCEApiKey = '',
    browserSpellCheck
  }) => {
    if (!type || type === 'none') {
      return null;
    } else if (type === 'default') {
      return (
        <div className={classes.feedbackContainer}>
          <ArrowRight className={classes.arrowIcon} />
          <TextField
            className={classes.text}
            label="Feedback Text"
            value={correct ? defaults.correct : defaults.incorrect}
          />
        </div>
      );
    } else {
      return (
        <div className={classes.feedbackContainer}>
          <ArrowRight className={classes.arrowIcon} />
          <EditableHtmlContainer
            className={classes.text}
            label="Feedback Text"
            value={value}
            onChange={onChange}
            toolbarOpts={toolbarOpts}
            fixedToolbarContainer={fixedToolbarContainer}
            onBlur={onBlur}
            tinyMCEApiKey={tinyMCEApiKey}
            browserSpellCheck={browserSpellCheck}
          />
        </div>
      );
    }
  }
);

export class ChoiceConfiguration extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    noLabels: PropTypes.bool,
    useLetterOrdering: PropTypes.bool,
    className: PropTypes.string,
    mode: PropTypes.oneOf(['checkbox', 'radio']),
    defaultFeedback: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    nonEmpty: PropTypes.bool,
    data: PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      correct: PropTypes.bool,
      feedback: PropTypes.shape({
        type: PropTypes.string,
        value: PropTypes.string
      })
    }),
    onDelete: PropTypes.func,
    onRationaleChanged: PropTypes.func,
    onChange: PropTypes.func,
    index: PropTypes.number,
    imageSupport: PropTypes.shape({
      add: PropTypes.func.isRequired,
      delete: PropTypes.func.isRequired
    }),
    allowFeedBack: PropTypes.bool,
    allowDelete: PropTypes.bool,
    allowReorder: PropTypes.bool,
    inputToggleDisabled: PropTypes.bool,
    toolbarOpts: PropTypes.object,
    dragHandleProps: PropTypes.object,
    rationaleEnabled: PropTypes.bool,
    rationale: PropTypes.object
  };

  static defaultProps = {
    index: -1,
    noLabels: false,
    useLetterOrdering: false,
    allowFeedBack: true,
    allowDelete: true,
    allowReorder: true,
    inputToggleDisabled: false
  };

  _changeFn = key => update => {
    const { data, onChange } = this.props;
    if (onChange) {
      onChange({ ...data, [key]: update });
    }
  };

  onLabelChange = this._changeFn('label');

  onCheckedChange = event => {
    const correct = event.target.checked;
    const { data, onChange } = this.props;

    if (onChange) {
      onChange({ ...data, correct });
    }
  };

  onFeedbackValueChange = v => {
    const { data, onChange } = this.props;

    if (data.feedback.type !== 'custom') {
      return;
    }

    const fb = { ...data.feedback, value: v };

    if (onChange) onChange({ ...data, feedback: fb });
  };

  onFeedbackTypeChange = t => {
    const { data, onChange } = this.props;
    const fb = { ...data.feedback, type: t };
    if (fb.type !== 'custom') {
      fb.value = undefined;
    }

    if (onChange) onChange({ ...data, feedback: fb });
  };

  render() {
    const {
      data,
      classes,
      mode,
      onDelete,
      onRationaleChanged,
      index,
      className,
      noLabels,
      useLetterOrdering,
      imageSupport,
      disabled,
      nonEmpty,
      allowReorder,
      allowDelete,
      toolbarOpts,
      inputToggleDisabled,
      dragHandleProps,
      fixedToolbarContainer = '',
      onBlur = () => {},
      tinyMCEApiKey = '',
      rationaleEnabled,
      rationale,
      browserSpellCheck
    } = this.props;

    const InputToggle = mode === 'checkbox' ? InputCheckbox : InputRadio;
    return (
      <div className={classes.choiceConfigurationContainer}>
        <div className={classes.topRow}>
          {index > 0 && (
            <span className={classes.index} type="title">
              {useLetterOrdering ? String.fromCharCode(96 + index).toUpperCase() : index}
            </span>
          )}
          {!inputToggleDisabled && (
            <InputToggle
              className={classes.toggle}
              onChange={this.onCheckedChange}
              label={!noLabels ? 'Correct' : ''}
              checked={!!data.correct}
            />
          )}
          <div className={classes.middleColumn}>
            <EditableHtmlContainer
              label={!noLabels ? 'Label' : ''}
              value={data.label}
              onChange={this.onLabelChange}
              imageSupport={imageSupport}
              disabled={disabled}
              fixedToolbarContainer={fixedToolbarContainer}
              onBlur={onBlur}
              tinyMCEApiKey={tinyMCEApiKey}
              nonEmpty={nonEmpty}
              toolbarOpts={toolbarOpts}
              browserSpellCheck={browserSpellCheck}
            />
          </div>
        </div>
        {rationaleEnabled && (
          <InputContainer
            key={`rationale-${index}`}
            label={rationale.label}
            className={classes.rationaleHolder}
          >
            <EditableHtml
              className={classes.rationale}
              markup={data.rationale || ''}
              fixedToolbarContainer={fixedToolbarContainer}
              onBlur={onBlur}
              tinyMCEApiKey={tinyMCEApiKey}
              onChange={onRationaleChanged}
              imageSupport={imageSupport}
              browserSpellCheck={browserSpellCheck}
            />
          </InputContainer>
        )}
        <div className={classes.choiceActionsContainer}>
          {allowReorder && (
            <InputContainer className={classes.iconContainer} label={!noLabels ? 'Reorder' : ''}>
              <IconButton aria-label="reorder" className={classes.styledIcon} {...dragHandleProps}>
                <DragIndicatorIcon />
              </IconButton>
            </InputContainer>
          )}
          {allowDelete && (
            <InputContainer className={classes.iconContainer} label={!noLabels ? 'Delete' : ''}>
              <IconButton aria-label="delete" className={classes.styledIcon} onClick={onDelete}>
                <ActionDelete />
              </IconButton>
            </InputContainer>
          )}
        </div>
      </div>
    );
  }
}

const styles = theme => ({
  index: {
    padding: '12px 16px 0 0',
    fontSize: 16,
    fontWeight: 400,
    color: 'rgba(0, 0, 0, 0.87)',
    cursor: 'default'
  },
  choiceConfiguration: {},
  topRow: {
    display: 'flex',
    alignItems: 'center',
    width: 'calc(100% - 110px)',
    paddingLeft: '10px',
    paddingBottom: '13px'
  },
  value: {
    flex: '0.5',
    paddingRight: theme.spacing.unit
  },
  toggle: {
    flex: '0 1 auto'
  },
  feedback: {
    flex: '0 1 auto',
    paddingTop: theme.spacing.unit,
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: theme.spacing.unit * 3
  },
  feedbackIcon: {
    margin: 0,
    paddingLeft: 0,
    width: 'inherit'
  },
  styledIcon: {
    margin: 0,
    width: 'inherit'
  },
  iconContainer: {
    flex: '0 1 auto',
    paddingTop: theme.spacing.unit,
    paddingLeft: 0,
    margin: 0
  },
  middleColumn: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: 'calc(100% - 110px)'
  },
  rationaleHolder: {
    width: '67%',
    margin: '0 3%',
    flex: 'none'
  },
  choiceActionsContainer: {
    background: '#FAFAFA',
    borderLeft: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '0px 4px 4px 0px',
    position: 'absolute',
    height: '100%',
    top: '0',
    right: '0',
    display: 'flex',
    alignItems: 'center'
  },
  choiceConfigurationContainer: {
    width: '100%',
    position: 'relative',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  }
});

export default withStyles(styles)(ChoiceConfiguration);
