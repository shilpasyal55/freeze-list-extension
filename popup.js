let markPageButton = document.getElementById('markPage');
markPageButton.addEventListener('click',function() {
    chrome.tabs.getSelected(null, function (tab) {
        var blogs_array = [];
        var blog = {
            mark: false,
            url: tab.url,
            title: tab.title,
            date: new Date().toLocaleDateString()
        }

        var fetchBlogs = localStorage.getItem('blogs');
        if(fetchBlogs == null || fetchBlogs == '') {
            blogs_array.push(JSON.stringify(blog));
            localStorage.setItem('blogs', JSON.stringify(blogs_array));        
        }
        else{
            let index = -1;
            let b = JSON.parse(fetchBlogs);
            for (let i = 0; i < b.length; i++) {
                let item = JSON.parse(b[i]);
                if (item.url == blog.url) {
                    index = i;
                    break;
                }
            }
            if (index == -1) {
                b.push(JSON.stringify(blog));
                localStorage.setItem('blogs', JSON.stringify(b));  
            } 
        }
    });
});

let showAllButton = document.getElementById("showAll");
showAllButton.addEventListener('click',function(){
    chrome.tabs.create({ 'url': chrome.extension.getURL('index.html'), 'selected': true});
})
