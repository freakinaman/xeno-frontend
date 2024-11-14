import React, { useState } from "react";
import { Input, Select, Button, Table, notification } from "antd";
import { calculateAudienceSize, createCampaign } from "../services/api"; // API calls
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AudienceBuilder = () => {
    const [conditions, setConditions] = useState([]);
    const [audienceSize, setAudienceSize] = useState(null);
    const [loading, setLoading] = useState(false);
    const [campaignName, setCampaignName] = useState("");
    const [message, setMessage] = useState("");

    // Add a new condition
    const addCondition = () => {
        setConditions([...conditions, { field: "", operator: "", value: "" }]);
    };

    // Update a specific condition
    const updateCondition = (index, key, value) => {
        const updatedConditions = [...conditions];
        updatedConditions[index][key] = value;
        setConditions(updatedConditions);
    };

    // Remove a specific condition
    const removeCondition = (index) => {
        const updatedConditions = conditions.filter((_, i) => i !== index);
        setConditions(updatedConditions);
    };

    // Calculate audience size
    const fetchAudienceSize = async () => {
        setLoading(true);
        try {
            const criteria = conditions.reduce((acc, condition) => {
                acc[condition.field] = { [condition.operator]: condition.value };
                return acc;
            }, {});
    
            const response = await calculateAudienceSize({ criteria }); // Send as { criteria }
            setAudienceSize(response.data.size);
            notification.success({ message: "Audience size calculated successfully!" });
        } catch (err) {
            console.error("Failed to calculate audience size:", err);
            notification.error({ message: "Failed to calculate audience size." });
        } finally {
            setLoading(false);
        }
    };

    // Create Campaign
    const handleCreateCampaign = async () => {
        setLoading(true);
        try {
            const payload = {
                name: campaignName,
                audienceCriteria: conditions,
                message,
            };
            await createCampaign(payload);
            notification.success({ message: "Campaign created successfully!" });
        } catch (err) {
            console.error("Failed to create campaign:", err);
            notification.error({ message: "Failed to create campaign." });
        } finally {
            setLoading(false);
        }
    };
    const navigate = useNavigate();

    // Columns for conditions table
    const columns = [
        {
            title: "Field",
            dataIndex: "field",
            render: (_, record, index) => (
                <Select
                    value={record.field}
                    onChange={(value) => updateCondition(index, "field", value)}
                    style={{ width: "100%" }}
                >
                    <Option value="totalSpending">Total Spending</Option>
                    <Option value="visits">Visits</Option>
                    <Option value="lastVisitedAt">Last Visited</Option>
                </Select>
            ),
        },
        {
            title: "Operator",
            dataIndex: "operator",
            render: (_, record, index) => (
                <Select
                    value={record.operator}
                    onChange={(value) => updateCondition(index, "operator", value)}
                    style={{ width: "100%" }}
                >
                    <Option value="$gte">≥</Option>
                    <Option value="$lte">≤</Option>
                    <Option value="$eq">=</Option>

                </Select>
            ),
        },
        {
            title: "Value",
            dataIndex: "value",
            render: (_, record, index) => (
                <Input
                    value={record.value}
                    onChange={(e) => updateCondition(index, "value", e.target.value)}
                />
            ),
        },
        {
            title: "Actions",
            dataIndex: "actions",
            render: (_, __, index) => (
                <Button type="link" danger onClick={() => removeCondition(index)}>
                    Remove
                </Button>
            ),
        },
    ];

    return (
        <div className="fullPage">
            <h2>Audience Builder</h2>
            <Input
                placeholder="Campaign Name"
                value={campaignName}
                onChange={(e) => setCampaignName(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Input
                placeholder="Message Template (e.g., Hi [Name], enjoy 10% off!)"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{ marginBottom: 10 }}
            />
            <Table
                dataSource={conditions}
                columns={columns}
                rowKey={(record, index) => index}
                pagination={false}
            />
            <Button type="dashed" onClick={addCondition} style={{ margin: "10px 0" }}>
                Add Condition
            </Button>
            <div style={{marginBottom:"20px"}}>
                <Button type="primary" onClick={fetchAudienceSize} loading={loading} style={{ marginRight: 10 }}>
                    Calculate Audience Size
                </Button>
                {audienceSize !== null && <span>Audience Size: {audienceSize}</span>}
            
                <Button type="primary" onClick={handleCreateCampaign} loading={loading}>
                    Create Campaign
                </Button>
            </div>
            <div>
            <Button type="primary" onClick={() => navigate(-1)}>
                    Back
                </Button>
            </div>
        </div>
    );
};

export default AudienceBuilder;
