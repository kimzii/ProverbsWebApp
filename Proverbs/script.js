import data from "../resources/proverbs.json" assert { type: "json" };

function getChapterData(number) {
    return data[number];
 }
  

function generateChapterButtons() {
    const holder = document.querySelector(".c-container");

    data.forEach((obj) => {
        const chapterNumber = obj.chapter;

        const buttonElement = document.createElement("button");

        buttonElement.textContent = chapterNumber;
        buttonElement.classList.add("btn");
        holder.appendChild(buttonElement);

        buttonElement.addEventListener("click", () => {
          const vholder = document.querySelector(".verse-container");
            vholder.innerHTML = '';

            const verse = getChapterData(chapterNumber - 1);

            const textVerseArray = verse.verses;
            textVerseArray.forEach((verseData) => {
                const pElement = document.createElement("p");
                pElement.innerHTML = `<strong>Verse ${verseData.verse}:</strong><br>${verseData.text}`;
                vholder.appendChild(pElement);
          });
          pElement.classList.add("versesHolder"); 
      });
    });
}

//search
const searchInput = document.querySelector(".myInput");
const container = document.querySelector(".verse-container");

searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();
    console.log(value);

  
    container.innerHTML = "";


    const matchingVerses = data.filter((chapter) => {
        return chapter.verses.some((verse) => verse.keywords.includes(value));
    });
    
    matchingVerses.forEach((chapter) => {
        chapter.verses.forEach((verse) => {
            if (verse.keywords.includes(value)) {
                const pElement = document.createElement("p");
                pElement.innerHTML = `<strong>Chapter ${chapter.chapter}, Verse ${verse.verse}:</strong><br>${verse.text}`;
                container.appendChild(pElement);
            }
        });
    });
});


generateChapterButtons();
