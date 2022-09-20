import { createElement } from 'react';

type InputErrorProps = {
  msg: string;
};

const InputError: React.FunctionComponent<InputErrorProps> = ({ msg }) =>
  createElement('span', { className: 'text-sm text-red-500' }, msg);

export default InputError;
