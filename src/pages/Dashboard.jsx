import Cards from "../components/Cards";
import Chart from "../components/Chart";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { Layout, Typography, Row, Col } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const navigate = useNavigate();
  const [chartData, setChartData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch("/src/data/DashboardData.json")
      .then((response) => response.json())
      .then((data) => setDashboardData(data))
      .catch((error) => console.error("Error loading dashboard data:", error));

    fetch("/src/data/ChartData.json")
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error("Error loading chart data:", error));
  }, []);

  const handleCardClick = (cardId) => {
    if (cardId === "invoice-received") {
      navigate("/invoice-received");
    }
  };

  const formatAmount = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  if (!dashboardData || !chartData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <NavBar />

      <Content className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Dashboard</span>
          </div>
          <Title level={2} className="m-0">
            Dashboard
          </Title>
        </div>

        <div className="mb-6 w-[350px]">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <span className="text-sm font-medium">Over all outstanding</span>
              <span className="text-2xl font-bold text-gray-900">
                {dashboardData.overallOutstanding.currency}{" "}
                {formatAmount(dashboardData.overallOutstanding.amount)}
              </span>
            </div>
          </div>
        </div>

        <Row gutter={[16, 16]} className="mb-6">
          {dashboardData.cards.map((card) => (
            <Col xs={24} sm={12} lg={6} key={card.id}>
              <Cards
                icon={card.icon}
                title={card.title}
                total={card.total}
                amount={card.amount}
                onClick={() => handleCardClick(card.id)}
                clickable={card.id === "invoice-received"}
              />
            </Col>
          ))}
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={12}>
            <Chart data={chartData.queues} title="Queues" />
          </Col>
          <Col xs={24} lg={12}>
            <Chart data={chartData.kpi} title="KPI" />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
