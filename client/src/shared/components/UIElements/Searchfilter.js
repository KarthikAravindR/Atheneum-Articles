export default function searchfilter(searchText, tasks) {
    return tasks
        .filter(task => {
            if (task.title.toLowerCase().includes(searchText.toLowerCase())) {
                return true;
            }
            if (task.description.includes(searchText)) {
                return true;
            }
            return false;
        })
        .slice(0, 7);
        
}