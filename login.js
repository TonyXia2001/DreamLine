document.getElementById('submitBtn').addEventListener('click', async (e)=>{
    var usernameEle = document.getElementById('usernameIp');
    var passwordEle = document.getElementById('passwordIp');
    var confirmEle = document.getElementById('confirmIp');
    if (confirmEle.style.display == "none") { // login
        var username = usernameEle.value;
        var password = passwordEle.value;
        // if the user didn't provide enough info
        if (!username || !password) {
            alert("Please use correct credentials");
        } else {
            var user = {
                username: username,
                password: password
            };
            login(user);
        }
    } else {
        var username = usernameEle.value;
        var password = passwordEle.value;
        var confirm = confirmEle.value;
        // if the user didn't provide enough info
        if (!username || !password || !confirm) {
            alert("Please fill in all the fields");
        } else if (password != confirm) {
            alert("Please make sure you entered the correct confirmation password");
        } else {
            var user = {
                username: username,
                password: password
            };
            // create the user
            let response = await fetch('https://dreamline-270317.appspot.com/login/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            if (response.status == 401) {
                alert("the username is taken");
            } else {
                login(user);
            }
        }
    }
})

async function login(user) {
    try {
        // make a login request
        let response = await fetch('https://dreamline-270317.appspot.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        // get the token
        let result = await response.json();
        let token = result.token

        // store the token in sessionStorage
        var headerWithToken = {
            'Content-Type': 'application/json',
            'authorization': `bearer ${token}`
        };
        window.sessionStorage.setItem("authorizedHeader", JSON.stringify(headerWithToken));
        window.location.href = "./progressbar.html";
    } catch (e) {
        alert("Invalid credentials!");
    }
}
