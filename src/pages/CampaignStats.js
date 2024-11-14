import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCampaignStats } from "../services/api";
import { Card, Typography, Statistic, Row, Col, Spin } from "antd";
import "../App.css";

const { Title, Text } = Typography;

const CampaignStats = () => {
    const { id } = useParams();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await getCampaignStats(id);
            setStats(response.data);
        } catch (err) {
            console.error("Failed to fetch campaign stats:", err.message);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div style={{ textAlign: "center", marginTop: "20%" }}>
                <Spin size="large" />
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="fullPage" style={{ textAlign: "center", padding: "20px" }}>
                <p>No data available for this campaign.</p>
            </div>
        );
    }

    return (
        <div className="fullPage" style={{ backgroundColor: "#f7f9fc", padding: "30px" }}>
            <Card
                style={{
                    width: "80%",
                    margin: "0 auto",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    borderRadius: "12px",
                    padding: "20px",
                }}
            >
                <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
                    Campaign Stats
                </Title>
                <Text
                    style={{
                        display: "block",
                        textAlign: "center",
                        fontSize: "18px",
                        marginBottom: "30px",
                        color: "#595959",
                    }}
                >
                    <strong>Campaign Name:</strong> {stats.campaign}
                </Text>

                <Row gutter={16} style={{ marginBottom: "30px" }}>
                    <Col xs={24} sm={12}>
                        <Card style={{ textAlign: "center" }}>
                            <Statistic
                                title="Messages Sent"
                                value={stats.stats.SENT}
                                valueStyle={{ color: "#3f8600", fontSize: "24px" }}
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Card style={{ textAlign: "center" }}>
                            <Statistic
                                title="Messages Failed"
                                value={stats.stats.FAILED}
                                valueStyle={{ color: "#cf1322", fontSize: "24px" }}
                            />
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default CampaignStats;
