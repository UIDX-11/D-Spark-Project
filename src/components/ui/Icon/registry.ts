import moneyCircle from '../../../../.design-spec/assets/icons/out/money-circle.svg?raw';
import userCircle from '../../../../.design-spec/assets/icons/out/user-circle.svg?raw';
import cart from '../../../../.design-spec/assets/icons/out/cart.svg?raw';
import ticket from '../../../../.design-spec/assets/icons/out/ticket.svg?raw';
import shieldCheck from '../../../../.design-spec/assets/icons/out/shield-check.svg?raw';
import trendUp from '../../../../.design-spec/assets/icons/out/trend-up.svg?raw';
import trendDown from '../../../../.design-spec/assets/icons/out/trend-down.svg?raw';
import trendFlat from '../../../../.design-spec/assets/icons/out/trend-flat.svg?raw';
import chartLine from '../../../../.design-spec/assets/icons/out/chart-line.svg?raw';
import chartPie from '../../../../.design-spec/assets/icons/out/chart-pie.svg?raw';
import chartBar from '../../../../.design-spec/assets/icons/out/chart-bar.svg?raw';
import medal from '../../../../.design-spec/assets/icons/out/medal.svg?raw';
import tableRows from '../../../../.design-spec/assets/icons/out/table-rows.svg?raw';

import type { IconName } from './types';

export const ICON_REGISTRY: Record<IconName, string> = {
  'money-circle': moneyCircle,
  'user-circle': userCircle,
  cart,
  ticket,
  'shield-check': shieldCheck,
  'trend-up': trendUp,
  'trend-down': trendDown,
  'trend-flat': trendFlat,
  'chart-line': chartLine,
  'chart-pie': chartPie,
  'chart-bar': chartBar,
  medal,
  'table-rows': tableRows,
};
