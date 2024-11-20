
document.getElementById('setName').onclick = setName;

function setName(){
  const name = document.getElementById("yourName");
  const yourName = name.value.trim();
  if (yourName === "") return;
  localStorage.setItem("names", JSON.stringify(yourName));
  name.value = "";
}