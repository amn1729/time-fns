# Time type and utils

## Type
### type Time
  - h: `number`
  - m: `number`
  - p: `AM | PM`

## Functions
### toTime `(timeString: string) => Time`
Convert strings to `Time` using regex groups capture  
Examples:  
  - toTime("12:00 AM") //=> { h: 12, m: 0, p: "AM" }
  - toTime("15:30") //=> { h: 3, m: 30, p: "PM" }
  
### getValue `(time: Time) => number`
Returns total amount of minutes in provide time value.  
Examples:  
  - getValue({ h: 1, m: 0, p: "AM" }) //=> 60
  - getValue({ h: 9, m: 0, p: "AM" }) //=> 540
  - getValue({ h: 1, m: 0, p: "AM" }) //=> 780

### isBetween `(time: Time, start: Time, end: Time) => boolean`
Returns true if `time` is between `start` and `end` else false

### addMinutes `(time: Time, minutes: number) => Time`
Add minutes to a time.

### formatTime `(time: Time) => string`
Returns formatted string from `time`  
Examples:  
  - formatTime({ h: 1, m: 0, p: "AM" }) //=> "01:00 AM"
  - getValue({ h: 9, m: 0, p: "AM" }) //=> "09:00 AM"
