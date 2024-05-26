document.addEventListener('DOMContentLoaded', (event) => {
    const clockElement = document.getElementById('clock');
    const alarmForm = document.getElementById('alarmForm');
    const alarmsList = document.getElementById('alarmsList');
    let alarms = [];

    function updateClock() {
        const now = new Date();
        const hours = now.getHours() % 12 || 12;
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const amPm = now.getHours() >= 12 ? 'PM' : 'AM';
        clockElement.textContent = `${hours}:${minutes}:${seconds} ${amPm}`;

        alarms.forEach((alarm, index) => {
            if (alarm.hours === hours && alarm.minutes === minutes && alarm.seconds === seconds && alarm.amPm === amPm) {
                alert('Alarm ringing!');
                alarms.splice(index, 1);
                renderAlarms();
            }
        });
    }

    function renderAlarms() {
        alarmsList.innerHTML = '';
        alarms.forEach((alarm, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.textContent = `${alarm.hours}:${alarm.minutes}:${alarm.seconds} ${alarm.amPm}`;
            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => {
                alarms.splice(index, 1);
                renderAlarms();
            };
            li.appendChild(deleteButton);
            alarmsList.appendChild(li);
        });
    }

    alarmForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const hours = parseInt(document.getElementById('hours').value);
        const minutes = document.getElementById('minutes').value.padStart(2, '0');
        const seconds = document.getElementById('seconds').value.padStart(2, '0');
        const amPm = document.getElementById('amPm').value;
        alarms.push({ hours, minutes, seconds, amPm });
        renderAlarms();
    });

    setInterval(updateClock, 1000);
    updateClock();
});
