const formatDateTime = (date: string) => {
  // '2024-07-03T04:11:44.133Z';
  // "28 mayo, 3:25 PM"
  const [tempDate, tempTime] = date.split('T');

  const finalDate = `${tempDate.split('-')[2]}/
  ${tempDate.split('-')[1]}/
  ${tempDate.split('-')[0]}`;
  const finalTime = `${tempTime.split(':')[0]}:
  ${tempTime.split(':')[1]}`;

  return finalDate + ', ' + finalTime;
};

export default formatDateTime;
