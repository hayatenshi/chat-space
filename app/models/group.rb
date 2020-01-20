class Group < ApplicationRecord
  has_many :messages
  has_many :group_users
  has_many :users, through: :group_users
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = messages.last).present?
      if last_message.contents?
        last_message.contents
      else
        "画像のみの投稿です"
      end
    else
      "まだメッセージはありません"
    end
  end
end
