import { wedding } from './content';

const startUTC = '20270101T010000Z';
const endUTC = '20270101T070000Z';
const description = `Wedding Ceremony & Reception. Get directions: ${wedding.maps}`;

export function googleCalendarUrl() {
  const params = new URLSearchParams({ action: 'TEMPLATE', text: wedding.calendarTitle, dates: `${startUTC}/${endUTC}`, details: description, location: `${wedding.venue}, ${wedding.address}`, ctz: 'Asia/Manila' });
  return `https://calendar.google.com/calendar/render?${params}`;
}

function escapeIcs(value: string) {
  return value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
}

function foldIcs(line: string) {
  const encoder = new TextEncoder();
  let result = '';
  let length = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    if (length + size > 75) { result += '\r\n '; length = 1; }
    result += char;
    length += size;
  }
  return result;
}

export function calendarFile() {
  const lines = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//John Mark and Ailyn Grace//Wedding Invitation//EN', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    'UID:john-mark-ailyn-grace-wedding-20270101@invitation.local',
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`,
    `DTSTART:${startUTC}`, `DTEND:${endUTC}`, `SUMMARY:${escapeIcs(wedding.calendarTitle)}`,
    `LOCATION:${escapeIcs(`${wedding.venue}, ${wedding.address}`)}`,
    `DESCRIPTION:${escapeIcs(description)}`, 'END:VEVENT', 'END:VCALENDAR',
  ];
  return new Blob([lines.map(foldIcs).join('\r\n') + '\r\n'], { type: 'text/calendar;charset=utf-8' });
}

export function downloadCalendar() {
  const url = URL.createObjectURL(calendarFile());
  const link = document.createElement('a');
  link.href = url;
  link.download = 'john-mark-ailyn-grace-wedding.ics';
  document.body.append(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
