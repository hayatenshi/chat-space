# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
## usersテーブル
|Column|Type|Options|
|------|----|-------|
|mail|string|null: false, unique: true|
|password|string|null: false|
|name|string|null: false|
## Association
- has_many :groups
- has_many :messages
- has_many :groups, though: :groups_users

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|string||
|image|string||
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
## Association
- belong_to :group
- belong_to :user

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
## Association
- has_many :messages
- has_many :groups_users
- has_many :users, through: :groups_users

## groups_usersテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
## Association
- belong_to :group
- belong_to :user