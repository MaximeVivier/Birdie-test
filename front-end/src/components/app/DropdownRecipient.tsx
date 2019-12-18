import * as React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { RootState } from '@App/store/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { SyntheticEvent } from 'react';

import { getAllRecipientsId } from '../../services/requests';

interface DropdownProps {
  updateVisits: () => void;
}

interface DropdownState {

}

interface StateProps {
  all_recipients_options: Array<{key: string, value: string, text: string}>;
  current_recipient_id: string;
}

interface DispatchProps {
  changeCurrentRecipient: (current_recipient_id: string) => void;
  findAllRecipientsId: (all_recipients_options: Array<{key: string, value: string, text: string}>) => void;
}

type Props = DropdownProps & StateProps & DispatchProps;

class DropdownRecipient extends React.Component<Props, DropdownState> {

  public constructor(props: Props) {
    super(props);
  }

  componentDidMount = () => {
    getAllRecipientsId().then(all_recipients_id => {
      this.props.findAllRecipientsId(all_recipients_id.map((elt: {care_recipient_id: string}) => {
        return { key: elt.care_recipient_id, text: elt.care_recipient_id, value: elt.care_recipient_id };
      }));
    });
  }

  handleChangeRecipient = async (event: SyntheticEvent<HTMLElement, Event>, data: {value: string}) => {
    await this.props.changeCurrentRecipient(data.value);
    await this.props.updateVisits();
  }

  public render() {
    return (
      <Dropdown
        placeholder="Select a care recipient ID"
        fluid={true}
        selection={true}
        options={this.props.all_recipients_options}
        onChange={this.handleChangeRecipient}
      />
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return { current_recipient_id: state.current_recipient_id, all_recipients_options: state.all_recipients_options };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    changeCurrentRecipient: (current_recipient_id: string) => {
      dispatch({type: 'CHANGE_CURRENT_RECIPIENT', payload: current_recipient_id});
    },
    findAllRecipientsId: (all_recipients_options: Array<{key: string, value: string, text: string}>) => {
      dispatch({type: 'FIND_ALL_RECIPIENT', payload: all_recipients_options});
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropdownRecipient);
