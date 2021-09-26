const moment = require('moment')


export default (begin_day:string, end_day:string):Array<string> => {
    const during = [];
    const timeFormat = "YYYY-MM-DD"
    const dif_days:number = moment(end_day).diff(moment(begin_day), "days");

    

    during.push(begin_day);

    for(let i=1; i<=dif_days; i++) {
        during.push((moment(begin_day).add(i, 'days')).format(timeFormat));
    }

    return during;
}