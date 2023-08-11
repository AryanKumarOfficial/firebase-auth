import React, { useState } from 'react'
import { Form, Alert } from "react-bootstrap";
import { Button } from '@nextui-org/react';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import Link from 'next/link';
import { useUserAuth } from '@/context/UserAuthContext';
import { useRouter } from 'next/router';

const phonesignup = () => {
    const router = useRouter()
    const [error, setError] = useState("");
    const { setUpRecaptha } = useUserAuth();
    const [number, setNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [flag, setFlag] = useState(false)
    const [confirmObj, setConfirmObj] = useState(false)

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
            setConfirmObj(response)
            setFlag(true)
        } catch (error) {
            setError(error.message);
        }
    }

    const verifyOtp = async (e) => {
        e.preventDefault();
        console.log("otp", otp);
        setError("");
        if (otp === "" || otp === undefined) {
            return setError("Please enter otp")
        }
        try {
            await confirmObj.confirm(otp)
            router.push('/home')
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <div>
            <div className="p-4 box">
                <h2 className="mb-3">Firebase Auth Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={getOtp} className={`${flag ? "hidden" : "block"}`}>
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


                <Form onSubmit={verifyOtp} className={`${!flag ? "hidden" : "block"}`}>
                    <Form.Group className="mb-3" controlId="formBasicOtp">
                        <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                    </Form.Group>
                    <div id="recaptcha-container" />
                    <div className="button-right">
                        <Link href="/">
                            <Button color="primary">
                                Cancel
                            </Button>
                        </Link> &nbsp;

                        <Button color="secondary" type="submit">
                            Verify OTP
                        </Button>
                    </div>

                </Form>
            </div>
        </div>
    )
}

export default phonesignup