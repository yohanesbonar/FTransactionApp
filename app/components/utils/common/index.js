import React, {useEffect, useRef} from 'react';

export const formatDate = date => {
  let temp = date.split(' ')[0].split('-').reverse(),
    newFormat;
  temp[0] = temp.splice(1, 1, temp[0])[0];
  let month = parseInt(temp[0]);
  month = convertMonth(month);
  newFormat = temp[1] + ' ' + month + ' ' + temp[2];
  if (newFormat.charAt(0) === '0') {
    newFormat = newFormat.slice(1);
  }
  return newFormat;
};

export const convertMonth = month => {
  const monthNames = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'December',
  ];

  return monthNames[month - 1];
};

export const formatRupiah = (fee, prefix) => {
  var number_string = fee.replace(/[^,\d]/g, '').toString(),
    split = number_string.split(','),
    residual = split[0].length % 3,
    rupiah = split[0].substr(0, residual),
    thousand = split[0].substr(residual).match(/\d{3}/gi);

  if (thousand) {
    separator = residual ? '.' : '';
    rupiah += separator + thousand.join('.');
  }

  rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : rupiah ? 'Rp ' + rupiah : '';
};

export const useDebouncedEffect = (callback, delay, deps = []) => {
  const firstUpdate = useRef(true);
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, ...deps]);
};

export const ascendingSortName = filteredData => {
  let tempFiltered = filteredData;
  tempFiltered.sort((a, b) => {
    const nameA = a.beneficiary_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.beneficiary_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  console.log('ascendingSort', tempFiltered);
  return tempFiltered;
};

export const descendingSortName = filteredData => {
  let tempFiltered = filteredData;
  tempFiltered.sort((a, b) => {
    const nameA = a.beneficiary_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.beneficiary_name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return 1;
    }
    if (nameA > nameB) {
      return -1;
    }
    return 0;
  });
  console.log('descendingSort', tempFiltered);
  return tempFiltered;
};

export const dateSort = (type, data) => {
  let tempData = data;
  tempData.sort((a, b) => {
    let tempdateA = a.created_at;
    tempdateA = tempdateA.split(' ')[0];
    tempdateA = new Date(tempdateA);

    let tempdateB = b.created_at;
    tempdateB = tempdateB.split(' ')[0];
    tempdateB = new Date(tempdateB);

    // console.log('new Date', new Date(a.created_at));
    if (type == 'latest') {
      return tempdateB.getTime() - tempdateA.getTime();
    } else {
      return tempdateA.getTime() - tempdateB.getTime();
    }
  });
  console.log('latestDateSort', tempData);
  return tempData;
};
