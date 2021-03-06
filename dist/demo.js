const data = {
  columns: [
    {
      code: "id",
      label: "id",
      type: "input",
      index: 0,
    },
    {
      code: "name",
      label: "Название",
      type: "input",
      index: 1,
    },
    {
      code: "category",
      label: "Категория",
      type: "string",
      index: 2,
    },
    {
      code: "date",
      label: "Дата",
      type: "unixtimestamp",
      hidden: true,
      index: 3,
    },
    {
      code: "value",
      label: "Значение",
      type: "number",
      index: 4,
    },
  ],
  data: [
    ["item-1", "Фубар-2", "Мягкие", 1008536400, 659436],
    ["item-3", "Фубар-4", "Красные", 1603832400, 847592],
    ["item-5", "Черепашка-6", "Красные", 1132952400, 839218],
    ["item-7", "Пепега-8", "Прозрачные", 1007758800, 180952],
    ["item-9", "Черепашка-10", "Красные", 1604869200, 660033],
    ["item-11", "Черепашка-12", "Прозрачные", 1425070800, 334169],
    ["item-13", "Фубар-14", "Мягкие", 994881600, 939727],
    ["item-15", "Фубар-16", "Прозрачные", 1432328400, 227695],
    ["item-17", "Пепега-18", "Прозрачные", 983394000, 239887],
    ["item-19", "Фубар-20", "Красные", 1443819600, 245236],
  ],
};

const filter = customTable.Filter({ containerId: "filter_container", data });
const table = customTable.Table({
  containerId: "table_container",
  filter,
  data,
});
