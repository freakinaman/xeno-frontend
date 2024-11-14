import React from "react";

const LandingPage = () => {
    const handleLogin = () => {
        window.location.href = "http://localhost:5000/auth/google"; // Redirect to Google OAuth
    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h1>Welcome to Xeno CRM</h1>
            <p>Please log in to continue</p>
            <button
                onClick={handleLogin}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    color: "#fff",
                    backgroundColor: "#4285F4",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Login with Google
            </button>
        </div>
    );
};

export default LandingPage;
