export const drag = () => {
    const inputFiles = document.querySelectorAll(".form__file-input");

    inputFiles.forEach((inputFile) => {
        const dropZoneElement = inputFile.closest(".form__file");

        inputFile.addEventListener("change", (e) => {
            if (inputFile.files.length) {
                updateThumbnail(dropZoneElement, inputFile.files[0]);
            }
        });

        inputFile.addEventListener("focus", (e) => {
            inputFile.value = null;
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
        let fileList = document.querySelector(".form__file-list");

        let thumbnailElement, thumbSize, thumbName, removeBtn;

        if (dropZoneElement.hasAttribute("data-upload-hidden")) {
            dropZoneElement.classList.add("hidden");
        }

        if (document.querySelector("[data-upload-more]")) {
            document
                .querySelector("[data-upload-more]")
                .classList.remove("hidden");
        }

        if (!fileList) {
            fileList = document.createElement("div");
            fileList.classList.add("form__file-list");
            dropZoneElement.after(fileList);
        }

        thumbnailElement = document.createElement("span");
        thumbnailElement.classList.add("form__file-thumb");
        fileList.appendChild(thumbnailElement);

        // console.log("work");
        // thumbImage = document.createElement("span");
        // thumbImage.classList.add("form__file-image");
        // thumbnailElement.appendChild(thumbImage);

        thumbName = document.createElement("span");
        thumbName.classList.add("form__file-name");
        thumbnailElement.appendChild(thumbName);

        thumbSize = document.createElement("span");
        thumbSize.classList.add("form__file-size");
        thumbnailElement.appendChild(thumbSize);

        removeBtn = document.createElement("button");
        removeBtn.classList.add("form__file-remove");

        removeBtn.classList.add("icon-delete");
        removeBtn.setAttribute("type", "button");

        thumbnailElement.appendChild(removeBtn);

        let fileName = file.name;
        let fileSize = getSize(file.size);
        thumbName.innerHTML = fileName;
        thumbSize.innerHTML = fileSize;

        // console.log(file);

        // // Show thumbnail for image files
        // if (file.type.startsWith("image/")) {
        //     const reader = new FileReader();

        //     reader.readAsDataURL(file);
        //     reader.onload = () => {
        //         thumbImage.style.backgroundImage = `url('${reader.result}')`;
        //     };
        // } else {
        //     thumbImage.style.backgroundImage = null;
        // }
    }

    function getSize(bits) {
        let size;

        if (bits / 1024 < 1) {
            size = bits + "B";
        }

        if (bits / 1024 > 1) {
            if (bits / Math.pow(1024, 2) < 1) {
                size = (bits / 1024).toFixed(1) + "KB";
            }

            if (bits / Math.pow(1024, 2) > 1) {
                size = (bits / Math.pow(1024, 2)).toFixed(1) + "MB";
            }
        }

        return size;
    }
};
