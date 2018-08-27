import { h, Component } from "preact";

import { assertUnreachable } from "./basics";
import * as CONFIG from "./config";
import * as styles from "./styles/index.scss";

export interface AppProps {
}

const enum AppMode {
  Splashscreen,
  Main,
}

interface AppState {
  appMode: AppMode
}

export class App extends Component<AppProps, AppState> {
  state = {
    appMode: AppMode.Splashscreen,
  }

  constructor(props: AppProps) {
    super(props);
  }
  componentDidMount(): void {}
  render(props: AppProps, state: AppState): JSX.Element {
    return (
      <div id={styles.wrapper}>
        {
          (appMode => {
            switch (appMode) {
              case AppMode.Splashscreen:
                return <Splashscreen />;
              case AppMode.Main:
                return [
                    <aside id={styles.left}></aside>,
                    <Main border={CONFIG.CANVAS_BORDER} />,
                    <aside id={styles.scoreboard}></aside>,
                ];
            }
            return assertUnreachable(appMode);
          })(state.appMode)
        }
      </div>
    );
  }
}

function Splashscreen(): JSX.Element {
  return (
    <div id={styles.splashscreen}>
      <h1>Achtung, die Kurve!</h1>
    </div>
  );
}

interface MainProps {
  border: number,
}

const enum MainMode {
  Lobby,
  Settings,
  Ingame,
}

interface MainState {
  mainMode: MainMode
}

class Main extends Component<MainProps, MainState> {
  state = {
    mainMode: MainMode.Lobby,
  }
  componentDidMount(): void {}
  render(props: MainProps, state: MainState): JSX.Element {
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
}
