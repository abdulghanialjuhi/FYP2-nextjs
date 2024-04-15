
function parseDuration(duration) {
    const [hours, minutes] = duration.split(':').map(Number);
    return hours * 60 + minutes; // Convert hours to minutes and add minutes
}

  
export function getAvailableTimeSlots(openTime, closeTime, serviceDuration) {
    // Convert open and close times to Date objects for easier manipulation
    const openDateTime = new Date('2024-01-01 ' + openTime);
    const closeDateTime = new Date('2024-01-01 ' + closeTime);
    
    // Parse service duration to minutes
    const serviceDurationMinutes = parseDuration(serviceDuration);
  
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
        if (count === 100) {
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