import vscode from './plugin/vscode';
import dayjs from './plugin/dayjs';

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

	// 文字数カウント コマンド
	const charCount = vscode.commands.registerCommand('vscode-extension-sample.charCount', () => {
		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const doc = editor.document;
			const text = doc.getText();
			vscode.window.showInformationMessage(`文字数: ${text.length}`);
		} else {
			vscode.window.showInformationMessage('ファイルを開いてください');
		}
	});
	context.subscriptions.push(charCount);

	// 入力スピード
	let lastInputTextDate = dayjs();
	let lastInputTextCount = 0;
	vscode.workspace.onDidChangeTextDocument(event => {
		const now = dayjs();
		const doc = event.document;
		const text = doc.getText();
		const count = text.length;

		// 文字数反映
		charCountItem.text = `文字数: ${count}`;
		charCountItem.show();

		// 差分
		const diffTime = now.diff(lastInputTextDate) / 1000; // 秒[s]
		const diffCount = count - lastInputTextCount;

		// スピード反映
		const speed = diffTime > 0 ? Math.round(diffCount / diffTime * 100) / 100 : -1;
		if (diffCount > 0) {
			inputSpeedItem.text = `入力スピード: ${speed}`;
			inputSpeedItem.show();
		}

		// 時刻更新
		lastInputTextDate = now;
		lastInputTextCount = count;
	}, null, context.subscriptions);

	// ファイル名・文字数 表示
	const activeEditor = vscode.window.activeTextEditor;
	if (activeEditor) {
		const doc = activeEditor.document;
		const fileName = doc.fileName;
		const text = doc.getText();
		const count = text.length;

		// ファイル名 反映
		fileNameItem.text = fileName;
		fileNameItem.show();

		// 文字数反映
		charCountItem.text = `文字数: ${count}`;
		charCountItem.show();
	}
	vscode.window.onDidChangeActiveTextEditor(event => {
		if (event) {
			const doc = event.document;
			const fileName = doc.fileName;
			const text = doc.getText();
			const count = text.length;

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

		// 入力スピード リセット
		const diffTime = now.diff(lastInputTextDate) / 1000; // 秒[s]
		if (diffTime > 3) {
			inputSpeedItem.text = `入力スピード: ${0}`;
			inputSpeedItem.show();
		}
	}, 100);
}

export function deactivate() { }
