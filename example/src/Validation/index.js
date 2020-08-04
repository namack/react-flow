import React, { useState } from 'react';

import ReactFlow, { addEdge, Handle } from 'react-flow-renderer';

import './validation.css';

const initialElements = [
  { id: '0', type: 'custominput', position: { x: 0, y: 150 } },
  { id: 'A', type: 'customnode', position: { x: 250, y: 0 } },
  { id: 'B', type: 'customnode', position: { x: 250, y: 150 } },
  { id: 'C', type: 'customnode', position: { x: 250, y: 300 } },
];

const isValidConnection = (connection) => connection.target === 'B';

const onLoad = (reactFlowInstance) => reactFlowInstance.fitView();

const onConnectStart = ({ nodeId, handleType }) => console.log('on connect start', { nodeId, handleType });

const onConnectStop = () => console.log('on connect stop');

const CustomInput = () => (
  <>
    <div>Only connectable with B</div>
    <Handle type="source" position="right" isValidConnection={isValidConnection} />
  </>
);

const CustomNode = ({ id }) => (
  <>
    <Handle type="target" position="left" isValidConnection={isValidConnection} />
    <div>{id}</div>
    <Handle type="source" position="right" isValidConnection={isValidConnection} />
  </>
);

const nodeTypes = {
  custominput: CustomInput,
  customnode: CustomNode,
};

const HorizontalFlow = () => {
  const [elements, setElements] = useState(initialElements);
  const onConnect = (params) => setElements((els) => addEdge(params, els));

  return (
    <ReactFlow
      elements={elements}
      onConnect={onConnect}
      selectNodesOnDrag={false}
      onLoad={onLoad}
      className="validationflow"
      nodeTypes={nodeTypes}
      onConnectStart={onConnectStart}
      onConnectStop={onConnectStop}
    />
  );
};

export default HorizontalFlow;
