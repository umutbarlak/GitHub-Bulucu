const API_URL = "https://api.github.com/users/";

const form = document.querySelector("form");
const search = document.querySelector("#search");
const main = document.querySelector("#main");
const card = document.querySelector(".card");

async function getUsers(username) {
  try {
    const { data } = await axios(API_URL + username);
    console.log(data);
    createUserCard(data);
    getRepos(username);
  } catch (error) {
    creatErrorCard("Aradığınız kullanıcı bulunamadı.");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = search.value;
  if (user) {
    getUsers(user);
  }

  search.value = "";
});

function createUserCard(user) {
  main.innerHTML = `

  <div class="card">
    <img
          class="user-image"
          src="${user.avatar_url}"
          alt="User İmage"
        />
        <div class="user-info">
          <div class="user-name">
            <h2>${user.name ? user.name : user.login}</h2>
            <small>@${user.login}</small>
          </div>
        </div>

        <p>
        ${user.bio ? user.bio : ""}
        </p>

        <ul>
          <li>
            <i class="fa-solid fa-user-group"></i>
            ${user.followers} <strong>Followers</strong>
          </li>
          <li> ${user.following} <strong>Following</strong></li>
          <li><i class="fa-solid fa-bookmark"></i> ${
            user.public_repos
          } Repository</li>
        </ul>

        <div class="repos" id="repos"></div>

        </div>
    `;
}

function creatErrorCard(text) {
  main.innerHTML = `
    <div class="card">
      <div class="warning">
          <p>${text}</p>
      </div>
    </div>
    `;
}

async function getRepos(username) {
  try {
    const { data } = await axios(
      `https://api.github.com/users/${username}/repos`
    );
    addReposToCard(data);
  } catch (error) {
    creatErrorCard("Üzgünüz hata oluştu");
  }
}

function addReposToCard(repos) {
  const reposEle = document.querySelector("#repos");

  repos.slice(0, 3).forEach((repo) => {
    const reposLink = document.createElement("a");
    reposLink.href = repo.html_url;
    reposLink.target = "_blank";
    reposLink.innerHTML = `
  <i class="fa-solid fa-book-bookmark"></i> ${repo.name}
  `;

    reposEle.appendChild(reposLink);
  });
}
