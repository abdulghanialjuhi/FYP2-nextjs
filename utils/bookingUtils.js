import axios from "axios";

function parseDuration(duration) {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 60 + minutes; // Convert hours to minutes and add minutes
}

  
export function getAvailableTimeSlots(openTime, closeTime, serviceDuration) {
    // Convert open and close times to Date objects for easier manipulation
    const openDateTime = new Date('2024-01-01 ' + openTime);
    const closeDateTime = new Date('2024-01-01 ' + closeTime);
    
    // Parse service duration to minutes
    const serviceDurationMinutes = parseDuration(serviceDuration || "0:30");
  
    // Initialize array to store available time slots
    const availableTimeSlots = [];
  
    // Initialize current time as open time
    let currentTime = openDateTime;
  
    let count = 0
    // Iterate over time range from open time to close time
    while (currentTime < closeDateTime) {
        count++
        // Calculate end time of current time slot by adding service duration
        const endTime = new Date(currentTime.getTime() + serviceDurationMinutes * 60000); // Multiply by 60000 to convert minutes to milliseconds
    
        // Check if end time is before close time
        if (endTime <= closeDateTime) {
            // Add current time slot to available time slots array
            availableTimeSlots.push({
            startTime: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            endTime: endTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            });
        }
    
        // Move to next time slot by adding service duration
        currentTime = new Date(currentTime.getTime() + serviceDurationMinutes * 60000); // Multiply by 60000 to convert minutes to milliseconds
        if (count === 50) {
            break
        }
    }
  
    return availableTimeSlots;
}


export function getDayOfWeek(dateString) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
}
  

export function getDayIndices(offDays) {
    const daysOfWeek = {
      "sunday": 0,
      "monday": 1,
      "tuesday": 2,
      "wednesday": 3,
      "thursday": 4,
      "friday": 5,
      "saturday": 6
    };
  
    // Convert the day names to lowercase to handle case insensitivity
    const lowercaseOffDays = offDays.map(day => day.toLowerCase());
  
    // Map each day name to its corresponding index
    return lowercaseOffDays.map(day => {
      if (day in daysOfWeek) {
        return daysOfWeek[day];
      } else {
        // Handle invalid day strings
        console.error("Invalid day string:", day);
        return null;
      }
    });
}

export function addTimeToDate(date, time) {
  // Split the time string into hours, minutes, and period (am/pm)
  const [timeString, period] = time.split(' ');
  const [hoursString, minutesString] = timeString.split(':');

  // Convert the hours string to a number
  let hours = parseInt(hoursString);
  let minutes = parseInt(minutesString);

  // Convert 12-hour format to 24-hour format
  if (hours === 12 && period.toLowerCase() === 'am') {
      hours = 0;
  } else if (period.toLowerCase() === 'pm') {
      hours += 12;
  }

  // Parse the date and set the hours and minutes
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(0); // Optional: Set seconds to zero if needed
  date.setMilliseconds(0); // Optional: Set milliseconds to zero if needed

  return date;
}


export const isBarberBooked = async (barbershop, barber, time, date, service) => {

  try {
    const res = await axios.get('/api/booking', {params: {status: 'pending', service, barber, barbershop, time, date}})
    console.log('res: ', res.data?.data);
    return res.data?.data?.length > 0 ? res.data?.data : null
  } catch(error) {
    console.log('error: ', error);
  }

}

export const checkBooking = async (service, barber, barbershop, date, time) => {

    const targetDate = new Date(date + 'T' + time);

    try {
        const res = await axios.get('/api/booking', {params: {status: 'pending', service, barber, barbershop, date}})

        const isBooked = res.data.data?.some(appointment => {
            const appointmentDate = new Date(appointment.date);
            const appointmentTime = appointment.time.split(' ')[0]; // Extract time without AM/PM
            const [hours, minutes] = appointmentTime.split(':');
            appointmentDate.setHours(hours, minutes);

            // Check if the appointment overlaps with the target date and time
            return targetDate.getTime() === appointmentDate.getTime();
        });

        console.log('res: ', isBooked);
        return isBooked
    } catch(error) {
        console.log('error: ', error);
    }
}

const isBarberBooked1  = async (item, bookObj) => {

  const res = await isBarberBooked(bookObj.barbershop, bookObj.barber, item.startTime, bookObj.date, bookObj.service)
  if (res) {
    item['booked'] = true
  }

  return item
}

export const checkBookedSlot = async (timeSlots, bookObj) => {


  const processedDataArray = await Promise.all(timeSlots.map(item => isBarberBooked1(item, bookObj)));
  
  return processedDataArray;

}