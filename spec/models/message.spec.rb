require 'rails_helper'

RSpec.describe Message, type: :model do
  describe '#create' do
    context "can save" do
      it "メッセージがあれば保存できる" do
        expect(build(:message, image: nil)).to be_valid
      end
      it "画像があれば保存できる" do 
        expect(build(:message, contents: nil)).to be_valid
      end
      it "メッセージと画像込みで保存できる" do
        expect(build(:message)).to be_valid
      end
    end

    context "can not save" do
      it "メッセージも画像もなく保存できない" do
        message = build(:message, contents: nil, image: nil)
        message.valid?
        expect(message.errors[:contents]).to include("を入力してください")
      end
      it "group_idがなく保存できない" do
        message = build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include("を入力してください")
      end
      it "user_idがなく保存できない" do
        message = build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include("を入力してください")
      end
    end
  end
end

# bundle exec rspec spec/models/message.spec.rb