import 'figma:foundry-client-api'
import './src/styles/index.css'
const __modules__ = import.meta.glob('./src/DSWebComLightV22026/**/*.{ts,tsx,js,jsx}');
export const __importLibraryModule__ = (path) => {
  const key = '.' + path;
  const loader = __modules__[key];
  if (!loader) throw new Error('Module not found: ' + path + ' (key: ' + key + ')');
  return loader();
};
export const Code0_8 = () => import('./src/app/App.tsx');