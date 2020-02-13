import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Table from './CelebTable'
import './App.css'
import { Row, Col, Button, Modal, Form, Drawer, Descriptions } from 'antd';
import CelebForm from './CelebForm'

const Celebrity = () => {
  const [celebs, setCelebs] = useState([])
  const [selectedData, setSelectedData] = useState(null)
  const [visible, setVisible] = useState(false)
  const [userAction, setUserAction] = useState('Add')
  const [visibleDrawer, setVisibleDrawer] = useState(false)
  const [gettingData, setGettingData] = useState(false)

  const getData = async () => {
    setGettingData(true)
    axios.get(`http://localhost:3000/fetch`)
    .then(res => {
        setCelebs(res.data)
    })
  }

  useEffect(() => {
    getData();
    console.log('h');

  }, [gettingData])

  const showModal = () => {
    setVisible(true)
    setSelectedData(null)
    setUserAction('Add')
  }

  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
    setSelectedData(null)
  }

  const handleActions = (action, data) => {
    if (action === 'Edit') {
      setVisible(true)
      setSelectedData(data)
      setUserAction('Edit')
    }

    if (action === 'View') {
      setVisibleDrawer(true)
      setSelectedData(data)
    }
  }

  const getNewSelected = (data) => {
    setSelectedData(data)
  }

  const onCloseDrawer = () => {
    setVisibleDrawer(false)
    setSelectedData(null)
  }

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
          <Button type="primary" onClick={showModal}>Add</Button>
          <Table data={celebs} handleActions={handleActions} getData={getData} />
        </Col>
      </Row>

      <Modal
        title="Celebrity data"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <WrappedCelebForm
          selectedData={selectedData}
          userAction={userAction}
          getNewSelected={getNewSelected}
          getData={getData}
        />
      </Modal>

      <Drawer
        title="Information"
        placement="right"
        closable={false}
        onClose={onCloseDrawer}
        visible={visibleDrawer}
        width={600}
      >
        {selectedData && <Descriptions bordered colon={false}>
        <Descriptions.Item span={3} label="First name">
          {selectedData.first_name}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Last name">
          {selectedData.last_name}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Middle name">
          {selectedData.middle_name}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Contact number">
          {selectedData.contact_number}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Address">
          {selectedData.address}
        </Descriptions.Item>
        <Descriptions.Item span={3} label="Gender">
          {selectedData.gender}
        </Descriptions.Item>
      </Descriptions>}
    </Drawer>
    </div>
  )
}

ReactDOM.render(
  <Celebrity />,
  document.getElementById('root')
);
