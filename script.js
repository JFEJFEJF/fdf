document.addEventListener("DOMContentLoaded", () => {
    const postContainer = document.getElementById('post-container');
    const latestPost = document.getElementById('latest-post');

    async function fetchLatestPost() {
        const apiUrl = `https://api.telegram.org/bot7257478170:AAEC4bRST0IG7PG-Tcn8Ue_adpqeYh2U2aI/getUpdates`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            const messages = data.result;

            // البحث عن الرسائل التي تحتوي على نص من القناة
            const channelMessages = messages.filter(message => message.message && message.message.text);

            if (channelMessages.length > 0) {
                const lastMessage = channelMessages[channelMessages.length - 1].message;
                latestPost.textContent = lastMessage.text || 'لا يوجد نص في المنشور الأخير.';
            } else {
                latestPost.textContent = 'لا توجد منشورات حالياً.';
            }
        } catch (error) {
            latestPost.textContent = 'حدث خطأ أثناء تحميل المنشور.';
            console.error('Error fetching the latest post:', error);
        }
    }

    fetchLatestPost();
});
