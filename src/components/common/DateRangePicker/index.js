import React from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import moment from "moment";
import { Form } from "react-bootstrap";

export const CustomDateRange = ({ handleCallback }) => {
  const getCustomRanges = () => {
    return {
      Today: [moment(), moment()],
      Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
      "Last 7 Days": [moment().subtract(6, "days"), moment()],
      "Last 30 Days": [moment().subtract(29, "days"), moment()],
      "Last 90 Days": [moment().subtract(89, "days"), moment()],
      "Last 365 Days": [moment().subtract(364, "days"), moment()],
    };
  };

  return (
    <DateRangePicker
      initialSettings={{
        showDropdowns: true,
        startDate: moment().subtract(6, "days"),
        endDate: moment(),
        showCustomRangeLabel: true,
        alwaysShowCalendars: true,
        ranges: getCustomRanges(),
        maxDate: moment(),
      }}
      onCallback={handleCallback}
    >
      <Form.Control type="text" />
    </DateRangePicker>
  );
};
