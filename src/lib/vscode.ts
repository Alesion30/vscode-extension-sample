import { APP_NAME } from "../config/env";
import vscode from "../plugin/vscode";

/**
 * コマンドを登録する
 * package.jsonのcontributes.commandsにも登録する必要があります
 *
 * @param command - コマンド名
 * @param callback - コマンドの実行処理
 * @param context - コンテキスト
 * @return {void}
 */
export const registerCommand = (
  command: string, // コマンド名
  callback: (...args: any[]) => any,
  context: vscode.ExtensionContext
): void => {
  const disposable = vscode.commands.registerCommand(
    `${APP_NAME}.${command}`,
    callback
  );
  context.subscriptions.push(disposable);
};
