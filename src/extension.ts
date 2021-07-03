import vscode from "./plugin/vscode";
import dayjs from "./plugin/dayjs";
import { countTextLength, getFileName } from "./lib/utils";
import {
  inputSpeedStatusBarItem,
  charCountStatusBarItem,
  fileNameStatusBarItem,
  nowTimeStatusBarItem,
} from "./constant/statusBarItem";

export function activate(context: vscode.ExtensionContext) {
  //////////////////////////////////////////////////////////////
  // Hello World コマンド
  //////////////////////////////////////////////////////////////
  const helloWorld = vscode.commands.registerCommand(
    "vscode-extension-sample.helloWorld",
    () => {
      vscode.window.showInformationMessage(
        "Hello World from vscode-extension-sample!"
      );
    }
  );
  context.subscriptions.push(helloWorld);

  //////////////////////////////////////////////////////////////
  // 文字数 表示 （ファイル編集時）
  //////////////////////////////////////////////////////////////
  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      const doc = event.document;
      const text = doc.getText();
      const count = countTextLength(text);
      charCountStatusBarItem.text = `文字数: ${count}`;
      charCountStatusBarItem.show();
    },
    null,
    context.subscriptions
  );

  //////////////////////////////////////////////////////////////
  // ファイル名・文字数 表示 （ファイル表示時）
  //////////////////////////////////////////////////////////////
  const activeEditor = vscode.window.activeTextEditor;
  if (activeEditor) {
    const doc = activeEditor.document;
    const fileName = getFileName(doc.fileName);
    const text = doc.getText();
    const count = countTextLength(text);

    // ファイル名 反映
    fileNameStatusBarItem.text = `ファイル名: ${fileName}`;
    fileNameStatusBarItem.show();

    // 文字数反映
    charCountStatusBarItem.text = `文字数: ${count}`;
    charCountStatusBarItem.show();
  } else {
    // 非表示
    fileNameStatusBarItem.hide();
    charCountStatusBarItem.hide();
  }
  vscode.window.onDidChangeActiveTextEditor((activeEditor) => {
    if (activeEditor) {
      const doc = activeEditor.document;
      const fileName = getFileName(doc.fileName);
      const text = doc.getText();
      const count = countTextLength(text);

      // ファイル名 反映
      fileNameStatusBarItem.text = `ファイル名: ${fileName}`;
      fileNameStatusBarItem.show();

      // 文字数反映
      charCountStatusBarItem.text = `文字数: ${count}`;
      charCountStatusBarItem.show();
    } else {
      // 非表示
      fileNameStatusBarItem.hide();
      charCountStatusBarItem.hide();
    }
  });

  //////////////////////////////////////////////////////////////
  // 現在時刻表示
  //////////////////////////////////////////////////////////////
  setInterval(() => {
    const now = dayjs();
    nowTimeStatusBarItem.text = now.format("現在時刻: HH:mm:ss");
    nowTimeStatusBarItem.show();
  }, 100);

  //////////////////////////////////////////////////////////////
  // 入力スピード
  //////////////////////////////////////////////////////////////
  const diffTime = 1; // 更新間隔[s]
  let isTextChangeEventHookCount = 0; // ファイル編集イベント呼び出し回数
  vscode.workspace.onDidChangeTextDocument(
    () => {
      isTextChangeEventHookCount++;
    },
    null,
    context.subscriptions
  );
  setInterval(() => {
    // 小数点以下の桁数
    const digits = 1;

    // 入力スピード 算出
    const diffCount = isTextChangeEventHookCount;
    const speed =
      Math.round((diffCount / diffTime) * 10 ** digits) / 10 ** digits;

    // スピード反映
    inputSpeedStatusBarItem.text = `入力スピード: ${speed.toFixed(digits)}/s`;
    inputSpeedStatusBarItem.show();

    // 初期化
    isTextChangeEventHookCount = 0;
  }, diffTime * 1000);
}

export function deactivate() {}
