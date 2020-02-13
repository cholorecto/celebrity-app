/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { Table, Button, Icon, Divider, Tooltip, Modal, notification, Input } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';
import Highlighter from 'react-highlight-words';
const { confirm } = Modal;

const CelebsTable = ({
  data,
  handleActions,
  getData
}) => {
  const showConfirm = record => {
    confirm({
      title: 'Do you want to delete this item?',

      onOk() {
        const dataSubmit = {
          _id: record._id
       }
        axios.delete('http://localhost:3000/delete', {data:dataSubmit})
        .then(res => {
            getData()
            notification.open({
              message: 'Deleted successfully'
            })
        })
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

  const [searchText, setSearchText] = useState()
  const [searchedColumn, setSearchedColumn] = useState()

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),

    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });

   const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  };

   const handleReset = clearFilters => {
    clearFilters();
    setSearchText('')
  };

  const columns = [
    {
      title: 'First name',
      dataIndex: 'first_name',
      key: 'first_name',
      width: 200,
      ...getColumnSearchProps('first_name'),
    },
    {
      title: 'Last name',
      dataIndex: 'last_name',
      key: 'last_name',
      width: 200,
      ...getColumnSearchProps('last_name'),
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

CelebsTable.propTypes = {
  data: PropTypes.func.isRequired,
  handleActions: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
};

export default CelebsTable;
