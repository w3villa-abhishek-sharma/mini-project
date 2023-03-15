// Handle Search
async function handleSearch (){
    const input = document.getElementById("search");
    const response = await fetchData("items.json");
    let arr = [];
    let select = ["product","latest","bestsellers","specials","new_fashion"]
    for (var key of Object.keys(response)) {
        if(select.includes(key)){
            arr.push(response[key])
        }
    }

    let data = [];
    arr.flat().forEach(element => {
        if(element.name.toLowerCase().match(input.value.toLowerCase())){
            data.push(element);
        }
    });
    console.log(data);
}
handleSearch()