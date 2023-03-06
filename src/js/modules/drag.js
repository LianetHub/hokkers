export const drag = () => {
    const inputFiles = document.querySelectorAll(".form__file-input");

    inputFiles.forEach((inputFile) => {
        const dropZoneElement = inputFile.closest(".form__file");

        inputFile.addEventListener("change", (e) => {
            if (inputFile.files.length) {
                updateThumbnail(dropZoneElement, inputFile.files[0]);
            }
        });

        dropZoneElement.addEventListener("dragover", (e) => {
            e.preventDefault();
            dropZoneElement.classList.add("over");
        });

        ["dragleave", "dragend"].forEach((type) => {
            dropZoneElement.addEventListener(type, (e) => {
                dropZoneElement.classList.remove("over");
            });
        });

        dropZoneElement.addEventListener("drop", (e) => {
            e.preventDefault();

            if (e.dataTransfer.files.length) {
                inputFile.files = e.dataTransfer.files;
                updateThumbnail(dropZoneElement, e.dataTransfer.files[0]);
            }

            dropZoneElement.classList.remove("over");
        });
    });

    /**
     * Updates the thumbnail on a drop zone element.
     *
     * @param {HTMLElement} dropZoneElement
     * @param {File} file
     */

    function updateThumbnail(dropZoneElement, file) {
        let thumbnailElement =
            dropZoneElement.querySelector(".form__file-thumb");
        let thumbImage = dropZoneElement.querySelector(".form__file-image");
        let thumbName = dropZoneElement.querySelector(".form__file-name");
        let removeBtn = dropZoneElement.querySelector(".form__file-remove");

        // First time - remove the prompt
        if (
            !dropZoneElement
                .querySelector(".form__file-content")
                .classList.contains("hidden")
        ) {
            dropZoneElement
                .querySelector(".form__file-content")
                .classList.add("hidden");
        }

        // First time - there is no thumbnail element, so lets create it
        if (!thumbnailElement) {
            thumbnailElement = document.createElement("span");
            thumbnailElement.classList.add("form__file-thumb");

            thumbImage = document.createElement("span");
            thumbImage.classList.add("form__file-image");
            thumbnailElement.appendChild(thumbImage);

            thumbName = document.createElement("span");
            thumbName.classList.add("form__file-name");
            thumbnailElement.appendChild(thumbName);

            removeBtn = document.createElement("button");
            removeBtn.classList.add("form__file-remove");
            removeBtn.classList.add("btn");
            removeBtn.classList.add("btn_blue");
            removeBtn.classList.add("btn_sm");
            removeBtn.classList.add("icon-close");
            removeBtn.setAttribute("type", "button");
            removeBtn.innerHTML = "Удалить файл";
            thumbnailElement.appendChild(removeBtn);

            dropZoneElement.appendChild(thumbnailElement);
        }

        let fileName = file.name;
        thumbName.innerHTML = fileName;

        // Show thumbnail for image files
        if (file.type.startsWith("image/")) {
            const reader = new FileReader();

            reader.readAsDataURL(file);
            reader.onload = () => {
                thumbImage.style.backgroundImage = `url('${reader.result}')`;
            };
        } else {
            thumbImage.style.backgroundImage = null;
        }
    }
};
