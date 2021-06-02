/* eslint-disable react/react-in-jsx-scope */
import logo from './logo.svg';
import React, { useEffect, useState, useCallback } from 'react';
import startOfWeek from 'date-fns/startOfWeek';
import endOfWeek from 'date-fns/endOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import subMonths from 'date-fns/subMonths';
import subWeeks from 'date-fns/subWeeks';
import subYears from 'date-fns/subYears';
import format from 'date-fns/format';

import './App.scss';
import { getURLPath, defaultMonthRanges, getValues, getUrl, Options } from '../src/utils/utils';
import PageHeader from '../src/components/PageHeader/Header';
import TableComponent from '../src/components/PageTable/PageTable';
import TablePagination from '../src/components/TablePagination/TablePagination';
import PageModal from '../src/components/PageModal/PageModal';
import TableFilter from '../src/components/TableFilter/TableFilter';
import TableDateFilter from '../src/components/TableDateFilter/TableDateFilter';
import PropTypes from 'prop-types';

import nasaImg from '../src/images/nasa.png';
import wikiImg from '../src/images/wiki.png';
import youTubeImg from '../src/images/youtube.png';

function App({ match, history }) {
  const [selectedFilters, setSelectedFilters] = useState(Options[0]);
  const [selectedDates, setSelectedDates] = useState(defaultMonthRanges[3]);
  const [tableData, setTableData] = useState([]);
  const [tableDataCount, setTableDataCount] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [tableLoading, setTableLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rowContent, setRowContent] = useState(null);
  const defaultRanges = [
    {
      label: 'Past week',
      value: [startOfWeek(subWeeks(new Date(), 1)), endOfWeek(subWeeks(new Date(), 1))],
    },

    {
      label: 'Past month',
      value: [startOfMonth(subMonths(new Date(), 1)), endOfMonth(subMonths(new Date(), 1))],
    },

    {
      label: 'Past 3 months',
      value: [startOfMonth(subMonths(new Date(), 4)), endOfMonth(subMonths(new Date(), 1))],
    },

    {
      label: 'Past 6 months',
      value: [startOfMonth(subMonths(new Date(), 7)), endOfMonth(subMonths(new Date(), 1))],
    },

    {
      label: 'Past year',
      value: [startOfYear(subYears(new Date(), 1)), endOfYear(subYears(new Date(), 1))],
    },

    {
      label: 'Past 2 years',
      value: [startOfYear(subYears(new Date(), 3)), endOfYear(subYears(new Date(), 1))],
    },
  ];
  const getLaunchData = useCallback(
    async (offSet = 0) => {
      const { url, params } = match;
      const { filter, dateFilter, pageOffset } = getValues(
        url,
        params,
        offSet,
        selectedFilters.value,
        selectedDates.value
      );
      setTableLoading(true);
      const path = getURLPath(filter, dateFilter);
      const result = await generateAxiosAPICall().get(`/launch${path}&limit=12&set=${pageOffset}`);
      const {
        headers: { [`spacex-api-count`]: count },
        status,
        data,
      } = result;
      if (status === 200) {
        setTableDataCount(count);
        setTableData(data);
      }
      setTableLoading(false);
    },
    [selectedFilters, selectedDates, match]
  );

  useEffect(() => {
    if (match.url !== '/') {
      const { params } = match;
      setSelectedFilters(
        Options.find((el) =>
          params.filter === 'all' ? el.value === '' : el.value === params.filter
        )
      );
      setSelectedDates({
        label: params.dateFilter,
        value: [new Date(params.startDate), new Date(params.endDate)],
      });
      setActivePage(params.page);
    }
  }, []);

  useEffect(() => {
    setActivePage(1);
    getLaunchData();
  }, [getLaunchData, match]);

  const onPageChange = (pageNumber) => {
    setActivePage(pageNumber);
    getLaunchData((pageNumber - 1) * 12);
    changeUrl({
      pageNumber,
      date: selectedDates,
      filter: selectedFilters.value,
    });
  };

  const onselectDateFilter = (selected) => {
    changeUrl({
      date: selected,
      pageNumber: activePage,
      filter: selectedFilters.value,
    });
    setSelectedDates(selected);
  };

  const onselectFilter = (selected) => {
    changeUrl({
      filter: selected.value,
      date: selectedDates,
      pageNumber: activePage,
    });
    setSelectedFilter(selected);
  };

  const changeUrl = ({ pageNumber, filter, date }) => {
    history.push(
      getUrl({
        filter: filter ? filter : 'all',
        pageNumber: pageNumber ? pageNumber : 1,
        date,
      })
    );
  };

  const modalHeader = () => (
    <div className="d-flex">
      <div className="d-flex flex-column">
        <span className="title">{rowContent && rowContent.mission_name}</span>
        <span className="rocket-name">{rowContent && rowContent.rocket.rocket_name}</span>
        <div className="ml-1 link-button-container">
          <span className="mr-2">
            <a
              href={rowContent && rowContent.links.article_link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={nasaImg} alt="" />
            </a>
          </span>
          <span className="mr-2">
            <a
              href={rowContent && rowContent.links.wikipedia}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={wikiImg} alt="" />
            </a>
          </span>
          <span className="mr-2">
            <a
              href={rowContent && rowContent.links.video_link}
              target="_blank"
              rel="noreferrer noopener"
            >
              <img src={youTubeImg} alt="" />
            </a>
          </span>
        </div>
      </div>
      <span className="ml-3 ">
        {rowContent && getStatus(rowContent.upcoming, rowContent.launch_success)}
      </span>
    </div>
  );

  const modalBody = () => (
    <>
      <div>
        <p className="details">
          {rowContent && rowContent.details}{' '}
          <a
            href={rowContent && rowContent.links.wikipedia}
            target="_blank"
            rel="noreferrer noopener"
          >
            Wikipedia
          </a>
        </p>
      </div>
      <div className="details-item d-flex">
        <span>Flight Number</span>
        <span>{rowContent && rowContent.flight_number}</span>
      </div>
      <div className="details-item d-flex">
        <span>Mission Name</span>
        <span>{rowContent && rowContent.mission_name}</span>
      </div>
      <div className="details-item d-flex">
        <span>Rocket Type</span>
        <span>{rowContent && rowContent.rocket.rocket_type}</span>
      </div>
      <div className="details-item d-flex">
        <span>Rocket Name</span>
        <span>{rowContent && rowContent.rocket.rocket_name}</span>
      </div>
      <div className="details-item d-flex">
        <span>Manufacture</span>
        <span>
          {rowContent &&
            rowContent.rocket.second_stage.payloads.map((el) => el.manufacturer).join(', ')}
        </span>
      </div>
      <div className="details-item d-flex">
        <span>Nationality</span>
        <span>
          {rowContent &&
            rowContent.rocket.second_stage.payloads.map((el) => el.nationality).join(', ')}
        </span>
      </div>
      <div className="details-item d-flex">
        <span>Launch Date</span>
        <span>
          {rowContent && format(new Date(rowContent.launch_date_local), 'dd MMMM yyyy HH:mm')}
        </span>
      </div>
      <div className="details-item d-flex">
        <span>Payload Type</span>
        <span>
          {rowContent &&
            rowContent.rocket.second_stage.payloads.map((el) => el.payload_type).join(', ')}
        </span>
      </div>
      <div className="details-item d-flex">
        <span>Orbit</span>
        <span>
          {rowContent && rowContent.rocket.second_stage.payloads.map((el) => el.orbit).join(', ')}
        </span>
      </div>
      <div className="details-item d-flex no-border">
        <span>Launch Site</span>
        <span>{rowContent && rowContent.launch_site.site_name}</span>
      </div>
    </>
  );

  const titles = ['No', 'Launched', 'Mission', 'Orbit', 'Launch Status', 'Rocket'];
  return (
    <div className="app">
      <div className="Header">
        <PageHeader />
      </div>
      <div>
        <div className="mt-5 ml-5 mr-5 mb-0">
          <div className="justify-content-between d-flex align-items-center mr-1 ml-1">
            <TableDateFilter
              selected={selectedDates}
              setSelected={onselectDateFilter}
              defaultRanges={defaultRanges}
            />
            <TableFilter
              options={Options}
              selected={selectedFilters}
              setSelected={onselectFilter}
            />
          </div>
          <TableComponent
            data={tableData}
            onRowClick={(item) => {
              setRowContent(item);
              setShowModal(true);
            }}
            loading={tableLoading}
            titles={titles}
          />
          <TablePagination
            totalCount={parseInt(tableDataCount)}
            onChange={onPageChange}
            activePage={activePage}
            countPerPage={12}
          />
        </div>
      </div>
      <PageModal
        className="page-modal-class"
        show={showModal}
        header={modalHeader()}
        onHide={() => setShowModal(false)}
        modalBody={modalBody()}
      />
    </div>
  );
}

App.propTypes = {
  match: PropTypes.any,
  history: PropTypes.any,
  totalCount: PropTypes.Number,
  onChange: PropTypes.function,
};

export default App;
