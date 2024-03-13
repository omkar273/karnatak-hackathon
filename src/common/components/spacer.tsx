import { FC } from "react";

export const VSpacer: FC<{ height: number }> = ({ height }) => {
  return <div style={{ height: height }}></div>;
};

export const HSpacer: FC<{ width: number }> = ({ width }) => {
  return <div style={{ width: width }}></div>;
};
