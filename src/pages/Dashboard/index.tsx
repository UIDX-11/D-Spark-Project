import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import {
  Avatar,
  BarChart,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Form,
  FormField,
  FormItem,
  FormMessage,
  Icon,
  Input,
  LineChart,
  List,
  ListItem,
  message,
  Modal,
  Pagination,
  PieChart,
  Progress,
  Select,
  Space,
  Statistic,
  Table,
  Tag,
} from '@/components/ui';
import type {
  IconName,
  StatisticTrend,
  TagTheme,
} from '@/components/ui';

type ModalFormValues = {
  projectName: string;
  region: string;
};

type TimeRange = 'week' | 'month' | 'year';

const REGION_OPTIONS = [
  { value: 'cn', label: 'China (CN)' },
  { value: 'us', label: 'United States (US)' },
  { value: 'eu', label: 'Europe (EU)' },
];

type StatItem = {
  key: string;
  title: string;
  value: number;
  unit?: string;
  icon: IconName;
  trend: StatisticTrend;
};

const STAT_ITEMS: StatItem[] = [
  {
    key: 'revenue',
    title: '总收入',
    value: 128430,
    unit: '元',
    icon: 'money-circle',
    trend: { direction: 'up', value: 12, description: 'vs 上周' },
  },
  {
    key: 'users',
    title: '活跃用户',
    value: 3842,
    icon: 'user-circle',
    trend: { direction: 'up', value: 5, description: 'vs 上周' },
  },
  {
    key: 'orders',
    title: '订单总数',
    value: 1284,
    icon: 'cart',
    trend: { direction: 'down', value: 3, description: 'vs 上周' },
  },
  {
    key: 'sla',
    title: 'SLA（7 日）',
    value: 99.95,
    unit: '%',
    icon: 'shield-check',
    trend: { direction: 'flat', value: '持平', description: '本周' },
  },
];

const TIME_RANGE_OPTIONS: { key: TimeRange; label: string }[] = [
  { key: 'week', label: '近 7 日' },
  { key: 'month', label: '近 5 周' },
  { key: 'year', label: '近 12 月' },
];

const TIME_RANGE_LABELS: Record<TimeRange, string[]> = {
  week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  month: ['W1', 'W2', 'W3', 'W4', 'W5'],
  year: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
};

const TIME_RANGE_USERS: Record<TimeRange, number[]> = {
  week: [820, 932, 901, 1290, 1330, 1520, 1490],
  month: [3200, 3520, 3680, 3842, 4020],
  year: [2400, 2600, 2900, 3100, 3300, 3500, 3700, 3842, 3900, 4050, 4200, 4350],
};

const TIME_RANGE_ORDERS: Record<TimeRange, number[]> = {
  week: [220, 260, 280, 350, 410, 480, 460],
  month: [950, 1080, 1180, 1284, 1320],
  year: [820, 900, 950, 1020, 1080, 1140, 1200, 1284, 1320, 1400, 1450, 1520],
};

const PIE_DATA = [
  { name: '直营', value: 4200 },
  { name: '加盟', value: 2580 },
  { name: '电商', value: 1820 },
  { name: '代理', value: 940 },
  { name: '其他', value: 360 },
];

const BAR_X = ['官网', '小程序', 'App', '社群', '广告', '线下', '客服'];
const BAR_SERIES = [
  { name: '本周订单', data: [820, 932, 901, 690, 1330, 520, 480] },
  { name: '上周订单', data: [620, 832, 901, 590, 1100, 460, 400] },
];

type RankRow = {
  id: string;
  name: string;
  percent: number;
};

const RANK_DATA: RankRow[] = [
  { id: 'sku-1', name: '智能音箱 Pro', percent: 92 },
  { id: 'sku-2', name: '便携投影仪 X1', percent: 78 },
  { id: 'sku-3', name: '可穿戴心率计', percent: 64 },
  { id: 'sku-4', name: '无线降噪耳机', percent: 52 },
  { id: 'sku-5', name: '智能家居路由器', percent: 41 },
  { id: 'sku-6', name: '云端摄像头 2K', percent: 33 },
];

function rankTheme(index: number): TagTheme {
  if (index === 0) return 'danger';
  if (index === 1) return 'warning';
  if (index === 2) return 'primary';
  return 'neutral';
}

