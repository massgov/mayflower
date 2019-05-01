import { text, boolean, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

export default {
  hiddenLabel: (index) => boolean(`InputNumber ${index}: hiddenLabel`, false, `InputNumber ${index}`),
  labelText: (index) => text(`InputNumber ${index}: labelText`, 'Number Input', `InputNumber ${index}`),
  required: (index) => boolean(`InputNumber ${index}: required`, false, `InputNumber ${index}`),
  inline: (index) => boolean(`InputNumber ${index}: inline`, false, `InputNumber ${index}`),
  disabled: (index) => boolean(`InputNumber ${index}: disabled`, false, `InputNumber ${index}`),
  name: (index) => text(`InputNumber ${index}: name`, 'number-input', `InputNumber ${index}`),
  width: (index) => number(`InputNumber ${index}: width`, 0, {}, `InputNumber ${index}`),
  maxlength: (index) => number(`InputNumber ${index}: maxlength`, 20, {}, `InputNumber ${index}`),
  placeholder: (index) => text(`InputNumber ${index}: placeholder`, '0', `InputNumber ${index}`),
  errorMsg: (index) => text(`InputNumber ${index}: errorMsg`, 'you did not type something', `InputNumber ${index}`),
  defaultValue: (index) => number(`InputNumber ${index}: defaultValue`, null, {}, `InputNumber ${index}`),
  max: (index) => number(`InputNumber ${index}: max`, 100, {}, `InputNumber ${index}`),
  min: (index) => number(`InputNumber ${index}: min`, 0, {}, `InputNumber ${index}`),
  step: (index) => number(`InputNumber ${index}: step`, 1, {}, `InputNumber ${index}`),
  onChange: (index) => action('onChange'),
  onBlur: (index) => action('onBlur'),
  unit: (index) => text(`InputNumber ${index}: unit`, '%', `InputNumber ${index}`),
  showButtons: (index) => boolean(`InputNumber ${index}: showButtons`, true, `InputNumber ${index}`)
};
