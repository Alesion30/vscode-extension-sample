import vscode, { showInformationMessage } from "./plugin/vscode";
import dayjs from "./plugin/dayjs";
import { countTextLength, getFileName } from "./lib/utils";
import { registerCommand } from "./lib/vscode";
import {
  CharCountStatusBarItemModel,
  FileNameStatusBarItemModel,
  InputSpeedStatusBarItemModel,
  NowTimeStatusBarItemModel,
} from "./model/statusBarItemModel";

export const activate = (context: vscode.ExtensionContext) => {
  //////////////////////////////////////////////////////////////
  // ステータスバーモデル
  //////////////////////////////////////////////////////////////
  const fileNameStatusBarItemModel = new FileNameStatusBarItemModel();
  const inputSpeedStatusBarItemModel = new InputSpeedStatusBarItemModel();
  const charCountStatusBarItemModel = new CharCountStatusBarItemModel();
  const nowTimeStatusBarItemModel = new NowTimeStatusBarItemModel();

  //////////////////////////////////////////////////////////////
  // Hello World コマンド
  //////////////////////////////////////////////////////////////
  registerCommand(
    "helloWorld",
    () => showInformationMessage("Hello World!!"),
    context.subscriptions
  );

  //////////////////////////////////////////////////////////////
  // 文字数 表示 （ファイル編集時）
  //////////////////////////////////////////////////////////////
  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      const doc = event.document;
      const text = doc.getText();
      const count = countTextLength(text);
      charCountStatusBarItemModel.show(count);
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
    fileNameStatusBarItemModel.show(fileName);

    // 文字数反映
    charCountStatusBarItemModel.show(count);
  } else {
    // 非表示
    fileNameStatusBarItemModel.hide();
    charCountStatusBarItemModel.hide();
  }
  vscode.window.onDidChangeActiveTextEditor((activeEditor) => {
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
  });

  //////////////////////////////////////////////////////////////
  // 現在時刻表示
  //////////////////////////////////////////////////////////////
  setInterval(() => {
    const now = dayjs();
    nowTimeStatusBarItemModel.show(now);
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
    inputSpeedStatusBarItemModel.show(speed, digits);

    // 初期化
    isTextChangeEventHookCount = 0;
  }, diffTime * 1000);
};

export const deactivate = () => {};
