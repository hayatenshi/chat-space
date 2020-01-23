$(function(){
  var search_list = $('#user-search-result');

  function appendSearchName(user) {
    var html =`
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
              </div>
              `
    search_list.append(html);
  }

  function appendNotFindUserMsg(msg) {
    var html =`
              <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
              </div>
              `
    search_list.append(html);
  }

  $('#user-search-field').on("keyup", function(){
    var input = $('#user-search-field').val();
    $.ajax({
      type: "GET",
      url: "/users",
      data: {keyword: input},
      dataType: "json"
    })
    .done(function(users){
      search_list.empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendSearchName(user);
        });
      } else {
        appendNotFindUserMsg("ユーザーが見つかりません");
      }
    })
    .fail(function(){
      alert("通信エラー。ユーザー名を表示できません。");
    })
  });
});