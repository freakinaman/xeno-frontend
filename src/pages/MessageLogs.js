import React, { useEffect, useState } from "react";
import { Table, Input, Select, Button, Alert } from "antd";
import { getMessageLogs } from "../services/api";
import "../App.css";
import { useNavigate } from "react-router-dom";

const { Option } = Select;


const MessageLogs = () => {
    const [logs, setLogs] = useState([]);
    const [campaignId, setCampaignId] = useState("");
    const [status, setStatus] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchLogs = async (filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getMessageLogs(filters);
            setLogs(response.data);
        } catch (err) {
            console.error("Failed to fetch message logs:", err.message);
            setError("Failed to fetch message logs. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs(); // Fetch all logs on initial load
    }, []);

    const handleFilter = () => {
        const filters = {};
        if (campaignId) filters.campaignId = campaignId;
        if (status) filters.status = status;
        fetchLogs(filters);
    };

    const clearFilters = () => {
        setCampaignId("");
        setStatus("");
        fetchLogs(); // Fetch all logs again
    };

    const navigate = useNavigate();

    const columns = [
        { title: "Campaign ID", dataIndex: "campaignId", key: "campaignId" },
        { title: "Customer ID", dataIndex: "customerId", key: "customerId" },
        { title: "Message", dataIndex: "message", key: "message" },
        { title: "Status", dataIndex: "status", key: "status" },
        { title: "Sent At", dataIndex: "sentAt", key: "sentAt" },
    ];

    return (
        <div className="fullPage"> 
            <h2>Message Logs</h2>
            {error && (
                <Alert
                    message="Error"
                    description={error}
                    type="error"
                    showIcon
                    style={{ marginBottom: 16 }}
                />
            )}
            <div style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Filter by Campaign ID"
                    value={campaignId}
                    onChange={(e) => setCampaignId(e.target.value)}
                    style={{ width: 200, marginRight: 8 }}
                />
                <Select
                    placeholder="Filter by Status"
                    value={status}
                    onChange={(value) => setStatus(value)}
                    style={{ width: 150, marginRight: 8 }}
                >
                    <Option value="SENT">SENT</Option>
                    <Option value="FAILED">FAILED</Option>
                </Select>
                <Button
                    type="primary"
                    onClick={handleFilter}
                    loading={loading}
                    style={{ marginRight: 8 }}
                >
                    Apply Filters
                </Button>
                <Button onClick={clearFilters} disabled={loading}>
                    Clear Filters
                </Button>
            </div>
            {logs.length === 0 && !loading ? (
                <p>No logs found. Adjust your filters or try again later.</p>
            ) : (
                <Table
                    dataSource={logs}
                    columns={columns}
                    rowKey="_id"
                    loading={loading}
                />
            )}
            <Button type="primary" onClick={() => navigate(-1)}>
                    Back
                </Button>
        </div>
    );
};

export default MessageLogs;
