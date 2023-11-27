import React from "react";
import "./Post.css";

function Post() {
  return (
    <div className="post">
      <div className="image">
        <img src="https://sa.kapamilya.com/absnews/abscbnnews/media/2023/life/11/23/20231123-esports.jpg" />
      </div>
      <div className="text">
        <h2>
          T1 nắc Weibo Gaming cực căng 3 - 0 tại CKTG Liên Minh Huyền Thoại
        </h2>
        <p className="info">
          <a className="author">Kory the Korgy</a>
          <time>2023-01-06 16:45</time>
        </p>
        <p className="summary">
          T1 đã giành chiến thắng 3-0 trước WBG và trở thành nhà vô địch CKTG
          2023. Đây cũng là chức vô địch CKTG thứ 4 của T1 và cá nhân Faker.
        </p>
      </div>
    </div>
  );
}

export default Post;
