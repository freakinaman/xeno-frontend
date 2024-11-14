import React, { useState } from "react";
import { createCampaign } from "../services/api";
import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CreateCampaign = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            setLoading(true);
            await createCampaign(values);
            navigate("/");
        } catch (err) {
            console.error("Failed to create campaign:", err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fullPage">
            <h2>Create Campaign</h2>
            <Form onFinish={onFinish}>
                <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="audienceCriteria"
                    label="Audience Criteria"
                    rules={[{ required: true }]}
                >
                    <Input.TextArea placeholder='e.g., {"totalSpending": { "$gte": 10000 }}' />
                </Form.Item>
                <Form.Item name="message" label="Message" rules={[{ required: true }]}>
                    <Input.TextArea placeholder="Hi [Name], enjoy 10% off on your next purchase!" />
                </Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Submit
                </Button>
                <Button type="primary" onClick={() => navigate("/campaigns")}>
                    Back
                </Button>
            </Form>
        </div>
    );
};

export default CreateCampaign;
