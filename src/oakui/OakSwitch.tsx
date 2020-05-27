import React, { ReactNode, useState } from 'react';
import './styles/oak-switch.scss';
import OakIcon from './OakIcon';
import OakButton from './OakButton';

interface Props {
  data: string;
  variant?: string;
  theme: string;
  objects: any;
  handleChange: Function;
}

const OakSwitch = (props: Props) => {
  const getStyle = () => {
    let style = props.theme ? props.theme : '';
    style += props.variant ? ` ${props.variant}` : '';
    return style;
  };

  const handleChange = (event, checkedState) => {
    event.target.value = checkedState;
    props.handleChange(event);
  };

  return (
    <div className={`oak-switch ${getStyle()}`}>
      {props.objects.map(item => (
        <div
          key={item.key}
          className={`radio-item ${
            item.key === props.data ? 'selected' : 'unchecked'
          }`}
          onClick={event => handleChange(event, item.key)}
        >
          {item.value}
        </div>
      ))}
    </div>
  );
};

export default OakSwitch;
