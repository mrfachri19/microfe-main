export const thousand = val => (
  val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
);

export const rupiah = val => (`Rp. ${thousand(val)}`);

export const fileAccept = arr => {
  let val = '';
  arr.map((item, i) => {
    const file = item.split('/');
    val += file[1].toUpperCase();
    if (i+1 < arr.length) val += ', ';
  });
  return val;
};

export function getByte(val) {
  let valByte = '';

  if (val >= 1024) valByte = `${val/1024} MB`;
  else valByte = `${val} KB`;

  return valByte;
}

export const convertOptions = (arr) => {
  let opt = [];
  arr.map((item) => {
    if (!item.key) {
      opt.push({ text:item.label, value:item.value, key:item.value });
    } else {
      opt.push(item);
    }
  });

  return opt;
};

export const urlify = (text) => {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return '<a href="' + url + '">' + url + "</a>";
  });
};
