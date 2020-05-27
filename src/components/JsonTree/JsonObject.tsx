import React, { useState, useEffect } from 'react';
import './style.scss';
import JsonString from './JsonString';
import JsonArray from './JsonArray';
import JsonValue from './JsonValue';

interface Props {
  element: string;
  data: any;
  expand: boolean;
}

const JsonObject = (props: Props) => {
  const [expand, setExpand] = useState(false);
  useEffect(() => setExpand(props.expand), [props.expand]);
  return (
    <div className="json-object">
      <div className="key-group">
        {props.element ? `${props.element}: {` : '{'}
        <i className="material-icons" onClick={() => setExpand(!expand)}>
          {expand ? 'remove' : 'add'}
        </i>
      </div>
      {expand &&
        props.data &&
        Object.keys(props.data).map(item => (
          <>
            {typeof props.data[item] === 'string' && (
              <JsonString element={item} data={props.data[item]} />
            )}
            {typeof props.data[item] === 'number' && (
              <JsonValue element={item} data={props.data[item]} />
            )}
            {typeof props.data[item] === 'object' &&
              !Array.isArray(props.data[item]) && (
                <JsonObject
                  element={item}
                  data={props.data[item]}
                  expand={expand}
                />
              )}
            {Array.isArray(props.data[item]) && (
              <JsonArray
                element={item}
                data={props.data[item]}
                expand={expand}
              />
            )}
          </>
        ))}
      {'}'}
    </div>
  );
};

export default JsonObject;
