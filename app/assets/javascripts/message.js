$(function(){
  var buildHTML = function(message) {
    var insertContents = "";
    var insertImage = "";
    if(message.image && message.contents){
      insertContents =`
                      <div class="message__text__content">
                        ${message.contents}
                      </div>
                      `
      insertImage = `<img src="${message.image}"></img>`
    } else if(message.contents) {
      insertContents =`
                      <div class="message__text__content">
                        ${message.contents}
                      </div>
                      `
    } else if(message.image) {
      insertImage = `<img src="${message.image}"></img>`
    }
    var html =`
              <div class="message" data-message-id=${message.id}>
                <div class="message__info">
                  <div class="message__info__name">
                    ${message.user_name}
                  </div>
                  <div class="message__info__day-time">
                    ${message.created_at}
                  </div>
                </div>
                <div class="message__text">
                  ${insertContents}
                    ${insertImage}
                </div>
              </div>
              `
    return html;
  };

  var reloadMessages = function() {
    last_message_id = $(".message:last").data("message-id");
    $.ajax({
      url: "./api/messages",
      type: "GET",
      data: {id: last_message_id},
      dataType: "json"
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = "";
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $(".chat-main__message-list").append(insertHTML);
        $("form")[0].reset();
        $(".chat-main__message-list").animate({ scrollTop: $(".chat-main__message-list")[0].scrollHeight});
        $(".submit-btn").prop("disabled", false);
      }
    })
    .fail(function() {
      console.log('error');
    });
  };
  
  $("#new_message").on("submit", function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: "json",
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $(".chat-main__message-list").append(html);
      $("form")[0].reset();
      $(".chat-main__message-list").animate({ scrollTop: $(".chat-main__message-list")[0].scrollHeight});
      $(".submit-btn").prop("disabled", false);
    })
    .fail(function() {
      alert("メッセージの送信に失敗しました");
      $(".submit-btn").prop("disabled", false);
    });
  });
  if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});