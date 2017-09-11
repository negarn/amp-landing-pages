window.onload = function () {
    var ws = new WebSocket('wss://blue.binaryws.com/websockets/v3?app_id=1');

    var el_email   = document.getElementById('email');
    var el_signup  = document.getElementById('signup');
    var el_success = document.getElementById('success');

    function sendVerifyEmail() {
        ws.send(JSON.stringify({
            verify_email: el_email.value,
            type        : 'account_opening'
        }));
    }

    ws.onmessage = function(msg) {
        var data = JSON.parse(msg.data);
        if (data.error) {
            el_email.classList.add('error-field');
        } else {
            el_email.classList.remove('error-field');
            el_signup.classList.add('invisible');
            el_success.classList.remove('invisible');
        }
    };

    document.getElementById('frm_verify_email').addEventListener('submit', function (evt) {
        evt.preventDefault();

        if (ws.readyState === 1) {
            sendVerifyEmail();
        } else {
            ws.onopen = function() {
                sendVerifyEmail()
            };
        }
    });
};