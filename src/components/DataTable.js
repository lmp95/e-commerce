import React from "react";
import { Table, Tag, Space } from "antd";

const DataTable = function ({ columns, data }) {
  return <Table columns={columns} dataSource={data} rowKey={(obj) => obj.id} />;
};

export default DataTable;
