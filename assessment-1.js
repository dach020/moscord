
const people = [
  { name: 'Arisa', department: 'BP', gender: 'F' },
  { name: 'Ham', department: 'IT', gender: 'F' },
  { name: 'Alice', department: 'IT', gender: 'F' },
  { name: 'Anna', department: 'DA', gender: 'F' },
  { name: 'Larry', department: 'Sales', gender: 'M' },
  { name: 'Ria', department: 'Sales', gender: 'F' },
  { name: 'JD', department: 'Sales', gender: 'M' },
  { name: 'Thor', department: 'Sales', gender: 'M' },
  { name: 'Karl', department: 'Sales', gender: 'M' },
  { name: 'Rachel', department: 'Sales', gender: 'F' }
 ];

function listByGender(gender) {
  let names = '';
  const object = people.filter(item => item.gender === gender);
  object.forEach((item) => {
    names += `${item.name},`;
  });
  return names.slice(0, -1);
}

function groupedByDepartment() {
  const result = people.reduce((objectsByKeyValue, ctx) => {
    const value = ctx['department'];
    objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(ctx);
    return objectsByKeyValue;
  }, {});
  return JSON.stringify(result);
}


console.log('List gender by F: ', listByGender('F'));
console.log('List gender by M: ', listByGender('M'));
console.log('Grouped by Department: ', groupedByDepartment());