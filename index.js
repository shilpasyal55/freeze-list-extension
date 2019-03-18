var blogs = JSON.parse(localStorage.getItem('blogs'));

for(let i = 0; i < blogs.length; i++ ){

    let blog = JSON.parse(blogs[i]);
    let main_div = document.createElement("div");
    main_div.id = `card${i}`
    let card = document.createElement('div');
    card.className = "card inline";
    let label_container = document.createElement('label');
    label_container.className = "container";
    let input = document.createElement('input');
    input.setAttribute("id",`check${i}`);
    input.type = "checkbox";
    input.checked = blog.mark;
    let label_check = document.createElement('label');
    label_check.setAttribute("for",`check${i}`);
    let title = document.createTextNode(blog.title);
    let url_div = document.createElement('div');
    url_div.className = "url";
    let link = document.createElement("a");
    link.setAttribute("href",blog.url);
    let link_url = document.createTextNode(blog.url);
    let icon = document.createElement("i");
    icon.className = "fa fa-trash inline";
    icon.id = `icon${i}`
    let span = document.createElement("span");
    span.id = `status${i}`;
    let span_div = document.createElement("div");
    let span_date = document.createElement("span");
    span_date.className = "label info";
    span_date.innerText = `Mark on: ${blog.date}`
    span_div.className = "inline_span";
    var mybr = document.createElement('br');
    let span_text;
    if(blog.mark == true) {
        span_text = document.createTextNode("Completed")
        span.appendChild(span_text);
        span.className = "label success";
    }
    else{
        span_text = document.createTextNode("InComplete")
        span.appendChild(span_text);
        span.className = "label danger"
    }
    

    card.appendChild(label_container);
    label_container.appendChild(input);
    label_container.appendChild(label_check);
    label_container.appendChild(url_div);
    label_check.appendChild(title);
    url_div.appendChild(link);
    link.appendChild(link_url);
    span_div.appendChild(span);
    span_div.appendChild(mybr);
    span_div.appendChild(span_date);
    let main = document.getElementsByClassName('main-content');
    main_div.appendChild(card);
    main_div.appendChild(icon);
    main_div.appendChild(span_div);
    main[0].appendChild(main_div);
    blog.mark == true ? ( card.style.opacity = 0.4) : (card.style.opacity = 1);
    input.onclick = function(e) {
        if(e.target.checked == true){
            blog.mark = true;
            changeBlogStatus(blog);
            markComplete(card,i);
        }
        else{
            blog.mark =false;
            changeBlogStatus(blog);
            markInComplete(card,i);            
        }
    }
    icon.onclick = function(e) {
        deleteBlog(blog,i);
    }
}

function changeBlogStatus(blog) {
    var fetchBlogs = localStorage.getItem('blogs');
    let b = JSON.parse(fetchBlogs);
    for (let i = 0; i < b.length; i++) {
        let item = JSON.parse(b[i]);
        if (item.url == blog.url) {
            b.splice(i,1);
            break;
        }
    }
    b.push(JSON.stringify(blog));
    localStorage.setItem('blogs', JSON.stringify(b));

}

function deleteBlog(blog,index) {
    var fetchBlogs = localStorage.getItem('blogs');
    let b = JSON.parse(fetchBlogs);
    for (let i = 0; i < b.length; i++) {
        let item = JSON.parse(b[i]);
        if (item.url == blog.url) {
            b.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('blogs', JSON.stringify(b));
    let card = document.getElementById(`card${index}`);
    card.parentNode.removeChild(card);
}

function markComplete(card,i) {
    card.style.opacity = 0.4
    let status = document.getElementById(`status${i}`);
    status.innerText = "Completed"
    status.classList.remove("danger");
    status.classList.add("success");
}

function markInComplete(card,i) {
    card.style.opacity = 1
    let status = document.getElementById(`status${i}`);
    status.innerText = "InComplete"
    status.classList.remove("success");
    status.classList.add("danger");
}


