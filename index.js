// Your code here

function createEmployeeRecord(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

//args: array of arrays
function createEmployeeRecords(array) {
  let newArr = array.map(ele => createEmployeeRecord(ele));
  return newArr;
}

//dateStamp ("YYYY-MM-DD HHMM")
function createTimeInEvent(employee, dateStamp) {
  const time = dateStamp.split(' ')
  const newEvent = {
    type: "TimeIn",
    date: time[0],
    hour: parseInt(time[1])
  }
  employee.timeInEvents.push(newEvent);
  return employee;
}


function createTimeOutEvent(employee, dateStamp) {
  const time = dateStamp.split(' ')
  const newEvent = {
    type: "TimeOut",
    date: time[0],
    hour: parseInt(time[1])
  }
  employee.timeOutEvents.push(newEvent);
  return employee;
}

function hoursWorkedOnDate(employee, dateStamp) {
  const clockIn = employee.timeInEvents.find(record => record.date === dateStamp)
  const clockOut = employee.timeOutEvents.find(record => record.date === dateStamp)
  return parseInt(clockOut.hour * .01) - parseInt(clockIn.hour * .01)
}

function wagesEarnedOnDate(employee, dateStamp) {
  let hoursWorked = hoursWorkedOnDate(employee, dateStamp)
  const pay = employee.payPerHour
  return hoursWorked * pay
}

function allWagesFor(employee) {
  const daysWorked = employee.timeInEvents.map(event => event.date);

  const totalWages = daysWorked.reduce(((memo, day) =>
    memo += wagesEarnedOnDate(employee, day)
  ), 0)

  return totalWages;
}

function findEmployeeByFirstName(srcArray, firstName) {
  const record = srcArray.find(employee =>  employee.firstName === firstName)
  return record
}

function calculatePayroll(array) {
  const employees = array.map(employee => allWagesFor(employee))

  const allWages = employees.reduce(((memo, employee) => 
    memo += employee
  ), 0)
  
  return allWages;

}