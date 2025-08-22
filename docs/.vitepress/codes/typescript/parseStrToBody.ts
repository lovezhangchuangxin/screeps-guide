/**
 * 解析数字字符串
 */
export type ParseNumber<S> = S extends `${infer N extends number}` ? N : never;

export const charBodyPartMap = {
  m: MOVE,
  w: WORK,
  a: ATTACK,
  c: CARRY,
  h: HEAL,
  r: RANGED_ATTACK,
  t: TOUGH,
  l: CLAIM,
};

/**
 * 字符到部件的映射
 */
export type CharBodyPartMap = typeof charBodyPartMap;

/**
 * 字符串转部件数组类型
 */
export type StrToBody<
  S extends string,
  Parts extends BodyPartConstant[] = [],
  Count extends number = 0,
  Result extends any[] = []
> = S extends `${infer Part}${infer Rest}`
  ? Part extends keyof CharBodyPartMap
    ? StrToBody<
        Rest,
        Count extends 0
          ? [...Parts, CharBodyPartMap[Part]]
          : [CharBodyPartMap[Part]],
        0,
        Count extends 0
          ? Result
          : [...Result, [Parts["length"] extends 1 ? Parts[0] : Parts, Count]]
      >
    : StrToBody<
        Rest,
        Parts,
        Count extends 0 ? ParseNumber<Part> : ParseNumber<`${Count}${Part}`>,
        Result
      >
  : [...Result, [Parts["length"] extends 1 ? Parts[0] : Parts, Count]];

/**
 * 字符串转部件数组
 */
export const parseStrToBody = <S extends string>(
  bodyString: S
): StrToBody<S> => {
  let parts: BodyPartConstant[] = [];
  let count = 0;
  const result: any[] = [];

  for (const char of bodyString) {
    if (char in charBodyPartMap) {
      const part = charBodyPartMap[char as keyof typeof charBodyPartMap];
      if (count === 0) {
        parts.push(charBodyPartMap[char as keyof typeof charBodyPartMap]);
      } else {
        result.push([parts.length === 1 ? parts[0] : parts, count]);
        parts = [part];
      }
      count = 0;
    } else {
      count = count * 10 + +char;
    }
  }

  if (count !== 0) {
    result.push([parts.length === 1 ? parts[0] : parts, count]);
  }

  return result as StrToBody<S>;
};
