import data from "../resources/proverbs.json" assert { type: "json" };

class AVLNode {
    constructor(chapter, verses) {
        this.chapter = chapter;
        this.verses = verses;
        this.height = 1;
        this.left = null;
        this.right = null;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    height(node) {
        return node ? node.height : 0;
    }

    updateHeight(node) {
        node.height = 1 + Math.max(this.height(node.left), this.height(node.right));
    }

    balanceFactor(node) {
        return node ? this.height(node.left) - this.height(node.right) : 0;
    }

    rotateRight(y) {
        const x = y.left;
        const T2 = x.right;

        x.right = y;
        y.left = T2;

        this.updateHeight(y);
        this.updateHeight(x);

        return x;
    }

    rotateLeft(x) {
        const y = x.right;
        const T2 = y.left;

        y.left = x;
        x.right = T2;

        this.updateHeight(x);
        this.updateHeight(y);

        return y;
    }

    balance(node) {
        this.updateHeight(node);

        const balanceFactor = this.balanceFactor(node);

        if (balanceFactor > 1) {
            if (this.balanceFactor(node.left) < 0) {
                node.left = this.rotateLeft(node.left);
            }
            return this.rotateRight(node);
        }

        if (balanceFactor < -1) {
            if (this.balanceFactor(node.right) > 0) {
                node.right = this.rotateRight(node.right);
            }
            return this.rotateLeft(node);
        }

        return node;
    }

    insert(chapter, verses, node = this.root) {
        if (!node) {
            return new AVLNode(chapter, verses);
        }

        if (chapter < node.chapter) {
            node.left = this.insert(chapter, verses, node.left);
        } else if (chapter > node.chapter) {
            node.right = this.insert(chapter, verses, node.right);
        } else {
            node.verses = [...node.verses, ...verses];
        }

        return this.balance(node);
    }

    search(query, node = this.root) {
        console.log('Search query:', query); // Add this line to check if the search method is being called correctly
        if (!node) {
            return null;
        }

        const queryLower = query.toLowerCase(); // Convert the query to lowercase

        if (queryLower === node.chapter.toLowerCase()) {
            console.log('Search results:', {chapter: node.chapter, verses: node.verses}); // Add this line to check if the search results are being returned correctly
            return {
                chapter: node.chapter,
                verses: node.verses
            };
        } else if (queryLower < node.chapter.toLowerCase()) {
            return this.search(queryLower, node.left); // Use queryLower here
        } else {
            return this.search(queryLower, node.right); // Use queryLower here
        }
    }

    insertMany(chapters) {
        for (const chapter of chapters) {
            this.root = this.insert(chapter.chapter, chapter.verses, this.root);
        }
    }
}

const avlTree = new AVLTree();
avlTree.insertMany(data);

const searchInput = document.querySelector(".myInput");
const container = document.querySelector(".verse-container");

searchInput.addEventListener("input", e => {
    const searchQuery = searchInput.value.toLowerCase();

    const searchResults = avlTree.search(searchQuery);

    container.innerHTML = ""; // Clear previous search results

    if (searchResults) {
        displaySearchResults(searchResults);
    }
});

function displaySearchResults(result) {
    container.innerHTML = `Search Results for Chapter ${result.chapter}`;

    result.verses.forEach((verse) => {
        const pElement = document.createElement("p");
        pElement.innerHTML = `<strong>Verse ${verse.verse}:</strong><br>${verse.text}`;
        container.appendChild(pElement);
    });
}
