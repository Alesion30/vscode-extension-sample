import dayjs from "../plugin/dayjs";
import { StatusBarItem } from "../plugin/vscode";
import {
  charCountStatusBarItem,
  fileNameStatusBarItem,
  inputSpeedStatusBarItem,
  nowTimeStatusBarItem,
} from "../constant/statusBarItem";

/**
 * [ステータスバー] 継承元
 */
class StatusBarItemModel {
  constructor(item: StatusBarItem) {
    this._item = item;
  }

  /**
   * ステータスバーアイテム
   */
  private _item: StatusBarItem;

  /**
   * 文字を表示する
   *
   * @param text 表示テキスト
   */
  protected _show = (text: string) => {
    this._item.text = text;
    this._item.show();
  };

  /**
   * 文字を非表示にする
   */
  public hide = () => this._item.hide();
};

/**
 * [ステータスバー] ファイル名
 */
export class FileNameStatusBarItemModel extends StatusBarItemModel {
  constructor() {
    super(fileNameStatusBarItem);
  }

  /**
   * ファイル名を表示する
   *
   * @param fileName ファイル名
   */
  public show = (fileName: string) => this._show(`ファイル名: ${fileName}`);
};

/**
 * [ステータスバー] 入力スピード
 */
export class InputSpeedStatusBarItemModel extends StatusBarItemModel {
  constructor() {
    super(inputSpeedStatusBarItem);
  }

  /**
   * 入力スピードを表示する
   *
   * @param speed 入力スピード
   * @param digits 小数点以下桁数 [default 1]
   */
  public show = (speed: number, digits: number = 1) =>
    this._show(`入力スピード: ${speed.toFixed(digits)}/s`);
};

/**
 * [ステータスバー] 文字数
 */
export class CharCountStatusBarItemModel extends StatusBarItemModel {
  constructor() {
    super(charCountStatusBarItem);
  }

  /**
   * 文字数を表示する
   *
   * @param count 文字数
   */
  public show = (count: number) => this._show(`文字数: ${count}`);
};

/**
 * [ステータスバー] 現在時刻
 */
export class NowTimeStatusBarItemModel extends StatusBarItemModel {
  constructor() {
    super(nowTimeStatusBarItem);
  }

  /**
   * 現在時刻を表示する
   *
   * @param now 現在時刻
   */
  public show = (now: dayjs.Dayjs) => {
    const formattedDateText = now.format("HH:mm:ss");
    this._show(`現在時刻: ${formattedDateText}`);
  };
};
