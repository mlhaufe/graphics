export const zip = <T, U>(ts: T[], us: U[]): [T, U][] =>
    ts.reduce((acc, t, i) => acc.concat([[t, us[i]]]), []);