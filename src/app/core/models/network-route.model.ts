export interface NetworkRoute {
  uuid: string;
  address: string;
  mask: string;
  gateway: string;
  interface: string;
}

export interface NetworkRouteResponse {
  routes: NetworkRoute[];
  total: number;
}
