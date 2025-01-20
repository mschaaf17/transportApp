const { createRoot } = ReactDOM;
import ReactDOM from 'react-dom';
// Correct order of imports
import React from 'react';  // First import
import { Button, Input } from 'antd'; // Ant Design imports
// Other imports here

// Your component logic follows


const { 
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Segmented,
 } = antd;
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 14,
    },
  },
};
const App = () => {
  const [form] = Form.useForm();
  const variant = Form.useWatch('variant', form);
  return (
    <Form
      {...formItemLayout}
      form={form}
      variant={variant || 'filled'}
      style={{
        maxWidth: 800,
      }}
      initialValues={{
        variant: 'filled',
      }}
    >
      <Form.Item label="Form variant" name="variant">
        <Segmented options={['outlined', 'filled', 'borderless']} />
      </Form.Item>

      <Form.Item
        label="Company Name"
        name="Input"
        rules={[
          {
            required: true,
            message: 'Please provide company name!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Contact Person's Name"
        name="ContactPersonsName"
        rules={[
          {
            required: true,
            message: 'Please the name of who to contact!',
          },
        ]}
      >
        <InputNumber
          style={{
            width: '100%',
          }}
        />
      </Form.Item>

   

      <Form.Item
        label="Pick Up Date"
        name="DatePicker"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Pick Up Date Range"
        name="RangePicker"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <RangePicker />
      </Form.Item>

 <Form.Item
        label="Drop Off Date Range"
        name="RangePicker"
        rules={[
          {
            required: true,
            message: 'Please input!',
          },
        ]}
      >
        <RangePicker />
      </Form.Item>

  <Form.Item
        label="Phone Number"
        name="phone"
        rules={[
          {
            required: true,
            message: 'Please enter your phone number!',
          },
          {
            pattern: /^[0-9]{10}$/, // Regex for 10 digits (adjust as needed for your format)
            message: 'Please enter a valid 10-digit phone number!',
          },
        ]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

   <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please enter your email!',
          },
          {
            type: 'email',  // Ant Design's built-in email validation
            message: 'Please enter a valid email!',
          },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>



<Form.Item
        label="Additional Information"
        name="TextArea"
        rules={[
          {
            required: false
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 6,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
const ComponentDemo = App;


createRoot(mountNode).render(<ComponentDemo />);
