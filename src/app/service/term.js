import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

export const TERM_TEXT_RED = "\x1B[31m";
export const TERM_TEXT_GREEN = "\x1B[32m";
export const TERM_TEXT_YELLOW = "\x1B[33m";
export const TERM_TEXT_BLUE = "\x1B[34m";
export const TERM_TEXT_FUCHSIA = "\x1B[35m";
export const TERM_TEXT_CYAN = "\x1B[36m";
export const TERM_TEXT_WHITE = "\x1B[37m";
export const TERM_TEXT_B = "\x1B[1m";

export function initTerminalWindow(elem) {
    const term = new Terminal({
        rendererType: "canvas",
        convertEol: true,
        disableStdin: false,
        cursorStyle: "underline",
        cursorBlink: true,
        fontSize: 12,
        theme: {
            background: "#1e1e1e"
        }
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(elem);
    fitAddon.fit();

    term.writeln(`${TERM_TEXT_YELLOW}MCSManager Terminal ${TERM_TEXT_CYAN}[Powered by Term.js]`);
    term.writeln(`${TERM_TEXT_YELLOW}Copyright Suwings All rights reserved${TERM_TEXT_WHITE}`);
    term.info = (msg) => {
        term.writeln(`\r\n[MCSManager] [INFO] ${msg}`);
    };
    term.prompt = () => {
        term.write(`${TERM_TEXT_WHITE}\r\n$`);
    };
    term.prompt();
    return term;
}

export function textToTermText(data) {
    let text = `${data}`
    text = text.replace(/§0/igm, TERM_TEXT_WHITE);
    text = text.replace(/§1/igm, TERM_TEXT_BLUE);
    text = text.replace(/§2/igm, TERM_TEXT_GREEN);
    text = text.replace(/§3/igm, TERM_TEXT_BLUE);
    text = text.replace(/§4/igm, TERM_TEXT_RED);
    text = text.replace(/§5/igm, TERM_TEXT_FUCHSIA);
    text = text.replace(/§6/igm, TERM_TEXT_YELLOW);
    text = text.replace(/§7/igm, TERM_TEXT_WHITE);
    text = text.replace(/§8/igm, TERM_TEXT_WHITE);
    text = text.replace(/§9/igm, TERM_TEXT_BLUE);
    text = text.replace(/§a/igm, TERM_TEXT_GREEN);
    text = text.replace(/§b/igm, TERM_TEXT_GREEN);
    text = text.replace(/§c/igm, TERM_TEXT_RED);
    text = text.replace(/§d/igm, TERM_TEXT_CYAN);
    text = text.replace(/§e/igm, TERM_TEXT_YELLOW);
    text = text.replace(/§f/igm, TERM_TEXT_WHITE);
    text = text.replace(/§g/igm, TERM_TEXT_YELLOW);
    text = text.replace(/§k/igm, TERM_TEXT_WHITE);
    text = text.replace(/§i/igm, TERM_TEXT_B);
    text = text.replace(/§l/igm, TERM_TEXT_B);
    text = text.replace(/§m/igm, TERM_TEXT_WHITE);
    text = text.replace(/§n/igm, TERM_TEXT_WHITE);
    text = text.replace(/§o/igm, TERM_TEXT_WHITE);
    text = text.replace(/§r/igm, TERM_TEXT_WHITE);
    text = text.replace(/\r\n/igm, `\n`);
    text = text.replace(/\r/igm, `\n`);
    text = text.replace(/\n/igm, `${TERM_TEXT_WHITE}\n`);
    return text;
}