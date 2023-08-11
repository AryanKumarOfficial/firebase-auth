import React, { useState } from 'react'
import { Form, Alert } from "react-bootstrap";
import { Button } from '@nextui-org/react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Link from 'next/link';
import { useUserAuth } from '@/context/UserAuthContext';

const phonesignup = () => {
    const [error, setError] = useState("");
    const { setUpRecaptha } = useUserAuth();
    const [number, setNumber] = useState("")
    const getOtp = async (e) => {
        e.preventDefault();
        console.log("number", number);
        setError("");
        if (number === "" || number === undefined) {
            return setError("Please enter phone number")
        }
        try {
            const response = await setUpRecaptha(number);
            console.log("response", response);
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div>
            <div className="p-4 box">
                <h2 className="mb-3">Firebase Auth Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={getOtp}>
                    <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
                        <PhoneInput
                            defaultCountry='US'
                            value={number}
                            onChange={setNumber}
                            placeholder="Enter phone number"
                        />
                    </Form.Group>
                    <div id="recaptcha-container" />
                    <div className="button-right">
                        <Link href="/">
                            <Button color="primary">
                                Cancel
                            </Button>
                        </Link> &nbsp;

                        <Button color="secondary" type="submit">
                            Send OTP
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default phonesignup