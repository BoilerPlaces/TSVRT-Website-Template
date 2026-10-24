import type { ComponentType } from 'react';
import PublicPage from './PublicPage';

const routes: {
  path: string;
  Component: ComponentType;
}[] = [{ path: '/', Component: PublicPage }];
export default routes;
