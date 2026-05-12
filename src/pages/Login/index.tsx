import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Toaster } from 'sonner';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormField,
  FormItem,
  FormMessage,
  Input,
  message,
} from '@/components/ui';

type LoginFormValues = {
  account: string;
  password: string;
};

/**
 * 登录页：仅组合 `src/components/ui`（见 `docs/components.md`），
 * 视觉与间距走 DS token，行为与 Form / Input / Button 规格一致；
 * Arco 为规格中的 API 基线，业务页不直接 import `@arco-design/web-react`。
 */
export default function Login() {
  const form = useForm<LoginFormValues>({
    defaultValues: { account: '', password: '' },
  });

  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)] text-[var(--文字&图标-text&icon/无组件绑定/强调-primary)]">
      <Toaster position="top-right" richColors />

      <header className="flex items-center justify-end border-b border-[var(--边框-border/无组件绑定/描边_常规)] bg-[var(--填充-fill/无组件绑定/卡片背景_100-card-background)] px-[length:var(--ds-space-5)] py-[length:var(--ds-space-3)]">
        <Link
          to="/"
          className="text-[length:var(--ds-font-body)] font-medium text-[var(--accent)] underline-offset-4 hover:underline"
        >
          进入控制台（Dashboard）
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-[length:var(--ds-space-5)] py-[length:var(--ds-space-7)]">
        <Card className="w-full max-w-[22.5rem] shadow-[var(--elevation-sm)]">
          <CardHeader title="登录" />
          <CardBody className="flex flex-col gap-[length:var(--ds-space-5)]">
            <p className="text-[length:var(--ds-font-body-large)] leading-[1.5] text-[var(--文字&图标-text&icon/无组件绑定/辅助-territory)]">
              使用组织账号登录。提交成功后会弹出提示（演示，未请求真实接口）。
            </p>

            <Form
              form={form}
              id="login-form"
              className="flex flex-col gap-[length:var(--ds-space-4)]"
              onSubmit={(data) => {
                if (!data.account.trim()) {
                  form.setError('account', { type: 'required', message: '请输入账号' });
                  return;
                }
                if (!data.password) {
                  form.setError('password', { type: 'required', message: '请输入密码' });
                  return;
                }
                form.clearErrors();
                message.success('登录提交成功（演示提示）');
              }}
            >
              <FormField
                name="account"
                children={({ field }) => (
                  <FormItem label="账号" required htmlFor="login-account">
                    <Input
                      id="login-account"
                      type="text"
                      autoComplete="username"
                      placeholder="name@company.com"
                      aria-label="账号"
                      {...field}
                    />
                    <FormMessage name="account" />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                children={({ field }) => (
                  <FormItem label="密码" required htmlFor="login-password">
                    <Input
                      id="login-password"
                      type="password"
                      autoComplete="current-password"
                      placeholder="请输入密码"
                      aria-label="密码"
                      {...field}
                    />
                    <FormMessage name="password" />
                  </FormItem>
                )}
              />

              <div className="pt-[length:var(--ds-space-1)]">
                <Button variant="main" type="submit" form="login-form" className="w-full">
                  登录
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </main>
    </div>
  );
}
