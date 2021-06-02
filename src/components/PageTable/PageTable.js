import React from 'react';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import FadeLoader from 'react-spinners/FadeLoader';
import './PageTable.scss';

const TableComponent = ({ data, rowClick, loading, titles }) => {
  return (
    <div className="pageTable" style={{ minHeight: 500 }}>
      <Table hover className="mb-0">
        <thead className="pageTableHeader">
          <tr>
            {titles.map((element) => (
              <th key={element}>{element}</th>
            ))}
          </tr>
        </thead>
        <tbody className="pageTableMain">
          {!loading &&
            (data && data.length > 0 ? (
              <>
                {data.map((element, index) => (
                  <tr key={index} className="pageTableRowItem" onClick={() => rowClick(el)}>
                    <td>{element.flight_number}</td>
                    <td>{format(parseISO(element.launch_date_utc), "dd MMMM yyyy 'at' HH:mm")}</td>
                    <td>{element.mission_name}</td>
                    <td>
                      {element.rocket.second_stage.payloads
                        .map((element) => element.orbit)
                        .join(', ')}
                    </td>
                    <td>{element.upcoming}</td>
                    <td>{element.rocket.rocket_name}</td>
                  </tr>
                ))}
              </>
            ) : (
              <tr className="pageTableNoData">
                <td>No data for selected filter</td>
              </tr>
            ))}
        </tbody>
      </Table>
      {loading && (
        <div className="loading">
          <FadeLoader color="#000" loading={true} size={180} />
        </div>
      )}
    </div>
  );
};

TableComponent.propTypes = {
  data: PropTypes.any.isRequired,
  loading: PropTypes.Boolean,
  rowClick: PropTypes.any,
  titles: PropTypes.arrayOf.isRequired,
};

export default TableComponent;
