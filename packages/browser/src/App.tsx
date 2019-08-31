import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Count() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();
  const addByOne = useCallback(() => {
    dispatch({ type: 'count/addBy', payload: 1 })
  });
  const addByOneAsync = useCallback(() => {
    dispatch({ type: 'count/addByAsync' })
  });

  return (
    <div>
      <h1>The count is: {count}</h1>
      <button onClick={addByOne}>Add 1</button>
      <button onClick={addByOneAsync}>Add 1 Async</button>
    </div>
  )
}

export default Count;
