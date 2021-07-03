import vscode from "../plugin/vscode";

//////////////////////////////////////////////////////////////
// ステータスバー
//////////////////////////////////////////////////////////////

// 入力スピード
export const inputSpeedStatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Left,
  1
);

// 文字数
export const charCountStatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Left,
  2
);

// ファイル名
export const fileNameStatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Left,
  3
);

// 現在時刻
export const nowTimeStatusBarItem = vscode.window.createStatusBarItem(
  vscode.StatusBarAlignment.Right,
  1000
);
