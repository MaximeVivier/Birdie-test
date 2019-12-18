import * as React from 'react';
import * as moment from 'moment';
// import styled from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Link } from 'react-router-dom';

import './Table.css';

interface TableProps {

}

interface TableState {

}

interface StateProps {
  visits: Array<object>;
  current_recipient_id: string;
}

interface DispatchProps {

}

type Props = TableProps & StateProps & DispatchProps;

interface ListItemProps {
  visit_id: string;
  timestamp: string;
}

const ListItem: React.SFC<ListItemProps> = ({visit_id, timestamp}) => {
  const url_visit = `/visit/${visit_id}`;
  const day = moment(timestamp, moment.ISO_8601).format('MMMM D, YYYY');
  return (
    <div className="card_visit">
      <p className="link"><Link to={url_visit}>Visit on {day}</Link></p>
      <p className="visit_id"><strong>Visit ID:</strong> {visit_id}</p>
    </div>
  );
};

class Table extends React.Component<Props, TableState> {
  // private recipientIdInput = React.createRef<HTMLInputElement>();

  public constructor(props: Props) {
    super(props);
  }

  public render() {
    const ListVisits = this.props.visits.map((visit: {visit_id: string, timestamp: string}) => (
      <ListItem key={visit.visit_id} visit_id={visit.visit_id} timestamp={visit.timestamp} />
    ));
    return (
      <>
        <h1>Table</h1>
        <div style={{ marginBottom: '10px', color: 'slategrey' }}>
          <p>({this.props.visits.length} visits in total)</p>
        </div>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {ListVisits}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return { visits: state.visits, current_recipient_id: state.current_recipient_id };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);