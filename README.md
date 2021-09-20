# SLive

ニコニコ動画風プレゼンテーションツール

## 概要

プレゼンテーション中に視聴者がコメントやスタンプを送信すると，画面上に流れます．
スライドは Google スライドのリンクを貼り付けることで簡単に設定できます．

## 機能

### 発表者

- Google スライドのリンクによるスライド設定
- 入室前スライドプレビュー
- スライド全画面表示
- 視聴者用ページへのリンク・QR コード表示

### 視聴者

- コメント送信
- スタンプ送信
- コメントの文字色変更

## デモ

### 発表者入室前画面

Google スライドのリンクを貼り付けることで設定します．
入室前にスライドプレビューで確認できます．
![スクリーンショット 2021-09-19 11 44 07](https://user-images.githubusercontent.com/64676197/133913655-14c59cda-500d-41d7-a510-9bc5e0012b66.png)

### 発表者プレゼンテーション画面

![スクリーンショット 2021-09-19 11 44 35](https://user-images.githubusercontent.com/64676197/133913666-b457839f-46d8-4e08-88a6-ce15e96b2b4d.png)

左上のメニューから，視聴者用ページへのリンクや QR コードを簡単に見せることができます．
![スクリーンショット 2021-09-19 11 44 47](https://user-images.githubusercontent.com/64676197/133913672-4c8b2081-98b9-4661-847d-dbd498e0d4a1.png)

コメントが流れる様子です．（GIF なので少しかくついています）
![demo](https://user-images.githubusercontent.com/64676197/133913851-d05ca5ac-4b6e-4c23-86e9-7833820a1e8b.gif)

### 視聴者画面

コメント・スタンプの送信ができます．文字色の変更も可能です．

![スクリーンショット 2021-09-19 11 45 23](https://user-images.githubusercontent.com/64676197/133913692-0339b4f2-d4ed-48b8-802f-04f5589d446a.png)

## 使用した技術

- React(Next.js)
- TypeScript
- Firebase(Firestore)

## 動作保証

以下のブラウザ・OS でのみ動作確認済みです，

### 発表者

- Chrome/Mac

### 視聴者

- Chrome/Mac
- Safari/iOS
