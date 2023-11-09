import Moment from 'react-moment';
import * as crypto from 'crypto';

export const numberToIDRFormat = (num: number): string => {
    return `Rp${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
}

export const dateToReadableFormat = (date: Date): string => {
    return `${date.toLocaleDateString('en-US', {
        weekday: "long",
        month: "short",
        day: "numeric"
    })}`
}

export const timestampToDate = (ts: number): string => {

    const formatedDate = new Date(ts * 1000).toLocaleString(
        "en-US",
          {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          }
      );

    return `${formatedDate}`
}

export const timestampToTime = (ts: number): string => {

    const date = new Date(ts * 1000); // Convert Unix timestamp to milliseconds

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    let newformat = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;

    hours = hours ? hours : 12;

    let formattedminutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${formattedminutes} ${newformat}`

}

export const md5 = (contents: string) => crypto.createHash('md5').update(contents).digest("hex");