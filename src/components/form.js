import React, { useState } from 'react'; 
import { Button, Input, Form, DatePicker, Select, notification } from 'antd'; 
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

// List of all 50 US states
const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 
  'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 
  'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 
  'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 
  'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 
  'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

// Vehicle options
const vehicleTypes = ['SUV', 'Truck', 'Car', 'Other'];

export const TransportForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [vehicleCount, setVehicleCount] = useState(0);
const [vehicleTypesList, setVehicleTypesList] = useState([]);

const handleVehicleCountChange = (value) => {
    setVehicleCount(Number(value));  // Ensure it's a number
    setVehicleTypesList(new Array(Number(value)).fill("")); // Generate an array of empty strings, one for each vehicle
  };

  const handleSubmit = (values) => {
    // Create a list of vehicle types based on the number of vehicles
    const vehicleTypesList = [];
    for (let i = 1; i <= values.vehicle_count; i++) {
      // Dynamically access each vehicle type based on count (using template literal)
      vehicleTypesList.push(values[`vehicle_type_${i}`]); 
    }
  
    // Join vehicle types into a string (separated by commas)
    const vehicleTypesString = vehicleTypesList.join(", ");
    
    // Construct the email template parameters
    const templateParams = {
      company_name: values.company_name,
      contact_person: values.contact_person,
      phone: values.phone,
      email: values.email,
      pickup_date: values.pickup_date.format('YYYY-MM-DD'),
      dropoff_range: `${values.dropoff_range[0].format('YYYY-MM-DD')} - ${values.dropoff_range[1].format('YYYY-MM-DD')}`,
      pickup_state: values.pickup_state,
      dropoff_state: values.dropoff_state,
      vehicle_count: values.vehicle_count,
      vehicle_types: vehicleTypesString,  // Add the vehicle types string here
      additional_info: values.additional_info,
    };
  
    // Send the email via EmailJS
    emailjs.send(
      'service_wdi8lb6',
      'template_uaut4lf',
      templateParams,
      '2COJPYtzfZS3kgvYb' // Your EmailJS user ID
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
      form={form}
      onFinish={handleSubmit}
      className='transport-form'
      initialValues={{
        variant: 'filled',
      }}
    >
      {/* Company Name Field */}
      <Form.Item
        label="Company Name"
        name="company_name"
        className="form-item"
        rules={[
          { required: true, message: 'Please provide company name' },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Contact Person Field */}
      <Form.Item
        label="Contact Person's Name"
        name="contact_person"
        className="form-item"
        rules={[
          { required: true, message: 'Please provide the name of who to contact' },
        ]}
      >
        <Input />
      </Form.Item>

      {/* Pick Up Date */}
      <Form.Item
        label="Pick Up Date"
        name="pickup_date"
        className="form-item"
        rules={[
          { required: true, message: 'Please provide the date of preferred pick up' },
        ]}
      >
        <DatePicker />
      </Form.Item>

      {/* Drop Off Date Range */}
      <Form.Item
        label="Drop Off Date Range"
        name="dropoff_range"
        className="form-item"
        rules={[
          { required: true, message: 'Please provide the date range for preferred drop off times' },
        ]}
      >
        <RangePicker />
      </Form.Item>

      {/* Pick Up State */}
      <Form.Item
        label="Pick Up State"
        name="pickup_state"
        className="form-item"
        rules={[
          { required: true, message: 'Please provide the state of pick up' },
        ]}
      >
        <Select showSearch>
          {states.map((state) => (
            <Select.Option key={state} value={state}>
              {state}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Drop Off State */}
      <Form.Item
        label="Drop Off State"
        name="dropoff_state"
        className="form-item"
        rules={[
          { required: true, message: 'Please provide the state of drop off' },
        ]}
      >
        <Select showSearch>
          {states.map((state) => (
            <Select.Option key={state} value={state}>
              {state}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
  label="How Many Cars?"
  name="vehicle_count"
  className="form-item"
  rules={[
    { required: true, message: 'Please provide the number of vehicles' },
    { pattern: /^[1-9]\d*$/, message: 'Please enter a valid number of vehicles' }
  ]}
>
  <Input 
    type="number" 
    min="1" 
    value={vehicleCount}  // Bind the input value to vehicleCount state
    onChange={e => handleVehicleCountChange(e.target.value)} 
  />
</Form.Item>

{vehicleCount > 0 && (
  <>
    {/* Render vehicle type fields dynamically */}
    {[...Array(vehicleCount)].map((_, index) => (
      <Form.Item
        label={`Vehicle Type ${index + 1}`}
        name={`vehicle_type_${index + 1}`} // Dynamic name for each vehicle
        key={index}
        className="form-item"
        rules={[{ required: true, message: 'Please provide the type of vehicle' }]}
      >
        <Select>
          {vehicleTypes.map((type) => (
            <Select.Option key={type} value={type}>
              {type}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    ))}
  </>
)}


      {/* Phone Number */}
      <Form.Item
        label="Phone Number"
        name="phone"
        className="form-item"
        rules={[
          { required: true, message: 'Please provide a phone number' },
          { pattern: /^[0-9]{10}$/, message: 'Please enter a valid 10-digit phone number' },
        ]}
      >
        <Input placeholder="Enter phone number" />
      </Form.Item>

      {/* Email Address */}
      <Form.Item
        label="Email"
        name="email"
        className="form-item"
        rules={[
          { required: true, message: 'Please provide your email' },
          { type: 'email', message: 'Please enter a valid email' },
        ]}
      >
        <Input placeholder="Enter your email" />
      </Form.Item>

      {/* Additional Information */}
      <Form.Item
        label="Additional Information"
        name="additional_info"
        className="form-item"
      >
        <Input.TextArea />
      </Form.Item>

      {/* Submit Button */}
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
    </Form>
  );
};
