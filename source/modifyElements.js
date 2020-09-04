
function update() {
  document.querySelectorAll('[aria-labelledby="files"] > .js-navigation-item').forEach(e => {
    const link = e.querySelector('[role="rowheader"] a')
    const folder = link.getAttribute('href').slice(40)
    if (!folder.match(/^gm4_[a-z_]+$/) || folder === 'gm4_template_pack') return

    fetch(`https://raw.githubusercontent.com/Gamemode4Dev/GM4_Datapacks/master/${folder}/pack.mcmeta`)
      .catch(err => {
        console.log(err.message)
      })
      .then(res => res.json())
      .then(data => {
        if (data.hidden === true || data.hidden === "true") {
          e.style.background = '#ebeef2'
          const defaultFolderIconColor = "color-blue-3" // default color for github's folder octicon
          const newFolderIconColor = "color-gray-0" // color of the octicon of hidden modules

          var folderIcon = e.children[0].getElementsByTagName('svg')[0]
          folderIcon.setAttribute("color",newFolderIconColor)
          folderIcon.classList.remove(defaultFolderIconColor)
          folderIcon.classList.add(newFolderIconColor)
        }
      })
  })
}
window.addEventListener('load',update()) // Run payload once site has loaded
