
// create loadCategories
const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
        .catch((error) => console.log(error))
}

// load videos
const loadVideos = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
        .catch((error) => console.log(error))
}

const removeActiveClass = () =>{
    const buttons = document.getElementsByClassName('category-btn');
    for(let btn of buttons){
        btn.classList.remove('active');
    }
}

const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then(res => res.json())
    .then(data => {
        removeActiveClass();
        const activeBtn = document.getElementById(`btn-${id}`);
        // console.log(activeBtn)
        activeBtn.classList.add('active');
        displayVideos(data.category);
    })
    .catch((error) => console.log(error))

}

const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');
    videosContainer.innerHTML = '';
    if(videos.length == 0){
        videosContainer.classList.remove('grid');
        videosContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center">   
                <img src="./assets/icon.png"/>
                <h1 class="text-2xl lg:text-5xl text-gray-500"> No Content here in this category</h1>
            </div>
        `;
    }
    else{
        videosContainer.classList.add('grid');
    }

    videos.forEach(video => {
        const card = document.createElement('div');
        card.classList = 'card card-compact bg-base-100 ';
        const verified = video.authors[0].verified;
        
        card.innerHTML = `
        <div class="card card-compact bg-base-100 ">
            <figure class="h-[200px] relative">
                 <img class="h-full w-full object-cover" src= ${video?.thumbnail} alt="thumbnail"/>
                 ${
                    video.others?.posted_date?.length == 0 ? "" : `<span class="absolute text-xs bottom-3 right-3 bg-black text-white px-2 py-1 rounded-lg">${getTimeString(video.others.posted_date)}</span> `
                 }
                 
            </figure>
            <div class="py-2 flex ">
                <div class="w-12">
                    <img class="w-10 h-10 rounded-full object-cover border-2 border-sky-500 " src="${video?.authors[0]?.profile_picture}" />
                </div>
                <div>
                    <p class="font-bold">${video.title}</p>
                    <div class="flex items-center gap-2">
                        <p class="text-xs font-semibold text-gray-400">${video.authors[0]?.profile_name}</p>
                        <img class="w-5 ${verified === true ? 'block': 'hidden'}" src="https://img.icons8.com/?size=100&id=2AuMnRFVB9b1&format=png&color=000000" />
                    </div>
                </div>
               
            </div>
        </div>
        `;

        videosContainer.append(card);
    })

}

// create displayCategories
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');

    categories.forEach(item => {
        // create a button
        const buttonContainer = document.createElement('div');
        buttonContainer.classList = ""
        buttonContainer.innerHTML = `
            <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
            ${item.category}
            </button>
        `
        
        categoryContainer.append(buttonContainer);
    });
}

function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = remainingSecond % 60;
    return `${hour}h ${minute}m ${remainingSecond}s ago`;
}


loadCategories();
loadVideos();







