let userInput = document.querySelector("input"),
  btn = document.querySelector("input[type = 'button']"),
  showDiv = document.querySelector(".show-repos");

window.addEventListener("keyup", (e) => {
  if (e.key == "Enter") {
    btn.click();
  }
});

btn.addEventListener("click", () => {
  showDiv.textContent = "Loading...";
  showDiv.classList.add("loading");
  if (userInput.value == "") {
    alert("Enter a github username to show repos!");
  } else {
    fetch(`https://api.github.com/users/${userInput.value}/repos`)
      .then((response) => {
        return response.json();
      })
      .then((repos) => {
        if (repos.length < 1) {
          alert("No repositories found! or no username like that!");
        } else {
          showDiv.textContent = "";
          showDiv.classList.remove("loading");
          showDiv.classList.add("showed");
          repos.forEach((repo, indx) => {
            let repoDiv = document.createElement("div"),
              repoTxt = document.createTextNode(`${indx + 1}- ${repo.name}`);
            repoDiv.appendChild(repoTxt);

            let repoDetails = document.createElement("div");

            let starsSpan = document.createElement("span"),
              starsTxt = document.createTextNode(
                `${repo.stargazers_count} stars`
              );
            starsSpan.appendChild(starsTxt);

            let repoLink = document.createElement("a"),
              aTxt = document.createTextNode("visit");
            repoLink.href = `https://github.com/${userInput.value}/${repo.name}`;
            repoLink.target = "_blank";
            repoLink.appendChild(aTxt);

            repoDiv.className = "repo-box";
            repoDetails.append(starsSpan, repoLink);
            repoDiv.appendChild(repoDetails);
            showDiv.appendChild(repoDiv);
          });
        }
      });
  }
});
