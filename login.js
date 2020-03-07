document.getElementById('submitBtn').addEventListener('click', async (e)=>{
    var usernameEle = document.getElementById('usernameIp');
    var passwordEle = document.getElementById('passwordIp');
    var confirmEle = document.getElementById('confirmIp');
    if (confirmEle.style.display == "none") { // login
        var username = usernameEle.value;
        var password = passwordEle.value;
        if (!username || !password) {
            alert("Please use correct credentials");
        } else {
            var user = {
                username: username,
                password: password
            };
            try {
                let response = await fetch('https://dreamline-270317.appspot.com/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
                let result = await response.json();
                var headerWithToken = {
                    'Content-Type': 'application/json',
                    'authorization': `bearer ${result}`
                };
                window.sessionStorage.setItem("authorizedHeader", JSON.stringify(headerWithToken));
                window.location.href = "./progressbar.html";
            } catch (e) {
                alert("Invalid credentials!");
            }
        }


    } else {

    }
})
