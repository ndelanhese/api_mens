import getDate, {
  getMonth,
  getTime,
  getYear,
  getDateString,
  getNextDay,
  getDay,
} from '@shared/Date';

describe('Date test', () => {
  test('Should get a date', () => {
    const date = getDate('2023-02-16');
    expect(date).toStrictEqual(new Date('2023-02-16'));
  });

  test('Should convert a date in String format', () => {
    const date = getDate('2023-02-16');
    const dateString = getDateString(date);
    expect(dateString).toBe('2023-02-16');
  });

  test('Should show the next day', () => {
    const date = getDate('2023-02-16');
    const dateString = getNextDay(date);
    expect(dateString).toStrictEqual(getDate('2023-02-17'));
  });

  test('Should show the day, month and year from date', () => {
    const date = getDate('2023-02-16');
    const day = getDay(date);
    const month = getMonth(date);
    const year = getYear(date);
    expect(day).toBe(16);
    expect(month).toBe(2);
    expect(year).toBe(2023);
  });

  test('Should show the time-stamp', () => {
    const date = getDate('2023-02-16');
    const time = getTime(date);
    expect(time).toBe(1676505600000);
  });
});
