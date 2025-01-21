import React, {useState} from 'react'; 
import { Button, Input, Form, DatePicker, notification } from 'antd'; 
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; 

const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

export const TransportForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSubmit = (values) => {
    const templateParams = {
      company_name: values.Input,
      contact_person: values.ContactPersonsName,
      phone: values.phone,
      email: values.email,
      pickup_date: values.DatePicker.format('YYYY-MM-DD'), 
      dropoff_range: `${values.RangePicker[0].format('YYYY-MM-DD')} - ${values.RangePicker[1].format('YYYY-MM-DD')}`,
      additional_info: values.TextArea,
    };

   
    emailjs.send(
      'service_wdi8lb6', 
      'template_uaut4lf', 
      templateParams,
      '2COJPYtzfZS3kgvYb' 
    )
    .then((response) => {
      console.log('Email successfully sent!', response);
      setSubmissionStatus('success');
        form.resetFields();

        notification.success({
            message: 'Form submitted successfully!',
            description: 'We will reach out to you shortly.',
            duration: 5,
            });
            navigate('/success');
    })
    .catch((error) => {
      console.error('Failed to send email:', error);
      setSubmissionStatus('error');

      notification.error({
        message: 'Submission Failed',
        description: 'There was an error submitting the form. Please try again.',
      });
    });
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={handleSubmit}
      style={{
        maxWidth: 800,
        padding: '20px',
        borderRadius: '8%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.8)',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
      }}
      initialValues={{
        variant: 'filled',
      }}
    >
      <Form.Item
        label="Company Name"
        name="Input"
        rules={[
          {
            required: true,
            message: 'Please provide company name',
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
            message: 'Please provide the name of who to contact',
          },
        ]}
      >
         <Input />
      </Form.Item>

      <Form.Item
        label="Pick Up Date"
        name="DatePicker"
        rules={[
          {
            required: true,
            message: 'Please provide the date of preferred pick up',
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        label="Drop Off Date Range"
        name="RangePicker"
        rules={[
          {
            required: true,
            message: 'Please provide the date range for preferred drop off times',
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
            message: 'Please provide a phone number',
          },
          {
            pattern: /^[0-9]{10}$/, // Regex for 10 digits (adjust as needed for your format)
            message: 'Please enter a valid 10-digit phone number',
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
            message: 'Please provide your email',
          },
          {
            type: 'email',  // Ant Design's built-in email validation
            message: 'Please enter a valid email',
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
            required: false,
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
        <Button className="submit-btn" htmlType="submit">
          Submit
        </Button>
      </Form.Item>

      {/* {submissionStatus === 'success' && <div className="success-message">Form submitted successfully!</div>}
      {submissionStatus === 'error' && <div className="error-message">Something went wrong. Please try again.</div>} */}
    </Form>
  );
};
