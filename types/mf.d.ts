// sales/types/mf.d.ts
declare module 'host/cartApi' {
  import type { CartApi } from '@mfe/contracts';
  const cartApi: CartApi;
  export default cartApi;
  export { cartApi };
}
