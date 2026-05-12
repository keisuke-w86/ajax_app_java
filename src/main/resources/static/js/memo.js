const buildHTML = (XHR) => {
  const item = XHR.response;
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.createdAt}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post() {
  const submit = document.getElementById("submit");

  // 変更点1: (e) を追加してイベント情報を受け取る
  submit.addEventListener("click", (e) => {
    // 変更点2: フォームのデフォルトの送信（画面リロード）をキャンセル！
    e.preventDefault();
    //formを見つける
    const form = document.getElementById("form");
    //formをformDataに入れる
    const formData = new FormData(form);
    const XHR = new XMLHttpRequest();

    // 準備：どこに、どうやって送るか
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";

    // 実際にデータを送信する！（ボールを投げる）
    XHR.send(formData);

    // サーバーからデータが返ってきたときの処理（ボールを受け取る）
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.response.error}`);
        return null;
      }
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      console.log(formText.value);
      const item = XHR.response;
      const html = `
        <div class="post">
          <div class="post-date">
            投稿日時：${item.createdAt}
          </div>
          <div class="post-content">
            ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", html);
      formText.value = "";
    };
  });
}

window.addEventListener("load", post);
