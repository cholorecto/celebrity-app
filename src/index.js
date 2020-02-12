import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Table from './CelebTable'
import './App.css'
import { Row, Col } from 'antd';

class Celebrity extends Component {
    constructor(props) {
        super(props)
        this.state={
            celebs: [],
            selectedData: null,
            noAlert: true
        }
    }

    getData = () => {
        axios.get(`http://localhost:3000/fetch`)
        .then(res => {
            this.setState({celebs: res.data})
        })
    }

    componentDidMount() {
        this.getData()
    }

    render() {
        return (
            <div>
                <Row>
                    <Col span={12} offset={6}>
                        <Table data={this.state.celebs} />
                    </Col>
                </Row>
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