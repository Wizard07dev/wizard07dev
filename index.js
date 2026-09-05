
document.addEventListener("DOMContentLoaded", () => {
    // makes web pages fade smoothly without cutting away instantly
    // slight pause to allow the browser to render the page before adding the fade-in class
    setTimeout(() => {
        document.body.classList.add("page-loaded");
    }, 50);

    // explains that its looking for a link click and pauses it to play an exit animation instead of instantly jumping to the next page
    const links = document.querySelectorAll("a");
    links.forEach(link => {
        link.addEventListener("click", (e) => {
            const targetUrl = link.getAttribute("href");
            const isTargetBlank = link.getAttribute("target") === "_blank";

            // ensures it only affects links to my html, not my insta or snap or tiktok
            if (targetUrl && !targetUrl.startsWith("http") && !targetUrl.startsWith("#") && !isTargetBlank) {
                e.preventDefault(); //blocks browser from immediatly going to the new page before the animation even finishes
                document.body.classList.remove("page-loaded"); // page opacity goes back to 0

                // allows the fade out animation to finish before actually oging to the new page
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400);
            }
        });
    });

    //second block of code, watches elements and animates them when they come into view
    const revealItems = document.querySelectorAll(".reveal-item");

    // tells when an element is in view and can be seen by the user
    const observerOptions = {
        root: null, // tracks the element in relation to the viewport
        rootMargin: "0px",
        threshold: 0.15 // triggers when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // adds class to trigger the glide and fade in
                entry.target.classList.add("is-visible");
                // stop observing this element once it has been revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // grabs the label reveal-item and makes it be watched
    revealItems.forEach(item => {
        revealObserver.observe(item);
    });
});

    // dark move toggle button
    const themeToggleBtn = document.getElementById("themeToggle");
    
    // check if user previously preferred dark mode
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (themeToggleBtn) themeToggleBtn.innerText = "Light Mode";
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                themeToggleBtn.innerText = "Light Mode";
            } else {
                localStorage.setItem("theme", "light");
                themeToggleBtn.innerText = "Dark Mode";
            }
        });
    }

   //local time stamp and activity status dot
    const liveStatusText = document.getElementById("liveStatus");

    function updateLocalTime() {
        if (!liveStatusText) return;

        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };
        
        // Formats time cleanly
        const timeString = new Date().toLocaleTimeString('en-US', options);
        liveStatusText.innerText = `Building / Local Time: ${timeString}`;
    }

    // Run it instantly on load, then update once every minute
    updateLocalTime();
    setInterval(updateLocalTime, 60000);