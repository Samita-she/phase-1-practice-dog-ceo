console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

document.addEventListener("DOMContentLoaded", () => {
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const imageContainer = document.getElementById("dog-image-container");
            data.message.forEach(imageUrl => {
                const img = document.createElement("img");
                img.src = imageUrl;
                img.alt = "Random Dog Image";
                imageContainer.appendChild(img);
            });
        })
        .catch(error => console.error("Error fetching images:", error));
});
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", () => {
    const breedList = document.getElementById("dog-breeds");
    const dropdown = document.getElementById("breed-dropdown");

    // Fetch and display breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            renderBreeds(data.message); // Display all breeds
        })
        .catch(error => console.error("Error fetching breeds:", error));

    // Render breeds with click color change feature
    function renderBreeds(breeds) {
        breedList.innerHTML = ""; // Clear existing breeds before rendering
        for (const breed in breeds) {
            const li = document.createElement("li");
            li.textContent = breed;

            // Challenge 3: Change color on click
            li.addEventListener("click", () => {
                li.style.color = "purple"; // Or any color you prefer
            });

            breedList.appendChild(li);
        }
    }

    // Challenge 4: Filter breeds by selected letter
    dropdown.addEventListener("change", (e) => {
        const selectedLetter = e.target.value;

        fetch(breedUrl)
            .then(response => response.json())
            .then(data => {
                const filteredBreeds = {};
                for (const breed in data.message) {
                    if (breed.startsWith(selectedLetter)) {
                        filteredBreeds[breed] = data.message[breed];
                    }
                }
                renderBreeds(filteredBreeds);
            });
    });
});
