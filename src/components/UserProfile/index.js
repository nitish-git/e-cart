import React from "react";
import { Col, Form, Row, Button } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "./profile.css";

export const UserProfile = ({ isUserLoading, user }) => {
  const userInitials = user?.name
    ?.split(" ")
    .slice(0, 2)
    .map((e) => e.substr(0, 1))
    .join("");

  const UserThumbnailSkeleton = () => (
    <>
      <Skeleton circle={true} height={250} width={250} />
      <Skeleton height={33} />
      <Skeleton height={26} />
    </>
  );

  const UserDetailsSkeleton = () => (
    <>
      <Skeleton height={27} />
      <div className="mv-20">
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={18} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={18} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
        <Skeleton height={37} className="mb-10" />
      </div>
      <Skeleton height={37} />
    </>
  );

  const RenderThumbnailSection = () =>
    isUserLoading ? (
      <UserThumbnailSkeleton />
    ) : (
      <>
        <div className="profile-thumbnail">{userInitials}</div>
        <h3 className="user-name">{user?.name}</h3>
        <p className="user-email">{user?.email}</p>
      </>
    );

  const RenderForm = () => (
    <>
      <h4 className="form-heading">Profile Settings</h4>
      <Row className="field-group">
        <Col sm={12} md={6} className="mb-10">
          <Form.Control
            type="text"
            placeholder="First Name"
            value={user?.name?.split(" ")[0]}
          />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={user?.name?.split(" ")[1]}
          />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control
            type="email"
            placeholder="Email Address"
            value={user?.email}
          />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="Phone Number" />
        </Col>

        <h6 className="mt-10">Billing Address</h6>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="Address Line 1" />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="Address Line 2" />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="City" />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="State" />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="ZipCode" />
        </Col>

        <h6 className="mt-10">Shipping Address</h6>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="Address Line 1" />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="Address Line 2" />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="City" />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="State" />
        </Col>
        <Col sm={12} md={6} className="mb-10">
          <Form.Control type="text" placeholder="ZipCode" />
        </Col>
      </Row>

      <Button variant="success" className="setting-button mt-10">
        Save Settings
      </Button>
    </>
  );

  return (
    <div>
      <Row>
        <Col sm={12} md={1} className="mb-20" />
        <Col sm={12} md={4} className="profile-image-wrapper mb-20">
          <div className="profile-thumbnail-container">
            <RenderThumbnailSection />
          </div>
        </Col>
        <Col sm={12} md={6} className="content-wrapper mb-20">
          <div className="form-container">
            {isUserLoading ? <UserDetailsSkeleton /> : <RenderForm />}
          </div>
        </Col>
        <Col sm={12} md={1} className="mb-20" />
      </Row>
    </div>
  );
};
