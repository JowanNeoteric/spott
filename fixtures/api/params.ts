import dayjs from 'dayjs';
const participants = JSON.parse(JSON.stringify(require("../api/json/clients_list.json")));

export class Payload {
    readonly now = dayjs();

    roundToNearest5Minutes(time) {
        const roundedMinute = (time.minute() - time.minute() % 5);
        return time.set('minutes', roundedMinute);
    };

    futureStartTime = (this.roundToNearest5Minutes(this.now)).add(15, 'minutes').format('HH:mm:ss').toString();
    futureStartDate = this.now.add(1, 'day').format('YYYY-MM-DD').toString();
    futureEndTime = (this.roundToNearest5Minutes(this.now)).add(35, 'minutes').format('HH:mm:ss').toString();
    reformatedDate = this.now.add(1, 'day').format('YYYYMMDD').toString();
    reformatedTime = (this.roundToNearest5Minutes(this.now)).add(35, 'minutes').format('HHmmss').toString();

    IdentityId = {
        data: {
            "IdentityId": "eu-west-1:7969ee74-3015-c105-c366-d515f0fcaaed"
        }
    }

    IdentityPoolId = {
        data: {
            "IdentityPoolId": "eu-west-1:0bc3417c-c4e9-4ef7-9644-6a29009583d5"
        }
    }

    validCLubId = {
        params: {
            id: 2443
        }
    }

    notExistingClubId = {
        params: {
            id: 2222
        }
    }

    invalidTypeClubId = {
        params: {
            id: "invalid_id"
        }
    }

    trainerClients = {
        data:
            { "page": 1, "perPage": 25, "search": "" }
    }

    exampleCalendarSessions = {
        params: {
            start: "2024-09-29T22:00:00.000Z",
            end: "2024-11-10T23:00:00.000Z"
        }
    }

    invalidCalendarSessions = {
        params: {
            start: "start",
            end: "end"
        }
    }

    liveRemoteSingle = { "version": 2, "name": "PW Live Remote Single Api Test", "type": "video", "start_date": `${this.futureStartDate}T${this.futureStartTime}.000Z`, "end_date": `${this.futureStartDate}T${this.futureEndTime}.000Z`, "rrule": `DTSTART;TZID=Europe/Warsaw:${this.reformatedDate}T${this.reformatedTime}`, "timezone": "Europe/Warsaw", "activity_type": "basic", "participants": [participants.data.items[0].cognito_id], "session_notes": "this is Live Remote Single API Test session" };
    liveRemoteMulti = { "version": 2, "name": "PW Live Remote Multi Api Test", "type": "video", "start_date": `${this.futureStartDate}T${this.futureStartTime}.000Z`, "end_date": `${this.futureStartDate}T${this.futureEndTime}.000Z`, "rrule": `DTSTART;TZID=Europe/Warsaw:${this.reformatedDate}T${this.reformatedTime}`, "timezone": "Europe/Warsaw", "activity_type": "running", "participants": [participants.data.items[0].cognito_id, participants.data.items[1].cognito_id, participants.data.items[2].cognito_id, participants.data.items[3].cognito_id, participants.data.items[4].cognito_id], "session_notes": "this is Live Remote Multi API Test session" };
    cancelSession = { "cancellationDate": `${this.futureStartDate}T${this.futureStartTime}.000Z` };
    liveInPersonSingle = { "version": 2, "name": "PW Live In Person Single Api Test", "type": "in-person", "start_date": `${this.futureStartDate}T${this.futureStartTime}.000Z`, "end_date": `${this.futureStartDate}T${this.futureEndTime}.000Z`, "rrule": `DTSTART;TZID=Europe/Warsaw:${this.reformatedDate}T${this.reformatedTime}`, "timezone": "Europe/Warsaw", "activity_type": "basic", "participants": [participants.data.items[0].cognito_id], "session_notes": "this is Live In Person Single API Test session" };
    liveInPersonMulti = { "version": 2, "name": "PW Live In Person Multi Api Test", "type": "in-person", "start_date": `${this.futureStartDate}T${this.futureStartTime}.000Z`, "end_date": `${this.futureStartDate}T${this.futureEndTime}.000Z`, "rrule": `DTSTART;TZID=Europe/Warsaw:${this.reformatedDate}T${this.reformatedTime}`, "timezone": "Europe/Warsaw", "activity_type": "walking", "participants": [participants.data.items[0].cognito_id, participants.data.items[1].cognito_id, participants.data.items[2].cognito_id, participants.data.items[3].cognito_id, participants.data.items[4].cognito_id], "session_notes": "this is Live In Person Multi API Test session" };

}
