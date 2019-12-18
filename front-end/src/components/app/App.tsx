import * as React from 'react';
import styled from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';

import { getVisits } from '../../services/requests';
import { date_sorting } from '../../utils/date_sorting';

import OtherDisplay from '../other-display/OtherDisplay';
import NavBar from './NavBar';
import Table from '../table/Table';
import Visit from '../visit/Visit';
import DropdownRecipient from './DropdownRecipient';

/*
import Title from '@App/components/Title';
import Logo from '@App/components/Logo';
import SubTitle from '@App/components/SubTitle';
*/

// import { getVisits } from '../../services/requests';

// const LogoUrl = require('../../assets/images/logo-birdie.svg');

/*
interface AppProps {

}

interface AppState {
  current_recipient_id: string;
}
*/

interface StateProps {
  current_recipient_id: string;
}

interface DispatchProps {
  updateStateVisits: (visits: Array<object>) => void;
}

type Props = StateProps & DispatchProps;

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const InfoContainer = styled.div`
  width: 90%;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  margin: 5px;
  border: solid slategrey;
  border-radius: 10px;
  border-width: 2px;
`;

const Header = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  margin: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const DropdownCintainer = styled.div`
  width: 70%;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

class App extends React.Component<Props> {

  public constructor(props: Props) {
    super(props);
  }

  updateVisits = () => {
    getVisits(this.props.current_recipient_id).then(data => {
      this.props.updateStateVisits(data.sort(date_sorting));
    });
  }

  componentDidMount = () => {
    getVisits(this.props.current_recipient_id).then(data => {
      this.props.updateStateVisits(data.sort(date_sorting));
    });
  }

  public render() {
    return (
      <AppContainer style={{ backgroundColor: '#eeeeee'}}>
        <Header>
          <h1 className="ui header" style={{ color: '#3fbfb5' }}>Birdie, come and consult</h1>
        </Header>
        <DropdownCintainer>
          <DropdownRecipient updateVisits={this.updateVisits}/>
        </DropdownCintainer>
        <BrowserRouter>
          <NavBar />
          <InfoContainer className="Information">
            <Route path="/table" component={Table}/>
            <Route path="/other-display" component={OtherDisplay}/>
            <Route path="/visit/:visit_id" component={Visit} />
          </InfoContainer>
        </BrowserRouter>
      </AppContainer>
    );
  }
}

const mapStateToProps = (state: RootState, ownProps: object) => {
  return { current_recipient_id: state.current_recipient_id };
};

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => {
  return {
    updateStateVisits: (visits: Array<object>) => {
      dispatch({type: 'CHANGE_RECIPIENT_VISITS', payload: visits});
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);