function buildTableRows(): Record<string, unknown>[] {
  return Array.from({ length: 46 }, (_, i) => {
    const n = i + 1;
    const active = n % 5 !== 0;
    return {
      id: `row-${n}`,
      name: `活动 #${String(n).padStart(3, '0')}`,
      owner: n % 4 === 0 ? '运营' : n % 4 === 1 ? '财务' : '产品',
      status: active ? 'active' : 'inactive',
      time: '2026-05-11 10:12',
    };
  });
}

export default function Dashboard() {
  const [nav, setNav] = useState<'dashboard' | 'projects' | 'settings'>('dashboard');
  const [timeRange, setTimeRange] = useState<TimeRange>('week');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const allRows = useMemo(() => buildTableRows(), []);
  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allRows.slice(start, start + pageSize);
  }, [allRows, page, pageSize]);

  const modalForm = useForm<ModalFormValues>({
    defaultValues: { projectName: '', region: 'cn' },
  });

  const pieTotal = useMemo(
    () => PIE_DATA.reduce((acc, item) => acc + item.value, 0),
    []
  );

  const columns = useMemo(
    () => [
      { key: 'name', title: '事件', dataIndex: 'name' },
      { key: 'owner', title: '团队', dataIndex: 'owner' },
      {
        key: 'status',
        title: '状态',
        dataIndex: 'status',
        render: (v: unknown) => {
          const active = v === 'active';
          return (
            <Space align="center" size="small">
              <Badge variant={active ? 'success' : 'default'} dot />
              <span className="text-[length:var(--ds-font-body)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                {active ? '运行中' : '已停止'}
              </span>
            </Space>
          );
        },
      },
      { key: 'time', title: '时间', dataIndex: 'time' },
      {
        key: 'actions',
        title: '操作',
        align: 'right' as const,
        render: (_: unknown, record: Record<string, unknown>) => (
          <Space size="small">
            <Button
              size="small"
              variant="text"
              type="button"
              onClick={() => message.info(`查看 ${String(record.id)}`)}
            >
              查看
            </Button>
            <Button
              size="small"
              variant="text"
              buttonType="danger"
              type="button"
              onClick={() => message.warning(`删除 ${String(record.id)}`)}
            >
              删除
            </Button>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-[var(--background)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
      <Toaster position="top-right" richColors />

      <header className="sticky top-0 z-30 flex items-center gap-[length:var(--ds-space-4)] border-b border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)] px-[length:var(--ds-space-7)] py-[length:var(--ds-space-3-5)]">
        <div className="flex min-w-[10rem] items-center gap-[length:var(--ds-space-3)]">
          <div className="flex h-[length:var(--ds-control-height-md)] w-[length:var(--ds-control-height-md)] items-center justify-center rounded-[length:var(--ds-radius-control)] bg-[var(--主色-primary/global-light/50-22)] text-[length:var(--ds-font-caption)] font-semibold text-[var(--图标色-icon/纯白-white)]">
            DS
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-[length:var(--ds-font-subtitle)] font-semibold text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
              Enterprise Admin
            </span>
            <span className="text-[length:var(--ds-font-body-large)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
              DSWebComLightV2026
            </span>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[32rem] flex-1 justify-center">
          <Input
            className="w-full"
            placeholder="全局搜索（项目、用户、工单……）"
            aria-label="全局搜索"
          />
        </div>

        <Space className="ml-auto shrink-0" align="center">
          <Link
            to="/login"
            className="text-[length:var(--ds-font-body)] font-medium text-[var(--accent)] underline-offset-4 hover:underline"
          >
            登录页
          </Link>
          <Button variant="main" type="button" onClick={() => setModalOpen(true)}>
            新建项目
          </Button>
          <Badge count={3}>
            <Avatar size="small" aria-label="用户菜单">
              WF
            </Avatar>
          </Badge>
        </Space>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-[14rem] shrink-0 border-r border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)] px-[length:var(--ds-space-3)] py-[length:var(--ds-space-7)]">
          <nav className="flex flex-col gap-[length:var(--ds-space-1)]">
            {(
              [
                { key: 'dashboard', label: '控制台' },
                { key: 'projects', label: '项目' },
                { key: 'settings', label: '设置' },
              ] as const
            ).map((it) => (
              <Button
                key={it.key}
                type="button"
                variant="text"
                className={
                  nav === it.key
                    ? 'w-full justify-start rounded-[length:var(--ds-radius-control)] px-[length:var(--ds-space-3)] bg-[var(--中性色-neutral/global-light/30-f7)]'
                    : 'w-full justify-start rounded-[length:var(--ds-radius-control)] px-[length:var(--ds-space-3)]'
                }
                onClick={() => setNav(it.key)}
              >
                {it.label}
              </Button>
            ))}
          </nav>
          <Divider className="my-[length:var(--ds-space-4)]" />
          <p className="text-[length:var(--ds-font-caption)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
            登录账号：
            <span className="text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">wang.fei</span>
          </p>
        </aside>

        <main className="flex-1 overflow-auto pl-[length:var(--ds-space-2)] pr-[length:var(--ds-space-7)] pb-[length:var(--ds-space-7)] pt-[length:var(--ds-space-7)]">
          <div className="mx-auto flex w-full max-w-[1480px] flex-col gap-[length:var(--ds-space-7)]">
            <div>
              <h1 className="text-[length:var(--text-3xl)] font-semibold leading-[1.5] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                数据总览
              </h1>
              <p className="mt-[length:var(--ds-space-1-5)] text-[length:var(--ds-font-body-large)] leading-[1.5] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
                顶部核心指标 · 中部趋势与结构 · 底部排名与明细 — 仅使用 D-Spark 基础组件与 token 组装。
              </p>
            </div>

            {/* 顶部概览区：4 个核心指标 */}
            <section className="grid grid-cols-1 gap-[length:var(--ds-space-5)] min-[1024px]:grid-cols-2 min-[1920px]:grid-cols-4">
              {STAT_ITEMS.map((item) => (
                <Card key={item.key}>
                  <CardBody>
                    <Statistic
                      title={item.title}
                      value={item.value}
                      groupSeparator
                      prefix={<Icon name={item.icon} size="lg" />}
                      unit={item.unit}
                      trend={item.trend}
                    />
                  </CardBody>
                </Card>
              ))}
            </section>

            {/* 中部图表区：趋势 + 环形 */}
            <section className="grid grid-cols-1 gap-[length:var(--ds-space-5)] min-[1024px]:grid-cols-3">
              <Card className="min-[1024px]:col-span-2">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-[length:var(--ds-space-3)]">
                    <Space align="center" size="small">
                      <Icon name="chart-line" size="md" color="var(--accent)" />
                      <span className="text-[length:var(--ds-font-title)] font-semibold text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                        用户 & 订单趋势
                      </span>
                    </Space>
                    <Space align="center" size="small" wrap>
                      {TIME_RANGE_OPTIONS.map((opt) => (
                        <Button
                          key={opt.key}
                          type="button"
                          size="small"
                          variant={timeRange === opt.key ? 'secondary' : 'text'}
                          className={
                            timeRange === opt.key
                              ? 'rounded-[length:var(--ds-radius-control)]'
                              : 'rounded-[length:var(--ds-radius-control)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]'
                          }
                          onClick={() => setTimeRange(opt.key)}
                          aria-pressed={timeRange === opt.key}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </Space>
                  </div>
                </CardHeader>
                <CardBody>
                  <LineChart
                    key={timeRange}
                    xAxis={TIME_RANGE_LABELS[timeRange]}
                    dualY
                    yAxisName="用户量"
                    yAxisNameRight="订单量"
                    series={[
                      {
                        name: '用户量',
                        data: TIME_RANGE_USERS[timeRange],
                        yAxisIndex: 0,
                        area: true,
                      },
                      {
                        name: '订单量',
                        data: TIME_RANGE_ORDERS[timeRange],
                        yAxisIndex: 1,
                      },
                    ]}
                    height={320}
                  />
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <Space align="center" size="small">
                    <Icon name="chart-pie" size="md" color="var(--accent)" />
                    <span className="text-[length:var(--ds-font-title)] font-semibold text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                      渠道占比
                    </span>
                  </Space>
                </CardHeader>
                <CardBody>
                  <PieChart
                    data={PIE_DATA}
                    donut
                    centerLabel="总订单"
                    centerValue={pieTotal.toLocaleString('en-US')}
                    height={320}
                  />
                </CardBody>
              </Card>
            </section>

            {/* 渠道对比柱状图 */}
            <section>
              <Card>
                <CardHeader>
                  <Space align="center" size="small">
                    <Icon name="chart-bar" size="md" color="var(--accent)" />
                    <span className="text-[length:var(--ds-font-title)] font-semibold text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                      各渠道订单对比
                    </span>
                  </Space>
                </CardHeader>
                <CardBody>
                  <BarChart
                    xAxis={BAR_X}
                    series={BAR_SERIES}
                    xAxisRotate={28}
                    height={300}
                  />
                </CardBody>
              </Card>
            </section>

            {/* 底部数据区：排名 + 表格 */}
            <section className="grid grid-cols-1 gap-[length:var(--ds-space-5)] min-[1024px]:grid-cols-5">
              <Card className="min-[1024px]:col-span-2">
                <CardHeader>
                  <Space align="center" size="small">
                    <Icon name="medal" size="md" color="var(--accent)" />
                    <span className="text-[length:var(--ds-font-title)] font-semibold text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                      热门商品 Top 6
                    </span>
                  </Space>
                </CardHeader>
                <CardBody>
                  <List
                    bordered
                    data={RANK_DATA}
                    rowKey="id"
                    renderItem={(item, index) => (
                      <ListItem
                        prefix={
                          <Tag theme={rankTheme(index)} size="small" subtle={index > 2}>
                            {String(index + 1).padStart(2, '0')}
                          </Tag>
                        }
                        extra={
                          <span className="w-12 text-right text-[length:var(--ds-font-caption)] tabular-nums text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
                            {item.percent}%
                          </span>
                        }
                      >
                        <div className="flex flex-col gap-[length:var(--ds-space-1)]">
                          <span className="truncate text-[length:var(--ds-font-body)] font-medium text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                            {item.name}
                          </span>
                          <Progress
                            percentage={item.percent}
                            size="small"
                            theme={
                              index === 0
                                ? 'danger'
                                : index === 1
                                  ? 'warning'
                                  : index === 2
                                    ? 'primary'
                                    : 'neutral'
                            }
                          />
                        </div>
                      </ListItem>
                    )}
                  />
                </CardBody>
              </Card>

              <Card className="min-[1024px]:col-span-3">
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-[length:var(--ds-space-3)]">
                    <Space align="center" size="small">
                      <Icon name="table-rows" size="md" color="var(--accent)" />
                      <span className="text-[length:var(--ds-font-title)] font-semibold text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                        最近活动
                      </span>
                    </Space>
                    <Space align="center" size="small">
                      <span className="text-[length:var(--ds-font-caption)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
                        已选行数
                      </span>
                      <Badge count={selectedKeys.length} showZero />
                    </Space>
                  </div>
                </CardHeader>
                <CardBody className="flex flex-col gap-[length:var(--ds-space-4)]">
                  <Table
                    columns={columns}
                    dataSource={pageRows}
                    rowKey="id"
                    rowSelection={{
                      selectedRowKeys: selectedKeys,
                      onChange: setSelectedKeys,
                      getCheckboxProps: (record) => ({
                        disabled: record.id === 'row-3',
                      }),
                    }}
                  />
                  <Pagination
                    current={page}
                    total={allRows.length}
                    pageSize={pageSize}
                    showSizeChanger
                    onChange={(p) => setPage(p)}
                    onPageSizeChange={(ps) => setPageSize(ps)}
                  />
                </CardBody>
              </Card>
            </section>
          </div>
        </main>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          modalForm.reset({ projectName: '', region: 'cn' });
        }}
        title="新建项目"
        footer={
          <Space>
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                setModalOpen(false);
                modalForm.reset({ projectName: '', region: 'cn' });
              }}
            >
              取消
            </Button>
            <Button variant="main" type="submit" form="dashboard-create-project">
              保存
            </Button>
          </Space>
        }
      >
        <Form
          form={modalForm}
          id="dashboard-create-project"
          className="flex flex-col gap-[length:var(--ds-space-4)]"
          onSubmit={(data) => {
            if (!data.projectName.trim()) {
              modalForm.setError('projectName', {
                type: 'required',
                message: '项目名称不能为空',
              });
              return;
            }
            message.success(`已创建 "${data.projectName}"，区域：${data.region.toUpperCase()}`);
            setModalOpen(false);
            modalForm.reset({ projectName: '', region: 'cn' });
          }}
        >
          <FormField
            name="projectName"
            children={({ field }) => (
              <FormItem label="项目名称" required htmlFor="dashboard-project-name">
                <Input
                  id="dashboard-project-name"
                  placeholder="例如：增长分析平台"
                  {...field}
                />
                <FormMessage name="projectName" />
              </FormItem>
            )}
          />
          <FormField
            name="region"
            children={({ field }) => (
              <FormItem label="区域" htmlFor="dashboard-region">
                <Select
                  id="dashboard-region"
                  options={REGION_OPTIONS}
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormMessage name="region" />
              </FormItem>
            )}
          />
        </Form>
      </Modal>
    </div>
  );
}
