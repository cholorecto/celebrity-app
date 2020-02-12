/* eslint-disable no-shadow */
import React from 'react';
import { Table, Button, Icon, Divider, Tooltip, Modal } from 'antd';
import PropTypes from 'prop-types';
const { confirm } = Modal;

const PerformanceEvaluationTable = ({
  data,
  handleActions,
  deleteAction,
}) => {
  const showConfirm = record => {
    confirm({
      title: 'Do you want to delete this item?',

      onOk() {
        deleteAction(record.id);
      },
      onCancel() {},
    });
  };
  const renderActions = (text, record) => (
    <div
      className="field is-grouped"
      style={{ display: 'flex', position: 'relative', right: 37 }}
    >
      <Divider type="vertical" style={{ height: '2.9em' }} />
      <Tooltip title="Edit">
        <Button
          type="link"
          style={{ color: '#3D8DB0' }}
          onClick={() => handleActions('Edit', record)}
        >
          <Icon type="edit" style={{ fontSize: 20 }} />
        </Button>
      </Tooltip>

      <Tooltip title="View">
        <Button
          type="link"
          style={{ color: '#3D8DB0' }}
          onClick={() => handleActions('View', record)}
        >
          <Icon type="eye" style={{ fontSize: 20 }} />
        </Button>
      </Tooltip>

      <Tooltip title="Delete">
        <Button
          type="link"
          style={{ color: '#F91E1E' }}
          onClick={() => showConfirm(record)}
        >
          <Icon type="delete" style={{ fontSize: 20 }} />
        </Button>
      </Tooltip>
    </div>
  );

  const columns = [
    {
      title: 'First name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: 200,
    },
    {
      title: 'Last name',
      dataIndex: 'last_name',
      key: 'last_name',
      width: 200,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: 150,
    },
    {
      title: 'Action ',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: renderActions,
    },
  ];
  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        style={{ maxHeight: 0 }}
        rowKey="id"
      />
    </div>
  );
};

PerformanceEvaluationTable.propTypes = {
  data: PropTypes.func.isRequired,
  handleActions: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
};

export default PerformanceEvaluationTable;
