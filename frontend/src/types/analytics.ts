export interface AppRole {
    id: number;
    name: string;
    description: string;
}

export interface AnalyticsState {
    chartData: any,
    appFilter: any,
    appRoles: AppRole []
}
