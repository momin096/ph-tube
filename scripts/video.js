
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




/* 
 {
      "category_id": "1001",
      "video_id": "aaaa",
      "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
      "title": "Shape of You",
      "authors": [
        {
          "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
          "profile_name": "Olivia Mitchell",
          "verified": ""
        }
      ],
      "others": {
        "views": "100K",
        "posted_date": "16278"
      },
      "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
    },
*/



const displayVideos = (videos) => {
    const videosContainer = document.getElementById('videos-container');

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
        const button = document.createElement('button');
        button.classList = 'btn', 'btn-primary';
        button.innerText = item.category;

        // add button on category container
        categoryContainer.append(button);
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






