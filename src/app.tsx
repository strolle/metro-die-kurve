import { h, Component } from "preact";

import * as CONFIG from "./config";
import * as styles from "./styles/index.scss";

export interface AppProps {
}

interface AppState {
}

export class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
  }
  componentDidMount(): void {}
  render(props: AppProps, state: AppState): JSX.Element {
    return (
      <div id={styles.wrapper}>
        <div id={styles.splashscreen}>
          <h1>Achtung, die Kurve!</h1>
        </div>
        <aside id={styles.left}></aside>
        <Main border={CONFIG.CANVAS_BORDER} />
        <aside id={styles.scoreboard}></aside>
      </div>
    );
  }
}

interface MainProps {
  border: number,
}

function Main(props: MainProps): JSX.Element {
  const border = props.border;
  return border === 0
    ? (
      <canvas id={CONFIG.ID_CANVAS_MAIN} width={CONFIG.CANVAS_WIDTH} height={CONFIG.CANVAS_HEIGHT}></canvas>
    ) : (
      <div class={styles.border} id={CONFIG.ID_PREFIX_BORDER + border}>
        <Main border={border - 1} />
      </div>
    );
}
