import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MyDateRangePicker = ({ value = [], onChange }) => {
    const [startDate] = value || []; // Get values from Form.Item
    const [isOpen, setIsOpen] = useState(false); // Control visibility

    const handleStartDateChange = (date) => {
        onChange([date]); // Update Form value
        setIsOpen(false); // Close the picker
    };

    return (
        <div className='date-pickers'>
            <DatePicker 
                className='single-date-picker'
                selected={startDate} 
                onChange={handleStartDateChange} 
                selectsStart
                startDate={startDate}
                popperPlacement="bottom"
                onSelect={() => setIsOpen(false)} // Close picker after selection
                onClickOutside={() => setIsOpen(false)} // Close on outside click
                open={isOpen} // Control visibility
                onFocus={() => setIsOpen(true)} // Open when focused
            />
        </div>
    );
};

export default MyDateRangePicker;




// import React from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { ArrowRightOutlined } from "@ant-design/icons";

// const MyDateRangePicker = ({ value = [], onChange }) => {
//     const [startDate, endDate] = value || []; // Get values from Form.Item

//     const handleStartDateChange = (date) => {
//         onChange([date, endDate]); // Update Form value
//     };

//     const handleEndDateChange = (date) => {
//         onChange([startDate, date]); // Update Form value
//     };

//     return (
//         <div className='date-pickers'>
//             <DatePicker 
//                 className='single-date-picker'
//                 selected={startDate} 
//                 onChange={handleStartDateChange} 
//                 selectsStart
//                 startDate={startDate}
//                 endDate={endDate}
//                 placeholderText="Start Date"
//                 popperPlacement="bottom-start"
//             />
//             <p><ArrowRightOutlined className='arrow' /></p>
//             <DatePicker 
//                 className='single-date-picker'
//                 selected={endDate} 
//                 onChange={handleEndDateChange} 
//                 selectsEnd
//                 startDate={startDate}
//                 endDate={endDate}
//                 minDate={startDate}
//                 placeholderText="End Date"
//                 popperPlacement="bottom-start"
//             />
//         </div>
//     );
// };

// export default MyDateRangePicker;
