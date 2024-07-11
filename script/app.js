const $toDoListForm = document.getElementById("toDoListForm");
const $activity = $toDoListForm.querySelector("#activity");
const $description = $toDoListForm.querySelector("#description");
const $added = $toDoListForm.querySelector("#added");
const $activitiesList = document.getElementById("activities__list");

$toDoListForm.addEventListener("submit", (e) => {
    e.preventDefault();
});

let arr = [];

function toDoListForm(name, description) {
    this.name = name;
    this.description = description;
}

function addActivity() {
    const activity = new toDoListForm($activity.value, $description.value);
    arr.push(activity);
    $activity.value = '';
    $description.value = '';
    renderLists(arr);
}

function deleteActivity(index) {
    arr.splice(index, 1);
    renderLists(arr);
}

function editActivity(index) {
    const activity = arr[index];
    $activity.value = activity.name;
    $description.value = activity.description;
    arr.splice(index, 1);
    renderLists(arr);
}

const renderLists = (lists) => {
    $activitiesList.innerHTML = '';
    if (lists.length === 0) {
        $activitiesList.innerHTML = `<p>No planned activities</p>`;
    } else {
        lists.forEach((list, index) => {
            const d = new Date();
            let hour = d.getHours();
            let min = d.getMinutes();
            let sec = d.getSeconds();
            let day = d.getDate(); // Corrected to getDate() instead of getDay() + 2
            let month = d.getMonth() + 1;
            let year = d.getFullYear();

            const $trElement = document.createElement("tr");
            $trElement.className = "border-b-2 border-gray-400";
            $trElement.innerHTML = `
                <td>${index + 1}</td>
                <td>${list.name}</td>
                <td>${list.description}</td>
                <td>${hour}:${min}:${sec}</td>
                <td>${day}.${month}.${year}</td>
                <td class="flex gap-[20px] justify-end items-center">
                    <label>
                        <input type="checkbox" class="checkbox">
                    </label>
                    <button type="button" data-index="${index}" class="edit-button p-[10px] rounded-lg border-none bg-yellow-400 text-white flex items-center justify-center"><i class="bi bi-pencil-square"></i></button>
                    <button type="button" data-index="${index}" class="delete-button p-[10px] rounded-lg border-none bg-red-500 text-white flex items-center justify-center"><i class="bi bi-trash-fill"></i></button>
                </td>
            `;

            $activitiesList.appendChild($trElement);
        });
    }

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.closest('button').getAttribute('data-index');
            deleteActivity(index);
        });
    });

    const editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.closest('button').getAttribute('data-index');
            editActivity(index);
        });
    });
};

renderLists(arr);

$added.addEventListener("click", addActivity);