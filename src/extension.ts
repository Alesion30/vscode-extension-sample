import vscode from './plugin/vscode';
import dayjs from './plugin/dayjs';
import { countTextLength, getFileName } from './lib/utils';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "vscode-extension-sample" is now active!');

	//////////////////////////////////////////////////////////////
	// ステータスバー
	//////////////////////////////////////////////////////////////
	const inputSpeedItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1); // 入力スピード
	const charCountItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 2); // 文字数
	const fileNameItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 3); // ファイル名
	const nowTimeItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000); // 現在時刻


	//////////////////////////////////////////////////////////////
	// Hello World コマンド
	//////////////////////////////////////////////////////////////
	const helloWorld = vscode.commands.registerCommand('vscode-extension-sample.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from vscode-extension-sample!');
	});
	context.subscriptions.push(helloWorld);


	//////////////////////////////////////////////////////////////
	// 文字数 表示 （ファイル編集時）
	//////////////////////////////////////////////////////////////
	vscode.workspace.onDidChangeTextDocument(event => {
		const doc = event.document;
		const text = doc.getText();
		const count = countTextLength(text);
		charCountItem.text = `文字数: ${count}`;
		charCountItem.show();
	}, null, context.subscriptions);


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
		fileNameItem.text = fileName;
		fileNameItem.show();

		// 文字数反映
		charCountItem.text = `文字数: ${count}`;
		charCountItem.show();
	} else {
		// 非表示
		fileNameItem.hide();
		charCountItem.hide();
	}
	vscode.window.onDidChangeActiveTextEditor(activeEditor => {
		if (activeEditor) {
			const doc = activeEditor.document;
			const fileName = getFileName(doc.fileName);
			const text = doc.getText();
			const count = countTextLength(text);

			// ファイル名 反映
			fileNameItem.text = fileName;
			fileNameItem.show();

			// 文字数反映
			charCountItem.text = `文字数: ${count}`;
			charCountItem.show();
		} else {
			// 非表示
			fileNameItem.hide();
			charCountItem.hide();
		}
	});


	//////////////////////////////////////////////////////////////
	// 現在時刻表示
	//////////////////////////////////////////////////////////////
	setInterval(() => {
		const now = dayjs();
		nowTimeItem.text = now.format('現在時刻: HH:mm:ss');
		nowTimeItem.show();
	}, 100);


	//////////////////////////////////////////////////////////////
	// 入力スピード
	//////////////////////////////////////////////////////////////
	const diffTime = 1; // 更新間隔[s]
	let isTextChangeEventHookCount = 0; // ファイル編集イベント呼び出し回数
	vscode.workspace.onDidChangeTextDocument(() => {
		isTextChangeEventHookCount++;
	}, null, context.subscriptions);
	setInterval(() => {
		// 入力スピード 算出
		const diffCount = isTextChangeEventHookCount;
		const speed = diffTime > 0 ? Math.round(diffCount / diffTime * 100) / 100 : -1;

		// スピード反映
		inputSpeedItem.text = `入力スピード: ${speed}/s`;
		inputSpeedItem.show();

		// 初期化
		isTextChangeEventHookCount = 0;
	}, diffTime * 1000);
}

export function deactivate() { }
