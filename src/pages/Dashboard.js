import React, { useEffect, useState } from "react";
import { Button, Card, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../services/api";

const { Title, Text } = Typography;

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

const fetchUser = async () => {
    try {
        const response = await getUserDetails(); // API call to fetch user details
        console.log("User details response:", response.data); // Debug the API response
        setUser(response.data);
    } catch (err) {
        console.error("Failed to fetch user:", err.message);
    } finally {
        setLoading(false);
    }
};


    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = () => {
    window.location.href = "https://xeno-assignment-production.up.railway.app/auth/logout";
};

    if (loading) {
        return <div style={{ textAlign: "center", marginTop: "20%" }}>Loading...</div>;
    }

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "rgb(242, 220, 189)", // Light cream background
                fontFamily: "'Roboto', sans-serif", // Better font style
            }}
        >
            <Card
                style={{
                    width: "800px", // Increased width
                    padding: "50px", // Increased padding
                    textAlign: "center",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)", // Enhanced shadow
                    borderRadius: "20px", // More rounded corners
                    backgroundColor: "white", // White box background
                }}
            >
                <Title level={3} style={{ fontSize: "36px", fontWeight: "bold" }}>
                    Welcome to Xeno CRM
                </Title>
                <Text style={{ fontSize: "24px", marginBottom: "20px" }}>
                    Hello, <strong>{user?.displayName || "User"}</strong>!
                </Text>
                <p style={{ fontSize: "22px", marginBottom: "15px" }}>Email: {user?.email || "Not provided"}</p>
                <p style={{ fontSize: "20px", color: "#666", marginBottom: "30px" }}>
                    Explore your campaigns and message logs below:
                </p>

                <div style={{ marginTop: "30px" }}>
                    <Button
                        type="primary"
                        style={{
                            margin: "20px",
                            fontSize: "18px", // Larger font for buttons
                            padding: "15px 30px", // Bigger padding
                            height: "40px",
                        }}
                        onClick={() => navigate("/campaigns")}
                    >
                        View Campaigns
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            margin: "20px",
                            fontSize: "18px",
                            padding: "15px 30px",
                            height: "40px",
                        }}
                        onClick={() => navigate("/logs")}
                    >
                        View Message Logs
                    </Button>
                    <Button
                        type="primary"
                        style={{
                            margin: "20px",
                            fontSize: "18px",
                            padding: "15px 30px",
                            height: "40px", 
                        }}
                        onClick={() => navigate("/audience-builder")}
                    >
                        Audience Builder
                    </Button>
                <div>
                    <Button
                        danger
                        style={{
                            margin: "20px",
                            fontSize: "18px",
                            padding: "15px 30px",
                        }}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
