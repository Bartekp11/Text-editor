"use strict";

const buttons = document.querySelector(".editor-menu");
const downloadBtn = document.querySelector(".btn-download");
const loadBtn = document.querySelector(".btn-load");
let content = document.querySelector(".text");

buttons.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    document.execCommand(e.target.dataset["style"], false, null);
  }
});

downloadBtn.addEventListener("click", () => {
  downloadJsonFile("text.json");
});

loadBtn.addEventListener("click", () => {
  var filePath = document.getElementById("file").value;
  if (filePath) {
    var startIndex =
      filePath.indexOf("\\") >= 0
        ? filePath.lastIndexOf("\\")
        : filePath.lastIndexOf("/");
    var name = filePath.substring(startIndex);
    if (name.indexOf("\\") === 0 || name.indexOf("/") === 0) {
      name = name.substring(1);
    }
  } else {
    alert("Select your file.");
  }
  loadJsonFile(name, function (text) {
    let data = JSON.parse(text);
    content.innerText = data.c;
  });
});

function downloadJsonFile(fileName) {
  let a = document.createElement("a");
  let innerText = content.innerText;
  let obj = {
    c: innerText,
  };
  let data = JSON.stringify(obj);
  let file = new Blob([data], {
    type: "application/json",
  });
  a.href = window.URL.createObjectURL(file);
  a.download = fileName;
  a.innerHTML = "download";
  a.click();
}

function loadJsonFile(file, callback) {
  let JSONfile = new XMLHttpRequest();
  JSONfile.overrideMimeType(".json");
  JSONfile.open("GET", file, true);
  JSONfile.onreadystatechange = function () {
    if (JSONfile.readyState === 4 && JSONfile.status == "200") {
      callback(JSONfile.responseText);
    }
  };
  JSONfile.send(null);
}
