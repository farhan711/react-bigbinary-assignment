import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import PageModal from '../PageModal/PageModal';
import PropTypes from 'prop-types';
import arrow from '../../images/arrow.png';
import calendar from '../../images/calendar.png';
import 'react-datepicker/dist/react-datepicker.css';

const DateWrapper = styled.div`
  ul {
    list-style-type: none;
    padding: 2px 16px;
  }

  li {
    padding: 7px 0px;
    cursor: pointer;
  }
  .custom-date-picker {
    mi-height: 270px;
  }
  .custom-range-picker {
    border-right: 1px solid #e4e4e7;
  }

  & .react-datepicker {
    border: 0;
  }

  & .react-datepicker__header {
    background: transparent;
    border: 0;
  }

  & .react-datepicker__day-names {
    border-top: 1px solid #e4e4e7;
    font-size: 14px;
    margin-top: 5px;
  }

  & .react-datepicker__month-container {
    margin: 0px 20px;
  }

  & .react-datepicker__day--keyboard-selected {
    background-color: #e9ecef;
    color: #000;
  }

  & .react-datepicker__day--in-selecting-range,
  & .react-datepicker__day--in-range {
    background: #e9ecef;
    color: black;
  }
`;

const TableDateFilter = ({ selected, setSelected, defaultRanges }) => {
  const [startDate, setStartDate] = React.useState(new Date());
  const [endDate, setEndDate] = React.useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (end) {
      setShowModal(false);
      setSelected({ label: 'Custom Dates', value: [start, end] });
    }
  };
  const modalBody = () => (
    <DateWrapper>
      <div className="d-flex m-3 custom-date-picker">
        <div className="mr-4 pr-4 custom-range-picker">
          <ul>
            {defaultRanges.map((element) => (
              <li
                key={element.label}
                onClick={() => {
                  setSelected(el);
                  setShowModal(false);
                }}
              >
                {element.label}
              </li>
            ))}
          </ul>
        </div>
        <DatePicker
          onChange={onChange}
          startDate={startDate}
          monthsShown={2}
          selectsRange
          inline
          endDate={endDate}
        />
      </div>
    </DateWrapper>
  );

  return (
    <>
      <div className="d-flex table-pointer" onClick={() => setShowModal(true)}>
        <img className="mr-5" src={calendar} alt=""></img>
        <span className="mr-3 font-weight-bold">{selected.label}</span>
        <img src={arrow} alt=""></img>
      </div>
      <PageModal
        show={showModal}
        className="date-filter"
        modalBody={modalBody()}
        onHide={() => setShowModal(false)}
      />
    </>
  );
};

TableDateFilter.propTypes = {
  selected: PropTypes.any,
  setSelected: PropTypes.any,
  defaultRanges: PropTypes.any,
};

export default TableDateFilter;
