import * as React from 'react';
import * as moment from 'moment';
// import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
// import { Card } from 'semantic-ui-react';

import { getEventsOfVisit } from '../../services/requests';
import { date_sorting } from '../../utils/date_sorting';

interface VisitProps {
  match: {params: {visit_id: string, timestamp: string}};
}

interface VisitState {
  all_events: Array<{timestamp: string}>;
  care_recipient_id: string;
}

interface StateProps {

}

interface DispatchProps {

}

type Props = VisitProps & StateProps & DispatchProps;

interface EventItemProps {
  event: {
    id: string;
    event_type: string;
    timestamp: string;
    caregiver_id: string;
  };
}

const baseFields = ['id', 'visit_id', 'timestamp', 'event_type',
                    'caregiver_id', 'care_recipient_id', 'task_instance_id'];
// I put task_instance_id also in this array because its value is a string way too long to be displayed

const EventItem: React.SFC<EventItemProps> = ({event}) => {

  const detail = Object.keys(event)
    .filter(field => {
      return (!baseFields.includes(field) && typeof event[field] !== typeof {} && typeof event[field] !== typeof []);
    })
    .map(field => {
      return (<div key={field} className="description"><strong>{field} :</strong> {event[field]}</div>);
    });

  const time = moment(event.timestamp, moment.ISO_8601).format('HH:mm:ss');

  const item = {
    header: `${event.event_type} at ${time}`,
    meta: `Caregiver ID : ${event.caregiver_id}`,
  };

  return (
    <>
      <div className="ui card" style={{ width: '60%' }}>
        <div className="content">
          <div className="header">{item.header}</div>
          <div className="meta">{item.meta}</div>
          {detail}
        </div>
      </div>
    </>
  );
};

class Visit extends React.Component<Props, VisitState> {
  // private recipientIdInput = React.createRef<HTMLInputElement>();

  public constructor(props: Props) {
    super(props);
    this.state = {
      all_events: [],
      care_recipient_id: ''
    };
  }

  componentDidMount() {
    getEventsOfVisit(this.props.match.params.visit_id).then(all_events => {
      try {
        this.setState({care_recipient_id: all_events[0].care_recipient_id});
      } catch {
        this.setState({care_recipient_id: ''});
      }
      this.setState( { all_events: all_events.sort(date_sorting) } );
    });
  }

  public render() {
    const ListEvents = this.state.all_events.map((event: {
      id: string;
      event_type: string;
      timestamp: string;
      caregiver_id: string;
    }) => (
      <EventItem key={event.id} event={event} />
    ));

    let day = '';
    try {
      day = moment(this.state.all_events[0].timestamp, moment.ISO_8601).format('MMMM D, YYYY');
    } catch {
      day = '';
    }

    return (
      <>
        <h1>Visit of {day}</h1>
        <h4 style={{ color: 'slategrey', margin: '5px', marginBottom: '10px' }}>
          <strong>Care ricipient ID : </strong>{this.state.care_recipient_id}
        </h4>
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {ListEvents}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return {};
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Visit);