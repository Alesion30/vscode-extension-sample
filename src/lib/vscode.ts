import { APP_NAME } from "../config/env";
import vscode from "../plugin/vscode";

/**
 * vscodeのコマンドを登録します。
 * package.jsonのcontributes.commandsにも登録する必要があります
 *
 * @param command コマンド名
 * @param callback コマンドの実行処理
 * @param disposables Disposables
 * @return
 */
export const registerCommand = (
  command: string,
  callback: (...args: any[]) => any,
  disposables?: vscode.Disposable[]
): void => {
  const disposable = vscode.commands.registerCommand(
    `${APP_NAME}.${command}`,
    callback
  );
  disposables?.push(disposable);
};
