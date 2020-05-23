---
templateKey: blog-post
title: Struct と Class
date: 2020-05-05T17:17:25.791Z
description: struct と　struct mutating func、classの挙動の違い
featuredpost: true
featuredimage: /img/icon_pease-1x.png
tags:
  - swift class struct
---


```
import UIKit
 
 // model class
 class OkashiModelClass {
     let id: String
     var name: String
     let url: String
     
     init(id: String, name: String, url: String) {
         self.id = id
         self.name = name
         self.url = url
     }
     
     func change(newName: String) {
         self.name = newName
     }
     
     func compare(id: String, otherId: String) -> Bool {
         return id == otherId
     }
 }
 
 // codable entity
 struct OkashiEntity: Codable {
     let id: String
     let name: String
     let url: String
 }
 
 // struct model
 struct OkashiModel {
     let id: String
     let name: String
     let url: String
     
     init(entiry: OkashiEntity) {
         self.id = entiry.id
         self.name = entiry.name
         self.url = entiry.url
     }
     
     init(id: String, name: String, url: String) {
         self.id = id
         self.name = name
         self.url = url
     }
     
     func change(newName: String) -> OkashiModel {
         return OkashiModel(id: self.id, name: newName, url: self.url)
     }
     
     func compare(id: String, otherId: String) -> Bool {
         return id == otherId
     }
 }
 
 // mutating struct model
 struct OkashiModel2 {
     let id: String
     var name: String
     let url: String
     
     init(entiry: OkashiEntity) {
         self.id = entiry.id
         self.name = entiry.name
         self.url = entiry.url
     }
     
     init(id: String, name: String, url: String) {
         self.id = id
         self.name = name
         self.url = url
     }
     
     mutating func change(newName: String) {
         self.name = newName
     }
     
     func compare(id: String, otherId: String) -> Bool {
         return id == otherId
     }
 }
 
 // collection model
 struct OkashiModels {
     let elements: [OkashiModel]
     
     init(elements: [OkashiModel]) {
         self.elements = elements
     }
     
     func add(element: OkashiModel) -> OkashiModels {
         return OkashiModels(elements: self.elements + [element])
     }
 }
 
 
 //        let entiy = OkashiEntity(from: api.result)
 
 /// struct
 let chocolate = OkashiModel(id: "1", name: "chocolate", url: "http://fujiwara.com")
 let candy: OkashiModel = chocolate.change(newName: "candy")
 
 chocolate.name
 candy.name
 
 /// class
 let oreo = OkashiModelClass(id: "2", name: "oreo", url: "http://fujiwara.com")
 oreo.change(newName: "kitkat")
 oreo.name
   
 
 
 /// struct  (collection object)
 var okasiList = OkashiModels(elements: [])
 
 let gum = OkashiModel(id: "3", name: "gum", url: "http://fujiwara.com")
 let gummy = OkashiModel(id: "4", name: "gummy", url: "http://fujiwara.com")
 okasiList.add(gum)
 okasiList.add(gummy)
 
 print("okashi : \(okasiList)")
```