import { toast } from 'sonner';

const message = {
  info: (body: string) => toast.info(body),
  success: (body: string) => toast.success(body),
  warning: (body: string) => toast.warning(body),
};

export default message;
