import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckOutSteps from "../components/checkOutSteps";
import FormContainer from "../components/FormContainer";

const ShippingScreen = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckOutSteps step1 step2 />
      <h1 className="Shipping mb-3">Shipping Details</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address">
          <Form.Label className="formLabel">Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter you address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
            className="formFields"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label className="formLabel">City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter you city"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            className="formFields"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label className="formLabel">Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter you postalCode"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
            className="formFields"
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country">
          <Form.Label className="formLabel">Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter you country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
            className="formFields"
          ></Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-center mb-3 ">
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </div>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
