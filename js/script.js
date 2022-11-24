function createButtons(btn, lines) {
  const nav = document.querySelector("nav");
  const width = 25 / lines.length;
  let btns = "";
  for (let i = 0; i < lines.length; i++) {
    const data = lines[i].split(";");
    btns += btn
      .replace("${target}", data[1])
      .replace("${caption}", data[0])
      .replace("${w}", width + "%");
  }

  nav.innerHTML = btns;
  document.querySelectorAll(".button").forEach(function (v) {
    v.onclick = function () {
      const xml = new XMLHttpRequest();
      xml.onreadystatechange = function () {
        if (xml.readyState === 4 && xml.status == 200) {
          document.querySelector("#out").innerHTML = xml.responseText;
        }
      };

      xml.open(
        "POST",
        `./${v.dataset.file.trim() !== "index.html" ? "html/" : ""}${
          v.dataset.file
        }`
      );
      xml.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      xml.send();
    };
  });
}

function getFile(link, f) {
  const xml = new XMLHttpRequest();
  xml.onreadystatechange = function () {
    if (xml.readyState === 4 && xml.status == 200) {
      f(xml.responseText);
    }
  };
  xml.open("GET", link);
  xml.send();
}

getFile("./txtdata/buttons.csv", function (csv) {
  const lines = csv.split("\n") || csv.split("\r");
  getFile("./html/button.html", function (btn) {
    createButtons(btn, lines);
  });
});
