# タスクランナー
1. yarn のインストール
$ npm i yarn -D
$ yarn -v  (./node_modules/.bin/yarn -v)
v1.22.19

$ yarn install

2. 監視状態/ローカルサーバ起動
$ yarn def
$ yarn wp 

基本的にsrc内のファイルで作業していただきます。

# sass

1. 使用するcolorは_color.scssにて一律で管理しています。

2. 今後の保守管理のため、できるだけタグにclass名をつけ、ネスト（入れ子）は１つまでにしてください。
   cssの優先度をみだりに上げない目的も含まれています。

3. フォントサイズはremを用いた関数を作成しており、16pxとしたいときはrem(16)となります。

4. スタイルの競合を防ぐため『l-』,『p-』はタグで一つまでにしてください。

5. 調整用のスタイルは「u-」を用意して使ってください。

6. ファイルのはじめに『@use "global" as *;』を記載すると
   globeフォルダに含まれるファイルを参照可能です

7. メディアクエリを使用する際は_breakpoint.scssでまとめて管理しているので参考にしてください。
   @include mq (o-pc) {} >>>> print, screen and (min-width:1201px) {}

# js

1. 基本的にはsrc>js>bundleの中にjsファイルを追加してください。

2. 追加した際は以下のように記述してください。

◯各jsファイル
export default class Script {
  constructor() {
    console.log('Script!!');
  }
}

◯entry.jsファイル
〜ファイル先頭〜
import Script from './bundle/Script'

インスタンス「new Script();」追加

3. bundleさせたくないものはpartsに追加してください。
圧縮のみ行われます。

# image

1. src>imagesに画像ファイルを取り込むとdist>assets>imagesに最適化された状態で吐き出されます。