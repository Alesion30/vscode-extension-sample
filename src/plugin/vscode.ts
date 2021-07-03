import * as vscode from "vscode";

export type StatusBarItem = vscode.StatusBarItem;
export const StatusBarAlignment = vscode.StatusBarAlignment;
export const createStatusBarItem = vscode.window.createStatusBarItem;
export const showInformationMessage = vscode.window.showInformationMessage;
export default vscode;
