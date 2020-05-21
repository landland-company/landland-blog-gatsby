---
templateKey: blog-post
title: Swift enum Int型とCaseInterableに準拠
date: 2020-05-21T04:56:51.368Z
description: swiftのenumは最強だと確信してる海紫です！　言語自体はswiftが好きです。
featuredpost: true
featuredimage: /img/icon_ausome.png
tags:
  - swift　enum
---




enumを定義する際にInt型とCaseIterableに準拠するのがおすすめです。

```
private enum CellItem: Int, CaseIterable {
             case evaluation, contact, password, logout
             
             var title: String{
                 switch self {
                 case .evaluation:
                     return "アプリを評価する"
                 case .contact:
                     return "お問い合わせ"
                 case .password:
                     return "パスワードを変更"
                 case .logout:
                     return "ログアウト"
                 }
             }
         }
```

Int型のメリット

1. Int型に準拠すると各caseを数値で扱うことが出来ます。 例えば、evaluationを変数に代入する場合


```
let evaluation: CellItem = CellItem.evaluation
 
 let evaluation: CellItem = CellItem(rawValue: 0)!
```

この様に数値を入れることでも各caseを取得することが出来ます。
TableViewなどでタップしたCellのIndex番号などが返ってきた際に、その番号に対応したenumを返したい時に便利です。

Int型に準拠していない場合(rawValueは使えません) 

```
private enum CellItem: {
              case evaluation, contact, password, logout
              
              var title: String{
              ...省略
              }  
              
              static func getCellItem(index: Int){
              switch index {
              case 0:
              return .evaluation
              case 1:
              return .contack
              .
              .
              }
         }
         
         //呼び出し
         let evaluation: CellItem = CellItem.getCellItem(0) //.evaluationが入る
```

この様にInt型に準拠してなくても書けますがスマートではないと思いました。

CaseInterable protocolのメリット

 1.enumのcaseの合計数を取得出来る

```
CellItem.allCases.count //4
```

2. enumのcaseを配列して取得出来る。これによりforEach文などでループして使用できる.

   ```
   CellItem.allCases // [evaluation, contact, password, logout]
   ```

3.enumの各caseを数値で取得できる 2の様に配列に出来るため.


```
CellItem.allCases[0] //evaluation
```

Int型がないとenumを数値で受け取れないと思ったが、CaseIterableだけでも数値で受け取れる。ことがわかった。。 数値で受け取るためだけにInt型に準拠する必要性はないと書いてる途中に思いました...........