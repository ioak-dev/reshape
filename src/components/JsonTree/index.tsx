import React, { useState, useEffect } from 'react';
import './style.scss';
import JsonString from './JsonString';
import JsonObject from './JsonObject';
import JsonArray from './JsonArray';
import JsonValue from './JsonValue';

interface Props {
  element: any;
  data: any;
  expand: boolean;
}

const JsonTree = (props: Props) => {
  const [expand, setExpand] = useState(true);
  useEffect(() => {
    setExpand(props.expand);
  }, [props.expand]);
  return (
    <div className="json-tree">
      {typeof props.data === 'string' && (
        <JsonString element={props.element} data={props.data} />
      )}
      {typeof props.data === 'number' && (
        <JsonValue element={props.element} data={props.data} />
      )}
      {typeof props.data === 'object' && !Array.isArray(props.data) && (
        <JsonObject element={props.element} data={props.data} expand={expand} />
      )}
      {Array.isArray(props.data) && (
        <JsonArray element={props.element} data={props.data} expand={expand} />
      )}
    </div>
  );
};

export default JsonTree;
