// TODO: Want <https://github.com/microsoft/TypeScript/issues/54925>
export type NumericRange<
    Start extends number,
    End extends number,
    Arr extends unknown[] = [],
    Acc extends number = never
> = Arr['length'] extends End ? Acc | Start | End : NumericRange<Start, End, [...Arr, 1], Arr[Start] extends undefined ? Acc : Acc | Arr['length']>;
