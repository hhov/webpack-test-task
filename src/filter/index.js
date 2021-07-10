import moment from "moment";

export const Filter = (options) => {
  const container = document.getElementById(options.containerId);
  container.classList.add("filters");
  let filters = [];
  let selectList = [];
  let inputList = [];
  let filterData = {};

  options.data.columns.forEach((col, index) => {
    const container = document.createElement("div");
    const select =
      col.type !== "input"
        ? document.createElement("select", { id: col.code })
        : null;
    const input =
      col.type === "input"
        ? document.createElement("input", { id: col.code })
        : null;
    const label = document.createElement("label");
    label.innerText = col.label;

    const allOption = document.createElement("option");
    allOption.text = "-- ALL --";
    allOption.value = "*";

    if (select) {
      select.appendChild(allOption);
    }

    container.classList.add("filter-element");
    if(col.hidden) {
      container.classList.add("hidden");
    }
    container.appendChild(label);

    if (select) {
      container.appendChild(select);
    }
    if (input) {
      container.appendChild(input);
    }

    options.data.data.forEach((colItem) => {
      colItem.forEach((val, jIndex) => {
        if (index === jIndex) {
          const colElem = document.createElement("option");
          if (col.type === "unixtimestamp") {
            colElem.value = val;
            colElem.text = moment.unix(val).format("YYYY-MM-DD HH:mm:ss");
          } else {
            colElem.value = val;
            colElem.text = val;
          }
          if (select) {
            select.appendChild(colElem);
          }
        }
      });
    });
    if (select) {
      selectList.push({ of: col.code, select, type: col.type, index: col.index });
    }
    if (input) {
      inputList.push({ of: col.code, input, type: col.type, index: col.index });
    }
    filters.push(container);
  });

  filters.forEach((filter) => container.appendChild(filter));

  return {
    observe: (callback) => {
      selectList.forEach(({ select, of, type, index }) => {
        select.addEventListener("change", ({ target: { value } }) => {
          filterData[of] = { value, index, type };
          callback(filterData);
        });
      });
      inputList.forEach(({ input, of, type, index }) => {
        input.addEventListener("input", ({ target: { value } }) => {
          filterData[of] = { value: value ? value : "*", index, type };
          callback(filterData);
        });
      });
    },
  };
};
