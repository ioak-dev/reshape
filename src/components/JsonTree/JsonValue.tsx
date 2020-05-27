import React, { useState } from 'react';
import './style.scss';

interface Props {
  element: string;
  data: any;
}

const JsonValue = (props: Props) => {
  return (
    <div className="json-string">
      {/* {props.element ? `${props.element} : ${props.data}` : props.data} */}
      {props.element ? (
        <>
          <div className="key-string">{`"${props.element}"`}</div>:
        </>
      ) : (
        ''
      )}
      <div className="value-string">{props.data}</div>
    </div>
  );
};

export default JsonValue;
