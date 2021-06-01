import React, { useRef, useState } from 'react';
import Filter from '../../images/filter.png';
import arrow from '../../images/arrow.png';
import closeClicker from '../../utils/DisClicker';
import './TableFilter.scss';

const TableFilter = ({ setSelected, options, selected }) => {
  const ref = useRef();
  const [showOptions, setShowOptions] = useState(false);
  closeClicker(ref, () => {
    setShowOptions(false);
  });

  const selectFilter = (item) => {
    setSelected(item);
    setShowOptions(false);
  };

  return (
    <div className="d-flex align-items-center table-filter-container mb-2">
      <div
        className="d-flex align-items-center table-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setShowOptions(!showOptions);
        }}
      >
        <img className="mr-2" src={Filter} alt="" />
        <div className="mr-3 label">{selected.label}</div>
        <img src={arrow} alt="" />
      </div>
      {showOptions && (
        <div className="table-selected-filter" ref={ref}>
          {options.map((el) => (
            // eslint-disable-next-line react/jsx-key
            <span
              className={`${el === selected && 'selected'}`}
              value={el}
              onClick={() => selectFilter(el)}
            >
              {el.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

TableFilter.propTypes = {
  options: PropTypes.any,
  selected: PropTypes.any,
  setSelected: PropTypes.Object,
};

export default TableFilter;
