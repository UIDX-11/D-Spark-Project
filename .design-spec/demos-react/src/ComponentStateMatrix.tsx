import { useState } from "react";
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Cascader,
  Checkbox,
  DatePicker,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Layout,
  List,
  Menu,
  Message,
  Modal,
  Notification,
  PageHeader,
  Pagination,
  Progress,
  Radio,
  Select,
  Slider,
  Space,
  Statistic,
  Steps,
  Switch,
  Table,
  Tabs,
  Tag,
  TimePicker,
  Tree,
  TreeSelect,
  Typography,
  Upload,
  VerificationCode,
} from "@arco-design/web-react";
import { arcoDocUrl } from "./arcoDocRoutes";

const cascaderOptions = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [{ value: "hangzhou", label: "Hangzhou" }],
  },
];

const treeData = [
  {
    title: "Root",
    key: "0-0",
    children: [{ title: "Child", key: "0-0-0" }],
  },
];

const tableCols = [
  { title: "Name", dataIndex: "name" },
  { title: "Age", dataIndex: "age" },
];

const tableData = [
  { key: "1", name: "A", age: 1 },
  { key: "2", name: "B", age: 2 },
];

function DocHint({ slug }: { slug: string }) {
  return (
    <Typography.Text type="secondary" style={{ fontSize: 11 }}>
      对照 <Typography.Text style={{ fontSize: 11 }}>{arcoDocUrl(slug)}</Typography.Text>
      ；在此卡片内加厚与官网一致的子矩阵。
    </Typography.Text>
  );
}

function ModalMatrix() {
  const [visible, setVisible] = useState(false);
  return (
    <Space direction="vertical" size={8}>
      <Button type="primary" size="mini" onClick={() => setVisible(true)}>
        open
      </Button>
      <Button size="mini" disabled>
        disabled
      </Button>
      <Modal title="Arco Modal" visible={visible} onOk={() => setVisible(false)} onCancel={() => setVisible(false)}>
        <Typography.Text type="secondary">与官网 Modal 交互一致</Typography.Text>
      </Modal>
    </Space>
  );
}

