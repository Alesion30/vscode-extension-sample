import { createStatusBarItem, StatusBarAlignment } from "../plugin/vscode";

//////////////////////////////////////////////////////////////
// ステータスバー
//////////////////////////////////////////////////////////////

/**
 * 入力スピード
 */
export const inputSpeedStatusBarItem = createStatusBarItem(
  StatusBarAlignment.Left,
  1
);

/**
 * 文字数
 */
export const charCountStatusBarItem = createStatusBarItem(
  StatusBarAlignment.Left,
  2
);

/**
 * ファイル名
 */
export const fileNameStatusBarItem = createStatusBarItem(
  StatusBarAlignment.Left,
  3
);

/**
 * 現在時刻
 */
export const nowTimeStatusBarItem = createStatusBarItem(
  StatusBarAlignment.Right,
  1000
);
