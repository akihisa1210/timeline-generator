import React, { FC, useEffect } from "react";
import p5 from "p5";

type Props = {
  sketch: any;
};

const Canvas: FC<Props> = ({ sketch }) => {
  useEffect(() => {
    new p5(sketch);
  }, [sketch]);

  return <></>;
};

export default Canvas;
