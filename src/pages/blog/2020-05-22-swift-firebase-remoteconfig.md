---
templateKey: blog-post
title: Swift Firebase RemoteConfig
date: 2020-05-21T06:21:56.239Z
description: 担当は海紫です。　よろしくお願いします
featuredpost: true
featuredimage: /img/icon_ausome.png
tags:
  - Swift　Firebase　RemoteConfig
---
Firebase Remote Configとは、アプリのアップデートをユーザーにダウンロードしてもらわなくても、アプリの動作と外観を変更できるクラウド サービスです。

今回は、AppDelegateでRemoteConfigを取得するメソッドと使用例、注意点をまとめて行きます。

※AppDelegateでRemoteConfigの値を取得しているのは、アプリ起動時に値をまとめて取得するためで、他の場所で任意に取得しても構いません。

※FirebaseRemoteConfigを使用するためにはFirebaseのSDKをインストールする必要があります。説明は省略しています。<https://firebase.google.com/docs/ios/setup?hl=ja>

### 実装

remoteconfig()でfirebaseに設定したremoteConfigの値を取得する。



ここで TimeInterval は expirationDuration に設定され、キャッシュされたパラメータ値が expirationDuration 秒よりも古い場合、次のフェッチ要求はキャッシュされたパラメータ値ではなく、リモートコンフィグサービスからフェッチされたデータを使用することを示しています。

```
 import FirebaseRemoteConfig
 
 class AppDelegate: UIResponder, UIApplicationDelegate {
 
     func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
         // Override point for customization after application launch.
         
         self.remoteConfig()
         return true
     }
     
     //省略...
 
     private func remoteConfig(){
         let remoteConfig = RemoteConfig.remoteConfig()
         let expirationDuration = 3600
         
         remoteConfig.fetch(withExpirationDuration: TimeInterval(expirationDuration)) { (status, error) -> Void in
             if status == .success {
                 remoteConfig.activate(completionHandler: { (error) in
                     if let error = error {
                         print(error) //エラー処理
                     }else{
                         print("config fetched") //成功した時の処理
                     }
                 })
             } else {
                 print("failed") //エラー処理
             }
         }
         
     }
 }
```

使い方

このように値を取得することが出来ます。

```
class ViewController: UIViewController {
     override func viewDidLoad() {
         super.viewDidLoad()
         
         let title: String = remoteConfig["title"].stringValue
     }    
 }
```



### 注意点

AppDelegateでRemoteConfigを取得するメソッドを実行していますが、

```
 remoteConfig.fetch(withExpirationDuration: TimeInterval(expirationDuration)) { (status, error) -> Void in
 })
```

このメソッドは非同期で処理が実行されます。

そのため、AppDelegateでRemoteConfigの値を取得している間に、メインの画面に遷移してしまいます。その後、値を取得しメソッドの処理が完了します。(非同期処理の速度次第ではこの限りではありません)

つまり、メイン画面でRemoteConfigの値を使用するコードを書いている場合、値を取得する前にメイン画面に遷移し、エラーになってしまいます。

解決策として、非同期処理の実行終了を待ってから遷移処理をする。



非同期処理に関してはこちらを参考にして下さい。<https://qiita.com/don-bu-rakko/items/b283829c4572a6425a5c>



### まとめ

RemoteConfigを使用してABテストをしよう