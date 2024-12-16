export const dictionaryConvertor = (dictionary, status) => dictionary[status] || dictionary.default;

export function sortTable(tableClass, n) {
  let rows;
  let switching;
  let i;
  let x;
  let y;
  let shouldSwitch;
  let dir;
  let switchCount = 0;

  const table = document.getElementsByClassName(tableClass)[0];
  switching = true;
  dir = 'asc';
  while (switching) {
    switching = false;
    rows = table.getElementsByTagName('TR');
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName('TD')[n];
      y = rows[i + 1].getElementsByTagName('TD')[n];
      let cmpX = isNaN(parseInt(x.innerHTML, 10)) ? x.innerHTML.toLowerCase() : parseInt(x.innerHTML, 10);
      let cmpY = isNaN(parseInt(y.innerHTML, 10)) ? y.innerHTML.toLowerCase() : parseInt(y.innerHTML, 10);
      cmpX = cmpX === '-' ? 0 : cmpX;
      cmpY = cmpY === '-' ? 0 : cmpY;
      if (dir === 'asc') {
        if (cmpX > cmpY) {
          shouldSwitch = true;
          break;
        }
      } else if (dir === 'desc') {
        if (cmpX < cmpY) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchCount++;
    } else if (switchCount === 0 && dir === 'asc') {
      dir = 'desc';
      switching = true;
    }
  }
}

export const separateDigitNumber = num => {
  return num.toString().replace(/(.)(?=(\d{3})+$)/g, '$1,');
};


export const spliteWithDash = (number: string | number) => number.toString().match(new RegExp('.{1,4}', 'g'))!.join(" - ")

export const spliteWithDashOnChange = (number: string | number) => number.toString().length < 19 ?
  number.toString().replace(/\W/gi, '').replace(/(.{4})/g, '$1 ').replace(/\s/g, "-") : number

export function arabicToEnglishConvertor(value) {
  return value.replace(/[\u0660-\u0669]/g, function (c) {
    return c.charCodeAt(0) - 0x0660;
  }).replace(/[\u06f0-\u06f9]/g, function (c) {
    return c.charCodeAt(0) - 0x06f0;
  });
}
