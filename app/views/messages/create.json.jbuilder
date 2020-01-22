json.uaer_name @message.user.name
json.contents @message.contents
json.image @message.image_url
json.created_at @message.created_at.strftime("%Y年%m月%d日 %H時%M分")