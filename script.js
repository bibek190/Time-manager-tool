let taskList = [];

const taskListElm = document.getElementById("taskList");
const badkListElm = document.getElementById("badList");
const total = document.querySelector(".total");
const badHours = document.querySelector(".badhours");
const control = document.querySelector(".form-control");
const two = document.querySelector(".two");

const handleOnSubmit = (e) => {
  const frm = new FormData(e);
  const task = frm.get("task");
  let hr = +frm.get("hr");
  const obj = { task, hr, type: "entry", id: randomStr() };
  taskList.push(obj);

  display();
  control.value = "";
  two.value = "";
};

const display = () => {
  let str = "";

  const entryList = taskList.filter((item) => item.type === "entry");
  // console.log(entryList);

  entryList.map((item, i) => {
    str += `<tr>
        <td>${i + 1}</td>
        <td>${item.task}</td>
        <td>${item.hr} hrs</td>
        <td class="text-end">
          <button class="btn btn-danger"
          onclick="handleOnDelete('${item.id}')"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
          <button class="btn btn-success"
          onclick = "handleOnSwitch('${item.id}', 'bad')"
          >
            <i class="fa-solid fa-arrow-right"></i>
          </button>
        </td>
      </tr>`;
  });

  taskListElm.innerHTML = str;
  // total hours
  let totalHrs = taskList.reduce((total, item) => {
    return total + item.hr;
  }, 0);
  if (totalHrs > 168) {
    total.innerHTML = "exceeded";
  } else {
    let remaining = 168 - totalHrs;
    total.innerHTML = `${totalHrs} and unused ${remaining}`;
  }
};

const displayBad = () => {
  let str = "";

  const badList = taskList.filter((item) => item.type === "bad");

  badList.map((item, i) => {
    str += `<tr>
        <td>${i + 1}</td>
        <td>${item.task}</td>
        <td>${item.hr} hrs</td>
        <td class="text-end">
        <button class="btn btn-warning"
        onclick = "handleOnSwitch('${item.id}', 'entry')"
        >
          <i class="fa-solid fa-arrow-left"></i>
        </button>
          <button class="btn btn-danger"
          onclick="handleOnDelete('${item.id}')"
          >
            <i class="fa-solid fa-trash"></i>
          </button>
         
        </td>
      </tr>`;
  });

  badkListElm.innerHTML = str;
  let badHr = badList.reduce((total, item) => {
    return total + item.hr;
  }, 0);
  badHours.innerHTML = badHr;
};

const handleOnDelete = (id) => {
  if (window.confirm("Delete task!!")) {
    taskList = taskList.filter((item) => item.id !== id);
    display();
    displayBad();
  }
};

const handleOnSwitch = (id, type) => {
  if (window.confirm("Change task")) {
    taskList.forEach((item) => {
      if (item.id == id) {
        item.type = type;
      }
    });
    display();
    displayBad();
  }
};

const charSrt = "qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";

const randomStr = () => {
  const strLength = 6;
  let str = "";
  for (let i = 0; i < strLength; i++) {
    str += charSrt[Math.floor(Math.random() * charSrt.length)];
  }
  return str;
};

const totalSum = (list) => {
  list.reduce((total, item) => {
    return total + item;
  }, 0);
};
