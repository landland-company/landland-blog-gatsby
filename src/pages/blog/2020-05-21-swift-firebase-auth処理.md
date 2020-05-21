---
templateKey: blog-post
title: Swift Firebase Auth処理
date: 2020-05-21T05:48:52.261Z
description: FirebaseのAuth関係の処理をまとめました　海紫です
featuredpost: true
featuredimage: /img/icon_ausome.png
tags:
  - Swift　Firebase　Auth
---
#### 新規登録

```
import Firebase
 
      func register(email: String, password: String,confirmPassword: String, completion: ( @escaping () -> Void)){
      	//パスワードが確認用と合っているか
         if password != confirmPassword {
         return print("error")
         }
         
         //バリデーションのメソッドを他で用意してパスワードのバリデートをかける
         if !password.passwordValidation() {
         return print("error")
         }
         
         Auth.auth().createUser(withEmail: email, password: password) {(authDataResult, error) in
             if let error = error{
             return print("error")
             }else {
             return print("ok処理")
             }
         }
     }
```

#### ログイン

```
import Firebase
 
     func login(email: String, password: String, completion: ( @escaping () -> Void)) {
         Auth.auth().signIn(withEmail: email, password: password) { authResult, error in
             if let error = error{
             return print("error")
             }else {
             return print("ok処理")
             }
         }
     }
```

#### ログアウト

```
import Firebase
 
      func logout(completion: (() -> Void)){
         do {
             try Auth.auth().signOut()
             return print("ok処理")
         } catch {
             completion(false)
             return print("error")
         }
     }
```

#### パスワード変更

```
import Firebase
 
     func changePassword(email: String, completion: (@escaping () -> Void)){
         Auth.auth().sendPasswordReset(withEmail: email) { error in
             if let error = error{
             return print("error")
             }else {
             return print("ok処理")
             }
         }
     }
```

ここから拡張して使用していけば時間短縮です( ◠‿◠ )