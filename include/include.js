document.addEventListener("DOMContentLoaded", async function() {
    // await loadContent("header", "./header.html");
    await loadContent("footer", "./include/footer.html");

    // 获取当前URL
    const currentUrl = window.location.href;

    // 获取所有的导航链接
    const links = document.querySelectorAll('#footer a');

    // 遍历链接并设置活动链接
    links.forEach(link => {
        if (link.href === currentUrl) {
            console.log(link.querySelector("dd"))
            link.querySelector("dd").classList.add("dd-active")
        }
    });
});

async function loadContent(elementId, url) {
    try {
        const element = document.getElementById(elementId);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
        }
        const data = await response.text();
        element.innerHTML = data;
    } catch (error) {
        console.error('Error loading content:', error);
        const element = document.getElementById(elementId);
        element.innerHTML = '<p>Error loading content.</p>';
    }
}