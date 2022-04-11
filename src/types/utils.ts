// interface StyleField {
//     left: number;
//     top: number;
//     width: number;
//     height: number;
//     minW: number;
//     minH: number;
//     bgColor: string;
//     fontSize: number;
//     z: number;
// }

// type NameType = keyof StyleField;
// interface OriginType {
//     name: NameType;
//     value: string | number;
// }
// const Origin = {
//     name: 'left',
//     value: 1,
// };

// type OriginNameT = (typeof Origin)['name']

// type Check<T extends object, K extends object> = T[K];

// type Result = Check<OriginType, StyleField[OriginType['name']]>;

// console.log(Origin);
