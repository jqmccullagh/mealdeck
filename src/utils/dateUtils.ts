const DAYS_OF_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export interface WeekInfo {
  startDate: Date;
  endDate: Date;
  displayRange: string;
  days: {
    name: string;
    date: Date;
    displayDate: string;
  }[];
}

export const getWeekDates = (weekOffset: number = 0): WeekInfo => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  
  // Find the most recent Sunday
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - currentDay + (weekOffset * 7));
  startDate.setHours(0, 0, 0, 0);

  // Calculate the end date (Saturday)
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);

  // Generate array of days
  const days = DAYS_OF_WEEK.map((dayName, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    
    return {
      name: dayName,
      date: date,
      displayDate: formatDate(date),
    };
  });

  return {
    startDate,
    endDate,
    displayRange: formatDateRange(startDate, endDate),
    days,
  };
};

const formatDate = (date: Date): string => {
  const month = date.toLocaleString('default', { month: 'short' });
  const day = date.getDate();
  return `${month} ${day}`;
};

const formatDateRange = (start: Date, end: Date): string => {
  const startMonth = start.toLocaleString('default', { month: 'long' });
  const endMonth = end.toLocaleString('default', { month: 'long' });
  const startDay = start.getDate();
  const endDay = end.getDate();

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}`;
  }
  return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
}; 