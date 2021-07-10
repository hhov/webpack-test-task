import moment from "moment";

export const Table = (options) => {
  const container = document.getElementById(options.containerId);
  const table = document.createElement("table");
  const header = document.createElement("thead");
  const body = document.createElement("tbody");

  table.appendChild(header);
  table.appendChild(body);

  options.data.columns.forEach((item) => {
    const col = document.createElement("th");
    col.textContent = item.label;
    header.appendChild(col);
  });

  options.data.data.forEach((item) => {
    const row = document.createElement("tr");
    item.forEach((item, index) => {
      const column = options.data.columns[index];
      const columnElem = document.createElement("td");
      if (column.type === "unixtimestamp") {
        columnElem.innerHTML = moment.unix(item).format("YYYY-MM-DD HH:mm:ss");
      } else {
        columnElem.innerHTML = item;
      }
      row.appendChild(columnElem);
    });
    body.append(row);
  });

  if (options.filter) {
    options.filter.observe((filters) => {
      body.innerHTML = "";
      const filteredRows = [];
      options.data.data.forEach((row) => {
        let validRow = true;
        for (const [colIndex, col] of row.entries()) {
          let currentFilter = null;
          for (let filter in filters) {
            if (filters[filter].index === colIndex) {
              currentFilter = filters[filter];
            }
          }
          if (!currentFilter || currentFilter.value === "*") {
            validRow = true;
          }
          if (currentFilter) {
            if (
              currentFilter.type !== "input" &&
              currentFilter.value !== "*" &&
              currentFilter.value != col
            ) {
              validRow = false;
              break;
            } else if (
              currentFilter.type === "input" &&
              currentFilter.value !== "*" &&
              col.indexOf(currentFilter.value) === -1
            ) {
              validRow = false;
              break;
            }
          }
        }
        if (validRow) {
          filteredRows.push(row);
        }
      });

      filteredRows.forEach((item) => {
        const row = document.createElement("tr");
        item.forEach((item, index) => {
          const column = options.data.columns[index];
          const columnElem = document.createElement("td");
          if (column.type === "unixtimestamp") {
            columnElem.innerHTML = moment
              .unix(item)
              .format("YYYY-MM-DD HH:mm:ss");
          } else {
            columnElem.innerHTML = item;
          }
          row.appendChild(columnElem);
        });
        body.append(row);
      });
    });
  }

  container.appendChild(table);

  return null;
};
