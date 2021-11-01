import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// https://github.com/myesn/react-demos/blob/main/project/react-redux-login/src/components/shared/RequireAuthorization.jsx
export default function (Component) {
  class RequireAuthorization extends React.Component {
    constructor(){
      const { isAuthenticated, history } = this.props;
      

    }
  }
}

export default RequireAuthorization;