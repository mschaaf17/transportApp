import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // Import CSS for date picker styling

const MyDateRangePicker = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    return (
        <div>
            <DatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)} 
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start Date"
            />
            <DatePicker 
                selected={endDate} 
                onChange={(date) => setEndDate(date)} 
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate}
                placeholderText="End Date"
            />
        </div>
    );
};

export default MyDateRangePicker;