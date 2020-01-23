$(function(){
  var search_list = $('#user-search-result');
  var group_user_list = $('#chat-group-users.js-add-user')

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

  function  appendAddUser(userId, userName){
    var html = `
              <div class="chat-group-user">
                <input name="group[user_ids][]" type="hidden" value="${userId}">
                <p class="chat-group-user__name">${userName}</p>
                <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</div>
              </div>
              `
    group_user_list.append(html)
  }

  function addGroupMember(userId) {
    let html = `
              <input value="${userId}" name="group[user_ids][]" type="hidden" id="group_user_ids_${userId}" />
              `;
    $(`#${userId}`).append(html);
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

  $('#user-search-result').on("click", ".chat-group-user__btn--add", function(e){
    e.preventDefault();
    var userId = $(this).data("user-id");
    var userName = $(this).data("user-name");
    $(this).parent().remove();
    appendAddUser(userId, userName);
    addGroupMember(userId);
  });

  $('#chat-group-users').on("click", ".chat-group-user__btn--remove", function(e){
    e.preventDefault();
    $(this).parent().remove();
  });
});