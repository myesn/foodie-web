import React from 'react';

import Infrastructure from '../Infrastructure';

const withInfrastructure = (Component) => {
  return class extends React.PureComponent {
    render() {
      return (
        <>
          <Infrastructure>
            <Component {...this.props} />
          </Infrastructure>
        </>
      );
    }
  };
};

export default withInfrastructure;
