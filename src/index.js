import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Table from './CelebTable'
import './App.css'
import { Row, Col, Button, Modal, Form, Drawer, Descriptions } from 'antd';
import CelebForm from './CelebForm'

class Celebrity extends Component {
    constructor(props) {
        super(props)
        this.state={
            celebs: [],
            selectedData: null,
            noAlert: true,
            visible: false,
            userAction: 'Add',
            visibleDrawer: false,
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
          selectedData: null,
          userAction: 'Add',
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
          selectedData: null,
        });
      };

      handleActions = (action, data) => {
        if (action === 'Edit') {
          this.setState({
            visible: true,
            selectedData: data,
            userAction: 'Edit',
          });

        }

        if (action === 'View') {
          this.setState({
            visibleDrawer: true,
            selectedData: data
          });
        }
      };

      getNewSelected = (data) => {
        this.setState({selectedData:data})
      }

      onCloseDrawer = () => {
        this.setState({
          visibleDrawer: false,
          selectedData: null
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
                    <Col span={12} offset={6} style={{marginTop: 20}}>
                        <Button type="primary" onClick={this.showModal}>Add</Button>
                        <Table data={this.state.celebs} handleActions={this.handleActions} getData={this.getData} />
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
                    getData={this.getData}
                    getNewSelected={this.getNewSelected}
                  />
                </Modal>

                <Drawer
                  title="Basic Drawer"
                  placement="right"
                  closable={false}
                  onClose={this.onCloseDrawer}
                  visible={this.state.visibleDrawer}
                  width={600}
                >
                  {console.log(this.state.selectedData)}
                  {this.state.selectedData && <Descriptions bordered colon={false}>
                  <Descriptions.Item span={3} label="First name">
                    {this.state.selectedData.first_name}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Last name">
                    {this.state.selectedData.last_name}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Middle name">
                    {this.state.selectedData.middle_name}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Contact number">
                    {this.state.selectedData.contact_number}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Address">
                    {this.state.selectedData.address}
                  </Descriptions.Item>
                  <Descriptions.Item span={3} label="Gender">
                    {this.state.selectedData.gender}
                  </Descriptions.Item>
                </Descriptions>}
                </Drawer>
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
