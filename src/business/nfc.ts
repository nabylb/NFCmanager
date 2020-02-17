type TagType = {
  ndefMessage: string[];
  maxSize: number;
  type: string;
  techTypes: string[];
  id: string;
};

type ItemType = {
  key: string;
  value: string | number;
};

const arry2string = (list: string[]) => {
  return list.join(' ');
};

const bin2String = array => {
  var result = '';
  for (var i = 0; i < array.length; i++) {
    result += String.fromCharCode(array[i]);
  }
  return result;
};

const decodeNdef: (tag: TagType) => string[] = (tag: TagType) => {
  let decodedArray = [];
  let item: ItemType = {
    key: 'maxSize',
    value: tag.maxSize,
  };
  decodedArray.push(item);

  tag.ndefMessage &&
    tag.ndefMessage.map(record => {
      item = {
        key: `id: ${record.id} tnf: ${record.tnf} type: ${record.type}`,
        value: record ? bin2String(record.payload) : '',
      };
      decodedArray.push(item);
    });

  item = {
    key: 'type',
    value: tag.type,
  };
  decodedArray.push(item);

  item = {
    key: 'techTypes',
    value: arry2string(tag.techTypes),
  };
  decodedArray.push(item);

  item = {
    key: 'id',
    value: tag.id,
  };
  decodedArray.push(item);

  return decodedArray;
};

export {decodeNdef};
