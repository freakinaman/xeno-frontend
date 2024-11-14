import React, { useEffect, useState } from "react";
import { getCampaigns, deleteCampaign } from "../services/api";
import { Table, Button, Modal, notification } from "antd";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CampaignsList = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state for the table
    const navigate = useNavigate();

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        setLoading(true);
        try {
            const response = await getCampaigns();
            setCampaigns(response.data);
        } catch (err) {
            console.error("Failed to fetch campaigns:", err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (id) => {
        Modal.confirm({
            title: "Are you sure you want to delete this campaign?",
            content: "This action cannot be undone.",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",
            onOk: async () => {
                try {
                    await deleteCampaign(id);
                    notification.success({ message: "Campaign deleted successfully." });
                    fetchCampaigns(); // Refresh the campaigns list
                } catch (err) {
                    console.error("Failed to delete campaign:", err.message);
                    notification.error({ message: "Failed to delete campaign." });
                }
            },
        });
    };

    const columns = [
        { title: "Name", dataIndex: "name", key: "name" },
        { title: "Created At", dataIndex: "createdAt", key: "createdAt" },
        {
            title: "Actions",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button
                        type="link"
                        onClick={() => navigate(`/campaigns/${record._id}`)}
                        style={{ marginRight: "10px" }}
                    >
                        View Stats
                    </Button>
                    <Button
                        type="link"
                        onClick={() => navigate(`/send/${record._id}`)}
                        style={{ marginRight: "10px" }}
                    >
                        Send Messages
                    </Button>
                    <Button
                        type="link"
                        danger
                        onClick={() => handleDelete(record._id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div className="fullPage">
            <h2>Campaigns</h2>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                <Button type="primary" onClick={() => navigate("/create")}>
                    Create Campaign
                </Button>
                <Button type="primary" onClick={() => navigate("/logs")}>
                    View Message Logs
                </Button>
            </div>
            <Table
                dataSource={campaigns}
                columns={columns}
                rowKey="_id"
                loading={loading}
                bordered
            />
            <Button type="primary" onClick={() => navigate("/dashboard")} style={{ marginTop: "20px" }}>
                Back
            </Button>
        </div>
    );
};

export default CampaignsList;
