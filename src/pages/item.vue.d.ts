declare const _default: import("vue").DefineComponent<{}, {}, {
    globalScore: number;
    globalGrade: string;
    selectedTimeframe: string;
    timeframes: string[];
    fohiGrades: {
        name: string;
        grade: string;
        color: string;
    }[];
    keyMetrics: {
        label: string;
        value: string;
        change: string;
        trend: string;
        icon: string;
        color: string;
        bgColor: string;
        iconBg: string;
    }[];
    dimensionData: {
        dimension: string;
        score: number;
        note: string;
        color: string;
        target: number;
    }[];
    evolutionData: {
        mois: string;
        rentabilite: number;
        endettement: number;
        tresorerie: number;
        scoreGlobal: number;
    }[];
    benchmarkData: {
        indicateur: string;
        entreprise: number;
        secteur: number;
        excellence: number;
    }[];
    esgData: {
        critere: string;
        score: number;
        target: number;
    }[];
    risksMatrix: {
        risque: string;
        probabilite: string;
        impact: string;
        score: number;
        niveau: string;
        mitigation: string;
    }[];
    alerts: {
        type: string;
        title: string;
        message: string;
        action: string;
        icon: string;
        color: string;
    }[];
}, {}, {
    generate(): void;
    goToHome(): void;
    formatDate(date: any): any;
    getRiskColor(niveau: any): any;
    createCharts(): void;
    createDimensionChart(): void;
}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {}, {}, string, import("vue").ComponentProvideOptions, true, {}, any>;
export default _default;
