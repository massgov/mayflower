import React from 'react';
import classnames from 'classnames';
import Label from 'MayflowerReactForms/Label';

const Input = (props) => {
  const {
    type,
    id,
    className = '',
    WrapperElement = 'div',
    label = null,
    ...rest
  } = props;
  const restrictedClassNames = [
    'ma__input-checkbox',
    'ma__input-number',
    'ma__input-radio'
  ];
  const filteredClassNames = className
    .split(' ')
    .filter((elementClass) => !restrictedClassNames.includes(elementClass))
    .join(' ');
  const wrapperClassNames = classnames(filteredClassNames, {
    'ma__input-number': type === 'number',
    'ma__input-radio--outline': type === 'radio',
    'ma__input-checkbox': type === 'checkbox'
  });
  const labelClassNames = classnames({
    'ma__input-radio--outline__label': type === 'radio'
  });
  const inputClassNames = classnames({
    'ma__input-radio--outline__control': type === 'radio'
  });
  return(
    <WrapperElement className={wrapperClassNames}>
      <input {...rest} id={id} type={type} className={inputClassNames} />
      {label && <Label inputId={id} className={labelClassNames}>{label}</Label>}
    </WrapperElement>
  );
};

export default Input;
