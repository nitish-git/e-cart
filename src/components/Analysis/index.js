import React from "react";
import { Col, Row } from "react-bootstrap";
import { BarChart, PieChart } from "../Charts";

export const AnalysisComponent = ({ dataForBarChart, dataForPieChart }) => {
  return (
    <div className="mh-5">
      <h5 className="centered-heading">Analysis Report</h5>
      <Row className="mb-3">
        <Col className="mt-10 d-flex justify-content-center">
          <div className="analysis-card">
            <BarChart
              data={dataForBarChart}
              title="Most Viewed Product"
              horizontalAxisTitle="Views"
              verticalAxisTitle="Products"
            />
          </div>
        </Col>
        <Col className="mt-10 d-flex justify-content-center">
          <div className="analysis-card">
            <PieChart data={dataForPieChart} title="Most Ordered Product" />
          </div>
        </Col>
      </Row>
    </div>
  );
};
