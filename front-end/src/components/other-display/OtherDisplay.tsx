import * as React from 'react';
// import styled, { createGlobalStyle } from 'styled-components';
import { RootState } from '@App/store/reducers';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface OtherDisplayProps {

}

interface OtherDisplayState {

}

interface StateProps {

}

interface DispatchProps {

}

type Props = OtherDisplayProps & StateProps & DispatchProps;

class OtherDisplay extends React.Component<Props, OtherDisplayState> {
  // private recipientIdInput = React.createRef<HTMLInputElement>();

  public constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <>
        <h1>OtherDisplay</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherDisplay);