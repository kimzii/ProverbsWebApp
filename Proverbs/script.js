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

generateChapterButtons();
