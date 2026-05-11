import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Toaster } from 'sonner';
import {
  Avatar,
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
  Input,
  message,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  Tabs,
} from '@/components/ui';

type ModalFormValues = {
  projectName: string;
  region: string;
};

const REGION_OPTIONS = [
  { value: 'cn', label: 'China (CN)' },
  { value: 'us', label: 'United States (US)' },
  { value: 'eu', label: 'Europe (EU)' },
];

function buildRows(): Record<string, unknown>[] {
  return Array.from({ length: 46 }, (_, i) => {
    const n = i + 1;
    const active = n % 5 !== 0;
    return {
      id: `row-${n}`,
      name: `Activity #${String(n).padStart(3, '0')}`,
      owner: n % 4 === 0 ? 'Ops' : n % 4 === 1 ? 'Finance' : 'Product',
      status: active ? 'active' : 'inactive',
      time: '2026-05-11 10:12',
    };
  });
}

export default function Dashboard() {
  const [nav, setNav] = useState<'dashboard' | 'projects' | 'settings'>('dashboard');
  const [tabKey, setTabKey] = useState('overview');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const allRows = useMemo(() => buildRows(), []);

  const pageRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return allRows.slice(start, start + pageSize);
  }, [allRows, page, pageSize]);

  const modalForm = useForm<ModalFormValues>({
    defaultValues: { projectName: '', region: 'cn' },
  });

  const statCards = [
    { label: 'Total revenue', value: '¥128,430', delta: 12 },
    { label: 'Active users', value: '3,842', delta: 5 },
    { label: 'Open tickets', value: '27', delta: 2 },
    { label: 'SLA (7d)', value: '99.95%', delta: 0 },
  ];

  const columns = useMemo(
    () => [
      {
        key: 'name',
        title: 'Event',
        dataIndex: 'name',
      },
      {
        key: 'owner',
        title: 'Team',
        dataIndex: 'owner',
      },
      {
        key: 'status',
        title: 'Status',
        dataIndex: 'status',
        render: (v: unknown) => {
          const active = v === 'active';
          return (
            <Space align="center" size="small">
              <Badge variant={active ? 'success' : 'default'} dot />
              <span className="text-[length:var(--ds-font-body)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                {active ? 'Active' : 'Inactive'}
              </span>
            </Space>
          );
        },
      },
      {
        key: 'time',
        title: 'Time',
        dataIndex: 'time',
      },
      {
        key: 'actions',
        title: 'Actions',
        align: 'right' as const,
        render: (_: unknown, record: Record<string, unknown>) => (
          <Space size="small">
            <Button size="small" variant="text" type="button" onClick={() => message.info(`View ${String(record.id)}`)}>
              View
            </Button>
            <Button
              size="small"
              variant="text"
              buttonType="danger"
              type="button"
              onClick={() => message.warning(`Remove ${String(record.id)}`)}
            >
              Remove
            </Button>
          </Space>
        ),
      },
    ],
    []
  );

  return (
    <div className="flex min-h-screen min-w-[1024px] flex-col bg-[var(--background)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
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
          <Input className="w-full" placeholder="Global search (projects, users, tickets…)" aria-label="Global search" />
        </div>

        <Space className="ml-auto shrink-0" align="center">
          <Button variant="main" type="button" onClick={() => setModalOpen(true)}>
            New project
          </Button>
          <Badge count={3}>
            <Avatar size="small" aria-label="User menu">
              WF
            </Avatar>
          </Badge>
        </Space>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="w-[14rem] shrink-0 border-r border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)] px-[length:var(--ds-space-3)] py-[length:var(--ds-space-7)]">
          <nav className="flex flex-col gap-[length:var(--ds-space-1)]">
            <Button
              type="button"
              variant="text"
              className={
                nav === 'dashboard'
                  ? 'w-full justify-start rounded-[length:var(--ds-radius-control)] px-[length:var(--ds-space-3)] bg-[var(--中性色-neutral/global-light/30-f7)]'
                  : 'w-full justify-start rounded-[length:var(--ds-radius-control)] px-[length:var(--ds-space-3)]'
              }
              onClick={() => setNav('dashboard')}
            >
              Dashboard
            </Button>
            <Button
              type="button"
              variant="text"
              className={
                nav === 'projects'
                  ? 'w-full justify-start rounded-[length:var(--ds-radius-control)] px-[length:var(--ds-space-3)] bg-[var(--中性色-neutral/global-light/30-f7)]'
                  : 'w-full justify-start rounded-[length:var(--ds-radius-control)] px-[length:var(--ds-space-3)]'
              }
              onClick={() => setNav('projects')}
            >
              Projects
            </Button>
            <Button
              type="button"
              variant="text"
              className={
                nav === 'settings'
                  ? 'w-full justify-start rounded-[length:var(--ds-radius-control)] px-[length:var(--ds-space-3)] bg-[var(--中性色-neutral/global-light/30-f7)]'
                  : 'w-full justify-start rounded-[length:var(--ds-radius-control)] px-[length:var(--ds-space-3)]'
              }
              onClick={() => setNav('settings')}
            >
              Settings
            </Button>
          </nav>
          <Divider className="my-[length:var(--ds-space-4)]" />
          <p className="text-[length:var(--ds-font-caption)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
            Signed in as <span className="text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">wang.fei</span>
          </p>
        </aside>

        <main className="flex-1 overflow-auto pl-[length:var(--ds-space-2)] pr-[length:var(--ds-space-7)] pb-[length:var(--ds-space-7)] pt-[length:var(--ds-space-7)]">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[length:var(--ds-space-7)]">
            <div>
              <h1 className="text-[length:var(--text-3xl)] font-semibold leading-[1.5] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                Dashboard
              </h1>
              <p className="mt-[length:var(--ds-space-1-5)] text-[length:var(--ds-font-body-large)] leading-[1.5] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
                Overview, activity, and quick actions — DSWebComLightV2026 tokens only.
              </p>
            </div>

            <section className="flex flex-col gap-[length:var(--ds-space-3)]">
              <h2 className="text-[length:var(--text-2xl)] font-semibold uppercase leading-[1.5] tracking-[0.05em] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                Key metrics
              </h2>
              <div className="grid grid-cols-4 gap-[length:var(--ds-space-5)]">
                {statCards.map((s) => (
                  <Card key={s.label}>
                    <CardBody className="flex flex-col gap-[length:var(--ds-space-2)]">
                      <div className="flex items-start justify-between gap-[length:var(--ds-space-2)]">
                        <span className="text-[length:var(--ds-font-caption)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
                          {s.label}
                        </span>
                        {s.delta > 0 ? <Badge count={s.delta} /> : null}
                      </div>
                      <span className="text-[length:var(--text-xl)] font-semibold leading-[1.5] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                        {s.value}
                      </span>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </section>

            <Card>
              <CardHeader title="Workspace" />
              <CardBody className="flex flex-col gap-[length:var(--ds-space-5)]">
                <Tabs
                  activeKey={tabKey}
                  onChange={setTabKey}
                  variant="line"
                  items={[
                    {
                      key: 'overview',
                      label: 'Overview',
                      children: (
                        <div className="flex flex-col gap-[length:var(--ds-space-5)]">
                          <div className="flex min-h-[15rem] flex-col justify-center rounded-[length:var(--ds-radius-surface)] border border-dashed border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)] px-[length:var(--ds-space-6)] py-[length:var(--ds-space-6)]">
                            <p className="text-[length:var(--ds-font-subtitle)] font-medium">Chart placeholder</p>
                            <p className="mt-[length:var(--ds-space-2)] max-w-[40rem] text-[length:var(--ds-font-body)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
                              Drop your charting library here. This region reserves spacing, radius, and borders from
                              DSWebComLightV2026 so the final chart chrome stays visually aligned.
                            </p>
                          </div>

                          <div>
                            <p className="mb-[length:var(--ds-space-3)] text-[length:var(--text-2xl)] font-semibold uppercase leading-[1.5] tracking-[0.05em] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                              Actions
                            </p>
                            <Space wrap>
                              <Button variant="main">Primary</Button>
                              <Button variant="secondary">Default</Button>
                              <Button variant="virtual" className="border-dashed">
                                Dashed
                              </Button>
                              <Button variant="text">Text</Button>
                              <Button variant="main" disabled>
                                Disabled
                              </Button>
                            </Space>
                          </div>
                        </div>
                      ),
                    },
                    {
                      key: 'activity',
                      label: 'Recent activity',
                      children: (
                        <div className="flex flex-col gap-[length:var(--ds-space-4)]">
                          <div className="flex flex-wrap items-center justify-between gap-[length:var(--ds-space-3)]">
                            <p className="text-[length:var(--ds-font-body)] font-medium text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
                              Operations queue
                            </p>
                            <Space align="center" size="small">
                              <span className="text-[length:var(--ds-font-caption)] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
                                Selected rows
                              </span>
                              <Badge count={selectedKeys.length} showZero />
                            </Space>
                          </div>
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
                        </div>
                      ),
                    },
                  ]}
                />
              </CardBody>
            </Card>
          </div>
        </main>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          modalForm.reset({ projectName: '', region: 'cn' });
        }}
        title="Create project"
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
              Cancel
            </Button>
            <Button variant="main" type="submit" form="dashboard-create-project">
              Save
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
              modalForm.setError('projectName', { type: 'required', message: 'Project name is required' });
              return;
            }
            message.success(`Created “${data.projectName}” in ${data.region.toUpperCase()}`);
            setModalOpen(false);
            modalForm.reset({ projectName: '', region: 'cn' });
          }}
        >
          <FormField
            name="projectName"
            children={({ field }) => (
              <FormItem label="Project name" required htmlFor="dashboard-project-name">
                <Input id="dashboard-project-name" placeholder="e.g. Growth analytics" {...field} />
                <FormMessage name="projectName" />
              </FormItem>
            )}
          />
          <FormField
            name="region"
            children={({ field }) => (
              <FormItem label="Region" htmlFor="dashboard-region">
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
