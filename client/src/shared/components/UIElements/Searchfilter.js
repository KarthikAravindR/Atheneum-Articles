export default function searchfilter(searchText, blogs) {
    return blogs
        .filter(blog => {
            if (blog.blog[0].content.toLowerCase().includes(searchText.toLowerCase())) {
                console.log(blog.blog[0].content,searchText)
                return true;
            }
            // if (blog.description.includes(searchText)) {
            //     return true;
            // }
            return false;
        });
        
}