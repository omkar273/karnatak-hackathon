import { FC } from "react";

export const VSpacer: FC<{ height: number | string }> = ({ height }) => {
  return <div style={{ height: height }}></div>;
};

export const HSpacer: FC<{ width: number | string }> = ({ width }) => {
  return <div style={{ width: width }}></div>;
};
