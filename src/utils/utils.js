import startOfWeek from 'date-fns/startOfWeek';
import subMonths from 'date-fns/subMonths';
import endOfMonth from 'date-fns/endOfMonth';
import startOfYear from 'date-fns/startOfYear';
import endOfYear from 'date-fns/endOfYear';
import startOfMonth from 'date-fns/startOfMonth';
import subWeeks from 'date-fns/subWeeks';
import subYears from 'date-fns/subYears';
import format from 'date-fns/format';
import endOfWeek from 'date-fns/endOfWeek';

export const Options = [
  { label: 'All Launches', value: '' },
  { label: 'Upcoming Launches', value: 'upcoming' },
  { label: 'Successful Launches', value: 'launchSuccess' },
  { label: 'Failed Launches', value: 'launchFailed' },
];

export const getURLPath = (value, date) => {
  let path = '';
  switch (value) {
    case 'successLaunches':
      path = '?launch_success=true&';
      break;
    case 'failedLaunches':
      path = '?launch_success=false&';
      break;
    case 'nextLaunches':
      path = '/upcoming?';
      break;
    default:
      path = '';
      break;
  }
  return `${path ? path : '?'}start=${format(date[0], 'yyyy-MM-dd')}&end=${format(
    date[1],
    'yyyy-MM-dd'
  )}`;
};

export const defaultMonthRanges = [
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

export const getValues = (url, params, filter, dateFilter, offset) => {
  if (url === '/') {
    return {
      filter,
      dateFilter,
      pageOffset: offset,
    };
  }
  return {
    filter: params.filter,
    dateFilter: [new Date(params.startDate), new Date(params.endDate)],
    pageOffset: params.page,
  };
};

export const getStatus = (launchSuccess, upcoming) => {
  const status = upcoming ? 'upcoming' : launchSuccess ? 'success' : 'failed';
  return <span className={`round-span ${status}`}>{status}</span>;
};

export const getUrl = ({ date, pageNumber, filter, }) => {
  return `/${filter}/${date.label.replace(/\s/g, '-')}/${format(
    date.value[0],
    'yyyy-MM-dd'
  )}/${format(date.value[1], 'yyyy-MM-dd')}/${pageNumber}`;
};
