import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Table from './CelebTable'
import './App.css'
import { Row, Col, Button, Modal, Form } from 'antd';
import CelebForm from './CelebForm'

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
      const WrappedCelebForm = Form.create({
        mapPropsToFields(props) {
          const { selectedData } = props;
          return {
            first_name: Form.createFormField({
              ...props,
              value:
                selectedData !== null ? selectedData.first_name : '',
              valuePropName: 'first_name',
            }),
            last_name: Form.createFormField({
              ...props,
              value: selectedData !== null ? selectedData.last_name : '',
              valuePropName: 'last_name',
            }),
            middle_name: Form.createFormField({
              ...props,
              value: selectedData !== null ? selectedData.middle_name : '',
              valuePropName: 'middle_name',
            }),
            contact_number: Form.createFormField({
              ...props,
              value: selectedData !== null ? selectedData.contact_number : '',
              valuePropName: 'contact_number',
            }),
            address: Form.createFormField({
              ...props,
              value: selectedData !== null ? selectedData.address : '',
              valuePropName: 'address',
            }),
            gender: Form.createFormField({
              ...props,
              value: selectedData !== null ? selectedData.gender : '',
              valuePropName: 'gender',
            }),
          };
        },
      })(CelebForm);
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
                  <WrappedCelebForm
                    {...this.props}
                    selectedData={this.state.selectedData}
                    userAction={this.state.userAction}
                  />
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
