import vscode from './plugin/vscode';
import dayjs from './plugin/dayjs';
import { countTextLength } from './lib/utils';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-extension-sample" is now active!');

	// ステータスバー
	const inputSpeedItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
	const charCountItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 2);
	const fileNameItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 3);
	const nowTimeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);

	// hello world コマンド
	const helloWorld = vscode.commands.registerCommand('vscode-extension-sample.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-extension-sample!');
	});
	context.subscriptions.push(helloWorld);

	// 文字数反映
	vscode.workspace.onDidChangeTextDocument(event => {
		const doc = event.document;
		const text = doc.getText();
		const count = countTextLength(text);
		charCountItem.text = `文字数: ${count}`;
		charCountItem.show();
	}, null, context.subscriptions);

	// ファイル名・文字数 表示
	const activeEditor = vscode.window.activeTextEditor;
	if (activeEditor) {
		const doc = activeEditor.document;
		const fileName = doc.fileName;
		const text = doc.getText();
		const count = countTextLength(text);

		// ファイル名 反映
		fileNameItem.text = fileName;
		fileNameItem.show();

		// 文字数反映
		charCountItem.text = `文字数: ${count}`;
		charCountItem.show();
	}
	vscode.window.onDidChangeActiveTextEditor(activeEditor => {
		if (activeEditor) {
			const doc = activeEditor.document;
			const fileName = doc.fileName;
			const text = doc.getText();
			const count = countTextLength(text);

			// ファイル名 反映
			fileNameItem.text = fileName;
			fileNameItem.show();

			// 文字数反映
			charCountItem.text = `文字数: ${count}`;
			charCountItem.show();
		} else {
			fileNameItem.hide();
		}
	});

	// update処理
	setInterval(() => {
		// 現在時刻表示
		const now = dayjs();
		nowTimeItem.text = now.format('現在時刻: HH:mm:ss');
		nowTimeItem.show();
	}, 100);

	// 入力スピード
	const diffTime = 1;
	let lastInputTextDate = dayjs();
	let lastInputTextCount = 0;
	setInterval(() => {
		const activeEditor = vscode.window.activeTextEditor;
		if (activeEditor) {
			const now = dayjs();
			const doc = activeEditor.document;
			const text = doc.getText();
			const count = countTextLength(text);

			// 差分
			const diffCount = count - lastInputTextCount;

			// スピード反映
			const speed = diffTime > 0 ? Math.round(diffCount / diffTime * 100) / 100 : -1;
			if (diffCount >= 0) {
				inputSpeedItem.text = `入力スピード: ${speed}[word/s]`;
				inputSpeedItem.show();
			}

			// 時刻更新
			lastInputTextDate = now;
			lastInputTextCount = count;
		}
	}, diffTime * 1000);
}

export function deactivate() { }
