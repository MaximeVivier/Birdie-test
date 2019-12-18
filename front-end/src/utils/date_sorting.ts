import * as moment from 'moment';

const date_sorting = (a: {timestamp: string}, b: {timestamp: string}) => {
  return (moment(a.timestamp).isAfter(b.timestamp) ? 1 : -1);
};

export { date_sorting };