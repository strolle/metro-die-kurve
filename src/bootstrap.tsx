import { h, render } from "preact";

import * as CONFIG from "./config";
import { App } from "./app";

render(<App />, document.getElementById(CONFIG.ID_ROOT));
