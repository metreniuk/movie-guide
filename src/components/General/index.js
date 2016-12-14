import React from 'react';

const BoxList = (props) => {
  let boxes = props.boxes;
  return (
    <div className="box-list">
      {boxes.map(box => (
        <div key={box.id} className="box">
          {box}
        </div>
      ))}
    </div>
  )
};

BoxList.propTypes = {
  boxes: React.PropTypes.array
};

export default BoxList;