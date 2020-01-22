require 'rails_helper'

RSpec.describe MessagesController, type: :controller do
  let(:group) {create(:group)}
  let(:user) {create(:user)}

  describe "#index" do
    context "loguin" do
      before do
        loguin user
        get :index, params: {group_id: group.id}
      end
      it "空の@messageがあるか" do
        expect(assigns(:message)).to be_a_new(Message)
      end
      it "@groupがあるか" do
        expect(assigns(:group)).to eq group
      end
      it "indexに飛ぶか" do
        expect(response).to render_template :index
      end
    end
    context "not loguin" do
      before do
        get :index, params: {group_id: group.id}
      end
      it "new_user_session_pathにリダイレクトするか" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe "#create" do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message) } }

    context "loguin" do
      before do
        loguin user
      end

      context "can save" do
        subject {
          post :create,
          params: params
        }
        it "@messageが保存できたか" do
          expect{subject}.to change(Message, :count).by(1)
        end
        it "保存後、group_messages_pathにリダイレクトするか" do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
      context "can not save" do
        let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, contents: nil, image: nil) } }
        subject {
          post :create,
          params: invalid_params
        }

        it "保存に失敗した" do
          expect{subject}.not_to change(Message, :count)
        end
        it "保存失敗後、indexにrenderするか" do
          subject
          expect(response).to render_template :index
        end
      end
    end
    context "not loguin" do
      it "new_user_session_pathにリダイレクトするか" do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end

# bundle exec rspec spec/controllers/messages_controller.spec.rb