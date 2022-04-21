import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Space, Spin, Tag } from "antd";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import ConfirmModal from "../../components/ConfirmModal";
import DataTable from "../../components/DataTable";
import { PRODUCTS } from "../../configs/apiPath";
import axiosDefault from "../../configs/axiosConfig";
import ProductCreate from "./CreateProductModal";
import ProductUpdate from "./UpdateProductModal";

const Product = function () {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmLoading, setDeleteConfirmLoading] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [updateProduct, setUpdateProduct] = useState(null);
  const [refresh, setRefreshData] = useState(false);
  const [data, setData] = useState(null);
  const showCreateDialog = () => {
    setShowModal(true);
  };
  const handleCreateModalOk = () => {
    setShowModal(false);
    setRefreshData(true);
  };
  const handleCreateModalCancel = () => {
    setShowModal(false);
  };
  const handleUpdateModalOk = () => {
    setShowUpdateModal(false);
    setRefreshData(true);
  };
  const handleUpdateModalCancel = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateDialog = (record) => {
    setShowUpdateModal(true);
    setUpdateProduct(record);
  };

  const handleDeleteModal = (record) => {
    setShowDeleteModal(true);
    setDeleteProduct(record);
  };

  const handleComfirmOk = async () => {
    setDeleteConfirmLoading(true);
    await axiosDefault()
      .delete(`${PRODUCTS}${deleteProduct.id}`)
      .then(() => {
        setRefreshData(true);
        message.success("Product deleted", 1);
      })
      .catch((err) => {
        message.error("Fail to delete product", 1);
      });
    setDeleteConfirmLoading(false);
    setShowDeleteModal(false);
  };

  const handleComfirmCancel = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await axiosDefault()
        .get(`${PRODUCTS}`)
        .then((response) => {
          setData(response.data);
          setRefreshData(false);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchProducts();
  }, [refresh]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (value) => {
        return `$${value}`;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Action",
      key: "id",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button
              handleOnClick={() => handleUpdateDialog(record)}
              size="small"
              icon={<EditOutlined />}
            />
            <Button
              handleOnClick={() => handleDeleteModal(record)}
              size="small"
              icon={<DeleteOutlined />}
            />
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div className="list-view-header">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          label="Create"
          handleOnClick={showCreateDialog}
        />
      </div>
      {data ? <DataTable columns={columns} data={data} /> : <Spin />}
      <ProductCreate
        isVisible={showModal}
        handleOnOk={handleCreateModalOk}
        handleOnCancel={handleCreateModalCancel}
      />
      {data && (
        <ProductUpdate
          isVisible={showUpdateModal}
          handleOnOk={handleUpdateModalOk}
          handleOnCancel={handleUpdateModalCancel}
          data={updateProduct}
        />
      )}
      <ConfirmModal
        title="Delete"
        bodyText={`Are you sure to delete ${
          deleteProduct && deleteProduct.name
        }?`}
        isVisible={showDeleteModal}
        handleOk={handleComfirmOk}
        handleCancel={handleComfirmCancel}
        confirmLoading={deleteConfirmLoading}
      />
    </>
  );
};

export default Product;
