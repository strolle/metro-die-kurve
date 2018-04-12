import {
  assert,
  chain,
  first,
} from "./basics";
import * as styles from "./styles/index.scss";

const pxToInt = chain(
   first(assert((s: string) => /^\d+px$/.test(s)))
  .then(parseInt)
);

export const CANVAS_WIDTH = 559;
export const CANVAS_HEIGHT = 480;
export const CANVAS_BORDER = pxToInt(styles.CANVAS_BORDER);

export const ID_ROOT = "app";
export const ID_PREFIX_BORDER = "border";
export const ID_CANVAS_MAIN = "canvas_main";
