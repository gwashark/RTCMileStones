const followercountelem = document.getElementById("followers")
const user = document.getElementById("username")
const watermarked = document.getElementById("watermarked")
const imageresult = document.getElementById("imageresult")

document.getElementById("genbtn").onclick = function () {
    document.querySelectorAll(".alert").forEach((alertdiv) => {
        alertdiv.hidden = true
    })
    if (user.value .indexOf(' ') >= 0 || user.value == "") {
        document.getElementById("invuserval").hidden = false
    } else if (followercountelem.value < 100 || followercountelem.value > 9999999) {
        document.getElementById("invfollowval").hidden = false
    } else {
        if (watermarked.checked) {
            imageresult.src = `${window.location.href}@${document.getElementById("username").value}/${document.getElementById("followers").value}?wmk=true`
        } else {
            imageresult.src = `${window.location.href}@${document.getElementById("username").value}/${document.getElementById("followers").value}`
        }
        imageresult.alt = `@${document.getElementById("username").value}'s Milestone Achievement of ${document.getElementById("followers").value} followers.`
        imageresult.title = `@${document.getElementById("username").value}'s Milestone Achievement of ${document.getElementById("followers").value} followers.`
    }
}