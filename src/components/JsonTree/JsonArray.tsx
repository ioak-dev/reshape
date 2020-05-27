import React, { useState, useEffect } from 'react';
import './style.scss';
import JsonString from './JsonString';
import JsonObject from './JsonObject';

interface Props {
  element: string;
  data: any;
  expand: boolean;
}

const JsonArray = (props: Props) => {
  const [expand, setExpand] = useState(false);
  useEffect(() => setExpand(props.expand), [props.expand]);
  return (
    <div className="json-array">
      <div className="key-group">
        {props.element ? `${props.element}: [` : '['}
        <i className="material-icons" onClick={() => setExpand(!expand)}>
          {expand ? 'remove' : 'add'}
        </i>
      </div>
      {expand &&
        props.data.map(item => (
          <>
            {typeof item === 'string' && <JsonString element="" data={item} />}
            {typeof item === 'object' && !Array.isArray(item) && (
              <JsonObject element="" data={item} expand={expand} />
            )}
            {Array.isArray(item) && (
              <JsonArray element="" data={item} expand={expand} />
            )}
          </>
        ))}
      ]
    </div>
  );
};

export default JsonArray;
