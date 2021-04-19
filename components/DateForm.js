import React, {useState} from 'react'
import {FormControl, InputGroup} from 'react-bootstrap';
import DatePicker from "react-datepicker"

export default function DateForm(props) {
    const [selectedDate, setselectedDate] = useState(props.selected);
    const handleOnChange = date => {
        setselectedDate(date);
        props.handleChangeDate(date);
    };
    const CustomInput = React.forwardRef(({placeholder, value, onClick, onChange}, ref) => (
        <InputGroup className="mb-3">
            <FormControl placeholder={placeholder} value={value} onClick={onClick}
                         ref={ref} onChange={onChange}/>
            <InputGroup.Append>
                <InputGroup.Text onClick={onClick}><i className="fa fa-calendar"/></InputGroup.Text>
            </InputGroup.Append>
        </InputGroup>
    ))

    return (
        <>
            <DatePicker
                selected={selectedDate}
                onChange={handleOnChange}
                placeholderText="yyyy-mm-dd"
                dateFormat="yyyy-MM-dd"
                customInput={<CustomInput/>}
            />
        </>
    )
}