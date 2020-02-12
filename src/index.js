import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class Celebrity extends Component {
    render() {
        return (
            <div>
                <p>Hi hackers</p>
            </div>
        );
    }
}

Celebrity.propTypes = {

};

ReactDOM.render(
    <Celebrity />,
    document.getElementById('root')
  );