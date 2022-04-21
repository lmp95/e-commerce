import React, { useEffect, useState } from "react";
import { Button, Form, message, Modal } from "antd";
import TextField from "../../components/TextField";
import axiosDefault from "../../configs/axiosConfig";
import { PRODUCTS } from "../../configs/apiPath";

const ProductUpdate = function ({
  isVisible,
  handleOnOk,
  handleOnCancel,
  data,
}) {
  const [form] = Form.useForm();
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const onFinish = async (values) => {
    if (values) {
      const params = {
        name: values.name,
        price: values.price,
        type: values.type,
      };
      setIsBtnDisabled(true);
      await axiosDefault()
        .post(`${PRODUCTS}/${data.id}`, params)
        .then((response) => {
          handleOnOk();
          message.success("Product updated", 1);
        })
        .catch((err) => message.error("Fail to update product"), 1);
    }
    setIsBtnDisabled(false);
  };

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  return (
    <Modal
      title="Update Product"
      centered
      visible={isVisible}
      onOk={handleOnOk}
      onCancel={handleOnCancel}
      width={1000}
      footer={null}
    >
      <Form
        form={form}
        name="basic"
        initialValues={{
          name: data && data.name,
          price: data && data.price,
          type: data && data.type,
        }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter product name!",
            },
          ]}
        >
          <TextField placeholder="Name" size="large" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[
            {
              required: true,
              message: "Please enter product price!",
            },
          ]}
        >
          <TextField placeholder="Price" size="large" />
        </Form.Item>
        <Form.Item
          label="Type"
          name="type"
          rules={[
            {
              required: true,
              message: "Please enter product type!",
            },
          ]}
        >
          <TextField placeholder="Type" size="large" />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            span: 24,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            block
            disabled={isBtnDisabled}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductUpdate;
