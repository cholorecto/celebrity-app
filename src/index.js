import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Table from './CelebTable'
import './App.css'
import { Row, Col, Button, Modal } from 'antd';

class Celebrity extends Component {
    constructor(props) {
        super(props)
        this.state={
            celebs: [],
            selectedData: null,
            noAlert: true,
            visible: false,
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

    showModal = () => {
        this.setState({
          visible: true,
        });
      };

      handleOk = e => {
        this.setState({
          visible: false,
        });
      };

      handleCancel = e => {
        this.setState({
          visible: false,
        });
      };

    render() {
        return (
            <div>
                <Row>
                    <Col span={12} offset={6}>
                        <Button type="primary" onClick={this.showModal}>Add</Button>
                        <Table data={this.state.celebs} />
                    </Col>
                </Row>

                <Modal
                  title="Celebrity data"
                  visible={this.state.visible}
                  onOk={this.handleOk}
                  onCancel={this.handleCancel}
                >
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                  <p>Some contents...</p>
                </Modal>
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
