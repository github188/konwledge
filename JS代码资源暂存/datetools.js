function date_format(date, fmt) {
    if (!date)
        return "";
    if (date.constructor != Date) {
        var reg = new RegExp("(\\/{0,2})Date\\((-?\\d+)\\)\\1", "gi");
        if (reg.test(date)) {
            date = date.replace(reg, "new Date($2)");
            date = eval(date);
        }
        else {
            var d = new Date(Date.parse(date));
            if (d.constructor != Date || !d.getFullYear()) {
                d = date.split(/[^\d]/);
                if (d.length == 0) {
                    return fmt;
                }
                else {
                    date = new Date();
                    date.setFullYear(d[0]);
                    if (d.length > 1) {
                        date.setDate(1);
                        date.setMonth(d[1] - 1);
                    }
                    if (d.length > 2) {
                        date.setDate(d[2]);
                    }
                    else {
                        date.setDate(new Date().getDate());
                    }
                    if (d.length > 3) {
                        date.setHours(d[3]);
                    }
                    else {
                        date.setHours(0);
                    }
                    if (d.length > 4) {
                        date.setMinutes(d[4]);
                    }
                    else {
                        date.setMinutes(0);
                    }
                    if (d.length > 5) {
                        date.setSeconds(d[5]);
                    }
                    else {
                        date.setSeconds(0);
                    }
                    if (d.length > 6) {
                        date.setMilliseconds(d[6]);
                    }
                    else {
                        date.setMilliseconds(0);
                    }
                }
            }
            else {
                date = d;
            }

        }
    }
    if (!fmt)
        return date;
    var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var year = date.getFullYear() + "";
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var milliseconds = date.getMilliseconds();
    fmt = fmt.replace('yyyy', year);
    fmt = fmt.replace('yy', year.substr(2));
    fmt = fmt.replace("MM", (month < 10 ? "0" : "") + month);
    fmt = fmt.replace("M", month);
    fmt = fmt.replace("dd", (day < 10 ? "0" : "") + day);
    fmt = fmt.replace("d", day);
    fmt = fmt.replace("HH", (hours < 10 ? "0" : "") + hours);
    fmt = fmt.replace("hh", ((hours % 12) < 10 ? "0" : "") + (hours % 12));
    fmt = fmt.replace("H", hours + "");
    fmt = fmt.replace("h", hours % 12 + "");
    fmt = fmt.replace("mm", (minutes < 10 ? "0" : "") + minutes);
    fmt = fmt.replace("m", minutes + "");
    fmt = fmt.replace("ss", (seconds < 10 ? "0" : "") + seconds);
    fmt = fmt.replace("s", seconds + "");
    fmt = fmt.replace("ff", (milliseconds < 10 ? "00" : (milliseconds < 100 ? "0" : "")) + milliseconds);
    fmt = fmt.replace("w", weeks[date.getDay()]);
    return fmt;
}
function date_addMonth(date, month) {
    var year = date.getFullYear();
    var m = date.getMonth();
    var day = date.getDate();
    var nm = m + parseInt(month);
    m = nm % 12;
    var y = year + parseInt(nm / 12);
    var max = get_maxdate_from_month(y, m);
    if (day > max) {
        day = max;
    }
    date.setFullYear(y);
    date.setDate(1);
    date.setMonth(m);
    date.setDate(day);
    return date;
}
function get_maxdate_from_month(year, month) {
    switch (month) {
        case 1:
            if (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)) {
                   return day = 29;
            }
            else {
                   return day = 28;
            }
        case 3:
        case 5:
        case 8:
        case 10:
            return 30;
        default:
            return 31;
    }
}
function date_subtract(date1, date2) {
    return new time_span(date2.getTime() - date1.getTime());
}
function date_subtract_months(date1, date2) {
    var d1 = get_date(date_format(date1));
    var d2 = get_date(date_format(date2));
    var f = 1;
    var d;
    if (d1 > d2) {
        f = -1;
        var d = d1;
        d1 = d2;
        d2 = d;
    }
    d = date_clone(d1);
    var month = 0;
    while (d < d2) {
        month++;
        d = date_addMonth(date_clone(d1), month);
    }
    return month;
}
function date_clone(date) {
    var n = new Date();
    n.setMonth(0);
    n.setDate(1);
    n.setFullYear(date.getFullYear());
    n.setMonth(date.getMonth());
    n.setDate(date.getDate());
    n.setHours(date.getHours());
    n.setMinutes(date.getMinutes());
    n.setSeconds(date.getSeconds());
    n.setMilliseconds(date.getMilliseconds());
    return n;
}
function time_span(times) {
    this.times = times;
    this.days = parseInt(times / (1000 * 3600 * 24));
    this.totaldays = times / (1000.0 * 3600 * 24);
    this.hours = parseInt((times / (1000 * 3600)) % 24);
    this.totalhours = times / (1000.0 * 3600);
    this.minutes = parseInt((times / (1000 * 60) % 60));
    this.totalminutes = times / (1000.0 * 60);
    this.seconds = parseInt((times / 1000) % 60);
    this.totalseconds = times / 1000.0;
    this.milliseconds = parseInt(times % 1000);
    this.totalmilliseconds = times;
}
function date_adddays(date, days) {
    return new Date(date.getTime() + days * 24 * 3600000);
}
function date_addhours(date, hours) {
    return new Date(date.getTime() + hours * 3600000);
}
function get_date(date) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}
