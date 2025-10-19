import {
  Tag,
  Card,
  Space,
  Input,
  Table,
  Button,
  Layout,
  Segmented,
  Typography,
} from "antd";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { FilterOutlined, ArrowLeftOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Content } = Layout;
const { Title } = Typography;

const InvoiceReceived = () => {
  const navigate = useNavigate();
  const [invoiceData, setInvoiceData] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    fetch("/src/data/InvoiceReceivedData.json")
      .then((response) => response.json())
      .then((data) => {
        setInvoiceData(data);
        setFilteredData(data.invoices);
      })
      .catch((error) => console.error("Error loading invoice data:", error));
  }, []);

  const handleTabChange = (status) => {
    setActiveTab(status);
    if (!invoiceData) return;

    if (status === "all") {
      setFilteredData(invoiceData.invoices);
    } else {
      setFilteredData(
        invoiceData.invoices.filter((invoice) => invoice.status === status)
      );
    }
  };

  const handleSearch = (value) => {
    if (!invoiceData) return;

    if (!value) {
      handleTabChange(activeTab);
      return;
    }

    const filtered = invoiceData.invoices.filter(
      (invoice) =>
        invoice.companyName.toLowerCase().includes(value.toLowerCase()) ||
        invoice.orderId.toLowerCase().includes(value.toLowerCase()) ||
        invoice.invoiceId.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const formatAmount = (num) => {
    return new Intl.NumberFormat("en-IN").format(num);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "green";
      case "rejected":
        return "red";
      case "pending":
        return "orange";
      default:
        return "default";
    };
  };

  const expandedRowRender = (record) => {
    return (
      <div style={{ padding: 10 }}>
        <Title level={5}>Remark</Title>
        <p>
          {record.remark ? (
            record.remark
          ) : (
            <>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
              <br />
              The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here,'
              <br />
              content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum.
            </>
          )}
        </p>
      </div>
    );
  };

  const columns = [
    {
      title: "All",
      dataIndex: "select",
      width: 50,
      render: () => <input type="checkbox" />,
    },
    {
      title: "No",
      dataIndex: "id",
      width: 60,
    },
    {
      title: "Company name",
      dataIndex: "companyName",
      width: 200,
    },
    {
      title: "GST or Pan",
      dataIndex: "gstPan",
      width: 150,
    },
    {
      title: "Order ID",
      dataIndex: "orderId",
      width: 120,
    },
    {
      title: "Invoice ID",
      dataIndex: "invoiceId",
      width: 120,
    },
    {
      title: "Issued date",
      dataIndex: "issuedDate",
      width: 120,
    },
    {
      title: "Invoice amount",
      dataIndex: "invoiceAmount",
      width: 150,
      render: (amount) => `₹ ${formatAmount(amount)}`,
    },
    {
      title: "Department",
      dataIndex: "department",
      width: 120,
    },
    {
      title: "Status",
      dataIndex: "status",
      width: 100,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
  ];

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <NavBar />

      <Content className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between gap-2 text-sm text-gray-500 mb-2">
            <span>Dashboard {">"} Invoice Received</span>
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => navigate("/")}
              className="p-0 h-auto text-gray-500"
            >
              Dashboard
            </Button>
          </div>
          <Title level={2} className="m-0">
            Invoice Received
          </Title>
        </div>

        <div className="flex justify-between items-center my-4">
          <Segmented
            options={[
              { label: 'All', value: 'all' },
              { label: 'Approved', value: 'approved' },
              { label: 'Rejected', value: 'rejected' },
              { label: 'Pending', value: 'pending' },
            ]}
            value={activeTab}
            onChange={handleTabChange}
          />

          <Space>
            <Search
              placeholder="Search..."
              allowClear
              onSearch={handleSearch}
              style={{ width: 200 }}
            />
            <Button icon={<FilterOutlined />}>Filter</Button>
          </Space>
        </div>

        <Card>
          <Table
            rowKey="id"
            columns={columns}
            dataSource={filteredData}
            expandable={{
              expandedRowRender: expandedRowRender,
              rowExpandable: () => true,
            }}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </Card>
      </Content>
    </Layout>
  );
};

export default InvoiceReceived;
