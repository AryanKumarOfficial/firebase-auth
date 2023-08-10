"use client"
import React from "react";
// import { Button } from "react-bootstrap";
import { Button } from "@nextui-org/react";
// import { useNavigate } from "react-router";
import { useRouter } from "next/router";
import { useUserAuth } from "../context/UserAuthContext";

const Home = () => {
    const { logOut, user } = useUserAuth();
    const navigate = useRouter();
    const handleLogout = async () => {
        try {
            await logOut();
            navigate.push("/");
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <div className="p-4 box mt-3 text-center">
                Hello Welcome <br />
                {user && user.email}
            </div>
            <div className="d-grid gap-2">
                <Button color="primary" onClick={handleLogout}>
                    Log out
                </Button>
            </div>
        </>
    );
};

export default Home;