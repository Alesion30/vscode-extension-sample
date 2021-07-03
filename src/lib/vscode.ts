import { APP_NAME } from "../config/env";
import { FileNameStatusBarItemModel, CharCountStatusBarItemModel } from "../model/statusBarItemModel";
import vscode from "../plugin/vscode";
import { getFileName, countTextLength } from "./utils";

/**
 * vscodeのコマンドを登録する\
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

/**
 * ファイル名と文字数を反映する
 *
 * @param command コマンド名
 * @param callback コマンドの実行処理
 * @param disposables Disposables
 * @return
 */
export const reflectFileNameAndCharCount = (
  activeEditor: vscode.TextEditor | undefined,
  fileNameStatusBarItemModel: FileNameStatusBarItemModel,
  charCountStatusBarItemModel: CharCountStatusBarItemModel,
) => {
  if (activeEditor) {
    const doc = activeEditor.document;
    const fileName = getFileName(doc.fileName);
    const text = doc.getText();
    const count = countTextLength(text);

    // ファイル名 反映
    fileNameStatusBarItemModel.show(fileName);

    // 文字数反映
    charCountStatusBarItemModel.show(count);
  } else {
    // 非表示
    fileNameStatusBarItemModel.hide();
    charCountStatusBarItemModel.hide();
  }
};
