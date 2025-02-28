import React, { useState } from "react";
import { Button, Input, Form, DatePicker, Select, notification } from "antd";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import MyDateRangePicker from "./mobileDatePicker";
import dayjs from "dayjs";


const { RangePicker } = DatePicker;

// List of all 50 US states
const states = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

// Vehicle options
const vehicleTypes = ["SUV", "Truck", "Car", "Van", "Other"];

export const TransportForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [vehicleCount, setVehicleCount] = useState(0);
  const [vehicleTypesList, setVehicleTypesList] = useState([]);
  const [vehicleDescriptions, setVehicleDescriptions] = useState([]);
  const [selectedReferral, setSelectedReferral] = useState("");
  

  
  const handleVehicleCountChange = (value) => {
    setVehicleCount(Number(value));
    setVehicleDescriptions(new Array(Number(value)).fill(""));
  };

  const handleVehicleTypeChange = (value, index) => {
    const updatedTypes = form.getFieldsValue();
    const updatedVehicleTypesList = [];

    for (let i = 1; i <= updatedTypes.vehicle_count; i++) {
      updatedVehicleTypesList.push(updatedTypes[`vehicle_type_${i}`]);
    }

    
    setVehicleTypesList(updatedVehicleTypesList);

    const updatedDescriptions = [...vehicleDescriptions];
    if (value === "Other") {
      updatedDescriptions[index] = ""; 
    } else {
      updatedDescriptions[index] = null; 
    }

    setVehicleDescriptions(updatedDescriptions);
  };

  const handleSubmit = (values) => {

    const pickupDate = values.pickup_date
    ? `${dayjs(values.pickup_date[0]).format("MM-DD-YYYY")}`
    : "N/A";
    // const pickupDate = values.pickup_date
    // ? `${dayjs(values.pickup_date[0]).format("MM-DD-YYYY")} - ${dayjs(values.pickup_date[1]).format("MM-DD-YYYY")}`
    // : "N/A";

  // const dropoffRange = values.dropoff_range
  //   ? `${dayjs(values.dropoff_range[0]).format("MM-DD-YYYY")} - ${dayjs(values.dropoff_range[1]).format("MM-DD-YYYY")}`
  //   : "N/A";

    const vehicleTypesList = [];
    const vehicleDescriptions = [];

    for (let i = 1; i <= values.vehicle_count; i++) {
      const type = values[`vehicle_type_${i}`];
      vehicleTypesList.push(type);

      if (type === "Other" && values[`vehicle_description_${i}`]) {
        vehicleDescriptions.push(values[`vehicle_description_${i}`]);
      }
    }

    let selectedMemberName = values.referral_person
    let referralPerson = values.referral_person
    let recipientEmail;
  


  switch (referralPerson) {
    case "KJ":
      recipientEmail = "bclogisticsut@gmail.com";
      break;
    case "Braden":
      recipientEmail = "bclogisticsutah@gmail.com";
      break;
    case "Preston":
      recipientEmail = "PrestonBringhurst1@gmail.com";
      break;
    default:
      recipientEmail = "bclogisticsut@gmail.com";
      break;
  }

  

  // If "Other" is selected, use the entered custom name
  if (referralPerson === "Other" && values.custom_referral) {
     referralPerson = values.custom_referral;  
     selectedMemberName = "B&C Team"
  }


    // Construct the email template parameters
    const templateParams = {
      company_name: values.company_name,
      contact_person: values.contact_person,
      phone: values.phone,
      email: values.email,
      pickup_date: pickupDate,
      // dropoff_range: dropoffRange,
      pickup_state: values.pickup_state,
      dropoff_state: values.dropoff_state,
      vehicle_count: values.vehicle_count,
      vehicle_types: vehicleTypesList.join(", "),
      vehicle_descriptions:
        vehicleDescriptions.length > 0 ? vehicleDescriptions.join(", ") : "N/A",
        referral_person: selectedMemberName, 
        custom_referral: referralPerson, 
      recipient_email: recipientEmail,
    };

    // Send the email via EmailJS
    emailjs
      .send(
        "service_wdi8lb6",
        "template_uaut4lf",
        templateParams,
        "2COJPYtzfZS3kgvYb",
      )
      .then((response) => {
        console.log("Email successfully sent!", response);
        form.resetFields();
        notification.success({
          message: "Thanks!",
          description: "You're the best!",
          duration: 5,
        });
        navigate("/success");
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
        notification.error({
          message: "Submission Failed",
          description:
            "There was an error submitting the form. Please try again.",
        });
      });
  };

  return (
    <div className="transport-form-container">
      <Form
        form={form}
        onFinish={handleSubmit}
        className="transport-form"
        layout="vertical" 
        // style={{ overflowY: "auto" }}
        initialValues={{
          variant: "filled",
        }}
      >
        <h1 className="form-title">Transport Vehicle</h1>
        <p className="message-user">
          Fill out the information below and someone will reach out shortly.
        </p>
        {/* Company Name Field */}
        <Form.Item
          label="Company Name"
          name="company_name"
          className="form-item"
          rules={[{ required: true, message: "Please provide company name" }]}
        >
          <Input placeholder="Company Name"/>
        </Form.Item>

        {/* Contact Person Field */}
        <Form.Item
          label="Contact Person's Name"
          name="contact_person"
          className="form-item"
          rules={[
            {
              required: true,
              message: "Please provide the name of who to contact",
            },
          ]}
        >
          <Input placeholder="Contact Person" />
        </Form.Item>

        {/* Phone Number */}
        <Form.Item
          label="Phone Number"
          name="phone"
          className="form-item"
          rules={[
            { required: true, message: "Please provide a phone number" },
            {
              pattern: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit phone number",
            },
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
            { required: true, message: "Please provide your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="Enter your email" />
        </Form.Item>

      

        {/* Pick Up Date */}
        <Form.Item
          label="First Available Pick Up Date"
          name="pickup_date"
          className="form-item"
          rules={[
            {
              required: true,
              message: "Please provide the first available date of pick up",
              validator: (_, value) => {
                if (value && value[0] && value[0]) {
                  return Promise.resolve();

                }
                return Promise.reject("Please provide the first available date of pick up");
              },
            },
          ]}
        >
          <MyDateRangePicker/>
        
        </Form.Item>

        {/* Drop Off Date Range */}
        {/* <Form.Item
  label="Drop Off Date Range"
  name="dropoff_range"
  className="form-item"
  rules={[
    {
      required: true,
      message: "Please provide the date range for preferred drop off dates",
      validator: (_, value) => {
        if (value && value[0] && value[1]) {
          return Promise.resolve();
        }
        return Promise.reject("Please provide the date range for preferred drop off times");
      },
    },
  ]}
>
  <MyDateRangePicker />
</Form.Item> */}


      
       

        {/* Pick Up State */}
        <Form.Item
          label="Pick Up State"
          name="pickup_state"
          className="form-item"
          rules={[
            { required: true, message: "Please provide the state of pick up" },
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
            { required: true, message: "Please provide the state of drop off" },
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

        {/* Vehicle Count */}
        <Form.Item
          label="How Many Cars?"
          name="vehicle_count"
          className="form-item"
          rules={[
            { required: true, message: "Please select the number of vehicles" },
          ]}
        >
          <Select onChange={handleVehicleCountChange} placeholder= "Select Amount">
            {[...Array(9)].map((_, index) => (
              <Select.Option key={index + 1} value={index + 1}>
                {index + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        {/* Vehicle Type Fields */}
        {vehicleCount > 0 && (
          <>
            {[...Array(vehicleCount)].map((_, index) => (
              <div key={index}>
                <Form.Item
                  label={`Vehicle Type ${index + 1}`}
                  name={`vehicle_type_${index + 1}`}
                  className="form-item"
                  rules={[
                    {
                      required: true,
                      message: "Please provide the type of vehicle",
                    },
                  ]}
                >
                  <Select
                    onChange={(value) => handleVehicleTypeChange(value, index)}
                    placeholder ="Select Vehicle Type"
                  >
                    {vehicleTypes.map((type) => (
                      <Select.Option key={type} value={type}>
                        {type}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Additional input for 'Other...' vehicle type */}
                {vehicleTypesList[index] === "Other" && (
                  <Form.Item
                    label={`Vehicle Description ${index + 1}`}
                    name={`vehicle_description_${index + 1}`}
                    className="form-item"
                    rules={[
                      {
                        required: true,
                        message: "Please provide a description for the vehicle",
                      },
                    ]}
                  >
                    <Input placeholder="Provide vehicle description for other" />
                  </Form.Item>
                )}
              </div>
            ))}
          </>
        )}

<Form.Item
        label="How Did You Hear About Us?"
        name="referral_person"
        className="form-item"
        rules={[
          {
            required: true,
            message: "Please select the name of who referred you to our business",
          },
        ]}
      >
        <Select showSearch onChange={(value) => setSelectedReferral(value)}>
          {["KJ", "Braden", "Preston", "Other"].map((name) => (
            <Select.Option key={name} value={name}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {/* Show input field only if "Other" is selected */}
      {selectedReferral === "Other" && (
        <Form.Item
          name="custom_referral"
          label ="Who referred you to B&C?"
          className="form-item"
          rules={[
            {
              required: true,
              message: "Please enter the name of who referred you",
            },
          ]}
        >
          <Input placeholder="Enter referral name" />
        </Form.Item>
      )}
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
          // wrapperCol={{
          //   offset: 6,
          //   span: 16,
          // }}
        >
          <Button className="submit-btn" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
