export function createSidebar() {
  let sidebar = document.createElement("div");

  sidebar.style.position = "absolute";
  sidebar.style.top = "1px";
  sidebar.style.left = "1px";
  sidebar.style.width = "200px";
  sidebar.style.height = "stretch";
  sidebar.style.backgroundColor = "white";
  sidebar.style.borderRight = "solid lightgrey 1px";
  sidebar.style.visibility = "hidden";
  sidebar.style.padding = "10px";
  sidebar.style.backgroundColor = "aliceblue";

  return sidebar;
}
