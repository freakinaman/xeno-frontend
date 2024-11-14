import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { sendMessages } from "../services/api";
import { Spin, Alert, Button } from "antd";
import "../App.css";

const SendMessages = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [logs, setLogs] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Trigger sending messages when the page loads
        sendMessagesForCampaign();
    }, []);

    const sendMessagesForCampaign = async () => {
        try {
            setLoading(true);
            const response = await sendMessages(id); // Call the API to send messages
            setLogs(response.data.logs); // Set the response logs
        } catch (err) {
            setError("Failed to send messages. Please try again.");
            console.error("Error sending messages:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fullPage">
            <h2>Send Messages</h2>
            {loading ? (
                <Spin size="large" />
            ) : error ? (
                <Alert message={error} type="error" showIcon />
            ) : (
                <>
                    <Alert
                        message="Messages sent successfully!"
                        type="success"
                        showIcon
                        style={{ marginBottom: "20px" }}
                    />
                    <h3>Message Logs</h3>
                    {logs.length > 0 ? (
                        <ul>
                            {logs.map((log) => (
                                <li key={log._id}>
                                    Customer ID: {log.customerId} - Status: {log.status}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No logs available.</p>
                    )}
                    <Button type="primary" onClick={sendMessagesForCampaign}>
                        Resend Messages
                    </Button>
                </>
            )}
        </div>
    );
};

export default SendMessages;
