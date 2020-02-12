/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import React from 'react';
import { Form, Input, Button, Select } from 'antd';
import PropTypes from 'prop-types';
const { Option } = Select

const CelebForm = ({
  form,
  addAction,
  userAction,
  editAction,
  selectedData,
}) => {
  const handleSubmit = e => {
    e.preventDefault();

    form.validateFields((err, values) => {
      if (!err) {
        if (userAction === 'Add') {
          const data = {}
          data.first_name = values.first_name
          data.last_name = values.last_name
          data.middle_name = values.middle_name
          data.contact_number = values.contact_number
          data.address = values.address
          data.gender = values.gender
          addAction(data);
        }

        if (userAction === 'Edit') {
          const data = {}
          data.first_name = values.first_name
          data.last_name = values.last_name
          data.middle_name = values.middle_name
          data.contact_number = values.contact_number
          data.address = values.address
          data.gender = values.gender
          data.id = selectedData.id
          editAction(data);
        }
      }
    });
  };

  const { getFieldDecorator } = form;

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <div>
      <Form {...formItemLayout} onSubmit={handleSubmit}>
        <Form.Item label="First  name" hasFeedback>
          {getFieldDecorator('first_name', {
            rules: [{ required: true, message: 'This field is required!' }],
          })(<Input placeholder="This field is required" />)}
        </Form.Item>
        <Form.Item label="Last  name" hasFeedback>
          {getFieldDecorator('last_name', {
            rules: [{ required: true, message: 'This field is required!' }],
          })(<Input placeholder="This field is required" />)}
        </Form.Item>
        <Form.Item label="Middle name" hasFeedback>
          {getFieldDecorator('middle_name', {
            rules: [{ required: true, message: 'This field is required!' }],
          })(<Input placeholder="This field is required" />)}
        </Form.Item>
        <Form.Item label="Contact number" hasFeedback>
          {getFieldDecorator('contact_number', {
            rules: [{ required: true, message: 'This field is required!' }],
          })(<Input placeholder="This field is required" />)}
        </Form.Item>
        <Form.Item label="Address" hasFeedback>
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'This field is required!' }],
          })(<Input placeholder="This field is required" />)}
        </Form.Item>
        <Form.Item label="Gender" hasFeedback>
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'This field is required!' }],
          })(
            <Select>
              <Option value="male">male</Option>
              <Option value="female">female</Option>
            </Select>,
          )}
        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit" block>
            {userAction}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

CelebForm.propTypes = {
  form: PropTypes.func.isRequired,
  addAction: PropTypes.func.isRequired,
  userAction: PropTypes.func.isRequired,
  editAction: PropTypes.func.isRequired,
  selectedData: PropTypes.func.isRequired,
};

export default CelebForm;
