import {ErrorMessage} from "../types/common.ts";
import React from "react";
import dayjs from "dayjs";
import weekOfYear from 'dayjs/plugin/weekOfYear';

dayjs.extend(weekOfYear);

/**
 *
 * @param date
 * @param format
 * @returns {null|string}
 */
export const formatDate = (date: string, format = 'ddd, MMM DD, YYYY'): null | string => {
    const dateFormat = format;
    if (date) {
        return dayjs(date).format(dateFormat)
    }

    return null
}

export const currencyFormat = (number: number) => {
    const numberString = number.toString();

    if (numberString.includes('.')) {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'GHS' });
    } else {
        return number.toLocaleString('en-US', { style: 'currency', currency: 'GHS' });
    }
}

export const renderStatus =  (isActive: number | boolean, format = "active") => {
    if (isActive === 1 || isActive == true) {
        return (format == "active") ? "active" : "yes";
    } else if (isActive === 0 || isActive == false) {
        return (format == "active") ? "not active" : "no";
    } else {
        return "Invalid input";
    }
}


export const dateHasExpired = (date: string): string | undefined => {
    try {
        const targetDate = dayjs(date);
        const today = dayjs();

        let result = false;

        if (!targetDate.isValid()) {
            return "Invalid date";
        }
        result = targetDate.isBefore(today, 'day');

        return result ? "Expired" : "in progress";

    } catch (error) {
        console.error("Error in dateHasExpired:", error);
    }
};

export const dateHasExpiredChecker = (date: string): boolean => {
    const targetDate = dayjs(date);
    const today = dayjs();

    if (!targetDate.isValid()) {
        return true;
    }

    return targetDate.isBefore(today, 'day');
};


export const getErrors = (errors: ErrorMessage) => {
    if (typeof errors === "string") {
        return errors
    }

    if (errors && errors.length > 0) {
        return errors.map((error : any) => error?.message)?.toString()
    }
}

export const handleImageLoadError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>,
    src: string,
) => {
    event.currentTarget.src = src;
};


export const getInitials = (name: string, defaultValue: string = "") => {
    if (!name) {
        return defaultValue;
    }

    // Regex to match the first letter of each word
    const rgx = new RegExp(/\b\w/g);

    // Use match to find all matches
    const initials = name.match(rgx) || [];

    // Extract the first and last initials and convert to uppercase
    return ((initials.shift() || "") + (initials.pop() || "")).toUpperCase();
};

export const capitalize = (str: string) => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}


export const selectFilter = (input: any, option:any) => (option?.children ?? '').toLowerCase().includes(input.toLowerCase())


export const removeNullValues = <T extends Record<string, any>> (obj: T): Partial<T> => {
    return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined) {
            acc[key as keyof T] = value;
        }
        return acc;
    }, {} as Partial<T>);
}

export const removeKey = (obj: any, keyToRemove: string) => {
    return Object.keys(obj).reduce((acc: any, key: any) => {
        if (key !== keyToRemove) acc[key] = obj[key];
        return acc;
    }, {});
};

export const groupByWeeks = (data: any[]) => {

    return data.reduce((acc, item) => {
        // Get the week number for the item's date
        const weekNumber = item.weekNumber;

        // If the week doesn't exist in the accumulator, initialize it
        if (!acc[weekNumber]) {
            acc[weekNumber] = [];
        }

        // Push the current item into the appropriate week
        acc[weekNumber].push(item);

        return acc;
    }, {} as { [week: number]: typeof data });
};

export const disableNonSundays = (current: dayjs.Dayjs) => {
    // Check if the day is not Sunday (0 is Sunday in dayjs `day()` method)
    return current && current.day() !== 0;
};

export const getWeek = (date: dayjs.Dayjs) => {
    if (!date) {
        return { year: '', month: '', weekNumber: null };
    }

    const year = date.year();
    const month = date.format("MM"); // Get the month as "01", "02", etc.

    // Calculate the week number based on the specific month
    const dayOfMonth = date.date(); // Get the day of the month (1-31)
    const weekNumber = Math.ceil(dayOfMonth / 7); // Divide days of the month by 7 to get the week number

    return { year, month, weekNumber };
}





export function generateWarehouseCode(initials: string) {
    const sanitizedInitials = initials
        .substring(0, 3)
        .replace(/[^a-zA-Z]/g, "")
        .toUpperCase();

    // Ensure we have at least 1 valid initial
    if (!sanitizedInitials) {
        throw new Error(
            "The provided string must contain at least one letter for the initials."
        );
    }

    // Generate a shorter random hexadecimal string (up to 6 characters)
    const remainingLength = Math.max(1, 6 - sanitizedInitials.length);
    let randomString = "";
    const characters = "abcdef0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < remainingLength; i++) {
        randomString += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }

    // Combine initials and the random string
    return (sanitizedInitials + "-" + randomString).toUpperCase();
}



export function generateUniqueCode(prefix = "ORD", length = 10) {
    if (typeof prefix !== 'string') { 
      prefix = "ORD";
    }
    if (!Number.isInteger(length) || length <= prefix.length) {
      length = 10;
    }
  
    const numericLength = length - prefix.length;
    let randomNumber = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
  
    // Generate random numeric characters
    for (let i = 0; i < numericLength; i++) {
      randomNumber += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    // Add hyphens every 3 digits
    let formattedNumber = '';
    for (let i = 0; i < randomNumber.length; i++) {
      formattedNumber += randomNumber[i];
      if ((i + 1) % 3 === 0 && i !== randomNumber.length - 1) {
        formattedNumber += '-';
      }
    }
  
    return prefix + formattedNumber;
  }
  