export default function ComponentStateMatrix({ slug }: { slug: string }) {
  switch (slug) {
    case "alert":
      return (
        <Space direction="vertical" size={6} style={{ width: "100%" }}>
          <Alert type="success" content="Success" />
          <Alert type="warning" content="Warning" />
          <Alert type="info" content="Info" />
        </Space>
      );
    case "badge":
      return (
        <Space size={12}>
          <Badge count={5}>
            <Tag>Inbox</Tag>
          </Badge>
          <Badge dot>
            <Tag>Dot</Tag>
          </Badge>
        </Space>
      );
    case "breadcrumb":
      return (
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Page</Breadcrumb.Item>
        </Breadcrumb>
      );
    case "button":
      return (
        <Space wrap size={8}>
          <Button type="primary">primary</Button>
          <Button type="secondary">secondary</Button>
          <Button type="outline">outline</Button>
          <Button disabled>disabled</Button>
          <Button type="primary" loading>
            loading
          </Button>
        </Space>
      );
    case "card":
      return (
        <Card size="small" title="Card">
          <Typography.Text type="secondary">hover / 边框态以 Arco 为准</Typography.Text>
        </Card>
      );
    case "cascader":
      return <Cascader size="small" options={cascaderOptions} placeholder="Select" style={{ width: "100%" }} />;
    case "checkbox":
      return (
        <Space direction="vertical" size={8}>
          <Checkbox defaultChecked>Checked</Checkbox>
          <Checkbox disabled>Disabled</Checkbox>
        </Space>
      );
    case "data-display-number":
      return <Statistic title="Value" value={93.12} />;
    case "datepicker":
      return <DatePicker size="small" style={{ width: "100%" }} />;
    case "dropdown":
      return (
        <Dropdown
          droplist={
            <Menu>
              <Menu.Item key="1">Item 1</Menu.Item>
              <Menu.Item key="2">Item 2</Menu.Item>
            </Menu>
          }
        >
          <Button size="small">Hover menu</Button>
        </Dropdown>
      );
    case "form":
      return (
        <Form layout="vertical" style={{ maxWidth: 260 }}>
          <Form.Item label="Name">
            <Input placeholder="input" />
          </Form.Item>
        </Form>
      );
    case "input":
      return (
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Input placeholder="default" />
          <Input status="error" placeholder="error" />
          <Input disabled placeholder="disabled" />
        </Space>
      );
    case "input-adornment":
      return <Input addBefore="https://" size="small" placeholder="domain" />;
    case "input-ip":
      return <Input size="small" placeholder="192.168.0.1" />;
    case "input-number":
      return (
        <Space direction="vertical" size={8}>
          <InputNumber mode="button" defaultValue={10} style={{ width: 120 }} />
          <InputNumber disabled defaultValue={3} style={{ width: 120 }} />
        </Space>
      );
    case "input-range":
      return <Slider range defaultValue={[20, 60]} style={{ width: "100%" }} />;
    case "layout":
      return (
        <Layout style={{ height: 88, border: "1px solid var(--color-border-2)" }}>
          <Layout.Header style={{ height: 28, lineHeight: "28px", paddingInline: 8, fontSize: 12 }}>Header</Layout.Header>
          <Layout>
            <Layout.Sider style={{ width: 56, padding: 4, fontSize: 11 }}>Sider</Layout.Sider>
            <Layout.Content style={{ padding: 4, fontSize: 11 }}>Content</Layout.Content>
          </Layout>
        </Layout>
      );
    case "list":
      return (
        <List size="small" split={false}>
          <List.Item key="1">Row A</List.Item>
          <List.Item key="2">Row B</List.Item>
        </List>
      );
    case "menu":
      return (
        <Menu mode="vertical" defaultSelectedKeys={["1"]} style={{ width: 140, maxHeight: 120, overflow: "auto" }}>
          <Menu.Item key="1">Menu item 1</Menu.Item>
          <Menu.Item key="2">Menu item 2</Menu.Item>
        </Menu>
      );
    case "message":
      return (
        <Space direction="vertical" size={6}>
          <Button size="mini" onClick={() => Message.info({ content: "Info message" })}>
            Message.info
          </Button>
          <Typography.Text type="secondary" style={{ fontSize: 10 }}>
            触发态与官网一致
          </Typography.Text>
        </Space>
      );
    case "modal":
      return <ModalMatrix />;
    case "notification":
      return (
        <Button
          size="mini"
          onClick={() =>
            Notification.info({
              id: "demos-react-notification",
              title: "Title",
              content: "Notification content",
            })
          }
        >
          Notification.info
        </Button>
      );
    case "pageheader":
      return <PageHeader title="Title" subTitle="Subtitle" style={{ padding: 0 }} />;
    case "pagination":
      return <Pagination size="mini" total={50} pageSize={10} defaultCurrent={1} />;
    case "pincode":
      return <VerificationCode length={4} />;
    case "progress":
      return (
        <Space direction="vertical" size={8} style={{ width: "100%" }}>
          <Progress percent={40} />
          <Progress percent={100} status="success" />
        </Space>
      );
    case "radio":
      return (
        <Radio.Group defaultValue="a">
          <Radio value="a">A</Radio>
          <Radio value="b">B</Radio>
          <Radio disabled value="c">
            Disabled
          </Radio>
        </Radio.Group>
      );
    case "select":
      return (
        <Select
          size="small"
          placeholder="Select"
          style={{ width: "100%" }}
          options={[
            { label: "One", value: "1" },
            { label: "Two", value: "2" },
          ]}
        />
      );
    case "slider":
      return <Slider defaultValue={40} style={{ width: "100%" }} />;
    case "space":
      return (
        <Space wrap size={8}>
          <Tag>default</Tag>
          <Tag color="arcoblue">color</Tag>
          <Button size="mini">btn</Button>
        </Space>
      );
    case "steps":
      return (
        <Steps current={1} style={{ maxWidth: 320 }}>
          <Steps.Step title="Done" />
          <Steps.Step title="Running" />
          <Steps.Step title="Waiting" />
        </Steps>
      );
    case "switch":
      return (
        <Space size={16}>
          <Switch defaultChecked />
          <Switch disabled />
        </Space>
      );
    case "table":
      return <Table size="small" columns={tableCols} data={tableData} pagination={false} />;
    case "tabs":
      return (
        <Tabs defaultActiveTab="1" type="line">
          <Tabs.TabPane key="1" title="Tab 1">
            <Typography.Text type="secondary">Pane 1</Typography.Text>
          </Tabs.TabPane>
          <Tabs.TabPane key="2" title="Tab 2">
            <Typography.Text type="secondary">Pane 2</Typography.Text>
          </Tabs.TabPane>
        </Tabs>
      );
    case "tag":
      return (
        <Space wrap size={8}>
          <Tag>default</Tag>
          <Tag color="green">success</Tag>
          <Tag closable>closable</Tag>
        </Space>
      );
    case "timepicker":
      return <TimePicker size="small" style={{ width: "100%" }} />;
    case "tree":
      return <Tree treeData={treeData} defaultExpandedKeys={["0-0"]} style={{ maxHeight: 120, overflow: "auto" }} />;
    case "treeselect":
      return <TreeSelect size="small" treeData={treeData} placeholder="TreeSelect" style={{ width: "100%" }} />;
    case "upload":
      return (
        <Upload tip="autoUpload=false，选择文件不发起请求" autoUpload={false} defaultFileList={[]} action="/" />
      );
    default:
      return <DocHint slug={slug} />;
  }
}
